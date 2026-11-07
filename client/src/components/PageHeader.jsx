import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './PageHeader.module.css';

export default function PageHeader({ eyebrow, title, description, breadcrumb, children }) {
  return (
    <header className={styles.header}>
      <div className={styles.orbOne} aria-hidden="true" />
      <div className={styles.orbTwo} aria-hidden="true" />
      <div className={styles.dots} aria-hidden="true" />

      <div className="container">
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{breadcrumb || title}</span>
          </nav>

          {eyebrow && (
            <span className={styles.eyebrow}>
              <span aria-hidden="true" />
              {eyebrow}
            </span>
          )}

          <h1 className={styles.title}>{title}</h1>
          {description && <p className={styles.description}>{description}</p>}
          {children && <div className={styles.extra}>{children}</div>}
        </motion.div>
      </div>

      <div className={styles.bottomRule} aria-hidden="true" />
    </header>
  );
}
