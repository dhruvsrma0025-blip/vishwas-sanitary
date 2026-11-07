import { motion } from 'framer-motion';
import styles from './PageTransition.module.css';

export default function PageTransition({ children }) {
  return (
    <motion.main
      id="main-content"
      className={styles.page}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.main>
  );
}
