import React, { useState } from "react";
import { Arrow } from "../components/icons";
import { Fig, HorizonBadge, Section, Title } from "../components/patterns";

/* spec 8 — On the Horizon template */
function HorizonPage({ data, onGo }) {
  const [sent, setSent] = useState(false);
  return (
    <>
      <section className="pl-sec" style={{ borderTop: 0 }}>
        <Fig n={1} name={data.fig} />
        <div className="pl-hero">
          <div>
            <div style={{ marginBottom: 20 }}><HorizonBadge /></div>
            <h1 className="pl-h1">{data.h1}</h1>
          </div>
          <div className="pl-hero-right">
            <p className="pl-lede">{data.why}</p>
          </div>
        </div>
      </section>

      <Section n={2} name="WHAT IT'S BEING DESIGNED TO DO">
        <Title>What it's being designed to do</Title>
        <ul className="pl-bullets">
          {data.designed.map((d) => <li key={d}>{d}</li>)}
        </ul>
      </Section>

      <Section n={3} name="BE FIRST TO KNOW">
        <div className="pl-grid2" style={{ alignItems: "start" }}>
          <div>
            <Title>Be first to know.</Title>
            <p className="pl-sub" style={{ marginLeft: 0 }}>
              Tell us you're interested and we'll let you know when {data.nav} is ready for study use.
            </p>
          </div>
          {sent ? (
            <div className="pl-success"><b>Thank you.</b>We'll be in touch when there is something to show.</div>
          ) : (
            <form className="pl-form" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
              <div className="pl-field">
                <label htmlFor="h-name">NAME <span className="pl-req">*</span></label>
                <input id="h-name" required />
              </div>
              <div className="pl-field">
                <label htmlFor="h-email">WORK EMAIL <span className="pl-req">*</span></label>
                <input id="h-email" type="email" required />
              </div>
              <label className="pl-check">
                <input type="checkbox" required />
                <span>I consent to the Privacy Policy. <span className="pl-req">*</span></span>
              </label>
              <button className="pl-btn pl-solid" type="submit">Keep me posted <Arrow /></button>
            </form>
          )}
        </div>
      </Section>
    </>
  );
}

/* ==========================================================================
   Why MEDORA (spec 9)
   ========================================================================== */

export { HorizonPage };
