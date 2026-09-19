import React from 'react';
import { ShieldCheck, MapPin, Heart } from 'lucide-react';
import JetPulseLogo from './JetPulseLogo';

const SERVICE_LINKS = [
  { label: 'Healthcare Companion',        href: '/healthcare-companion' },
  { label: 'Doctor Visit Assistance',     href: '/doctor-visit-assistance' },
  { label: 'Diagnostic Test Assistance',  href: '/diagnostic-test-assistance' },
  { label: 'Hospital Visit Assistance',   href: '/hospital-visit-assistance' },
  { label: 'Post-Discharge Care',         href: '/post-discharge-care' },
  { label: 'Family Healthcare',           href: '/family-healthcare' },
  { label: 'AI Care Navigator',           href: '/care-navigator' },
  { label: 'All Services Directory',      href: '/services' },
];

const GUIDES_AND_LOCATIONS = [
  { label: 'How JetPulse Works',          href: '/how-it-works' },
  { label: 'Frequently Asked Questions',  href: '/faq' },
  { label: 'Bangalore Companion Hub',     href: '/cities/bangalore' },
  { label: 'Varanasi Companion Hub',      href: '/cities/varanasi' },
  { label: 'Jaipur Companion Hub',        href: '/cities/jaipur' },
];

const TRUST_AND_LEGAL = [
  { label: 'About JetPulse',              href: '/about' },
  { label: 'Contact Support',             href: '/contact' },
  { label: 'Help Center',                 href: '/help' },
  { label: 'Companion Verification',      href: '/verification' },
  { label: 'Privacy Policy',              href: '/privacy' },
  { label: 'Terms of Service',            href: '/terms' },
  { label: 'Accessibility Standard',      href: '/accessibility' },
];

function FooterLink({ href, label }) {
  return (
    <li>
      <a
        href={href}
        style={{
          color: '#A0B2C6',
          fontSize: '14px',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px',
          transition: 'color 0.2s ease',
          textDecoration: 'none',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--teal-bright)')}
        onMouseLeave={(e) => (e.currentTarget.style.color = '#A0B2C6')}
      >
        {label}
      </a>
    </li>
  );
}

export default function Footer({ onOpenBooking, onNavigateNavigator }) {
  return (
    <footer style={{
      backgroundColor: 'var(--navy-dark)',
      color: 'var(--white)',
      padding: '64px 0 32px 0',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)'
    }}>
      <div className="jp-container">

        {/* 4-COLUMN FOOTER GRID */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.8fr 1.2fr 1.2fr 1.2fr',
          gap: '36px',
          marginBottom: '48px'
        }} className="footer-grid">

          {/* BRAND COLUMN */}
          <div>
            <div style={{ marginBottom: '16px' }}>
              <JetPulseLogo size={42} lightMode={true} />
            </div>
            <p style={{ fontSize: '14px', color: '#A0B2C6', lineHeight: 1.6, marginBottom: '20px', maxWidth: '320px' }}>
              Verified healthcare companions, hospital visit navigation, diagnostic assistance, and connected family healthcare management across India.
            </p>
            <div style={{ fontSize: '13px', color: 'var(--teal-bright)', fontWeight: '700', marginBottom: '16px' }}>
              "Healthcare, Handled."
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={onOpenBooking}
                className="jp-btn jp-btn-primary jp-btn-sm"
                style={{ borderRadius: '8px' }}
              >
                <span>Book a Companion</span>
              </button>
            </div>
          </div>

          {/* SERVICES COLUMN */}
          <div>
            <h4 style={{ fontSize: '13px', fontWeight: '800', color: 'var(--white)', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Healthcare Services
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {SERVICE_LINKS.map(({ label, href }) => (
                <FooterLink key={href} href={href} label={label} />
              ))}
            </ul>
          </div>

          {/* GUIDES & LOCATIONS COLUMN */}
          <div>
            <h4 style={{ fontSize: '13px', fontWeight: '800', color: 'var(--white)', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Guides & Locations
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {GUIDES_AND_LOCATIONS.map(({ label, href }) => (
                <FooterLink key={href} href={href} label={label} />
              ))}
            </ul>
          </div>

          {/* TRUST & LEGAL COLUMN */}
          <div>
            <h4 style={{ fontSize: '13px', fontWeight: '800', color: 'var(--white)', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Trust & Support
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {TRUST_AND_LEGAL.map(({ label, href }) => (
                <FooterLink key={href} href={href} label={label} />
              ))}
            </ul>
          </div>

        </div>

        {/* NON-CLINICAL HEALTHCARE DISCLAIMER */}
        <div style={{
          padding: '18px 24px',
          borderRadius: '14px',
          backgroundColor: 'rgba(255, 255, 255, 0.04)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          marginBottom: '32px',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '12px'
        }}>
          <ShieldCheck size={18} color="var(--teal-bright)" style={{ flexShrink: 0, marginTop: '2px' }} aria-hidden="true" />
          <p style={{ fontSize: '12px', color: '#8A9BA8', lineHeight: 1.5, margin: 0 }}>
            <strong style={{ color: '#A0B2C6' }}>Healthcare Disclaimer: </strong>
            JetPulse provides non-clinical healthcare assistance, mobility escorts, and navigation support services.
            Information provided through the platform or AI Care Navigator is for informational and organizational purposes only
            and is not a substitute for professional medical advice, diagnosis, or treatment. In case of an emergency, please dial <strong>112 / 108</strong>.
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
            <span>Built with</span>
            <Heart size={13} color="var(--teal-bright)" fill="var(--teal-bright)" aria-hidden="true" />
            <span>for families everywhere across India</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
