import { useState, useEffect } from "react";

/** Section `id`s used in Portfolio (must match DOM). Order = scroll priority for tie-break. */
const SECTION_IDS = [
  "home",
  "about",
  "workexperience",
  "education",
  "skills",
  "projects",
  "certificate",
  "blog",
];

function pickActiveSection() {
  if (typeof document === "undefined") return "home";

  const yLine = window.innerHeight * 0.35;

  for (const sid of SECTION_IDS) {
    const el = document.getElementById(sid);
    if (!el) continue;
    const rect = el.getBoundingClientRect();
    if (rect.top <= yLine && rect.bottom >= yLine) {
      return sid;
    }
  }

  let best = "home";
  let bestOverlap = 0;
  for (const sid of SECTION_IDS) {
    const el = document.getElementById(sid);
    if (!el) continue;
    const rect = el.getBoundingClientRect();
    const visibleTop = Math.max(0, rect.top);
    const visibleBottom = Math.min(window.innerHeight, rect.bottom);
    const overlap = Math.max(0, visibleBottom - visibleTop);
    if (overlap > bestOverlap) {
      bestOverlap = overlap;
      best = sid;
    }
  }
  return best;
}

export function useActiveSectionId() {
  const [sectionId, setSectionId] = useState("home");

  useEffect(() => {
    const onScrollOrResize = () => {
      setSectionId(pickActiveSection());
    };
    onScrollOrResize();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, []);

  return sectionId;
}
