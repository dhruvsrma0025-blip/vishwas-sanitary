import nodemailer from 'nodemailer';

const BREVO_ENDPOINT = 'https://api.brevo.com/v3/smtp/email';
const BREVO_TIMEOUT_MS = 15000;

let transporter;
let cachedConfigKey = '';

function getMailConfig() {
  return {
    host: process.env.SMTP_HOST || '',
    port: Number(process.env.SMTP_PORT || 587),
    secure: String(process.env.SMTP_SECURE).toLowerCase() === 'true',
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
    to: process.env.MAIL_TO || '',
    from: process.env.MAIL_FROM || process.env.SMTP_USER || '',
  };
}

function getBrevoConfig() {
  return {
    apiKey: process.env.BREVO_API_KEY || '',
    senderEmail: process.env.BREVO_SENDER_EMAIL || '',
    senderName: process.env.BREVO_SENDER_NAME || 'Vishwas Sanitary and Fancy Items',
    to: process.env.MAIL_TO || '',
  };
}

function isBrevoConfigured() {
  const config = getBrevoConfig();
  return Boolean(config.apiKey && config.senderEmail && config.to);
}

function isSmtpConfigured() {
  const config = getMailConfig();
  return Boolean(config.host && config.user && config.pass && config.to);
}

export function isMailConfigured() {
  return isBrevoConfigured() || isSmtpConfigured();
}

function getTransporter() {
  if (!isSmtpConfigured()) return null;

  const config = getMailConfig();
  const configKey = `${config.host}:${config.port}:${config.user}:${config.to}`;

  if (!transporter || configKey !== cachedConfigKey) {
    transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.secure,
      auth: { user: config.user, pass: config.pass },
    });
    cachedConfigKey = configKey;
  }

  return transporter;
}

function getSubmittedAt(entry) {
  return new Date(entry.createdAt).toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Kolkata',
  });
}

function escapeHtml(value) {
  return String(value).replace(
    /[&<>"']/g,
    (character) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
      })[character]
  );
}

function buildEmail(entry, submittedAt) {
  const subject = `New website enquiry from ${entry.name}`;
  const text = [
    'A new message was submitted on the Vishwas Sanitary and Fancy Items website.',
    '',
    `Name:    ${entry.name}`,
    `Phone:   ${entry.phone}`,
    `Message: ${entry.message}`,
    '',
    `Received: ${submittedAt}`,
    `Reference: ${entry.id}`,
  ].join('\n');

  const row = (label, value) => `
    <tr>
      <td style="padding: 10px 0; color: #5f7779; font-size: 13px; vertical-align: top; width: 90px;">${label}</td>
      <td style="padding: 10px 0; color: #062b45; font-size: 14px; font-weight: 600; vertical-align: top;">${value}</td>
    </tr>`;

  const html = `
    <div style="margin: 0; padding: 24px; background: #f3f7f7; font-family: Arial, Helvetica, sans-serif;">
      <div style="max-width: 600px; margin: 0 auto; overflow: hidden; border: 1px solid #dce8e8; border-radius: 16px; background: #ffffff;">
        <div style="padding: 22px 28px; background: #062b45;">
          <p style="margin: 0 0 6px; color: #8de0d4; font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase;">Website enquiry</p>
          <h1 style="margin: 0; color: #ffffff; font-size: 22px; line-height: 1.3;">New message from ${escapeHtml(entry.name)}</h1>
        </div>
        <div style="padding: 10px 28px 24px;">
          <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; border-collapse: collapse;">
            ${row('Name', escapeHtml(entry.name))}
            ${row('Phone', `<a href="tel:${escapeHtml(entry.phone.replace(/[^\d+]/g, ''))}" style="color: #0a7d7d; text-decoration: none;">${escapeHtml(entry.phone)}</a>`)}
            ${row(
              'Message',
              `<div style="white-space: pre-wrap; font-weight: 400; line-height: 1.65;">${escapeHtml(entry.message)}</div>`
            )}
            ${row('Received', escapeHtml(submittedAt))}
            ${row('Reference', `<span style="font-family: monospace; font-size: 12px; color: #5f7779; font-weight: 400;">${escapeHtml(entry.id)}</span>`)}
          </table>
        </div>
        <div style="padding: 16px 28px; border-top: 1px solid #edf2f2; background: #fbfcfc;">
          <p style="margin: 0; color: #7b9193; font-size: 12px; line-height: 1.6;">Sent automatically from the Vishwas Sanitary and Fancy Items website contact form.</p>
        </div>
      </div>
    </div>`;

  return { subject, text, html };
}

async function sendViaBrevo(entry) {
  const config = getBrevoConfig();
  const submittedAt = getSubmittedAt(entry);
  const { subject, text, html } = buildEmail(entry, submittedAt);

  try {
    const response = await fetch(BREVO_ENDPOINT, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'api-key': config.apiKey,
      },
      body: JSON.stringify({
        sender: {
          name: config.senderName,
          email: config.senderEmail,
        },
        to: [{ email: config.to }],
        subject,
        textContent: text,
        htmlContent: html,
        tags: ['website-contact'],
      }),
      signal: AbortSignal.timeout(BREVO_TIMEOUT_MS),
    });

    const body = await response.text();

    if (!response.ok) {
      throw new Error(`Brevo responded with ${response.status}: ${body.slice(0, 500)}`);
    }

    let messageId;
    try {
      messageId = JSON.parse(body)?.messageId;
    } catch {
      // A successful response without JSON is still a successful send.
    }

    console.log('[mail] Contact notification sent via Brevo.');
    return { sent: true, provider: 'brevo', messageId };
  } catch (error) {
    console.error('[mail] Could not send notification email via Brevo:', error.message);
    return { sent: false, provider: 'brevo', reason: 'send-failed' };
  }
}

/**
 * Sends an optional notification email. A mail failure must never make the
 * customer think their message was lost, so failures are logged and swallowed.
 */
export async function sendNotificationEmail(entry) {
  if (isBrevoConfigured()) {
    return sendViaBrevo(entry);
  }

  const transport = getTransporter();
  if (!transport) return { sent: false, reason: 'not-configured' };

  const config = getMailConfig();
  const submittedAt = getSubmittedAt(entry);
  const { subject, text } = buildEmail(entry, submittedAt);

  try {
    const info = await transport.sendMail({
      from: config.from,
      to: config.to,
      subject,
      text,
    });
    return { sent: true, provider: 'smtp', messageId: info.messageId };
  } catch (error) {
    console.error('[mail] Could not send notification email via SMTP:', error.message);
    return { sent: false, provider: 'smtp', reason: 'send-failed' };
  }
}
