import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const messagesFile = path.resolve(__dirname, '../../messages.json');

// Serialise writes so two quick submissions cannot overwrite each other.
let writeQueue = Promise.resolve();

async function readMessages() {
  try {
    const raw = await fs.readFile(messagesFile, 'utf8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    if (error.code === 'ENOENT') return [];
    // Don't silently discard a corrupted file. Surface the problem to the API.
    throw new Error(`Could not read messages file: ${error.message}`);
  }
}

export function appendMessage(message) {
  writeQueue = writeQueue
    .catch(() => {
      // A previous failed write should not block future submissions.
    })
    .then(async () => {
      const messages = await readMessages();
      messages.push(message);

      const temporaryFile = `${messagesFile}.tmp`;
      await fs.writeFile(temporaryFile, `${JSON.stringify(messages, null, 2)}\n`, 'utf8');
      await fs.rename(temporaryFile, messagesFile);
      return message;
    });

  return writeQueue;
}
