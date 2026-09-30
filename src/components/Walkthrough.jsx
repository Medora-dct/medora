import React from "react";
import { useInView } from "../hooks/useInView";

/* A browser window running through the product: dashboard → visit list →
   visit form → done. Everything is skeleton — bars and boxes, no copy — so
   it reads as the shape of the app rather than a screenshot to be read.
   Laid out on a 900x560 grid; one 14s loop drives every scene. */

const NAV = [72, 88, 92, 46, 62, 56, 88, 60];
const ROWS = [0, 1, 2, 3, 4];
const PILL_TONE = ["ok", "warn", "info", "warn", "warn"];

/* skeleton bar */
const B = ({ x, y, w, h = 8, tone }) => (
  <rect x={x} y={y} width={w} height={h} rx={h / 2} className={"pl-wtbar" + (tone ? " pl-wtbar--" + tone : "")} />
);

function Walkthrough() {
  const [ref, on] = useInView(0.2);

  return (
    <div className="pl-wtwrap">
      <svg className="pl-wt" data-run={on ? "1" : "0"} ref={ref} viewBox="0 0 900 560" role="img"
        aria-label="An animation of the MEDORA platform: a dashboard, then a list of visits, then a visit source-document form, ending in a completed visit.">

        <defs>
          <clipPath id="pl-wtclip"><rect x="1" y="1" width="898" height="558" rx="14" /></clipPath>
        </defs>

        <g clipPath="url(#pl-wtclip)">
          <rect x="0" y="0" width="900" height="560" className="pl-wtpage" />

          {/* ---- window chrome ---- */}
          <rect x="0" y="0" width="900" height="36" className="pl-wtchrome" />
          {[24, 41, 58].map((cx) => <circle key={cx} cx={cx} cy="18" r="4.5" className="pl-wtdot" />)}
          <rect x="336" y="10" width="228" height="16" rx="8" className="pl-wturl" />

          {/* ---- sidebar, always on ---- */}
          <rect x="0" y="36" width="170" height="524" className="pl-wtside" />
          <rect x="22" y="56" width="104" height="14" rx="3" className="pl-wtlogo" />
          {/* fill is set here as well as in CSS: an unstyled rect defaults to
              solid black, which is a loud failure for a highlight */}
          <rect x="12" y="91" width="146" height="30" rx="6" className="pl-wtnavhl"
            fill="var(--accent)" fillOpacity="0.17" />
          {NAV.map((w, i) => (
            <g key={i}>
              <rect x="24" y={98 + i * 40} width="13" height="13" rx="3" className="pl-wtnavico" />
              <B x={46} y={100 + i * 40} w={w} />
            </g>
          ))}

          {/* ---- top bar, scenes 1 to 3 ---- */}
          <g className="pl-wttop">
            <B x={196} y={58} w={150} h={16} tone="ink" />
            <circle cx="806" cy="66" r="11" className="pl-wtico" />
            <circle cx="838" cy="66" r="13" className="pl-wtavatar" />
            <B x={858} y={58} w={30} h={7} />
            <B x={858} y={70} w={20} h={6} />
          </g>

          {/* ================= 1. DASHBOARD ================= */}
          <g className="pl-wtscene pl-wtscene--1">
            <B x={196} y={92} w={74} />
            <rect x="774" y="84" width="92" height="26" rx="5" className="pl-wtbtn pl-wtbtn--ghost" />

            {[0, 1, 2, 3].map((i) => {
              const x = 196 + i * 170;
              return (
                <g key={i}>
                  <rect x={x} y="124" width="160" height="110" rx="8" className="pl-wtcard" />
                  <B x={x + 16} y={142} w={62} h={7} />
                  {i === 0 && <>
                    <circle cx={x + 46} cy="190" r="20" className="pl-wtdonut" />
                    <circle cx={x + 90} cy="180" r="3.5" className="pl-wtpip pl-wtpip--ok" />
                    <B x={x + 99} y={177} w={44} h={6} />
                    <circle cx={x + 90} cy="200" r="3.5" className="pl-wtpip pl-wtpip--warn" />
                    <B x={x + 99} y={197} w={36} h={6} />
                  </>}
                  {i === 1 && <>
                    <rect x={x + 18} y="166" width="20" height="50" rx="3" className="pl-wtcol" />
                    <rect x={x + 42} y="186" width="12" height="30" rx="3" className="pl-wtcol pl-wtcol--soft" />
                    <circle cx={x + 74} cy="180" r="3.5" className="pl-wtpip pl-wtpip--ok" />
                    <B x={x + 83} y={177} w={50} h={6} />
                    <circle cx={x + 74} cy="200" r="3.5" className="pl-wtpip pl-wtpip--warn" />
                    <B x={x + 83} y={197} w={40} h={6} />
                  </>}
                  {i === 2 && <>
                    <rect x={x + 16} y="168" width="128" height="5" rx="2.5" className="pl-wttrack" />
                    <rect x={x + 16} y="168" width="128" height="5" rx="2.5" className="pl-wtfill" />
                    <B x={x + 16} y={186} w={54} h={17} tone="ink" />
                    <B x={x + 16} y={212} w={110} h={6} />
                  </>}
                  {i === 3 && <>
                    <circle cx={x + 30} cy="176" r="13" className="pl-wtico pl-wtico--warn" />
                    <B x={x + 16} y={198} w={46} h={15} tone="ink" />
                    <B x={x + 16} y={220} w={116} h={6} />
                  </>}
                </g>
              );
            })}

            <rect x="196" y="248" width="486" height="286" rx="8" className="pl-wtpanel" />
            <B x={212} y={266} w={80} h={10} tone="ink" />
            <rect x="578" y="260" width="90" height="24" rx="4" className="pl-wtcard" />
            <rect x="212" y="300" width="454" height="38" rx="5" className="pl-wtcard" />
            <B x={226} y={314} w={44} h={9} tone="ink" />
            <circle cx="644" cy="319" r="9" className="pl-wtpip pl-wtpip--warnfill" />
            <rect x="212" y="350" width="454" height="168" rx="6" className="pl-wtempty" />
            <circle cx="439" cy="410" r="20" className="pl-wtpip pl-wtpip--okfill" />
            <B x={389} y={442} w={100} h={10} tone="ink" />
            <B x={369} y={462} w={140} h={7} />

            <B x={738} y={266} w={84} h={9} tone="ink" />
            {[0, 1, 2].map((i) => (
              <g key={i}>
                <rect x="694" y={290 + i * 76} width="172" height="66" rx="6" className="pl-wtcard" />
                <rect x="706" y={302 + i * 76} width="58" height="16" rx="8" className="pl-wtchip" />
                <B x={706} y={326 + i * 76} w={148} h={7} />
                <B x={706} y={338 + i * 76} w={96} h={6} />
              </g>
            ))}
          </g>

          {/* ================= 2. VISIT LIST ================= */}
          <g className="pl-wtscene pl-wtscene--2">
            <rect x="196" y="84" width="670" height="78" rx="10" className="pl-wthero" />
            <B x={216} y={120} w={124} h={18} tone="ink" />
            <rect x="780" y="96" width="70" height="20" rx="10" className="pl-wtchip pl-wtchip--ok" />
            <B x={640} y={120} w={80} h={8} />
            <B x={640} y={134} w={58} h={6} />
            <B x={744} y={120} w={70} h={8} />
            <B x={744} y={134} w={50} h={6} />

            {[0, 1, 2, 3, 4, 5].map((i) => (
              <g key={i}>
                <rect x={196 + i * 112} y="176" width="108" height="30" rx="4"
                  className={"pl-wttab" + (i === 4 ? " pl-wttab--on" : "")} />
                <B x={196 + i * 112 + 30} y={187} w={48} h={8} tone={i === 4 ? "onaccent" : undefined} />
              </g>
            ))}

            <rect x="196" y="218" width="670" height="316" rx="8" className="pl-wtcard" />
            {[[212, 110], [332, 130], [472, 110]].map(([x, w]) => (
              <rect key={x} x={x} y="234" width={w} height="24" rx="4" className="pl-wtfield" />
            ))}
            {[[212, 40], [272, 60], [362, 60], [452, 50], [522, 70], [622, 60], [726, 56], [820, 40]].map(([x, w]) => (
              <B key={x} x={x} y={275} w={w} h={7} />
            ))}
            <path d="M212 292 H850" className="pl-wtrule" />
            {ROWS.map((i) => {
              const y = 306 + i * 44;
              return (
                <g key={i}>
                  <B x={212} y={y} w={28} />
                  <B x={272} y={y} w={34} />
                  <B x={362} y={y} w={56} />
                  <B x={452} y={y} w={48} />
                  <B x={522} y={y} w={66} />
                  <B x={622} y={y} w={72} />
                  <rect x="726" y={y - 6} width="76" height="20" rx="10"
                    className={"pl-wtchip pl-wtchip--" + PILL_TONE[i]} />
                  <rect x="826" y={y - 4} width="16" height="16" rx="3" className="pl-wtnavico" />
                </g>
              );
            })}
          </g>

          {/* ================= 3. VISIT FORM ================= */}
          <g className="pl-wtscene pl-wtscene--3">
            <rect x="196" y="84" width="670" height="78" rx="10" className="pl-wthero" />
            <B x={216} y={120} w={168} h={18} tone="ink" />
            <rect x="770" y="96" width="80" height="20" rx="10" className="pl-wtchip pl-wtchip--warn" />
            <B x={744} y={126} w={106} h={8} />

            {[0, 1, 2].map((i) => (
              <g key={i}>
                <rect x={196 + i * 225} y="176" width="219" height="30" rx="4"
                  className={"pl-wttab" + (i === 1 ? " pl-wttab--on" : "")} />
                <B x={196 + i * 225 + 80} y={187} w={58} h={8} tone={i === 1 ? "onaccent" : undefined} />
              </g>
            ))}

            <rect x="196" y="218" width="670" height="316" rx="8" className="pl-wtcard" />
            <rect x="212" y="234" width="638" height="28" rx="4" className="pl-wtstrip" />
            <B x={226} y={244} w={180} h={8} tone="ink" />
            {[226, 438, 650].map((x, i) => (
              <g key={x}>
                <B x={x} y={274} w={[60, 60, 54][i]} h={7} />
                <rect x={x} y="286" width="196" height="26" rx="4" className="pl-wtfield" />
              </g>
            ))}

            <rect x="212" y="328" width="638" height="28" rx="4" className="pl-wtstrip" />
            <B x={226} y={338} w={140} h={8} tone="ink" />
            <rect x="818" y="336" width="12" height="12" rx="2" className="pl-wtnavico" />
            <B x={226} y={372} w={380} h={9} />
            <circle cx="232" cy="400" r="7" className="pl-wtradio" />
            <B x={248} y={396} w={28} />
            <circle cx="296" cy="400" r="7" className="pl-wtradio pl-wtradio--on" />
            <B x={312} y={396} w={22} />
            <B x={226} y={424} w={60} h={7} />
            <rect x="226" y="438" width="620" height="52" rx="4" className="pl-wtfield" />
            <rect x="742" y="500" width="104" height="26" rx="5" className="pl-wtbtn" />
            <B x={772} y={509} w={44} h={8} tone="onaccent" />
          </g>

          {/* ================= 4. DONE ================= */}
          <g className="pl-wtscene pl-wtscene--4">
            <rect x="0" y="0" width="900" height="560" className="pl-wtscrim" />
            <g className="pl-wtdone">
              <circle cx="450" cy="266" r="56" className="pl-wtdonebg" />
              <path d="M424 266 l18 18 l36 -40" className="pl-wtcheck" pathLength="100" />
            </g>
            <B x={384} y={352} w={132} h={13} tone="accent" />
            <B x={404} y={378} w={92} h={8} />
          </g>

          {/* ---- the cursor, driving all of it ---- */}
          <g className="pl-wtcursor">
            <circle cx="2" cy="2" r="19" className="pl-wtripple" />
            <path d="M0 0 L0 23 L6 17.4 L9.8 25.6 L13.9 23.7 L10.1 15.6 L18 15.2 Z" className="pl-wtptr" />
          </g>
        </g>

        <rect x="1" y="1" width="898" height="558" rx="14" className="pl-wtframe" />
      </svg>
    </div>
  );
}

export { Walkthrough };
