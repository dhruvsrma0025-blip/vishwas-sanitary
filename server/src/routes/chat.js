import { Router } from 'express';
import { CHAT_SYSTEM_PROMPT } from '../lib/shop-context.js';

const router = Router();

const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_TIMEOUT_MS = 25000;
const MAX_MESSAGES = 12;
const MAX_MESSAGE_LENGTH = 800;
const MAX_TOTAL_LENGTH = 6000;
const REPLY_POLICY =
  'Reply only in Hinglish using Roman/Latin script, even when the customer writes in English or Devanagari. Answer only questions about the Vishwas Sanitary and Fancy Items website and shop. For anything unrelated, give no outside information; use one short Hinglish refusal and invite a shop question.';

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 30;
const attempts = new Map();

function chatRateLimiter(req, res, next) {
  const now = Date.now();

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
      message: 'Bahut zyada messages bhej diye gaye hain. Thodi der baad try karein ya shop ko call karein.',
    });
  }

  return next();
}

function validateMessages(input) {
  if (!Array.isArray(input) || input.length < 1 || input.length > MAX_MESSAGES) {
    return {
      valid: false,
      message: 'Chat message valid nahi hai. Chat refresh karke phir try karein.',
    };
  }

  const messages = [];
  let totalLength = 0;

  for (const raw of input) {
    if (!raw || typeof raw !== 'object') {
      return {
        valid: false,
        message: 'Chat message valid nahi hai. Chat refresh karke phir try karein.',
      };
    }

    const role = raw.role;
    if (role !== 'user' && role !== 'assistant') {
      return {
        valid: false,
        message: 'Chat message valid nahi hai. Chat refresh karke phir try karein.',
      };
    }

    const content = typeof raw.content === 'string' ? raw.content.trim() : '';
    if (!content) {
      return { valid: false, message: 'Bhejne se pehle apna sawaal likhein.' };
    }
    if (content.length > MAX_MESSAGE_LENGTH) {
      return {
        valid: false,
        message: `Ek message ${MAX_MESSAGE_LENGTH} characters se chhota rakhein.`,
      };
    }

    totalLength += content.length;
    messages.push({ role, content });
  }

  if (totalLength > MAX_TOTAL_LENGTH) {
    return {
      valid: false,
      message: 'Chat bahut lambi ho gayi hai. Chat refresh karke phir try karein.',
    };
  }

  if (messages[messages.length - 1].role !== 'user') {
    return { valid: false, message: 'Bhejne se pehle apna sawaal likhein.' };
  }

  return { valid: true, messages };
}

router.post('/', chatRateLimiter, async (req, res) => {
  res.set('Cache-Control', 'no-store');

  const apiKey = (process.env.GROQ_API_KEY || '').trim();
  if (!apiKey) {
    console.error('[chat] GROQ_API_KEY is not configured.');
    return res.status(503).json({
      success: false,
      message: 'Chat assistant abhi available nahi hai. Please shop ko call ya WhatsApp karein.',
    });
  }

  const { valid, messages, message: validationMessage } = validateMessages(
    req.body?.messages
  );

  if (!valid) {
    return res.status(400).json({
      success: false,
      message: validationMessage,
    });
  }

  const model = (process.env.GROQ_MODEL || 'openai/gpt-oss-20b').trim();
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), GROQ_TIMEOUT_MS);

  const requestMessages = [
    { role: 'system', content: CHAT_SYSTEM_PROMPT },
    ...messages,
    { role: 'system', content: REPLY_POLICY },
  ];

  try {
    const response = await fetch(GROQ_URL, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: requestMessages,
        temperature: 0.35,
        max_tokens: 500,
        reasoning_effort: 'low',
        stream: false,
      }),
      signal: controller.signal,
    });

    const raw = await response.text();
    let data = null;
    try {
      data = JSON.parse(raw);
    } catch {
      // The error response below handles a non-JSON reply.
    }

    if (!response.ok) {
      const detail = data?.error?.message || raw.slice(0, 500);
      console.error('[chat] Groq request failed:', response.status, detail);

      if (response.status === 429) {
        return res.status(429).json({
          success: false,
          message: 'Chat assistant thoda busy hai. Please ek minute baad try karein.',
        });
      }

      if (response.status === 401 || response.status === 403) {
        return res.status(503).json({
          success: false,
          message: 'Chat assistant abhi available nahi hai. Please shop ko call ya WhatsApp karein.',
        });
      }

      return res.status(502).json({
        success: false,
        message: 'Reply nahi aa paaya. Please dobara try karein ya shop ko call karein.',
      });
    }

    const reply = data?.choices?.[0]?.message?.content?.trim();
    if (!reply) {
      console.error('[chat] Groq returned an empty reply.');
      return res.status(502).json({
        success: false,
        message: 'Reply nahi aa paaya. Please dobara try karein ya shop ko call karein.',
      });
    }

    return res.json({
      success: true,
      reply: reply.slice(0, 1600),
    });
  } catch (error) {
    if (error.name === 'AbortError') {
      console.error('[chat] Groq request timed out.');
    } else {
      console.error('[chat] Could not reach Groq:', error.message);
    }

    return res.status(503).json({
      success: false,
      message: 'Chat assistant se connection nahi ho paaya. Please shop ko call ya WhatsApp karein.',
    });
  } finally {
    clearTimeout(timeout);
  }
});

export default router;
