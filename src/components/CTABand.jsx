import React from "react";
import { Walkthrough } from "./Walkthrough";
import { Arrow } from "./icons";
import { Fig, Title } from "./patterns";
import { CTA_BAND } from "../content/content";

/* spec 4.4 — pre-footer CTA band, every page */
const CTABand = ({ onGo }) => (
  <section className="pl-cta">
    <Fig n={99} name={CTA_BAND.fig} />
    <div className="pl-ctainner">
      <div>
        <Title>{CTA_BAND.h}</Title>
        <p className="pl-lede">{CTA_BAND.sub}</p>
        <div className="pl-ctas" style={{ marginTop: 26 }}>
          <button className="pl-btn pl-solid" onClick={() => onGo("/request-a-demo")}>
            {CTA_BAND.primary} <Arrow />
          </button>
          <button className="pl-btn pl-ghost" onClick={() => onGo("/resources/whitepaper")}>
            {CTA_BAND.secondary} <Arrow />
          </button>
        </div>
      </div>
      <Walkthrough />
    </div>
  </section>
);

/* spec 4.7 — sticky left rail, active section highlighted while scrolling */

export { CTABand };
