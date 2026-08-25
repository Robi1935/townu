"use client";

import { useEffect } from "react";

const supported = new Set([
  "university-of-alabama",
  "stillman-college",
  "shelton-state-community-college",
]);

export function applyTownUTheme(slug?: string | null) {
  if (typeof document === "undefined") return;
  const next = slug && supported.has(slug) ? slug : "townu";
  document.documentElement.dataset.school = next;
  if (typeof window !== "undefined") {
    window.localStorage.setItem("townu_school_slug", next);
  }
}

export function ThemeSync() {
  useEffect(() => {
    const saved = window.localStorage.getItem("townu_school_slug");
    applyTownUTheme(saved);
  }, []);

  return null;
}
