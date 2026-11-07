import Reveal from './Reveal.jsx';
import styles from './SectionTitle.module.css';

export default function SectionTitle({
  eyebrow,
  title,
  description,
  align = 'center',
  tone = 'light',
  id,
  className = '',
}) {
  return (
    <div
      className={`${styles.wrap} ${styles[align]} ${tone === 'dark' ? styles.dark : ''} ${className}`}
    >
      {eyebrow && (
        <Reveal>
          <span className={styles.eyebrow}>
            <span className={styles.line} aria-hidden="true" />
            {eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal delay={0.08}>
        <h2 id={id} className={styles.title}>
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.15}>
          <p className={styles.description}>{description}</p>
        </Reveal>
      )}
    </div>
  );
}
