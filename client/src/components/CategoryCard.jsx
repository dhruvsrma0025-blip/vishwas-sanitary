import Icon from '../lib/icons.jsx';
import styles from './CategoryCard.module.css';

export default function CategoryCard({ item }) {
  return (
    <article className={styles.card}>
      <span className={styles.number} aria-hidden="true">
        {item.number}
      </span>
      <span className={styles.iconTile}>
        <Icon name={item.icon} />
      </span>
      <h3 className={styles.title}>{item.title}</h3>
      <p className={styles.description}>{item.description}</p>
    </article>
  );
}
