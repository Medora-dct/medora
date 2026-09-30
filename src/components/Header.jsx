import React, { useState, useEffect, useRef } from "react";
import { ThemeIcon } from "./icons";
import { HorizonBadge } from "./patterns";
import { ASSETS, MENU, STD } from "../content/content";

function Header({ theme, path, onGo, onFlip, menu, setMenu }) {
  const [open, setOpen] = useState(null);
  const close = useRef(null);
  const logo = theme === "dark" ? ASSETS.logoDark : ASSETS.logoLight;

  const enter = (i) => { clearTimeout(close.current); setOpen(i); };
  const leave = () => { close.current = setTimeout(() => setOpen(null), 140); };
  useEffect(() => () => clearTimeout(close.current), []);

  const go = (href) => { setOpen(null); setMenu(false); onGo(href); };

  return (
    <>
      <header className="pl-head" onMouseLeave={leave}>
        <button className="pl-mark" onClick={() => go("/")} aria-label="MEDORA home">
          <img src={logo} alt="MEDORA" />
        </button>

        <nav className="pl-nav" aria-label="Main">
          {MENU.map((m, i) => (
            <div className="pl-navitem" key={m.label} data-open={open === i ? "1" : "0"}
              onMouseEnter={() => enter(i)}>
              <button
                className="pl-navlink"
                data-on={path.startsWith(m.href.split("#")[0].replace(/\/$/, "")) && m.href !== "/" ? "1" : "0"}
                aria-expanded={open === i}
                onClick={() => setOpen(open === i ? null : i)}
              >
                {m.label}
              </button>
              <div className="pl-mega" role="menu">
                {m.items.map((it) => (
                  <button className="pl-megalink" key={it.label} role="menuitem" onClick={() => go(it.href)}>
                    <b>
                      {it.label}
                      {it.horizon && <> <HorizonBadge /></>}
                    </b>
                    <span>{it.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="pl-headright">
          <button className="pl-toggle" aria-label="Switch theme" onClick={onFlip}><ThemeIcon /></button>
          <button className="pl-contact" onClick={() => go("/request-a-demo")}>Request a Demo</button>
          <div className="pl-mobtools">
            <button className="pl-burger" aria-label="Menu" aria-expanded={menu} onClick={() => setMenu((m) => !m)}>
              <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                <path d={menu ? "M3 3l10 10M13 3L3 13" : "M2 4h12M2 8h12M2 12h12"} stroke="currentColor" strokeWidth="1.4" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <div className="pl-mobmenu" data-on={menu ? "1" : "0"}>
        {MENU.map((m) => (
          <div className="pl-mobgroup" key={m.label}>
            <b>{m.label.toUpperCase()}</b>
            {m.items.map((it) => (
              <button key={it.label} onClick={() => go(it.href)}>
                {it.label}{it.horizon ? ` · ${STD.horizon}` : ""}
              </button>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

/* ==========================================================================
   Footer (spec 4.3)
   ========================================================================== */

export { Header };
