import React, { useEffect, useState, Suspense, lazy } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import TrustStrip from './components/TrustStrip';
import CoreEnginesSection from './components/CoreEnginesSection';
import HealthcareJourney from './components/HealthcareJourney';
import Footer from './components/Footer';
import SEOHead from './components/SEOHead';
import NotFound from './components/NotFound';
import PublicSeoPage, { isPublicSeoPath } from './components/PublicSeoPage';
import { SEO_ROUTES, SITE_URL } from './seo/seoConfig';

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

export default function App() {
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

  // 1. Check if on known Public SEO Route
  if (isPublicSeoPath(pathname)) {
    return (
      <>
        <PublicSeoPage
          pathname={pathname}
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

  // 2. Check if on Unknown URL (404 Not Found)
  if (pathname !== '/') {
    return (
      <NotFound
        onNavigateHome={navigateToHome}
        onOpenBooking={handleOpenBooking}
      />
    );
  }

  // 3. SaaS App Dashboard View (Private, non-indexed state)
  if (currentView === 'app') {
    return (
      <Suspense fallback={<SectionLoader />}>
        <SEOHead
          title="JetPulse Healthcare Dashboard | Private"
          description="JetPulse private health records and family coordination dashboard."
          robots="noindex, nofollow"
        />
        <div>
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

  // 4. Primary Public Homepage
  const homeSeo = SEO_ROUTES['/'];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <SEOHead
        title={homeSeo.title}
        description={homeSeo.description}
        canonical={homeSeo.canonical}
        keywords={[homeSeo.primaryKeyword, ...homeSeo.secondaryKeywords]}
        robots="index, follow"
      />

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
