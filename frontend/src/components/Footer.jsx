import React from 'react';
import { ShieldCheck, ExternalLink } from 'lucide-react';
import JetPulseLogo from './JetPulseLogo';

const PRODUCT_LINKS = [
  { label: 'JetPulse Companion',        href: '#services' },
  { label: 'Care Navigator AI',          href: '#navigator' },
  { label: 'Family Health Ecosystem',    href: '#family-health' },
  { label: 'Healthcare Network',         href: '#network' },
  { label: 'How It Works',              href: '#how-it-works' },
];

const LEGAL_LINKS = [
  { label: 'Help Center',               href: '#help', comingSoon: true },
  { label: 'Privacy Policy',            href: '#privacy', comingSoon: true },
  { label: 'Terms of Service',          href: '#terms', comingSoon: true },
  { label: 'Companion Verification',    href: '#verification', comingSoon: true },
  { label: 'Accessibility Standard',    href: '#accessibility', comingSoon: true },
];

function FooterLink({ href, label, comingSoon }) {
  return (
    <li>
      <a
        href={comingSoon ? undefined : href}
        onClick={comingSoon ? (e) => e.preventDefault() : undefined}
        style={{
          color: '#A0B2C6',
          fontSize: '14px',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px',
          transition: 'color 0.2s ease',
          cursor: comingSoon ? 'not-allowed' : 'pointer',
          opacity: comingSoon ? 0.7 : 1,
        }}
        onMouseEnter={(e) => !comingSoon && (e.currentTarget.style.color = 'var(--teal-bright)')}
        onMouseLeave={(e) => (e.currentTarget.style.color = '#A0B2C6')}
        aria-label={comingSoon ? `${label} (coming soon)` : label}
        title={comingSoon ? 'Coming soon' : undefined}
      >
        {label}
        {comingSoon && <span style={{ fontSize: '10px', color: 'var(--teal-bright)', fontWeight: '700' }}>SOON</span>}
      </a>
    </li>
  );
}

export default function Footer({ onOpenBooking, onNavigateNavigator }) {
  return (
    <footer style={{
      backgroundColor: 'var(--navy-dark)',
      color: 'var(--white)',
      padding: '60px 0 32px 0',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)'
    }}>
      <div className="jp-container">

        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1.5fr',
          gap: '40px',
          marginBottom: '48px'
        }} className="footer-grid">

          {/* BRAND COLUMN */}
          <div>
            <div style={{ marginBottom: '16px' }}>
              <JetPulseLogo size={42} lightMode={true} />
            </div>
            <p style={{ fontSize: '14px', color: '#A0B2C6', lineHeight: 1.6, marginBottom: '20px', maxWidth: '320px' }}>
              Healthcare assistance, navigation, and family health ecosystem designed for anyone who needs help handling healthcare.
            </p>
            <div style={{ fontSize: '13px', color: 'var(--teal-bright)', fontWeight: '700' }}>
              "Healthcare, Handled."
            </div>
          </div>

          {/* PRODUCT NAVIGATION */}
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: '800', color: 'var(--white)', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Products
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {PRODUCT_LINKS.map(({ label, href }) => (
                <FooterLink key={href} href={href} label={label} />
              ))}
            </ul>
          </div>

          {/* SUPPORT & LEGAL */}
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: '800', color: 'var(--white)', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Support & Trust
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {LEGAL_LINKS.map(({ label, href, comingSoon }) => (
                <FooterLink key={href} href={href} label={label} comingSoon={comingSoon} />
              ))}
            </ul>
          </div>

          {/* GET ASSISTANCE COLUMN */}
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: '800', color: 'var(--white)', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Immediate Assistance
            </h4>
            <p style={{ fontSize: '13px', color: '#A0B2C6', marginBottom: '16px', lineHeight: 1.5 }}>
              Need urgent companion dispatch or OPD navigation support today?
            </p>
            <button
              onClick={onOpenBooking}
              className="jp-btn jp-btn-primary"
              style={{ width: '100%' }}
            >
              <span>Get Assistance Now</span>
            </button>

            {/* Also link to Navigator */}
            <button
              onClick={onNavigateNavigator}
              style={{
                width: '100%',
                marginTop: '10px',
                padding: '10px',
                background: 'none',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: 'var(--radius-md)',
                color: '#A0B2C6',
                fontSize: '13px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--teal-bright)';
                e.currentTarget.style.color = 'var(--teal-bright)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
                e.currentTarget.style.color = '#A0B2C6';
              }}
            >
              Explore Care Navigator AI →
            </button>
          </div>

        </div>

        {/* MEDICAL DISCLAIMER STRIP */}
        <div style={{
          padding: '20px 24px',
          borderRadius: '14px',
          backgroundColor: 'rgba(255, 255, 255, 0.04)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          marginBottom: '32px',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '12px'
        }}>
          <ShieldCheck size={18} color="var(--teal-bright)" style={{ flexShrink: 0, marginTop: '2px' }} aria-hidden="true" />
          <p style={{ fontSize: '12px', color: '#8A9BA8', lineHeight: 1.5 }}>
            <strong style={{ color: '#A0B2C6' }}>Healthcare Disclaimer: </strong>
            JetPulse provides non-clinical healthcare assistance, mobility escorts, and navigation support services.
            Information provided through the platform or AI Care Navigator is for informational and organizational purposes only
            and is not a substitute for professional medical advice, diagnosis, or treatment.
          </p>
        </div>

        {/* BOTTOM COPYRIGHT */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '13px',
          color: '#60758A',
          paddingTop: '20px',
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div>
            © {new Date().getFullYear()} JetPulse Technologies Inc. All rights reserved.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>Built with care for families everywhere</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
