import React from 'react';
import { ShieldCheck, MapPin } from 'lucide-react';
import JetPulseLogo from './JetPulseLogo';

const PRODUCT_LINKS = [
  { label: 'Healthcare Companion',       href: '/healthcare-companion' },
  { label: 'Hospital Navigation',        href: '/hospital-navigation' },
  { label: 'Diagnostic Assistance',      href: '/diagnostic-test-assistance' },
  { label: 'Post-Discharge Care',        href: '/post-discharge-care' },
  { label: 'AI Care Navigator',          href: '/care-navigator' },
  { label: 'Family Health Hub',          href: '/family-health-management' },
  { label: 'Elderly Care Companion',     href: '/elderly-care-companion' },
  { label: 'Bedside Support',            href: '/bedside-assistance' },
];

const CITY_LINKS = [
  { label: 'Bangalore (Bengaluru)',      href: '/cities/bangalore' },
  { label: 'Varanasi (Kashi)',           href: '/cities/varanasi' },
  { label: 'Jaipur',                     href: '/cities/jaipur' },
  { label: 'Delhi NCR (Gurgaon/Noida)',  href: '/cities/delhi-ncr' },
  { label: 'Mumbai',                     href: '/cities/mumbai' },
  { label: 'Hyderabad',                  href: '/cities/hyderabad' },
];

const LEGAL_LINKS = [
  { label: 'About JetPulse',             href: '/about' },
  { label: 'Help & FAQs',                href: '/help' },
  { label: 'Companion Verification',     href: '/verification' },
  { label: 'Privacy Policy',             href: '/privacy' },
  { label: 'Terms of Service',           href: '/terms' },
  { label: 'Accessibility Statement',     href: '/accessibility' },
];

function FooterLink({ href, label }) {
  return (
    <li>
      <a
        href={href}
        style={{
          color: '#A0B2C6',
          fontSize: '13px',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px',
          transition: 'color 0.2s ease',
          cursor: 'pointer',
          textDecoration: 'none',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--teal-bright)')}
        onMouseLeave={(e) => (e.currentTarget.style.color = '#A0B2C6')}
        aria-label={label}
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
      padding: '60px 0 32px 0',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)'
    }}>
      <div className="jp-container">

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.6fr 1fr 1fr 1fr 1.2fr',
          gap: '32px',
          marginBottom: '48px'
        }} className="footer-grid">

          {/* BRAND COLUMN */}
          <div>
            <div style={{ marginBottom: '16px' }}>
              <JetPulseLogo size={42} lightMode={true} />
            </div>
            <p style={{ fontSize: '13px', color: '#A0B2C6', lineHeight: 1.6, marginBottom: '20px', maxWidth: '300px' }}>
              Intelligent healthcare companion booking, hospital OPD navigation, and connected family health ecosystem across India.
            </p>
            <div style={{ fontSize: '13px', color: 'var(--teal-bright)', fontWeight: '700' }}>
              "Healthcare, Handled."
            </div>
          </div>

          {/* PRODUCT NAVIGATION */}
          <div>
            <h4 style={{ fontSize: '13px', fontWeight: '800', color: 'var(--white)', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Services
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', padding: 0, margin: 0 }}>
              {PRODUCT_LINKS.map(({ label, href }) => (
                <FooterLink key={href} href={href} label={label} />
              ))}
            </ul>
          </div>

          {/* CITIES */}
          <div>
            <h4 style={{ fontSize: '13px', fontWeight: '800', color: 'var(--white)', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Locations
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', padding: 0, margin: 0 }}>
              {CITY_LINKS.map(({ label, href }) => (
                <FooterLink key={href} href={href} label={label} />
              ))}
            </ul>
          </div>

          {/* SUPPORT & LEGAL */}
          <div>
            <h4 style={{ fontSize: '13px', fontWeight: '800', color: 'var(--white)', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Trust & Legal
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', padding: 0, margin: 0 }}>
              {LEGAL_LINKS.map(({ label, href }) => (
                <FooterLink key={href} href={href} label={label} />
              ))}
            </ul>
          </div>

          {/* GET ASSISTANCE COLUMN */}
          <div>
            <h4 style={{ fontSize: '13px', fontWeight: '800', color: 'var(--white)', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Need Help Today?
            </h4>
            <p style={{ fontSize: '13px', color: '#A0B2C6', marginBottom: '16px', lineHeight: 1.5 }}>
              Book an urgent or scheduled companion for your clinic or hospital visit.
            </p>
            <button
              onClick={onOpenBooking}
              className="jp-btn jp-btn-primary"
              style={{ width: '100%' }}
            >
              <span>Get Assistance</span>
            </button>

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
                fontSize: '12px',
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
              Care Navigator AI →
            </button>
          </div>

        </div>

        {/* MEDICAL DISCLAIMER STRIP */}
        <div style={{
          padding: '18px 22px',
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
            and is not a substitute for professional medical advice, diagnosis, or treatment.
          </p>
        </div>

        {/* BOTTOM COPYRIGHT */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '12px',
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
            <span>Built with care for patients and families across India</span>
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 992px) {
          .footer-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 540px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
