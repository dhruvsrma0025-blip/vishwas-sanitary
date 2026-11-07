import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Logo from './Logo.jsx';
import Icon from '../lib/icons.jsx';
import { siteData } from '../data/siteData.js';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock.js';
import { useEscapeKey } from '../hooks/useEscapeKey.js';
import styles from './Navbar.module.css';

const phone = siteData.contact.phones[0];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const panelRef = useRef(null);
  const closeButtonRef = useRef(null);

  useBodyScrollLock(menuOpen);
  useEscapeKey(() => setMenuOpen(false), menuOpen);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 901px)');
    const handleChange = (event) => {
      if (event.matches) setMenuOpen(false);
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Basic focus trap + focus restore for the mobile drawer.
  useEffect(() => {
    if (!menuOpen || !panelRef.current) return undefined;

    const panel = panelRef.current;
    const previouslyFocused = document.activeElement;
    const selector =
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

    const focusable = Array.from(panel.querySelectorAll(selector)).filter(
      (element) => element.offsetParent !== null
    );
    closeButtonRef.current?.focus();

    const trapFocus = (event) => {
      if (event.key !== 'Tab' || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    panel.addEventListener('keydown', trapFocus);
    return () => {
      panel.removeEventListener('keydown', trapFocus);
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
    };
  }, [menuOpen]);

  const drawerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.055, delayChildren: 0.12 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 18 },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <>
      <div className={styles.topbar}>
        <div className={`container ${styles.topbarInner}`}>
          <span className={styles.topLocation}>
            <Icon name="location" />
            {siteData.contact.address.full}
          </span>
          <div className={styles.topPhones}>
            <span className={styles.callLabel}>Call us:</span>
            {siteData.contact.phones.map((entry) => (
              <a key={entry.id} href={entry.href} className={styles.topPhone}>
                <Icon name="phone" />
                {entry.display}
              </a>
            ))}
          </div>
        </div>
      </div>

      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
        <nav className={styles.nav} aria-label="Main navigation">
          <div className={`container ${styles.navInner}`}>
            <Logo />

            <div className={styles.desktopLinks}>
              {siteData.nav.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `${styles.link} ${isActive ? styles.linkActive : ''}`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>

            <div className={styles.actions}>
              <a className={`btn btnPrimary btnSmall ${styles.callButton}`} href={phone.href}>
                <Icon name="phone" />
                Call Now
              </a>

              <button
                type="button"
                className={`${styles.menuButton} ${menuOpen ? styles.menuButtonOpen : ''}`}
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                onClick={() => setMenuOpen((open) => !open)}
              >
                <span />
                <span />
                <span />
              </button>
            </div>
          </div>
        </nav>

        <AnimatePresence>
          {menuOpen && (
            <>
              <motion.button
                type="button"
                className={styles.backdrop}
                aria-label="Close menu"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                onClick={() => setMenuOpen(false)}
              />

              <motion.div
                id="mobile-menu"
                ref={panelRef}
                className={styles.drawer}
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                role="dialog"
                aria-modal="true"
                aria-label="Mobile navigation"
              >
                <div className={styles.drawerHeader}>
                  <Logo inverted onClick={() => setMenuOpen(false)} />
                  <button
                    ref={closeButtonRef}
                    type="button"
                    className={styles.closeButton}
                    aria-label="Close menu"
                    onClick={() => setMenuOpen(false)}
                  >
                    <Icon name="close" />
                  </button>
                </div>

                <motion.div
                  className={styles.drawerBody}
                  variants={drawerVariants}
                  initial="hidden"
                  animate="show"
                >
                  <motion.nav variants={itemVariants} className={styles.mobileNav} aria-label="Mobile">
                    {siteData.nav.map((item, index) => (
                      <NavLink
                        key={item.to}
                        to={item.to}
                        end={item.to === '/'}
                        onClick={() => setMenuOpen(false)}
                        className={({ isActive }) =>
                          `${styles.mobileLink} ${isActive ? styles.mobileLinkActive : ''}`
                        }
                      >
                        <span className={styles.mobileIndex}>0{index + 1}</span>
                        {item.label}
                        <Icon name="arrow" className={styles.mobileArrow} />
                      </NavLink>
                    ))}
                  </motion.nav>

                  <motion.div variants={itemVariants} className={styles.drawerContact}>
                    <p className={styles.drawerLabel}>Talk to us</p>
                    {siteData.contact.phones.map((entry) => (
                      <a key={entry.id} href={entry.href} className={styles.drawerPhone}>
                        <Icon name="phone" />
                        {entry.display}
                      </a>
                    ))}
                    <a
                      className={`btn btnWhatsApp btnBlock ${styles.drawerWhatsApp}`}
                      href={siteData.contact.whatsapp.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Icon name="whatsapp" />
                      Chat on WhatsApp
                    </a>
                  </motion.div>

                  <motion.div variants={itemVariants} className={styles.drawerAddress}>
                    <Icon name="location" />
                    <p>{siteData.contact.address.full}</p>
                  </motion.div>
                </motion.div>

                <div className={styles.drawerFooter}>
                  <span>आपका स्वागत है</span>
                  <span>{siteData.hours.note}</span>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
