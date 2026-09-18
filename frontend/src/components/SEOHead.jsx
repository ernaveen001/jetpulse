import React, { useEffect } from 'react';
import { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE } from '../seo/seoConfig';

/**
 * Reusable SEO Head Controller
 * Dynamically synchronizes document metadata and JSON-LD structured schemas.
 */
export default function SEOHead({
  title,
  description,
  canonical,
  keywords,
  robots = 'index, follow',
  ogTitle,
  ogDescription,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = 'website',
  schemaGraph = null,
}) {
  useEffect(() => {
    // 1. Title
    if (title) {
      document.title = title;
    }

    // 2. Meta description
    if (description) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.name = 'description';
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', description);
    }

    // 3. Keywords
    if (keywords) {
      let metaKey = document.querySelector('meta[name="keywords"]');
      if (!metaKey) {
        metaKey = document.createElement('meta');
        metaKey.name = 'keywords';
        document.head.appendChild(metaKey);
      }
      metaKey.setAttribute('content', Array.isArray(keywords) ? keywords.join(', ') : keywords);
    }

    // 4. Robots directive
    let metaRobots = document.querySelector('meta[name="robots"]');
    if (!metaRobots) {
      metaRobots = document.createElement('meta');
      metaRobots.name = 'robots';
      document.head.appendChild(metaRobots);
    }
    metaRobots.setAttribute('content', robots);

    // 5. Canonical link
    if (canonical) {
      let linkCanonical = document.querySelector('link[rel="canonical"]');
      if (!linkCanonical) {
        linkCanonical = document.createElement('link');
        linkCanonical.rel = 'canonical';
        document.head.appendChild(linkCanonical);
      }
      linkCanonical.setAttribute('href', canonical);
    }

    // 6. Open Graph
    const setOgMeta = (property, content) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    setOgMeta('og:title', ogTitle || title);
    setOgMeta('og:description', ogDescription || description);
    setOgMeta('og:url', canonical || SITE_URL);
    setOgMeta('og:site_name', SITE_NAME);
    setOgMeta('og:type', ogType);
    setOgMeta('og:image', ogImage);

    // 7. Twitter Card
    const setTwMeta = (name, content) => {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    setTwMeta('twitter:card', 'summary_large_image');
    setTwMeta('twitter:title', ogTitle || title);
    setTwMeta('twitter:description', ogDescription || description);
    setTwMeta('twitter:image', ogImage);

    // 8. JSON-LD Schema Script
    let schemaScript = document.getElementById('jetpulse-dynamic-schema');
    if (schemaGraph) {
      if (!schemaScript) {
        schemaScript = document.createElement('script');
        schemaScript.id = 'jetpulse-dynamic-schema';
        schemaScript.type = 'application/ld+json';
        document.head.appendChild(schemaScript);
      }
      schemaScript.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': Array.isArray(schemaGraph) ? schemaGraph : [schemaGraph]
      });
    } else if (schemaScript) {
      schemaScript.remove();
    }

    return () => {
      const dynamicSchema = document.getElementById('jetpulse-dynamic-schema');
      if (dynamicSchema) dynamicSchema.remove();
    };
  }, [title, description, canonical, keywords, robots, ogTitle, ogDescription, ogImage, ogType, schemaGraph]);

  return null;
}
