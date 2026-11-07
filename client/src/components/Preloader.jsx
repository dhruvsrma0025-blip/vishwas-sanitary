import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { siteData } from '../data/siteData.js';
import { LogoMark } from './Logo.jsx';
import styles from './Preloader.module.css';

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const timer = window.setTimeout(
      () => setLoading(false),
      prefersReducedMotion ? 450 : 1200
    );
    return () => window.clearTimeout(timer);
  }, [prefersReducedMotion]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className={styles.screen}
          role="status"
          aria-live="polite"
          aria-label="Loading Vishwas Sanitary and Fancy Items"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          <div className={styles.bubbleOne} aria-hidden="true" />
          <div className={styles.bubbleTwo} aria-hidden="true" />
          <div className={styles.bubbleThree} aria-hidden="true" />

          <div className={styles.center}>
            <motion.div
              className={styles.markWrap}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <LogoMark size={70} />
            </motion.div>

            <motion.p
              className={styles.wordmark}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.16, duration: 0.5 }}
            >
              {siteData.shop.wordmark}
            </motion.p>
            <motion.span
              className={styles.sub}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.28, duration: 0.5 }}
            >
              Sanitary &amp; Fancy Items
            </motion.span>
            <motion.span
              className={styles.greeting}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              आपका स्वागत है
            </motion.span>

            <div className={styles.track} aria-hidden="true">
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  delay: 0.25,
                  duration: prefersReducedMotion ? 0.01 : 0.8,
                  ease: 'easeInOut',
                }}
              />
            </div>
          </div>

          <p className={styles.location}>{siteData.shop.locationShort} · Kaithal, Haryana</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
