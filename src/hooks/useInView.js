import { useState, useEffect, useCallback } from "react";

/**
 * Plays an animation once the element scrolls into view, so a choreographed
 * sequence starts at the beginning rather than half-finished.
 *
 * Uses a callback ref rather than useRef: components that swap between a wide
 * and a narrow layout replace the observed element, and a plain ref would go
 * on watching the detached one.
 *
 * Pass repeat to have it turn off again when the element leaves, so the
 * sequence replays every time it is scrolled back to.
 */
export function useInView(threshold = 0.25, repeat = false) {
  const [on, setOn] = useState(false);
  const [node, setNode] = useState(null);
  const ref = useCallback((el) => setNode(el), []);

  useEffect(() => {
    if (!node) return undefined;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setOn(true);
        /* a one-shot sequence stops watching itself once it has fired */
        if (!repeat) io.disconnect();
      } else if (repeat) {
        setOn(false);
      }
    }, { threshold });
    io.observe(node);
    return () => io.disconnect();
  }, [node, repeat, threshold]);

  return [ref, on];
}
