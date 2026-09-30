import React, { useState } from "react";
import { Arrow } from "../components/icons";
import { Section } from "../components/patterns";
import { CAPABILITY_CHIPS, DEMO, STD } from "../content/content";
import { Home } from "./Home";

function DemoPage() {
  const [sent, setSent] = useState(false);
  return (
    <Section n={1} name="REQUEST A DEMO" style={{ borderTop: 0 }}>
      <div className="pl-grid2" style={{ alignItems: "start", marginTop: 0 }}>
        <div>
          <h1 className="pl-h1">{DEMO.h1}</h1>
          <p className="pl-lede" style={{ marginTop: 22 }}>{DEMO.sub}</p>
          <h3 className="pl-h3" style={{ marginTop: 34 }}>What you'll see</h3>
          <ul className="pl-bullets" style={{ marginTop: 14 }}>
            {DEMO.see.map((s) => <li key={s}>{s}</li>)}
          </ul>
          <div className="pl-slot" style={{ marginTop: 26 }}>TESTIMONIAL — ONE APPROVED QUOTE.</div>
          <div className="pl-chips" style={{ marginTop: 26 }}>
            {STD.chips.map((c) => <span className="pl-chip" key={c}><i />{c}</span>)}
          </div>
        </div>

        {sent ? (
          <div className="pl-success">
            <b>{DEMO.success}</b>
            Download the Whitepaper · Read a case study.
          </div>
        ) : (
          <form className="pl-form" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
            <div className="pl-row2">
              <div className="pl-field"><label htmlFor="d-f">FIRST NAME <span className="pl-req">*</span></label><input id="d-f" required /></div>
              <div className="pl-field"><label htmlFor="d-l">LAST NAME <span className="pl-req">*</span></label><input id="d-l" required /></div>
            </div>
            <div className="pl-field"><label htmlFor="d-e">WORK EMAIL <span className="pl-req">*</span></label><input id="d-e" type="email" required /></div>
            <div className="pl-row2">
              <div className="pl-field"><label htmlFor="d-p">PHONE</label><input id="d-p" type="tel" /></div>
              <div className="pl-field"><label htmlFor="d-c">COMPANY <span className="pl-req">*</span></label><input id="d-c" required /></div>
            </div>
            <div className="pl-row2">
              <div className="pl-field"><label htmlFor="d-j">JOB TITLE <span className="pl-req">*</span></label><input id="d-j" required /></div>
              <div className="pl-field">
                <label htmlFor="d-o">ORGANISATION TYPE <span className="pl-req">*</span></label>
                <select id="d-o" required defaultValue="">
                  <option value="" disabled>Select…</option>
                  {["Sponsor", "CRO", "Site", "Other"].map((o) => <option key={o}>{o}</option>)}
                </select>
              </div>
            </div>
            <div className="pl-row2">
              <div className="pl-field"><label htmlFor="d-co">COUNTRIES OF INTEREST</label><input id="d-co" placeholder="Comma separated" /></div>
              <div className="pl-field">
                <label htmlFor="d-v">VISIT MODEL</label>
                <select id="d-v" defaultValue="Not sure">
                  {["Home", "Hybrid", "Site", "Not sure"].map((o) => <option key={o}>{o}</option>)}
                </select>
              </div>
            </div>
            <div className="pl-field">
              <label>INTERESTED IN</label>
              <div className="pl-checkgrid">
                {CAPABILITY_CHIPS.map((c) => (
                  <label className="pl-check" key={c.label}>
                    <input type="checkbox" />
                    <span>{c.label}{!c.live && <> <em style={{ color: "var(--muted)", fontStyle: "normal" }}>({STD.horizon})</em></>}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="pl-field"><label htmlFor="d-m">MESSAGE</label><textarea id="d-m" /></div>
            <label className="pl-check">
              <input type="checkbox" required />
              <span>I consent to the Privacy Policy. <span className="pl-req">*</span></span>
            </label>
            <button className="pl-btn pl-solid" type="submit">Request a Demo <Arrow /></button>
          </form>
        )}
      </div>
    </Section>
  );
}

export { DemoPage };
