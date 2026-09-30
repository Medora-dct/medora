import React, { useState, useEffect } from "react";

/* spec 4.7 — sticky left rail, active section highlighted while scrolling */
function AnchorRail({ items, children }) {
  const [active, setActive] = useState(items[0].id);
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (vis[0]) setActive(vis[0].target.id);
      },
      { rootMargin: "-76px 0px -60% 0px", threshold: 0 }
    );
    items.forEach((i) => {
      const el = document.getElementById(i.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [items]);
  return (
    <div className="pl-railpage">
      <nav className="pl-anchorrail" aria-label="On this page">
        <div className="pl-anchorinner">
          <div className="pl-anchorhead">ON THIS PAGE</div>
          {items.map((i) => (
            <button key={i.id} className="pl-anchorlink" data-on={active === i.id ? "1" : "0"}
              onClick={() => {
                const el = document.getElementById(i.id);
                /* no explicit behavior: the stylesheet decides, so this
                   now honours prefers-reduced-motion as well */
                if (el) el.scrollIntoView({ block: "start" });
              }}>
              {i.label}
            </button>
          ))}
        </div>
      </nav>
      <div className="pl-railbody">{children}</div>
    </div>
  );
}

export { AnchorRail };
