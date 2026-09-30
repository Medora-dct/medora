import React from "react";
import { HOME, PLATFORM, WHY, RESOURCES, ABOUT, DEMO, SOLUTIONS, CAPABILITIES, HORIZON } from "./content/content";
import { Section } from "./components/patterns";
import { Right } from "./components/icons";
import { Home } from "./pages/Home";
import { PlatformPage } from "./pages/Platform";
import { SolutionPage } from "./pages/Solution";
import { CapabilityPage } from "./pages/Capability";
import { HorizonPage } from "./pages/Horizon";
import { WhyPage } from "./pages/Why";
import { ResourcesPage, WhitepaperPage, ChecklistsPage, FaqsPage } from "./pages/Resources";
import { AboutPage, CareersPage, ContactPage } from "./pages/About";
import { DemoPage } from "./pages/Demo";
import { LegalPage } from "./pages/Legal";

/* Label shown on the transition panel while each page loads. */
const TITLES = {
  "/": "MEDORA",
  "/platform": "Platform",
  "/solutions/sponsors": "For Sponsors",
  "/solutions/cros": "For CROs",
  "/solutions/sites": "For Sites",
  "/capabilities/study-management": "Study Management",
  "/capabilities/esource": "eSource",
  "/capabilities/secure-scanning": "Secure Scanning",
  "/capabilities/patientpledge": "PatientPledge",
  "/capabilities/econsent": "eConsent",
  "/capabilities/telehealth": "Telehealth",
  "/why-medora": "Why MEDORA",
  "/resources": "Resources",
  "/resources/case-studies": "Case Studies",
  "/resources/whitepaper": "Whitepaper",
  "/resources/compliance-checklists": "Checklists",
  "/resources/faqs": "FAQs",
  "/about": "About",
  "/about/careers": "Careers",
  "/about/contact": "Contact",
  "/request-a-demo": "Request a Demo",
  "/privacy": "Privacy Policy",
  "/terms": "Terms of Use",
};

/* spec 4.9 — a unique title and description per page. */
const SEO = {
  "/": HOME.seo, "/platform": PLATFORM.seo, "/why-medora": WHY.seo, "/resources": RESOURCES.seo,
  "/resources/whitepaper": RESOURCES.whitepaper.seo, "/resources/compliance-checklists": RESOURCES.checklists.seo,
  "/resources/faqs": RESOURCES.faqs.seo, "/about": ABOUT.seo, "/about/careers": ABOUT.careers.seo,
  "/about/contact": ABOUT.contact.seo, "/request-a-demo": DEMO.seo,
  "/solutions/sponsors": SOLUTIONS.sponsors.seo, "/solutions/cros": SOLUTIONS.cros.seo, "/solutions/sites": SOLUTIONS.sites.seo,
  "/capabilities/study-management": CAPABILITIES["study-management"].seo,
  "/capabilities/esource": CAPABILITIES.esource.seo,
  "/capabilities/secure-scanning": CAPABILITIES["secure-scanning"].seo,
  "/capabilities/patientpledge": CAPABILITIES.patientpledge.seo,
  "/capabilities/econsent": HORIZON.econsent.seo, "/capabilities/telehealth": HORIZON.telehealth.seo,
};

function renderPage(path, onGo) {
  if (path === "/") return <Home onGo={onGo} />;
  if (path === "/platform") return <PlatformPage onGo={onGo} />;
  if (path === "/why-medora") return <WhyPage onGo={onGo} />;
  if (path === "/resources") return <ResourcesPage onGo={onGo} />;
  if (path === "/resources/whitepaper") return <WhitepaperPage />;
  if (path === "/resources/compliance-checklists") return <ChecklistsPage />;
  if (path === "/resources/faqs") return <FaqsPage />;
  if (path === "/resources/case-studies") {
    return (
      <Section n={1} name="CASE STUDIES" style={{ borderTop: 0 }}>
        <h1 className="pl-h1">Real home and hybrid studies, real results.</h1>
        <div className="pl-slot" style={{ marginTop: 30 }}>
          NO APPROVED CASE STUDIES SUPPLIED.<br />
          LISTING CARDS: TAG · STUDY-TYPE CHIPS · ONE HEADLINE RESULT · READ.<br />
          ANONYMISE SPONSOR AND SITE NAMES UNLESS WRITTEN PERMISSION IS HELD.
        </div>
      </Section>
    );
  }
  if (path === "/about") return <AboutPage />;
  if (path === "/about/careers") return <CareersPage />;
  if (path === "/about/contact") return <ContactPage />;
  if (path === "/request-a-demo") return <DemoPage />;
  if (path === "/privacy") return <LegalPage title="Privacy Policy" />;
  if (path === "/terms") return <LegalPage title="Terms of Use" />;

  const sol = path.match(/^\/solutions\/(.+)$/);
  if (sol && SOLUTIONS[sol[1]]) return <SolutionPage data={SOLUTIONS[sol[1]]} onGo={onGo} />;

  const cap = path.match(/^\/capabilities\/(.+)$/);
  if (cap && CAPABILITIES[cap[1]]) return <CapabilityPage data={CAPABILITIES[cap[1]]} onGo={onGo} />;
  if (cap && HORIZON[cap[1]]) return <HorizonPage data={HORIZON[cap[1]]} onGo={onGo} />;

  return (
    <Section n={1} name="NOT FOUND" style={{ borderTop: 0 }}>
      <h1 className="pl-h1">That page doesn't exist.</h1>
      <button className="pl-link" style={{ marginTop: 20 }} onClick={() => onGo("/")}>
        Back to the homepage <Right />
      </button>
    </Section>
  );
}

export { TITLES, SEO, renderPage };
