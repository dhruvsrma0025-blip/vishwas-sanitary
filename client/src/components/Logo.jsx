import { useId } from 'react';
import { Link } from 'react-router-dom';
import { siteData } from '../data/siteData.js';
import styles from './Logo.module.css';

export function LogoMark({ size = 46, className = '' }) {
  const uniqueId = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const backgroundId = `logo-bg-${uniqueId}`;
  const dropId = `logo-drop-${uniqueId}`;

  return (
    <svg
      className={`${styles.mark} ${className}`}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role="img"
      aria-label="Vishwas Sanitary and Fancy Items logo"
    >
      <defs>
        <linearGradient id={backgroundId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0a3a5c" />
          <stop offset="1" stopColor="#041e30" />
        </linearGradient>
        <linearGradient id={dropId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7cf0e6" />
          <stop offset="1" stopColor="#0a9292" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="17" fill={`url(#${backgroundId})`} />
      <path
        d="M32 12c0 0 13 14.2 13 23a13 13 0 0 1-26 0c0-8.8 13-23 13-23z"
        fill={`url(#${dropId})`}
      />
      <path
        d="M25 35a7 7 0 0 0 7 7"
        fill="none"
        stroke="#eafcfa"
        strokeWidth="2.6"
        strokeLinecap="round"
        opacity="0.75"
      />
      <circle cx="44.5" cy="19.5" r="3.2" fill="#d8b45c" />
    </svg>
  );
}

export default function Logo({ inverted = false, onClick, className = '' }) {
  return (
    <Link
      to="/"
      onClick={onClick}
      className={`${styles.logo} ${inverted ? styles.inverted : ''} ${className}`}
      aria-label={`${siteData.shop.name} — home`}
    >
      <LogoMark size={46} />
      <span className={styles.text}>
        <span className={styles.wordmark}>{siteData.shop.wordmark}</span>
        <span className={styles.sub}>{siteData.shop.wordmarkSub}</span>
      </span>
    </Link>
  );
}
