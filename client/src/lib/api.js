const baseUrl = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/+$/, '');

export const apiUrl = (path) => `${baseUrl}${path}`;

export class ApiError extends Error {
  constructor(message, { status, fieldErrors } = {}) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.fieldErrors = fieldErrors || {};
  }
}

export async function sendChatMessage(messages, { signal } = {}) {
  let response;

  try {
    response = await fetch(apiUrl('/api/chat'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages }),
      signal,
    });
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new ApiError('Assistant ne zyada time liya. Phir try karein.');
    }
    throw new ApiError(
      'Assistant se connection nahi ho paaya. Internet check karein ya shop ko call karein.'
    );
  }

  let data = null;
  try {
    data = await response.json();
  } catch {
    // The fallback message below covers a non-JSON error response.
  }

  if (!response.ok || !data?.reply) {
    throw new ApiError(data?.message || 'Assistant reply nahi kar paya. Phir try karein.', {
      status: response.status,
    });
  }

  return data.reply;
}

export async function submitContact(payload, { signal } = {}) {
  let response;

  try {
    response = await fetch(apiUrl('/api/contact'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal,
    });
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new ApiError('The request took too long. Please try again or call us directly.');
    }
    throw new ApiError(
      'We could not reach the server. Please check your connection or call us directly.'
    );
  }

  let data = null;
  try {
    data = await response.json();
  } catch {
    // The fallback messages below cover a non-JSON error response.
  }

  if (!response.ok) {
    throw new ApiError(data?.message || 'Your message could not be sent. Please try again.', {
      status: response.status,
      fieldErrors: data?.errors,
    });
  }

  return data;
}
