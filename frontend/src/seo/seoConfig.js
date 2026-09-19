/**
 * JetPulse Central SEO Configuration & Metadata Registry
 * Single Source of Truth for all public pages, keywords, canonical URLs, and structured data.
 */

export const SITE_URL = 'https://www.jetpulse.in';
export const SITE_NAME = 'JetPulse';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;
export const LOGO_URL = `${SITE_URL}/logo.png`;

export const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: 'JetPulse',
  url: SITE_URL,
  logo: {
    '@type': 'ImageObject',
    url: LOGO_URL,
    width: '512',
    height: '512',
  },
  description: 'JetPulse provides non-clinical healthcare companion services, hospital visit assistance, diagnostic test support, AI care navigation, and connected family healthcare management.',
  slogan: 'Healthcare, Handled.',
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: 'support@jetpulse.in',
      availableLanguage: ['English', 'Hindi', 'Kannada'],
      areaServed: 'IN',
    },
  ],
  sameAs: [
    'https://twitter.com/JetPulseHealth',
    'https://linkedin.com/company/jetpulse',
    'https://facebook.com/jetpulsehealth',
  ],
};

export const WEBSITE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: 'JetPulse Healthcare',
  publisher: {
    '@id': `${SITE_URL}/#organization`,
  },
  description: 'Intelligent healthcare companion booking, hospital OPD assistance, diagnostic test support, and AI care navigation platform.',
  inLanguage: 'en-US',
};

export const NOINDEX_ROUTES = [
  '/login',
  '/signup',
  '/forgot-password',
  '/dashboard',
  '/profile',
  '/bookings',
  '/payment',
  '/account',
  '/admin',
];

export const SEO_PAGES = {
  '/': {
    path: '/',
    title: 'Healthcare Companion Services & Care Navigation | JetPulse',
    description: 'Book verified healthcare companions for doctor visits, hospital navigation, diagnostic tests, and post-discharge care. Stay connected with live family updates.',
    keywords: 'healthcare companion, medical companion, hospital visit assistance, doctor visit assistance, diagnostic test assistance, healthcare navigation, family healthcare support, elderly hospital assistance',
    h1: 'Healthcare Companion Services for Easier Care Journeys',
    intro: 'JetPulse provides trained, verified healthcare companions and smart AI navigation to help patients and families handle the logistical, physical, and administrative side of healthcare.',
    category: 'home',
    priority: '1.0',
    changefreq: 'weekly',
  },

  '/healthcare-companion': {
    path: '/healthcare-companion',
    title: 'Healthcare Companion Services | JetPulse',
    description: 'Book a verified healthcare companion for doctor appointments, diagnostics, hospital visits, and post-discharge recovery. Doorstep pickup and family updates included.',
    keywords: 'healthcare companion service, medical companion, patient escort, elderly healthcare companion, hospital companion, doctor visit escort',
    h1: 'Verified Healthcare Companion Services',
    intro: 'JetPulse connects you with compassionate, background-verified companions who accompany you or your loved ones through doctor visits, lab tests, and hospital appointments.',
    category: 'service',
    priority: '0.9',
    changefreq: 'weekly',
    serviceType: 'Healthcare Companion & Patient Assistance',
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Services', url: '/services' },
      { name: 'Healthcare Companion', url: '/healthcare-companion' },
    ],
    points: [
      'Doorstep pickup, safe transport, and accompanied journey',
      'Doctor appointment coordination and token management',
      'Diagnostic test, blood collection, and scan assistance',
      'Hospital OPD registration and department navigation',
      'Real-time GPS status and visit summaries for family members',
      'Post-discharge pharmacy pickup and home recovery setup',
    ],
    howItHelps: [
      { title: 'For Solo Individuals & Students', desc: 'When you are unwell and living away from home, get someone trustworthy to accompany you to clinic visits and collect medicines.' },
      { title: 'For Elderly Parents', desc: 'Ensure your elderly parents are never alone during multi-hour hospital visits with attentive mobility and paperwork help.' },
      { title: 'For Remote Families', desc: 'Book from anywhere in the world and receive transparent, consent-based updates at every milestone of the visit.' },
    ],
    faqs: [
      {
        question: 'What is a JetPulse healthcare companion?',
        answer: 'A JetPulse healthcare companion is a trained, background-verified non-clinical escort who assists patients with logistical, physical, and administrative tasks during healthcare visits, such as mobility support, hospital navigation, registration, and family communication.',
      },
      {
        question: 'Can a companion administer medication or make medical decisions?',
        answer: 'No. JetPulse companions provide strictly non-clinical assistance. They do not administer injections, prescribe medication, or provide clinical diagnoses. Medical decisions remain exclusively between the patient and their licensed doctor.',
      },
      {
        question: 'Can I book a companion for my parents while living in another city?',
        answer: 'Yes! JetPulse allows remote booking. You can schedule pickup from your parents’ doorstep in cities like Bangalore, Varanasi, or Jaipur, and track real-time journey updates directly on your dashboard.',
      },
      {
        question: 'How are JetPulse companions verified?',
        answer: 'Every companion undergoes government ID verification, background screening, behavioral assessment, and specialized training in patient communication, mobility support, and hospital navigation protocols.',
      },
    ],
    cta: 'Book a Healthcare Companion',
  },

  '/doctor-visit-assistance': {
    path: '/doctor-visit-assistance',
    title: 'Doctor Visit Assistance & Clinic Escort | JetPulse',
    description: 'Get verified accompaniment for doctor and clinic appointments. Help with token queues, prescription handling, notes, and family progress updates.',
    keywords: 'doctor visit assistance, clinic appointment assistance, medical appointment escort, outpatient companion, doctor visit help for parents',
    h1: 'Doctor & Clinic Visit Assistance',
    intro: 'Navigating busy clinic queues and remembering complex doctor instructions is easier with a dedicated JetPulse companion by your side.',
    category: 'service',
    priority: '0.8',
    changefreq: 'monthly',
    serviceType: 'Doctor Visit Assistance',
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Services', url: '/services' },
      { name: 'Doctor Visit Assistance', url: '/doctor-visit-assistance' },
    ],
    points: [
      'Doorstep pickup and escort to clinic or consulting rooms',
      'OPD registration, token tracking, and queue management',
      'Assistance organizing previous medical records and files',
      'Helping note down doctor instructions and follow-up schedules',
      'Pharmacy visit, prescription medicine collection, and bill organization',
      'Detailed visit debrief shared securely with designated family members',
    ],
    howItHelps: [
      { title: 'Streamlined Consultations', desc: 'Companions keep previous prescriptions, test reports, and question lists organized for the doctor.' },
      { title: 'Reduced Waiting Stress', desc: 'No standing in long token queues alone; your companion manages the administrative wait.' },
      { title: 'Accurate Family Debrief', desc: 'Clear follow-up instructions and prescribed medications are documented for the family.' },
    ],
    faqs: [
      {
        question: 'What does a companion do during the doctor consultation?',
        answer: 'With your consent, the companion helps organize medical files, takes notes on doctor instructions (such as dosage timing and next appointment dates), and assists with paperwork.',
      },
      {
        question: 'Can the companion pick up prescribed medicines after the visit?',
        answer: 'Yes, companions can assist with visiting the attached pharmacy, ensuring all prescribed medicines are collected, and keeping purchase receipts organized.',
      },
      {
        question: 'Is this service suitable for routine specialist check-ups?',
        answer: 'Absolutely. Whether visiting a cardiologist, orthopedist, ophthalmologist, or general physician, our companions make the appointment smooth and comfortable.',
      },
    ],
    cta: 'Schedule Doctor Visit Assistance',
  },

  '/diagnostic-test-assistance': {
    path: '/diagnostic-test-assistance',
    title: 'Diagnostic Test Assistance & Lab Support | JetPulse',
    description: 'Organize and fast-track blood tests, MRI scans, CT scans, ultrasound, and radiology visits with a file-organized JetPulse companion.',
    keywords: 'diagnostic test assistance, lab test assistance, MRI scan companion, blood test escort, radiology visit help, medical scan support',
    h1: 'Diagnostic Test & Lab Visit Assistance',
    intro: 'From fasting blood draws to lengthy MRI and radiology scans, JetPulse companions ensure diagnostic appointments are organized, calm, and timely.',
    category: 'service',
    priority: '0.8',
    changefreq: 'monthly',
    serviceType: 'Diagnostic Test Assistance',
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Services', url: '/services' },
      { name: 'Diagnostic Test Assistance', url: '/diagnostic-test-assistance' },
    ],
    points: [
      'Coordination for fasting blood tests, pathology, and imaging centers',
      'Assistance with MRI, CT scan, X-ray, Ultrasound, and PET scan protocols',
      'Managing test requisitions, doctor prescriptions, and token slips',
      'Comfort and mobility escort during preparation and waiting periods',
      'Physical report pickup or digital document upload to your family vault',
      'Doorstep drop-off following scan completion',
    ],
    howItHelps: [
      { title: 'Fasting & Early Morning Support', desc: 'Companions arrive early to accompany patients safely for fasting blood draws and tests.' },
      { title: 'Navigating Radiology Centers', desc: 'Assistance changing into scan gowns, storing personal valuables, and navigating imaging rooms.' },
      { title: 'Digital Record Keeping', desc: 'Test reports and imaging films are collected, scanned, and uploaded to your secure timeline.' },
    ],
    faqs: [
      {
        question: 'Can companions help with early morning fasting tests?',
        answer: 'Yes, JetPulse companions can be scheduled for early morning pickups to assist patients needing fasting blood tests or pathology collections.',
      },
      {
        question: 'Can the companion collect hard-copy scan films and reports later?',
        answer: 'Yes, companions can collect printed radiology films and test reports from the diagnostic center when ready and deliver them safely to your residence.',
      },
    ],
    cta: 'Arrange Diagnostic Assistance',
  },

  '/hospital-visit-assistance': {
    path: '/hospital-visit-assistance',
    title: 'Hospital Visit Assistance & Navigation | JetPulse',
    description: 'Navigate complex hospital visits, OPD desks, admissions, insurance desks, and multi-department transfers with an experienced JetPulse companion.',
    keywords: 'hospital visit assistance, hospital navigation, hospital admission help, OPD assistance, TPA insurance desk support, hospital companion India',
    h1: 'Hospital Visit Assistance & Navigation',
    intro: 'Large multi-specialty hospitals can be confusing and exhausting. JetPulse provides dedicated escorts to guide you through departments, paperwork, and care transitions.',
    category: 'service',
    priority: '0.8',
    changefreq: 'monthly',
    serviceType: 'Hospital Navigation & Admission Assistance',
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Services', url: '/services' },
      { name: 'Hospital Visit Assistance', url: '/hospital-visit-assistance' },
    ],
    points: [
      'OPD registration desk, counter tokens, and department routing',
      'Wheelchair arrangement and smooth mobility escort through corridors',
      'TPA insurance desk navigation and admission form documentation',
      'Guiding patients between labs, consultation rooms, and billing counters',
      'Real-time milestone notifications sent to authorized family members',
      'Discharge coordination and safe transition back to personal transport',
    ],
    howItHelps: [
      { title: 'Multi-Department Coordination', desc: 'No getting lost between billing, diagnostic wings, pharmacy, and consultant chambers.' },
      { title: 'Physical Mobility Support', desc: 'Arrangement of wheelchairs and assistance with elevators, ramps, and waiting lounges.' },
      { title: 'Family Peace of Mind', desc: 'Family members receive real-time timestamped milestone updates as steps are completed.' },
    ],
    faqs: [
      {
        question: 'Can a companion help with wheelchair mobility inside the hospital?',
        answer: 'Yes. Companions assist with requesting hospital wheelchairs, assisting the patient comfortably, and escorting them between wings, elevators, and clinic counters.',
      },
      {
        question: 'Can a companion assist at the hospital TPA / Insurance desk?',
        answer: 'Companions can help organize policy papers, submit initial claims paperwork at the TPA desk, and wait for pre-authorization status updates on your behalf.',
      },
      {
        question: 'Is JetPulse available for planned hospital admissions?',
        answer: 'Yes. You can schedule companion assistance for admission day to handle registration paperwork, room allocation procedures, and luggage assistance.',
      },
    ],
    cta: 'Book Hospital Assistance',
  },

  '/hospital-navigation': {
    path: '/hospital-navigation',
    title: 'Hospital Navigation Assistance | JetPulse',
    description: 'Practical assistance with hospital registration, OPD routing, paperwork, wheelchair mobility, and family milestone updates.',
    keywords: 'hospital navigation, hospital registration help, OPD desk assistance, hospital escort service',
    h1: 'Hospital Navigation & OPD Assistance',
    intro: 'From locating the right department to completing complex administrative tasks, JetPulse companions help patients move through hospital visits with minimal stress.',
    category: 'service',
    priority: '0.8',
    changefreq: 'monthly',
    serviceType: 'Hospital Navigation',
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Services', url: '/services' },
      { name: 'Hospital Navigation', url: '/hospital-navigation' },
    ],
    points: [
      'OPD desk, token generation, and ward guidance',
      'Department, radiology, and pharmacy routing',
      'Admission paperwork and bill settlement assistance',
      'Wheelchair coordination and mobility support',
      'Progress updates for remote family members',
    ],
    faqs: [
      {
        question: 'How does hospital navigation work?',
        answer: 'Your assigned companion meets you at the hospital entrance or picks you up from home, assists with token numbers, guides you to each department, and handles waiting queue logistics.',
      },
    ],
    cta: 'Get Hospital Assistance',
  },

  '/post-discharge-care': {
    path: '/post-discharge-care',
    title: 'Post-Discharge Support & Recovery Logistics | JetPulse',
    description: 'Practical post-hospital discharge assistance including safe doorstep transport, prescription medicine pickup, and home recovery space setup.',
    keywords: 'post discharge support, hospital discharge assistance, post surgery assistance, recovery transport, post-hospital home setup',
    h1: 'Post-Discharge Care & Recovery Logistics',
    intro: 'Returning home after surgery or hospital treatment involves logistics. JetPulse provides non-clinical support for a safe transition from hospital bed to home comfort.',
    category: 'service',
    priority: '0.8',
    changefreq: 'monthly',
    serviceType: 'Post-Discharge Support',
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Services', url: '/services' },
      { name: 'Post-Discharge Care', url: '/post-discharge-care' },
    ],
    points: [
      'Discharge summary compilation and bill clearing support',
      'Collection of prescribed medications and discharge supplies',
      'Safe wheelchair escort to car and assisted transit home',
      'Doorstep assistance, staircase support, and gentle settling in',
      'Basic recovery-space preparation (water, medicine box, documentation)',
      'Immediate milestone confirmation sent to family members',
    ],
    faqs: [
      {
        question: 'Does post-discharge support include nursing or clinical care?',
        answer: 'No. JetPulse provides non-clinical logistical assistance (transport, medication collection, settling at home). For clinical wound dressing or nursing care, professional home healthcare nurses should be engaged.',
      },
      {
        question: 'Can a companion coordinate discharge medication collection?',
        answer: 'Yes, the companion can visit the hospital pharmacy, collect all prescribed discharge medicines, verify bills, and organize them neatly for the patient.',
      },
    ],
    cta: 'Arrange Post-Discharge Support',
  },

  '/family-healthcare': {
    path: '/family-healthcare',
    title: 'Family Healthcare Support & Ecosystem | JetPulse',
    description: 'Centralized family health coordination: track appointments, medical records, companion visits, and vitals across cities in one secure timeline.',
    keywords: 'family healthcare support, family health management, elder care coordination, remote healthcare for parents, medical records family vault',
    h1: 'Connected Family Healthcare Support',
    intro: 'JetPulse connects families across distances with shared appointment scheduling, digital health record vaults, and real-time companion visit tracking.',
    category: 'service',
    priority: '0.8',
    changefreq: 'monthly',
    serviceType: 'Family Healthcare Coordination',
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Services', url: '/services' },
      { name: 'Family Healthcare', url: '/family-healthcare' },
    ],
    points: [
      'Dedicated profiles for parents, children, and dependent family members',
      'Remote booking of verified companions from any location worldwide',
      'Live GPS escort tracking and milestone notifications with consent',
      'Secure health records vault for prescriptions, lab tests, and summaries',
      'Medication schedule reminders and follow-up consultation alerts',
      'Multi-city family coordination across Bangalore, Varanasi, Jaipur, and more',
    ],
    faqs: [
      {
        question: 'How do family updates work during a companion visit?',
        answer: 'With patient consent, companions post timestamped progress updates (e.g., Picked up, OPD token received, Doctor consultation complete, Medicines collected) that family members can view in real time.',
      },
      {
        question: 'Can multiple family members access the dashboard?',
        answer: 'Yes. Family members can be invited to a shared family health circle with role-based viewing permissions.',
      },
    ],
    cta: 'Explore Family Health Support',
  },

  '/family-health-management': {
    path: '/family-health-management',
    title: 'Family Health Management & Care Timeline | JetPulse',
    description: 'Keep family appointments, medical documents, care journeys, and verified companion updates organized in one private, secure timeline.',
    keywords: 'family health management, care timeline, family medical vault, elder health tracking',
    h1: 'Family Health Management Platform',
    intro: 'Coordinate care for elderly parents and loved ones across cities with shared calendars, verified companions, and structured health timelines.',
    category: 'service',
    priority: '0.8',
    changefreq: 'monthly',
    serviceType: 'Family Health Management',
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Services', url: '/services' },
      { name: 'Family Health Management', url: '/family-health-management' },
    ],
    points: [
      'Centralized family health profiles',
      'Shared appointments and diagnostic test calendars',
      'Remote companion dispatch for loved ones',
      'Encrypted document vault for prescriptions and test reports',
      'Automated follow-up reminders',
    ],
    faqs: [
      {
        question: 'Is family health data private and secure?',
        answer: 'Yes. JetPulse adheres to strict privacy standards. Health records and journey updates are only accessible to authorized family members with explicit consent.',
      },
    ],
    cta: 'Organize Family Health',
  },

  '/care-navigator': {
    path: '/care-navigator',
    title: 'AI Care Navigator & Healthcare Discovery | JetPulse',
    description: 'Explore healthcare options, organize symptoms, scan prescriptions, and find nearby verified clinics and diagnostic centers with AI Care Navigator.',
    keywords: 'care navigator, AI healthcare navigator, healthcare discovery tool, symptom triage assistant, doctor finder, hospital search tool',
    h1: 'Intelligent AI Care Navigator',
    intro: 'Care Navigator helps organize symptoms, review lab reports, and discover verified hospitals, clinics, and specialists near you. An advisory navigation tool, not a clinical diagnostic replacement.',
    category: 'guide',
    priority: '0.8',
    changefreq: 'monthly',
    serviceType: 'Healthcare Navigation & Discovery Engine',
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Care Navigator', url: '/care-navigator' },
    ],
    points: [
      'Symptom description prompt for preliminary care pathway guidance',
      'Prescription and lab report scanner for structured information organization',
      'Search and filter verified hospitals, specialty clinics, and diagnostic labs',
      'Specialist specialty recommendations (Cardiology, Orthopedics, ENT, etc.)',
      'Map and list views with verified provider details and timings',
      'Direct link to book an escort companion for your chosen clinic or hospital',
    ],
    faqs: [
      {
        question: 'Is JetPulse Care Navigator a replacement for a doctor?',
        answer: 'No. Care Navigator is strictly an informational and organizational tool designed to help you navigate care choices. It does not provide medical diagnoses or prescribe treatment. Always consult a qualified physician for medical care.',
      },
      {
        question: 'What should I do in a medical emergency?',
        answer: 'If you or someone else is experiencing severe chest pain, difficulty breathing, loss of consciousness, heavy bleeding, or any acute emergency, immediately dial 112 / 108 or go directly to the nearest hospital emergency room.',
      },
    ],
    cta: 'Launch Care Navigator',
  },

  '/services': {
    path: '/services',
    title: 'Healthcare Assistance & Navigation Services | JetPulse',
    description: 'Explore all JetPulse non-clinical healthcare services: Companion Booking, Doctor Visit Assistance, Hospital Navigation, Diagnostics, and Family Ecosystem.',
    keywords: 'healthcare services, healthcare assistance services, medical companion services, hospital assistance directory, JetPulse services',
    h1: 'JetPulse Healthcare Services Directory',
    intro: 'Explore our complete suite of non-clinical healthcare escort, hospital navigation, diagnostic assistance, and family health management services.',
    category: 'directory',
    priority: '0.8',
    changefreq: 'monthly',
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Services', url: '/services' },
    ],
    points: [
      'Healthcare Companion: Personal human escort for clinic and hospital visits',
      'Doctor Visit Assistance: Token queues, file organization, notes, and pharmacy',
      'Diagnostic Test Assistance: Fast-tracked labs, imaging scans, and report delivery',
      'Hospital Visit Assistance: Registration, wheelchair mobility, and ward routing',
      'Post-Discharge Support: Transport home, recovery space setup, and supplies',
      'Family Health Ecosystem: Remote booking and live updates across cities',
      'AI Care Navigator: Advisory provider discovery and report scanner',
    ],
    faqs: [
      {
        question: 'How do I choose the right JetPulse service?',
        answer: 'If you need someone physically with you at a clinic or hospital, choose Healthcare Companion or Hospital Visit Assistance. If you are unsure where to seek care, explore Care Navigator.',
      },
      {
        question: 'Are all services available for instant and scheduled booking?',
        answer: 'Yes. You can schedule assistance days in advance or request urgent same-day companion dispatch depending on real-time companion availability in your city.',
      },
    ],
    cta: 'Book Any Service',
  },

  '/how-it-works': {
    path: '/how-it-works',
    title: 'How JetPulse Works | Step-by-Step Healthcare Assistance',
    description: 'Learn how JetPulse works in 4 simple steps: tell us what you need, choose your service, get matched with a verified companion, and track care in real time.',
    keywords: 'how jetpulse works, healthcare companion booking process, medical escort steps, how to book hospital companion',
    h1: 'How JetPulse Healthcare Assistance Works',
    intro: 'Four simple, transparent steps to arrange verified healthcare assistance for yourself or your family members whenever care is needed.',
    category: 'guide',
    priority: '0.8',
    changefreq: 'monthly',
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'How It Works', url: '/how-it-works' },
    ],
    points: [
      'Step 1: Tell us what you need — Describe appointment, test, or hospital visit',
      'Step 2: Choose how JetPulse helps — Book a verified companion or use Care Navigator',
      'Step 3: Get matched with clear pricing — Pair with a verified escort with upfront rates',
      'Step 4: Stay connected in real-time — Receive live GPS status, notes, and report summaries',
    ],
    faqs: [
      {
        question: 'How long before an appointment should I book a companion?',
        answer: 'You can book scheduled assistance up to 7 days in advance. Urgent same-day bookings can also be arranged with typical dispatch windows of 45-90 minutes subject to availability.',
      },
      {
        question: 'Is pricing transparent before confirming the booking?',
        answer: 'Yes. JetPulse provides upfront estimated pricing based on service duration, transport requirements, and assistance type before you confirm.',
      },
    ],
    cta: 'Start with JetPulse Today',
  },

  '/about': {
    path: '/about',
    title: 'About JetPulse | Mission, Values & Non-Clinical Healthcare Support',
    description: 'Learn about JetPulse, our mission to make healthcare journeys manageable, and our commitment to safe, non-clinical companion support.',
    keywords: 'about JetPulse, healthcare companion company, healthcare navigation mission, patient support India',
    h1: 'About JetPulse Healthcare',
    intro: 'JetPulse was founded on a simple realization: while medical science solves clinical problems, navigating the everyday logistics of healthcare remains stressful and lonely.',
    category: 'trust',
    priority: '0.7',
    changefreq: 'monthly',
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'About', url: '/about' },
    ],
    points: [
      'Empowering patients and families with reliable non-clinical healthcare companions',
      'Rigorous verification, background screening, and compassion training for escorts',
      'Transparent, consent-driven updates for family members living across cities',
      'Strict adherence to non-clinical boundaries: we support, doctors treat',
      'Building connected healthcare infrastructure for modern, mobile families',
    ],
    faqs: [
      {
        question: 'Is JetPulse a healthcare provider or a hospital?',
        answer: 'No. JetPulse is a healthcare technology and logistics platform providing non-clinical assistance, verified human companions, and navigation tools. We work alongside hospitals, clinics, and doctors to support patients through the care journey.',
      },
    ],
    cta: 'Experience JetPulse',
  },

  '/faq': {
    path: '/faq',
    title: 'Frequently Asked Questions (FAQ) | JetPulse Healthcare',
    description: 'Find answers to frequently asked questions about JetPulse healthcare companions, hospital visits, verification, pricing, safety, and emergency guidelines.',
    keywords: 'JetPulse FAQ, healthcare companion questions, hospital assistance FAQ, medical companion safety, companion verification FAQ',
    h1: 'Frequently Asked Questions',
    intro: 'Everything you need to know about JetPulse services, companion qualifications, booking procedures, safety standards, and service boundaries.',
    category: 'guide',
    priority: '0.8',
    changefreq: 'weekly',
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'FAQ', url: '/faq' },
    ],
    points: [
      'General Service & Companion Roles',
      'Booking, Scheduling & Cancellation Procedures',
      'Verification, Trust & Safety Standards',
      'Emergency Protocols & Clinical Boundaries',
      'Family Updates & Data Privacy',
    ],
    faqs: [
      {
        question: 'What is a JetPulse healthcare companion?',
        answer: 'A JetPulse healthcare companion is a trained, background-verified non-clinical escort who assists patients with logistical, physical, and administrative tasks during healthcare visits, such as mobility support, hospital navigation, registration, and family communication.',
      },
      {
        question: 'What can a JetPulse healthcare companion help with?',
        answer: 'Companions assist with doorstep pickup, clinic token management, organizing test requisitions, navigating hospital wards, wheelchair assistance, pharmacy medicine pickup, and sharing real-time status updates with family.',
      },
      {
        question: 'Is JetPulse a replacement for a doctor or nurse?',
        answer: 'No. JetPulse companions provide strictly non-clinical assistance. They do not administer medical treatments, diagnose conditions, or give medical advice. Clinical decisions remain solely with licensed medical professionals.',
      },
      {
        question: 'What should I do in a medical emergency?',
        answer: 'JetPulse is NOT an emergency response service. In case of acute medical emergencies, dial 112 / 108 or go directly to the nearest hospital casualty/emergency department.',
      },
      {
        question: 'How does JetPulse verify companions?',
        answer: 'Every companion undergoes government ID verification, background screening, behavioral interviews, and comprehensive training in patient escort etiquette, hospital layouts, and communication protocols.',
      },
      {
        question: 'Can my family receive updates during the appointment?',
        answer: 'Yes. With patient consent, authorized family members receive live timestamped updates and GPS milestones on their dashboard as the appointment progresses.',
      },
      {
        question: 'Can I book a companion for someone in another city?',
        answer: 'Yes. You can schedule companion services for parents or family members in supported cities (including Bangalore, Varanasi, and Jaipur) while residing anywhere in the world.',
      },
      {
        question: 'What are the payment and cancellation policies?',
        answer: 'JetPulse offers transparent upfront pricing with no hidden charges. You can cancel or reschedule bookings through your dashboard in accordance with our cancellation terms.',
      },
    ],
    cta: 'Have More Questions? Contact Support',
  },

  '/contact': {
    path: '/contact',
    title: 'Contact JetPulse | Customer Support & Assistance Inquiries',
    description: 'Get in touch with the JetPulse team for companion booking inquiries, support, partnerships, or assistance feedback. Available across India.',
    keywords: 'contact JetPulse, JetPulse support, healthcare companion contact, customer service JetPulse',
    h1: 'Contact JetPulse Healthcare Support',
    intro: 'Have questions about booking a companion, setting up family health tracking, or partner inquiries? Our support team is here to help.',
    category: 'trust',
    priority: '0.7',
    changefreq: 'monthly',
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Contact', url: '/contact' },
    ],
    points: [
      'Customer Support Email: support@jetpulse.in',
      'Assistance Inquiries: help@jetpulse.in',
      'Partner & Hospital Inquiries: partners@jetpulse.in',
      'Support Hours: Monday to Sunday, 7:00 AM – 10:00 PM IST',
      'Headquarters: Bangalore, Karnataka, India',
    ],
    faqs: [
      {
        question: 'How quickly does the support team respond?',
        answer: 'Support queries submitted via email or within the app are typically responded to within 1-2 hours during active support hours (7 AM – 10 PM IST).',
      },
      {
        question: 'Can I request custom hospital support for a surgery duration?',
        answer: 'Yes. Contact our support team with your surgery schedule and hospital details to arrange dedicated multi-day or customized companion packages.',
      },
    ],
    cta: 'Book Assistance Now',
  },

  '/help': {
    path: '/help',
    title: 'Help Center & Booking Guide | JetPulse',
    description: 'Find guides and helpful instructions on booking a companion, preparing for clinic visits, sharing family updates, and using Care Navigator.',
    keywords: 'JetPulse help center, companion booking guide, patient visit preparation, care navigator instructions',
    h1: 'JetPulse Help Center',
    intro: 'Find step-by-step guides, walkthroughs, and answers to ensure your healthcare visits and companion bookings run seamlessly.',
    category: 'guide',
    priority: '0.6',
    changefreq: 'monthly',
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Help Center', url: '/help' },
    ],
    points: [
      'How to book and schedule your first companion visit',
      'Preparing documents and prescriptions before your appointment',
      'Managing family health circle permissions and notification settings',
      'Using the AI Care Navigator prescription scanner and hospital search',
      'Understanding billing receipts and booking history',
    ],
    faqs: [
      {
        question: 'What documents should I prepare for my companion visit?',
        answer: 'Keep your doctor prescription, previous lab reports, government ID, and health insurance card (if applicable) organized in your file folder or uploaded to the JetPulse vault.',
      },
    ],
    cta: 'Get Assistance Now',
  },

  '/verification': {
    path: '/verification',
    title: 'Companion Verification & Safety Standards | JetPulse',
    description: 'Learn how JetPulse screens, verifies, and trains healthcare companions with government ID checks, background screening, and safety protocols.',
    keywords: 'companion verification, JetPulse safety standards, patient escort background check, verified healthcare escort',
    h1: 'Companion Verification & Trust Standards',
    intro: 'Your safety, comfort, and peace of mind are our highest priorities. Discover our comprehensive multi-step companion verification protocol.',
    category: 'trust',
    priority: '0.6',
    changefreq: 'monthly',
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Verification Standards', url: '/verification' },
    ],
    points: [
      'Government Identity Verification: Aadhaar and government document verification',
      'Background Screening: Criminal history checks and address verification',
      'Behavioral Evaluation: In-person empathy and patient communication assessments',
      'Healthcare Protocol Training: Hospital navigation, wheelchair mobility, and privacy training',
      'Continuous Rating System: Post-visit patient feedback and ongoing quality monitoring',
    ],
    faqs: [
      {
        question: 'Can I view my assigned companion’s profile before the visit?',
        answer: 'Yes. Once matched, you receive your companion’s photo, full name, verification badge, and contact details directly in your booking confirmation screen.',
      },
    ],
    cta: 'Book a Verified Companion',
  },

  '/privacy': {
    path: '/privacy',
    title: 'Privacy Policy | JetPulse Healthcare',
    description: 'Read the JetPulse privacy policy to understand how we collect, protect, and handle your personal and healthcare information with utmost security.',
    keywords: 'privacy policy, JetPulse data security, health data privacy, GDPR, patient data protection',
    h1: 'JetPulse Privacy Policy',
    intro: 'JetPulse is committed to the highest standards of data security and patient privacy. Learn how your information is handled with care and encryption.',
    category: 'trust',
    priority: '0.3',
    changefreq: 'yearly',
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Privacy Policy', url: '/privacy' },
    ],
    points: [
      'We collect only information necessary to coordinate companion bookings and navigation',
      'Health records and journey updates are encrypted both in transit and at rest',
      'We never sell, rent, or trade your personal or health data to third-party advertisers',
      'You maintain full control to delete your account and medical documents at any time',
      'Family sharing is strictly permission-based and requires patient or guardian consent',
    ],
  },

  '/terms': {
    path: '/terms',
    title: 'Terms of Service | JetPulse Healthcare',
    description: 'Review the JetPulse terms of service outlining user responsibilities, non-clinical service scope, booking terms, and safety policies.',
    keywords: 'terms of service, JetPulse terms, companion service agreement, user terms',
    h1: 'JetPulse Terms of Service',
    intro: 'These terms outline the rights, responsibilities, and guidelines for using the JetPulse platform and non-clinical companion services.',
    category: 'trust',
    priority: '0.3',
    changefreq: 'yearly',
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Terms of Service', url: '/terms' },
    ],
    points: [
      'Non-Clinical Scope: JetPulse companions provide logistical assistance and do not offer medical diagnosis or treatment',
      'Emergency Disclaimer: JetPulse is not an emergency medical service provider',
      'User Obligations: Providing accurate booking information and maintaining respectful conduct',
      'Payment & Cancellations: Clear schedule fees and cancellation guidelines',
      'Limitation of Liability: Transparent definitions of service boundaries and responsibilities',
    ],
  },

  '/accessibility': {
    path: '/accessibility',
    title: 'Accessibility Statement & Commitments | JetPulse',
    description: 'Learn about JetPulse commitments to digital and physical accessibility, screen reader support, keyboard navigation, and mobility assistance.',
    keywords: 'accessibility statement, JetPulse accessibility, WCAG compliance, healthcare mobility assistance',
    h1: 'Accessibility Commitment',
    intro: 'JetPulse is dedicated to ensuring that healthcare assistance is accessible to all individuals, including those with diverse mobility, sensory, and cognitive needs.',
    category: 'trust',
    priority: '0.3',
    changefreq: 'yearly',
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Accessibility', url: '/accessibility' },
    ],
    points: [
      'Digital Accessibility: High color contrast, scalable typography, and keyboard accessibility',
      'Screen Reader Friendly: Semantic HTML tags, aria labels, and structured headings',
      'Physical Mobility Escorts: Companions trained in wheelchair transfers and mobility navigation',
      'Assistance for Elders: Simplified interfaces and phone/family booking support',
      'Continuous Feedback: We actively welcome user suggestions to improve accessibility',
    ],
  },

  // City Pages
  '/cities/bangalore': {
    path: '/cities/bangalore',
    title: 'Healthcare Companion Services in Bangalore | JetPulse',
    description: 'Book verified healthcare companions in Bangalore for visits to Manipal Hospital, Apollo, Fortis, Narayana Health, diagnostic labs, and clinic consultations.',
    keywords: 'healthcare companion Bangalore, hospital companion Bangalore, doctor visit assistance Bangalore, medical escort Bangalore, elder care Bangalore',
    h1: 'Healthcare Companion Services in Bangalore',
    intro: 'JetPulse provides verified healthcare companions across Bangalore—from Koramangala and Indiranagar to Whitefield, HSR Layout, and Jayanagar.',
    category: 'location',
    priority: '0.7',
    changefreq: 'monthly',
    serviceType: 'Healthcare Companion Services in Bangalore',
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Cities', url: '/services' },
      { name: 'Bangalore', url: '/cities/bangalore' },
    ],
    points: [
      'Accompaniment to major hospital networks (Apollo, Manipal, Fortis, Narayana Health, Aster)',
      'Assistance at diagnostic hubs across Bangalore (Anand Diagnostic, Neuberg, Medall)',
      'Doorstep pickup and return transport handling Bangalore traffic logistics',
      'Real-time updates sent to family members living in other cities or abroad',
      'Available for scheduled appointments and urgent same-day bookings',
    ],
    faqs: [
      {
        question: 'Which areas in Bangalore does JetPulse serve?',
        answer: 'JetPulse covers major Bangalore zones including Koramangala, Indiranagar, HSR Layout, Whitefield, Jayanagar, Malleshwaram, Electronic City, and Hebbal.',
      },
      {
        question: 'Can a companion accompany my elderly parent to Manipal or Apollo Hospital?',
        answer: 'Yes. Our Bangalore companions are familiar with major hospital campuses (Manipal Old Airport Rd, Apollo Bannerghatta, Fortis Cunningham, etc.) and handle OPD queues and wheelchair mobility smoothly.',
      },
    ],
    cta: 'Book Companion in Bangalore',
  },

  '/cities/varanasi': {
    path: '/cities/varanasi',
    title: 'Healthcare Companion Services in Varanasi | JetPulse',
    description: 'Book verified healthcare companions in Varanasi for doctor visits, BHU Sir Sunderlal Hospital, Heritage, Apex, and diagnostic lab appointments.',
    keywords: 'healthcare companion Varanasi, hospital companion Varanasi, doctor visit assistance Varanasi, BHU hospital escort Varanasi, medical assistance Varanasi',
    h1: 'Healthcare Companion Services in Varanasi',
    intro: 'JetPulse provides compassionate, verified healthcare companions in Varanasi to assist elderly parents and patients with clinic visits, tests, and hospital care.',
    category: 'location',
    priority: '0.7',
    changefreq: 'monthly',
    serviceType: 'Healthcare Companion Services in Varanasi',
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Cities', url: '/services' },
      { name: 'Varanasi', url: '/cities/varanasi' },
    ],
    points: [
      'Escort to premier healthcare centers in Varanasi (BHU IMS / Sir Sunderlal Hospital, Heritage, Apex)',
      'Diagnostic test support at local pathology centers and imaging labs',
      'Doorstep pickup and safe accompaniment through busy Varanasi hospital complexes',
      'Remote booking for NRI and out-of-city children caring for elderly parents in Varanasi',
      'Live milestone updates and prescription notes uploaded to family timelines',
    ],
    faqs: [
      {
        question: 'Can I book a Varanasi companion for my parents while I am working in Bangalore/Delhi?',
        answer: 'Yes. Many of our users work outside Varanasi and use JetPulse to ensure their parents have dedicated, caring accompaniment during hospital check-ups.',
      },
      {
        question: 'Does the companion assist with BHU Hospital OPD tokens and queues?',
        answer: 'Yes. BHU hospital complexes can be vast and busy; our companions help navigate registration desks, counter queues, and doctor consultation rooms.',
      },
    ],
    cta: 'Book Companion in Varanasi',
  },

  '/cities/jaipur': {
    path: '/cities/jaipur',
    title: 'Healthcare Companion Services in Jaipur | JetPulse',
    description: 'Book verified healthcare companions in Jaipur for SMS Hospital, Fortis, Eternal Heart Care, Manipal Jaipur, and diagnostic appointments.',
    keywords: 'healthcare companion Jaipur, hospital companion Jaipur, doctor visit assistance Jaipur, medical escort Jaipur, elder care Jaipur',
    h1: 'Healthcare Companion Services in Jaipur',
    intro: 'JetPulse provides verified healthcare escorts in Jaipur—assisting patients and families across Malviya Nagar, Vaishali Nagar, Mansarovar, C-Scheme, and Raja Park.',
    category: 'location',
    priority: '0.7',
    changefreq: 'monthly',
    serviceType: 'Healthcare Companion Services in Jaipur',
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Cities', url: '/services' },
      { name: 'Jaipur', url: '/cities/jaipur' },
    ],
    points: [
      'Accompaniment to SMS Hospital, Fortis Escorts Jaipur, Eternal Hospital (EHCC), Manipal Jaipur',
      'Diagnostic lab and scan coordination across diagnostic networks in Jaipur',
      'Doorstep pickup, car escort, wheelchair coordination, and safe return home',
      'Real-time updates with timestamps and prescription debriefs for families',
      'Scheduled consultations and same-day companion matching',
    ],
    faqs: [
      {
        question: 'Which hospitals in Jaipur do JetPulse companions assist at?',
        answer: 'Companions assist at all major medical centers across Jaipur including Fortis Escorts, SMS Hospital, Eternal Hospital (EHCC), Manipal Jaipur, Apex, and private specialty clinics.',
      },
      {
        question: 'Can a Jaipur companion pick up medicines after the consultation?',
        answer: 'Yes, companions can assist with pharmacy visits, collect prescribed medicines and bills, and deliver them safely to the patient’s home.',
      },
    ],
    cta: 'Book Companion in Jaipur',
  },
};

/**
 * Generate complete JSON-LD Structured Data for any page
 */
export function generatePageSchema(page) {
  const canonicalUrl = `${SITE_URL}${page.path === '/' ? '' : page.path}`;
  const graph = [ORGANIZATION_SCHEMA, WEBSITE_SCHEMA];

  // BreadcrumbList Schema
  if (page.breadcrumbs && page.breadcrumbs.length > 0) {
    graph.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      '@id': `${canonicalUrl}#breadcrumbs`,
      itemListElement: page.breadcrumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: `${SITE_URL}${crumb.url === '/' ? '' : crumb.url}`,
      })),
    });
  }

  // WebPage Schema
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': page.category === 'trust' ? 'AboutPage' : 'WebPage',
    '@id': `${canonicalUrl}#webpage`,
    url: canonicalUrl,
    name: page.title,
    description: page.description,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#organization` },
    inLanguage: 'en-US',
  };
  graph.push(webPageSchema);

  // Service Schema
  if (page.serviceType) {
    const serviceSchema = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': `${canonicalUrl}#service`,
      name: page.h1,
      serviceType: page.serviceType,
      description: page.description,
      provider: { '@id': `${SITE_URL}/#organization` },
      url: canonicalUrl,
      termsOfService: `${SITE_URL}/terms`,
      areaServed: page.path.startsWith('/cities/')
        ? page.h1.replace('Healthcare Companion Services in ', '').trim()
        : 'India',
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Healthcare Logistical & Companion Support',
        itemListElement: (page.points || []).map((point, index) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: point,
          },
        })),
      },
    };
    graph.push(serviceSchema);
  }

  // FAQPage Schema (only if visible FAQs exist!)
  if (page.faqs && page.faqs.length > 0) {
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': `${canonicalUrl}#faq`,
      mainEntity: page.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    };
    graph.push(faqSchema);
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}

export function isPublicSeoPath(pathname) {
  const normalized = pathname.replace(/\/$/, '') || '/';
  return Boolean(SEO_PAGES[normalized] && normalized !== '/');
}

export function isPrivatePath(pathname) {
  const normalized = pathname.replace(/\/$/, '') || '/';
  return NOINDEX_ROUTES.some((route) => normalized === route || normalized.startsWith(`${route}/`));
}
