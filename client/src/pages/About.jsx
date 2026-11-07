import { Link } from 'react-router-dom';
import Seo from '../components/Seo.jsx';
import PageTransition from '../components/PageTransition.jsx';
import PageHeader from '../components/PageHeader.jsx';
import SectionTitle from '../components/SectionTitle.jsx';
import Reveal from '../components/Reveal.jsx';
import FeatureCard from '../components/FeatureCard.jsx';
import Icon from '../lib/icons.jsx';
import { about, gallery } from '../data/siteData.js';
import styles from './About.module.css';

const galleryById = Object.fromEntries(gallery.items.map((item) => [item.id, item]));
const mainImage = galleryById['bath-vanity-display'];
const accentImage = galleryById['living-room-decor'];

export default function About() {
  return (
    <PageTransition>
      <Seo page="about" />
      <PageHeader
        eyebrow="About Vishwas"
        title={about.title}
        description={about.intro}
        breadcrumb="About Us"
      />

      <section className={`section ${styles.storySection}`} aria-labelledby="story-title">
        <div className="container">
          <div className={styles.storyGrid}>
            <Reveal className={styles.imageColumn}>
              <div className={styles.imageStack}>
                <div className={styles.mainImage}>
                  <img
                    src={mainImage.image}
                    alt={mainImage.alt}
                    width={960}
                    height={1280}
                    loading="lazy"
                  />
                </div>
                <div className={styles.accentImage}>
                  <img
                    src={accentImage.image}
                    alt={accentImage.alt}
                    width={1400}
                    height={1050}
                    loading="lazy"
                  />
                </div>
                <span className={styles.goldRing} aria-hidden="true" />
                <span className={styles.imageChip}>
                  <span className={styles.chipIcon}>
                    <Icon name="droplet" />
                  </span>
                  <span>
                    <strong>Bathroom &amp; home</strong>
                    <small>Sanitary and fancy items together</small>
                  </span>
                </span>
              </div>
            </Reveal>

            <div className={styles.storyCopy}>
              <Reveal>
                <span className={styles.eyebrow}>
                  <span aria-hidden="true" />
                  {about.storyEyebrow}
                </span>
              </Reveal>
              <Reveal delay={0.06}>
                <h2 id="story-title" className={styles.storyTitle}>
                  {about.storyTitle}
                </h2>
              </Reveal>

              {about.story.map((paragraph, index) => (
                <Reveal key={paragraph.slice(0, 28)} delay={0.1 + index * 0.05}>
                  <p className={styles.storyParagraph}>{paragraph}</p>
                </Reveal>
              ))}

              <Reveal delay={0.26}>
                <div className={styles.mission}>
                  <span className={styles.missionIcon}>
                    <Icon name="store" />
                  </span>
                  <div>
                    <h3>{about.mission.title}</h3>
                    <p>{about.mission.text}</p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.32}>
                <div className={styles.storyActions}>
                  <Link to="/gallery" className="btn btnPrimary">
                    Explore the gallery
                    <Icon name="arrow" />
                  </Link>
                  <Link to="/contact" className="btn btnOutline">
                    Contact us
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className={`section ${styles.valuesSection}`} aria-labelledby="values-title">
        <div className={styles.valuesDots} aria-hidden="true" />
        <div className="container">
          <SectionTitle
            id="values-title"
            eyebrow={about.valuesEyebrow}
            title={about.valuesTitle}
            description={about.valuesDescription}
          />
          <div className={styles.valuesGrid}>
            {about.values.map((item, index) => (
              <Reveal key={item.id} delay={index * 0.06}>
                <FeatureCard item={item} index={index} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className={`section ${styles.sellsSection}`} aria-labelledby="sells-title">
        <div className="container">
          <SectionTitle
            id="sells-title"
            eyebrow={about.sells.eyebrow}
            title={about.sells.title}
            description={about.sells.description}
            align="left"
          />

          <div className={styles.sellGrid}>
            <Reveal>
              <article className={`${styles.sellCard} ${styles.sanitaryCard}`}>
                <header className={styles.sellHeader}>
                  <span className={styles.sellIcon}>
                    <Icon name="bath" />
                  </span>
                  <div>
                    <h3>{about.sells.sanitaryTitle}</h3>
                    <p>{about.sells.sanitaryDescription}</p>
                  </div>
                </header>
                <ul className={styles.sellList}>
                  {about.sells.sanitary.map((item) => (
                    <li key={item}>
                      <Icon name="check" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link to="/gallery?category=sanitary" className="textLink">
                  View sanitary gallery
                  <Icon name="arrow" />
                </Link>
              </article>
            </Reveal>

            <Reveal delay={0.1}>
              <article className={`${styles.sellCard} ${styles.fancyCard}`}>
                <header className={styles.sellHeader}>
                  <span className={styles.sellIcon}>
                    <Icon name="decor" />
                  </span>
                  <div>
                    <h3>{about.sells.fancyTitle}</h3>
                    <p>{about.sells.fancyDescription}</p>
                  </div>
                </header>
                <ul className={styles.sellList}>
                  {about.sells.fancy.map((item) => (
                    <li key={item}>
                      <Icon name="check" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link to="/gallery?category=fancy" className="textLink">
                  View fancy items
                  <Icon name="arrow" />
                </Link>
              </article>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <p className={styles.stockNote}>
              <Icon name="info" />
              {about.sells.stockNote}
            </p>
          </Reveal>
        </div>
      </section>
    </PageTransition>
  );
}
