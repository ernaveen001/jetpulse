import React from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, ShieldCheck, HelpCircle, MapPin, Sparkles } from 'lucide-react';
import SEOHead from './SEOHead';
import { SEO_ROUTES, ALL_SERVICES_NAV, ALL_CITIES_NAV, SITE_URL } from '../seo/seoConfig';

export function isPublicSeoPath(pathname) {
  return Boolean(SEO_ROUTES[pathname]);
}

export default function PublicSeoPage({ pathname, onOpenBooking, onNavigateHome }) {
  const content = SEO_ROUTES[pathname] || SEO_ROUTES['/healthcare-companion'];
  const isCity = pathname.startsWith('/cities/');
  const isLegalOrTrust = ['Legal', 'Trust'].includes(content.category);
  const canonicalUrl = content.canonical || `${SITE_URL}${pathname}`;
  const cityName = isCity ? content.heading.split('in ').pop()?.trim() : null;

  const breadcrumbSchema = {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: isCity ? 'Cities' : (content.category || 'Services'), item: `${SITE_URL}/#${isCity ? 'cities' : 'services'}` },
      { '@type': 'ListItem', position: 3, name: content.heading, item: canonicalUrl }
    ]
  };

  const mainSchema = isCity
    ? {
        '@type': ['LocalBusiness', 'MedicalBusiness'],
        name: `JetPulse Healthcare Companion - ${cityName}`,
        description: content.description,
        url: canonicalUrl,
        priceRange: '₹₹',
        areaServed: { '@type': 'City', name: cityName },
        provider: { '@type': 'Organization', name: 'JetPulse', url: SITE_URL }
      }
    : {
        '@type': 'Service',
        name: content.title,
        description: content.description || content.intro,
        url: canonicalUrl,
        provider: { '@type': 'Organization', name: 'JetPulse', url: SITE_URL },
        serviceType: content.category || 'Healthcare Support'
      };

  const schemas = [breadcrumbSchema, mainSchema];

  if (content.faqs && content.faqs.length > 0) {
    schemas.push({
      '@type': 'FAQPage',
      mainEntity: content.faqs.map(faq => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: { '@type': 'Answer', text: faq.a }
      }))
    });
  }

  const parentName = isCity ? 'Cities' : (content.category || 'Services');

  return (
    <div className="seo-page-shell" style={{ backgroundColor: '#F8FAFC', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <SEOHead
        title={content.title}
        description={content.description || content.intro}
        canonical={canonicalUrl}
        keywords={content.secondaryKeywords ? [content.primaryKeyword, ...content.secondaryKeywords] : content.primaryKeyword}
        robots={content.isIndexable ? 'index, follow' : 'noindex, follow'}
        schemaGraph={schemas}
      />

      {/* HEADER */}
      <header className="seo-page-header" style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderBottom: '1px solid #E2E8F0', position: 'sticky', top: 0, zIndex: 50, backdropFilter: 'blur(8px)' }}>
        <div className="jp-container seo-page-header-inner" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '70px' }}>
          <button className="seo-back-link" type="button" onClick={onNavigateHome} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', fontWeight: '800', color: '#082B4C' }}>
            <ArrowLeft size={18} color="#0F9F96" aria-hidden="true" />
            <span>JetPulse</span>
          </button>
          {!isLegalOrTrust && (
            <button className="jp-btn jp-btn-primary jp-btn-sm" type="button" onClick={onOpenBooking}>
              <span>Get Assistance</span> <ArrowRight size={16} aria-hidden="true" />
            </button>
          )}
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="seo-page-main" style={{ flex: 1, padding: '40px 0 80px 0' }}>
        <div className="jp-container seo-page-content" style={{ maxWidth: '840px', margin: '0 auto' }}>
          
          {/* BREADCRUMB */}
          <nav aria-label="Breadcrumb" style={{ marginBottom: '24px' }}>
            <ol style={{ display: 'flex', gap: '8px', listStyle: 'none', padding: 0, margin: 0, fontSize: '13px', color: '#64748b', alignItems: 'center', flexWrap: 'wrap' }}>
              <li>
                <button type="button" onClick={onNavigateHome} style={{ background: 'none', border: 'none', color: '#0F9F96', fontWeight: '600', cursor: 'pointer', padding: 0, fontSize: '13px' }}>
                  Home
                </button>
              </li>
              <li style={{ color: '#cbd5e1' }}>/</li>
              <li><span style={{ color: '#64748b' }}>{parentName}</span></li>
              <li style={{ color: '#cbd5e1' }}>/</li>
              <li aria-current="page" style={{ color: '#082B4C', fontWeight: '600' }}>{content.heading.split(' ')[0]}</li>
            </ol>
          </nav>

          {/* EYEBROW */}
          <div className="seo-page-eyebrow" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', color: '#0F9F96', backgroundColor: '#EAF8F6', padding: '4px 12px', borderRadius: '99px', marginBottom: '16px' }}>
            <ShieldCheck size={14} aria-hidden="true" /> JetPulse Healthcare Support • {content.category || 'Service'}
          </div>

          {/* MAIN H1 */}
          <h1 style={{ fontSize: '34px', fontWeight: '800', color: '#082B4C', lineHeight: 1.25, marginBottom: '16px' }}>
            {content.heading}
          </h1>

          {/* INTRO */}
          <p className="seo-page-intro" style={{ fontSize: '17px', color: '#475569', lineHeight: 1.65, marginBottom: '32px' }}>
            {content.intro}
          </p>

          {/* KEY POINTS / FEATURES */}
          {content.points && (
            <section className="seo-page-section" aria-labelledby="service-includes-heading" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '28px', marginBottom: '32px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <h2 id="service-includes-heading" style={{ fontSize: '20px', fontWeight: '800', color: '#082B4C', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={20} color="#0F9F96" aria-hidden="true" /> Key Features & Inclusions
              </h2>
              <ul className="seo-page-list" style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {content.points.map((point) => (
                  <li key={point} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '15px', color: '#334155', lineHeight: 1.5 }}>
                    <CheckCircle2 size={18} color="#0F9F96" style={{ flexShrink: 0, marginTop: '2px' }} aria-hidden="true" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* PRIMARY CTA */}
          {!isLegalOrTrust && (
            <div style={{ marginBottom: '36px' }}>
              <button className="jp-btn jp-btn-primary jp-btn-lg" type="button" onClick={onOpenBooking} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                <span>{content.cta || 'Get Assistance Now'}</span> <ArrowRight size={18} aria-hidden="true" />
              </button>
            </div>
          )}

          {/* FAQS ACCORDION */}
          {content.faqs && content.faqs.length > 0 && (
            <section className="seo-page-section seo-faqs-section" aria-labelledby="faqs-heading" style={{ marginBottom: '36px' }}>
              <h2 id="faqs-heading" style={{ fontSize: '22px', fontWeight: '800', color: '#082B4C', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <HelpCircle size={22} color="#0F9F96" aria-hidden="true" /> Frequently Asked Questions
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {content.faqs.map((faq, idx) => (
                  <details key={idx} style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px 20px', cursor: 'pointer' }}>
                    <summary style={{ fontWeight: '700', color: '#082B4C', fontSize: '15px', outline: 'none' }}>
                      {faq.q}
                    </summary>
                    <p style={{ marginTop: '10px', color: '#475569', lineHeight: 1.6, fontSize: '14px', marginBottom: 0 }}>
                      {faq.a}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          )}

          {/* TRUST NOTICE */}
          {isLegalOrTrust && (
            <section className="seo-page-section" style={{ backgroundColor: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: '14px', padding: '20px', marginBottom: '32px' }}>
              <h2 style={{ fontSize: '16px', fontWeight: '700', color: '#92400E', marginBottom: '8px' }}>Important Healthcare Notice</h2>
              <p style={{ fontSize: '13px', color: '#78350F', lineHeight: 1.5, margin: 0 }}>
                JetPulse provides non-clinical healthcare assistance, mobility escorts, and navigation support. For acute emergencies, dial local emergency services (112 / 108) immediately.
              </p>
            </section>
          )}

          {/* INTERNAL CROSS-LINKING HUBS */}
          <section className="seo-page-section seo-page-interlinks" style={{ marginTop: '48px', paddingTop: '32px', borderTop: '1px solid #E2E8F0' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#082B4C', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Explore Other Healthcare Services
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '28px' }}>
              {ALL_SERVICES_NAV.map((srv) => (
                <a key={srv.href} href={srv.href} style={{ fontSize: '13px', color: '#082B4C', backgroundColor: '#FFFFFF', border: '1px solid #CBD5E1', padding: '6px 14px', borderRadius: '8px', textDecoration: 'none', fontWeight: '500', transition: 'all 0.15s ease' }}>
                  {srv.label}
                </a>
              ))}
            </div>

            <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#082B4C', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              <MapPin size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} color="#0F9F96" aria-hidden="true" />
              Service Locations Across India
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {ALL_CITIES_NAV.map((city) => (
                <a key={city.href} href={city.href} style={{ fontSize: '13px', color: '#082B4C', backgroundColor: '#FFFFFF', border: '1px solid #CBD5E1', padding: '6px 14px', borderRadius: '8px', textDecoration: 'none', fontWeight: '500', transition: 'all 0.15s ease' }}>
                  {city.label}
                </a>
              ))}
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
