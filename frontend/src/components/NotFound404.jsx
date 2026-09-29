import React, { useEffect } from 'react';
import { ArrowLeft, Compass, ShieldCheck, HelpCircle, FileText, Home, Phone } from 'lucide-react';
import JetPulseLogo from './JetPulseLogo';

const HELPFUL_LINKS = [
  { href: '/healthcare-companion', label: 'Healthcare Companion', icon: ShieldCheck, desc: 'Verified non-clinical escort for clinic & hospital visits' },
  { href: '/doctor-visit-assistance', label: 'Doctor Visit Assistance', icon: FileText, desc: 'Token queues, notes & pharmacy assistance' },
  { href: '/hospital-visit-assistance', label: 'Hospital Navigation', icon: Compass, desc: 'OPD registration & wheelchair mobility help' },
  { href: '/care-navigator', label: 'AI Care Navigator', icon: Compass, desc: 'Explore symptoms, reports & nearby healthcare options' },
  { href: '/faq', label: 'Frequently Asked Questions', icon: HelpCircle, desc: 'Common questions on companion bookings & safety' },
  { href: '/contact', label: 'Contact Support', icon: Phone, desc: 'Reach out to our customer support team' },
];

export default function NotFound404({ onNavigateHome }) {
  useEffect(() => {
    document.title = '404 - Page Not Found | JetPulse';
    let robots = document.querySelector('meta[name="robots"]');
    if (!robots) {
      robots = document.createElement('meta');
      robots.setAttribute('name', 'robots');
      document.head.appendChild(robots);
    }
    robots.setAttribute('content', 'noindex, nofollow');
  }, []);

  return (
    <div className="seo-page-shell" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header className="seo-page-header">
        <div className="jp-container seo-page-header-inner">
          <button className="seo-back-link" type="button" onClick={onNavigateHome}>
            <ArrowLeft size={16} aria-hidden="true" />
            <JetPulseLogo size={32} />
          </button>
          <a href="/" className="jp-btn jp-btn-secondary jp-btn-sm">
            <Home size={15} aria-hidden="true" /> Return Home
          </a>
        </div>
      </header>

      <main className="seo-page-main" style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
        <div className="jp-container seo-page-content" style={{ maxWidth: '820px', textAlign: 'center', margin: '0 auto' }}>
          
          <div className="seo-page-eyebrow" style={{ justifyContent: 'center' }}>
            <span style={{ color: 'var(--teal-primary)', fontWeight: '800' }}>ERROR 404</span>
          </div>

          <h1 style={{ fontSize: '38px', fontWeight: '800', color: 'var(--navy)', marginBottom: '16px' }}>
            We couldn't find that healthcare page.
          </h1>

          <p className="seo-page-intro" style={{ margin: '0 auto 36px auto', maxWidth: '560px' }}>
            The page you are looking for might have been moved, renamed, or is temporarily unavailable. Let's get you back on track to finding the care assistance you need.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '16px',
            textAlign: 'left',
            marginBottom: '40px'
          }}>
            {HELPFUL_LINKS.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className="jp-card"
                  style={{
                    padding: '18px 20px',
                    borderRadius: '14px',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--white)',
                    textDecoration: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                    transition: 'all 0.2s ease',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--teal-primary)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border-color)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--teal-primary)', fontWeight: '700', fontSize: '15px' }}>
                    <Icon size={18} aria-hidden="true" />
                    <span>{item.label}</span>
                  </div>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.4, margin: 0 }}>
                    {item.desc}
                  </p>
                </a>
              );
            })}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <button type="button" onClick={onNavigateHome} className="jp-btn jp-btn-primary jp-btn-lg">
              <Home size={18} aria-hidden="true" /> Return to Homepage
            </button>
            <a href="/faq" className="jp-btn jp-btn-secondary jp-btn-lg">
              <HelpCircle size={18} aria-hidden="true" /> Visit FAQ
            </a>
          </div>

        </div>
      </main>
    </div>
  );
}
