import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  ChevronRight,
  HelpCircle,
  AlertCircle,
  MapPin,
  Calendar,
  Compass,
  Home,
} from 'lucide-react';
import { SEO_PAGES, isPublicSeoPath, SITE_URL } from '../seo/seoConfig';
import SeoHead from '../seo/SeoHead';
import JetPulseLogo from './JetPulseLogo';

const RELATED_SERVICES = [
  { href: '/healthcare-companion', label: 'Healthcare Companion' },
  { href: '/doctor-visit-assistance', label: 'Doctor Visit Assistance' },
  { href: '/diagnostic-test-assistance', label: 'Diagnostic Tests' },
  { href: '/hospital-visit-assistance', label: 'Hospital Navigation' },
  { href: '/post-discharge-care', label: 'Post-Discharge Care' },
  { href: '/family-healthcare', label: 'Family Healthcare' },
  { href: '/care-navigator', label: 'Care Navigator AI' },
];

const CITY_LINKS = [
  { href: '/cities/bangalore', label: 'Bangalore' },
  { href: '/cities/varanasi', label: 'Varanasi' },
  { href: '/cities/jaipur', label: 'Jaipur' },
];

export { isPublicSeoPath };

export default function PublicSeoPage({ pathname, onOpenBooking, onNavigateHome }) {
  const normalizedPath = pathname.replace(/\/$/, '') || '/';
  const page = SEO_PAGES[normalizedPath] || SEO_PAGES['/'];
  const isTrustPage = page.category === 'trust';
  const isLocationPage = page.category === 'location';

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return (
    <div className="seo-page-shell" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <SeoHead pathname={normalizedPath} />

      {/* HEADER */}
      <header className="seo-page-header">
        <div className="jp-container seo-page-header-inner">
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button className="seo-back-link" type="button" onClick={onNavigateHome} aria-label="Return to JetPulse Homepage">
              <ArrowLeft size={16} aria-hidden="true" />
              <JetPulseLogo size={32} />
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <a href="/faq" className="desktop-text" style={{ fontSize: '14px', fontWeight: '600', color: 'var(--navy)', textDecoration: 'none' }}>
              FAQ
            </a>
            {!isTrustPage && (
              <button
                className="jp-btn jp-btn-primary jp-btn-sm"
                type="button"
                onClick={onOpenBooking}
                id="seo-page-cta-top"
              >
                <span>Get Assistance</span>
                <ArrowRight size={15} aria-hidden="true" />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* MAIN ARTICLE CONTENT */}
      <main className="seo-page-main" style={{ flex: 1 }}>
        <article className="jp-container seo-page-content">

          {/* ACCESSIBLE BREADCRUMBS */}
          {page.breadcrumbs && page.breadcrumbs.length > 0 && (
            <nav aria-label="Breadcrumb" style={{ marginBottom: '20px' }}>
              <ol style={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '8px',
                listStyle: 'none',
                padding: 0,
                margin: 0,
                fontSize: '13px',
                color: 'var(--text-secondary)'
              }}>
                {page.breadcrumbs.map((crumb, idx) => {
                  const isLast = idx === page.breadcrumbs.length - 1;
                  return (
                    <li key={crumb.url} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {idx > 0 && <ChevronRight size={12} color="var(--border-color)" aria-hidden="true" />}
                      {isLast ? (
                        <span style={{ color: 'var(--teal-primary)', fontWeight: '600' }} aria-current="page">
                          {crumb.name}
                        </span>
                      ) : (
                        <a
                          href={crumb.url}
                          style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}
                          onClick={(e) => {
                            if (crumb.url === '/') {
                              e.preventDefault();
                              onNavigateHome();
                            }
                          }}
                        >
                          {crumb.name}
                        </a>
                      )}
                    </li>
                  );
                })}
              </ol>
            </nav>
          )}

          {/* EYEBROW BADGE */}
          <div className="seo-page-eyebrow">
            <ShieldCheck size={16} aria-hidden="true" />
            <span>
              {isLocationPage
                ? 'JetPulse City Service Hub'
                : isTrustPage
                ? 'JetPulse Trust & Safety Protocol'
                : 'Verified Healthcare Logistical Support'}
            </span>
          </div>

          {/* PRIMARY H1 HEADING */}
          <h1 style={{
            fontSize: 'clamp(28px, 4vw, 42px)',
            fontWeight: '800',
            color: 'var(--navy)',
            lineHeight: 1.25,
            marginBottom: '16px',
            letterSpacing: '-0.02em'
          }}>
            {page.h1 || page.title}
          </h1>

          {/* INTRODUCTORY PARAGRAPH */}
          <p className="seo-page-intro" style={{
            fontSize: '18px',
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
            marginBottom: '36px',
            maxWidth: '720px'
          }}>
            {page.intro}
          </p>

          {/* SERVICE POINTS SECTION */}
          {page.points && page.points.length > 0 && (
            <section className="seo-page-section" aria-labelledby="service-features-heading" style={{ marginBottom: '40px' }}>
              <h2 id="service-features-heading" style={{ fontSize: '22px', fontWeight: '800', color: 'var(--navy)', marginBottom: '18px' }}>
                What this service includes
              </h2>
              <ul className="seo-page-list" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {page.points.map((point) => (
                  <li key={point} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    fontSize: '15px',
                    color: 'var(--navy)',
                    lineHeight: 1.5,
                    marginBottom: '14px'
                  }}>
                    <CheckCircle2 size={18} color="var(--teal-primary)" style={{ flexShrink: 0, marginTop: '3px' }} aria-hidden="true" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* HOW IT HELPS BENEFIT CARDS */}
          {page.howItHelps && page.howItHelps.length > 0 && (
            <section className="seo-page-section" aria-labelledby="how-it-helps-heading" style={{ marginBottom: '40px' }}>
              <h2 id="how-it-helps-heading" style={{ fontSize: '22px', fontWeight: '800', color: 'var(--navy)', marginBottom: '18px' }}>
                Who benefits most from this support
              </h2>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '16px'
              }}>
                {page.howItHelps.map((card, idx) => (
                  <div key={idx} className="jp-card" style={{
                    padding: '20px',
                    borderRadius: '14px',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--white)',
                    boxShadow: 'var(--shadow-sm)'
                  }}>
                    <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--navy)', marginBottom: '8px' }}>
                      {card.title}
                    </h3>
                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                      {card.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* VISIBLE FAQS ACCORDION (Matches FAQPage Schema) */}
          {page.faqs && page.faqs.length > 0 && (
            <section className="seo-page-section" aria-labelledby="faqs-heading" style={{ marginBottom: '40px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}>
                <HelpCircle size={22} color="var(--teal-primary)" aria-hidden="true" />
                <h2 id="faqs-heading" style={{ fontSize: '22px', fontWeight: '800', color: 'var(--navy)', margin: 0 }}>
                  Frequently Asked Questions
                </h2>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {page.faqs.map((faq, idx) => (
                  <details
                    key={idx}
                    style={{
                      border: '1px solid var(--border-color)',
                      borderRadius: '12px',
                      backgroundColor: 'var(--white)',
                      padding: '16px 20px',
                      cursor: 'pointer',
                      boxShadow: 'var(--shadow-sm)'
                    }}
                  >
                    <summary style={{
                      fontWeight: '700',
                      fontSize: '15px',
                      color: 'var(--navy)',
                      outline: 'none',
                      userSelect: 'none'
                    }}>
                      {faq.question}
                    </summary>
                    <div style={{
                      paddingTop: '12px',
                      marginTop: '10px',
                      borderTop: '1px solid var(--border-subtle)',
                      fontSize: '14px',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.6
                    }}>
                      {faq.answer}
                    </div>
                  </details>
                ))}
              </div>
            </section>
          )}

          {/* HEALTHCARE NON-CLINICAL DISCLAIMER */}
          <section className="seo-page-section" style={{
            padding: '18px 20px',
            borderRadius: '14px',
            backgroundColor: '#F3FAFB',
            border: '1px solid #D2EFF3',
            marginBottom: '36px',
            display: 'flex',
            gap: '12px',
            alignItems: 'flex-start'
          }}>
            <AlertCircle size={20} color="var(--teal-dark)" style={{ flexShrink: 0, marginTop: '2px' }} aria-hidden="true" />
            <div>
              <h3 style={{ fontSize: '13px', fontWeight: '700', color: 'var(--navy)', marginBottom: '4px' }}>
                Non-Clinical Healthcare Notice & Emergency Guidelines
              </h3>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                JetPulse companions provide non-clinical escort, mobility, and administrative navigation support. JetPulse does not diagnose conditions, prescribe medications, or replace emergency medical services. In an emergency, please dial <strong>112 / 108</strong> or visit your nearest hospital casualty ward.
              </p>
            </div>
          </section>

          {/* PRIMARY CALL TO ACTION BUTTON */}
          {!isTrustPage && (
            <div style={{ marginBottom: '48px', display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <button
                className="jp-btn jp-btn-primary jp-btn-lg"
                type="button"
                onClick={onOpenBooking}
                id="seo-page-bottom-booking-btn"
              >
                <span>{page.cta || 'Get Assistance Now'}</span>
                <ArrowRight size={18} aria-hidden="true" />
              </button>
              <a href="/care-navigator" className="jp-btn jp-btn-secondary jp-btn-lg">
                <Compass size={18} aria-hidden="true" />
                <span>Explore Care Navigator AI</span>
              </a>
            </div>
          )}

          {/* INTERNAL LINKING: RELATED SERVICES & CITIES */}
          <footer style={{
            borderTop: '1px solid var(--border-color)',
            paddingTop: '32px',
            marginTop: '20px'
          }}>
            {/* Related Services */}
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>
                Explore Related Healthcare Services
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {RELATED_SERVICES.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    style={{
                      fontSize: '13px',
                      padding: '6px 12px',
                      borderRadius: '8px',
                      backgroundColor: 'var(--bg-page)',
                      border: '1px solid var(--border-subtle)',
                      color: 'var(--navy)',
                      textDecoration: 'none',
                      fontWeight: '500'
                    }}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            {/* City Hubs */}
            <div>
              <h3 style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>
                Service Hubs in India
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {CITY_LINKS.map((city) => (
                  <a
                    key={city.href}
                    href={city.href}
                    style={{
                      fontSize: '13px',
                      padding: '6px 14px',
                      borderRadius: '8px',
                      backgroundColor: 'var(--mint-soft)',
                      border: '1px solid rgba(15, 159, 150, 0.2)',
                      color: 'var(--teal-dark)',
                      textDecoration: 'none',
                      fontWeight: '600',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <MapPin size={13} aria-hidden="true" />
                    <span>{city.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </footer>

        </article>
      </main>
    </div>
  );
}
