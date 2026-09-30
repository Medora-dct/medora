import React, { useState } from "react";
import { LoopDiagram, MapDiagram } from "../components/diagrams";
import { Arrow } from "../components/icons";
import { Principles, Section, Title } from "../components/patterns";
import { ABOUT, STD } from "../content/content";

function AboutPage() {
  return (
    <>
      <Section n={1} name="COMPANY" id="company" style={{ borderTop: 0 }}>
        <h1 className="pl-h1">{ABOUT.company.h1}</h1>
        <p className="pl-h2" style={{ marginTop: 34, maxWidth: "20ch", color: "var(--muted)" }}>
          {ABOUT.company.mission}
        </p>
        <p className="pl-lede" style={{ marginTop: 30 }}>{ABOUT.company.story}</p>
        <p className="pl-lede" style={{ marginTop: 14 }}>{STD.parent}</p>
        <p className="pl-sub" style={{ marginLeft: 0 }}>{ABOUT.company.presence}</p>
        <div style={{ marginTop: 34 }}><MapDiagram /></div>
      </Section>

      <Section n={2} name="VALUES">
        <Title>What we value</Title>
        <div className="pl-grid2">
          {ABOUT.company.values.map((v) => (
            <div className="pl-tile" key={v.k} data-accent="1"><b>{v.k}</b><p>{v.v}</p></div>
          ))}
        </div>
      </Section>

      <Section n={3} name="OUR APPROACH" id="approach">
        <Title>{ABOUT.approach.h}</Title>
        <Principles items={ABOUT.approach.items.map((a) => `${a.k} — ${a.v}`)} />
        <div style={{ marginTop: 40 }}><LoopDiagram steps={ABOUT.approach.loop} /></div>
      </Section>
    </>
  );
}

function CareersPage() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <Section n={1} name="CAREERS" style={{ borderTop: 0 }}>
        <h1 className="pl-h1">{ABOUT.careers.h1}</h1>
        <div className="pl-grid3">
          {ABOUT.careers.why.map((w) => (
            <div className="pl-tile" key={w} data-accent="1"><b>{w}</b></div>
          ))}
        </div>
        <p className="pl-sub" style={{ marginLeft: 0 }}>How we work: {ABOUT.careers.how}</p>
      </Section>

      <Section n={2} name="OPEN ROLES">
        <Title>Open roles</Title>
        <div className="pl-slot" style={{ marginTop: 26 }}>{ABOUT.careers.empty.toUpperCase()}</div>
        <div className="pl-grid2" style={{ alignItems: "start" }}>
          <div>
            <h3 className="pl-h3">General application</h3>
            <p className="pl-sub" style={{ marginLeft: 0 }}>
              Send us your details and we'll keep them on file.
            </p>
          </div>
          {sent ? (
            <div className="pl-success"><b>Thank you.</b>We'll be in touch if something fits.</div>
          ) : (
            <form className="pl-form" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
              <div className="pl-field"><label htmlFor="c-n">NAME <span className="pl-req">*</span></label><input id="c-n" required /></div>
              <div className="pl-field"><label htmlFor="c-e">EMAIL <span className="pl-req">*</span></label><input id="c-e" type="email" required /></div>
              <div className="pl-field"><label htmlFor="c-r">ROLE OF INTEREST</label><input id="c-r" /></div>
              <div className="pl-field"><label htmlFor="c-li">LINKEDIN URL</label><input id="c-li" /></div>
              <div className="pl-field"><label htmlFor="c-cv">CV UPLOAD</label><input id="c-cv" type="file" /></div>
              <div className="pl-field"><label htmlFor="c-m">MESSAGE</label><textarea id="c-m" /></div>
              <label className="pl-check">
                <input type="checkbox" required />
                <span>I consent to the Privacy Policy. <span className="pl-req">*</span></span>
              </label>
              <button className="pl-btn pl-solid" type="submit">Send application <Arrow /></button>
            </form>
          )}
        </div>
      </Section>
    </>
  );
}

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <Section n={1} name="CONTACT" style={{ borderTop: 0 }}>
      <h1 className="pl-h1">{ABOUT.contact.h1}</h1>
      <div className="pl-grid2" style={{ alignItems: "start" }}>
        {sent ? (
          <div className="pl-success"><b>{ABOUT.contact.success}</b></div>
        ) : (
          <form className="pl-form" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
            <div className="pl-row2">
              <div className="pl-field"><label htmlFor="k-n">NAME <span className="pl-req">*</span></label><input id="k-n" required /></div>
              <div className="pl-field"><label htmlFor="k-e">WORK EMAIL <span className="pl-req">*</span></label><input id="k-e" type="email" required /></div>
            </div>
            <div className="pl-row2">
              <div className="pl-field"><label htmlFor="k-c">COMPANY <span className="pl-req">*</span></label><input id="k-c" required /></div>
              <div className="pl-field">
                <label htmlFor="k-o">ORGANISATION TYPE <span className="pl-req">*</span></label>
                <select id="k-o" required defaultValue="">
                  <option value="" disabled>Select…</option>
                  {["Sponsor", "CRO", "Site", "Other"].map((o) => <option key={o}>{o}</option>)}
                </select>
              </div>
            </div>
            <div className="pl-row2">
              <div className="pl-field"><label htmlFor="k-co">COUNTRY</label><input id="k-co" /></div>
              <div className="pl-field">
                <label htmlFor="k-t">TOPIC</label>
                <select id="k-t" defaultValue="Demo">
                  {ABOUT.contact.topics.map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>
            </div>
            <div className="pl-field"><label htmlFor="k-m">MESSAGE</label><textarea id="k-m" /></div>
            <label className="pl-check">
              <input type="checkbox" required />
              <span>I consent to the Privacy Policy. <span className="pl-req">*</span></span>
            </label>
            <button className="pl-btn pl-solid" type="submit">Send message <Arrow /></button>
          </form>
        )}
        <div>
          <div className="pl-colhead">UNITED KINGDOM OFFICE</div>
          <p className="pl-lede" style={{ fontSize: 15 }}>{ABOUT.contact.office}</p>
          <div className="pl-slot" style={{ marginTop: 20 }}>
            MEDORA EMAIL — TO BE PROVIDED<br />PHONE — TO BE PROVIDED
          </div>
          <p className="pl-sub" style={{ marginLeft: 0 }}>{ABOUT.contact.support}</p>
          <div style={{ marginTop: 24 }}><MapDiagram /></div>
        </div>
      </div>
    </Section>
  );
}

export { AboutPage, CareersPage, ContactPage };
