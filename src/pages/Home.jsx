import React from "react";
import { LifecycleTrack } from "../components/LifecycleTrack";
import WalkingNurseScene from "../components/WalkingNurseScene/WalkingNurseScene";
import { ProblemFlow } from "../components/diagrams";
import { Arrow, Lock, Right } from "../components/icons";
import { AudienceStack, Beliefs, BenchPattern, CaseStudies, Compliance, Fig, PlatformGrid, ProofStats, Section, StatusChip, Testimonials, Title } from "../components/patterns";
import { CAPABILITY_CHIPS, HOME, PLATFORM, RESOURCES, STD } from "../content/content";
import heroImage from "../assets/image-5.png"
import proofImage from "../assets/proof-tablet.jpg";
function Home({ onGo }) {
  return (
    <>
      <section className="pl-sec mt-50" id="hero" style={{ borderTop: 0 }}>
        <img
          className="hero-banner"
          src={heroImage}
          alt="Nurse providing care to a patient at home"
        />
        <div className="pl-hero">
          <div>
            {/* <div className="pl-eyebrow">{HOME.hero.eyebrow.toUpperCase()}</div> */}
            <h1 className="pl-h1">{HOME.hero.h1}</h1>
          </div>
          <div className="pl-hero-right">
            <p className="pl-lede">{HOME.hero.sub}</p>
            <div className="pl-ctas">
              <button className="pl-btn pl-solid" onClick={() => onGo("/request-a-demo")}>
                {HOME.hero.primary} <Arrow />
              </button>
              <button className="pl-btn pl-ghost" onClick={() => onGo("/platform")}>
                {HOME.hero.secondary} <Arrow />
              </button>
            </div>
            <div className="pl-chips">
              {CAPABILITY_CHIPS.map((c) => <StatusChip key={c.label} {...c} />)}
            </div>
            <div className="pl-trustline">
              {STD.chips.join(" · ")} · {STD.isoChips.join(", ")}
            </div>
          </div>
        </div>
      </section>

      <Section name={HOME.problem.fig}>
        <div className="pl-center">
          <Title>{HOME.problem.h}</Title>
          <p className="pl-sub">{HOME.problem.intro}</p>
        </div>
        <div style={{ marginTop: 44 }}><ProblemFlow /></div>
        <div className="pl-grid3">
          {HOME.problem.captions.map((c) => (
            <div className="pl-tile" key={c.t} data-accent="1">
              <b>{c.t}</b>
              <p>{c.b}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section name={HOME.platform.fig}>
        <div className="pl-center">
          <Title>{HOME.platform.h}</Title>
          <p className="pl-sub">{HOME.platform.body}</p>
        </div>
        <PlatformGrid tagline={HOME.platform.tagline} items={HOME.platform.petals}
          foundation={HOME.platform.foundation} onGo={onGo} />
      </Section>

      <Section name={HOME.audiences.fig}>
        <div className="pl-center">
          <Title lead={HOME.audiences.lead}>{HOME.audiences.h}</Title>
          <p className="pl-sub">{HOME.audiences.sub}</p>
        </div>
        <AudienceStack cards={HOME.audiences.cards} onGo={onGo} />
      </Section>

      <Section name={HOME.lifecycleTeaser.fig}>
        <div className="pl-center">
          <Title lead={HOME.lifecycleTeaser.lead}>{HOME.lifecycleTeaser.h}</Title>
          <p className="pl-sub">{HOME.lifecycleTeaser.sub}</p>
        </div>
        <LifecycleTrack stages={PLATFORM.lifecycle.stages} />
        <div style={{ marginTop: 26, textAlign: "center" }}>
          <button className="pl-link" onClick={() => onGo(HOME.lifecycleTeaser.href)}>
            {HOME.lifecycleTeaser.link} <Right />
          </button>
        </div>
      </Section>

      <Section name={HOME.capabilities.fig}>
        <div className="pl-center"><Title>{HOME.capabilities.h}</Title></div>
        <BenchPattern items={HOME.capabilities.items} onGo={onGo} />
      </Section>

      <Section name={HOME.proof.fig}>
        <div className="pl-center"><Title>{HOME.proof.h}</Title></div>
        <ProofStats items={HOME.proof.counters} image={proofImage}
          alt="A clinician reviewing sample status, approvals and alerts on a tablet at the bedside" />
        <Testimonials items={HOME.proof.testimonials} />
        <CaseStudies title={HOME.proof.casesTitle} sub={HOME.proof.casesSub}
          items={HOME.proof.cases} onGo={onGo} />
      </Section>

      <Section name={HOME.principles.fig}>
        <Beliefs title={HOME.principles.h} sub={HOME.principles.sub}
          items={HOME.principles.items} link={HOME.principles.link}
          href={HOME.principles.href} onGo={onGo} />
      </Section>

      <Section name={HOME.trust.fig}>
        <div className="pl-center"><Title>{HOME.trust.h}</Title></div>
        <p className="pl-sub" style={{ textAlign: "center" }}>{HOME.trust.body}</p>
        <Compliance frameworks={STD.frameworks} certifications={STD.certifications} />
        <div style={{ textAlign: "center", marginTop: 30 }}>
          <button className="pl-link" onClick={() => onGo(HOME.trust.href)}>
            {HOME.trust.link} <Right />
          </button>
        </div>
      </Section>

      {/* <Section n={10} name={HOME.resources.fig}>
        <div className="pl-center"><Title>{HOME.resources.h}</Title></div>
        <div className="pl-reslist">
          {RESOURCES.items.slice(0, 3).map((r) => (
            <button className="pl-rescard" key={r.tag} onClick={() => onGo(r.href)}>
              <span className="pl-restag">{r.tag}{r.gated && <Lock />}</span>
              <b>{r.title}</b>
              <p>{r.summary}</p>
            </button>
          ))}
        </div>
      </Section> */}
    </>
  );
}

/* spec 5.5 / 6.3 — horizontal track, active stage opens a panel */

export { Home };
