import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import Seo from '../components/Seo.jsx';
import PageTransition from '../components/PageTransition.jsx';
import SectionTitle from '../components/SectionTitle.jsx';
import Reveal from '../components/Reveal.jsx';
import CategoryCard from '../components/CategoryCard.jsx';
import FeatureCard from '../components/FeatureCard.jsx';
import Icon from '../lib/icons.jsx';
import { gallery, siteData } from '../data/siteData.js';
import styles from './Home.module.css';

const hero = siteData.hero;
const primaryPhone = siteData.contact.phones[0];

const galleryById = Object.fromEntries(gallery.items.map((item) => [item.id, item]));
const featuredItems = gallery.featuredIds.map((id) => galleryById[id]).filter(Boolean);
const categoryLabels = Object.fromEntries(
  gallery.categories.map((category) => [category.id, category.label])
);

export default function Home() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <PageTransition>
      <Seo page="home" />

      <section className={styles.hero} aria-labelledby="hero-title">
        <div className={styles.heroBackdrop} aria-hidden="true">
          <span className={styles.blobOne} />
          <span className={styles.blobTwo} />
          <span className={styles.bubbleA} />
          <span className={styles.bubbleB} />
          <span className={styles.bubbleC} />
          <span className={styles.dots} />
        </div>

        <div className={`container ${styles.heroInner}`}>
          <motion.div
            className={styles.heroCopy}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={styles.topline}>
              <span className={styles.greeting}>{hero.greeting}</span>
              <span className={styles.dot} aria-hidden="true" />
              <span className={styles.eyebrow}>
                {hero.welcomeText} {siteData.shop.shortName}
              </span>
            </div>

            <h1 id="hero-title" className={styles.title}>
              {hero.title}
              <span className={styles.titleAccent}>{hero.titleAccent}</span>
            </h1>

            <p className={styles.tagline}>{hero.tagline}</p>
            <p className={styles.description}>{hero.description}</p>

            <p className={styles.location}>
              <Icon name="location" />
              {siteData.contact.address.full}
            </p>

            <div className={styles.actions}>
              <a href={primaryPhone.href} className="btn btnPrimary">
                <Icon name="phone" />
                {hero.primaryCta}
              </a>
              <Link to="/gallery" className="btn btnOutline">
                {hero.secondaryCta}
                <Icon name="arrow" />
              </Link>
            </div>

            <div className={styles.phonesLine}>
              <span>Call us:</span>
              {siteData.contact.phones.map((phone, index) => (
                <span key={phone.id} className={styles.phoneEntry}>
                  <a href={phone.href}>{phone.display}</a>
                  {index < siteData.contact.phones.length - 1 ? <span aria-hidden="true">,</span> : null}
                </span>
              ))}
            </div>

            <ul className={styles.trustRow}>
              {hero.trustPoints.map((point) => (
                <li key={point}>
                  <Icon name="check" />
                  {point}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            className={styles.visual}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={styles.goldRing} aria-hidden="true" />

            <div className={styles.visualMain}>
              <img
                src={hero.images.main.src}
                alt={hero.images.main.alt}
                loading="eager"
                fetchpriority="high"
              />
            </div>

            <motion.div
              className={styles.visualSecondary}
              animate={prefersReducedMotion ? undefined : { y: [0, -9, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <img
                src={hero.images.secondary.src}
                alt={hero.images.secondary.alt}
                loading="lazy"
              />
            </motion.div>

            <div className={styles.visualDetail}>
              <img src={hero.images.detail.src} alt={hero.images.detail.alt} loading="lazy" />
            </div>

            <motion.div
              className={styles.visitChip}
              animate={prefersReducedMotion ? undefined : { y: [0, 6, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
            >
              <span className={styles.chipIcon}>
                <Icon name="store" />
              </span>
              <span>
                <strong>Visit the shop</strong>
                <small>Pundri, Kaithal</small>
              </span>
            </motion.div>
          </motion.div>
        </div>

        <div className={styles.marquee} aria-hidden="true">
          <div className={styles.marqueeTrack}>
            {[...siteData.marquee, ...siteData.marquee].map((item, index) => (
              <span key={`${item}-${index}`} className={styles.marqueeItem}>
                {item}
                <span className={styles.marqueeDot}>◆</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className={`section ${styles.categories}`} aria-labelledby="highlights-title">
        <div className="container">
          <SectionTitle
            id="highlights-title"
            eyebrow={siteData.highlights.eyebrow}
            title={siteData.highlights.title}
            description={siteData.highlights.description}
          />

          <div className={styles.categoryGrid}>
            {siteData.highlights.items.map((item, index) => (
              <Reveal key={item.id} delay={index * 0.07} className={styles.cardWrap}>
                <CategoryCard item={item} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.why} aria-labelledby="why-title">
        <span className={styles.whyOrbOne} aria-hidden="true" />
        <span className={styles.whyOrbTwo} aria-hidden="true" />
        <div className={`container ${styles.whyInner}`}>
          <div className={styles.whyIntro}>
            <SectionTitle
              id="why-title"
              eyebrow={siteData.whyChooseUs.eyebrow}
              title={siteData.whyChooseUs.title}
              description={siteData.whyChooseUs.description}
              align="left"
              tone="dark"
              className={styles.whyTitle}
            />
            <Reveal delay={0.15}>
              <Link to="/about" className="btn btnGold">
                More about us
                <Icon name="arrow" />
              </Link>
            </Reveal>
            <Reveal delay={0.22}>
              <div className={styles.whyNote}>
                <span className={styles.whyNoteIcon}>
                  <Icon name="store" />
                </span>
                <p>
                  <strong>A real shop, real people.</strong> Come in, take a look and ask us
                  anything about the range.
                </p>
              </div>
            </Reveal>
          </div>

          <div className={styles.whyGrid}>
            {siteData.whyChooseUs.items.map((item, index) => (
              <Reveal key={item.id} delay={index * 0.06}>
                <FeatureCard item={item} tone="dark" index={index} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className={`section ${styles.featured}`} aria-labelledby="featured-title">
        <div className="container">
          <SectionTitle
            id="featured-title"
            eyebrow={gallery.eyebrow}
            title={gallery.title}
            description="A small preview of the sanitary and décor inspiration in our gallery."
            align="left"
          />

          <div className={styles.featuredGrid}>
            {featuredItems.map((item, index) => (
              <Reveal
                key={item.id}
                delay={Math.min(index * 0.05, 0.25)}
                className={`${styles.featuredCell} ${
                  index === 0 ? styles.featuredCellLarge : ''
                }`}
              >
                <Link
                  to={`/gallery?category=${item.category}`}
                  className={styles.featuredCard}
                  aria-label={`View ${item.title} in the gallery`}
                >
                  <img src={item.image} alt={item.alt} loading="lazy" />
                  <span className={styles.featuredOverlay}>
                    <span className={styles.featuredTag}>
                      {categoryLabels[item.category]}
                    </span>
                    <span className={styles.featuredTitle}>{item.title}</span>
                  </span>
                  <span className={styles.featuredArrow} aria-hidden="true">
                    <Icon name="arrow" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>

          <div className={styles.featuredFooter}>
            <p className={styles.placeholderNote}>
              <Icon name="info" />
              Showroom photos and display references. Visit the shop to see the current range.
            </p>
            <Link to="/gallery" className="btn btnPrimary">
              View full gallery
              <Icon name="arrow" />
            </Link>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
