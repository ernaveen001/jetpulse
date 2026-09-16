import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const frontendRoot = path.resolve(__dirname, '..');
const distRoot = path.join(frontendRoot, 'dist');
const siteUrl = 'https://www.jetpulse.in';

const pages = [
  { path: '/healthcare-companion', title: 'Healthcare Companion Services | JetPulse', description: 'Book a verified healthcare companion for doctor visits, diagnostics, hospital navigation, and post-discharge support.', heading: 'A trusted companion for the practical side of healthcare.', intro: 'JetPulse helps patients and families manage the logistics around care with trained, verified companions and clear updates.', points: ['Doctor and clinic visit assistance', 'Diagnostic test and lab support', 'Hospital registration and navigation', 'Pickup, transport, and doorstep drop', 'Remote updates for family members'] },
  { path: '/hospital-navigation', title: 'Hospital Navigation Assistance | JetPulse', description: 'Get practical help with hospital registration, OPD navigation, paperwork, appointments, and family updates.', heading: 'Make complex hospital visits easier to manage.', intro: 'From finding the right department to completing practical tasks, JetPulse companions help patients move through hospital visits with less stress.', points: ['OPD desk and token guidance', 'Department and ward navigation', 'Admission and paperwork support', 'Wheelchair and mobility assistance', 'Progress updates for family'] },
  { path: '/diagnostic-test-assistance', title: 'Diagnostic Test Assistance | JetPulse', description: 'Get help coordinating blood tests, MRI scans, radiology appointments, and other diagnostic visits.', heading: 'Get tests done with practical support by your side.', intro: 'JetPulse companions can help organize the visit, navigate the facility, manage documents, and share updates with authorized family members.', points: ['Blood test and sample collection visits', 'MRI, CT, and radiology navigation', 'Appointment and document coordination', 'Mobility support inside facilities', 'Prescription and report collection'] },
  { path: '/post-discharge-care', title: 'Post-Discharge Support | JetPulse', description: 'Arrange practical post-discharge support including transport home, prescription collection, and recovery setup.', heading: 'Support that continues after leaving the hospital.', intro: 'Returning home after treatment can involve more logistics. JetPulse helps families arrange non-clinical support for the journey home and immediate setup.', points: ['Safe transport coordination', 'Prescription and document collection', 'Doorstep drop and mobility assistance', 'Basic recovery-space setup support', 'Updates for family members'] },
  { path: '/care-navigator', title: 'Care Navigator | Healthcare Options Guide | JetPulse', description: 'Use JetPulse Care Navigator to organize healthcare questions, reports, appointments, and nearby care options.', heading: 'A clearer next step when healthcare feels difficult to navigate.', intro: 'Care Navigator helps organize information and explore appropriate healthcare options. It is an informational tool, not a replacement for a clinician.', points: ['Organize symptoms and care questions', 'Review reports and prescriptions', 'Explore nearby healthcare options', 'Keep care journeys organized', 'Connect with practical assistance'] },
  { path: '/family-health-management', title: 'Family Health Management | JetPulse', description: 'Keep family appointments, reports, care journeys, and companion updates organized in one private timeline.', heading: 'Keep your family’s healthcare connected.', intro: 'JetPulse gives families a shared way to coordinate appointments, reports, journeys, and practical assistance across cities.', points: ['Family member profiles', 'Shared appointment and report tracking', 'Remote booking for loved ones', 'Companion updates with consent', 'Organized health journey timelines'] },
  { path: '/cities/bangalore', title: 'Healthcare Companion Services in Bangalore | JetPulse', description: 'Explore JetPulse healthcare companion, hospital navigation, and diagnostic assistance options in Bangalore.', heading: 'Practical healthcare assistance in Bangalore.', intro: 'JetPulse helps people in Bangalore arrange non-clinical support for doctor visits, diagnostic appointments, hospital navigation, and family coordination. Confirm current availability when booking.', points: ['Doctor and clinic visit support', 'Diagnostic appointment assistance', 'Hospital registration and navigation', 'Remote coordination for family', 'Availability confirmed during booking'] },
  { path: '/cities/varanasi', title: 'Healthcare Companion Services in Varanasi | JetPulse', description: 'Explore JetPulse healthcare companion, hospital navigation, and diagnostic assistance options in Varanasi.', heading: 'Practical healthcare assistance in Varanasi.', intro: 'JetPulse helps families arrange non-clinical support in Varanasi for healthcare visits, diagnostic appointments, hospital navigation, and updates to relatives living elsewhere.', points: ['Doctor and hospital visit support', 'Diagnostic appointment assistance', 'Mobility and navigation help', 'Remote family booking support', 'Availability confirmed during booking'] },
  { path: '/cities/jaipur', title: 'Healthcare Companion Services in Jaipur | JetPulse', description: 'Explore JetPulse healthcare companion, hospital navigation, and diagnostic assistance options in Jaipur.', heading: 'Practical healthcare assistance in Jaipur.', intro: 'JetPulse helps people and families arrange non-clinical support in Jaipur for appointments, diagnostics, hospital visits, and practical healthcare logistics.', points: ['Doctor and clinic visit support', 'Diagnostic and report collection help', 'Hospital navigation assistance', 'Family updates with consent', 'Availability confirmed during booking'] },
  { path: '/about', title: 'About JetPulse | Healthcare Assistance and Navigation', description: 'Learn how JetPulse helps people and families handle the practical side of healthcare.', heading: 'Healthcare, handled with more clarity and care.', intro: 'JetPulse is designed for people who need practical, non-clinical support around healthcare visits, diagnostics, hospital navigation, and family coordination.', points: ['Non-clinical assistance', 'Verified companion network', 'Family-centered coordination', 'Clear service expectations', 'Privacy-conscious updates'] },
  { path: '/privacy', title: 'Privacy Policy | JetPulse', description: 'JetPulse privacy policy and information handling practices.', heading: 'Privacy Policy', intro: 'JetPulse is committed to handling personal information responsibly. This page explains the categories of information we may collect, why we use them, and the choices available to you.' },
  { path: '/terms', title: 'Terms of Service | JetPulse', description: 'JetPulse terms of service for healthcare assistance and navigation services.', heading: 'Terms of Service', intro: 'These terms describe the responsibilities and expectations for using JetPulse services. JetPulse provides non-clinical assistance and does not replace emergency or professional medical care.' },
  { path: '/verification', title: 'Companion Verification | JetPulse', description: 'Learn about JetPulse companion verification and service expectations.', heading: 'Companion Verification', intro: 'JetPulse is building a consistent verification process for companions, including identity checks, service training, and clear conduct expectations. Verification details should be confirmed before service launch.' },
  { path: '/accessibility', title: 'Accessibility | JetPulse', description: 'JetPulse accessibility information and support.', heading: 'Accessibility', intro: 'JetPulse aims to make healthcare assistance usable for people with different mobility, vision, hearing, and cognitive needs. Contact us with accessibility feedback or support requests.' },
  { path: '/help', title: 'Help Center | JetPulse', description: 'Get help with JetPulse bookings, healthcare visits, family updates, and Care Navigator.', heading: 'Help Center', intro: 'Find answers about booking a companion, preparing for a healthcare visit, sharing updates with family, and using Care Navigator.' },
];

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
}

function staticContent(page) {
  const points = page.points ? `<section class="seo-page-section" aria-labelledby="service-includes-heading"><h2 id="service-includes-heading">What this includes</h2><ul class="seo-page-list">${page.points.map((point) => `<li><span aria-hidden="true">✓</span> ${escapeHtml(point)}</li>`).join('')}</ul></section>` : '';
  const trustNotice = page.points ? '' : '<section class="seo-page-section"><h2>Important information</h2><p>For urgent symptoms or emergencies, contact local emergency services or a qualified healthcare professional. JetPulse does not diagnose conditions, prescribe treatment, or guarantee clinical outcomes.</p></section>';
  return `<div class="seo-page-shell"><header class="seo-page-header"><div class="jp-container seo-page-header-inner"><a class="seo-back-link" href="/">JetPulse</a>${page.points ? '<a class="jp-btn jp-btn-primary jp-btn-sm" href="/#booking">Get assistance</a>' : ''}</div></header><main class="seo-page-main"><div class="jp-container seo-page-content"><div class="seo-page-eyebrow">JetPulse healthcare support</div><h1>${escapeHtml(page.heading)}</h1><p class="seo-page-intro">${escapeHtml(page.intro)}</p>${points}${trustNotice}</div></main></div>`;
}

function pageHtml(template, page) {
  const canonical = `${siteUrl}${page.path}`;
  const schemaType = page.points ? 'Service' : 'WebPage';
  const schema = JSON.stringify({ '@context': 'https://schema.org', '@type': schemaType, name: page.title, description: page.description, url: canonical, provider: { '@type': 'Organization', name: 'JetPulse', url: siteUrl } });
  return template
    .replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(page.title)}</title>`)
    .replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/>/s, `<meta name="description" content="${escapeHtml(page.description)}" />`)
    .replace(/<link rel="canonical" href="[^"]*"\s*\/>/, `<link rel="canonical" href="${canonical}" />`)
    .replace(/<meta property="og:title" content="[^"]*"\s*\/>/, `<meta property="og:title" content="${escapeHtml(page.title)}" />`)
    .replace(/<meta property="og:description"\s+content="[^"]*"\s*\/>/s, `<meta property="og:description" content="${escapeHtml(page.description)}" />`)
    .replace(/<meta property="og:url" content="[^"]*"\s*\/>/, `<meta property="og:url" content="${canonical}" />`)
    .replace('<div id="root"></div>', staticContent(page))
    .replace('</head>', `<script type="application/ld+json">${schema}</script></head>`);
}

const template = await fs.readFile(path.join(distRoot, 'index.html'), 'utf8');
for (const page of pages) {
  const outputDirectory = path.join(distRoot, page.path.slice(1));
  await fs.mkdir(outputDirectory, { recursive: true });
  await fs.writeFile(path.join(outputDirectory, 'index.html'), pageHtml(template, page), 'utf8');
}
console.log(`Prerendered ${pages.length} SEO pages.`);
