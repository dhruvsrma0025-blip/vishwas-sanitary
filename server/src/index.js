import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const { default: app } = await import('./app.js');
const { isMailConfigured } = await import('./lib/mailer.js');

const port = Number(process.env.PORT) || 5000;

const server = app.listen(port, () => {
  console.log(`[server] API running at http://localhost:${port}`);
  console.log(`[server] Contact endpoint: POST http://localhost:${port}/api/contact`);
  console.log(`[server] Gallery endpoint: GET http://localhost:${port}/api/gallery`);
  console.log(`[server] Chat endpoint: POST http://localhost:${port}/api/chat`);
  console.log(
    `[server] Email notifications are ${isMailConfigured() ? 'enabled' : 'disabled (messages will still be saved)'}.`
  );
  console.log(
    `[server] Chat assistant is ${(process.env.GROQ_API_KEY || '').trim() ? 'enabled' : 'disabled (GROQ_API_KEY is missing)'}.`
  );
});

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`[server] Port ${port} is already in use. Change PORT in server/.env.`);
  } else {
    console.error('[server] Failed to start:', error);
  }
  process.exit(1);
});

function shutdown(signal) {
  console.log(`\n[server] ${signal} received. Closing server...`);
  server.close(() => {
    console.log('[server] Closed cleanly.');
    process.exit(0);
  });
  setTimeout(() => process.exit(1), 10000).unref();
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
