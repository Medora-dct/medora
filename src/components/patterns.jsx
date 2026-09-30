import React, { useState, useEffect, useRef, useId } from "react";
import { Right, Chevron, Glyph } from "./icons";
import { useInView } from "../hooks/useInView";
import { ASSETS, STD } from "../content/content";

/* spec 4.5 — outlined pill with a horizon line and a soft rising glow */
const HorizonBadge = () => (
  <span className="pl-horizon">
    <svg width="13" height="9" viewBox="0 0 13 9" fill="none" aria-hidden="true">
      <path d="M1 7h11" stroke="currentColor" strokeWidth="1.2" />
      <path d="M3.5 4.4a3 3 0 016 0" stroke="currentColor" strokeWidth="1" opacity=".55" />
    </svg>
    {STD.horizon}
  </span>
);

/* spec 4.7 — FIG. 00X — SECTION NAME, renumbered per page */

/* spec 4.7 — FIG. 00X — SECTION NAME, renumbered per page */
function Fig({ name }) {
  return (
    <>
      <span className="pl-fig"> {name}</span>
      <span className="pl-fig-end" />
    </>
  );
}

/* spec 4.7 — section titles keep the emphasis on their opening words and
   let the rest fall back to muted. lead is a word count, or the exact
   opening text when a heading wants a different break. A title too short
   to split is left whole rather than rendered with an empty tail. */
function Title({ children, lead = 2, as: Tag = "h2", className = "pl-h2" }) {
  const text = String(children ?? "").trim();
  const words = text.split(/\s+/);
  const n = typeof lead === "number" ? lead : lead.trim().split(/\s+/).length;

  if (!text || words.length <= n) return <Tag className={className}>{text}</Tag>;

  return (
    <Tag className={className}>
      {words.slice(0, n).join(" ")}{" "}
      <span className="pl-h2soft">{words.slice(n).join(" ")}</span>
    </Tag>
  );
}

function Section({ n, name, id, children, style }) {
  return (
    <section className="pl-sec" id={id} style={style}>
      <Fig n={n} name={name} />
      <div className="pl-wrap">{children}</div>
    </section>
  );
}

const StatusChip = ({ label, live }) => (
  <span className="pl-chip" data-live={live ? "1" : "0"}>
    <i />
    {label}
    <span className="pl-sr">{live ? "Live" : "On the horizon"}</span>
  </span>
);

/* spec 4.7 — numbers count up when scrolled into view. A counter whose value
   is UNVERIFIED still renders as an unfilled slot rather than a made-up
   figure, so an unsubstantiated claim can never reach the page by accident. */

const COUNT_GLYPHS = {
  home: "M2.4 7.4 8 2.7l5.6 4.7M3.9 8.6v4.9h8.2V8.6M6.5 13.5V9.8h3v3.7",
  globe: "M8 14.1A6.1 6.1 0 1 0 8 1.9a6.1 6.1 0 0 0 0 12.2zM2.2 6.2h11.6M2.2 9.8h11.6M8 1.9c2.1 2.7 2.1 9.5 0 12.2-2.1-2.7-2.1-9.5 0-12.2z",
  study: "M6 3.4H4.4v10.2h7.2V3.4H10M6 3.4V2.3h4v1.1H6M5.9 7.4h4.2M5.9 10.2h2.9",
  scan: "M4.4 2.3h4.3l3 3v8.4H4.4zM8.7 2.3v3h3M6.3 9h3.4M6.3 11.2h2.3",
  language: "M2.2 4.3h5.9M5.2 4.3V3.1M6.9 4.3c0 2.7-2 5.2-4.7 6.2M3.3 6.9c1 1.7 2.8 3 4.7 3.6M8.8 13.7l2.5-6.2 2.5 6.2M9.8 11.6h3",
};

const CountGlyph = ({ name }) => (
  <svg width="21" height="21" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d={COUNT_GLYPHS[name]} stroke="currentColor" strokeWidth="1.25"
      strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function CountUp({ to, suffix, run }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!run) return undefined;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setV(to);
      return undefined;
    }
    let raf;
    const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / 1100);
      setV(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, to]);
  return (
    <div className="pl-countval">
      <span>{v.toLocaleString()}</span>
      {suffix && <span className="pl-countsuffix">{suffix}</span>}
    </div>
  );
}

/* spec 4.7 — one large sentence per row, hairline dividers, small index */

/* spec 4.7 — one large sentence per row, hairline dividers, small index */
const Principles = ({ items }) => (
  <div className="pl-principles">
    {items.map((t, i) => (
      <div className="pl-principle" key={t}>
        <span>{String(i + 1).padStart(2, "0")}</span>
        <p>{t}</p>
      </div>
    ))}
  </div>
);

/* spec 4.7 — 4 time stamps with one-line events, vertical on mobile */

/* spec 4.7 — 4 time stamps with one-line events, vertical on mobile */
const DayTimeline = ({ items }) => (
  <div className="pl-day">
    {items.map((d) => (
      <div className="pl-daycell" key={d.time}>
        <div className="pl-daytime">{d.time}</div>
        <div className="pl-dayevent">{d.event}</div>
      </div>
    ))}
  </div>
);

/* spec 4.7 — the capabilities as a workbench: the list on the left, and the
   selected one drawn as a flow on a plotted canvas. Node positions are
   computed from the lane index rather than authored, so a capability only
   has to describe its steps, not where they sit. */

const LANE_X = 24;      /* first node */
const LANE_GAP = 192;   /* node pitch along the lane */
const NODE_W = 148;
const NODE_H = 46;
const LANE_Y = 74;
const ASIDE_Y = 180;

const nx = (i) => LANE_X + i * LANE_GAP;
const mid = (i) => nx(i) + NODE_W / 2;

function FlowCanvas({ flow, label }) {
  const { lane, aside, note, tools } = flow;
  /* useId gives ":r1:" — colons are legal in an id but awkward inside a
     url(#...) reference, so they come out */
  const arrow = useId().replace(/:/g, "") + "-arrow";

  return (
    <div className="pl-canvas">
      <div className="pl-canvastop">
        <span className="pl-canvasdots" aria-hidden="true"><i /><i /><i /></span>
        <span className="pl-canvascrumb">{label.toUpperCase()}</span>
        <span className="pl-canvasstate">READY</span>
      </div>

      <div className="pl-canvasgrid">
        <svg viewBox="0 0 800 260" className="pl-flowsvg" role="img"
          aria-label={label + " flow: " + lane.map((s) => s.t).join(", then ") +
            (aside ? ", with " + aside.t : "") + "."}>
          <defs>
            <marker id={arrow} viewBox="0 0 8 8" refX="7" refY="4"
              markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0 0.8 L7 4 L0 7.2 z" className="pl-flowhead" />
            </marker>
          </defs>

          {/* lane connectors */}
          {lane.slice(0, -1).map((s, i) => (
            <path key={"e" + i} className="pl-flowline" markerEnd={"url(#" + arrow + ")"}
              d={"M" + (nx(i) + NODE_W) + " " + (LANE_Y + NODE_H / 2) +
                 " H" + (nx(i + 1) - 6)} />
          ))}

          {/* the branch that drops away from the lane */}
          {aside && (
            <path className="pl-flowline pl-flowline--soft" markerEnd={"url(#" + arrow + ")"}
              d={"M" + mid(aside.from) + " " + (LANE_Y + NODE_H) + " V" + (ASIDE_Y - 7)} />
          )}

          {lane.map((s, i) => (
            <g key={s.t}>
              {s.d ? (
                <path className="pl-flownode pl-flownode--d"
                  d={"M" + mid(i) + " " + (LANE_Y - 8) +
                     " L" + (nx(i) + NODE_W) + " " + (LANE_Y + NODE_H / 2) +
                     " L" + mid(i) + " " + (LANE_Y + NODE_H + 8) +
                     " L" + nx(i) + " " + (LANE_Y + NODE_H / 2) + " Z"} />
              ) : (
                <rect className={"pl-flownode" + (s.a ? " pl-flownode--a" : "")}
                  x={nx(i)} y={LANE_Y} width={NODE_W} height={NODE_H} rx="6" />
              )}
              <text x={mid(i)} y={LANE_Y + NODE_H / 2 + 4} textAnchor="middle"
                className={"pl-flowtext" + (s.a ? " pl-flowtext--a" : "")}>
                {s.t.toUpperCase()}
              </text>
            </g>
          ))}

          {aside && (
            <g>
              <rect className="pl-flownode pl-flownode--soft"
                x={nx(aside.from)} y={ASIDE_Y} width={NODE_W} height={NODE_H - 6} rx="6" />
              <text x={mid(aside.from)} y={ASIDE_Y + 24} textAnchor="middle"
                className="pl-flowtext pl-flowtext--soft">{aside.t.toUpperCase()}</text>
            </g>
          )}
        </svg>

        <p className="pl-canvasnote">{note}</p>
      </div>

      <div className="pl-canvasfoot">
        <span className="pl-canvastools">
          {tools.map((t) => <span key={t}>{t}</span>)}
        </span>
        <span className="pl-canvasfig">ONE RECORD · ONE AUDIT TRAIL</span>
      </div>
    </div>
  );
}

function BenchPattern({ items, onGo }) {
  const [i, setI] = useState(0);
  const a = items[i];

  return (
    <div className="pl-bench">
      <div className="pl-benchlist">
        {items.map((it, n) => (
          <button
            key={it.label}
            className="pl-benchitem"
            data-on={n === i ? "1" : "0"}
            data-dim={it.horizon ? "1" : "0"}
            onClick={() => setI(n)}
            aria-pressed={n === i}
          >
            <span className="pl-benchsq" />
            <span>
              <b>{it.label}</b>
              <em>{it.copy}</em>
            </span>
          </button>
        ))}
      </div>

      <div className="pl-benchstage">
        {a.flow
          ? <FlowCanvas flow={a.flow} label={a.label} key={a.label} />
          : <p className="pl-benchcopy">{a.copy}</p>}

        {a.href && (
          <button className="pl-link pl-benchgo" onClick={() => onGo(a.href)}>
            Learn more <Right />
          </button>
        )}
      </div>
    </div>
  );
}

function Accordion({ groups }) {
  const [open, setOpen] = useState("0-0");
  return (
    <div>
      {groups.map((g, gi) => (
        <div key={g.theme}>
          <div className="pl-accgroup">{g.theme.toUpperCase()}</div>
          <div className="pl-acc">
            {g.qa.map((x, qi) => {
              const key = `${gi}-${qi}`;
              const isOpen = open === key;
              return (
                <div key={x.q}>
                  <button
                    className="pl-accq"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? "" : key)}
                  >
                    {x.q}
                    <i>{isOpen ? "–" : "+"}</i>
                  </button>
                  {isOpen && <div className="pl-acca">{x.a}</div>}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ==========================================================================
   Diagrams — thin-line, rounded nodes, animated connectors (spec 4.8)
   ========================================================================== */

/* spec 5.1 — clinician phone and web dashboard joined to four nodes */

const FaqBlock = ({ faqs }) => (
  <Accordion groups={[{ theme: "Frequently asked", qa: faqs }]} />
);

/* ==========================================================================
   Home (spec 5)
   ========================================================================== */

/* spec 4.7 — testimonials on an inverted panel, so the one piece of human
   voice on the page does not read as another white card. The portraits are
   the navigation: pick a face, get that voice. Advances on its own, and
   stops the moment anyone hovers or tabs in. */
function Testimonials({ items }) {
  const [i, setI] = useState(0);
  const [held, setHeld] = useState(false);
  const t = items[i];

  useEffect(() => {
    if (held) return undefined;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const id = setTimeout(() => setI((n) => (n + 1) % items.length), 7000);
    return () => clearTimeout(id);
  }, [i, held, items.length]);

  return (
    <div className="pl-tm" onMouseEnter={() => setHeld(true)} onMouseLeave={() => setHeld(false)}
      onFocusCapture={() => setHeld(true)} onBlurCapture={() => setHeld(false)}>

      {/* decoration: a signal spreading from the centre, behind everything */}
      <svg className="pl-tmwash" viewBox="0 0 1200 460" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((n) => (
          <circle key={n} cx="600" cy="120" r={130 + n * 96} className="pl-tmarc" style={{ "--i": n }} />
        ))}
      </svg>

      <div className="pl-tminner">
        <span className="pl-tmmark" aria-hidden="true">&ldquo;</span>

        <blockquote className="pl-tmquote" key={i}>
          <p>{t.quote}</p>
          <footer className="pl-tmwho">
            <b>{t.name}</b>
            <span>{t.role}</span>
          </footer>
        </blockquote>

        <div className="pl-tmstrip" role="group" aria-label="Choose a testimonial">
          {items.map((q, n) => (
            <button key={q.name + n} className="pl-tmface" data-on={n === i ? "1" : "0"}
              onClick={() => setI(n)} aria-current={n === i ? "true" : undefined}
              aria-label={q.name + ", " + q.role}>
              {q.photo
                ? <img src={q.photo} alt="" loading="lazy" />
                : <span aria-hidden="true">{q.initials}</span>}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* spec 4.7 — featured case studies. The animation carries the content: a
   rule draws across each card as it arrives, then its headline figure
   counts up, so the number is what the eye lands on last. */
function CaseStudies({ title, sub, items, onGo }) {
  const [ref, on] = useInView(0.18, true);

  return (
    <div className="pl-cases" ref={ref} data-run={on ? "1" : "0"}>
      <div className="pl-center">
        <h3 className="pl-casesh">{title}</h3>
        <p className="pl-sub">{sub}</p>
      </div>

      <div className="pl-casegrid">
        {items.map((c, i) => (
          <article className="pl-case" key={c.title} style={{ "--i": i }}>
            <span className="pl-casedraw" aria-hidden="true" />
            <div className="pl-casetag">{c.tag.toUpperCase()}</div>

            <div className="pl-casemetric">
              <CountUp to={c.metric} suffix={c.suffix} run={on} />
              <span className="pl-casemlabel">{c.metricLabel}</span>
            </div>

            <h4 className="pl-caseh">{c.title}</h4>
            <p className="pl-casebody">{c.summary}</p>

            <button className="pl-link pl-caselink" onClick={() => onGo(c.href)}>
              Read the case study <Right />
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}

/* spec 4.7 — the beliefs manifesto. A sticky statement on the left while the
   principles move past on the right; each one is dimmed until it reaches the
   middle of the screen, so reading the page reads them one at a time. */
function Beliefs({ title, sub, items, link, href, onGo }) {
  return (
    <div className="pl-belief">
      <div className="pl-beliefaside">
        <Title>{title}</Title>
        <p className="pl-sub pl-beliefsub">{sub}</p>
        <button className="pl-link" onClick={() => onGo(href)}>{link} <Right /></button>
      </div>

      <ol className="pl-beliefs">
        {items.map((it, n) => <Belief key={it.t} item={it} n={n} />)}
      </ol>
    </div>
  );
}

function Belief({ item, n }) {
  /* repeats, so a principle lights on the way down and again on the way back */
  const [ref, on] = useInView(0.55, true);
  return (
    <li className="pl-beliefrow" ref={ref} data-on={on ? "1" : "0"}>
      <span className="pl-beliefrule" aria-hidden="true" />
      <span className="pl-beliefghost" aria-hidden="true">{String(n + 1).padStart(2, "0")}</span>
      <span className="pl-beliefnum">{String(n + 1).padStart(2, "0")}</span>
      <h3 className="pl-beliefh">{item.t}</h3>
      <p className="pl-beliefd">{item.d}</p>
    </li>
  );
}

/* spec 5.3 — the platform as a product. The app itself holds the narrow
   column; the six capabilities take the remaining nine, each an icon over
   a rule with its own line of copy. The foundation runs underneath, since
   it is what all six stand on rather than one more capability. */
function PlatformGrid({ tagline, items, foundation, onGo }) {
  const [ref, on] = useInView(0.12, true);

  return (
    <div className="pl-bento" ref={ref} data-run={on ? "1" : "0"}>
      <figure className="pl-bentoapp">
        <span className="pl-bentoeyebrow">THE PLATFORM</span>
        <div className="pl-bentophone">
          <img src={ASSETS.tasklist} alt="The MEDORA clinician app on a phone" loading="lazy" />
        </div>
        <figcaption>{tagline}</figcaption>
      </figure>

      <div className="pl-bentogrid">
        {items.map((c, i) => (
          <article className="pl-bentoitem" key={c.label} style={{ "--i": i }}>
            <span className="pl-bentoico"><Glyph name={c.icon} s={24} /></span>
            <h4 className="pl-bentoh">{c.label}</h4>
            <p className="pl-bentocopy">{c.copy}</p>
            <button className="pl-link pl-bentogo" onClick={() => onGo(c.href)}>
              Explore <Right />
            </button>
          </article>
        ))}
      </div>

      <div className="pl-bentofound">
        <span className="pl-bentofoundh">EVERY CAPABILITY RUNS ON</span>
        <ul>
          {foundation.map((f) => (
            <li key={f.label}><Glyph name={f.icon} s={17} />{f.label}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* spec 4.8 — security and compliance. Two groups, because they are two
   kinds of claim: frameworks are rules the platform is built to, and
   certifications are issued by an accredited body.

   Each row is a marquee that drifts sideways and pauses on hover. The set
   is rendered twice so the loop can hand back to itself without a seam;
   the second copy is hidden from assistive tech.

   The marks are MEDORA's own drawn emblems, deliberately not the official
   GDPR / HIPAA / ISO / AICPA marks — those belong to the issuing bodies and
   have their own usage rules. Swap in the supplied artwork when you have it. */

const BADGE_SHIELD = "M32 9l20 6.9v15.4c0 10.8-7.8 19-20 22.9-12.2-3.9-20-12.1-20-22.9V15.9z";

const Shield = ({ mark }) => (
  <span className="pl-cbadge">
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="32" cy="32" r="30" className="pl-cbring" />
      <path d={BADGE_SHIELD} className="pl-cbbody" />
      <g transform="translate(20 20) scale(1.5)" className="pl-cbglyph">
        <Glyph name={mark} s={16} />
      </g>
    </svg>
  </span>
);

/* ---- award wreath, for certifications ---- */

const LEAF = "M0 0C-4.6-5.4-4.6-13.4 0-18.6 4.6-13.4 4.6-5.4 0 0Z";
const STAR = "M0-7 1.65-2.26 6.66-2.16 2.66.87 5.66 4.11 0 2.8-5.66 4.11-2.66.87-6.66-2.16-1.65-2.26Z";
const CROWN = "M-10 6V-5l5.2 4.6L0-7l4.8 6.6L10-5V6Z";

const CX = 80;
const CY = 84;
const R = 60;

/* leaves run base-to-tip up the right side; scale swells through the middle
   so the branch is fullest at the shoulder, as a real wreath is */
const leaves = Array.from({ length: 9 }, (_, i) => {
  const a = 158 + ((26 - 158) * i) / 8;
  const rad = (a * Math.PI) / 180;
  return {
    x: CX + R * Math.sin(rad),
    y: CY - R * Math.cos(rad),
    rot: a - 52,
    s: 0.7 + 0.36 * Math.sin((Math.PI * i) / 8),
  };
});

const stem = (() => {
  const pt = (a) => {
    const rad = (a * Math.PI) / 180;
    return [CX + (R - 3) * Math.sin(rad), CY - (R - 3) * Math.cos(rad)];
  };
  const [x0, y0] = pt(158);
  const [x1, y1] = pt(26);
  return "M" + x0.toFixed(1) + " " + y0.toFixed(1) +
    " A " + (R - 3) + " " + (R - 3) + " 0 0 0 " + x1.toFixed(1) + " " + y1.toFixed(1);
})();

const Branch = () => (
  <g>
    <path d={stem} className="pl-cwstem" />
    {leaves.map((l, i) => (
      <path key={i} d={LEAF} className="pl-cwleaf"
        transform={"translate(" + l.x.toFixed(1) + " " + l.y.toFixed(1) + ") rotate(" + l.rot.toFixed(1) + ") scale(" + l.s.toFixed(2) + ")"} />
    ))}
  </g>
);

const Wreath = ({ lines }) => (
  <span className="pl-cwreath">
    <svg viewBox="0 0 160 160" aria-hidden="true">
      <Branch />
      {/* the left branch is the right one mirrored, so the two cannot drift */}
      <g transform={"translate(" + CX * 2 + " 0) scale(-1 1)"}><Branch /></g>
      <path d={CROWN} transform={"translate(" + CX + " 18)"} className="pl-cwtrim" />
      <path d={STAR} transform={"translate(" + CX + " 146)"} className="pl-cwtrim" />
      <text x={CX} y={CY - 6} textAnchor="middle" className="pl-cwt">{lines[0]}</text>
      <text x={CX} y={CY + 13} textAnchor="middle" className="pl-cwt">{lines[1]}</text>
    </svg>
  </span>
);

const Standard = ({ c, seal }) => (
  <li className={"pl-compitem" + (seal ? " pl-compitem--wreath" : "")}>
    {seal ? <Wreath lines={c.lines} /> : <Shield mark={c.mark} />}
    {seal ? null : <b>{c.name}</b>}
    <span>{c.scope}</span>
  </li>
);

/* Item width plus its margin, in px — must match the CSS. Used to work out
   how many copies fill the rail and how long a lap should take. */
const ITEM_W = { shield: 162, wreath: 210 };
const RAIL_MAX = 900;   /* the widest the rail is ever drawn */
const SPEED = 32;       /* px per second — the pace of the drift */

/* One half of the track has to be at least as wide as the rail, or the
   loop runs out of content before it can hand back and a gap opens at the
   trailing edge. Repeat the set until it does. */
const railSet = (items, w) => {
  const out = [];
  while (out.length * w < RAIL_MAX) out.push(...items);
  return out;
};

function Compliance({ frameworks, certifications }) {
  const [ref, on] = useInView(0.15, true);

  const row = (label, note, items, seal, dir) => {
    const w = ITEM_W[seal ? "wreath" : "shield"];
    const half = railSet(items, w);
    /* a constant pace whatever the rail ends up holding */
    const dur = ((half.length * w) / SPEED).toFixed(1) + "s";

    return (
      <section className="pl-compgroup">
        <h3 className="pl-comph"><span>{label}</span><i>{note}</i></h3>

        {/* the rail is decorative repetition; the real list follows it for
            assistive tech, once, in order */}
        <div className="pl-compmarq" data-dir={dir} aria-hidden="true">
          <ul className="pl-comptrack" style={{ "--dur": dur }}>
            {half.map((c, i) => <Standard key={"a" + i} c={c} seal={seal} />)}
            {half.map((c, i) => <Standard key={"b" + i} c={c} seal={seal} />)}
          </ul>
        </div>

        <ul className="pl-sr">
          {items.map((c) => <li key={c.name}>{c.name} — {c.scope}</li>)}
        </ul>
      </section>
    );
  };

  return (
    <div className="pl-comp" ref={ref} data-run={on ? "1" : "0"}>
      {row("Regulatory alignment", "RULES THE PLATFORM IS BUILT TO", frameworks, false, "l")}
      {row("Certifications", "ISSUED BY AN ACCREDITED BODY", certifications, true, "r")}
    </div>
  );
}

/* spec 4.7 — the figures laid over the product in use. Frosted tiles on a
   darkened photograph: the numbers sit in the scene rather than beside it.
   Counting still starts on scroll, so the tiles arrive and then fill. */
function ProofStats({ items, image, alt }) {
  const [ref, on] = useInView(0.2, true);

  return (
    <div className="pl-proof" ref={ref} data-run={on ? "1" : "0"}>
      <img className="pl-proofbg" src={image} alt={alt} loading="lazy" />
      <span className="pl-proofscrim" aria-hidden="true" />

      <ul className="pl-proofstats">
        {items.map((it, i) => (
          <li className="pl-pstat" key={it.label} style={{ "--i": i }}>
            <span className="pl-pstatico" aria-hidden="true"><CountGlyph name={it.icon} /></span>
            {it.value == null
              ? <span className="pl-pstatslot">FIGURE TO CONFIRM</span>
              : <CountUp to={it.value} suffix={it.suffix} run={on} />}
            <h4 className="pl-pstatlabel">{it.label}</h4>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* spec 4.7 — the audiences as a stack. Each card sticks a little lower
   than the one before, so scrolling deals them over each other. A photo
   fills the card and the case for that audience sits on a panel over it.
   No observer and no script: the effect is position:sticky plus an offset
   that steps with the index. */
function AudienceStack({ cards, onGo }) {
  return (
    <div className="pl-stack">
      {cards.map((c, i) => (
        <article className="pl-stackcard" key={c.card} style={{ "--i": i }}>
          <img className="pl-stackbg" src={ASSETS[c.bg]} alt="" loading="lazy" />
          <span className="pl-stackscrim" aria-hidden="true" />

          <div className="pl-stackpanel">
            <div className="pl-stacktag">
              <span>{c.card.toUpperCase()}</span>
              <i>{String(i + 1).padStart(2, "0")}</i>
            </div>
            <h3 className="pl-stackhead">{c.headline}</h3>
            <ul className="pl-stacklist">
              {c.points.map((p) => <li key={p}>{p}</li>)}
            </ul>
            <button className="pl-link" onClick={() => onGo(c.href)}>{c.link} <Right /></button>
          </div>
        </article>
      ))}
    </div>
  );
}

export { HorizonBadge, Fig, Title, Section, StatusChip, CountUp, Principles, DayTimeline, BenchPattern, Accordion, FaqBlock, Testimonials, CaseStudies, Beliefs, PlatformGrid, Compliance, ProofStats, AudienceStack };
