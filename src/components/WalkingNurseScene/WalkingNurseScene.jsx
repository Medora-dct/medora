/**
 * WalkingNurseScene
 * ------------------------------------------------------------------
 * A looping "walk cycle + parallax neighbourhood" hero animation for a
 * decentralized mobile clinical nursing / patient concierge product.
 *
 * Design notes
 *  - Six independently scrolling layers (sky → far skyline → mid street →
 *    near street → kerb → foreground) create depth. Each layer is a flex
 *    track holding the same 1600x400 SVG tile twice; the track translates
 *    -50%, which is exactly one tile, so the loop is seamless.
 *  - Every tile shares viewBox height 400 with the hero, and the ground
 *    line lives at y=340 in all of them, so layers stay registered at any
 *    container height. Tiles are `height:100%; width:auto`, so the scene
 *    scales without distortion.
 *  - The hero is a jointed figure (thigh → shin → foot, upper arm →
 *    forearm → hand) animated with CSS rotations around real joint
 *    coordinates. Only transform/opacity animate, so it stays on the
 *    compositor.
 *
 * Usage
 *   import WalkingNurseScene from "./WalkingNurseScene";
 *   <WalkingNurseScene speed={1} />
 *
 * Props
 *   speed              number   global multiplier for all motion (default 1)
 *   height             string   CSS height override, e.g. "60vh"
 *   heroPosition       string   horizontal position of the nurse (default "34%")
 *   sketchy            bool     hand-drawn displacement filter (default true)
 *   paused             bool     force-pause
 *   pauseWhenOffscreen bool     pause via IntersectionObserver (default true)
 *   pauseWhenHidden    bool     pause when the tab is backgrounded (default true)
 *   showPins           bool     floating visit markers over homes (default true)
 *   caption            {lead,mark,tail}  a line set into the street behind
 *                      the nurse; mark is the word that gets the underline
 *   label              string   accessible description of the scene
 *
 * Theming: override the --ws-* custom properties on .ws-scene (or any
 * ancestor) to restyle without touching this file.
 */

import React, { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import "./WalkingNurseScene.css";

const W = 1600; // tile width, user units
const H = 400; // tile height, user units
const G = 340; // ground line, shared by every layer and the hero

/* ------------------------------------------------------------------ *
 * Primitives
 * ------------------------------------------------------------------ */

function Windows({ x, y, w, h, cols, rows, lit = [] }) {
  const cells = [];
  const cw = w / cols;
  const ch = h / rows;
  const ww = Math.min(cw * 0.54, 13);
  const wh = Math.min(ch * 0.52, 15);
  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < cols; c += 1) {
      const on = lit.some(([lr, lc]) => lr === r && lc === c);
      cells.push(
        <rect
          key={`${r}-${c}`}
          x={+(x + c * cw + (cw - ww) / 2).toFixed(1)}
          y={+(y + r * ch + (ch - wh) / 2).toFixed(1)}
          width={+ww.toFixed(1)}
          height={+wh.toFixed(1)}
          rx="1.5"
          className={on ? "ws-win ws-win--lit" : "ws-win"}
        />
      );
    }
  }
  return <g>{cells}</g>;
}

function Tower({ x, w, h, cols, rows, ledge = true, lit = [], door }) {
  const y = G - h;
  return (
    <g>
      {ledge && <rect x={x - 7} y={y - 9} width={w + 14} height="10" rx="2" className="ws-paper" />}
      <rect x={x} y={y} width={w} height={h} rx="2" className="ws-paper" />
      <Windows x={x + 11} y={y + 16} w={w - 22} h={h - (door ? 60 : 32)} cols={cols} rows={rows} lit={lit} />
      {door && (
        <>
          <rect x={x + w / 2 - 13} y={G - 30} width="26" height="30" rx="2" className="ws-door" />
          <path className="ws-hair-line" d={`M${x + w / 2} ${G - 30} v30`} />
        </>
      )}
    </g>
  );
}

function House({ x, w = 98, h = 56, roof = 30, tone = "clay", lit = true }) {
  const y = G - h;
  const dx = x + w * 0.4;
  return (
    <g>
      <path className={`ws-roof ws-roof--${tone}`} d={`M${x - 11} ${y} L${x + w / 2} ${y - roof} L${x + w + 11} ${y} Z`} />
      <rect x={x} y={y} width={w} height={h} rx="2" className="ws-paper" />
      <rect x={x + 10} y={y + 13} width="19" height="17" rx="2" className={lit ? "ws-win ws-win--lit" : "ws-win"} />
      <rect x={x + w - 29} y={y + 13} width="19" height="17" rx="2" className="ws-win" />
      <rect x={dx} y={G - 27} width="21" height="27" rx="2" className="ws-door" />
      <circle cx={dx + 16} cy={G - 14} r="1.8" className="ws-dot" />
      <path className="ws-line-soft" d={`M${x - 11} ${y} h${w + 22}`} />
    </g>
  );
}

function Clinic({ x, w = 150, h = 92 }) {
  const y = G - h;
  return (
    <g>
      <rect x={x - 6} y={y - 10} width={w + 12} height="10" rx="2" className="ws-paper" />
      <rect x={x} y={y} width={w} height={h} rx="2" className="ws-paper" />
      <Windows x={x + 12} y={y + 14} w={w - 24} h="34" cols="4" rows="1" lit={[[0, 1]]} />
      {/* teal awning over the entrance */}
      <path className="ws-awning" d={`M${x + 10} ${G - 46} h${w - 20} l-10 16 h${-(w - 40)} z`} />
      <rect x={x + w / 2 - 22} y={G - 30} width="44" height="30" rx="2" className="ws-door ws-door--glass" />
      <path className="ws-hair-line" d={`M${x + w / 2} ${G - 30} v30`} />
      {/* care cross sign */}
      <rect x={x + w - 34} y={y - 34} width="26" height="26" rx="4" className="ws-sign" />
      <path className="ws-cross" d={`M${x + w - 21} ${y - 28} v14 M${x + w - 28} ${y - 21} h14`} />
      <path className="ws-line-soft" d={`M${x + w - 21} ${y - 8} v8`} />
    </g>
  );
}

function Tree({ x, s = 1, kind = "round" }) {
  const top = G - 74 * s;
  return (
    <g>
      <path className="ws-trunk" d={`M${x} ${G} L${x} ${top + 18 * s}`} />
      {kind === "round" ? (
        <ellipse cx={x} cy={top} rx={+(25 * s).toFixed(1)} ry={+(27 * s).toFixed(1)} className="ws-leaf" />
      ) : (
        <path
          className="ws-leaf"
          d={`M${x} ${top - 30 * s}
              C${x + 24 * s} ${top - 8 * s} ${x + 17 * s} ${top + 24 * s} ${x} ${top + 24 * s}
              C${x - 17 * s} ${top + 24 * s} ${x - 24 * s} ${top - 8 * s} ${x} ${top - 30 * s} Z`}
        />
      )}
    </g>
  );
}

function Lamp({ x, dir = 1 }) {
  const top = G - 122;
  return (
    <g>
      <path className="ws-line" d={`M${x} ${G} V${top + 8} q0 -10 ${10 * dir} -10 h${14 * dir}`} />
      <ellipse cx={x + 26 * dir} cy={top - 1} rx="7.5" ry="5.5" className="ws-lamp" />
      <circle cx={x + 26 * dir} cy={top + 3} r="12" className="ws-glow" />
      <path className="ws-line" d={`M${x - 5} ${G} h10`} />
    </g>
  );
}

function TrafficLight({ x }) {
  const top = G - 118;
  return (
    <g>
      <path className="ws-line" d={`M${x} ${G} V${top}`} />
      <rect x={x - 8} y={top - 34} width="16" height="36" rx="5" className="ws-paper" />
      <circle cx={x} cy={top - 26} r="3.6" className="ws-dot ws-dot--stop" />
      <circle cx={x} cy={top - 16} r="3.6" className="ws-dot ws-dot--wait" />
      <circle cx={x} cy={top - 6} r="3.6" className="ws-dot ws-dot--go" />
    </g>
  );
}

function Bench({ x }) {
  return (
    <g>
      <path className="ws-line" d={`M${x} ${G - 16} h56 M${x + 4} ${G - 23} h48`} />
      <path className="ws-line" d={`M${x + 8} ${G - 16} v16 M${x + 48} ${G - 16} v16`} />
    </g>
  );
}

function Bike({ x }) {
  return (
    <g>
      <circle cx={x} cy={G - 11} r="11" className="ws-wheel" />
      <circle cx={x + 31} cy={G - 11} r="11" className="ws-wheel" />
      <path
        className="ws-line"
        d={`M${x} ${G - 11} L${x + 11} ${G - 27} L${x + 26} ${G - 27} L${x + 31} ${G - 11}
            M${x + 11} ${G - 27} L${x + 18} ${G - 11}
            M${x + 26} ${G - 27} L${x + 29} ${G - 35}
            M${x + 9} ${G - 29} l-7 -4`}
      />
    </g>
  );
}

function Car({ x, tone = "steel" }) {
  return (
    <g className={`ws-car ws-car--${tone}`}>
      <path
        className="ws-car-body"
        d={`M${x} ${G - 12} v-9 q0 -8 9 -10 l13 -13 q3 -3 8 -3 h28 q5 0 8 3 l13 13 q9 2 9 10 v9 z`}
      />
      <path className="ws-line-soft" d={`M${x + 22} ${G - 31} h34 M${x + 39} ${G - 31} v-13`} />
      <circle cx={x + 21} cy={G - 11} r="8" className="ws-wheel" />
      <circle cx={x + 67} cy={G - 11} r="8" className="ws-wheel" />
    </g>
  );
}

/** The branded home-visit vehicle — the one element allowed to shout. */
function CareVan({ x }) {
  return (
    <g>
      <path className="ws-van-body" d={`M${x} ${G - 12} v-32 q0 -6 6 -6 h62 l16 15 q6 2 6 9 v14 z`} />
      <path className="ws-van-glass" d={`M${x + 70} ${G - 48} l14 14 h-14 z`} />
      <rect x={x + 12} y={G - 42} width="40" height="16" rx="2" className="ws-van-panel" />
      <path className="ws-cross ws-cross--sm" d={`M${x + 32} ${G - 39} v10 M${x + 27} ${G - 34} h10`} />
      <circle cx={x + 20} cy={G - 11} r="9" className="ws-wheel" />
      <circle cx={x + 74} cy={G - 11} r="9" className="ws-wheel" />
    </g>
  );
}

function Bush({ x, s = 1 }) {
  return (
    <path
      className="ws-leaf ws-leaf--low"
      d={`M${x - 20 * s} ${G} q2 -20 ${16 * s} -21 q6 -14 ${20 * s} -6 q14 -2 ${14 * s} 27 z`}
    />
  );
}

function Planter({ x }) {
  return (
    <g>
      <path className="ws-line" d={`M${x - 9} ${G - 13} h18 l-3 13 h-12 z`} />
      <path className="ws-stem" d={`M${x} ${G - 13} v-9 M${x} ${G - 19} q-9 -2 -10 -10 q10 -1 10 10 M${x} ${G - 22} q9 -2 10 -10 q-10 -1 -10 10`} />
    </g>
  );
}

function Bin({ x }) {
  return (
    <g>
      <path className="ws-line" d={`M${x - 9} ${G - 20} l3 20 h12 l3 -20 z M${x - 11} ${G - 20} h22`} />
    </g>
  );
}

function Hydrant({ x }) {
  return (
    <g>
      <path className="ws-hydrant" d={`M${x - 6} ${G} v-14 q6 -8 12 0 v14 z`} />
      <path className="ws-line" d={`M${x - 9} ${G - 16} h18 M${x} ${G - 20} v-4`} />
    </g>
  );
}

function SignPost({ x, text = "Rosehill Ave" }) {
  return (
    <g>
      <path className="ws-line" d={`M${x} ${G} v-64`} />
      <rect x={x - 2} y={G - 78} width="74" height="15" rx="3" className="ws-sign ws-sign--street" />
      <text x={x + 5} y={G - 67} className="ws-sign-text">
        {text}
      </text>
    </g>
  );
}

function Pin({ x, y, delay = 0, done = false }) {
  return (
    <g className="ws-a-pin" style={{ animationDelay: `${delay}s` }}>
      <path className={done ? "ws-pin ws-pin--done" : "ws-pin"} d={`M${x} ${y} c-10 -11 -15 -18 -15 -26 a15 15 0 1 1 30 0 c0 8 -5 15 -15 26 z`} />
      {done ? (
        <path className="ws-pin-mark" d={`M${x - 6} ${y - 27} l4 5 l8 -9`} />
      ) : (
        <path className="ws-pin-mark" d={`M${x} ${y - 33} v12 M${x - 6} ${y - 27} h12`} />
      )}
    </g>
  );
}

function Cloud({ x, y, s = 1 }) {
  return (
    <path
      className="ws-cloud"
      d={`M${x} ${y} q0 -${16 * s} ${20 * s} -${16 * s} q4 -${13 * s} ${20 * s} -${9 * s}
          q14 -${9 * s} ${19 * s} ${9 * s} q${17 * s} 0 ${17 * s} ${16 * s} z`}
    />
  );
}

function Bird({ x, y, s = 1 }) {
  return <path className="ws-bird" d={`M${x} ${y} q${5 * s} -${5 * s} ${9 * s} 0 q${4 * s} -${5 * s} ${9 * s} 0`} />;
}

/* ------------------------------------------------------------------ *
 * Layer tiles — each is 1600 x 400 and loops against itself
 * ------------------------------------------------------------------ */

function SkyTile() {
  return (
    <>
      <Cloud x={90} y={92} s={1.1} />
      <Cloud x={520} y={58} s={0.8} />
      <Cloud x={900} y={104} s={1.3} />
      <Cloud x={1290} y={66} s={0.9} />
      <Bird x={330} y={74} />
      <Bird x={352} y={84} s={0.8} />
      <Bird x={1080} y={60} s={0.9} />
    </>
  );
}

function FarTile({ filter }) {
  const towers = [
    [30, 88, 186], [140, 64, 132], [228, 96, 214], [352, 72, 160],
    [450, 104, 238], [576, 70, 148], [668, 92, 196], [790, 58, 124],
    [872, 100, 226], [996, 76, 168], [1092, 88, 202], [1206, 66, 140],
    [1296, 98, 222], [1420, 72, 158], [1512, 86, 190],
  ];
  return (
    <>
      <g className="ws-ghost" filter={filter}>
        {towers.map(([x, w, h]) => (
          <g key={x}>
            <rect x={x} y={G - h} width={w} height={h} />
            <Windows x={x + 12} y={G - h + 16} w={w - 24} h={h - 40} cols={Math.max(2, Math.round(w / 34))} rows={Math.max(3, Math.round(h / 40))} />
          </g>
        ))}
      </g>
    </>
  );
}

function MidTile({ filter, showPins }) {
  return (
    <>
      <g className="ws-mid" filter={filter}>
        <Tower x={40} w={118} h={182} cols={3} rows={5} lit={[[1, 2], [3, 0]]} door />
        <Tree x={196} s={0.92} />
        <House x={232} w={104} h={58} tone="clay" />
        <Tower x={382} w={132} h={214} cols={4} rows={6} lit={[[0, 1], [2, 3], [4, 0]]} door />
        <Tree x={548} s={1.05} kind="tall" />
        <House x={586} w={92} h={52} tone="sage" lit={false} />
        <Clinic x={712} />
        <Tower x={900} w={112} h={170} cols={3} rows={5} lit={[[2, 1]]} door />
        <Tree x={1048} s={0.88} />
        <House x={1086} w={110} h={60} tone="amber" />
        <Tower x={1242} w={126} h={198} cols={4} rows={6} lit={[[1, 0], [3, 3]]} door />
        <Tree x={1408} s={1} kind="tall" />
        <House x={1446} w={98} h={54} tone="clay" lit={false} />
      </g>
      {showPins && (
        <g className="ws-pins">
          <Pin x={284} y={G - 100} delay={0} />
          <Pin x={1141} y={G - 104} delay={1.1} done />
          <Pin x={632} y={G - 94} delay={2.2} done />
        </g>
      )}
    </>
  );
}

function NearTile({ filter }) {
  return (
    <>
      <g className="ws-near" filter={filter}>
        <Lamp x={96} />
        <Bench x={166} />
        <Planter x={262} />
        <TrafficLight x={330} />
        <Car x={392} tone="steel" />
        <Bush x={520} s={1.1} />
        <Lamp x={596} dir={-1} />
        <Bike x={664} />
        <SignPost x={748} text="Rosehill Ave" />
        <Bin x={860} />
        <Bush x={912} s={0.9} />
        <CareVan x={968} />
        <Lamp x={1116} />
        <Hydrant x={1184} />
        <Bench x={1232} />
        <Planter x={1332} />
        <TrafficLight x={1396} />
        <Bike x={1460} />
        <Bush x={1548} s={1} />
      </g>
    </>
  );
}

function KerbTile({ filter }) {
  const dashes = [];
  for (let x = 0; x < W; x += 64) dashes.push(x);
  return (
    <>
      {/* The ground and kerb lines are drawn by CSS on the scene itself, not
          here: a line inside a tile has to survive every tile seam, and a
          filtered one jogs. Drawn once across the container, it cannot break. */}
      <g filter={filter}>
        {dashes.map((x) => (
          <path key={x} className="ws-paving" d={`M${x + 8} ${G + 2} v9`} />
        ))}
        {[74, 348, 690, 1022, 1364].map((x) => (
          <path key={x} className="ws-tuft" d={`M${x} ${G} q-3 -9 -8 -12 M${x} ${G} q1 -11 6 -14 M${x} ${G} q6 -7 12 -8`} />
        ))}
      </g>
    </>
  );
}

function ForeTile({ filter }) {
  return (
    <>
      <g className="ws-fore" filter={filter}>
        <path className="ws-tuft ws-tuft--big" d={`M180 ${G + 22} q-6 -18 -16 -24 M180 ${G + 22} q2 -22 12 -28 M180 ${G + 22} q12 -14 24 -16`} />
        <Bush x={620} s={1.5} />
        <path className="ws-tuft ws-tuft--big" d={`M1010 ${G + 22} q-6 -18 -16 -24 M1010 ${G + 22} q2 -22 12 -28 M1010 ${G + 22} q12 -14 24 -16`} />
        <Bush x={1400} s={1.35} />
      </g>
    </>
  );
}

/* ------------------------------------------------------------------ *
 * The nurse — jointed figure, viewBox 240x400, feet land on y=340
 * ------------------------------------------------------------------ */

function Nurse() {
  return (
    <svg className="ws-hero" viewBox="0 0 240 400" aria-hidden="true" focusable="false">
      <ellipse className="ws-a-shadow ws-shadow" cx="124" cy="342" rx="36" ry="5" />

      {/* dust kicked up behind the stride */}
      <g className="ws-dust">
        <path className="ws-a-dust" d="M104 336 q7 -8 15 -2 q-7 7 -15 2 z" />
        <path className="ws-a-dust" style={{ animationDelay: "-0.55s" }} d="M112 332 q6 -7 13 -2 q-6 6 -13 2 z" />
      </g>

      <g className="ws-a-body">
        {/* ---- far arm (behind the torso) ---- */}
        <g className="ws-a-arm ws-a-arm--b ws-limb-back">
          <path className="ws-sleeve" d="M120 204 L120 232" />
          <g className="ws-a-forearm ws-a-forearm--b">
            <path className="ws-skin-line" d="M120 232 L120 260" />
            <circle className="ws-skin" cx="120" cy="262" r="5" />
          </g>
        </g>

        {/* ---- far leg ---- */}
        <g className="ws-a-thigh ws-a-thigh--b ws-limb-back">
          <path className="ws-trouser" d="M120 258 L120 298" />
          <g className="ws-a-shin ws-a-shin--b">
            <path className="ws-trouser" d="M120 298 L120 332" />
            <g className="ws-a-foot ws-a-foot--b">
              <path className="ws-shoe" d="M117 332 q-2 7 3 8 h14 q4 -1 2 -5 l-9 -5 z" />
            </g>
          </g>
        </g>

        {/* ---- backpack, worn on the far shoulder ---- */}
        <g className="ws-pack">
          <path className="ws-pack-body" d="M100 212 q-16 2 -16 20 v18 q0 8 9 8 h13 v-46 z" />
          <path className="ws-pack-flap" d="M100 212 q-16 2 -16 20 h22 z" />
          <path className="ws-cross ws-cross--sm" d="M92 236 v10 M87 241 h10" />
        </g>

        {/* ---- torso ---- */}
        <path className="ws-scrub" d="M104 200 q16 -6 32 0 q8 3 8 14 l-2 34 q-1 14 -6 16 q-16 5 -32 0 q-5 -2 -6 -16 l-2 -34 q0 -11 8 -14 z" />
        <path className="ws-scrub-line" d="M110 258 q14 4 26 0" />
        <path className="ws-vneck" d="M112 200 l8 14 l8 -14" />
        <rect className="ws-pocket" x="126" y="228" width="16" height="14" rx="2" />

        {/* ---- stethoscope ---- */}
        <g className="ws-a-steth">
          <path className="ws-steth-tube" d="M110 202 q-4 16 2 28 q3 6 8 6" />
          <path className="ws-steth-tube" d="M130 201 q6 14 3 26" />
          <circle className="ws-steth-bell" cx="132" cy="232" r="5.5" />
        </g>

        {/* ---- head ---- */}
        <g className="ws-head">
          <path className="ws-neck" d="M118 192 v10 h8 v-12 z" />
          <ellipse className="ws-skin" cx="122" cy="176" rx="17.5" ry="18.5" />
          <path className="ws-hair" d="M104 176 q-2 -22 18 -22 q19 0 19 19 q-9 -9 -22 -7 q-9 1 -12 10 z" />
          <g className="ws-a-hair">
            <circle className="ws-hair" cx="101" cy="170" r="9" />
            <path className="ws-hair" d="M99 176 q-9 8 -6 20 q2 8 9 8 q-8 -14 2 -26 z" />
          </g>
          <circle className="ws-eye" cx="132" cy="176" r="1.9" />
          <path className="ws-face-line" d="M139 178 q3 2 0 4" />
          <path className="ws-face-line" d="M130 186 q4 2 7 -1" />
        </g>

        {/* ---- near leg ---- */}
        <g className="ws-a-thigh ws-a-thigh--a">
          <path className="ws-trouser ws-trouser--front" d="M120 258 L120 298" />
          <g className="ws-a-shin ws-a-shin--a">
            <path className="ws-trouser ws-trouser--front" d="M120 298 L120 332" />
            <g className="ws-a-foot ws-a-foot--a">
              <path className="ws-shoe ws-shoe--front" d="M117 332 q-2 7 3 8 h14 q4 -1 2 -5 l-9 -5 z" />
            </g>
          </g>
        </g>

        {/* ---- near arm + the visit bag ---- */}
        <g className="ws-a-arm ws-a-arm--a">
          <path className="ws-sleeve ws-sleeve--front" d="M120 204 L120 232" />
          <g className="ws-a-forearm ws-a-forearm--a">
            <path className="ws-skin-line" d="M120 232 L120 258" />
            <circle className="ws-skin" cx="120" cy="260" r="5" />
            <g className="ws-a-bag">
              <path className="ws-bag-handle" d="M112 262 q8 -9 16 0" />
              <rect className="ws-bag" x="103" y="262" width="34" height="25" rx="5" />
              <path className="ws-bag-band" d="M103 272 h34" />
              <path className="ws-cross ws-cross--sm" d="M120 268 v12 M114 274 h12" />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ *
 * Scene
 * ------------------------------------------------------------------ */

const ASPECT = W / H; // a tile renders exactly this many times its own height

/** useLayoutEffect that doesn't warn during server rendering. */
const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * One parallax layer.
 *
 * The layer is a single <svg> that is `count` tiles wide. The tile geometry is
 * defined once in <defs> and stamped `count` times with <use>, so a wide
 * viewport costs a handful of extra nodes instead of a full copy of the
 * artwork each time. Scrolling by 100%/count is exactly one tile, so the loop
 * is seamless and — because that is a share of the element's own width — it
 * stays exact at every size with no measuring and no sub-pixel drift.
 */
function Layer({ name, duration, tileId, count, zIndex, children }) {
  const stamps = [];
  for (let i = 0; i < count; i += 1) stamps.push(<use key={i} href={`#${tileId}`} x={i * W} />);
  return (
    <div className={`ws-layer ws-layer--${name}`} style={{ "--ws-dur": duration, zIndex }}>
      <svg
        className="ws-track"
        style={{ "--ws-count": count }}
        viewBox={`0 0 ${W * count} ${H}`}
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <g id={tileId}>{children}</g>
        </defs>
        {stamps}
      </svg>
    </div>
  );
}

export default function WalkingNurseScene({
  speed = 1,
  height,
  heroPosition = "34%",
  sketchy = true,
  paused = false,
  pauseWhenOffscreen = true,
  pauseWhenHidden = true,
  showPins = true,
  maxTiles = 14,
  className = "",
  caption,
  label = "A community nurse walking through a neighbourhood on her round of home visits.",
  ...rest
}) {
  const rawId = useId();
  const uid = rawId.replace(/[^a-zA-Z0-9]/g, "");
  const filterId = `${uid}-sketch`;
  const filter = sketchy ? `url(#${filterId})` : undefined;

  const sceneRef = useRef(null);
  const [count, setCount] = useState(2);
  const [visible, setVisible] = useState(true);
  const [tabActive, setTabActive] = useState(true);

  /* ---- fit the strip to the container at any width or height ----
     A tile is `height:100%`, so one tile renders exactly ASPECT times the
     scene height wide — that is the whole reason a fixed two-tile strip runs
     out of scenery on a wide, short hero. Recount on every resize and keep
     one spare tile queued past the right edge. */
  useIsoLayoutEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return undefined;
    let frame = 0;

    const measure = () => {
      const { clientWidth: w, clientHeight: h } = scene;
      if (!w || !h) return;
      const needed = Math.min(maxTiles, Math.max(2, Math.ceil(w / (h * ASPECT)) + 1));
      setCount((prev) => (prev === needed ? prev : needed));
    };

    measure();

    if (typeof ResizeObserver === "undefined") {
      const onResize = () => {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(measure);
      };
      window.addEventListener("resize", onResize);
      return () => {
        cancelAnimationFrame(frame);
        window.removeEventListener("resize", onResize);
      };
    }

    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    });
    ro.observe(scene);
    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
    };
  }, [maxTiles]);

  useEffect(() => {
    if (!pauseWhenOffscreen || typeof IntersectionObserver === "undefined") return undefined;
    const node = sceneRef.current;
    if (!node) return undefined;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: "120px" });
    io.observe(node);
    return () => io.disconnect();
  }, [pauseWhenOffscreen]);

  useEffect(() => {
    if (!pauseWhenHidden || typeof document === "undefined") return undefined;
    const onChange = () => setTabActive(!document.hidden);
    document.addEventListener("visibilitychange", onChange);
    return () => document.removeEventListener("visibilitychange", onChange);
  }, [pauseWhenHidden]);

  const frozen = paused || !visible || !tabActive;

  return (
    <div
      ref={sceneRef}
      role="img"
      aria-label={caption ? label + " " + caption.lead + " " + caption.mark + " " + caption.tail : label}
      className={`ws-scene${frozen ? " is-paused" : ""}${className ? ` ${className}` : ""}`}
      style={{ "--ws-speed": speed, ...(height ? { height } : null), "--ws-hero-x": heroPosition }}
      {...rest}
    >
      {/* the filter lives in its own hidden svg so every layer can share it */}
      <svg className="ws-defs" aria-hidden="true" focusable="false">
        <filter id={filterId} x="-4%" y="-4%" width="108%" height="108%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.024" numOctaves="3" seed="9" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.7" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      <Layer name="sky" duration="260s" tileId={`${uid}-sky`} count={count} zIndex={1}>
        <SkyTile />
      </Layer>

      <Layer name="far" duration="120s" tileId={`${uid}-far`} count={count} zIndex={2}>
        <FarTile filter={filter} />
      </Layer>

      <Layer name="mid" duration="58s" tileId={`${uid}-mid`} count={count} zIndex={3}>
        <MidTile filter={filter} showPins={showPins} />
      </Layer>

      <Layer name="near" duration="30s" tileId={`${uid}-near`} count={count} zIndex={4}>
        <NearTile filter={filter} />
      </Layer>

      <Layer name="kerb" duration="22s" tileId={`${uid}-kerb`} count={count} zIndex={5}>
        <KerbTile filter={filter} />
      </Layer>

      {/* The line sits between the kerb and the nurse: later in the DOM than
          the kerb at the same z-index, so it paints over the street, but
          below the nurse at z-index 6 — she walks in front of it. */}
      {caption && (
        <div className="ws-cap" aria-hidden="true">
          <p className="ws-capline">
            {caption.lead}{" "}
            <span className="ws-capmark">
              {caption.mark}
              <svg className="ws-capunder" viewBox="0 0 120 12" preserveAspectRatio="none">
                <path d="M2.5 8.4C21 3.6 45 2.4 69.5 4.9c16.2 1.6 33 3.9 48 1" pathLength="100" />
              </svg>
            </span>{" "}
            {caption.tail}
          </p>
        </div>
      )}

      <Nurse />

      <Layer name="fore" duration="13s" tileId={`${uid}-fore`} count={count} zIndex={7}>
        <ForeTile filter={filter} />
      </Layer>
    </div>
  );
}
