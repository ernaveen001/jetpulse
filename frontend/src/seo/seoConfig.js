/**
 * JetPulse SEO Configuration & Keyword Mapping Architecture
 * Centralized, maintainable metadata registry for all public & private routes.
 */

export const SITE_URL = 'https://www.jetpulse.in';
export const SITE_NAME = 'JetPulse';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

export const SEO_ROUTES = {
  // ── CORE HOMEPAGE ──────────────────────────────────────────
  '/': {
    isIndexable: true,
    category: 'Home',
    primaryKeyword: 'healthcare companion',
    secondaryKeywords: ['healthcare assistance', 'medical companion', 'hospital escort India'],
    title: 'JetPulse | Verified Healthcare Companions & AI Care Navigation',
    description: 'Book verified healthcare companions for doctor visits, hospital OPD navigation, lab tests, and post-discharge care. AI Care Navigator & family health ecosystem across India.',
    heading: 'Healthcare Companion Services for Easier Healthcare Journeys',
    intro: 'JetPulse is an intelligent healthcare platform connecting patients and families with verified human companions, AI care navigation, and unified family health tracking.',
    canonical: `${SITE_URL}/`,
  },

  // ── CORE SERVICES ──────────────────────────────────────────
  '/healthcare-companion': {
    isIndexable: true,
    category: 'Services',
    primaryKeyword: 'healthcare companion service',
    secondaryKeywords: ['medical companion', 'doctor visit escort', 'patient companion India'],
    title: 'Healthcare Companion Services in India | JetPulse',
    description: 'Book verified healthcare companions for doctor visits, clinic appointments, diagnostics, and elderly patient escorts across India.',
    heading: 'Verified Healthcare Companions for Doctor & Clinic Visits',
    intro: 'JetPulse pairs patients and families with background-verified, trained healthcare companions who provide doorstep pickup, OPD registration help, token queue management, and real-time family updates.',
    points: [
      'Doorstep pickup and comfortable clinic / hospital transit',
      'Doctor appointment registration and token queue management',
      'Diagnostic test and lab sample collection assistance',
      'Prescription collection and doctor instructions notes',
      'Live milestone updates and notes shared with family members'
    ],
    faqs: [
      { q: 'Who are JetPulse healthcare companions?', a: 'Our companions are background-verified, compassionate professionals trained in healthcare logistics, elderly mobility assistance, and patient communication.' },
      { q: 'Can I book a companion for my elderly parents?', a: 'Yes! You can book remotely for parents or relatives living in another city, tracking their entire appointment from your phone.' },
      { q: 'How far in advance do I need to book?', a: 'We offer instant dispatch (subject to city availability within 30-45 minutes) as well as advance scheduled bookings.' }
    ],
    cta: 'Book a Healthcare Companion',
    canonical: `${SITE_URL}/healthcare-companion`
  },

  '/doctor-visit-assistance': {
    isIndexable: true,
    category: 'Services',
    primaryKeyword: 'doctor visit assistance',
    secondaryKeywords: ['medical appointment assistance', 'clinic escort', 'doctor consultation companion'],
    title: 'Doctor Visit Assistance & Clinic Escort Services | JetPulse',
    description: 'Get dedicated assistance for doctor and clinic appointments. Registration, token queue management, consultation note-taking, and doorstep transit.',
    heading: 'Doctor Visit Assistance & Outpatient Clinic Support',
    intro: 'Navigating busy outpatient clinics alone can be stressful. A JetPulse companion escorts you from your doorstep, manages token lines, assists with paperwork, and helps you stay organized throughout the consult.',
    points: [
      'Doorstep pickup and return escort for doctor appointments',
      'OPD desk check-in, token retrieval, and queue monitoring',
      'Accompanying inside consultation chamber upon patient request',
      'Prescription collection and pharmacy bill settlement assistance',
      'Synchronized appointment notes shared with designated family members'
    ],
    faqs: [
      { q: 'Can the companion enter the doctor’s room with the patient?', a: 'Yes, if requested by the patient or authorized family members to assist with notes, translation, or mobility.' },
      { q: 'What happens if the doctor is running late?', a: 'Our companions remain by your side throughout the waiting period. Booking extensions can be managed seamlessly via the app.' }
    ],
    cta: 'Book Doctor Visit Assistance',
    canonical: `${SITE_URL}/doctor-visit-assistance`
  },

  '/hospital-navigation': {
    isIndexable: true,
    category: 'Services',
    primaryKeyword: 'hospital visit assistance',
    secondaryKeywords: ['hospital companion', 'OPD navigation', 'hospital admission paperwork help'],
    title: 'Hospital OPD & Inpatient Navigation Assistance | JetPulse',
    description: 'Expert assistance navigating hospital OPDs, registration counters, insurance desks, diagnostic labs, and ward admissions.',
    heading: 'Hospital Navigation & OPD Visit Assistance',
    intro: 'Large tertiary hospitals can be overwhelming. JetPulse companions guide you smoothly through registration counters, token lines, multi-floor clinic departments, pharmacy queues, and TPA insurance documentation.',
    points: [
      'OPD desk registration and department guidance',
      'Wheelchair arrangement and mobility escort across floors',
      'TPA health insurance pre-authorization and billing paperwork help',
      'Coordination between consultation chambers and diagnostic labs',
      'Real-time status updates sent to remote family members'
    ],
    faqs: [
      { q: 'Will the companion help with wheelchair mobility?', a: 'Yes, our companions assist with wheelchair requests, elevator transfers, and safe mobility throughout hospital premises.' },
      { q: 'Does JetPulse assist with admission and discharge formalities?', a: 'Yes, companions help organize required ID documents, insurance claim forms, and discharge medicine collection.' }
    ],
    cta: 'Get Hospital Navigation Help',
    canonical: `${SITE_URL}/hospital-navigation`
  },

  '/hospital-visit-assistance': {
    isIndexable: true,
    category: 'Services',
    primaryKeyword: 'hospital visit assistance',
    secondaryKeywords: ['hospital escort', 'hospital patient navigation', 'inpatient assistance'],
    title: 'Hospital Visit Assistance & Patient Navigation | JetPulse',
    description: 'Comprehensive hospital visit assistance for outpatient clinics, diagnostic departments, and inpatient admissions across major Indian hospitals.',
    heading: 'Hospital Visit Assistance & Patient Escort',
    intro: 'From navigating complex hospital corridors to handling administrative registration and insurance counters, JetPulse provides hands-on practical assistance for all hospital visits.',
    points: [
      'Assistance at registration, billing, and pharmacy counters',
      'Departmental navigation across multi-building hospital campuses',
      'Wheelchair transfer and elevator mobility coordination',
      'Assistance with TPA insurance desk submissions',
      'Live milestone updates for family members'
    ],
    faqs: [
      { q: 'Which hospitals can companions assist at?', a: 'Companions assist at all major private, public, and government healthcare facilities across our active service cities.' }
    ],
    cta: 'Arrange Hospital Visit Assistance',
    canonical: `${SITE_URL}/hospital-visit-assistance`
  },

  '/diagnostic-test-assistance': {
    isIndexable: true,
    category: 'Services',
    primaryKeyword: 'diagnostic test assistance',
    secondaryKeywords: ['lab test assistance', 'MRI scan escort', 'blood test assistance', 'pathology support'],
    title: 'Diagnostic Test & Scan Assistance | MRI, CT, Blood Tests | JetPulse',
    description: 'Get practical support organizing and attending diagnostic appointments including MRI, CT scans, blood panels, ultrasound, and pathology tests.',
    heading: 'Diagnostic Test & Lab Visit Assistance',
    intro: 'Undergoing complex tests like contrast MRIs, PET scans, or multiple fasting blood panels is physically demanding. JetPulse companions organize paperwork, assist with wait times, and collect reports.',
    points: [
      'Fasting blood collection and pathology lab visit escorts',
      'MRI, CT scan, X-Ray, and ultrasound navigation',
      'Prior medical records and doctor prescription organization',
      'Wheelchair and physical support during waiting periods',
      'Physical report collection and digital family vault upload'
    ],
    faqs: [
      { q: 'Can the companion pick up physical test reports?', a: 'Yes, companions can collect printed reports and films, and upload digital scans directly to your JetPulse Family Health Vault.' }
    ],
    cta: 'Arrange Diagnostic Assistance',
    canonical: `${SITE_URL}/diagnostic-test-assistance`
  },

  '/post-discharge-care': {
    isIndexable: true,
    category: 'Services',
    primaryKeyword: 'post discharge support',
    secondaryKeywords: ['post hospital discharge care', 'hospital to home transition', 'recovery assistance'],
    title: 'Post-Discharge Hospital Support & Safe Home Transit | JetPulse',
    description: 'Safe non-clinical post-hospitalization support including discharge paperwork, doorstep escort home, prescription collection, and recovery setup.',
    heading: 'Post-Discharge Hospital Support & Home Transition',
    intro: 'Leaving the hospital requires careful logistical coordination. JetPulse provides non-clinical post-discharge assistance to help patients transition safely from hospital bed to home.',
    points: [
      'Discharge counter coordination and pharmacy medication pickup',
      'Safe, assisted wheelchair-to-vehicle transport to doorstep',
      'Discharge summary document collation and digital storage',
      'Basic home recovery room setup and vital check reminders',
      'Immediate milestone updates to family members across cities'
    ],
    faqs: [
      { q: 'Is post-discharge support clinical or non-clinical?', a: 'JetPulse provides non-clinical mobility, transport escort, document handling, and logistics assistance. For medical nursing care, we coordinate with your hospital team.' }
    ],
    cta: 'Arrange Post-Discharge Support',
    canonical: `${SITE_URL}/post-discharge-care`
  },

  '/care-navigator': {
    isIndexable: true,
    category: 'Services',
    primaryKeyword: 'healthcare navigation',
    secondaryKeywords: ['AI care navigator', 'specialist discovery', 'doctor recommendation tool'],
    title: 'AI Care Navigator & Doctor Specialist Discovery | JetPulse',
    description: 'Use JetPulse AI Care Navigator to triage symptoms, understand diagnostic reports, and find recommended specialists and verified hospitals near you.',
    heading: 'AI Care Navigator: Guidance When Healthcare Feels Complex',
    intro: 'When unexpected symptoms occur or doctor reports seem complicated, Care Navigator AI clarifies your options, recommends appropriate specialist disciplines, and locates verified clinics near you.',
    points: [
      'Conversational symptom guidance and medical specialty recommendation',
      'Lab report and prescription document scanner for simplified summaries',
      'Verified hospital and diagnostic clinic discovery by location',
      'Seamless 1-click booking of companion assistance for recommended visits',
      'Zero advertising bias in specialist recommendations'
    ],
    faqs: [
      { q: 'Does Care Navigator provide medical diagnoses?', a: 'No. Care Navigator is an advisory and educational tool designed to help you understand options and navigate to qualified healthcare providers.' }
    ],
    cta: 'Explore Care Navigator AI',
    canonical: `${SITE_URL}/care-navigator`
  },

  '/family-healthcare': {
    isIndexable: true,
    category: 'Services',
    primaryKeyword: 'family healthcare support',
    secondaryKeywords: ['family care coordination', 'remote healthcare management', 'elderly healthcare assistance'],
    title: 'Family Healthcare Support & Remote Coordination | JetPulse',
    description: 'Coordinate family healthcare appointments, doctor visits, diagnostic records, and companion updates across multiple cities.',
    heading: 'Family Healthcare Support & Cross-City Care Coordination',
    intro: 'Keep your entire family connected around health. Book companions for parents in another city, view live visit milestones, and organize all medical records in one synchronized private hub.',
    points: [
      'Individual health timelines for parents, spouse, and children',
      'Remote booking with real-time GPS & milestone tracking',
      'Secure digital medical records and prescription vault',
      'Multi-city family coordination with granular consent controls',
      'Instant post-visit summary logs sent via app & WhatsApp'
    ],
    faqs: [
      { q: 'How do family members receive updates during a visit?', a: 'Authorized family members receive real-time notifications, arrival milestones, and doctor instructions via the JetPulse app and WhatsApp.' }
    ],
    cta: 'Explore Family Healthcare',
    canonical: `${SITE_URL}/family-healthcare`
  },

  '/family-health-management': {
    isIndexable: true,
    category: 'Services',
    primaryKeyword: 'family healthcare support',
    secondaryKeywords: ['family health timeline', 'digital medical records', 'family healthcare dashboard'],
    title: 'Family Health Ecosystem & Centralized Care Hub | JetPulse',
    description: 'Coordinate appointments, prescriptions, diagnostic reports, and companion updates for your entire family in one synchronized timeline.',
    heading: 'Connected Family Health Ecosystem',
    intro: 'Manage the healthcare journeys of parents, children, and spouses across different cities with a single private family health timeline.',
    points: [
      'Individual health profiles for parents, children, and spouse',
      'Unified family calendar for upcoming appointments and diagnostics',
      'Centralized digital medical records and report repository',
      'One-click remote companion booking for family in other cities',
      'Consent-based granular privacy controls for each family member'
    ],
    faqs: [
      { q: 'Can siblings in different countries access our parents’ health updates?', a: 'Yes. Multiple authorized family members can log in, view live companion updates, review uploaded reports, and coordinate care.' }
    ],
    cta: 'Open Family Health Hub',
    canonical: `${SITE_URL}/family-health-management`
  },

  '/elderly-care-companion': {
    isIndexable: true,
    category: 'Services',
    primaryKeyword: 'elderly healthcare assistance',
    secondaryKeywords: ['elderly hospital assistance', 'healthcare assistance for parents', 'senior medical escort'],
    title: 'Elderly Care Healthcare Companion Services | JetPulse',
    description: 'Dedicated healthcare companions for senior citizens. Gentle mobility assistance, doctor visit accompaniment, and patient listening.',
    heading: 'Elderly Care Companion & Senior Clinic Escort',
    intro: 'Senior family members often face fatigue, anxiety, and mobility hurdles at busy medical centers. JetPulse companions offer respectful, patient accompaniment for every medical visit.',
    points: [
      'Doorstep assistance and arm-support or wheelchair mobility',
      'Patient note-taking during consultations with the doctor',
      'Assistance with medicine purchasing and dosing instruction clarity',
      'Comfortable transit with safe return back home',
      'Comprehensive visit summary sent immediately to children/caregivers'
    ],
    faqs: [
      { q: 'Are companions trained to handle senior patients with mobility challenges?', a: 'Yes, our companions are trained in safe walking assistance, wheelchair operation, and empathetic communication for geriatric care.' }
    ],
    cta: 'Book Senior Healthcare Companion',
    canonical: `${SITE_URL}/elderly-care-companion`
  },

  '/bedside-assistance': {
    isIndexable: true,
    category: 'Services',
    primaryKeyword: 'bedside assistance',
    secondaryKeywords: ['day care procedure companion', 'in-hospital bedside support', 'dialysis companion'],
    title: 'Bedside Non-Clinical Hospital Assistance | JetPulse',
    description: 'In-hospital non-clinical bedside support for outpatients, day-care procedures, and diagnostic recovery.',
    heading: 'Bedside & Day-Care Procedure Assistance',
    intro: 'For minor day procedures, chemotherapy sessions, dialysis, or day-care surgeries where a loved one cannot take the day off work, JetPulse provides attentive bedside non-clinical support.',
    points: [
      'Attentive presence throughout day-care admission and recovery',
      'Liaising with hospital administration for food, water, and billing',
      'Ensuring comfort and relaying nurse calls when needed',
      'Prescription and medicine delivery to bedside',
      'Continuous status updates sent to designated family members'
    ],
    faqs: [
      { q: 'Can a companion stay for long procedures like dialysis or chemo?', a: 'Yes, companion packages can be booked for hourly blocks (3 hrs, 6 hrs, or full day) depending on procedure duration.' }
    ],
    cta: 'Book Bedside Assistance',
    canonical: `${SITE_URL}/bedside-assistance`
  },

  '/how-it-works': {
    isIndexable: true,
    category: 'Services',
    primaryKeyword: 'how JetPulse works',
    secondaryKeywords: ['healthcare companion booking process', 'companion dispatch steps'],
    title: 'How JetPulse Works | 4 Simple Steps to Care Assistance',
    description: 'Learn how JetPulse works: Tell us your healthcare need, choose a verified companion or AI Care Navigator, and get real-time family updates.',
    heading: 'How JetPulse Works: 4 Simple Steps',
    intro: 'Booking reliable healthcare assistance takes just a few clicks. From request to safe return home, JetPulse keeps you and your family supported every step of the way.',
    points: [
      'Step 1: Tell us what you need (doctor visit, lab test, hospital navigation)',
      'Step 2: Select a verified companion or use Care Navigator AI',
      'Step 3: Companion arrives at doorstep or healthcare center',
      'Step 4: Receive real-time milestones and consultation summaries'
    ],
    faqs: [
      { q: 'Can I book for someone else?', a: 'Yes, you can easily enter your parent or loved one’s address as pickup and manage the booking from your own device.' }
    ],
    cta: 'Get Assistance Now',
    canonical: `${SITE_URL}/how-it-works`
  },

  // ── LOCAL INDIAN CITIES (LOCAL SEO) ─────────────────────────
  '/cities/bangalore': {
    isIndexable: true,
    category: 'Cities',
    primaryKeyword: 'healthcare companion Bangalore',
    secondaryKeywords: ['hospital escort Bangalore', 'Manipal Apollo companion Bangalore'],
    title: 'Healthcare Companion Services in Bangalore | JetPulse',
    description: 'Verified healthcare companion services in Bangalore. Hospital escorts, OPD navigation at Manipal, Apollo, Aster, and lab visits across Bangalore.',
    heading: 'Healthcare Companion & Hospital Escort Services in Bangalore',
    intro: 'Serving Koramangala, Indiranagar, Whitefield, HSR Layout, Jayanagar, Electronic City, and across Bengaluru. Get verified companions for visits to Apollo, Manipal, Fortis, Aster, and top diagnostic labs.',
    points: [
      'Rapid companion dispatch across East, South, and North Bangalore',
      'Coverage for major hospitals (Manipal, Apollo, Fortis, Narayana Health)',
      'Diagnostic visits to Anand Diagnostic, Metropolis, Dr. Lal PathLabs',
      'Doorstep pickup and return across Bengaluru metro areas',
      'Live GPS updates and reports shared with family'
    ],
    faqs: [
      { q: 'Which areas in Bangalore are covered?', a: 'We cover Koramangala, Indiranagar, HSR, Whitefield, JP Nagar, Jayanagar, Malleshwaram, Hebbal, Electronic City, and surrounding Bengaluru areas.' }
    ],
    cta: 'Book Companion in Bangalore',
    canonical: `${SITE_URL}/cities/bangalore`
  },

  '/cities/varanasi': {
    isIndexable: true,
    category: 'Cities',
    primaryKeyword: 'healthcare companion Varanasi',
    secondaryKeywords: ['BHU hospital assistance', 'Apollo Spectra companion Varanasi'],
    title: 'Healthcare Companion Services in Varanasi | JetPulse',
    description: 'Healthcare companions in Varanasi for BHU Sir Sunderlal Hospital, Apollo Spectra, Heritage, and diagnostic visits.',
    heading: 'Healthcare Companion & Hospital Escort Services in Varanasi',
    intro: 'Empowering Varanasi residents and remote family members with verified, local companions. We assist with visits to IMS-BHU, Apollo Spectra, Heritage Hospitals, and local clinics.',
    points: [
      'Doorstep escort across Lanka, Sigra, Bhelupur, Cantt, and Mahmoorganj',
      'OPD queue navigation at IMS BHU Sir Sunderlal Hospital',
      'Support at Apollo Spectra, Popular Hospital, and Apex Hospital',
      'Remote booking from Bangalore, Mumbai, or overseas for parents in Varanasi',
      'Detailed Hindi and English visit notes sent to family'
    ],
    faqs: [
      { q: 'Can I book for my parents in Varanasi while living in Bangalore?', a: 'Yes! Remote family booking for Varanasi is one of our most popular services. You receive live updates on WhatsApp and the JetPulse app.' }
    ],
    cta: 'Book Companion in Varanasi',
    canonical: `${SITE_URL}/cities/varanasi`
  },

  '/cities/jaipur': {
    isIndexable: true,
    category: 'Cities',
    primaryKeyword: 'healthcare companion Jaipur',
    secondaryKeywords: ['SMS Hospital escort Jaipur', 'Fortis Manipal companion Jaipur'],
    title: 'Healthcare Companion Services in Jaipur | JetPulse',
    description: 'Verified healthcare companions in Jaipur for SMS Hospital, Fortis, Eternal Heart, Manipal Hospital, and diagnostic centers.',
    heading: 'Healthcare Companion & Hospital Escort Services in Jaipur',
    intro: 'Providing compassionate healthcare navigation across Jaipur including Malviya Nagar, Vaishali Nagar, Mansarovar, C-Scheme, and Tonk Road. Assistance at SMS Hospital, Fortis Escorts, and EHCC.',
    points: [
      'Prompt companion support across Jaipur urban and suburban zones',
      'Assistance at SMS Hospital, Fortis, Manipal, and Eternal Hospital',
      'Diagnostic visit coordination at SRL, Metropolis, and local scan centers',
      'Senior citizen escort for routine checkups and follow-up care',
      'Family dashboard integration with instant visit logs'
    ],
    faqs: [
      { q: 'Do you cover SMS Hospital and private hospitals in Jaipur?', a: 'Yes, companions assist at both government institutions like SMS Hospital and private tertiary hospitals like Fortis and Manipal.' }
    ],
    cta: 'Book Companion in Jaipur',
    canonical: `${SITE_URL}/cities/jaipur`
  },

  '/cities/delhi-ncr': {
    isIndexable: true,
    category: 'Cities',
    primaryKeyword: 'healthcare companion Delhi NCR',
    secondaryKeywords: ['AIIMS escort Delhi', 'Medanta Gurgaon companion', 'Max hospital escort'],
    title: 'Healthcare Companion Services in Delhi NCR | JetPulse',
    description: 'Healthcare companions across New Delhi, Gurgaon, and Noida. Hospital OPD navigation at AIIMS, Max Healthcare, Fortis, Medanta, and Apollo.',
    heading: 'Healthcare Companion & Hospital Navigation in Delhi NCR',
    intro: 'Navigating healthcare across Delhi, Gurugram, and Noida is made stress-free with JetPulse. Verified escorts for AIIMS, Max Super Speciality, Fortis Memorial, Medanta The Medicity, and Apollo Hospitals.',
    points: [
      'Coverage across Delhi, Gurgaon (Gurugram), and Noida / Greater Noida',
      'Assistance at AIIMS, Medanta, Max Healthcare, Fortis, and Apollo',
      'Diagnostic assistance at Dr Lal PathLabs, Mahajan Imaging, and Metropolis',
      'Doorstep transit assistance and wheelchair escort',
      'Instant digital receipts, doctor notes, and family coordination'
    ],
    faqs: [
      { q: 'How do companions navigate large NCR hospital campuses?', a: 'Our Delhi NCR companions are trained with campus layouts of major hospitals like Medanta, AIIMS, and Max to minimize patient fatigue.' }
    ],
    cta: 'Book Companion in Delhi NCR',
    canonical: `${SITE_URL}/cities/delhi-ncr`
  },

  '/cities/mumbai': {
    isIndexable: true,
    category: 'Cities',
    primaryKeyword: 'healthcare companion Mumbai',
    secondaryKeywords: ['Lilavati hospital escort', 'Tata Memorial companion Mumbai'],
    title: 'Healthcare Companion Services in Mumbai | JetPulse',
    description: 'Verified healthcare companions in Mumbai for Lilavati, Kokilaben, Tata Memorial, Hinduja, and Breach Candy hospitals.',
    heading: 'Healthcare Companion & Hospital Escort Services in Mumbai',
    intro: 'Seamless healthcare support across South Mumbai, Western Suburbs, and Central Mumbai. Practical assistance at Lilavati, Kokilaben Dhirubhai Ambani, Hinduja, and Tata Memorial Hospital.',
    points: [
      'Service across Mumbai suburbs and South Mumbai',
      'Expert assistance with OPD tokens, paperwork, and multi-department visits',
      'Support for cancer therapy visits, dialysis, and routine specialist consults',
      'Doorstep pickup, cab escort, and safe return home',
      'Synchronized family updates for working professionals'
    ],
    faqs: [
      { q: 'Do you assist with specialized cancer or dialysis appointments in Mumbai?', a: 'Yes, our companions frequently support patients attending recurring day-care procedures and diagnostic checkups.' }
    ],
    cta: 'Book Companion in Mumbai',
    canonical: `${SITE_URL}/cities/mumbai`
  },

  '/cities/hyderabad': {
    isIndexable: true,
    category: 'Cities',
    primaryKeyword: 'healthcare companion Hyderabad',
    secondaryKeywords: ['Apollo Jubilee Hills escort', 'KIMS Yashoda companion Hyderabad'],
    title: 'Healthcare Companion Services in Hyderabad | JetPulse',
    description: 'Healthcare companions in Hyderabad for Apollo Jubilee Hills, Yashoda, KIMS, Care Hospitals, and diagnostic clinics.',
    heading: 'Healthcare Companion & Hospital Escort Services in Hyderabad',
    intro: 'Compassionate healthcare assistance across Jubilee Hills, Banjara Hills, Gachibowli, Hitec City, Secunderabad, and Kukatpally for top healthcare centers and labs.',
    points: [
      'Coverage across Hyderabad and Secunderabad',
      'Assistance at Apollo Hospitals Jubilee Hills, Yashoda, KIMS, and AIG Hospitals',
      'Diagnostics and scan escorts at Vijaya Diagnostics and Lucid Medical',
      'Comfortable doorstep transport and patient queue navigation',
      'Real-time status updates for family in India and NRI relatives abroad'
    ],
    faqs: [
      { q: 'Can Telugu and English speaking companions be requested?', a: 'Yes, companion language preferences (Telugu, Hindi, English) can be specified during booking.' }
    ],
    cta: 'Book Companion in Hyderabad',
    canonical: `${SITE_URL}/cities/hyderabad`
  },

  // ── TRUST, COMPANY & SUPPORT ────────────────────────────────
  '/about': {
    isIndexable: true,
    category: 'Company',
    primaryKeyword: 'about JetPulse',
    secondaryKeywords: ['healthcare navigation company', 'patient assistance platform'],
    title: 'About JetPulse | Intelligent Healthcare Assistance & Navigation',
    description: 'Learn about JetPulse, our mission to ensure nobody navigates healthcare alone, and our verified companion ecosystem.',
    heading: 'Healthcare, Handled With Care & Clarity',
    intro: 'JetPulse was created to solve one of the most stressful parts of modern life: handling healthcare logistics alone. We combine compassionate, verified human companions with intelligent AI navigation and a unified family health ecosystem.',
    points: [
      'Dedicated to non-clinical care coordination and patient dignity',
      '100% background-verified companion network with service training',
      'AI Care Navigator designed to clarify healthcare pathways',
      'Synchronized multi-city family health communication',
      'Committed to transparent pricing and patient safety'
    ],
    faqs: [
      { q: 'What inspired JetPulse?', a: 'JetPulse was founded to solve the struggle experienced by students living alone, busy working professionals, and remote children trying to care for elderly parents across different cities.' }
    ],
    cta: 'Experience JetPulse',
    canonical: `${SITE_URL}/about`
  },

  '/help': {
    isIndexable: true,
    category: 'Support',
    primaryKeyword: 'JetPulse support',
    secondaryKeywords: ['healthcare companion help', 'booking support'],
    title: 'Help Center & FAQs | JetPulse Support',
    description: 'Find quick answers about companion booking, pricing, safety standards, Care Navigator, and family accounts.',
    heading: 'JetPulse Help & Support Center',
    intro: 'Everything you need to know about booking assistance, preparing for doctor visits, tracking journeys, and managing family health records.',
    points: [
      'Instant booking and scheduled reservation guidelines',
      'Payment methods and transparent hourly pricing',
      'Companion safety, identification, and verification protocols',
      'AI Care Navigator troubleshooting and document uploads',
      'Family timeline sharing and privacy management'
    ],
    faqs: [
      { q: 'How do I cancel or reschedule a booking?', a: 'Bookings can be rescheduled or cancelled directly from the JetPulse dashboard up to 2 hours prior to scheduled start time.' },
      { q: 'What happens if a doctor visit runs longer than expected?', a: 'You can easily extend the companion hours in real-time through the app with prorated pricing.' }
    ],
    cta: 'Contact Support',
    canonical: `${SITE_URL}/help`
  },

  '/faqs': {
    isIndexable: true,
    category: 'Support',
    primaryKeyword: 'JetPulse FAQs',
    secondaryKeywords: ['frequently asked questions healthcare companion', 'companion pricing questions'],
    title: 'Frequently Asked Questions | JetPulse Healthcare',
    description: 'Common questions and answers regarding JetPulse companion bookings, AI triage, emergency policies, and pricing.',
    heading: 'Frequently Asked Questions',
    intro: 'Get detailed clarity on how JetPulse works, companion vetting, pricing structure, and platform features.',
    points: [
      'Transparent hourly and multi-hour pricing packages',
      'Strict background checks and police verification for companions',
      'Non-clinical scope of service and emergency medical guidelines',
      'Multi-city family coordination features',
      'Data security and health records privacy'
    ],
    faqs: [
      { q: 'Is JetPulse an emergency ambulance service?', a: 'No. JetPulse provides non-clinical assistance and scheduled/on-demand visit companions. In medical emergencies, please call local emergency services immediately (112 / 108).' }
    ],
    cta: 'Book Assistance Now',
    canonical: `${SITE_URL}/faqs`
  },

  '/verification': {
    isIndexable: true,
    category: 'Trust',
    primaryKeyword: 'companion verification standards',
    secondaryKeywords: ['verified healthcare escort', 'background checked companion'],
    title: 'Companion Verification & Safety Standards | JetPulse',
    description: 'Learn about JetPulse companion vetting, criminal background checks, identity verification, and empathy training.',
    heading: 'Rigorous Verification & Trust Standards',
    intro: 'Your safety, dignity, and peace of mind are our highest priorities. Every JetPulse companion goes through a comprehensive 5-step verification and training program before their first assignment.',
    points: [
      'Government ID and biometric identity verification (Aadhaar / PAN)',
      'Thorough criminal background check and address verification',
      'Professional reference verification and interview evaluation',
      'Comprehensive training in hospital protocols, mobility, and empathy',
      'Ongoing patient feedback and strict zero-tolerance code of conduct'
    ],
    cta: 'Learn More',
    canonical: `${SITE_URL}/verification`
  },

  '/privacy': {
    isIndexable: true,
    category: 'Legal',
    primaryKeyword: 'privacy policy',
    secondaryKeywords: ['data privacy healthcare', 'HIPAA DISHA privacy policy'],
    title: 'Privacy Policy | JetPulse Healthcare',
    description: 'JetPulse Privacy Policy: How we collect, store, and protect your personal and health-related data.',
    heading: 'Privacy Policy',
    intro: 'JetPulse takes data privacy seriously. This document outlines our data collection policies, HIPAA/DISHA alignment, encryption standards, and your rights regarding your personal and family health data.',
    points: [
      'End-to-end encryption for health records and personal documents',
      'Consent-driven sharing between family members',
      'Strict no-sale policy for personal health information',
      'Right to export or delete your health records at any time',
      'Secure tokenized payment handling with zero card data storage'
    ],
    canonical: `${SITE_URL}/privacy`
  },

  '/privacy-policy': {
    isIndexable: true,
    category: 'Legal',
    primaryKeyword: 'privacy policy',
    secondaryKeywords: ['data privacy healthcare'],
    title: 'Privacy Policy | JetPulse Healthcare',
    description: 'JetPulse Privacy Policy: How we collect, store, and protect your personal and health-related data.',
    heading: 'Privacy Policy',
    intro: 'JetPulse takes data privacy seriously. This document outlines our data collection policies, HIPAA/DISHA alignment, encryption standards, and your rights regarding your personal and family health data.',
    points: [
      'End-to-end encryption for health records and personal documents',
      'Consent-driven sharing between family members',
      'Strict no-sale policy for personal health information',
      'Right to export or delete your health records at any time',
      'Secure tokenized payment handling with zero card data storage'
    ],
    canonical: `${SITE_URL}/privacy`
  },

  '/terms': {
    isIndexable: true,
    category: 'Legal',
    primaryKeyword: 'terms of service',
    secondaryKeywords: ['terms and conditions healthcare assistance'],
    title: 'Terms of Service | JetPulse Healthcare',
    description: 'JetPulse Terms of Service: Non-clinical scope of service, user responsibilities, and booking policies.',
    heading: 'Terms of Service',
    intro: 'These terms outline the legal terms of service between JetPulse Technologies Inc. and users of our mobile/web application, AI Care Navigator, and companion escort services.',
    points: [
      'Non-clinical assistance definition and emergency disclaimers',
      'Booking cancellation, refund, and extension policies',
      'User conduct expectations and mutual respect guidelines',
      'Intellectual property and platform usage rights',
      'Limitation of liability and dispute resolution'
    ],
    canonical: `${SITE_URL}/terms`
  },

  '/accessibility': {
    isIndexable: true,
    category: 'Trust',
    primaryKeyword: 'accessibility policy',
    secondaryKeywords: ['WCAG healthcare accessibility', 'senior accessibility'],
    title: 'Accessibility Statement | JetPulse Healthcare',
    description: 'JetPulse commitment to digital and physical accessibility for elderly patients and individuals with disabilities.',
    heading: 'Accessibility Commitment',
    intro: 'Healthcare should be accessible to all. JetPulse is committed to WCAG 2.1 AA accessibility standards across our digital platforms and physically accommodating companions.',
    points: [
      'High contrast ratios and readable typography for senior eyes',
      'Full keyboard navigability and screen-reader compatibility (ARIA)',
      'Audio and visual options in Care Navigator AI',
      'Specialized companion training for wheelchair and low-vision assistance',
      'Dedicated accessibility feedback and assistance line'
    ],
    canonical: `${SITE_URL}/accessibility`
  }
};

export const ALL_SERVICES_NAV = [
  { href: '/healthcare-companion', label: 'Healthcare Companion' },
  { href: '/doctor-visit-assistance', label: 'Doctor Visit Assistance' },
  { href: '/hospital-navigation', label: 'Hospital Navigation' },
  { href: '/diagnostic-test-assistance', label: 'Diagnostic Support' },
  { href: '/post-discharge-care', label: 'Post-Discharge Care' },
  { href: '/care-navigator', label: 'AI Care Navigator' },
  { href: '/family-healthcare', label: 'Family Healthcare' },
  { href: '/elderly-care-companion', label: 'Elderly Care Companion' },
  { href: '/bedside-assistance', label: 'Bedside Support' },
];

export const ALL_CITIES_NAV = [
  { href: '/cities/bangalore', label: 'Bangalore' },
  { href: '/cities/varanasi', label: 'Varanasi' },
  { href: '/cities/jaipur', label: 'Jaipur' },
  { href: '/cities/delhi-ncr', label: 'Delhi NCR' },
  { href: '/cities/mumbai', label: 'Mumbai' },
  { href: '/cities/hyderabad', label: 'Hyderabad' },
];
