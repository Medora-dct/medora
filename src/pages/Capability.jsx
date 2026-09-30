import React from "react";
import { ByodDiagram } from "../components/diagrams";
import { Arrow } from "../components/icons";
import { FaqBlock, Fig, Section, Title } from "../components/patterns";
import { ASSETS, STD } from "../content/content";

function CapabilityPage({ data, onGo }) {
  return (
    <>
      <section className="pl-sec" style={{ borderTop: 0 }}>
        <Fig n={1} name={data.fig} />
        <div className="pl-hero">
          <h1 className="pl-h1">{data.h1}</h1>
          <div className="pl-hero-right">
            <p className="pl-lede">{data.sub}</p>
            <div className="pl-ctas">
              <button className="pl-btn pl-solid" onClick={() => onGo("/request-a-demo")}>Request a Demo <Arrow /></button>
            </div>
            <div className="pl-phone" style={{ maxWidth: 190 }}>
              <img src={ASSETS[data.shot]} alt={`${data.nav} in the MEDORA app`} loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      <Section n={2} name="THE PROBLEM">
        <p className="pl-h2" style={{ maxWidth: "24ch" }}>{data.problem}</p>
      </Section>

      <Section n={3} name="HOW IT WORKS">
        <Title>How it works</Title>
        <div className="pl-steps">
          {data.how.map((h, i) => (
            <div className="pl-step" key={h} style={{ gridTemplateColumns: "52px 1fr" }}>
              <div className="pl-stepnum">{String(i + 1).padStart(2, "0")}</div>
              <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.6, color: "var(--body)" }}>{h}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section n={4} name="FEATURES">
        <Title>Features</Title>
        <div className="pl-kv">
          {data.features.map((f) => (
            <div className="pl-kvrow" key={f.k}><b>{f.k}</b><span>{f.v}</span></div>
          ))}
        </div>
      </Section>

      {data.byod && (
        <Section n={5} name="BYOD, WITHOUT THE RISK">
          <Title>BYOD, without the risk.</Title>
          <p className="pl-sub" style={{ marginLeft: 0 }}>{STD.scanning}</p>
          <div style={{ marginTop: 34 }}><ByodDiagram /></div>
        </Section>
      )}

      {data.twoWays && (
        <Section n={5} name="TWO WAYS TO USE PATIENTPLEDGE">
          <Title>Two ways to use PatientPledge.</Title>
          <div className="pl-grid2">
            {data.twoWays.map((w, i) => (
              <div className="pl-card" key={w.col} style={{ borderTop: `2px solid ${i ? "var(--accent)" : "var(--line)"}` }}>
                <div className="pl-cardtag">{w.col.toUpperCase()}</div>
                <p style={{ margin: "0 0 16px", fontSize: 15, lineHeight: 1.6, color: "var(--body)" }}>{w.what}</p>
                <div className="pl-previewnote">BEST FOR</div>
                <p style={{ margin: "6px 0 0", fontSize: 14, lineHeight: 1.55, color: "var(--body)" }}>{w.best}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {data.covers && (
        <Section n={6} name="WHAT IT COVERS">
          <Title>What it covers</Title>
          <div className="pl-kv">
            {data.covers.map((c) => (
              <div className="pl-kvrow" key={c.k}><b>{c.k}</b><span>{c.v}</span></div>
            ))}
          </div>
        </Section>
      )}

      {data.benefits && (
        <Section n={5} name="WHO BENEFITS">
          <Title>Who benefits</Title>
          <div className="pl-grid2">
            {data.benefits.map((b) => (
              <div className="pl-tile" key={b.k} data-accent="1"><b>{b.k}</b><p>{b.v}</p></div>
            ))}
          </div>
        </Section>
      )}

      {data.security && (
        <Section n={6} name="SECURITY NOTES">
          <Title>Security notes</Title>
          <div className="pl-chips" style={{ marginTop: 24 }}>
            {data.security.map((s) => <span className="pl-chip" key={s}><i />{s}</span>)}
          </div>
        </Section>
      )}

      <Section n={7} name="FAQ">
        <Title>Questions</Title>
        <FaqBlock faqs={data.faqs} />
      </Section>
    </>
  );
}

/* spec 8 — On the Horizon template */

export { CapabilityPage };
