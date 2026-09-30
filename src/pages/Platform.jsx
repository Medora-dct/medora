import React from "react";
import { AnchorRail } from "../components/AnchorRail";
import { LifecycleTrack } from "../components/LifecycleTrack";
import { HubDiagram } from "../components/diagrams";
import { Section, Title } from "../components/patterns";
import { ASSETS, PLATFORM } from "../content/content";

function PlatformPage({ onGo }) {
  return (
    <AnchorRail items={PLATFORM.rail}>
      <Section n={1} name="OVERVIEW" id="overview" style={{ borderTop: 0 }}>
        <h1 className="pl-h1">{PLATFORM.overview.h1}</h1>
        <p className="pl-lede" style={{ marginTop: 24 }}>{PLATFORM.overview.body}</p>
        <div className="pl-kv">
          {PLATFORM.overview.values.map((v) => (
            <div className="pl-kvrow" key={v.k}><b>{v.k}</b><span>{v.v}</span></div>
          ))}
        </div>
        <div className="pl-grid3" style={{ alignItems: "end" }}>
          <div className="pl-phone"><img src={ASSETS.calendar} alt="Clinician app visit calendar" loading="lazy" /></div>
          <div className="pl-phone"><img src={ASSETS.tasklist} alt="Clinician app task list" loading="lazy" /></div>
          <div className="pl-phone"><img src={ASSETS.notify} alt="Notifications and requests" loading="lazy" /></div>
        </div>
      </Section>

      <Section n={2} name="HOW IT WORKS" id="how-it-works">
        <Title>{PLATFORM.steps.h}</Title>
        <div className="pl-steps">
          {PLATFORM.steps.items.map((s) => (
            <div className="pl-step" key={s.n}>
              <div className="pl-stepnum">{s.n}</div>
              <div>
                <h4>{s.name}</h4>
                <p>{s.copy}</p>
              </div>
              <div className="pl-stepby">{s.by.toUpperCase()}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section n={3} name="THE LIFECYCLE" id="lifecycle">
        <Title>{PLATFORM.lifecycle.h}</Title>
        <LifecycleTrack stages={PLATFORM.lifecycle.stages} />
        <p className="pl-sub" style={{ marginLeft: 0 }}>{PLATFORM.lifecycle.footnote}</p>
      </Section>

      <Section n={4} name="CONNECTED" id="connected">
        <Title>{PLATFORM.connected.h}</Title>
        <p className="pl-lede" style={{ marginTop: 18 }}>{PLATFORM.connected.body}</p>
        <div style={{ marginTop: 34 }}><HubDiagram spokes={PLATFORM.connected.spokes} /></div>
        <div className="pl-grid2">
          {PLATFORM.connected.flows.map((f) => (
            <div className="pl-tile" key={f} data-accent="1"><p>{f}</p></div>
          ))}
        </div>
      </Section>

      <Section n={5} name="ARCHITECTURE" id="architecture">
        <Title>{PLATFORM.architecture.h}</Title>
        <div className="pl-layers">
          {PLATFORM.architecture.layers.map((l) => (
            <div className="pl-layer" key={l.n}>
              <i>{l.n}</i><b>{l.k}</b><span>{l.v}</span>
            </div>
          ))}
        </div>
        <p className="pl-sub" style={{ marginLeft: 0 }}>{PLATFORM.architecture.caption}</p>
      </Section>
    </AnchorRail>
  );
}

/* ==========================================================================
   Solutions template (spec 7)
   ========================================================================== */

export { PlatformPage };
