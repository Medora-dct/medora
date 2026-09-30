import React from "react";
import { ASSETS, FOOTER, STD } from "../content/content";

function Footer({ theme, onGo }) {
  const logo = theme === "dark" ? ASSETS.logoDark : ASSETS.logoLight;
  return (
    <footer className="pl-foot">
      <div className="pl-footcols">
        <div className="pl-footbrand">
          <img src={logo} alt="MEDORA" />
          {/* <div className="pl-foottag">{STD.tagline}</div> */}
          {/* <div className="pl-chips">
            {FOOTER.social.map((s) => <span className="pl-chip" key={s}>{s}</span>)}
          </div> */}
        </div>
        {FOOTER.columns.map((c) => (
          <div key={c.head}>
            <div className="pl-colhead">{c.head.toUpperCase()}</div>
            {c.links.map((l) => (
              <button className="pl-collink" key={l.label} onClick={() => onGo(l.href)}>{l.label}</button>
            ))}
          </div>
        ))}
      </div>

      <div className="pl-footlegal">
        {/* <div className="pl-footnote">{STD.compliance} {STD.iso}</div> */}
        <div className="pl-footnote">{FOOTER.office}</div>
        <div className="pl-footlink">
          {FOOTER.legal.map((l) => (
            <button key={l} onClick={() => onGo(l === "Terms of Use" ? "/terms" : "/privacy")}>{l}</button>
          ))}
          <span>© MEDORA</span>
        </div>
      </div>
    </footer>
  );
}

/* ==========================================================================
   Page transition (column wipe)
   ========================================================================== */

export { Footer };
