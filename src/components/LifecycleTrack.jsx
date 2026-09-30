import React, { useId, useRef, useState } from "react";
import { Chevron } from "./icons";

/* spec 5.5 / 6.3 — the lifecycle stepped through one stage at a time: a dial
   on the left showing where you are in the six, the stage itself on the
   right, arrows to move. Still a tab set underneath — the dial segments are
   the tabs — so arrow keys work and the panel is wired to its tab. */
function LifecycleTrack({ stages }) {
  const [i, setI] = useState(0);
  const uid = useId();
  const tabs = useRef([]);
  const s = stages[i];
  const last = stages.length - 1;
  const pad = (n) => String(n).padStart(2, "0");

  const tabId = (n) => uid + "-tab-" + n;
  const panelId = (n) => uid + "-panel-" + n;

  const select = (n) => {
    const next = (n + stages.length) % stages.length;
    setI(next);
    if (tabs.current[next]) tabs.current[next].focus();
  };

  const onKey = (e) => {
    const move = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: last };
    if (!(e.key in move)) return;
    e.preventDefault();
    select(move[e.key]);
  };

  /* six arcs on one ring: each is a dash of a sixth of the path, offset to
     its own slot. pathLength normalises the circle so the maths is in
     percent rather than in whatever the circumference happens to be. */
  const SEG = 100 / stages.length;

  return (
    <div className="pl-life">
      <div className="pl-lifedial">
        <svg viewBox="0 0 300 300" aria-hidden="true">
          <g transform="rotate(-90 150 150)">
            {stages.map((st, n) => (
              <circle
                key={st.stage}
                cx="150" cy="150" r="118" pathLength="100"
                className={"pl-lifearc" + (n === i ? " pl-lifearc--on" : "")}
                strokeDasharray={(SEG - 2.4).toFixed(2) + " " + (100 - SEG + 2.4).toFixed(2)}
                strokeDashoffset={(-n * SEG).toFixed(2)}
              />
            ))}
          </g>
          {/* the numeral is centred on its own baseline, so the caption sits
              well clear of it rather than against its descender line */}
          <text x="150" y="142" textAnchor="middle" className="pl-lifebig">{pad(i + 1)}</text>
          <text x="150" y="194" textAnchor="middle" className="pl-lifeof">
            OF {pad(stages.length)}
          </text>
        </svg>

        {/* the segments are the tab set */}
        <div className="pl-lifetabs" role="tablist" aria-label="Study lifecycle stages" onKeyDown={onKey}>
          {stages.map((st, n) => (
            <button
              key={st.stage}
              id={tabId(n)}
              role="tab"
              ref={(el) => { tabs.current[n] = el; }}
              className="pl-lifedot"
              data-on={n === i ? "1" : "0"}
              aria-selected={n === i}
              aria-controls={panelId(n)}
              tabIndex={n === i ? 0 : -1}
              onClick={() => setI(n)}
            >
              <span className="pl-sr">{st.stage}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="pl-lifepanel" role="tabpanel" id={panelId(i)} aria-labelledby={tabId(i)} tabIndex={0}>
        <div className="pl-lifefade" key={i}>
          <h3 className="pl-lifehead">{s.stage}</h3>
          <div className="pl-lifemeta">STAGE {pad(i + 1)} · {s.caps.join(" · ").toUpperCase()}</div>
          <p className="pl-lifebody">{s.what}</p>
          <div className="pl-chips">
            {s.caps.map((c) => <span className="pl-chip" key={c}><i />{c}</span>)}
          </div>
        </div>

        <div className="pl-lifenav">
          <button className="pl-lifebtn" onClick={() => select(i - 1)} aria-label="Previous stage">
            <Chevron back />
          </button>
          <button className="pl-lifebtn" onClick={() => select(i + 1)} aria-label="Next stage">
            <Chevron />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   Platform (spec 6)
   ========================================================================== */

export { LifecycleTrack };
