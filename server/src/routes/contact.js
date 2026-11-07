import { Router } from 'express';
import { randomUUID } from 'node:crypto';
import { appendMessage } from '../lib/messages.js';
import { sendNotificationEmail } from '../lib/mailer.js';
import { validateContact } from '../lib/validation.js';

const router = Router();

// Small in-memory rate limiter. Enough for a single-shop contact form and it
// avoids adding another dependency. For multi-instance deployments, use a
// shared store (Redis) or a service such as Cloudflare Turnstile.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 6;
const attempts = new Map();

function contactRateLimiter(req, res, next) {
  const now = Date.now();

  // Keep the map tidy on long-running servers.
  if (attempts.size > 5000) {
    for (const [key, entry] of attempts) {
      if (now - entry.start > WINDOW_MS) attempts.delete(key);
    }
  }

  const key = req.ip || req.socket.remoteAddress || 'unknown';
  const entry = attempts.get(key);

  if (!entry || now - entry.start > WINDOW_MS) {
    attempts.set(key, { start: now, count: 1 });
    return next();
  }

  entry.count += 1;
  if (entry.count > MAX_REQUESTS) {
    const retryAfter = Math.ceil((WINDOW_MS - (now - entry.start)) / 1000);
    res.set('Retry-After', String(retryAfter));
    return res.status(429).json({
      success: false,
      message: 'Too many messages from this connection. Please call us instead.',
    });
  }

  return next();
}

router.post('/', contactRateLimiter, async (req, res, next) => {
  const input = req.body || {};

  // Hidden honeypot field. Real visitors never fill this in.
  if (typeof input.website === 'string' && input.website.trim() !== '') {
    return res.status(201).json({
      success: true,
      message: 'Thank you, your message has been received.',
    });
  }

  const { valid, errors, value } = validateContact(input);
  if (!valid) {
    return res.status(400).json({
      success: false,
      message: 'Please check the highlighted fields and try again.',
      errors,
    });
  }

  const entry = {
    id: randomUUID(),
    name: value.name,
    phone: value.phone,
    message: value.message,
    createdAt: new Date().toISOString(),
  };

  try {
    await appendMessage(entry);
  } catch (error) {
    return next(error);
  }

  // Email is optional and must not block or fail the request.
  await sendNotificationEmail(entry);

  return res.status(201).json({
    success: true,
    message: `Thank you, ${entry.name}. Your message has been received. We will get back to you soon.`,
    id: entry.id,
  });
});

export default router;
