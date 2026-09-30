import React from "react";

const COLS = 8;

const COVER_MS = 760;

const HOLD_MS = 420;

const REVEAL_MS = 860;

const STAGGER = 0.034;

function Transition({ label, state }) {
  return (
    <div className="pl-trans" data-state={state} aria-hidden="true">
      {Array.from({ length: COLS }).map((_, i) => (
        <span key={i} className="pl-transcol"
          style={{ transitionDelay: `${(state === "reveal" ? COLS - 1 - i : i) * STAGGER}s` }} />
      ))}
      <div className="pl-translabel"><span>{label}</span></div>
    </div>
  );
}

/* ==========================================================================
   Router
   ========================================================================== */

export { COLS, COVER_MS, HOLD_MS, REVEAL_MS, STAGGER, Transition };
