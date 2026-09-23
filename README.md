# MEDORA

Marketing site built to *MEDORA — Website Content, Structure & Design
Specification v1.0* (September 2026).

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build into dist/
npm run preview  # serve the build locally
```

React 18 and Vite are the only dependencies. No UI kit, no animation library,
no icon package — every graphic is inline SVG.

## Layout

```
src/
  content/content.js        all site copy, in one file
  routes.jsx                path -> page, plus per-page SEO titles
  App.jsx                   theme, navigation, page transition
  styles/                   21 stylesheets; index.css fixes their order
  components/
    patterns.jsx            the reusable patterns from spec 4.7
    diagrams.jsx            the spec's diagrams, as inline SVG
    WalkingNurseScene/      parallax walk-cycle scene
  pages/                    one file per page template
  assets/                   logo (light/dark) and app screenshots
```

## Editing copy

Everything readable is in `src/content/content.js`. You should not need to
open a component to change wording.

### Standard wording (spec 3.5)

The sentences the spec says to use *exactly, everywhere* live in the `STD`
object at the top of that file — compliance, ISO status, exports, offline,
scanning, the On the Horizon label and the parent-brand line. They are
referenced, never retyped, so changing one changes every occurrence.

This is also where the spec's correction is enforced: it is **21 CFR Part 11**,
not "Part II".

## Unfilled slots — deliberate

The spec requires substantiated figures for counters (5.7) and written
permission for case studies (10.2). None were supplied, so those values are
`null` and render as a dashed "FIGURE TO CONFIRM" slot rather than an invented
number. The same applies to testimonials, the featured case study, the case
study listing, and the MEDORA email and phone on Contact.

Search `pl-slot` and `UNVERIFIED` to find every one.

## Pages

Home, Platform (5 anchored sections), three Solutions, four live Capabilities,
two On the Horizon, Why MEDORA (5 anchored sections), Resources hub, Whitepaper,
Checklists, FAQs, Case Studies, About, Careers, Contact, Request a Demo, and two
legal stubs. Every route in the spec's sitemap (4.1) resolves.

Routing is in-memory rather than URL-based, so the app runs from any path with
no server rewrites. Swap `routes.jsx` for React Router when you need real URLs;
the path strings already match the spec's sitemap.

## Patterns (spec 4.7)

Figure labels renumber per page. The Bench, Counted, Principles, status chips,
the day timeline, sticky anchor rails and device frames are all in
`components/patterns.jsx`.

## Animation

- Page transitions are eight columns that drop in, hold the page name, then
  lift out. Timings are constants at the top of `components/Transition.jsx`.
- The walking scene runs six parallax layers, each two identical tiles moving
  -50%, so the loop has no seam. It pauses offscreen and when the tab is hidden.
- Only `transform` and `opacity` animate anywhere.
- `prefers-reduced-motion` stops loops rather than shortening them, and the
  page transition is skipped entirely.

## Before launch

- Compliance claims, ISO status and the security controls grid need QA and
  regulatory sign-off. ISO badges currently read "Stage II audit in progress",
  which must not become "certified" until certificates are issued.
- Per-page SEO titles and descriptions are stored in `routes.jsx` but only
  `index.html` sets real meta tags. Wire them up with `react-helmet-async` or
  move to a framework that renders per-route `<head>`.
- Forms are wired to local success states only. Point them at your endpoint.
- Checklists must be reviewed by QA/regulatory before publication (spec 10.4).
