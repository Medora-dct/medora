import { useState, useEffect, useCallback } from "react";

/* Kept in sync with the inline boot script in index.html — change both together. */
export const THEME_KEY = "medora-theme";

const DARK_QUERY = "(prefers-color-scheme: dark)";

const isTheme = (v) => v === "light" || v === "dark";

const stored = () => {
  try {
    const v = localStorage.getItem(THEME_KEY);
    return isTheme(v) ? v : null;
  } catch {
    /* private mode / storage disabled — fall through to the system preference */
    return null;
  }
};

const system = () =>
  typeof window !== "undefined" && window.matchMedia &&
  window.matchMedia(DARK_QUERY).matches ? "dark" : "light";

/**
 * Theme state for the page root.
 *
 * Precedence: an explicit choice the visitor made > the OS preference > light.
 * Nothing is written to storage until the visitor actually flips the toggle,
 * so a site left untouched keeps tracking the OS as it changes through the day.
 */
export function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "light";
    /* the boot script already resolved this — read it back so the first
       React render matches the markup the browser has already painted */
    const booted = document.documentElement.getAttribute("data-theme");
    return isTheme(booted) ? booted : stored() || system();
  });

  /* mirror onto <html> so body, scrollbars and the pre-mount paint agree */
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  /* follow the OS, but only while the visitor has not chosen for themselves */
  useEffect(() => {
    if (!window.matchMedia) return undefined;
    const mq = window.matchMedia(DARK_QUERY);
    const onChange = (e) => {
      if (stored()) return;
      setTheme(e.matches ? "dark" : "light");
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  /* keep other tabs of the site in step */
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === THEME_KEY && isTheme(e.newValue)) setTheme(e.newValue);
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const flipTheme = useCallback(() => {
    setTheme((t) => {
      const next = t === "light" ? "dark" : "light";
      try { localStorage.setItem(THEME_KEY, next); } catch { /* not fatal */ }
      return next;
    });
  }, []);

  return [theme, flipTheme];
}
