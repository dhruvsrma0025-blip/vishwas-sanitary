import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Seo from '../components/Seo.jsx';
import PageTransition from '../components/PageTransition.jsx';
import Icon from '../lib/icons.jsx';
import { siteData } from '../data/siteData.js';
import styles from './NotFound.module.css';

export default function NotFound() {
  return (
    <PageTransition>
      <Seo page="notFound" />

      <section className={styles.wrap} aria-labelledby="not-found-title">
        <span className={styles.bubbleOne} aria-hidden="true" />
        <span className={styles.bubbleTwo} aria-hidden="true" />
        <span className={styles.bubbleThree} aria-hidden="true" />
        <span className={styles.dots} aria-hidden="true" />

        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className={styles.badge}>
            <Icon name="droplet" />
          </span>
          <span className={styles.eyebrow}>404 · Page not found</span>
          <p className={styles.code} aria-hidden="true">
            4<span>0</span>4
          </p>
          <h1 id="not-found-title">This page has drained away.</h1>
          <p className={styles.description}>
            The page you are looking for may have moved or the link may be incorrect. Let’s
            get you back to something useful.
          </p>

          <div className={styles.actions}>
            <Link to="/" className="btn btnPrimary">
              Back to home
              <Icon name="arrow" />
            </Link>
            <Link to="/contact" className="btn btnOutline">
              Contact us
            </Link>
          </div>

          <div className={styles.phoneLine}>
            <span>Call us:</span>
            {siteData.contact.phones.map((phone, index) => (
              <span key={phone.id} className={styles.phoneEntry}>
                <a href={phone.href}>{phone.display}</a>
                {index === 0 && <span aria-hidden="true">·</span>}
              </span>
            ))}
          </div>
        </motion.div>
      </section>
    </PageTransition>
  );
}
