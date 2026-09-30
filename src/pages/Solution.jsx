import React from "react";
import { HubDiagram } from "../components/diagrams";
import { Arrow } from "../components/icons";
import { DayTimeline, FaqBlock, Fig, Section, Title } from "../components/patterns";
import { CAPABILITIES, PLATFORM } from "../content/content";

function SolutionPage({ data, onGo }) {
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
              <button className="pl-btn pl-ghost" onClick={() => onGo("/platform#how-it-works")}>See how it works <Arrow /></button>
            </div>
          </div>
          <div className="pl-herovis">
            <div className="pl-laptop">
              <div className="pl-laptop-inner"><HubDiagram spokes={PLATFORM.connected.spokes} /></div>
              <div className="pl-laptop-foot" />
            </div>
            <div className="pl-previewnote">{data.visual}</div>
          </div>
        </div>
      </section>

      <Section n={2} name="THE CHALLENGE">
        <div className="pl-grid3">
          {data.challenges.map((c) => (
            <div className="pl-tile" key={c.t} data-accent="1"><b>{c.t}</b><p>{c.b}</p></div>
          ))}
        </div>
      </Section>

      <Section n={3} name="HOW MEDORA HELPS">
        <Title>How MEDORA helps</Title>
        <ul className="pl-bullets">
          {data.helps.map((h) => <li key={h}>{h}</li>)}
        </ul>
      </Section>

      <Section n={4} name="A DAY WITH MEDORA">
        <Title>A day with MEDORA</Title>
        <DayTimeline items={data.day} />
      </Section>

      <Section n={5} name="CAPABILITIES">
        <Title>Relevant capabilities</Title>
        <div className="pl-chips" style={{ marginTop: 26 }}>
          {data.caps.map((c) => <span className="pl-chip" key={c}><i />{c}</span>)}
        </div>
        <div className="pl-slot" style={{ marginTop: 34 }}>
          TESTIMONIAL — APPROVED QUOTE, ATTRIBUTED BY ROLE AND ORGANISATION TYPE.
        </div>
      </Section>

      <Section n={6} name="FAQ">
        <Title>Questions</Title>
        <FaqBlock faqs={data.faqs} />
      </Section>
    </>
  );
}

/* ==========================================================================
   Capability template (spec 8)
   ========================================================================== */

export { SolutionPage };
