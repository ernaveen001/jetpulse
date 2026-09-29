export const SITE_URL = 'https://www.jetpulse.in';
export const SITE_NAME = 'JetPulse';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;
export const LOGO_URL = `${SITE_URL}/logo.png`;

export const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: 'JetPulse',
  url: SITE_URL,
  logo: {
    '@type': 'ImageObject',
    url: LOGO_URL,
    width: '512',
    height: '512',
  },
  description: 'Stealth healthcare startup.',
  slogan: 'Building the future of healthcare.',
  telephone: '+91-80-6929-0000',
  priceRange: '₹₹',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Bengaluru',
    addressRegion: 'Karnataka',
    addressCountry: 'IN',
  }
};

export const WEBSITE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: 'JetPulse Healthcare',
  publisher: {
    '@id': `${SITE_URL}/#organization`,
  },
  description: 'Stealth healthcare startup.',
  inLanguage: 'en-IN',
};

export const NOINDEX_ROUTES = [];

export const SEO_PAGES = {
  '/': {
    path: '/',
    title: 'Healthcare Services | JetPulse',
    description: 'We are planning to launch a revolutionary startup in healthcare. Stay tuned for updates as we build the future.',
    keywords: 'healthcare startup, stealth startup, healthtech innovation, JetPulse healthcare',
    h1: 'JetPulse Healthcare',
    intro: 'Stealth healthcare startup.',
    category: 'home',
    priority: '1.0',
    changefreq: 'weekly',
  }
};

export function generatePageSchema(page) {
  const canonicalUrl = `${SITE_URL}${page.path === '/' ? '' : page.path}`;
  const graph = [ORGANIZATION_SCHEMA, WEBSITE_SCHEMA];

  const webpageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${canonicalUrl}#webpage`,
    url: canonicalUrl,
    name: page.title,
    description: page.description,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#organization` },
    inLanguage: 'en-IN',
  };
  graph.push(webpageSchema);

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}

export function isPublicSeoPath(pathname) {
  const normalized = pathname.replace(/\/$/, '') || '/';
  return Boolean(SEO_PAGES[normalized] && normalized !== '/');
}

export function isPrivatePath(pathname) {
  const normalized = pathname.replace(/\/$/, '') || '/';
  return NOINDEX_ROUTES.some((route) => normalized === route || normalized.startsWith(`${route}/`));
}
