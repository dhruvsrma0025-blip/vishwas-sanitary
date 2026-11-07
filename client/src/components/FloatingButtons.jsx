import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import Icon from '../lib/icons.jsx';
import ScrollToTopButton from './ScrollToTopButton.jsx';
import { siteData } from '../data/siteData.js';
import styles from './FloatingButtons.module.css';

const phone = siteData.contact.phones[0];

export default function FloatingButtons() {
  const { pathname } = useLocation();
  const isContactPage = pathname === '/contact';

  return (
    <div
      className={`${styles.stack} ${isContactPage ? styles.solo : ''}`}
      role="group"
      aria-label="Quick contact"
    >
      <ScrollToTopButton />

      {!isContactPage && (
        <>
          <motion.a
            href={phone.href}
            className={`${styles.float} ${styles.call}`}
            aria-label={`Call Vishwas Sanitary and Fancy Items at ${phone.display}`}
            initial={{ opacity: 0, y: 16, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 1.35, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <Icon name="phone" />
            <span className={styles.tooltip} aria-hidden="true">
              Call {phone.display}
            </span>
          </motion.a>

          <motion.a
            href={siteData.contact.whatsapp.url}
            className={`${styles.float} ${styles.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with Vishwas Sanitary and Fancy Items on WhatsApp"
            initial={{ opacity: 0, y: 16, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 1.5, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <Icon name="whatsapp" />
            <span className={styles.tooltip} aria-hidden="true">
              Chat on WhatsApp
            </span>
          </motion.a>

          {siteData.contact.socials.map((social, index) => (
            <motion.a
              key={social.id}
              href={social.url}
              className={`${styles.float} ${styles[social.id]} ${styles.social}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Follow Vishwas Sanitary and Fancy Items on ${social.label}`}
              initial={{ opacity: 0, y: 16, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                delay: 1.65 + index * 0.15,
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Icon name={social.icon} />
              <span className={styles.tooltip} aria-hidden="true">
                {social.label}
              </span>
            </motion.a>
          ))}
        </>
      )}
    </div>
  );
}
