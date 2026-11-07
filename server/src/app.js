import express from 'express';
import cors from 'cors';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import chatRouter from './routes/chat.js';
import contactRouter from './routes/contact.js';
import galleryRouter from './routes/gallery.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.disable('x-powered-by');
app.set('trust proxy', 1);

const allowedOrigins = (process.env.CLIENT_ORIGIN || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins.length > 0 ? allowedOrigins : true,
    methods: ['GET', 'POST', 'OPTIONS'],
  })
);
app.use(express.json({ limit: '25kb' }));
app.use(express.urlencoded({ extended: false, limit: '25kb' }));

app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  next();
});

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    status: 'ok',
    service: 'Vishwas Sanitary and Fancy Items API',
    timestamp: new Date().toISOString(),
  });
});

app.use('/api/chat', chatRouter);
app.use('/api/contact', contactRouter);
app.use('/api/gallery', galleryRouter);

app.use('/api', (req, res) => {
  res.status(404).json({ success: false, message: 'API route not found.' });
});

// When a production build exists, the Express server can host the whole site
// from one port (handy for a VPS deployment). API routes are registered first.
const clientDist = path.resolve(__dirname, '../../client/dist');
const clientIndex = path.join(clientDist, 'index.html');

if (fs.existsSync(clientIndex)) {
  app.use(
    express.static(clientDist, {
      setHeaders(res, filePath) {
        if (filePath.endsWith('index.html')) {
          res.setHeader('Cache-Control', 'no-cache');
        }
      },
    })
  );

  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api/')) return next();
    return res.sendFile(clientIndex);
  });
}

// Malformed JSON should be a 400, not a generic server error.
app.use((error, req, res, next) => {
  if (res.headersSent) return next(error);
  if (error.type === 'entity.parse.failed') {
    return res.status(400).json({ success: false, message: 'Invalid JSON body.' });
  }
  console.error('[server] Unhandled error:', error);
  return res.status(500).json({
    success: false,
    message: 'Something went wrong on our side. Please call us instead.',
  });
});

export default app;
