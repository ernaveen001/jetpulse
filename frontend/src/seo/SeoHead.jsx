import { useEffect } from 'react';
import {
  SITE_URL,
  SITE_NAME,
  DEFAULT_OG_IMAGE,
  SEO_PAGES,
  NOINDEX_ROUTES,
  generatePageSchema,
  isPrivatePath,
} from './seoConfig';

function setMetaTag(attributeName, attributeValue, content) {
  if (!content) return;
  let tag = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attributeName, attributeValue);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

function setCanonicalTag(url) {
  let link = document.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', url);
}

export default function SeoHead({ pathname }) {
  useEffect(() => {
    const normalizedPath = (pathname || window.location.pathname).replace(/\/$/, '') || '/';
    const isPrivate = isPrivatePath(normalizedPath);
    const page = SEO_PAGES[normalizedPath] || SEO_PAGES['/'];

    // Title
    const title = isPrivate
      ? `Portal | ${SITE_NAME}`
      : (page.title || `${SITE_NAME} | Healthcare, Handled.`);
    document.title = title;

    // Canonical URL (strictly HTTPS, non-localhost, production domain)
    const canonical = `${SITE_URL}${normalizedPath === '/' ? '' : normalizedPath}`;
    setCanonicalTag(canonical);

    // Robots meta tag
    const robotsContent = isPrivate ? 'noindex, nofollow' : 'index, follow, max-image-preview:large';
    setMetaTag('name', 'robots', robotsContent);

    // Description & Keywords
    if (!isPrivate) {
      setMetaTag('name', 'description', page.description);
      if (page.keywords) {
        setMetaTag('name', 'keywords', page.keywords);
      }

      // Open Graph Metadata
      setMetaTag('property', 'og:title', page.title);
      setMetaTag('property', 'og:description', page.description);
      setMetaTag('property', 'og:url', canonical);
      setMetaTag('property', 'og:type', normalizedPath === '/' ? 'website' : 'article');
      setMetaTag('property', 'og:site_name', SITE_NAME);
      setMetaTag('property', 'og:image', DEFAULT_OG_IMAGE);

      // Twitter Cards Metadata
      setMetaTag('name', 'twitter:card', 'summary_large_image');
      setMetaTag('name', 'twitter:title', page.title);
      setMetaTag('name', 'twitter:description', page.description);
      setMetaTag('name', 'twitter:image', DEFAULT_OG_IMAGE);

      // Inject / Update JSON-LD Schema
      let scriptTag = document.getElementById('jetpulse-jsonld-schema');
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = 'jetpulse-jsonld-schema';
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(generatePageSchema(page));
    } else {
      // Remove public schema on private routes
      const scriptTag = document.getElementById('jetpulse-jsonld-schema');
      if (scriptTag) scriptTag.remove();
    }
  }, [pathname]);

  return null;
}
