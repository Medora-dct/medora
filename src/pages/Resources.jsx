import React, { useState } from "react";
import { Arrow, Lock } from "../components/icons";
import { Accordion, Section } from "../components/patterns";
import { RESOURCES } from "../content/content";

function ResourcesPage({ onGo }) {
  const [f, setF] = useState("All");
  const list = f === "All" ? RESOURCES.items : RESOURCES.items.filter((r) => r.kind === f);
  return (
    <Section n={1} name="RESOURCES" style={{ borderTop: 0 }}>
      <h1 className="pl-h1">{RESOURCES.h1}</h1>
      <div className="pl-filters">
        {RESOURCES.filters.map((x) => (
          <button key={x} className="pl-filter" data-on={f === x ? "1" : "0"} onClick={() => setF(x)}>
            {x.toUpperCase()}
          </button>
        ))}
      </div>
      {f === "Case Studies" || f === "All" ? (
        <div className="pl-slot" style={{ marginTop: 26 }}>
          CASE STUDY LISTING — NO APPROVED CASE STUDIES SUPPLIED.<br />
          CARDS SHOW TAG, STUDY-TYPE CHIPS, ONE HEADLINE RESULT. NO LOGOS.
        </div>
      ) : null}
      <div className="pl-reslist">
        {list.map((r) => (
          <button className="pl-rescard" key={r.tag} onClick={() => onGo(r.href)}>
            <span className="pl-restag">{r.tag}{r.gated && <Lock />}</span>
            <b>{r.title}</b>
            <p>{r.summary}</p>
          </button>
        ))}
      </div>
    </Section>
  );
}

/* spec 4.6 — gated download form */

/* spec 4.6 — gated download form */
function GatedForm({ cta = "Get the download" }) {
  const [sent, setSent] = useState(false);
  if (sent) {
    return (
      <div className="pl-success">
        <b>Your download is ready.</b>
        We've also emailed you a copy. Want to see it in practice? Book a demo.
      </div>
    );
  }
  return (
    <form className="pl-form" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
      <div className="pl-row2">
        <div className="pl-field">
          <label htmlFor="g-f">FIRST NAME <span className="pl-req">*</span></label>
          <input id="g-f" required />
        </div>
        <div className="pl-field">
          <label htmlFor="g-l">LAST NAME <span className="pl-req">*</span></label>
          <input id="g-l" required />
        </div>
      </div>
      <div className="pl-field">
        <label htmlFor="g-e">WORK EMAIL <span className="pl-req">*</span></label>
        <input id="g-e" type="email" required />
      </div>
      <div className="pl-row2">
        <div className="pl-field">
          <label htmlFor="g-c">COMPANY <span className="pl-req">*</span></label>
          <input id="g-c" required />
        </div>
        <div className="pl-field">
          <label htmlFor="g-r">ROLE <span className="pl-req">*</span></label>
          <input id="g-r" required />
        </div>
      </div>
      <div className="pl-row2">
        <div className="pl-field">
          <label htmlFor="g-o">ORGANISATION TYPE <span className="pl-req">*</span></label>
          <select id="g-o" required defaultValue="">
            <option value="" disabled>Select…</option>
            {["Sponsor", "CRO", "Site", "Other"].map((o) => <option key={o}>{o}</option>)}
          </select>
        </div>
        <div className="pl-field">
          <label htmlFor="g-co">COUNTRY <span className="pl-req">*</span></label>
          <input id="g-co" required />
        </div>
      </div>
      <label className="pl-check">
        <input type="checkbox" required />
        <span>I consent to the Privacy Policy. <span className="pl-req">*</span></span>
      </label>
      <label className="pl-check">
        <input type="checkbox" />
        <span>Send me occasional MEDORA updates.</span>
      </label>
      <button className="pl-btn pl-solid" type="submit">{cta} <Arrow /></button>
    </form>
  );
}

function WhitepaperPage() {
  const w = RESOURCES.whitepaper;
  return (
    <Section n={1} name="WHITEPAPER" style={{ borderTop: 0 }}>
      <div className="pl-grid2" style={{ alignItems: "start", marginTop: 0 }}>
        <div>
          <div className="pl-eyebrow">PAPER 01 · GATED</div>
          <h1 className="pl-h1" style={{ fontSize: "clamp(28px,3.4vw,40px)" }}>{w.title}</h1>
          <p className="pl-lede" style={{ marginTop: 22 }}>{w.summary}</p>
          <h3 className="pl-h3" style={{ marginTop: 34 }}>What you'll learn</h3>
          <ul className="pl-bullets" style={{ marginTop: 14 }}>
            {w.learn.map((l) => <li key={l}>{l}</li>)}
          </ul>
        </div>
        <GatedForm cta="Download the whitepaper" />
      </div>
    </Section>
  );
}

function ChecklistsPage() {
  const c = RESOURCES.checklists;
  return (
    <Section n={1} name="COMPLIANCE CHECKLISTS" style={{ borderTop: 0 }}>
      <h1 className="pl-h1">Compliance checklists for hybrid trials.</h1>
      <div className="pl-grid2" style={{ alignItems: "start" }}>
        <div>
          <div className="pl-kv" style={{ marginTop: 0 }}>
            {c.items.map((x) => (
              <div className="pl-kvrow" key={x.k}><b>{x.k}</b><span>{x.v}</span></div>
            ))}
          </div>
          <div className="pl-slot" style={{ marginTop: 26 }}>{c.note.toUpperCase()}</div>
        </div>
        <GatedForm cta="Get the checklists" />
      </div>
    </Section>
  );
}

const FaqsPage = () => (
  <Section n={1} name="FAQS" style={{ borderTop: 0 }}>
    <h1 className="pl-h1">Frequently asked questions.</h1>
    <div style={{ marginTop: 30 }}>
      <Accordion groups={RESOURCES.faqs.groups} />
    </div>
  </Section>
);

/* ==========================================================================
   About, Careers, Contact, Demo (spec 11–12)
   ========================================================================== */

export { ResourcesPage, GatedForm, WhitepaperPage, ChecklistsPage, FaqsPage };
