import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import Icon from '../lib/icons.jsx';
import { gallery } from '../data/siteData.js';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock.js';
import { useEscapeKey } from '../hooks/useEscapeKey.js';
import styles from './Lightbox.module.css';

const categoryLabels = Object.fromEntries(
  gallery.categories.map((category) => [category.id, category.label])
);

export default function Lightbox({ items, index, onClose, onNext, onPrev }) {
  const isOpen = Number.isInteger(index) && index >= 0 && index < items.length;
  const item = isOpen ? items[index] : null;

  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);
  const previousFocusRef = useRef(null);
  const nextRef = useRef(onNext);
  const previousRef = useRef(onPrev);

  nextRef.current = onNext;
  previousRef.current = onPrev;

  useBodyScrollLock(isOpen);
  useEscapeKey(onClose, isOpen);

  useEffect(() => {
    if (!isOpen) return undefined;

    previousFocusRef.current = document.activeElement;
    const focusTimer = window.setTimeout(() => closeButtonRef.current?.focus(), 40);

    const handleKeyDown = (event) => {
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        nextRef.current?.();
        return;
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        previousRef.current?.();
        return;
      }

      if (event.key === 'Tab' && dialogRef.current) {
        const focusable = Array.from(
          dialogRef.current.querySelectorAll('button:not([disabled])')
        ).filter((element) => element.offsetParent !== null);

        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener('keydown', handleKeyDown);
      if (previousFocusRef.current instanceof HTMLElement) {
        previousFocusRef.current.focus();
      }
    };
  }, [isOpen]);

  if (!isOpen || !item) return null;

  const categoryLabel = categoryLabels[item.category] || 'Gallery';

  return createPortal(
    <motion.div
      className={styles.overlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      role="presentation"
    >
      <motion.div
        className={styles.dialog}
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="lightbox-title"
        aria-describedby="lightbox-help"
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className={styles.topbar}>
          <span className={styles.counter} aria-live="polite">
            {String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
          </span>
          <button
            ref={closeButtonRef}
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close gallery"
          >
            <Icon name="close" />
          </button>
        </div>

        <div className={styles.imageWrap}>
          {items.length > 1 && (
            <button
              type="button"
              className={`${styles.navButton} ${styles.previous}`}
              onClick={onPrev}
              aria-label="Previous photo"
            >
              <Icon name="left" />
            </button>
          )}

          <motion.img
            key={item.id}
            className={styles.image}
            src={item.image}
            alt={item.alt}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
          />

          {items.length > 1 && (
            <button
              type="button"
              className={`${styles.navButton} ${styles.next}`}
              onClick={onNext}
              aria-label="Next photo"
            >
              <Icon name="right" />
            </button>
          )}
        </div>

        <div className={styles.caption}>
          <div>
            <span className={styles.category}>{categoryLabel}</span>
            <h3 id="lightbox-title">{item.title}</h3>
          </div>
          <p>{item.caption}</p>
        </div>

        <p id="lightbox-help" className={styles.help}>
          Use the left and right arrow keys to browse. Press Escape to close.
        </p>
      </motion.div>
    </motion.div>,
    document.body
  );
}
