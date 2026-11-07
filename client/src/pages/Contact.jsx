import Seo from '../components/Seo.jsx';
import PageTransition from '../components/PageTransition.jsx';
import PageHeader from '../components/PageHeader.jsx';
import Reveal from '../components/Reveal.jsx';
import ContactForm from '../components/ContactForm.jsx';
import Icon from '../lib/icons.jsx';
import { getHoursLabel, siteData } from '../data/siteData.js';
import styles from './Contact.module.css';

const { contact, hours, shop } = siteData;

export default function Contact() {
  return (
    <PageTransition>
      <Seo page="contact" />
      <PageHeader
        eyebrow="Contact"
        title={siteData.contactPage.title}
        description={siteData.contactPage.description}
        breadcrumb="Contact"
      >
        <div className={styles.headerActions}>
          <a href={contact.phones[0].href} className={`btn btnGold ${styles.headerAction}`}>
            <Icon name="phone" />
            Call {contact.phones[0].display}
          </a>
          <a
            href={contact.whatsapp.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`btn btnWhatsApp ${styles.headerAction}`}
          >
            <Icon name="whatsapp" />
            WhatsApp
          </a>
          <a
            href={contact.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`btn btnLight ${styles.headerAction}`}
          >
            <Icon name="directions" />
            Get directions
          </a>
        </div>
      </PageHeader>

      <section className={`section ${styles.contactSection}`} aria-labelledby="contact-details-title">
        <div className="container">
          <div className={styles.grid}>
            <div className={styles.infoColumn}>
              <Reveal>
                <div className={styles.intro}>
                  <span className={styles.eyebrow}>
                    <span aria-hidden="true" />
                    Contact details
                  </span>
                  <h2 id="contact-details-title">Call, message or visit.</h2>
                  <p>
                    Use whichever is easiest for you. If we are busy with a customer, please
                    try the other number or send a WhatsApp message.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.06}>
                <div className={styles.contactHub}>
                  <div className={styles.hubHeader}>
                    <span className={styles.hubIcon}>
                      <Icon name="phone" />
                    </span>
                    <div className={styles.hubIntro}>
                      <h3>Call or message</h3>
                      <p>Tap a number to call, or send us a WhatsApp message.</p>
                    </div>
                  </div>

                  <div className={styles.hubList}>
                    {contact.phones.map((phone, index) => (
                      <a
                        key={phone.id}
                        href={phone.href}
                        className={styles.hubRow}
                        aria-label={`Call ${shop.name} at ${phone.display}`}
                      >
                        <span className={styles.hubRowIcon}>
                          <Icon name="phone" />
                        </span>
                        <span className={styles.hubRowText}>
                          <small>Phone {index + 1}</small>
                          <strong>{phone.display}</strong>
                        </span>
                        <span className={styles.hubRowAction}>
                          Call
                          <Icon name="arrow" />
                        </span>
                      </a>
                    ))}

                    <a
                      href={contact.whatsapp.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${styles.hubRow} ${styles.hubRowWhatsApp}`}
                      aria-label={`Chat with ${shop.name} on WhatsApp at ${contact.whatsapp.display}`}
                    >
                      <span className={`${styles.hubRowIcon} ${styles.hubWhatsAppIcon}`}>
                        <Icon name="whatsapp" />
                      </span>
                      <span className={styles.hubRowText}>
                        <small>WhatsApp</small>
                        <strong>{contact.whatsapp.display}</strong>
                      </span>
                      <span className={styles.hubRowAction}>
                        Chat
                        <Icon name="arrow" />
                      </span>
                    </a>
                  </div>
                </div>
              </Reveal>

              {contact.socials.length > 0 && (
                <Reveal delay={0.14}>
                  <div className={styles.socialCard}>
                    <div className={styles.socialHeading}>
                      <h3>Follow us</h3>
                      <p>See new stock and shop updates on social media.</p>
                    </div>
                    <div className={styles.socialLinks}>
                      {contact.socials.map((social) => (
                        <a
                          key={social.id}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`${styles.socialLink} ${styles[social.id]}`}
                          aria-label={`${shop.name} on ${social.label}`}
                        >
                          <span className={styles.socialIcon}>
                            <Icon name={social.icon} />
                          </span>
                          <span className={styles.socialInfo}>
                            <small>{social.label}</small>
                            <strong>{social.handle}</strong>
                          </span>
                          <Icon name="arrow" className={styles.socialArrow} />
                        </a>
                      ))}
                    </div>
                  </div>
                </Reveal>
              )}

              <Reveal delay={0.16}>
                <div className={styles.infoCard}>
                  <span className={styles.infoIcon}>
                    <Icon name="location" />
                  </span>
                  <div className={styles.infoContent}>
                    <h3>Visit the shop</h3>
                    <p>
                      {contact.address.line1},
                      <br />
                      {contact.address.line2},
                      <br />
                      {contact.address.line3}
                    </p>
                    <a
                      href={contact.directionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="textLink"
                    >
                      Get directions
                      <Icon name="arrow" />
                    </a>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <div className={styles.infoCard}>
                  <span className={styles.infoIcon}>
                    <Icon name="clock" />
                  </span>
                  <div className={styles.infoContent}>
                    <h3>Shop timings</h3>
                    <ul className={styles.hoursList}>
                      {hours.schedule.map((row) => (
                        <li key={row.days}>
                          <span>{row.days}</span>
                          <strong>{getHoursLabel(row.hours)}</strong>
                        </li>
                      ))}
                    </ul>
                    <p className={styles.hoursNote}>{hours.note}</p>
                  </div>
                </div>
              </Reveal>

              {contact.email && (
                <Reveal delay={0.24}>
                  <a href={`mailto:${contact.email}`} className={styles.infoCard}>
                    <span className={styles.infoIcon}>
                      <Icon name="mail" />
                    </span>
                    <div className={styles.infoContent}>
                      <h3>Email</h3>
                      <p>{contact.email}</p>
                    </div>
                  </a>
                </Reveal>
              )}
            </div>

            <Reveal delay={0.1} className={styles.formColumn}>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </section>

      <section className={styles.mapSection} aria-labelledby="map-title">
        <div className="container">
          <Reveal>
            <div className={styles.mapCard}>
              <div className={styles.mapHeader}>
                <div>
                  <span className={styles.mapEyebrow}>Find us</span>
                  <h2 id="map-title">Pundri, Kaithal</h2>
                  <p>
                    {shop.name} · {contact.address.full} · {contact.address.line3}
                  </p>
                </div>
                <a
                  href={contact.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`btn btnPrimary ${styles.mapButton}`}
                >
                  <Icon name="directions" />
                  Open in Google Maps
                </a>
              </div>

              <div className={styles.mapFrame}>
                <iframe
                  title={`Google Map showing the location of ${shop.name} in Pundri, Kaithal`}
                  src={contact.mapEmbedUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>

              <div className={styles.mapFooter}>
                <span>
                  <Icon name="location" />
                  {contact.address.full}
                </span>
                <span>
                  <Icon name="phone" />
                  <a href={contact.phones[0].href}>{contact.phones[0].display}</a>
                  <span aria-hidden="true">·</span>
                  <a href={contact.phones[1].href}>{contact.phones[1].display}</a>
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </PageTransition>
  );
}
