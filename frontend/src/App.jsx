import React, { useState, Suspense, lazy } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import TrustStrip from './components/TrustStrip';
import CoreEnginesSection from './components/CoreEnginesSection';
import HealthcareJourney from './components/HealthcareJourney';
import Footer from './components/Footer';

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

  const handleOpenBooking = () => setIsBookingOpen(true);
  const handleCloseBooking = () => setIsBookingOpen(false);

  const handleNavigateNavigator = () => {
    const el = document.getElementById('navigator');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  if (currentView === 'app') {
    return (
      <Suspense fallback={<SectionLoader />}>
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

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

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
