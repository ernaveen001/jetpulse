import React, { useEffect, useState, Suspense, lazy } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import TrustStrip from './components/TrustStrip';
import CoreEnginesSection from './components/CoreEnginesSection';
import HealthcareJourney from './components/HealthcareJourney';
import Footer from './components/Footer';
import PublicSeoPage, { isPublicSeoPath } from './components/PublicSeoPage';
import NotFound404 from './components/NotFound404';
import SeoHead from './seo/SeoHead';

// Lazy-load heavy components — they only load when needed
const CompanionBookingModal = lazy(() => import('./components/CompanionBookingModal'));
const CareNavigatorUI = lazy(() => import('./components/CareNavigatorUI'));
const FamilyHealthEcosystem = lazy(() => import('./components/FamilyHealthEcosystem'));
const RemoteFamilyStory = lazy(() => import('./components/RemoteFamilyStory'));
const HealthcareNetwork = lazy(() => import('./components/HealthcareNetwork'));
const RealJourneys = lazy(() => import('./components/RealJourneys'));
const HowItWorks = lazy(() => import('./components/HowItWorks'));
const SaaSAppDashboard = lazy(() => import('./components/SaaSAppDashboard'));

// Minimal fallback spinner — keeps UI stable during lazy load
function SectionLoader() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '80px 0',
      color: 'var(--teal-primary)'
    }}>
      <div style={{
        width: '32px',
        height: '32px',
        border: '3px solid var(--border-color)',
        borderTopColor: 'var(--teal-primary)',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite'
      }} />
    </div>
  );
}

export function OldApp() {
  const [currentView, setCurrentView] = useState('landing'); // 'landing' | 'app'
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [pathname, setPathname] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => setPathname(window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleOpenBooking = () => setIsBookingOpen(true);
  const handleCloseBooking = () => setIsBookingOpen(false);

  const navigateToHome = () => {
    window.history.pushState({}, '', '/');
    setPathname('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateNavigator = () => {
    const el = document.getElementById('navigator');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const normalizedPath = pathname.replace(/\/$/, '') || '/';

  // 1. Check if public SEO route
  if (isPublicSeoPath(normalizedPath)) {
    return (
      <>
        <PublicSeoPage
          pathname={normalizedPath}
          onOpenBooking={handleOpenBooking}
          onNavigateHome={navigateToHome}
        />
        {isBookingOpen && (
          <Suspense fallback={null}>
            <CompanionBookingModal
              isOpen={isBookingOpen}
              onClose={handleCloseBooking}
            />
          </Suspense>
        )}
      </>
    );
  }

  // 2. Check if unknown non-root path (SEO 404 page)
  if (normalizedPath !== '/' && !isPublicSeoPath(normalizedPath)) {
    return <NotFound404 onNavigateHome={navigateToHome} />;
  }

  // 3. Check if Private / App Dashboard view
  if (currentView === 'app') {
    return (
      <Suspense fallback={<SectionLoader />}>
        <div>
          <SeoHead pathname="/dashboard" />
          <SaaSAppDashboard
            onOpenBooking={handleOpenBooking}
            onNavigateNavigator={handleNavigateNavigator}
            onSwitchToLanding={() => setCurrentView('landing')}
          />
          {isBookingOpen && (
            <CompanionBookingModal
              isOpen={isBookingOpen}
              onClose={handleCloseBooking}
            />
          )}
        </div>
      </Suspense>
    );
  }

  // 4. Default Homepage View
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <SeoHead pathname="/" />

      {/* GLOBAL STICKY NAVIGATION */}
      <Navigation
        onOpenBooking={handleOpenBooking}
        currentView={currentView}
        setCurrentView={setCurrentView}
      />

      {/* HERO SECTION — always eager-loaded for fast LCP */}
      <Hero
        onOpenBooking={handleOpenBooking}
        onNavigateNavigator={handleNavigateNavigator}
      />

      {/* TRUST STRIP */}
      <TrustStrip />

      {/* CORE ENGINES — eager loaded (above fold on most screens) */}
      <CoreEnginesSection
        onOpenBooking={handleOpenBooking}
        onNavigateNavigator={handleNavigateNavigator}
      />

      {/* HEALTHCARE JOURNEY */}
      <Suspense fallback={<SectionLoader />}>
        <HealthcareJourney onOpenBooking={handleOpenBooking} />
      </Suspense>

      {/* CARE NAVIGATOR AI — lazy loaded */}
      <Suspense fallback={<SectionLoader />}>
        <CareNavigatorUI onOpenBooking={handleOpenBooking} />
      </Suspense>

      {/* FAMILY HEALTH ECOSYSTEM — lazy loaded */}
      <Suspense fallback={<SectionLoader />}>
        <FamilyHealthEcosystem onOpenBooking={handleOpenBooking} />
      </Suspense>

      {/* REMOTE FAMILY STORY — lazy loaded */}
      <Suspense fallback={<SectionLoader />}>
        <RemoteFamilyStory onOpenBooking={handleOpenBooking} />
      </Suspense>

      {/* HEALTHCARE NETWORK — lazy loaded */}
      <Suspense fallback={<SectionLoader />}>
        <HealthcareNetwork onOpenBooking={handleOpenBooking} />
      </Suspense>

      {/* REAL HUMAN STORIES — lazy loaded */}
      <Suspense fallback={<SectionLoader />}>
        <RealJourneys onOpenBooking={handleOpenBooking} />
      </Suspense>

      {/* HOW IT WORKS & FINAL CTA — lazy loaded */}
      <Suspense fallback={<SectionLoader />}>
        <HowItWorks onOpenBooking={handleOpenBooking} />
      </Suspense>

      {/* FOOTER */}
      <Footer
        onOpenBooking={handleOpenBooking}
        onNavigateNavigator={handleNavigateNavigator}
      />

      {/* BOOKING MODAL — only mounted when open to ensure fresh state */}
      {isBookingOpen && (
        <Suspense fallback={null}>
          <CompanionBookingModal
            isOpen={isBookingOpen}
            onClose={handleCloseBooking}
          />
        </Suspense>
      )}

    </div>
  );
}

import { Twitter, Linkedin, Mail, CheckCircle, Clock, Instagram } from 'lucide-react';

export default function App() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    try {
      // IMPORTANT: Replace 'YOUR_FORM_ID' with the endpoint ID you get from Formspree.io
      const response = await fetch('https://formspree.io/f/xdekygoq', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email })
      });

      // We show the success UI if Formspree accepts it
      if (response.ok) {
        setSubmitted(true);
      } else {
        alert("Oops! There was a problem submitting your form. Make sure you set up your Formspree ID.");
      }
    } catch (error) {
      alert("Oops! There was a network error submitting your form.");
    }
  };

  return (
    <div className="app-container">
      {/* Professional Navigation */}
      <nav className="nav-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div className="logo-wrapper">
            <img src="/logo.png" alt="JetPulse Logo" />
          </div>
          <span style={{ fontSize: '1.25rem', fontWeight: '700', color: '#123B5D', letterSpacing: '-0.01em' }}>
            JetPulse
          </span>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="main-content">
        <div className="registration-card">
          <h1 className="card-heading">
            Day 101 Building
          </h1>

          <p style={{
            fontSize: '1rem',
            fontWeight: '400',
            color: '#64748b',
            marginBottom: '1.5rem',
            lineHeight: 1.6,
          }}>
            We are meticulously crafting a premier healthcare platform. Join our professional network to secure priority access upon launch.
          </p>

          <div style={{ height: '1px', backgroundColor: '#e2e8f0', width: '100%', marginBottom: '1.5rem' }}></div>

          {/* Registration Form */}
          {!submitted ? (
            <form onSubmit={handleSubmit} style={{ textAlign: 'left', width: '100%' }}>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#123B5D', marginBottom: '0.5rem' }}>
                Corporate or Personal Email
              </label>
              <div className="form-container">
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="email-input"
                  aria-label="Email Address"
                />
                <button type="submit" className="submit-btn">
                  Request Access
                </button>
              </div>
              <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.875rem', display: 'flex', alignItems: 'flex-start', gap: '6px', lineHeight: 1.4 }}>
                <CheckCircle size={14} color="#0F766E" style={{ flexShrink: 0, marginTop: '2px' }} /> 
                <span>Early registration guarantees an invitation to the closed beta.</span>
              </p>
            </form>
          ) : (
            <div style={{
              padding: '1.5rem',
              backgroundColor: '#DDF5EF',
              border: '1px solid #14B8A6',
              borderRadius: '8px',
              color: '#0F766E',
              fontSize: '0.95rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              fontWeight: '500'
            }}>
              <CheckCircle size={20} />
              Registration received. We will contact you shortly.
            </div>
          )}

        </div>
      </main>

      {/* Professional Footer */}
      <footer className="footer-section">
        <h3 style={{ fontSize: '1.1rem', color: '#123B5D', marginBottom: '1.25rem', fontWeight: '700' }}>
          Follow our Journey & Stay Tuned
        </h3>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginBottom: '1.5rem' }}>
          {[
            { icon: Linkedin, link: 'https://www.linkedin.com/company/jetpulsein/', label: 'LinkedIn' },
            { icon: Instagram, link: 'https://www.instagram.com/jetpulsecare/', label: 'Instagram' },
            { icon: Mail, link: 'mailto:jetpulsein@gmail.com', label: 'Email' }
          ].map((social, idx) => (
            <a key={idx} href={social.link} target="_blank" rel="noreferrer" className="social-icon" aria-label={social.label}>
              <social.icon size={22} />
            </a>
          ))}
        </div>

        <p style={{ color: '#64748b', fontSize: '0.85rem' }}>
          &copy; {new Date().getFullYear()} JetPulse Healthcare. All rights reserved.
        </p>
      </footer>

      <style>
        {`
          * { box-sizing: border-box; }
          body {
            margin: 0; padding: 0;
            font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            background-color: #fbfcfd;
            color: #1e293b;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
          .app-container {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            width: 100%;
            overflow-x: hidden;
          }
          .nav-header {
            width: 100%;
            height: 72px;
            background-color: #ffffff;
            border-bottom: 1px solid #e2e8f0;
            display: flex;
            align-items: center;
            padding: 0 5%;
            position: sticky;
            top: 0;
            z-index: 50;
          }
          .logo-wrapper {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 40px;
            padding: 4px;
            flex-shrink: 0;
          }
          .logo-wrapper img {
            width: 100%;
            height: 100%;
            object-fit: contain;
          }
          .main-content {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 2rem 1.25rem;
            width: 100%;
          }
          .registration-card {
            background-color: #ffffff;
            padding: 2.5rem;
            border-radius: 12px;
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01);
            max-width: 560px;
            width: 100%;
            border: 1px solid #e2e8f0;
            text-align: center;
          }
          .card-heading {
            font-size: clamp(2rem, 6vw, 2.5rem);
            font-weight: 800;
            margin-bottom: 1rem;
            background: linear-gradient(to right, #0F766E, #14B8A6);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            line-height: 1.2;
            letter-spacing: -0.02em;
          }
          .form-container {
            display: flex;
            gap: 0.75rem;
            width: 100%;
            align-items: stretch;
          }
          .email-input {
            flex: 1;
            width: 100%;
            padding: 0.875rem 1rem;
            border-radius: 8px;
            border: 1px solid #cbd5e1;
            font-size: 0.95rem;
            outline: none;
            transition: all 0.2s;
            background-color: #f8fafc;
            color: #1e293b;
          }
          .email-input:focus {
            border-color: #0F766E;
            background-color: #ffffff;
            box-shadow: 0 0 0 3px rgba(15, 118, 110, 0.1);
          }
          .submit-btn {
            padding: 0.875rem 1.5rem;
            border-radius: 8px;
            border: none;
            background: linear-gradient(to right, #0F766E, #14B8A6);
            color: white;
            font-size: 0.95rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
            box-shadow: 0 4px 10px rgba(20, 184, 166, 0.25);
            white-space: nowrap;
          }
          .submit-btn:hover { opacity: 0.95; transform: translateY(-1px); }
          .submit-btn:active { transform: translateY(1px); }
          .footer-section {
            background-color: #F7FAF9;
            border-top: 1px solid #e2e8f0;
            padding: 2rem 5%;
            text-align: center;
            margin-top: auto;
            width: 100%;
          }
          .social-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 44px;
            height: 44px;
            background-color: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 50%;
            color: #0F766E;
            transition: all 0.2s ease;
            cursor: pointer;
          }
          .social-icon:hover {
            background-color: #0F766E;
            color: #ffffff;
            border-color: #0F766E;
            transform: translateY(-2px);
            box-shadow: 0 4px 6px rgba(15, 118, 110, 0.2);
          }
          
          /* Mobile Responsiveness */
          @media (max-width: 600px) {
            .registration-card {
              padding: 1.75rem 1.25rem;
            }
            .form-container {
              flex-direction: column;
            }
            .submit-btn {
              width: 100%;
            }
            .nav-header {
              padding: 0 1rem;
            }
          }
        `}
      </style>
    </div>
  );
}
