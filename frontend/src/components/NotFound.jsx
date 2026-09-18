import React from 'react';
import { ArrowLeft, Home, Compass, ShieldCheck, MapPin, Search } from 'lucide-react';
import SEOHead from './SEOHead';
import { ALL_SERVICES_NAV, ALL_CITIES_NAV } from '../seo/seoConfig';

export default function NotFound({ onNavigateHome, onOpenBooking }) {
  return (
    <div className="seo-page-shell" style={{ minHeight: '100vh', backgroundColor: '#F8FAFC', display: 'flex', flexDirection: 'column' }}>
      <SEOHead
        title="404: Page Not Found | JetPulse Healthcare"
        description="The requested page could not be found. Explore JetPulse healthcare companion services, AI care navigation, and city assistance hubs."
        robots="noindex, follow"
      />

      {/* HEADER */}
      <header className="seo-page-header" style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderBottom: '1px solid #E2E8F0', padding: '16px 0' }}>
        <div className="jp-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button
            type="button"
            onClick={onNavigateHome}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', fontWeight: '800', color: '#082B4C' }}
            aria-label="Return to JetPulse homepage"
          >
            <ArrowLeft size={18} color="#0F9F96" aria-hidden="true" />
            <span>JetPulse</span>
          </button>
          <button className="jp-btn jp-btn-primary jp-btn-sm" type="button" onClick={onOpenBooking}>
            Get Assistance
          </button>
        </div>
      </header>

      {/* 404 MAIN HERO */}
      <main className="seo-page-main" style={{ flex: 1, padding: '60px 0 80px 0' }}>
        <div className="jp-container" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '80px',
            height: '80px',
            borderRadius: '24px',
            backgroundColor: '#EAF8F6',
            color: '#0F9F96',
            fontSize: '32px',
            fontWeight: '900',
            marginBottom: '24px'
          }}>
            404
          </div>

          <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#082B4C', marginBottom: '16px' }}>
            We couldn't find the page you're looking for.
          </h1>

          <p style={{ fontSize: '16px', color: '#64748B', maxWidth: '560px', margin: '0 auto 36px auto', lineHeight: 1.6 }}>
            The link you followed may be broken or the page may have been moved. 
            Here are popular sections you can explore:
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '48px' }}>
            <button
              onClick={onNavigateHome}
              className="jp-btn jp-btn-primary jp-btn-lg"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              <Home size={18} aria-hidden="true" />
              <span>Back to Homepage</span>
            </button>
            <a
              href="/#navigator"
              className="jp-btn jp-btn-secondary jp-btn-lg"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}
            >
              <Compass size={18} aria-hidden="true" />
              <span>Care Navigator</span>
            </a>
          </div>

          {/* DISCOVERY LINKS */}
          <div style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '20px',
            padding: '32px',
            textAlign: 'left',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
          }}>
            <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#082B4C', marginBottom: '16px' }}>
              Explore Healthcare Services
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '28px' }}>
              {ALL_SERVICES_NAV.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  style={{
                    fontSize: '13px',
                    color: '#082B4C',
                    backgroundColor: '#F8FAFC',
                    border: '1px solid #CBD5E1',
                    padding: '8px 14px',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    fontWeight: '500'
                  }}
                >
                  {s.label}
                </a>
              ))}
            </div>

            <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#082B4C', marginBottom: '16px' }}>
              <MapPin size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '6px' }} color="#0F9F96" aria-hidden="true" />
              City Locations
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {ALL_CITIES_NAV.map((c) => (
                <a
                  key={c.href}
                  href={c.href}
                  style={{
                    fontSize: '13px',
                    color: '#082B4C',
                    backgroundColor: '#F8FAFC',
                    border: '1px solid #CBD5E1',
                    padding: '8px 14px',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    fontWeight: '500'
                  }}
                >
                  {c.label}
                </a>
              ))}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
