import { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../lib/icons.jsx';
import Lightbox from './Lightbox.jsx';
import { gallery } from '../data/siteData.js';
import styles from './GalleryGrid.module.css';

const categoryLabels = Object.fromEntries(
  gallery.categories.map((category) => [category.id, category.label])
);

// The intrinsic dimensions match the local image files and prevent
// layout jumps while lazy-loaded images decode.
const imageSizes = {
  // Real showroom photos (960 × 1280 portrait)
  'wall-panel-finishes': [960, 1280],
  'designer-pedestal-basin': [960, 1280],
  'modern-bathroom-display': [960, 1280],
  'vanity-toilet-display': [960, 1280],
  'bathroom-set-display': [960, 1280],
  'bath-shower-display': [960, 1280],
  'fluted-wall-panels': [960, 1280],
  'silver-basin-display': [960, 1280],
  'basin-mixer-display': [960, 1280],
  'glass-shower-display': [960, 1280],
  'bath-vanity-display': [960, 1280],
  'shower-panel-display': [960, 1280],
  'black-wall-basin': [960, 1280],
  'tap-mixer-range': [960, 1280],
  'toilet-shelf-display': [960, 1280],
  'pedestal-basin-display': [960, 1280],
  'bathroom-shelves': [960, 1280],
  // Fancy display references
  'bedroom-styling': [1200, 1600],
  'entryway-decor': [1200, 1600],
  'bedroom-decor': [1200, 1600],
  'statement-sofa': [1600, 900],
};

export default function GalleryGrid({ items }) {
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    setActiveIndex(null);
  }, [items]);

  const close = useCallback(() => setActiveIndex(null), []);
  const next = useCallback(() => {
    setActiveIndex((index) => {
      if (index === null) return null;
      return (index + 1) % items.length;
    });
  }, [items.length]);
  const previous = useCallback(() => {
    setActiveIndex((index) => {
      if (index === null) return null;
      return (index - 1 + items.length) % items.length;
    });
  }, [items.length]);

  if (items.length === 0) {
    return (
      <div className={styles.empty} role="status">
        <Icon name="zoom" />
        <h3>No photos in this category yet</h3>
        <p>Please check the other category or call us to ask about the range.</p>
      </div>
    );
  }

  return (
    <>
      <div className={styles.grid}>
        {items.map((item, index) => {
          const [width, height] = imageSizes[item.id] || [1400, 1050];
          return (
            <motion.button
              key={item.id}
              type="button"
              className={styles.item}
              onClick={() => setActiveIndex(index)}
              aria-label={`Open larger image: ${item.title}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{
                duration: 0.55,
                delay: Math.min(index * 0.035, 0.25),
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <span className={styles.media}>
                <img
                  src={item.image}
                  alt={item.alt}
                  width={width}
                  height={height}
                  loading="lazy"
                  decoding="async"
                />
              </span>
              <span className={styles.zoom} aria-hidden="true">
                <Icon name="zoom" />
              </span>
              <span className={styles.caption}>
                <span className={styles.tag}>{categoryLabels[item.category] || 'Gallery'}</span>
                <span className={styles.captionTitle}>{item.title}</span>
              </span>
            </motion.button>
          );
        })}
      </div>

      <Lightbox
        items={items}
        index={activeIndex}
        onClose={close}
        onNext={next}
        onPrev={previous}
      />
    </>
  );
}
