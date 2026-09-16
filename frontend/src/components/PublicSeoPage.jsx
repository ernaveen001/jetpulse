import React, { useEffect } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';

const SITE_URL = 'https://www.jetpulse.in';

const PAGE_CONTENT = {
  '/healthcare-companion': {
    title: 'Healthcare Companion Services | JetPulse',
    description: 'Book a verified healthcare companion for doctor visits, diagnostics, hospital navigation, and post-discharge support.',
    heading: 'A trusted companion for the practical side of healthcare.',
    intro: 'JetPulse helps patients and families manage the logistics around care with trained, verified companions and clear updates.',
    points: ['Doctor and clinic visit assistance', 'Diagnostic test and lab support', 'Hospital registration and navigation', 'Pickup, transport, and doorstep drop', 'Remote updates for family members'],
    cta: 'Book a healthcare companion',
  },
  '/hospital-navigation': {
    title: 'Hospital Navigation Assistance | JetPulse',
    description: 'Get practical help with hospital registration, OPD navigation, paperwork, appointments, and family updates.',
    heading: 'Make complex hospital visits easier to manage.',
    intro: 'From finding the right department to completing practical tasks, JetPulse companions help patients move through hospital visits with less stress.',
    points: ['OPD desk and token guidance', 'Department and ward navigation', 'Admission and paperwork support', 'Wheelchair and mobility assistance', 'Progress updates for family'],
    cta: 'Get hospital assistance',
  },
  '/diagnostic-test-assistance': {
    title: 'Diagnostic Test Assistance | JetPulse',
    description: 'Get help coordinating blood tests, MRI scans, radiology appointments, and other diagnostic visits.',
    heading: 'Get tests done with practical support by your side.',
    intro: 'JetPulse companions can help organize the visit, navigate the facility, manage documents, and share updates with authorized family members.',
    points: ['Blood test and sample collection visits', 'MRI, CT, and radiology navigation', 'Appointment and document coordination', 'Mobility support inside facilities', 'Prescription and report collection'],
    cta: 'Arrange diagnostic assistance',
  },
  '/post-discharge-care': {
    title: 'Post-Discharge Support | JetPulse',
    description: 'Arrange practical post-discharge support including transport home, prescription collection, and recovery setup.',
    heading: 'Support that continues after leaving the hospital.',
    intro: 'Returning home after treatment can involve more logistics. JetPulse helps families arrange non-clinical support for the journey home and immediate setup.',
    points: ['Safe transport coordination', 'Prescription and document collection', 'Doorstep drop and mobility assistance', 'Basic recovery-space setup support', 'Updates for family members'],
    cta: 'Arrange post-discharge support',
  },
  '/care-navigator': {
    title: 'Care Navigator | Healthcare Options Guide | JetPulse',
    description: 'Use JetPulse Care Navigator to organize healthcare questions, reports, appointments, and nearby care options.',
    heading: 'A clearer next step when healthcare feels difficult to navigate.',
    intro: 'Care Navigator helps organize information and explore appropriate healthcare options. It is an informational tool, not a replacement for a clinician.',
    points: ['Organize symptoms and care questions', 'Review reports and prescriptions', 'Explore nearby healthcare options', 'Keep care journeys organized', 'Connect with practical assistance'],
    cta: 'Open Care Navigator',
  },
  '/family-health-management': {
    title: 'Family Health Management | JetPulse',
    description: 'Keep family appointments, reports, care journeys, and companion updates organized in one private timeline.',
    heading: 'Keep your family’s healthcare connected.',
    intro: 'JetPulse gives families a shared way to coordinate appointments, reports, journeys, and practical assistance across cities.',
    points: ['Family member profiles', 'Shared appointment and report tracking', 'Remote booking for loved ones', 'Companion updates with consent', 'Organized health journey timelines'],
    cta: 'Explore family health support',
  },
  '/cities/bangalore': {
    title: 'Healthcare Companion Services in Bangalore | JetPulse',
    description: 'Explore JetPulse healthcare companion, hospital navigation, and diagnostic assistance options in Bangalore.',
    heading: 'Practical healthcare assistance in Bangalore.',
    intro: 'JetPulse helps people in Bangalore arrange non-clinical support for doctor visits, diagnostic appointments, hospital navigation, and family coordination. Confirm current availability when booking.',
    points: ['Doctor and clinic visit support', 'Diagnostic appointment assistance', 'Hospital registration and navigation', 'Remote coordination for family', 'Availability confirmed during booking'],
    cta: 'Check Bangalore availability',
  },
  '/cities/varanasi': {
    title: 'Healthcare Companion Services in Varanasi | JetPulse',
    description: 'Explore JetPulse healthcare companion, hospital navigation, and diagnostic assistance options in Varanasi.',
    heading: 'Practical healthcare assistance in Varanasi.',
    intro: 'JetPulse helps families arrange non-clinical support in Varanasi for healthcare visits, diagnostic appointments, hospital navigation, and updates to relatives living elsewhere.',
    points: ['Doctor and hospital visit support', 'Diagnostic appointment assistance', 'Mobility and navigation help', 'Remote family booking support', 'Availability confirmed during booking'],
    cta: 'Check Varanasi availability',
  },
  '/cities/jaipur': {
    title: 'Healthcare Companion Services in Jaipur | JetPulse',
    description: 'Explore JetPulse healthcare companion, hospital navigation, and diagnostic assistance options in Jaipur.',
    heading: 'Practical healthcare assistance in Jaipur.',
    intro: 'JetPulse helps people and families arrange non-clinical support in Jaipur for appointments, diagnostics, hospital visits, and practical healthcare logistics.',
    points: ['Doctor and clinic visit support', 'Diagnostic and report collection help', 'Hospital navigation assistance', 'Family updates with consent', 'Availability confirmed during booking'],
    cta: 'Check Jaipur availability',
  },
  '/about': {
    title: 'About JetPulse | Healthcare Assistance and Navigation',
    description: 'Learn how JetPulse helps people and families handle the practical side of healthcare.',
    heading: 'Healthcare, handled with more clarity and care.',
    intro: 'JetPulse is designed for people who need practical, non-clinical support around healthcare visits, diagnostics, hospital navigation, and family coordination.',
    points: ['Non-clinical assistance', 'Verified companion network', 'Family-centered coordination', 'Clear service expectations', 'Privacy-conscious updates'],
    cta: 'Get assistance',
  },
};

const TRUST_PAGES = {
  '/privacy': {
    title: 'Privacy Policy | JetPulse',
    heading: 'Privacy Policy',
    intro: 'JetPulse is committed to handling personal information responsibly. This page explains the categories of information we may collect, why we use them, and the choices available to you.',
  },
  '/terms': {
    title: 'Terms of Service | JetPulse',
    heading: 'Terms of Service',
    intro: 'These terms describe the responsibilities and expectations for using JetPulse services. JetPulse provides non-clinical assistance and does not replace emergency or professional medical care.',
  },
  '/verification': {
    title: 'Companion Verification | JetPulse',
    heading: 'Companion Verification',
    intro: 'JetPulse is building a consistent verification process for companions, including identity checks, service training, and clear conduct expectations. Verification details should be confirmed before service launch.',
  },
  '/accessibility': {
    title: 'Accessibility | JetPulse',
    heading: 'Accessibility',
    intro: 'JetPulse aims to make healthcare assistance usable for people with different mobility, vision, hearing, and cognitive needs. Contact us with accessibility feedback or support requests.',
  },
  '/help': {
    title: 'Help Center | JetPulse',
    heading: 'Help Center',
    intro: 'Find answers about booking a companion, preparing for a healthcare visit, sharing updates with family, and using Care Navigator.',
  },
};

function updateMetadata(title, description) {
  document.title = title;
  const descriptionTag = document.querySelector('meta[name="description"]');
  if (descriptionTag) descriptionTag.setAttribute('content', description);
  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) canonical.setAttribute('href', `${SITE_URL}${window.location.pathname}`);

  const ogTitle = document.querySelector('meta[property="og:title"]');
  const ogDescription = document.querySelector('meta[property="og:description"]');
  const ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogTitle) ogTitle.setAttribute('content', title);
  if (ogDescription) ogDescription.setAttribute('content', description);
  if (ogUrl) ogUrl.setAttribute('content', `${SITE_URL}${window.location.pathname}`);
}

export function isPublicSeoPath(pathname) {
  return Boolean(PAGE_CONTENT[pathname] || TRUST_PAGES[pathname]);
}

const CITY_LINKS = [
  { href: '/cities/bangalore', label: 'Bangalore' },
  { href: '/cities/varanasi', label: 'Varanasi' },
  { href: '/cities/jaipur', label: 'Jaipur' },
];

export default function PublicSeoPage({ pathname, onOpenBooking, onNavigateHome }) {
  const content = PAGE_CONTENT[pathname] || TRUST_PAGES[pathname];
  const isTrustPage = Boolean(TRUST_PAGES[pathname]);

  useEffect(() => {
    updateMetadata(content.title, content.description || content.intro);

    const schema = document.createElement('script');
    schema.id = 'jetpulse-page-schema';
    schema.type = 'application/ld+json';
    schema.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': content.points ? 'Service' : 'WebPage',
      name: content.title,
      description: content.description || content.intro,
      url: `${SITE_URL}${pathname}`,
      provider: {
        '@type': 'Organization',
        name: 'JetPulse',
        url: SITE_URL,
      },
      ...(pathname.startsWith('/cities/') ? { areaServed: content.heading.replace('Practical healthcare assistance in ', '').replace('.', '') } : {}),
    });
    document.head.appendChild(schema);

    return () => schema.remove();
  }, [content]);

  return (
    <div className="seo-page-shell">
      <header className="seo-page-header">
        <div className="jp-container seo-page-header-inner">
          <button className="seo-back-link" type="button" onClick={onNavigateHome}>
            <ArrowLeft size={16} aria-hidden="true" />
            JetPulse
          </button>
          {!isTrustPage && (
            <button className="jp-btn jp-btn-primary jp-btn-sm" type="button" onClick={onOpenBooking}>
              Get assistance <ArrowRight size={16} aria-hidden="true" />
            </button>
          )}
        </div>
      </header>

      <main className="seo-page-main">
        <div className="jp-container seo-page-content">
          <div className="seo-page-eyebrow">
            <ShieldCheck size={16} aria-hidden="true" /> JetPulse healthcare support
          </div>
          <h1>{content.heading}</h1>
          <p className="seo-page-intro">{content.intro}</p>

          {content.points && (
            <section className="seo-page-section" aria-labelledby="service-includes-heading">
              <h2 id="service-includes-heading">What this includes</h2>
              <ul className="seo-page-list">
                {content.points.map((point) => (
                  <li key={point}><CheckCircle2 size={18} aria-hidden="true" /> {point}</li>
                ))}
              </ul>
            </section>
          )}

          {isTrustPage && (
            <section className="seo-page-section">
              <h2>Important information</h2>
              <p>For urgent symptoms or emergencies, contact local emergency services or a qualified healthcare professional. JetPulse does not diagnose conditions, prescribe treatment, or guarantee clinical outcomes.</p>
            </section>
          )}

          {!isTrustPage && (
            <button className="jp-btn jp-btn-primary jp-btn-lg" type="button" onClick={onOpenBooking}>
              {content.cta} <ArrowRight size={18} aria-hidden="true" />
            </button>
          )}

          {!isTrustPage && !pathname.startsWith('/cities/') && (
            <section className="seo-page-section seo-page-cities" aria-labelledby="service-area-heading">
              <h2 id="service-area-heading">Explore service areas</h2>
              <div className="seo-page-city-links">
                {CITY_LINKS.map((city) => <a key={city.href} href={city.href}>{city.label}</a>)}
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}
