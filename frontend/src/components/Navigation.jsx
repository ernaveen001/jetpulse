import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, LayoutDashboard } from 'lucide-react';
import JetPulseLogo from './JetPulseLogo';

const NAV_LINKS = [
  { label: 'Services',          href: '#services' },
  { label: 'How It Works',      href: '#how-it-works' },
  { label: 'Family Health',     href: '#family-health' },
  { label: 'Healthcare Network',href: '#network' },
  { label: 'Care Navigator',    href: '#navigator' },
];

// Detects which section is currently in view using IntersectionObserver
function useActiveSection(ids) {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const observers = [];
    const onIntersect = (id) => (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveId(id);
      });
    };

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(onIntersect(id), {
        rootMargin: '-40% 0px -55% 0px',
        threshold: 0,
      });
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, [ids]);

  return activeId;
}

const SECTION_IDS = ['services', 'how-it-works', 'family-health', 'network', 'navigator'];

export default function Navigation({ onOpenBooking, currentView, setCurrentView }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const activeSection = useActiveSection(SECTION_IDS);

  // Close mobile menu on route click
  const handleLinkClick = () => setMobileMenuOpen(false);

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border-color)',
      transition: 'all 0.3s ease'
    }}>
      <div className="jp-container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '76px'
      }}>

        {/* LOGO */}
        <div
          onClick={() => setCurrentView('landing')}
          style={{ cursor: 'pointer' }}
          role="button"
          aria-label="Go to homepage"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && setCurrentView('landing')}
        >
          <JetPulseLogo size={42} />
        </div>

        {/* CENTER NAVIGATION LINKS (Desktop) */}
        <nav
          className="desktop-only-nav"
          style={{ display: 'flex', alignItems: 'center', gap: '32px' }}
          aria-label="Main navigation"
        >
          {NAV_LINKS.map(({ label, href }) => {
            const sectionId = href.replace('#', '');
            const isActive = activeSection === sectionId;
            return (
              <a
                key={href}
                href={href}
                className={`nav-link${isActive ? ' active' : ''}`}
                aria-current={isActive ? 'location' : undefined}
              >
                {label}
              </a>
            );
          })}
        </nav>

        {/* RIGHT ACTION BUTTONS */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>

          {/* Dashboard Mode Switcher */}
          <button
            onClick={() => setCurrentView(currentView === 'landing' ? 'app' : 'landing')}
            className="jp-btn jp-btn-secondary jp-btn-sm"
            title="Toggle between Public Site & App Dashboard view"
            aria-label={currentView === 'landing' ? 'Switch to App Dashboard' : 'Switch to Brand View'}
          >
            <LayoutDashboard size={16} aria-hidden="true" />
            <span className="desktop-text">
              {currentView === 'landing' ? 'App Dashboard' : 'Brand View'}
            </span>
          </button>

          {/* Primary CTA */}
          <button
            onClick={onOpenBooking}
            className="jp-btn jp-btn-primary shine-button"
            style={{ borderRadius: '10px' }}
            id="nav-get-assistance-btn"
          >
            <span>Get Assistance</span>
            <ArrowRight size={16} aria-hidden="true" />
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              color: 'var(--navy)',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '8px'
            }}
            className="mobile-menu-btn"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-drawer"
          >
            {mobileMenuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* MOBILE NAV DRAWER */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          style={{
            padding: '16px 24px 24px 24px',
            borderTop: '1px solid var(--border-color)',
            backgroundColor: 'var(--white)',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px'
          }}
        >
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              onClick={handleLinkClick}
              style={{
                fontSize: '16px',
                fontWeight: '600',
                color: 'var(--navy)',
                padding: '12px 8px',
                borderRadius: '8px',
                transition: 'background 0.15s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--mint-soft)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              {label}
            </a>
          ))}

          <div style={{
            paddingTop: '12px',
            marginTop: '8px',
            borderTop: '1px solid var(--border-color)',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}>
            <button
              onClick={() => {
                handleLinkClick();
                setCurrentView(currentView === 'landing' ? 'app' : 'landing');
              }}
              className="jp-btn jp-btn-secondary"
              style={{ width: '100%' }}
            >
              <LayoutDashboard size={16} aria-hidden="true" />
              <span>Switch to {currentView === 'landing' ? 'App Dashboard' : 'Brand View'}</span>
            </button>
            <button
              onClick={() => {
                handleLinkClick();
                onOpenBooking();
              }}
              className="jp-btn jp-btn-primary"
              style={{ width: '100%' }}
            >
              <span>Get Assistance Now</span>
              <ArrowRight size={16} aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
