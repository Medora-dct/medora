import React from "react";
import { AnchorRail } from "../components/AnchorRail";
import { LoopDiagram } from "../components/diagrams";
import { BenchPattern, Section, Title } from "../components/patterns";
import { PLATFORM, STD, WHY } from "../content/content";

function WhyPage({ onGo }) {
  return (
    <AnchorRail items={WHY.rail}>
      <Section n={1} name="WHY MEDORA" id="why" style={{ borderTop: 0 }}>
        <h1 className="pl-h1">{WHY.why.h1}</h1>
        {WHY.why.body.map((p) => (
          <p className="pl-lede" style={{ marginTop: 22 }} key={p}>{p}</p>
        ))}
      </Section>

      <Section n={2} name="KEY DIFFERENTIATORS" id="differentiators">
        <Title>{WHY.differentiators.h}</Title>
        <BenchPattern
          items={WHY.differentiators.items.map((d, i) => ({
            label: d.k, copy: d.v, preview: d.vis,
            shot: ["calendar", "tasklist", "login", "notify", "calendar", "tasklist"][i],
          }))}
          onGo={onGo}
        />
      </Section>

      <Section n={3} name="SECURITY & COMPLIANCE" id="security">
        <Title>{WHY.security.h}</Title>
        <div className="pl-grid2">
          {WHY.security.regs.map((r) => (
            <div className="pl-tile" key={r.k} data-accent="1"><b>{r.k}</b><p>{r.v}</p></div>
          ))}
        </div>
        <h3 className="pl-h3" style={{ marginTop: 44 }}>Certification status</h3>
        <div className="pl-grid3">
          {WHY.security.isoDetail.map((c) => (
            <div className="pl-card" key={c.k} style={{ borderStyle: "dashed" }}>
              <div className="pl-cardtag">{c.k}</div>
              <p style={{ margin: 0, fontSize: 14, color: "var(--body)" }}>{c.v}</p>
              <div style={{ marginTop: 16 }}><span className="pl-chip" data-live="0"><i />Stage II audit in progress</span></div>
            </div>
          ))}
        </div>
        <p className="pl-sub" style={{ marginLeft: 0 }}>{STD.iso}</p>
        <h3 className="pl-h3" style={{ marginTop: 44 }}>Security controls</h3>
        <div className="pl-chips" style={{ marginTop: 18 }}>
          {WHY.security.controls.map((c) => <span className="pl-chip" key={c}><i />{c}</span>)}
        </div>
      </Section>

      <Section n={4} name="QUALITY" id="quality">
        <Title>{WHY.quality.h}</Title>
        <p className="pl-lede" style={{ marginTop: 18 }}>{WHY.quality.body}</p>
        <div className="pl-grid2">
          {WHY.quality.pillars.map((p) => (
            <div className="pl-tile" key={p} data-accent="1"><b>{p}</b></div>
          ))}
        </div>
        <div style={{ marginTop: 40 }}><LoopDiagram steps={WHY.quality.loop} /></div>
      </Section>

      <Section n={5} name="TECHNOLOGY & ARCHITECTURE" id="technology">
        <Title>{WHY.technology.h}</Title>
        <div className="pl-kv">
          {WHY.technology.items.map((t) => (
            <div className="pl-kvrow" key={t.k}><b>{t.k}</b><span>{t.v}</span></div>
          ))}
        </div>
        <div className="pl-layers">
          {PLATFORM.architecture.layers.map((l) => (
            <div className="pl-layer" key={l.n}><i>{l.n}</i><b>{l.k}</b><span>{l.v}</span></div>
          ))}
        </div>
      </Section>
    </AnchorRail>
  );
}

/* ==========================================================================
   Resources (spec 10)
   ========================================================================== */

export { WhyPage };
