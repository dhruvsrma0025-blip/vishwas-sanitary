import Icon from '../lib/icons.jsx';
import styles from './FeatureCard.module.css';

export default function FeatureCard({ item, tone = 'light', index }) {
  return (
    <article className={`${styles.card} ${tone === 'dark' ? styles.dark : ''}`}>
      <div className={styles.top}>
        <span className={styles.iconTile}>
          <Icon name={item.icon} />
        </span>
        {typeof index === 'number' && (
          <span className={styles.index} aria-hidden="true">
            {String(index + 1).padStart(2, '0')}
          </span>
        )}
      </div>
      <h3 className={styles.title}>{item.title}</h3>
      <p className={styles.description}>{item.description}</p>
    </article>
  );
}
