import React, { useState, useEffect, useRef, useCallback } from "react";
import { HOME } from "./content/content";
import { Arrow } from "./components/icons";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Transition, COVER_MS, HOLD_MS, REVEAL_MS } from "./components/Transition";
import { CTABand } from "./components/CTABand";
import { TITLES, SEO, renderPage } from "./routes";
import "./styles/index.css";
import WalkingNurseScene from "./components/WalkingNurseScene/WalkingNurseScene";
import { useTheme } from "./hooks/useTheme";

export default function App() {
  const [theme, flipTheme] = useTheme();
  const [path, setPath] = useState("/");
  const [hash, setHash] = useState("");
  const [menu, setMenu] = useState(false);
  const [trans, setTrans] = useState({ label: "MEDORA", state: "hold" });
  const rootRef = useRef(null);
  const timers = useRef([]);

  const clearTimers = () => { timers.current.forEach(clearTimeout); timers.current = []; };
  const reduced = () =>
    typeof window !== "undefined" && window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (reduced()) { setTrans((t) => ({ ...t, state: "idle" })); return undefined; }
    timers.current.push(
      setTimeout(() => setTrans((t) => ({ ...t, state: "reveal" })), 620),
      setTimeout(() => setTrans((t) => ({ ...t, state: "idle" })), 620 + REVEAL_MS)
    );
    return clearTimers;
  }, []);

  /* Landing after a page change has to be instant — it happens while the
     curtain covers the screen, and a smooth scroll would still be gliding
     when the curtain lifts. behavior:"auto" is not enough: "auto" means
     "use the CSS scroll-behavior", which is now smooth. Turning it off on
     the root for the duration works in every browser, where behavior:
     "instant" is only supported in newer ones. */
  const jump = (fn) => {
    const root = document.documentElement;
    const prev = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    fn();
    root.style.scrollBehavior = prev;
  };

  /* land on the section after the new page has painted */
  const land = useCallback((h) => {
    if (!h) { jump(() => window.scrollTo({ top: 0 })); return; }
    requestAnimationFrame(() => {
      const el = document.getElementById(h);
      jump(() => (el ? el.scrollIntoView({ block: "start" }) : window.scrollTo({ top: 0 })));
    });
  }, []);

  const onGo = useCallback((href) => {
    const [p, h] = href.split("#");
    const target = p || "/";
    setMenu(false);

    /* same page, just an anchor — no wipe needed */
    if (target === path) {
      setHash(h || "");
      const el = h && document.getElementById(h);
      if (el) el.scrollIntoView({ block: "start" });
      else window.scrollTo({ top: 0 });
      return;
    }

    if (reduced()) { setPath(target); setHash(h || ""); land(h); return; }

    clearTimers();
    setTrans({ label: TITLES[target] || "MEDORA", state: "cover" });
    timers.current.push(
      setTimeout(() => {
        setPath(target);
        setHash(h || "");
        land(h);
        setTrans((t) => ({ ...t, state: "hold" }));
      }, COVER_MS),
      setTimeout(() => setTrans((t) => ({ ...t, state: "reveal" })), COVER_MS + HOLD_MS),
      setTimeout(() => setTrans((t) => ({ ...t, state: "idle" })), COVER_MS + HOLD_MS + REVEAL_MS)
    );
  }, [path, land]);

  const seo = SEO[path] || HOME.seo;

  return (
    <div className="pl" data-theme={theme} ref={rootRef}>
      <Transition label={trans.label} state={trans.state} />

      {/* spec 4.9 — each page carries its own title and description */}
      <p className="pl-sr">{seo.title}. {seo.desc}</p>

      <div className="pl-col">
        <Header
          theme={theme}
          path={path}
          onGo={onGo}
          onFlip={flipTheme}
          menu={menu}
          setMenu={setMenu}
        />
        <main key={path}>{renderPage(path, onGo)}</main>
        <CTABand onGo={onGo} />
        <WalkingNurseScene speed={0.92}
          heroPosition="32%"
          caption={{ lead: "Ready to leave", mark: "paper", tail: "behind?" }}
          label="A MEDORA mobile clinician walking through a neighbourhood on a round of home visits." />
        <Footer theme={theme} onGo={onGo} />
      </div>

      <div className="pl-mobsticky">
        <button className="pl-btn pl-solid" onClick={() => onGo("/request-a-demo")}>
          Request a Demo <Arrow />
        </button>
      </div>
    </div>
  );
}
