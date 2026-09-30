import React from "react";

const Arrow = ({ s = 13 }) => (
  <svg width={s} height={s} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M4 12L12 4M12 4H5.5M12 4v6.5" stroke="currentColor" strokeWidth="1.4" />
  </svg>
);

const Right = ({ s = 13 }) => (
  <svg width={s} height={s} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" />
  </svg>
);

const Lock = () => (
  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <rect x="3" y="7" width="10" height="7" stroke="currentColor" strokeWidth="1.3" />
    <path d="M5.5 7V5a2.5 2.5 0 015 0v2" stroke="currentColor" strokeWidth="1.3" />
  </svg>
);

const ThemeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
    <circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" strokeWidth="1.3" />
    <path d="M8 1a7 7 0 000 14z" fill="currentColor" />
  </svg>
);

const Chevron = ({ back = false }) => (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true"
    style={back ? { transform: "rotate(180deg)" } : undefined}>
    <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* One 16x16 line-glyph set, shared by the platform grid and the diagrams
   so a capability is drawn the same way wherever it appears. */
const GLYPHS = {
  calendar: "M3.2 4.5h9.6v8.3H3.2zM3.2 7.1h9.6M5.6 2.9v2.4M10.4 2.9v2.4",
  source: "M4.4 2.4h4.3l3 3v8.2H4.4zM8.7 2.4v3h3M6.3 9.2h3.5M6.3 11.3h2.3",
  scan: "M2.7 5.5V3.5h2M11.3 3.5h2v2M13.3 10.5v2h-2M4.7 12.5h-2v-2M3.7 8h8.6",
  pledge: "M8 13.3S2.7 10.1 2.7 6.4A2.85 2.85 0 0 1 8 4.9a2.85 2.85 0 0 1 5.3 1.5c0 3.7-5.3 6.9-5.3 6.9z",
  consent: "M2.8 13.2h10.4M4.5 10.6l6-6a1.35 1.35 0 0 1 1.9 1.9l-6 6-2.5.6z",
  telehealth: "M2.7 4.4h7.2a1 1 0 0 1 1 1v5.2a1 1 0 0 1-1 1H2.7a1 1 0 0 1-1-1V5.4a1 1 0 0 1 1-1zM10.9 7.3l3.4-2.1v5.6l-3.4-2.1z",
  person: "M8 8.1a2.7 2.7 0 1 0 0-5.4 2.7 2.7 0 0 0 0 5.4zM3 14c.5-2.5 2.5-3.9 5-3.9s4.5 1.4 5 3.9",
  ledger: "M4.1 1.9h5.3l2.7 2.7v9.5H4.1zM9.4 1.9v2.7h2.7M6.1 8h4M6.1 10.6h4",
  lock: "M4 7.1h8v6.5H4zM5.9 7.1V5a2.1 2.1 0 0 1 4.2 0v2.1M8 9.4v1.9",
  chart: "M2.7 13.5h10.6M4.9 13.5V8.7M8 13.5V4.5M11.1 13.5V7.2",
  cross: "M8 3.3v9.4M3.3 8h9.4",
  cloud: "M4.9 12.6a3 3 0 0 1 .3-5.98 4.05 4.05 0 0 1 7.7 1.06 2.7 2.7 0 0 1-.4 4.92z",
  check: "M3.1 8.3l3.3 3.3 6.5-7",
  shieldcheck: "M8 1.8l5.3 1.8v4.3c0 2.9-2.1 5.1-5.3 6.3-3.2-1.2-5.3-3.4-5.3-6.3V3.6zM5.6 8l1.8 1.8 3.1-3.3",
  clock: "M8 14.2A6.2 6.2 0 1 0 8 1.8a6.2 6.2 0 0 0 0 12.4zM8 4.6V8.2l2.6 1.5",
  note: "M4.3 2.4h5.2l2.4 2.4v9H4.3zM9.5 2.4v2.4h2.4M6.3 8h3.5M6.3 10.4h2.3",
  car: "M2.9 10.5h10.2M3.6 10.5V8.3l1.5-2.9h5.8l1.5 2.9v2.2M5.2 12.4a1.05 1.05 0 1 1 0-2.1 1.05 1.05 0 0 1 0 2.1zM10.8 12.4a1.05 1.05 0 1 1 0-2.1 1.05 1.05 0 0 1 0 2.1z",
  receipt: "M4.5 2.3h7v11.4l-1.75-1.1-1.75 1.1-1.75-1.1L4.5 13.7zM6.3 5.6h3.4M6.3 8h3.4",
};

/* the glyph as a bare path, for dropping inside an existing svg */
const GlyphPath = ({ name }) => (
  <path d={GLYPHS[name]} fill="none" stroke="currentColor" strokeWidth="1.3"
    strokeLinecap="round" strokeLinejoin="round" />
);

const Glyph = ({ name, s = 18 }) => (
  <svg width={s} height={s} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d={GLYPHS[name]} stroke="currentColor" strokeWidth="1.3"
      strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* spec 4.5 — outlined pill with a horizon line and a soft rising glow */

export { Arrow, Right, Lock, ThemeIcon, Chevron, Glyph, GlyphPath };
