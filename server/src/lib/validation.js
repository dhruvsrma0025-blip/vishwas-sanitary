const cleanText = (value) =>
  typeof value === 'string' ? value.trim().replace(/\s+/g, ' ') : '';

/**
 * Server-side validation. The client validates too, but the API must never
 * trust data coming from the browser.
 */
export function validateContact(input = {}) {
  const errors = {};

  const name = cleanText(input.name);
  if (name.length < 2) {
    errors.name = 'Please enter your name (at least 2 characters).';
  } else if (name.length > 80) {
    errors.name = 'Please keep your name under 80 characters.';
  }

  const phone = cleanText(input.phone);
  const digits = phone.replace(/\D/g, '');
  if (!phone) {
    errors.phone = 'Please enter your phone number.';
  } else if (!/^[\d\s+()-]{7,25}$/.test(phone) || digits.length < 10 || digits.length > 15) {
    errors.phone = 'Please enter a valid phone number with 10 to 15 digits.';
  }

  const message = typeof input.message === 'string' ? input.message.trim() : '';
  if (message.length < 10) {
    errors.message = 'Please tell us a little more (at least 10 characters).';
  } else if (message.length > 1200) {
    errors.message = 'Please keep your message under 1200 characters.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
    value: { name, phone, message },
  };
}
