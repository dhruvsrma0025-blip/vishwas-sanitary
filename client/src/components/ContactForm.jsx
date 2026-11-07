import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../lib/icons.jsx';
import { siteData } from '../data/siteData.js';
import { submitContact } from '../lib/api.js';
import styles from './ContactForm.module.css';

const initialValues = { name: '', phone: '', message: '', website: '' };

function validate(values) {
  const nextErrors = {};
  const name = values.name.trim();
  const phone = values.phone.trim();
  const message = values.message.trim();
  const digits = phone.replace(/\D/g, '');

  if (name.length < 2) {
    nextErrors.name = 'Please enter your name (at least 2 characters).';
  } else if (name.length > 80) {
    nextErrors.name = 'Please keep your name under 80 characters.';
  }

  if (!phone) {
    nextErrors.phone = 'Please enter your phone number.';
  } else if (!/^[\d\s+()-]{7,25}$/.test(phone) || digits.length < 10 || digits.length > 15) {
    nextErrors.phone = 'Please enter a valid phone number with 10 to 15 digits.';
  }

  if (message.length < 10) {
    nextErrors.message = 'Please tell us a little more (at least 10 characters).';
  } else if (message.length > 1200) {
    nextErrors.message = 'Please keep your message under 1200 characters.';
  }

  return nextErrors;
}

export default function ContactForm({
  title = siteData.contactPage.formTitle,
  description = siteData.contactPage.formDescription,
}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [feedback, setFeedback] = useState('');
  const formRef = useRef(null);
  const successRef = useRef(null);
  const alertRef = useRef(null);
  const requestRef = useRef(null);

  useEffect(
    () => () => {
      requestRef.current?.abort();
    },
    []
  );

  useEffect(() => {
    if (status !== 'error') return;

    const firstInvalid = formRef.current?.querySelector('[aria-invalid="true"]');
    if (firstInvalid) {
      firstInvalid.focus();
    } else {
      alertRef.current?.focus();
    }
  }, [status, errors]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));

    if (errors[name]) {
      setErrors((current) => ({ ...current, [name]: undefined }));
    }
    if (status === 'error') {
      setStatus('idle');
      setFeedback('');
    }
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    if (!value.trim()) return;

    const fieldErrors = validate({ ...values, [name]: value });
    setErrors((current) => ({ ...current, [name]: fieldErrors[name] }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus('error');
      setFeedback('Please check the highlighted fields and try again.');
      return;
    }

    setStatus('submitting');
    setFeedback('');

    const controller = new AbortController();
    requestRef.current = controller;
    const timeout = window.setTimeout(() => controller.abort(), 15000);

    try {
      const data = await submitContact(
        {
          name: values.name,
          phone: values.phone,
          message: values.message,
          website: values.website,
        },
        { signal: controller.signal }
      );

      setStatus('success');
      setFeedback(
        data?.message ||
          'Thank you! Your message has been received. We will get back to you soon.'
      );
      setValues(initialValues);
      setErrors({});
      window.setTimeout(() => successRef.current?.focus(), 60);
    } catch (error) {
      setStatus('error');
      setFeedback(error.message);
      if (error.fieldErrors) {
        setErrors((current) => ({ ...current, ...error.fieldErrors }));
      }
    } finally {
      window.clearTimeout(timeout);
      requestRef.current = null;
    }
  };

  if (status === 'success') {
    return (
      <motion.div
        className={styles.card}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <div
          className={styles.success}
          ref={successRef}
          tabIndex={-1}
          role="status"
          aria-live="polite"
        >
          <span className={styles.successIcon}>
            <Icon name="check" />
          </span>
          <h2>Message received</h2>
          <p>{feedback}</p>
          <button
            type="button"
            className={`btn btnOutline ${styles.againButton}`}
            onClick={() => {
              setStatus('idle');
              setFeedback('');
              window.setTimeout(
                () => formRef.current?.querySelector('#contact-name')?.focus(),
                30
              );
            }}
          >
            Send another message
          </button>
          <p className={styles.successCall}>
            Need an answer sooner? Call{' '}
            <a href={siteData.contact.phones[0].href}>{siteData.contact.phones[0].display}</a>{' '}
            or{' '}
            <a href={siteData.contact.phones[1].href}>{siteData.contact.phones[1].display}</a>.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.eyebrow}>Write to us</span>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>

      {status === 'error' && feedback && (
        <div
          className={styles.alert}
          role="alert"
          tabIndex={-1}
          ref={alertRef}
        >
          <Icon name="warning" />
          <span>{feedback}</span>
        </div>
      )}

      <form className={styles.form} ref={formRef} onSubmit={handleSubmit} noValidate>
        <div className={styles.row}>
          <div className={styles.field}>
            <label htmlFor="contact-name">
              Your name <span className={styles.required}>*</span>
            </label>
            <input
              id="contact-name"
              className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Your full name"
              autoComplete="name"
              maxLength={80}
              required
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? 'contact-name-error' : undefined}
            />
            {errors.name && (
              <p className={styles.errorText} id="contact-name-error">
                <Icon name="warning" />
                {errors.name}
              </p>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="contact-phone">
              Phone number <span className={styles.required}>*</span>
            </label>
            <input
              id="contact-phone"
              className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
              type="tel"
              name="phone"
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Your 10-digit mobile number"
              autoComplete="tel"
              inputMode="tel"
              maxLength={25}
              required
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? 'contact-phone-error' : undefined}
            />
            {errors.phone && (
              <p className={styles.errorText} id="contact-phone-error">
                <Icon name="warning" />
                {errors.phone}
              </p>
            )}
          </div>
        </div>

        <div className={styles.field}>
          <label htmlFor="contact-message">
            Your message <span className={styles.required}>*</span>
          </label>
          <textarea
            id="contact-message"
            className={`${styles.input} ${styles.textarea} ${
              errors.message ? styles.inputError : ''
            }`}
            name="message"
            value={values.message}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Tell us what you are looking for — for example, taps, a wash basin, bathroom fittings or decorative items."
            rows={5}
            maxLength={1200}
            required
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? 'contact-message-error' : 'contact-message-hint'}
          />
          <div className={styles.fieldFooter}>
            {errors.message ? (
              <p className={styles.errorText} id="contact-message-error">
                <Icon name="warning" />
                {errors.message}
              </p>
            ) : (
              <p className={styles.hint} id="contact-message-hint">
                A few details help us reply with the right information.
              </p>
            )}
            <span className={styles.counter}>{values.message.length}/1200</span>
          </div>
        </div>

        {/* Honeypot: hidden from people, filled by spam bots. */}
        <div className={styles.honeypot} aria-hidden="true">
          <label htmlFor="contact-website">Website</label>
          <input
            id="contact-website"
            type="text"
            name="website"
            value={values.website}
            onChange={handleChange}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <button
          type="submit"
          className={`btn btnPrimary btnBlock ${styles.submit}`}
          disabled={status === 'submitting'}
        >
          {status === 'submitting' ? (
            <>
              <Icon name="spinner" className={styles.spinner} />
              Sending...
            </>
          ) : (
            <>
              <Icon name="send" />
              Send message
            </>
          )}
        </button>

        <p className={styles.privacy}>
          We use your details only to respond to this enquiry. No marketing, no sharing.
        </p>

        <p className={styles.callPrompt}>
          Prefer to talk? Call{' '}
          <a href={siteData.contact.phones[0].href}>{siteData.contact.phones[0].display}</a> or{' '}
          <a href={siteData.contact.phones[1].href}>{siteData.contact.phones[1].display}</a>.
        </p>
      </form>
    </div>
  );
}
