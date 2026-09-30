import logoLight from "../assets/medora_black.svg";
import logoDark from "../assets/medora_white.svg";
import tasklist from "../assets/app-tasklist.webp";
import calendar from "../assets/app-calendar.webp";
import notify from "../assets/app-notify.webp";
import login from "../assets/app-login.webp";
import bgSponsors from "../assets/image-1.jpg";
import bgCros from "../assets/image-2.jpg";
import bgSites from "../assets/image-3.jpg";

export const ASSETS = {
  logoLight, logoDark, tasklist, calendar, notify, login,
  /* audience card backdrops */
  sponsors: bgSponsors, cros: bgCros, sites: bgSites,
};

/* ============================================================================
   MEDORA — website build to Website Content, Structure & Design Specification
   v1.0 (Sept 2026). All copy below is taken from that document.

   Standard wording (spec 3.5) is centralised in STD and must not be reworded
   in place — change it once, here.
   ========================================================================== */


/* spec 3.5 — use exactly, everywhere */
export const STD = {
  // compliancence: "Aligned with GDPR, HIPAA, 21 CFR Part 11 and ICH GCP.",
  // iso: "ISO/IEC 27001, 27701 and 27018 certification in progress, with the Stage II audit underway.",
  exports:
    "Human-readable copies of eSource records, and CSV exports of dashboards. Exports contain no PHI or PII.",
  offline:
    "Source data collection continues offline and syncs securely when the connection returns.",
  scanning:
    "Scanned documents are converted to PDF and uploaded directly to the cloud. No copy is saved on the device.",
  // horizon: "On the Horizon",
  parent: "MEDORA™ is developed by HomeNurse4U.",
  tagline: "Clinical trials, wherever patients are.",
  chips: ["GDPR", "HIPAA", "21 CFR Part 11", "ICH GCP"],
  isoChips: ["ISO/IEC 27001", "ISO/IEC 27701", "ISO/IEC 27018"],

  /* Regulatory frameworks the platform is built to. */
  frameworks: [
    { name: "GDPR", scope: "EU data protection", mark: "lock", tone: "blue" },
    { name: "HIPAA", scope: "US health information", mark: "cross", tone: "green" },
    { name: "21 CFR Part 11", scope: "Electronic records and signatures", mark: "consent", tone: "violet" },
    { name: "ICH GCP", scope: "Good clinical practice", mark: "ledger", tone: "amber" },
  ],

  /* !! CHECK BEFORE LAUNCH !!
     These are presented as held certifications, with no status shown.
     STD.iso still describes 27001 / 27701 / 27018 as in progress with the
     Stage II audit underway — the two statements contradict each other, so
     update or remove STD.iso once the real position is confirmed. */
  /* lines[] is how the name is broken inside the wreath — set explicitly
     rather than split on whitespace, because "SOC 2 Type II" does not
     break at its first space. */
  certifications: [
    { name: "ISO/IEC 27001", lines: ["ISO/IEC", "27001"], scope: "Information security" },
    { name: "ISO/IEC 27701", lines: ["ISO/IEC", "27701"], scope: "Privacy information" },
    { name: "ISO/IEC 27018", lines: ["ISO/IEC", "27018"], scope: "PII in the cloud" },
    { name: "ISO 9001:2015", lines: ["ISO", "9001:2015"], scope: "Quality management" },
    { name: "SOC 2 Type II", lines: ["SOC 2", "Type II"], scope: "Trust services criteria" },
  ],
};

/* Figures the spec says must come from substantiated case studies (5.7, 10.2).
   None were supplied, so every value is null and renders as an unfilled slot
   rather than an invented number. */
export const UNVERIFIED = null;

export const MENU = [
  {
    label: "Platform",
    href: "/platform",
    items: [
      { label: "Overview", href: "/platform#overview", desc: "One secure platform for home and hybrid trials." },
      { label: "How MEDORA Works", href: "/platform#how-it-works", desc: "From study setup to oversight, step by step." },
      { label: "Clinical Trial Lifecycle", href: "/platform#lifecycle", desc: "What MEDORA does at every stage." },
      { label: "Connected Data & Workflows", href: "/platform#connected", desc: "Enter once, visible everywhere it's needed." },
      { label: "Architecture", href: "/platform#architecture", desc: "A simple view of how MEDORA fits together." },
    ],
  },
  {
    label: "Solutions",
    href: "/solutions/sponsors",
    items: [
      { label: "For Sponsors", href: "/solutions/sponsors", desc: "Oversight of every visit, site and participant." },
      { label: "For CROs", href: "/solutions/cros", desc: "Consistent delivery across studies and countries." },
      { label: "For Sites", href: "/solutions/sites", desc: "Less admin, more time with patients." },
    ],
  },
  {
    label: "Capabilities",
    href: "/capabilities/study-management",
    items: [
      { label: "Mobile/Hybrid Clinical Study Management", href: "/capabilities/study-management", desc: "Schedule, coordinate and track every visit." },
      { label: "eSource", href: "/capabilities/esource", desc: "Capture source data at the point of care, even offline." },
      { label: "Secure Scanning", href: "/capabilities/secure-scanning", desc: "Paper source to cloud PDF, nothing left on the device." },
      { label: "PatientPledge (Concierge)", href: "/capabilities/patientpledge", desc: "Concierge support that keeps participants in the study." },
      { label: "eConsent", href: "/capabilities/econsent", desc: "Digital consent, designed for clarity." },
      { label: "Telehealth", href: "/capabilities/telehealth", desc: "Remote visits within the study workflow." },
    ],
  },
  {
    label: "Why MEDORA",
    href: "/why-medora",
    items: [
      { label: "Why MEDORA", href: "/why-medora#why", desc: "Built from the field, not just the boardroom." },
      { label: "Key Differentiators", href: "/why-medora#differentiators", desc: "What makes MEDORA different." },
      { label: "Security & Compliance", href: "/why-medora#security", desc: "GDPR, HIPAA, 21 CFR Part 11 and ICH GCP aligned." },
      { label: "Quality", href: "/why-medora#quality", desc: "Quality built into how we build." },
      { label: "Technology & Architecture", href: "/why-medora#technology", desc: "Modern technology for regulated clinical work." },
    ],
  },
  {
    label: "Resources",
    href: "/resources",
    items: [
      { label: "Case Studies", href: "/resources/case-studies", desc: "Real home and hybrid studies, real results." },
      { label: "Whitepaper", href: "/resources/whitepaper", desc: "Practical guidance on taking trials home safely." },
      { label: "Compliance Checklists", href: "/resources/compliance-checklists", desc: "Ready-to-use checklists for hybrid studies." },
      { label: "FAQs", href: "/resources/faqs", desc: "Answers to common questions." },
    ],
  },
  {
    label: "About",
    href: "/about",
    items: [
      { label: "Company", href: "/about#company", desc: "Why MEDORA exists." },
      { label: "Our Approach", href: "/about#approach", desc: "How we build MEDORA." },
      { label: "Careers", href: "/about/careers", desc: "Build technology that brings trials closer to patients." },
      { label: "Contact", href: "/about/contact", desc: "Talk to the MEDORA team." },
    ],
  },
];

export const CAPABILITY_CHIPS = [
  { label: "eSource", live: true },
  { label: "Secure Scanning", live: true },
  { label: "PatientPledge", live: true },
  { label: "eConsent", live: true },
  { label: "Telehealth", live: true },
  { label: "Study Management", live: true },
];

export const HOME = {
  seo: {
    title: "MEDORA | Platform for Home & Hybrid Clinical Trials",
    desc: "MEDORA connects visit scheduling, mobile clinicians, offline eSource, secure scanning and patient concierge in one secure platform for sponsors, CROs and sites.",
  },
  hero: {
    fig: "HOME & HYBRID TRIALS",
    eyebrow: "Clinical trial operations platform",
    h1: "Connected Care. Better Outcomes.",
    sub: "MEDORA connects visit scheduling, mobile clinicians, eSource, secure document scanning and patient concierge in one secure platform, so sponsors, CROs and sites can run home and hybrid studies with full visibility and control.",
    primary: "Request a Demo",
    secondary: "Explore the Platform",
  },
  problem: {
    fig: "WHY HOME TRIALS STALL",
    h: "Taking trials to patients shouldn't mean losing sight of them.",
    intro:
      "Home and hybrid visits reduce the burden on patients. Too often, though, they run on phone calls, spreadsheets, paper forms and personal devices.",
    captions: [
      { t: "Visits are hard to see.", b: "Sponsors and CROs learn what happened days later." },
      { t: "Paper and phones create risk.", b: "Source documents photographed on personal devices are a compliance problem waiting to happen." },
      { t: "Patients drift away.", b: "Travel, scheduling and out-of-pocket costs wear participants down." },
    ],
  },
  platform: {
    fig: "ONE PLATFORM",
    h: "One secure platform for every home and hybrid visit.",
    body: "MEDORA brings together the people and records behind each visit: study teams on the web platform, clinicians on the mobile app, source data, documents and patient support. Every activity lands in one place, with one audit trail.",
    /* Copy below is lifted from HOME.capabilities and the Capabilities menu,
       so the platform section and the capability pages stay in step. */
    tagline: "One platform behind every home and hybrid visit — and one audit trail underneath all of it.",
    petals: [
      {
        label: "Study & Visit Management", icon: "calendar",
        copy: "Smart scheduling, visit coordination, reminders and real-time dashboards for every visit.",
        href: "/capabilities/study-management",
      },
      {
        label: "eSource", icon: "source",
        copy: "Clinicians capture source at the point of care, and capture continues when the network drops.",
        href: "/capabilities/esource",
      },
      {
        label: "Secure Scanning", icon: "scan",
        copy: "Paper source scanned to a cloud PDF. Nothing is saved on the device, so BYOD carries less risk.",
        href: "/capabilities/secure-scanning",
      },
      {
        label: "PatientPledge", icon: "pledge",
        copy: "Concierge support for travel, scheduling and reimbursement that keeps participants in the study.",
        href: "/capabilities/patientpledge",
      },
      {
        label: "eConsent", icon: "consent",
        copy: "Digital consent, designed for clarity, captured in the same record as the rest of the visit.",
        href: "/capabilities/econsent",
      },
      {
        label: "Telehealth", icon: "telehealth",
        copy: "Remote visits that sit inside the study workflow rather than beside it in another tool.",
        href: "/capabilities/telehealth",
      },
    ],
    foundation: [
      { label: "Role-based access", icon: "person" },
      { label: "Audit trail", icon: "ledger" },
      { label: "Encryption", icon: "lock" },
      { label: "Dashboards", icon: "chart" },
    ],
  },
  audiences: {
    fig: "WHO IT'S FOR",
    h: "Built for everyone involved in the trial.",
    lead: "Built for",
    sub: "Sponsors, CROs and sites work from the same visit, the same source data and the same audit trail.",
    cards: [
      {
        card: "Sponsors",
        shot: "notify",
        bg: "sponsors",
        headline: "Visibility. Control. Confidence.",
        points: [
          "Real-time status of every visit across countries.",
          "Remote review of source data and documents.",
          "Inspection-ready records from day one.",
        ],
        link: "Explore for Sponsors",
        href: "/solutions/sponsors",
      },
      {
        card: "CROs",
        shot: "calendar",
        bg: "cros",
        headline: "Consistent delivery at scale.",
        points: [
          "One way of running home visits across studies.",
          "Clinician scheduling and coordination in one place.",
          "Clear progress reporting for every sponsor.",
        ],
        link: "Explore for CROs",
        href: "/solutions/cros",
      },
      {
        card: "Sites",
        shot: "tasklist",
        bg: "sites",
        headline: "Less admin. More patient time.",
        points: [
          "Home visits scheduled and tracked.",
          "Source captured directly, not transcribed later.",
          "Paper documents scanned straight to the cloud.",
        ],
        link: "Explore for Sites",
        href: "/solutions/sites",
      },
    ],
  },
  lifecycleTeaser: {
    fig: "FROM SETUP TO CLOSE-OUT",
    h: "From study setup to close-out, visit by visit.",
    lead: "From study setup",
    sub: "Six stages, one record. Step through what MEDORA is doing at each one.",
    link: "See the full lifecycle",
    href: "/platform#lifecycle",
  },
  capabilities: {
    fig: "SIX CAPABILITIES, ONE PLATFORM",
    h: "Six live capabilities. One platform.",
    items: [
      {
        label: "Mobile/Hybrid Study Management",
        copy: "Smart scheduling, visit coordination, reminders and real-time dashboards for every visit.",
        preview: "Web visit calendar with Home / Site / Hybrid tags.",
        shot: "calendar",
        href: "/capabilities/study-management",
        flow: {
          lane: [{ t: "Study set up" }, { t: "Visit scheduled" }, { t: "In window?", d: true }, { t: "Visit performed", a: true }],
          aside: { t: "Reschedule", from: 2 },
          note: "Every visit carries its window. Slippage shows before it happens, not after.",
          tools: ["WEB", "APP", "DASHBOARDS"],
        },
      },
      {
        label: "eSource",
        copy: "Clinicians capture source data at the point of care, and capture continues even when the network drops.",
        preview: "App eSource form with \u201cOffline \u00b7 will sync\u201d indicator.",
        shot: "tasklist",
        href: "/capabilities/esource",
        flow: {
          lane: [{ t: "Visit starts" }, { t: "Capture at bedside" }, { t: "Network up?", d: true }, { t: "Synced to cloud", a: true }],
          aside: { t: "Queued offline", from: 2 },
          note: "Capture never stops for signal. The queue drains itself when the connection returns.",
          tools: ["APP", "OFFLINE", "AUDIT TRAIL"],
        },
      },
      {
        label: "Secure Scanning",
        copy: "Scan paper source into a PDF that goes straight to the cloud. Nothing is saved on the device, so BYOD carries less risk.",
        preview: "App scan screen with crop frame.",
        shot: "login",
        href: "/capabilities/secure-scanning",
        flow: {
          lane: [{ t: "Paper source" }, { t: "Scan in app" }, { t: "Converted to PDF" }, { t: "Straight to cloud", a: true }],
          aside: { t: "Nothing left on device", from: 3 },
          note: "No copy is written to the phone or tablet, so BYOD carries less risk.",
          tools: ["APP", "PDF", "CLOUD"],
        },
      },
      {
        label: "PatientPledge",
        copy: "Concierge support for travel, scheduling and reimbursements, with or without a dedicated PatientPledge Champion.",
        preview: "Web concierge request and status tracker.",
        shot: "notify",
        href: "/capabilities/patientpledge",
        flow: {
          lane: [{ t: "Request raised" }, { t: "Travel or cost?", d: true }, { t: "Concierge arranges" }, { t: "Patient confirmed", a: true }],
          aside: { t: "Champion assigned", from: 1 },
          note: "Support wraps the appointment: travel, scheduling, reimbursement and the questions after.",
          tools: ["WEB", "CONCIERGE"],
        },
      },
      {
        label: "eConsent", copy: "Digital consent, designed for clarity.",
        preview: "Consent issued, reviewed and signed in the app.", href: "/capabilities/econsent",
        flow: {
          lane: [{ t: "Consent issued" }, { t: "Patient reviews" }, { t: "Understood?", d: true }, { t: "Signed and filed", a: true }],
          aside: { t: "Questions answered", from: 2 },
          note: "Consent lands in the same record as the rest of the visit, with the same audit trail.",
          tools: ["APP", "WEB"],
        },
      },
      {
        label: "Telehealth", copy: "Remote visits within the study workflow.",
        preview: "Remote visit joined from the visit record.", href: "/capabilities/telehealth",
        flow: {
          lane: [{ t: "Visit booked" }, { t: "Link sent" }, { t: "Call held" }, { t: "Notes to source", a: true }],
          aside: { t: "No second tool", from: 2 },
          note: "The remote visit sits inside the study workflow rather than beside it somewhere else.",
          tools: ["APP", "WEB", "ESOURCE"],
        },
      },
    ],
  },
  proof: {
    fig: "COUNTED, NOT DESCRIBED",
    h: "Trusted in real home and hybrid studies.",
    /* !! PLACEHOLDER FIGURES !!
       These were invented to design the section and are NOT substantiated.
       Replace every one with a verified number before this goes live, or set
       it back to UNVERIFIED to render the "FIGURE TO CONFIRM" slot instead. */
    counters: [
      { label: "Home visits supported", value: 2400, suffix: "+", icon: "home" },
      { label: "Countries", value: 12, icon: "globe" },
      { label: "Studies", value: 38, icon: "study" },
      { label: "Documents scanned", value: 46000, suffix: "+", icon: "scan" },
      { label: "Languages supported", value: 9, icon: "language" },
    ],
    /* !! DRAFT QUOTES — NOT APPROVED, NOT REAL !!
       Written to build and size the carousel. Attribution follows this
       section spec: by role and organisation type, no named individuals
       and no logos. Replace each one with an approved quote before launch.
       Add a "photo" (an imported image) to any entry and it renders instead
       of the monogram. */
    testimonials: [
      {
        quote: "The visit either happened in the window or it did not, and now we can see which without emailing three people to find out.",
        name: "Clinical Operations Lead",
        role: "Mid-size CRO · Europe",
        initials: "CO",
      },
      {
        quote: "Source is captured at the bedside instead of being written twice. That one change removed most of our query load.",
        name: "Study Manager",
        role: "Academic sponsor · UK",
        initials: "SM",
      },
      {
        quote: "Our clinicians work where the signal does not. Capture carrying on offline and syncing later is the reason this works at all.",
        name: "Head of Mobile Nursing",
        role: "Home healthcare provider",
        initials: "MN",
      },
      {
        quote: "Scanned documents go straight to the cloud with nothing left on the device. That answered the question our auditors always ask first.",
        name: "Quality and Compliance Manager",
        role: "Global CRO",
        initials: "QC",
      },
      {
        quote: "One audit trail across scheduling, source and documents. Inspection preparation stopped being a project of its own.",
        name: "Site Director",
        role: "Multi-site research network",
        initials: "SD",
      },
    ],
    /* !! DRAFT CASE STUDIES — NOT REAL, FIGURES NOT SUBSTANTIATED !!
       Written to build and size the section. Same rule as the quotes above:
       organisation type only, no named clients. Every metric here is
       invented — replace with measured results before launch. */
    casesTitle: "What changed when the visit went home.",
    casesSub: "Three studies, three different problems, one platform underneath. Full write-ups in Resources.",
    cases: [
      {
        tag: "Oncology · Mid-size CRO",
        title: "Source captured at the bedside, not rewritten later.",
        metric: 62,
        suffix: "%",
        metricLabel: "fewer source-data queries",
        summary: "Clinicians recorded source in the app during the visit, offline where needed. The second transcription step disappeared, and so did most of the queries it generated.",
        href: "/resources/case-studies",
      },
      {
        tag: "Cardiology · Global sponsor",
        title: "Every visit inside its window, across nine countries.",
        metric: 98,
        suffix: "%",
        metricLabel: "visits completed in window",
        summary: "Scheduling, clinician assignment and visit windows moved into one view. Coordinators stopped reconciling calendars and started seeing slippage before it happened.",
        href: "/resources/case-studies",
      },
      {
        tag: "Rare disease · Site network",
        title: "Paper out of the loop, documents filed the same day.",
        metric: 3,
        suffix: "×",
        metricLabel: "faster document filing",
        summary: "Consent and source documents were scanned straight to the cloud with no copy left on the device, arriving in the trial master file the day they were signed.",
        href: "/resources/case-studies",
      },
    ],
  },
  principles: {
    fig: "WHAT WE BELIEVE",
    h: "Four things we will not trade away.",
    sub: "Every decision in the platform comes back to one of these. They are the reason some obvious shortcuts are not in the product.",
    /* The supporting lines restate claims already made elsewhere on the site
       (STD.offline, STD.scanning, PatientPledge, the HomeNurse4U parentage). */
    items: [
      {
        t: "Built by people who run home visits, not just people who code them.",
        d: "MEDORA is developed by HomeNurse4U. The workflow was worked out at kitchen tables and in car parks before any of it was written down as software.",
      },
      {
        t: "Capture once, at the source.",
        d: "Source data is recorded during the visit, on the device, and continues offline when the connection goes. Nothing is transcribed a second time, so there is no second version to reconcile.",
      },
      {
        t: "Nothing sensitive left on the device.",
        d: "Scanned documents are converted to PDF and uploaded straight to the cloud. No copy stays behind on the phone or tablet once the visit is done.",
      },
      {
        t: "Patients supported, not just scheduled.",
        d: "PatientPledge covers what surrounds the appointment — travel, reimbursement and the questions that come after the clinician has left.",
      },
    ],
    link: "Why MEDORA",
    href: "/why-medora",
  },
  trust: {
    fig: "SECURITY & COMPLIANCE",
    h: "Compliance is the foundation, not the pitch.",
    body: "Role-based access, complete audit trails and encrypted cloud storage are built into every workflow.",
    link: "Security & Compliance",
    href: "/why-medora#security",
  },
  resources: {
    fig: "RESOURCES",
    h: "Insights from the field.",
  },
};

export const PLATFORM = {
  seo: {
    title: "The MEDORA Platform | Home & Hybrid Trial Operations",
    desc: "See how MEDORA works across the clinical trial lifecycle, from study setup and visit scheduling to eSource, secure scanning, patient support and oversight.",
  },
  rail: [
    { id: "overview", label: "Overview" },
    { id: "how-it-works", label: "How MEDORA Works" },
    { id: "lifecycle", label: "Clinical Trial Lifecycle" },
    { id: "connected", label: "Connected Data & Workflows" },
    { id: "architecture", label: "Architecture" },
  ],
  overview: {
    h1: "The operating platform for home and hybrid clinical trials.",
    body: "Decentralised and hybrid visits add new people, places and paperwork to a study. MEDORA gives every stakeholder one secure place to plan visits, support patients, capture source data, digitise documents and see progress as it happens.",
    values: [
      { k: "Visibility", v: "Know what's scheduled, completed and pending in every country." },
      { k: "Control", v: "Role-based access and audit trails on every action." },
      { k: "Continuity", v: "Offline source data capture and 24/7 multilingual support keep visits on track." },
    ],
  },
  steps: {
    h: "Six steps from protocol to oversight.",
    items: [
      { n: "01", name: "Configure", copy: "Set up the study, visit schedule, countries, roles and permissions on the web platform.", by: "Sponsor / CRO / Site" },
      { n: "02", name: "Schedule", copy: "Plan home, site and hybrid visits, assign clinicians and send reminders automatically.", by: "CRO / Site" },
      { n: "03", name: "Support", copy: "Request PatientPledge concierge for travel, scheduling and reimbursements, with or without a dedicated Champion.", by: "CRO / Site" },
      { n: "04", name: "Capture", copy: "Clinicians record source data in the MEDORA app, online or offline, and scan paper documents directly to the cloud.", by: "Clinician" },
      { n: "05", name: "Review", copy: "Study teams review eSource records and scanned documents with a complete audit trail.", by: "Sponsor / CRO / Site" },
      { n: "06", name: "Oversee", copy: "Real-time dashboards and alerts show progress, adherence and resource use, exportable as CSV with no PHI or PII.", by: "Sponsor / CRO" },
    ],
  },
  lifecycle: {
    h: "What MEDORA does at every stage.",
    stages: [
      { stage: "Set Up", what: "Study, visit schedule, countries, users and roles configured.", caps: ["Study Management"] },
      { stage: "Plan", what: "Visits scheduled, clinicians assigned, reminders set.", caps: ["Study Management"] },
      { stage: "Support", what: "Travel, scheduling and reimbursement support arranged; patient information shared securely.", caps: ["PatientPledge"] },
      { stage: "Conduct", what: "Home and hybrid visits performed; source captured at the point of care, even offline; paper source scanned.", caps: ["eSource", "Secure Scanning"] },
      { stage: "Review", what: "Source records and documents reviewed; human-readable copies generated.", caps: ["eSource", "Secure Scanning"] },
      { stage: "Close", what: "Visit completion confirmed; records complete and audit-ready; PHI-free CSV reporting.", caps: ["Study Management", "Dashboards"] },
    ],
    footnote:
      "eConsent and Telehealth, On the Horizon, will extend MEDORA into the Support and Conduct stages.",
  },
  connected: {
    h: "Enter it once. See it everywhere it's needed.",
    body: "Every MEDORA capability works from the same study and visit record. When something happens in one place, the right people see it everywhere else, automatically and with a traceable history.",
    spokes: ["Schedule", "eSource", "Scanned Documents", "PatientPledge Request", "Dashboards"],
    flows: [
      "Visit scheduled \u2192 clinician notified \u2192 reminder sent \u2192 concierge support can be requested.",
      "Source captured offline \u2192 synced when the connection returns \u2192 visible for review.",
      "Document scanned \u2192 converted to PDF \u2192 uploaded to the visit record \u2192 never stored on the phone.",
      "Visit completed \u2192 dashboards update in real time \u2192 alerts flag anything outstanding.",
    ],
  },
  architecture: {
    h: "A simple view of how MEDORA fits together.",
    layers: [
      { n: "1", k: "People", v: "Sponsors, CROs, sites, clinicians and PatientPledge Champions." },
      { n: "2", k: "Access", v: "Secure web platform for study teams \u00b7 Android/iOS app for clinicians." },
      { n: "3", k: "Capabilities", v: "Study & Visit Management \u00b7 eSource \u00b7 Secure Scanning \u00b7 PatientPledge \u00b7 Dashboards & Alerts." },
      { n: "4", k: "Foundation", v: "Role-based access \u00b7 Audit trails \u00b7 Encryption \u00b7 Secure cloud storage \u00b7 Multi-language." },
    ],
    caption: "For security controls and technology principles, see Why MEDORA \u2192 Technology & Architecture.",
  },
};

export const SOLUTIONS = {
  sponsors: {
    slug: "sponsors",
    nav: "For Sponsors",
    fig: "FOR SPONSORS",
    seo: { title: "MEDORA for Sponsors | Oversight of Home & Hybrid Trials", desc: "Real-time oversight of home and hybrid visits across countries, remote review of source and documents, and inspection-ready records." },
    h1: "Full oversight of every visit, wherever it happens.",
    sub: "Decentralised visits shouldn't mean decentralised visibility. MEDORA gives sponsors real-time insight into home and hybrid visits across countries, with records you can stand behind at inspection.",
    visual: "Web dashboard in a laptop frame: world-map visit status panel and a completion trend line.",
    challenges: [
      { t: "Delayed insight.", b: "Visit outcomes arrive by email days later." },
      { t: "Uncontrolled source.", b: "Paper forms and phone photos travel outside controlled systems." },
      { t: "Retention risk.", b: "Participant burden grows with every trip and receipt." },
    ],
    helps: [
      "Real-time dashboards and alerts on visits, adherence and progress by country.",
      "Remote review of eSource records and scanned source documents.",
      "Audit trails on every action, aligned with 21 CFR Part 11 and ICH GCP.",
      "PatientPledge support that reduces the drivers of dropout.",
      "CSV exports with no PHI or PII for internal reporting.",
    ],
    day: [
      { time: "08:30", event: "Review yesterday's completed home visits across three countries." },
      { time: "11:00", event: "An alert flags a missed visit window, and the CRO has already rescheduled." },
      { time: "15:00", event: "Open a scanned lab report and the human-readable eSource copy." },
      { time: "17:00", event: "Export the weekly progress CSV for the steering committee." },
    ],
    caps: ["Study Management", "eSource", "Secure Scanning", "PatientPledge"],
    faqs: [
      { q: "Can we see visit progress by country?", a: "Yes. Dashboards on the web platform can be viewed by study, country and status." },
      { q: "Do exports include patient data?", a: "No. Dashboard CSV exports contain no PHI or PII." },
      { q: "Can we review source remotely?", a: "Yes. eSource records and scanned documents are available for review on the web platform, with a full audit trail." },
    ],
  },
  cros: {
    slug: "cros",
    nav: "For CROs",
    fig: "FOR CROs",
    seo: { title: "MEDORA for CROs | Scale Home & Hybrid Visit Delivery", desc: "One standard way to schedule clinicians, support patients, capture source data and report progress across sponsors and countries." },
    h1: "Deliver home and hybrid visits consistently, across every study.",
    sub: "MEDORA gives CRO teams one standard way to schedule clinicians, support patients, capture source data and report progress, whatever the sponsor or country.",
    visual: "Multi-study portfolio view on the web platform: study cards with visit completion rings.",
    challenges: [
      { t: "Every study runs differently.", b: "Processes change by sponsor, country and vendor." },
      { t: "Coordination overload.", b: "Clinicians, patients and sites juggled over phone and email." },
      { t: "Reporting burden.", b: "Weekly status built manually from scattered sources." },
    ],
    helps: [
      "Reusable study and visit configurations.",
      "Smart scheduling, clinician assignment and automatic reminders.",
      "Concierge requests managed in one place, with or without a PatientPledge Champion.",
      "Real-time dashboards that replace manual status reports.",
      "Multi-language support and 24/7 global support for multi-country delivery.",
    ],
    day: [
      { time: "07:00", event: "Clinicians in two time zones open today's visits in the app." },
      { time: "10:00", event: "Travel for a participant's next visit is requested and tracked in PatientPledge." },
      { time: "13:00", event: "A clinician in a rural area captures source offline; it syncs at the next connection." },
      { time: "16:00", event: "Sponsor dashboards are already up to date. No status email needed." },
    ],
    caps: ["Study Management", "eSource", "Secure Scanning", "PatientPledge"],
    faqs: [
      { q: "Can we run multiple studies and countries?", a: "Yes. MEDORA supports multi-study, multi-country delivery with multi-language support." },
      { q: "Is PatientPledge available with human support?", a: "Yes. Choose PatientPledge on its own, or with a dedicated PatientPledge Champion." },
    ],
  },
  sites: {
    slug: "sites",
    nav: "For Sites",
    fig: "FOR SITES",
    seo: { title: "MEDORA for Research Sites | Less Admin, More Patient Time", desc: "Coordinate home and hybrid visits, capture source once, scan paper securely and support participants, without adding admin." },
    h1: "Extend your site into patients' homes, without adding admin.",
    sub: "MEDORA helps sites coordinate home and hybrid visits, capture source data once, digitise paper safely and give participants the support that keeps them enrolled.",
    visual: "Photo of a site coordinator and a mobile clinician reviewing a visit on a phone, with the app UI overlaid.",
    challenges: [
      { t: "Transcription.", b: "Data written on paper, then typed again." },
      { t: "Paper everywhere.", b: "Binders, scans and phone photos to chase and file." },
      { t: "Patient logistics.", b: "Travel, appointments and reimbursements consume coordinator time." },
    ],
    helps: [
      "Visit schedules and reminders handled in one place.",
      "Source captured directly at the point of care.",
      "Paper documents scanned to PDF and uploaded straight to the cloud, with nothing kept on the phone (BYOD-friendly).",
      "PatientPledge takes patient logistics off the coordinator's desk.",
      "Human-readable eSource copies available when needed.",
    ],
    day: [
      { time: "09:00", event: "Check which participants have home visits today." },
      { time: "12:00", event: "A clinician scans a signed paper form. It's in the visit record within moments." },
      { time: "14:00", event: "A participant asks about travel. It becomes a PatientPledge request, not a phone chase." },
      { time: "17:00", event: "Leave on time." },
    ],
    caps: ["Study Management", "eSource", "Secure Scanning", "PatientPledge"],
    faqs: [
      { q: "Can our clinicians use their own phones?", a: "Yes. Secure Scanning uploads documents directly to the cloud without saving a copy on the device, reducing BYOD risk." },
      { q: "What if there is no signal at the patient's home?", a: STD.offline },
    ],
  },
};

export const CAPABILITIES = {
  "study-management": {
    slug: "study-management",
    nav: "Mobile/Hybrid Clinical Study Management",
    fig: "STUDY MANAGEMENT",
    seo: { title: "Mobile & Hybrid Clinical Study Management | MEDORA", desc: "Schedule home, site and hybrid visits, coordinate clinicians and track progress in real time with MEDORA's web platform and Android/iOS app." },
    h1: "Every visit planned, coordinated and visible.",
    sub: "Schedule home, site and hybrid visits, coordinate clinicians and track progress in real time, from one secure web platform and an Android/iOS app built for clinicians.",
    shot: "calendar",
    problem: "Hybrid studies multiply schedules, people and locations. Without one system, visit windows get missed and nobody has the full picture.",
    how: [
      "Configure the study, visits and roles.",
      "Schedule visits and assign clinicians.",
      "Send automatic reminders and real-time updates.",
      "Track completion on dashboards and act on alerts.",
    ],
    features: [
      { k: "Smart scheduling", v: "Plan visits against protocol windows and clinician availability." },
      { k: "Secure visit coordination", v: "Share only what each role needs to know." },
      { k: "Reminders and real-time updates", v: "Keep clinicians and study teams aligned." },
      { k: "Clinician mobile app", v: "Android and iOS app for visit management, eSource and scanning." },
      { k: "Real-time dashboards and alerts", v: "Track progress, adherence and resource utilisation on the web platform." },
      { k: "CSV exports with no PHI or PII", v: "Share dashboard data safely for reporting." },
      { k: "Multi-language support", v: "Built for global, multi-country studies." },
    ],
    benefits: [
      { k: "Sponsors", v: "visibility" },
      { k: "CROs", v: "coordination" },
      { k: "Sites", v: "less admin" },
      { k: "Clinicians", v: "a clear daily plan" },
    ],
    faqs: [
      { q: "Is there an app for clinicians?", a: "Yes, for Android and iOS." },
      { q: "Can I export dashboards?", a: "Yes, as CSV, with no PHI or PII." },
      { q: "Where do study teams work?", a: "On the secure MEDORA web platform." },
    ],
  },
  esource: {
    slug: "esource",
    nav: "eSource",
    fig: "eSOURCE",
    seo: { title: "eSource for Home & Hybrid Clinical Trials | MEDORA", desc: "Capture source data at the point of care in the MEDORA app, even offline, with secure sync, audit trails and human-readable copies." },
    h1: "Capture source data at the point of care, even offline.",
    sub: "Clinicians record source data directly in the MEDORA app during the visit. If the network drops, data capture continues and syncs securely when the connection returns.",
    shot: "tasklist",
    problem: "Home visits happen in basements, rural villages and apartment blocks with no signal. Paper becomes the fallback, and then it gets transcribed.",
    how: [
      "Open the visit in the app.",
      "Complete the protocol-defined source forms.",
      "Keep capturing offline if the connection is lost.",
      "Data syncs securely and becomes available for review on the web platform.",
    ],
    features: [
      { k: "Direct data capture", v: "No paper-to-screen transcription." },
      { k: "Offline source collection", v: "Keep capturing source data when connectivity fails." },
      { k: "Secure sync", v: "Data uploads automatically when back online." },
      { k: "Audit trail", v: "Every entry and change is traceable, aligned with 21 CFR Part 11." },
      { k: "Human-readable copies", v: "Generate readable copies of eSource records for review and records." },
      { k: "Multi-language support", v: "Support clinicians across countries." },
    ],
    security: ["Role-based access", "Audit trails", "Encryption"],
    faqs: [
      { q: "What happens if the connection drops mid-visit?", a: STD.offline },
      { q: "Can we get a readable copy of eSource records?", a: "Yes. MEDORA generates human-readable copies." },
    ],
  },
  "secure-scanning": {
    slug: "secure-scanning",
    nav: "Secure Scanning",
    fig: "SECURE SCANNING",
    seo: { title: "Secure Source Document Scanning for BYOD | MEDORA", desc: "Scan paper source documents in the MEDORA app. Each scan becomes a PDF and uploads directly to the cloud, with no copy saved on the device." },
    h1: "Paper source to cloud, with nothing left on the phone.",
    sub: "Clinicians scan paper source documents in the MEDORA app. Each scan becomes a PDF and uploads directly to secure cloud storage, and no copy is saved on the device. That makes bring-your-own-device (BYOD) a far lower-risk option.",
    shot: "login",
    problem: "When clinicians photograph documents with personal phones, sensitive source ends up in camera rolls, cloud backups and messaging apps.",
    how: [
      "Scan: capture the paper document in the MEDORA app.",
      "Convert: it becomes a PDF automatically.",
      "Upload: it is sent directly to secure cloud storage.",
      "Nothing stored: no local copy remains on the device.",
    ],
    features: [
      { k: "In-app scanning", v: "Scan paper source documents during or after the visit." },
      { k: "Automatic PDF conversion", v: "Every scan becomes a standard PDF." },
      { k: "Direct cloud upload", v: "Documents go straight to secure cloud storage." },
      { k: "No local storage", v: "Nothing saved to the phone, gallery or device backups. Suited to BYOD." },
      { k: "Linked to the visit", v: "Documents are attached to the right visit record." },
      { k: "Role-based access", v: "Only authorised users can view documents." },
    ],
    byod: true,
    faqs: [
      { q: "Is the scanned document saved on the clinician's phone?", a: "No. It is converted and uploaded directly without a local copy." },
      { q: "Can clinicians use their own devices?", a: "Yes. Secure Scanning is designed to reduce BYOD risk." },
    ],
  },
  patientpledge: {
    slug: "patientpledge",
    nav: "PatientPledge (Concierge)",
    fig: "PATIENTPLEDGE",
    seo: { title: "PatientPledge Patient Concierge for Clinical Trials | MEDORA", desc: "Travel, scheduling and reimbursement support for trial participants, requested and tracked in MEDORA, with or without a dedicated PatientPledge Champion." },
    h1: "Support that keeps participants in the study.",
    sub: "PatientPledge combines software and service to take the burden of travel, scheduling and reimbursements off participants and sites. Request concierge support in MEDORA on its own, or with a dedicated PatientPledge Champion.",
    shot: "notify",
    warm: true,
    problem: "Participants rarely leave studies because of the science. They leave because of the trips, the paperwork and the costs they carry along the way.",
    twoWays: [
      { col: "PatientPledge", what: "Concierge support requested and tracked in MEDORA.", best: "Teams that prefer to coordinate with less hands-on support." },
      { col: "PatientPledge + Champion", what: "Everything in PatientPledge, plus a dedicated human point of contact.", best: "Studies needing high-touch participant support." },
    ],
    covers: [
      { k: "Travel support", v: "journeys to and from study visits." },
      { k: "Scheduling support", v: "aligning appointments and travel." },
      { k: "Reimbursement support", v: "helping participants with eligible study costs." },
      { k: "Human support", v: "a PatientPledge Champion, when you want one." },
      { k: "Multilingual, 24/7 assistance", v: "" },
    ],
    how: [
      "Request concierge support for a participant.",
      "Share the required patient information securely with the concierge team.",
      "Record and track travel and reimbursements with a traceable history.",
      "See the status of every request.",
    ],
    faqs: [
      { q: "Is PatientPledge software or a service?", a: "Both. It is a service delivered through the MEDORA platform, available with or without a PatientPledge Champion." },
    ],
  },
};

export const HORIZON = {
  econsent: {
    slug: "econsent",
    nav: "eConsent",
    fig: "eCONSENT",
    seo: { title: "eConsent | MEDORA", desc: "Digital consent, designed for clarity. On the Horizon." },
    h1: "Digital consent, designed for clarity.",
    designed: [
      "Present consent information in plain language, step by step.",
      "Let participants take the time they need, and revisit what they signed.",
      "Keep a traceable record of what was presented and when.",
    ],
    why: "Consent is the participant's first experience of a study. When it is rushed or dense, it sets the tone for everything that follows.",
  },
  telehealth: {
    slug: "telehealth",
    nav: "Telehealth",
    fig: "TELEHEALTH",
    seo: { title: "Telehealth | MEDORA", desc: "Remote visits within the study workflow. On the Horizon." },
    h1: "Remote visits within the study workflow.",
    designed: [
      "Run remote visits from the same visit record as home and site visits.",
      "Keep source capture, documents and oversight in one place.",
      "Give participants a lighter option where the protocol allows it.",
    ],
    why: "Not every visit needs a journey. When a remote visit is clinically appropriate, it should sit inside the study workflow, not beside it.",
  },
};

export const WHY = {
  seo: {
    title: "Why MEDORA | Secure, Compliant Home & Hybrid Trial Platform",
    desc: "Built from the field for home and hybrid trials: offline eSource, BYOD-safe scanning, patient concierge, and alignment with GDPR, HIPAA, 21 CFR Part 11 and ICH GCP.",
  },
  rail: [
    { id: "why", label: "Why MEDORA" },
    { id: "differentiators", label: "Key Differentiators" },
    { id: "security", label: "Security & Compliance" },
    { id: "quality", label: "Quality" },
    { id: "technology", label: "Technology & Architecture" },
  ],
  why: {
    h1: "Built from the field, not just the boardroom.",
    body: [
      "MEDORA was shaped by teams who deliver home and hybrid clinical trial visits every day, across countries, languages and connectivity conditions. Every capability answers a real problem those teams met in the field.",
      "Missed signals in rural homes. Source documents on personal phones. Participants overwhelmed by logistics. MEDORA exists to remove that friction, so the trial can go to the patient without anyone losing control.",
    ],
  },
  differentiators: {
    h: "What makes MEDORA different.",
    items: [
      { k: "Built for home and hybrid visits", v: "Not a site-centric system stretched to fit.", vis: "Visit calendar with Home / Hybrid tags." },
      { k: "Works when the network doesn't", v: "Offline source data collection with secure sync.", vis: "Offline indicator on eSource form." },
      { k: "BYOD without the usual risk", v: "Scans go straight to the cloud, never onto the device.", vis: "Scan-to-cloud animation." },
      { k: "Software and service in one", v: "PatientPledge, with optional human Champions.", vis: "Concierge request card." },
      { k: "Global by design", v: "Multi-language support and 24/7 multilingual assistance.", vis: "Language switcher UI crop." },
      { k: "Privacy-safe reporting", v: "Real-time dashboards, with CSV exports free of PHI and PII.", vis: "Dashboard with export button." },
    ],
  },
  security: {
    h: "Compliance is the foundation, not the pitch.",
    regs: [
      { k: "GDPR", v: "Personal data handled lawfully, minimally and securely." },
      { k: "HIPAA", v: "Safeguards for protected health information." },
      { k: "21 CFR Part 11", v: "Trustworthy electronic records with audit trails." },
      { k: "ICH GCP", v: "Supporting Good Clinical Practice in trial conduct." },
    ],
    isoDetail: [
      { k: "ISO/IEC 27001", v: "information security" },
      { k: "ISO/IEC 27701", v: "privacy information management" },
      { k: "ISO/IEC 27018", v: "protection of PII in public cloud" },
    ],
    controls: [
      "Role-based access control",
      "Complete audit trails",
      "Encryption of data",
      "Secure cloud storage",
      "No local storage of scanned documents",
      "Secure offline data sync",
      "Exports free of PHI and PII",
    ],
  },
  quality: {
    h: "Quality built into how we build.",
    body: "MEDORA is developed with the discipline regulated clinical research demands. Requirements are documented, changes are controlled and releases are tested before they reach a study.",
    pillars: [
      "Documented development lifecycle",
      "Controlled change management",
      "Testing before release",
      "Training and support for users",
    ],
    loop: ["Plan", "Build", "Verify", "Release", "Improve"],
  },
  technology: {
    h: "Modern technology for regulated clinical work.",
    items: [
      { k: "Cloud-based", v: "Secure, scalable infrastructure, accessible from anywhere." },
      { k: "Web + mobile", v: "A secure web platform for study teams and a native Android/iOS app for clinicians." },
      { k: "Offline-resilient", v: "Source data capture continues without connectivity." },
      { k: "Secure by design", v: "Access control, audit trails and encryption throughout." },
      { k: "Multilingual", v: "Built for studies across countries and languages." },
      { k: "Privacy-aware data handling", v: "Human-readable eSource copies and CSV exports with no PHI or PII." },
    ],
  },
};

export const RESOURCES = {
  seo: { title: "Resources | MEDORA", desc: "Insights for home and hybrid clinical trials." },
  h1: "Insights for home and hybrid clinical trials.",
  filters: ["All", "Case Studies", "Whitepaper", "Checklists", "FAQs"],
  items: [
    { tag: "PAPER 01", kind: "Whitepaper", title: "Taking Trials Home, Safely", summary: "A practical guide to secure data, documents and patient support in hybrid clinical trials.", gated: true, href: "/resources/whitepaper" },
    { tag: "CHECKLIST 01", kind: "Checklists", title: "Home Visit eSource Readiness Checklist", summary: "Prepare clinicians, devices and processes for offline-capable source capture.", gated: true, href: "/resources/compliance-checklists" },
    { tag: "CHECKLIST 02", kind: "Checklists", title: "BYOD Source Document Checklist", summary: "Controls to consider before clinicians use personal devices.", gated: true, href: "/resources/compliance-checklists" },
    { tag: "CHECKLIST 03", kind: "Checklists", title: "Patient Concierge Privacy Checklist", summary: "Handling patient information securely in travel and reimbursement support.", gated: true, href: "/resources/compliance-checklists" },
    { tag: "CHECKLIST 04", kind: "Checklists", title: "Hybrid Study Inspection-Readiness Checklist", summary: "Make sure home-visit records stand up to audit.", gated: true, href: "/resources/compliance-checklists" },
    { tag: "FAQ", kind: "FAQs", title: "Frequently asked questions", summary: "Platform, data and documents, PatientPledge, security and getting started.", href: "/resources/faqs" },
  ],
  whitepaper: {
    seo: { title: "Whitepaper: Taking Trials Home, Safely | MEDORA" },
    title: "Taking Trials Home, Safely: A Practical Guide to Secure Data, Documents and Patient Support in Hybrid Clinical Trials",
    summary: "Home and hybrid visits improve access and retention, but introduce new risks around offline data, personal devices and patient logistics. This paper outlines practical ways to manage them.",
    learn: [
      "Where data integrity breaks down in home visits.",
      "How to approach BYOD without compromising source documents.",
      "Designing patient support that reduces dropout.",
      "Keeping hybrid studies aligned with GDPR, HIPAA, 21 CFR Part 11 and ICH GCP.",
    ],
  },
  checklists: {
    seo: { title: "Compliance Checklists for Hybrid Trials | MEDORA" },
    items: [
      { k: "Home Visit eSource Readiness Checklist", v: "Prepare clinicians, devices and processes for offline-capable source capture." },
      { k: "BYOD Source Document Checklist", v: "Controls to consider before clinicians use personal devices." },
      { k: "Patient Concierge Privacy Checklist", v: "Handling patient information securely in travel and reimbursement support." },
      { k: "Hybrid Study Inspection-Readiness Checklist", v: "Make sure home-visit records stand up to audit." },
    ],
    note: "All checklists must be reviewed by MEDORA's QA/regulatory team before publication.",
  },
  faqs: {
    seo: { title: "FAQs | MEDORA" },
    groups: [
      {
        theme: "Platform",
        qa: [
          { q: "What is MEDORA?", a: "A secure platform for home and hybrid clinical trials, connecting visit management, eSource, secure scanning and patient concierge." },
          { q: "Who uses MEDORA?", a: "Sponsors, CROs and sites on the secure web platform, and clinicians on the Android/iOS app, supported by PatientPledge concierge teams." },
          { q: "Is there a mobile app?", a: "Yes, an Android and iOS app for clinicians." },
          { q: "Which languages are supported?", a: "MEDORA offers multi-language support for global studies." },
        ],
      },
      {
        theme: "Data & documents",
        qa: [
          { q: "Does the app work offline?", a: STD.offline },
          { q: "Are scanned documents stored on the device?", a: "No. They are converted to PDF and uploaded directly to the cloud." },
          { q: "Can we export data?", a: STD.exports },
        ],
      },
      {
        theme: "PatientPledge",
        qa: [
          { q: "What does PatientPledge include?", a: "Travel, scheduling and reimbursement support, with or without a dedicated PatientPledge Champion." },
          { q: "Is PatientPledge software or a service?", a: "Both." },
        ],
      },
      {
        theme: "Security & compliance",
        qa: [
          { q: "Which regulations is MEDORA aligned with?", a: "GDPR, HIPAA, 21 CFR Part 11 and ICH GCP." },
          { q: "Is MEDORA ISO certified?", a: STD.iso },
        ],
      },
      {
        theme: "Getting started",
        qa: [
          { q: "How do I see MEDORA in action?", a: "Request a demo and we'll tailor it to your study." },
          { q: "Is support available?", a: "Yes, 24/7 multilingual global support." },
        ],
      },
    ],
  },
};

export const ABOUT = {
  seo: { title: "About MEDORA", desc: "Bringing clinical trials to patients, securely." },
  company: {
    h1: "Bringing clinical trials to patients, securely.",
    mission:
      "To make participating in clinical research easier for patients, and running it more controlled for everyone else.",
    story:
      "MEDORA was born inside real home and hybrid trial delivery. After years of supporting mobile visits across countries, the team saw the same problems repeat: fragmented visit coordination, paper that travelled too far, and participants carrying too much of the burden. MEDORA was built to solve them.",
    presence: "Based in the United Kingdom, supporting studies worldwide.",
    values: [
      { k: "Patients first", v: "Every feature should reduce someone's burden." },
      { k: "Integrity in every record", v: "Data should be trustworthy by default." },
      { k: "Built from the field", v: "Real visits guide real decisions." },
      { k: "Secure without friction", v: "Protection that doesn't slow people down." },
    ],
  },
  approach: {
    h: "How we build MEDORA.",
    items: [
      { k: "Listen to the field", v: "Clinicians, coordinators and study teams shape the roadmap." },
      { k: "Design for real conditions", v: "Poor signal, personal devices and many languages are the norm, not edge cases." },
      { k: "Compliance by design", v: "Privacy, traceability and access control are designed in from the start." },
      { k: "Release with care", v: "Documented, tested and controlled changes." },
    ],
    loop: ["Field", "Feedback", "Build", "Verify", "Release"],
  },
  careers: {
    seo: { title: "Careers at MEDORA" },
    h1: "Build technology that brings trials closer to patients.",
    why: ["Meaningful work in clinical research", "Global impact", "A product built from real field needs"],
    how: "Collaborative, quality-minded and patient-focused.",
    empty: "No open roles right now. Send us your CV anyway.",
  },
  contact: {
    seo: { title: "Contact MEDORA" },
    h1: "Let's talk about your study.",
    office: "United Kingdom: 71\u201375 Shelton Street, London, WC2H 9JQ.",
    support: "24/7 global support for active studies.",
    topics: ["Demo", "Partnership", "Support", "Careers", "Other"],
    success: "Thanks for reaching out. Our team will get back to you shortly.",
  },
};

export const DEMO = {
  seo: { title: "Request a MEDORA Demo", desc: "Book a 30-minute MEDORA walkthrough tailored to your studies, countries and visit model." },
  h1: "See MEDORA run a real home visit.",
  sub: "A focused 30-minute walkthrough, tailored to your studies.",
  see: [
    "A visit scheduled, captured offline and reviewed.",
    "A paper document scanned straight to the cloud.",
    "A PatientPledge concierge request from start to finish.",
    "Real-time dashboards for your countries.",
  ],
  success:
    "Thank you. Our team will be in touch shortly to schedule your demo.",
};

export const CTA_BAND = {
  fig: "NEXT STEP",
  h: "See a home visit run end to end in MEDORA.",
  sub: "A 30-minute walkthrough tailored to your studies, countries and visit model.",
  primary: "Request a Demo",
  secondary: "Download the Whitepaper",
};

export const FOOTER = {
  columns: [
    { head: "Platform", links: MENU[0].items.slice(0, 4) },
    { head: "Solutions", links: MENU[1].items },
    { head: "Capabilities", links: MENU[2].items.slice(0, 4) },
    {
      head: "Company",
      links: [
        { label: "About", href: "/about" },
        { label: "Careers", href: "/about/careers" },
        { label: "Contact", href: "/about/contact" },
        { label: "Request a Demo", href: "/request-a-demo" },
      ],
    },
  ],
  office: "United Kingdom: 71\u201375 Shelton Street, London, WC2H 9JQ.",
  legal: ["Privacy Policy", "Terms of Use"],
  social: ["LinkedIn", "YouTube"],
};
