"use client";

import { useRef, useState } from "react";

const MOCK_ITEMS = ["Intro", "Details", "Gallery", "Notes", "Credits"];
const TICK_COUNT = 24;

// Same drag/click/arrow-key mechanics as the real Scrubber (see
// scrubber-navigation/Scrubber.tsx, which is the site's actual left-rail
// nav) — but scoped to local state instead of scrollIntoView +
// IntersectionObserver against the real page, so it's safe to render a
// second instance here inside its own stage card without the two fighting
// over which section is "active."
export default function ScrubberDemo() {
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  const active = MOCK_ITEMS[activeIndex];

  function indexFromClientY(clientY: number) {
    const track = trackRef.current;
    if (!track) return activeIndex;
    const rect = track.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (clientY - rect.top) / rect.height));
    return Math.round(ratio * (MOCK_ITEMS.length - 1));
  }

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    draggingRef.current = true;
    try {
      trackRef.current?.setPointerCapture(e.pointerId);
    } catch {
      // Synthetic/unsupported pointer id — dragging still works via move events.
    }
    setActiveIndex(indexFromClientY(e.clientY));
  }

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!draggingRef.current) return;
    setActiveIndex(indexFromClientY(e.clientY));
  }

  function handlePointerUp(e: React.PointerEvent<HTMLDivElement>) {
    draggingRef.current = false;
    try {
      trackRef.current?.releasePointerCapture(e.pointerId);
    } catch {
      // No-op if capture was never established.
    }
  }

  const playheadPercent = (activeIndex / (MOCK_ITEMS.length - 1)) * 100;

  return (
    <div className="flex min-h-[220px] w-full items-center justify-center">
      <div className="relative">
        <div
          ref={trackRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          role="slider"
          aria-orientation="vertical"
          aria-label="Demo section navigation"
          aria-valuemin={0}
          aria-valuemax={MOCK_ITEMS.length - 1}
          aria-valuenow={activeIndex}
          aria-valuetext={active}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") setActiveIndex((i) => Math.min(MOCK_ITEMS.length - 1, i + 1));
            if (e.key === "ArrowUp") setActiveIndex((i) => Math.max(0, i - 1));
          }}
          className="relative flex h-56 w-8 cursor-pointer touch-none flex-col items-center rounded-full border border-border bg-card py-3 outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          <div className="relative flex h-full w-full flex-col items-center justify-between">
            {Array.from({ length: TICK_COUNT }).map((_, i) => (
              <span key={i} className="h-px w-3 shrink-0 bg-muted-foreground/30" />
            ))}
            <div
              className="pointer-events-none absolute left-1/2 h-1 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#db744f] transition-[top] duration-300 ease-out"
              style={{ top: `${playheadPercent}%` }}
            />
          </div>
        </div>

        <div
          className="pointer-events-none absolute left-full ml-3 -translate-y-1/2 whitespace-nowrap rounded-lg border border-border bg-card px-3 py-1.5 font-mono text-[13px] text-muted-foreground shadow-lg transition-[top] duration-300 ease-out"
          style={{ top: `calc(12px + (100% - 24px) * ${playheadPercent / 100})` }}
        >
          {active}
        </div>
      </div>
    </div>
  );
}
