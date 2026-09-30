import React, { useState, useEffect, useRef } from "react";
import { useInView } from "../hooks/useInView";
import { Right, GlyphPath } from "./icons";
import { PLATFORM } from "../content/content";

/* These figures are far too wide to shrink onto a phone, and the brief is
   no sideways scrolling — so below this width they switch to a stacked
   composition laid out for a portrait screen. */
function useNarrow(query = "(max-width: 760px)") {
  const [narrow, setNarrow] = useState(
    () => typeof window !== "undefined" && !!window.matchMedia && window.matchMedia(query).matches
  );
  useEffect(() => {
    if (!window.matchMedia) return undefined;
    const mq = window.matchMedia(query);
    const onChange = (e) => setNarrow(e.matches);
    setNarrow(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [query]);
  return narrow;
}

/* spec 5.2 — the comparison drawn as two panels.
   Left scatters and stalls, right runs one clean route. Geometry sits on a
   1200x440 grid so the whole figure scales as a single unit. */

const FLOW_INPUTS = [
  { t: "Scheduling", icon: "clock" },
  { t: "Clinician notes", icon: "note" },
  { t: "Paper source", icon: "source" },
  { t: "Patient travel", icon: "car" },
  { t: "Reimbursement", icon: "receipt" },
];

/* An icon riding a path. offset-path takes the same d the line is drawn
   from, so the two can never disagree; offset-rotate:0 keeps it upright
   rather than banking into the curve. */
function Carry({ d, icon, i, tone, into }) {
  /* the line stops at the destination's edge; the icon carries a little
     further so it finishes inside the box rather than parked against it */
  const track = into ? d + " H" + into : d;
  return (
    <g className={"pl-dcarry pl-dcarry--" + tone} style={{ "--i": i, offsetPath: "path(\"" + track + "\")" }}>
      <circle r="9.5" className="pl-dcarrybg" />
      <g transform="translate(-8 -8)"><GlyphPath name={icon} /></g>
    </g>
  );
}
const FLOW_CHANNELS = ["Phone", "Email", "Scan", "Photo", "Sheet"];

const TODAY_TILES = [
  { icon: "shuffle", t: "Any route, any day", s: "nobody can say which" },
  { icon: "copy", t: "Re-keyed by hand", s: "twice over" },
  { icon: "shieldx", t: "Audit trail", s: "has gaps" },
];

const MEDORA_TILES = [
  { icon: "arrow", t: "One route", s: "every time" },
  { icon: "phone", t: "Entered once", s: "at the bedside" },
  { icon: "shieldcheck", t: "Audit trail", s: "complete" },
];

/* 16x16 line glyphs, drawn at the origin and positioned by the caller */
const GLYPHS = {
  shuffle: "M1.5 4h2.6l7.8 8h2.6M11.2 2.2L13.7 4l-2.5 1.8M1.5 12h2.6l2.6-2.7M11.2 10.2l2.5 1.8-2.5 1.8",
  copy: "M5.6 5.6h7.2v7.2H5.6zM3.2 10.4V3.9a.7.7 0 0 1 .7-.7h6.5",
  shieldx: "M8 1.6l5.4 1.9v4.4c0 2.9-2.2 5.2-5.4 6.4-3.2-1.2-5.4-3.5-5.4-6.4V3.5zM6.2 6.7l3.6 3.6M9.8 6.7l-3.6 3.6",
  shieldcheck: "M8 1.6l5.4 1.9v4.4c0 2.9-2.2 5.2-5.4 6.4-3.2-1.2-5.4-3.5-5.4-6.4V3.5zM5.6 8.1l1.8 1.8 3.2-3.4",
  arrow: "M2.4 8h11.2M9.6 4l4 4-4 4",
  phone: "M5.2 1.7h5.6a1.5 1.5 0 0 1 1.5 1.5v9.6a1.5 1.5 0 0 1-1.5 1.5H5.2a1.5 1.5 0 0 1-1.5-1.5V3.2a1.5 1.5 0 0 1 1.5-1.5zM6.6 3.8h2.8",
};

/* both panels share one vertical rhythm */
const ROW = (i) => 112 + i * 43;

function FlowTile({ x, y, w = 168, h = 62, tile, tone, i }) {
  const iy = y + (h - 28) / 2;
  return (
    <g className="pl-dpop" style={{ "--i": i }}>
      <rect x={x} y={y} width={w} height={h} rx="8" className="pl-fcard" />
      <rect x={x + 14} y={iy} width="28" height="28" rx="7" className={"pl-ftile pl-ftile--" + tone} />
      <path d={GLYPHS[tile.icon]} transform={"translate(" + (x + 20) + " " + (iy + 6) + ")"}
        className={"pl-fglyph pl-fglyph--" + tone} />
      <text x={x + 54} y={y + h / 2 - 2} className="pl-ftitle">{tile.t}</text>
      <text x={x + 54} y={y + h / 2 + 13} className="pl-fsub">{tile.s}</text>
    </g>
  );
}

function FlowWide({ innerRef, on }) {
  /* inputs fan out to whichever channel was nearest to hand — the crossings
     are the point of the left panel, so the mapping is deliberately shuffled */
  const scatter = (i) => {
    const to = ROW((i + 2) % 5);
    return "M186 " + ROW(i) + " C 224 " + ROW(i) + ", 252 " + to + ", 290 " + to;
  };
  const flow = (i) => "M782 " + ROW(i) + " C 820 " + ROW(i) + ", 826 198, 858 198";

  return (
    <svg className="pl-diagram pl-danim pl-flowfig" data-run={on ? "1" : "0"} ref={innerRef}
      viewBox="0 0 1200 440" role="img"
      aria-label="Two panels compared. Today: five inputs — scheduling, clinician notes, paper source, patient travel and reimbursement — scatter across whichever channel is to hand, whether phone, email, scan, photo or spreadsheet, are gathered by hand, and arrive days later if they arrive at all; the route varies, data is re-keyed twice over and the audit trail has gaps. With MEDORA: the same five inputs follow one route into MEDORA and are live as they are captured, entered once at the bedside, with a complete audit trail.">

      <defs>
        <clipPath id="pl-flowclip">
          <rect x="1" y="1" width="1198" height="438" rx="11" />
        </clipPath>
      </defs>

      <g clipPath="url(#pl-flowclip)">
        <rect x="0" y="0" width="600" height="440" className="pl-fpanel pl-fpanel--warm" />
        <rect x="600" y="0" width="600" height="440" className="pl-fpanel pl-fpanel--cool" />
      </g>
      <rect x="1" y="1" width="1198" height="438" rx="11" className="pl-fframe" />
      <line x1="600" y1="1" x2="600" y2="439" className="pl-fdivide" />

      {/* ---------------- TODAY ---------------- */}
      <g className="pl-dfade">
        <text x="44" y="52" className="pl-fhead">Today</text>
        <rect x="44" y="61" width="26" height="3" rx="1.5" className="pl-frule pl-frule--warn" />
      </g>

      <text x="325" y="82" textAnchor="middle" className="pl-fnote pl-fnote--warn pl-dfade">whichever is to hand</text>

      {FLOW_INPUTS.map((s, i) => (
        <g key={s.t}>
          <g className="pl-dpop" style={{ "--i": i }}>
            <rect x="44" y={ROW(i) - 15} width="142" height="30" rx="6" className="pl-fpill" />
            <text x="60" y={ROW(i) + 4} className="pl-flabel">{s.t}</text>
          </g>
          <path d={scatter(i)} className="pl-fscatter pl-ddraw" pathLength="100" style={{ "--i": i }} />
          <Carry d={scatter(i)} icon={s.icon} i={i} tone="stall" into={308} />
        </g>
      ))}

      {FLOW_CHANNELS.map((s, i) => (
        <g key={s} className="pl-dpop pl-dflicker" style={{ "--i": i }}>
          <rect x="290" y={ROW(i) - 13} width="70" height="26" rx="6" className="pl-fpill pl-fpill--dim" />
          <text x="325" y={ROW(i) + 4} textAnchor="middle" className="pl-flabel pl-flabel--dim">{s}</text>
        </g>
      ))}

      {/* hand-gathering: every channel collected onto one bracket, slowly */}
      {FLOW_CHANNELS.map((s, i) => (
        <g key={s + "g"}>
          <path d={"M362 " + ROW(i) + " H424"} className="pl-fgather pl-ddraw" pathLength="100"
            style={{ "--i": i }} />
          <circle cx="374" cy={ROW(i)} r="3.2" className="pl-fbead" style={{ "--i": i }} />
          <circle cx="424" cy={ROW(i)} r="3.2" className="pl-fbead pl-fbead--end" style={{ "--i": i }} />
          {/* once gathered, the bead runs down the bracket and into the card */}
          <path d={ROW(i) === 198 ? "M424 198 H452" : "M424 " + ROW(i) + " V198 H452"}
            className="pl-fdeliver" pathLength="100"
            style={{ "--i": i }} />
        </g>
      ))}
      <path d="M424 100 V300" className="pl-fbracket pl-ddraw" pathLength="100" style={{ "--i": 5 }} />
      <text x="424" y="320" textAnchor="middle" className="pl-fnote pl-fnote--warn pl-dfade">gathered by hand</text>

      <path d="M424 198 H452" className="pl-fgather pl-ddraw" pathLength="100" style={{ "--i": 6 }} />

      <g className="pl-dpop pl-djitter" style={{ "--i": 6 }}>
        <rect x="452" y="148" width="134" height="98" rx="8" className="pl-fcard" />
        {[0, 1, 2, 3, 4].map((j) => (
          j === 2
            ? <circle key={j} cx={472 + j * 15} cy="178" r="5" className="pl-fseek" />
            : <circle key={j} cx={472 + j * 15} cy="178" r="3.4" className="pl-fstale" style={{ "--i": j }} />
        ))}
        <g className="pl-fclock">
          <circle cx="566" cy="178" r="8.5" className="pl-fclockface" />
          <path d="M566 173.5 V178 l3.6 2.1" className="pl-fhand" />
        </g>
        <text x="470" y="214" className="pl-fbig">Days later</text>
        <text x="470" y="230" className="pl-fsub">if it arrives</text>
      </g>

      {TODAY_TILES.map((t, i) => (
        <FlowTile key={t.t} x={44 + i * 178} y={344} tile={t} tone="warn" i={i + 5} />
      ))}

      {/* ---------------- WITH MEDORA ---------------- */}
      <g className="pl-dfade">
        <text x="640" y="52" className="pl-fhead">With MEDORA</text>
        <rect x="640" y="61" width="62" height="3" rx="1.5" className="pl-frule pl-frule--accent" />
      </g>

      {FLOW_INPUTS.map((s, i) => (
        <g key={s.t + "m"}>
          <g className="pl-dpop" style={{ "--i": i }}>
            <rect x="640" y={ROW(i) - 15} width="142" height="30" rx="6" className="pl-fpill" />
            <text x="656" y={ROW(i) + 4} className="pl-flabel">{s.t}</text>
          </g>
          <path d={flow(i)} className="pl-fflow pl-ddraw" pathLength="100" style={{ "--i": i }} />
          <Carry d={flow(i)} icon={s.icon} i={i} tone="run" into={680} />
        </g>
      ))}
      <circle cx="858" cy="198" r="4" className="pl-fjoin pl-dbeat" />

      <g className="pl-dpop" style={{ "--i": 5 }}>
        <rect x="868" y="148" width="152" height="96" rx="10" className="pl-fscreen" />
        <rect x="878" y="158" width="132" height="68" rx="6" className="pl-fbezel pl-fglow" />
        {[0, 1, 2].map((j) => (
          <circle key={j} cx={888 + j * 8} cy="168" r="2" className="pl-fchrome" />
        ))}
        {/* JetBrains Mono advances exactly 0.6em, so the bars land where the E would */}
        <text x="900" y="205" className="pl-fmark">M</text>
        <text x="935" y="205" className="pl-fmark">DORA</text>
        {[0, 1, 2].map((j) => (
          <rect key={j} x="916" y={189 + j * 6} width="16" height="3.2" rx="1.6"
            className={"pl-fbar pl-fbar--" + (j === 1 ? "warn" : "accent")} style={{ "--i": j }} />
        ))}
        <rect x="930" y="244" width="28" height="9" className="pl-fstand" />
        <rect x="906" y="253" width="76" height="6" rx="3" className="pl-fstand" />
      </g>

      <path d="M1020 196 H1046" className="pl-fflow pl-ddraw" pathLength="100" style={{ "--i": 6 }} />
      <path d="M1020 196 H1046" className="pl-dcomet pl-dcomet--out" pathLength="100" style={{ "--i": 5 }} />

      <g className="pl-dpop" style={{ "--i": 6 }}>
        <rect x="1046" y="148" width="126" height="98" rx="8" className="pl-fcard" />
        {[0, 1, 2, 3, 4].map((j) => (
          <circle key={j} cx={1064 + j * 15} cy="178" r="3.4" className="pl-fstream" style={{ "--i": j }} />
        ))}
        <circle cx="1067" cy="211" r="3.4" className="pl-flive" />
        <text x="1078" y="215" className="pl-fbig">Live</text>
        <text x="1064" y="231" className="pl-fsub">as it is captured</text>
      </g>

      {MEDORA_TILES.map((t, i) => (
        <FlowTile key={t.t} x={640 + i * 178} y={344} tile={t} tone="accent" i={i + 5} />
      ))}
    </svg>
  );
}
/* Portrait composition: the two panels stack, so the page only ever
   scrolls downward. 420 units wide renders close to 1:1 on a phone,
   which keeps the labels at their intended size. */
const NROW = (i) => 94 + i * 38;

function FlowNarrow({ innerRef, on }) {
  const scatter = (i) => {
    const to = NROW((i + 2) % 5);
    return "M164 " + NROW(i) + " C 190 " + NROW(i) + ", 206 " + to + ", 232 " + to;
  };
  const flow = (i) => "M164 " + (NROW(i) + 580) + " C 196 " + (NROW(i) + 580) + ", 206 750, 238 750";

  return (
    <svg className="pl-diagram pl-danim pl-flowfig pl-flowfig--narrow" data-run={on ? "1" : "0"}
      ref={innerRef} viewBox="0 0 420 1190" role="img"
      aria-label="Two panels compared. Today: five inputs — scheduling, clinician notes, paper source, patient travel and reimbursement — scatter across whichever channel is to hand, whether phone, email, scan, photo or spreadsheet, are gathered by hand, and arrive days later if they arrive at all; the route varies, data is re-keyed twice over and the audit trail has gaps. With MEDORA: the same five inputs follow one route into MEDORA and are live as they are captured, entered once at the bedside, with a complete audit trail.">

      <defs>
        <clipPath id="pl-flowclipn">
          <rect x="1" y="1" width="418" height="1188" rx="11" />
        </clipPath>
      </defs>

      <g clipPath="url(#pl-flowclipn)">
        <rect x="0" y="0" width="420" height="580" className="pl-fpanel pl-fpanel--warm" />
        <rect x="0" y="580" width="420" height="610" className="pl-fpanel pl-fpanel--cool" />
      </g>
      <rect x="1" y="1" width="418" height="1188" rx="11" className="pl-fframe" />
      <line x1="1" y1="580" x2="419" y2="580" className="pl-fdivide" />

      {/* ---------------- TODAY ---------------- */}
      <g className="pl-dfade">
        <text x="22" y="44" className="pl-fhead">Today</text>
        <rect x="22" y="53" width="26" height="3" rx="1.5" className="pl-frule pl-frule--warn" />
      </g>
      <text x="278" y="72" textAnchor="middle" className="pl-fnote pl-fnote--warn pl-dfade">whichever is to hand</text>

      {FLOW_INPUTS.map((s, i) => (
        <g key={s.t}>
          <g className="pl-dpop" style={{ "--i": i }}>
            <rect x="18" y={NROW(i) - 15} width="146" height="30" rx="6" className="pl-fpill" />
            <text x="32" y={NROW(i) + 4} className="pl-flabel">{s.t}</text>
          </g>
          <path d={scatter(i)} className="pl-fscatter pl-ddraw" pathLength="100" style={{ "--i": i }} />
          <Carry d={scatter(i)} icon={s.icon} i={i} tone="stall" into={250} />
        </g>
      ))}

      {FLOW_CHANNELS.map((s, i) => (
        <g key={s} className="pl-dpop pl-dflicker" style={{ "--i": i }}>
          <rect x="232" y={NROW(i) - 13} width="92" height="26" rx="6" className="pl-fpill pl-fpill--dim" />
          <text x="278" y={NROW(i) + 4} textAnchor="middle" className="pl-flabel pl-flabel--dim">{s}</text>
        </g>
      ))}

      {FLOW_CHANNELS.map((s, i) => (
        <g key={s + "g"}>
          <path d={"M324 " + NROW(i) + " H366"} className="pl-fgather pl-ddraw" pathLength="100"
            style={{ "--i": i }} />
          <circle cx="334" cy={NROW(i)} r="3.2" className="pl-fbead pl-fbead--n" style={{ "--i": i }} />
          <circle cx="366" cy={NROW(i)} r="3.2" className="pl-fbead pl-fbead--end" style={{ "--i": i }} />
          <path d={"M366 " + NROW(i) + " V300"} className="pl-fdeliver" pathLength="100" style={{ "--i": i }} />
        </g>
      ))}
      <path d="M366 80 V262" className="pl-fbracket pl-ddraw" pathLength="100" style={{ "--i": 5 }} />
      <text x="300" y="286" textAnchor="end" className="pl-fnote pl-fnote--warn pl-dfade">gathered by hand</text>

      <g className="pl-dpop pl-djitter" style={{ "--i": 6 }}>
        <rect x="18" y="300" width="384" height="86" rx="8" className="pl-fcard" />
        {[0, 1, 2, 3, 4].map((j) => (
          j === 2
            ? <circle key={j} cx={40 + j * 16} cy="330" r="5" className="pl-fseek" />
            : <circle key={j} cx={40 + j * 16} cy="330" r="3.4" className="pl-fstale" style={{ "--i": j }} />
        ))}
        <g className="pl-fclock pl-fclock--n">
          <circle cx="374" cy="330" r="8.5" className="pl-fclockface" />
          <path d="M374 325.5 V330 l3.6 2.1" className="pl-fhand" />
        </g>
        <text x="38" y="364" className="pl-fbig">Days later</text>
        <text x="38" y="380" className="pl-fsub">if it arrives</text>
      </g>

      {TODAY_TILES.map((t, i) => (
        <FlowTile key={t.t} x={18} y={404 + i * 56} w={384} h={50} tile={t} tone="warn" i={i + 5} />
      ))}

      {/* ---------------- WITH MEDORA ---------------- */}
      <g className="pl-dfade">
        <text x="22" y="624" className="pl-fhead">With MEDORA</text>
        <rect x="22" y="633" width="62" height="3" rx="1.5" className="pl-frule pl-frule--accent" />
      </g>

      {FLOW_INPUTS.map((s, i) => (
        <g key={s.t + "m"}>
          <g className="pl-dpop" style={{ "--i": i }}>
            <rect x="18" y={NROW(i) + 565} width="146" height="30" rx="6" className="pl-fpill" />
            <text x="32" y={NROW(i) + 584} className="pl-flabel">{s.t}</text>
          </g>
          <path d={flow(i)} className="pl-fflow pl-ddraw" pathLength="100" style={{ "--i": i }} />
          <Carry d={flow(i)} icon={s.icon} i={i} tone="run" into={256} />
        </g>
      ))}
      <circle cx="238" cy="750" r="4" className="pl-fjoin pl-dbeat" />

      <g className="pl-dpop" style={{ "--i": 5 }}>
        <rect x="238" y="706" width="140" height="88" rx="10" className="pl-fscreen" />
        <rect x="246" y="714" width="124" height="62" rx="6" className="pl-fbezel pl-fglow" />
        {[0, 1, 2].map((j) => (
          <circle key={j} cx={256 + j * 8} cy="724" r="2" className="pl-fchrome" />
        ))}
        <text x="272" y="758" className="pl-fmark pl-fmark--n">M</text>
        <text x="301" y="758" className="pl-fmark pl-fmark--n">DORA</text>
        {[0, 1, 2].map((j) => (
          <rect key={j} x="285" y={745 + j * 5} width="13" height="2.8" rx="1.4"
            className={"pl-fbar pl-fbar--" + (j === 1 ? "warn" : "accent")} style={{ "--i": j }} />
        ))}
        <rect x="296" y="794" width="24" height="8" className="pl-fstand" />
        <rect x="278" y="802" width="60" height="5" rx="2.5" className="pl-fstand" />
      </g>

      <path d="M308 807 V858" className="pl-fflow pl-ddraw" pathLength="100" style={{ "--i": 6 }} />
      <path d="M308 807 V858" className="pl-dcomet pl-dcomet--out" pathLength="100" style={{ "--i": 5 }} />

      <g className="pl-dpop" style={{ "--i": 6 }}>
        <rect x="18" y="858" width="384" height="86" rx="8" className="pl-fcard" />
        {[0, 1, 2, 3, 4].map((j) => (
          <circle key={j} cx={40 + j * 16} cy="888" r="3.4" className="pl-fstream" style={{ "--i": j }} />
        ))}
        <circle cx="41" cy="920" r="3.4" className="pl-flive" />
        <text x="52" y="924" className="pl-fbig">Live</text>
        <text x="38" y="938" className="pl-fsub">as it is captured</text>
      </g>

      {MEDORA_TILES.map((t, i) => (
        <FlowTile key={t.t} x={18} y={962 + i * 56} w={384} h={50} tile={t} tone="accent" i={i + 5} />
      ))}
    </svg>
  );
}

function ProblemFlow() {
  const [ref, on] = useInView(0.2);
  const narrow = useNarrow();
  return narrow ? <FlowNarrow innerRef={ref} on={on} /> : <FlowWide innerRef={ref} on={on} />;
}

/* spec 6.4 — Visit Record hub with spokes */

/* spec 6.4 — Visit Record hub with spokes */
function HubDiagram({ spokes }) {
  const R = 118;
  return (
    <svg className="pl-diagram" viewBox="0 0 700 320" role="img"
      aria-label={`Visit Record at the centre with spokes to ${spokes.join(", ")}.`}>
      {spokes.map((s, i) => {
        const a = (-90 + i * (360 / spokes.length)) * (Math.PI / 180);
        const x = 350 + Math.cos(a) * R;
        const y = 160 + Math.sin(a) * R;
        return (
          <g key={s}>
            <path d={`M350 160 L${x} ${y}`} className="pl-dline pl-dline--flow" />
            <rect x={x - 66} y={y - 15} width="132" height="30" rx="15" className="pl-dnode" />
            <text x={x} y={y + 4} textAnchor="middle" className="pl-dtext" style={{ fontSize: 8 }}>
              {s.toUpperCase()}
            </text>
          </g>
        );
      })}
      <circle cx="350" cy="160" r="52" className="pl-dnode pl-dnode--accent" />
      <text x="350" y="157" textAnchor="middle" className="pl-dtext pl-dtext--ink" style={{ fontSize: 9 }}>VISIT</text>
      <text x="350" y="170" textAnchor="middle" className="pl-dtext pl-dtext--ink" style={{ fontSize: 9 }}>RECORD</text>
    </svg>
  );
}

/* spec 8.3 — typical phone photo spreads; MEDORA is one clean line */

/* spec 8.3 — typical phone photo spreads; MEDORA is one clean line */
function ByodDiagram() {
  return (
    <svg className="pl-diagram" viewBox="0 0 760 240" role="img"
      aria-label="A typical phone photo copies into gallery, backup and chat. MEDORA Secure Scanning sends one clean line to the cloud.">
      <text x="20" y="18" className="pl-dtext pl-dtext--muted">TYPICAL PHONE PHOTO</text>
      <rect x="20" y="86" width="60" height="96" rx="9" className="pl-dnode" />
      {["GALLERY", "BACKUP", "CHAT"].map((s, i) => (
        <g key={s} className="pl-dim">
          <path d={`M80 134 C 140 134, 150 ${52 + i * 62}, 196 ${52 + i * 62}`} className="pl-dline pl-dline--tangle" />
          <rect x="196" y={38 + i * 62} width="96" height="28" rx="14" className="pl-dnode" />
          <text x="244" y={56 + i * 62} textAnchor="middle" className="pl-dtext" style={{ fontSize: 8 }}>{s}</text>
        </g>
      ))}
      <line x1="380" y1="14" x2="380" y2="226" stroke="var(--line)" />
      <text x="410" y="18" className="pl-dtext pl-dtext--muted">MEDORA SECURE SCANNING</text>
      <rect x="410" y="86" width="60" height="96" rx="9" className="pl-dnode" />
      <text x="440" y="200" textAnchor="middle" className="pl-dtext pl-dtext--muted" style={{ fontSize: 8 }}>0 FILES</text>
      <path d="M470 134 H600" className="pl-dline pl-dline--flow" />
      <rect x="600" y="110" width="130" height="48" rx="8" className="pl-dnode pl-dnode--accent" />
      <text x="665" y="139" textAnchor="middle" className="pl-dtext pl-dtext--ink" style={{ fontSize: 8.5 }}>SECURE CLOUD</text>
    </svg>
  );
}

/* spec 9.4 / 11.2 — simple closed loop */

/* spec 9.4 / 11.2 — simple closed loop */
function LoopDiagram({ steps }) {
  return (
    <svg className="pl-diagram" viewBox="0 0 760 120" role="img" aria-label={steps.join(" to ")}>
      {steps.map((s, i) => {
        const x = 20 + i * (720 / steps.length);
        const w = 720 / steps.length - 26;
        return (
          <g key={s}>
            <rect x={x} y="40" width={w} height="38" rx="19" className="pl-dnode" />
            <text x={x + w / 2} y="64" textAnchor="middle" className="pl-dtext" style={{ fontSize: 9 }}>
              {s.toUpperCase()}
            </text>
            {i < steps.length - 1 && (
              <path d={`M${x + w} 59 H${x + w + 24}`} className="pl-dline pl-dline--flow" />
            )}
          </g>
        );
      })}
    </svg>
  );
}

/* spec 11.1 — dotted map, UK highlighted, arcs reaching outward */

/* spec 11.1 — dotted map, UK highlighted, arcs reaching outward */
function MapDiagram() {
  const dots = [];
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 26; c++) {
      const x = 30 + c * 20, y = 24 + r * 18;
      const d = Math.hypot(x - 300, y - 110);
      if (d < 250 && (r + c) % 2 === 0) dots.push({ x, y });
    }
  }
  return (
    <svg className="pl-diagram" viewBox="0 0 580 200" role="img"
      aria-label="A dotted world map with the United Kingdom highlighted and fine arcs reaching outward.">
      {dots.map((d, i) => <circle key={i} cx={d.x} cy={d.y} r="1.6" fill="var(--line)" />)}
      {[[150, 40], [470, 60], [430, 170], [110, 160]].map(([x, y], i) => (
        <path key={i} d={`M292 96 Q ${(292 + x) / 2} ${Math.min(96, y) - 40}, ${x} ${y}`}
          className="pl-dline pl-dline--flow" />
      ))}
      <circle cx="292" cy="96" r="7" fill="var(--accent)" />
      <text x="292" y="80" textAnchor="middle" className="pl-dtext" style={{ fontSize: 9 }}>UK</text>
    </svg>
  );
}

export { ProblemFlow, HubDiagram, ByodDiagram, LoopDiagram, MapDiagram };
