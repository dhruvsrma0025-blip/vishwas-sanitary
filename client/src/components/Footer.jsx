import { Link } from 'react-router-dom';
import Logo from './Logo.jsx';
import Icon from '../lib/icons.jsx';
import { getHoursLabel, siteData } from '../data/siteData.js';
import styles from './Footer.module.css';

const socials = [
  {
    id: 'instagram',
    label: 'Instagram',
    icon: 'instagram',
    url: siteData.socialLinks.instagram,
  },
  {
    id: 'facebook',
    label: 'Facebook',
    icon: 'facebook',
    url: siteData.socialLinks.facebook,
  },
].filter((social) => Boolean(social.url));

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaCard}>
            <div className={styles.ctaContent}>
              <span className={styles.ctaEyebrow}>Planning a bathroom or a room refresh?</span>
              <h2>Let’s help you find the right fit.</h2>
              <p>
                Call either number or send us a WhatsApp message. Tell us what you need and we
                will help you choose.
              </p>
            </div>
            <div className={styles.ctaActions}>
              {siteData.contact.phones.map((phone, index) => (
                <a
                  key={phone.id}
                  href={phone.href}
                  className={`btn ${index === 0 ? 'btnGold' : 'btnLight'}`}
                >
                  <Icon name="phone" />
                  {phone.display}
                </a>
              ))}
              <a
                href={siteData.contact.whatsapp.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`btn btnWhatsApp ${styles.ctaWhatsApp}`}
              >
                <Icon name="whatsapp" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className={`container ${styles.main}`}>
        <div className={styles.brand}>
          <Logo inverted />
          <p>
            Sanitary ware, bathroom fittings and fancy decorative items in Pundri, Kaithal —
            for homes in the town and nearby areas.
          </p>
          {socials.length > 0 && (
            <div className={styles.socials} aria-label="Social media">
              {socials.map((social) => (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${siteData.shop.name} on ${social.label}`}
                  className={styles.socialLink}
                >
                  <Icon name={social.icon} />
                </a>
              ))}
            </div>
          )}
        </div>

        <div className={styles.column}>
          <h3 className={styles.columnTitle}>Quick Links</h3>
          <nav className={styles.links} aria-label="Footer navigation">
            {siteData.nav.map((item) => (
              <Link key={item.to} to={item.to}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className={styles.column}>
          <h3 className={styles.columnTitle}>What We Sell</h3>
          <nav className={styles.links} aria-label="Product categories">
            {siteData.highlights.items.map((item) => (
              <Link key={item.id} to={item.to}>
                {item.title}
              </Link>
            ))}
          </nav>
        </div>

        <div className={styles.column}>
          <h3 className={styles.columnTitle}>Visit or Call</h3>
          <a
            className={styles.contactItem}
            href={siteData.contact.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="location" />
            <span>
              {siteData.contact.address.line1},
              <br />
              {siteData.contact.address.line2},
              <br />
              {siteData.contact.address.line3}
            </span>
          </a>

          <div className={styles.phoneGroup}>
            {siteData.contact.phones.map((phone, index) => (
              <span key={phone.id} className={styles.phoneItem}>
                <a href={phone.href} className={styles.phoneLinkInline}>
                  <Icon name="phone" />
                  {phone.display}
                </a>
                {index < siteData.contact.phones.length - 1 ? (
                  <span className={styles.phoneComma}>,</span>
                ) : null}
              </span>
            ))}
          </div>

          <div className={styles.contactItem}>
            <Icon name="clock" />
            <span>
              {siteData.hours.schedule.map((row) => (
                <span key={row.days} className={styles.hoursRow}>
                  {row.days}: {getHoursLabel(row.hours)}
                </span>
              ))}
              <span className={styles.hoursNote}>{siteData.hours.note}</span>
            </span>
          </div>
        </div>
      </div>

      <div className={`container ${styles.bottom}`}>
        <p>
          © {year} {siteData.shop.name}. All rights reserved.
        </p>
        <p className={styles.bottomNote}>
          Some display images are references. Visit the shop to see the current range.
        </p>
      </div>
    </footer>
  );
}
