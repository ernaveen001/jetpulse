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
    <div style={{
      height: '100vh',
      overflow: 'hidden',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#fbfcfd',
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      color: '#1e293b'
    }}>
      {/* Professional Navigation */}
      <nav style={{
        width: '100%',
        height: '72px',
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e2e8f0',
        display: 'flex',
        alignItems: 'center',
        padding: '0 5%',
        position: 'sticky',
        top: 0,
        zIndex: 50
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src="/logo.png" alt="JetPulse Logo" style={{ height: '32px', width: 'auto' }} />
          <span style={{ fontSize: '1.25rem', fontWeight: '700', color: '#0F172A', letterSpacing: '-0.01em' }}>
            JetPulse
          </span>
        </div>
      </nav>

      {/* Main Content Area */}
      <main style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1rem',
      }}>
        <div style={{
          backgroundColor: '#ffffff',
          padding: '2rem 2.5rem',
          borderRadius: '8px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
          maxWidth: '560px',
          width: '100%',
          border: '1px solid #e2e8f0',
          textAlign: 'center'
        }}>



          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: '800',
            marginBottom: '1rem',
            background: 'linear-gradient(to right, #0F9F96, #42E3DB)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            lineHeight: 1.2,
            letterSpacing: '-0.02em'
          }}>
            Day 101 Building
          </h1>

          <p style={{
            fontSize: '1rem',
            fontWeight: '400',
            color: '#64748b',
            marginBottom: '1rem',
            lineHeight: 1.5,
          }}>
            We are meticulously crafting a premier healthcare platform. Join our professional network to secure priority access upon launch.
          </p>

          <div style={{ height: '1px', backgroundColor: '#e2e8f0', width: '100%', marginBottom: '1.5rem' }}></div>

          {/* Registration Form */}
          {!submitted ? (
            <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#334155', marginBottom: '0.5rem' }}>
                Corporate or Personal Email
              </label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    flex: 1,
                    padding: '0.75rem 1rem',
                    borderRadius: '6px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.875rem',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                    backgroundColor: '#f8fafc'
                  }}
                  onFocus={(e) => { e.target.style.borderColor = '#0F9F96'; e.target.style.backgroundColor = '#ffffff'; }}
                  onBlur={(e) => { e.target.style.borderColor = '#cbd5e1'; e.target.style.backgroundColor = '#f8fafc'; }}
                />
                <button type="submit" style={{
                  padding: '0.75rem 1.5rem',
                  borderRadius: '6px',
                  border: 'none',
                  background: 'linear-gradient(to right, #0F9F96, #14B8A6)',
                  color: 'white',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'opacity 0.2s, transform 0.1s',
                  boxShadow: '0 4px 10px rgba(15, 159, 150, 0.3)'
                }}
                  onMouseOver={(e) => { e.currentTarget.style.opacity = '0.9'; }}
                  onMouseOut={(e) => { e.currentTarget.style.opacity = '1'; }}
                  onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.98)'; }}
                  onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                >
                  Request Access
                </button>
              </div>
              <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <CheckCircle size={12} color="#0F9F96" /> Early registration guarantees an invitation to the closed beta.
              </p>
            </form>
          ) : (
            <div style={{
              padding: '1.5rem',
              backgroundColor: '#f0fdf4',
              border: '1px solid #bbf7d0',
              borderRadius: '6px',
              color: '#166534',
              fontSize: '0.875rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}>
              <CheckCircle size={18} />
              Registration received. We will contact you shortly.
            </div>
          )}

        </div>
      </main>

      {/* Professional Footer */}
      <footer style={{
        backgroundColor: '#e6f4f1',
        borderTop: '1px solid #d1e8e2',
        padding: '1.5rem 5%',
        textAlign: 'center',
        marginTop: 'auto'
      }}>
        <h3 style={{ fontSize: '1.1rem', color: '#1e293b', marginBottom: '1rem', fontWeight: '700' }}>
          Follow our Journey & Stay Tuned
        </h3>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginBottom: '1rem' }}>
          {[
            { icon: Linkedin, link: 'https://www.linkedin.com/company/jetpulsein/' },
            { icon: Instagram, link: 'https://www.instagram.com/jetpulsecare/' },
            { icon: Mail, link: 'mailto:jetpulsein@gmail.com' }
          ].map((social, idx) => (
            <a key={idx} href={social.link} target="_blank" rel="noreferrer" style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              backgroundColor: '#f1f5f9',
              borderRadius: '50%',
              color: '#0F9F96',
              transition: 'all 0.2s',
              cursor: 'pointer'
            }}
              onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#0F9F96'; e.currentTarget.style.color = '#fff'; }}
              onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#f1f5f9'; e.currentTarget.style.color = '#0F9F96'; }}
            >
              <social.icon size={20} />
            </a>
          ))}
        </div>

        <p style={{ color: '#94a3b8', fontSize: '0.8rem' }}>
          &copy; {new Date().getFullYear()} JetPulse Healthcare. All rights reserved.
        </p>
      </footer>

      <style>
        {`
          * {
            box-sizing: border-box;
          }
          body {
            margin: 0;
            padding: 0;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
          @media (max-width: 600px) {
            footer {
              flex-direction: column;
              justify-content: center;
              text-align: center;
            }
          }
        `}
      </style>
    </div>
  );
}
