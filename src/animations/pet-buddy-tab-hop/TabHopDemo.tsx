"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import PetBuddyTabHop from "./PetBuddyTabHop";

const TABS = ["Home", "Projects", "Archive"];

interface Rect {
  left: number;
  top: number;
  width: number;
  height: number;
}

// Small standalone tab strip built just to host PetBuddyTabHop for this
// gallery — the original lives inside the portfolio's full design-system
// TabsList (proximity-hover indicator, base-ui primitives, etc.), which
// wasn't ported here. This keeps the same contract PetBuddyTabHop expects:
// a rect (relative to this positioned container) for the active tab.
export default function TabHopDemo() {
  const [active, setActive] = useState(0);
  const [rect, setRect] = useState<Rect | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useLayoutEffect(() => {
    const btn = btnRefs.current[active];
    if (!btn) return;
    setRect({
      left: btn.offsetLeft,
      top: btn.offsetTop,
      width: btn.offsetWidth,
      height: btn.offsetHeight,
    });
  }, [active]);

  return (
    <div className="flex min-h-[220px] w-full items-center justify-center">
      <div
        ref={containerRef}
        className="relative inline-flex items-center gap-1 rounded-full bg-muted p-1.5"
      >
        {TABS.map((label, i) => (
          <button
            key={label}
            ref={(el) => {
              btnRefs.current[i] = el;
            }}
            type="button"
            onClick={() => setActive(i)}
            className="relative z-10 flex h-8 items-center rounded-full px-4 text-[13px] font-medium whitespace-nowrap transition-colors"
            style={{ color: active === i ? "var(--color-foreground)" : "var(--color-muted-foreground)" }}
          >
            {active === i && (
              <motion.span
                layoutId="tab-hop-demo-indicator"
                className="absolute inset-0 rounded-full bg-card shadow-sm"
                transition={{ type: "spring", duration: 0.35, bounce: 0.15 }}
              />
            )}
            <span className="relative">{label}</span>
          </button>
        ))}

        <PetBuddyTabHop rect={rect} />
      </div>
    </div>
  );
}
