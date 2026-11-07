import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { siteData } from '../data/siteData.js';

const trimTrailingSlash = (value) => value.replace(/\/+$/, '');
const ensureLeadingSlash = (value) => (value.startsWith('/') ? value : `/${value}`);

export default function Seo({ page = 'home' }) {
  const { pathname } = useLocation();
  const seo = siteData.seo;
  const pageMeta = seo.pages[page] || seo.pages.home;

  const origin =
    trimTrailingSlash(seo.siteUrl) ||
    (typeof window !== 'undefined' ? window.location.origin : '');
  const canonicalPath = pathname === '/' ? '/' : trimTrailingSlash(pathname) || '/';
  const canonicalUrl = `${origin}${canonicalPath}`;
  const imageUrl = `${origin}${ensureLeadingSlash(seo.ogImage)}`;
  const ogTitle = pageMeta.ogTitle || pageMeta.title;
  const ogDescription = pageMeta.ogDescription || pageMeta.description;

  return (
    <Helmet>
      <title>{pageMeta.title}</title>
      <meta name="description" content={pageMeta.description} />
      <meta name="keywords" content={seo.keywords.join(', ')} />
      <meta name="author" content={seo.siteName} />
      <meta
        name="robots"
        content={page === 'notFound' ? 'noindex, follow' : 'index, follow'}
      />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={seo.siteName} />
      <meta property="og:locale" content={seo.locale} />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:type" content={seo.ogImageType} />
      <meta property="og:image:width" content={String(seo.ogImageWidth)} />
      <meta property="og:image:height" content={String(seo.ogImageHeight)} />
      <meta property="og:image:alt" content={seo.ogImageAlt} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={ogTitle} />
      <meta name="twitter:description" content={ogDescription} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content={seo.ogImageAlt} />
    </Helmet>
  );
}
