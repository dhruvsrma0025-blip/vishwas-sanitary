import Icon from '../lib/icons.jsx';
import Reveal from './Reveal.jsx';
import { getHoursLabel, siteData } from '../data/siteData.js';
import styles from './ContactStrip.module.css';

export default function ContactStrip() {
  return (
    <section className={styles.wrap} aria-labelledby="visit-strip-title">
      <Reveal>
        <div className={styles.card}>
          <div className={styles.orbOne} aria-hidden="true" />
          <div className={styles.orbTwo} aria-hidden="true" />

          <div className={styles.content}>
            <span className={styles.eyebrow}>
              <span aria-hidden="true" />
              Visit the shop
            </span>
            <h2 id="visit-strip-title">Find us in Pundri, Kaithal.</h2>
            <p>
              Come in and see the range for yourself, or call ahead if you are looking for
              something specific.
            </p>

            <div className={styles.meta}>
              <a
                className={styles.metaItem}
                href={siteData.contact.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className={styles.metaIcon}>
                  <Icon name="location" />
                </span>
                <span>
                  <small>Address</small>
                  {siteData.contact.address.full}
                </span>
              </a>

              <div className={styles.metaItem}>
                <span className={styles.metaIcon}>
                  <Icon name="clock" />
                </span>
                <span>
                  <small>Timings</small>
                  {siteData.hours.schedule
                    .map((row) => `${row.days}: ${getHoursLabel(row.hours)}`)
                    .join(' · ')}
                </span>
              </div>
            </div>
          </div>

          <div className={styles.panel}>
            <span className={styles.panelLabel}>Call or WhatsApp</span>

            {siteData.contact.phones.map((phone, index) => (
              <a key={phone.id} href={phone.href} className={styles.phoneButton}>
                <span className={styles.phoneIcon}>
                  <Icon name="phone" />
                </span>
                <span className={styles.phoneText}>
                  <small>Phone {index + 1}</small>
                  <strong>{phone.display}</strong>
                </span>
                <Icon name="arrow" className={styles.phoneArrow} />
              </a>
            ))}

            <a
              className={`btn btnWhatsApp btnBlock ${styles.whatsapp}`}
              href={siteData.contact.whatsapp.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="whatsapp" />
              Chat on WhatsApp
            </a>

            <a
              className={styles.directions}
              href={siteData.contact.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Get directions
              <Icon name="arrow" />
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
