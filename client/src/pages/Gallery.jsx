import { useMemo, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Seo from '../components/Seo.jsx';
import PageTransition from '../components/PageTransition.jsx';
import PageHeader from '../components/PageHeader.jsx';
import GalleryGrid from '../components/GalleryGrid.jsx';
import Reveal from '../components/Reveal.jsx';
import Icon from '../lib/icons.jsx';
import { gallery } from '../data/siteData.js';
import styles from './Gallery.module.css';

const validCategories = new Set(gallery.categories.map((category) => category.id));

export default function Gallery() {
  const [searchParams, setSearchParams] = useSearchParams();
  const resultsRef = useRef(null);
  const requested = searchParams.get('category') || 'all';
  const activeCategory = validCategories.has(requested) ? requested : 'all';

  const filteredItems = useMemo(() => {
    if (activeCategory === 'all') return gallery.items;
    return gallery.items.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const categoryLabel =
    gallery.categories.find((category) => category.id === activeCategory)?.label || 'All';

  const getCount = (categoryId) =>
    categoryId === 'all'
      ? gallery.items.length
      : gallery.items.filter((item) => item.category === categoryId).length;

  const selectCategory = (categoryId) => {
    if (categoryId === 'all') {
      setSearchParams({}, { replace: true });
    } else {
      setSearchParams({ category: categoryId }, { replace: true });
    }

    // When the filter bar is stuck and the visitor is deep in the grid,
    // bring them back to the start of the results instead of leaving
    // them mid-scroll on a shorter list.
    const anchor = resultsRef.current;
    if (!anchor) return;
    const top = anchor.getBoundingClientRect().top + window.scrollY - 150;
    if (window.scrollY > top) {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top, behavior: reduceMotion ? 'auto' : 'smooth' });
    }
  };

  return (
    <PageTransition>
      <Seo page="gallery" />
      <PageHeader
        eyebrow="Gallery"
        title={gallery.title}
        description={gallery.description}
        breadcrumb="Gallery"
      />

      <section className={`section ${styles.gallerySection}`} aria-labelledby="gallery-grid-title">
        <div className="container">
          <h2 id="gallery-grid-title" className="srOnly">
            Filter the gallery
          </h2>

          <div className={styles.stickyBar}>
            <div className={styles.tabs} role="group" aria-label="Filter gallery by category">
              {gallery.categories.map((category) => {
                const isActive = category.id === activeCategory;
                return (
                  <button
                    key={category.id}
                    type="button"
                    className={`${styles.tab} ${isActive ? styles.tabActive : ''}`}
                    aria-pressed={isActive}
                    onClick={() => selectCategory(category.id)}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="gallery-active-tab"
                        className={styles.activePill}
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                        aria-hidden="true"
                      />
                    )}
                    <span className={styles.tabLabel}>{category.label}</span>
                    <span className={styles.tabCount}>{getCount(category.id)}</span>
                  </button>
                );
              })}
            </div>

            <span className={styles.resultCount} aria-live="polite">
              <strong>{filteredItems.length}</strong> photos
            </span>
          </div>

          <Reveal>
            <div className={styles.noteBar} ref={resultsRef}>
              <Icon name="info" />
              <p>{gallery.note}</p>
            </div>
          </Reveal>

          <p className={styles.gridMeta} aria-hidden="true">
            Showing <strong>{filteredItems.length}</strong>{' '}
            {activeCategory === 'all' ? 'photos' : `photos in ${categoryLabel}`}
          </p>

          <GalleryGrid key={activeCategory} items={filteredItems} />
        </div>
      </section>
    </PageTransition>
  );
}
