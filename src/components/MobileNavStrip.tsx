"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "motion/react";
import { ACCENT, ANIMATIONS } from "@/data/animations";

interface Row {
  key: string;
  label: string;
  href: string;
}

const NAVIGABLE: Row[] = [
  { key: "home", label: "Home", href: "/" },
  ...ANIMATIONS.map((a) => ({ key: a.id, label: a.name, href: `/animations/${a.id}` })),
];

const SPRING = { type: "spring" as const, bounce: 0.2, duration: 0.35 };
// Distance you have to drag, from wherever the *last* step landed, to
// trigger the next one — re-anchors to the current finger position after
// each step, same hysteresis as before so small wobbles near a boundary
// don't flip-flop the selection.
const THRESHOLD_PX = 40;

function vibrate() {
  if (typeof navigator !== "undefined" && navigator.vibrate) navigator.vibrate(10);
}

// The floating pill container + press-hold/drag-to-step mechanic from the
// original mobile nav, now driving a horizontally scrolling name strip
// (active item in accent orange, neighbors muted, edges fading via
// mask-image) instead of crossfading a single label. The strip's required
// translateX is computed from each item's `offsetLeft` — a pure layout
// value, unaffected by the track's own current CSS transform — so it's
// always measuring from a stable reference regardless of where the drag
// left it.
export default function MobileNavStrip() {
  const pathname = usePathname();
  const router = useRouter();
  const pillRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Map<string, HTMLElement>>(new Map());

  const [pressing, setPressing] = useState(false);
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  const [offset, setOffset] = useState(0);
  const anchorX = useRef(0);
  const currentIndex = useRef(0);
  const pointerId = useRef<number | null>(null);

  const activeIndex = Math.max(0, NAVIGABLE.findIndex((r) => r.href === pathname));
  const shownIndex = previewIndex ?? activeIndex;
  const shownRow = NAVIGABLE[shownIndex];

  useLayoutEffect(() => {
    function measure() {
      const pill = pillRef.current;
      const item = itemRefs.current.get(shownRow.key);
      if (!pill || !item) return;
      const itemCenter = item.offsetLeft + item.offsetWidth / 2;
      setOffset(pill.clientWidth / 2 - itemCenter);
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [shownRow.key]);

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    setPressing(true);
    currentIndex.current = activeIndex;
    anchorX.current = e.clientX;
    setPreviewIndex(activeIndex);
    pointerId.current = e.pointerId;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // Synthetic/unsupported pointer id — dragging still works via move events.
    }
  }

  // Horizontal delta only — e.clientY is never read, so vertical finger
  // drift can't change the selection.
  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (pointerId.current !== e.pointerId) return;
    const dx = e.clientX - anchorX.current;
    if (dx > THRESHOLD_PX && currentIndex.current < NAVIGABLE.length - 1) {
      currentIndex.current += 1;
      anchorX.current = e.clientX;
      setPreviewIndex(currentIndex.current);
      vibrate();
    } else if (dx < -THRESHOLD_PX && currentIndex.current > 0) {
      currentIndex.current -= 1;
      anchorX.current = e.clientX;
      setPreviewIndex(currentIndex.current);
      vibrate();
    }
  }

  function handlePointerUp(e: React.PointerEvent<HTMLDivElement>) {
    if (pointerId.current !== e.pointerId) return;
    pointerId.current = null;
    setPressing(false);
    const row = NAVIGABLE[previewIndex ?? activeIndex];
    if (row && row.href !== pathname) router.push(row.href);
    setPreviewIndex(null);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // No-op if capture was never established.
    }
  }

  return (
    <div className="fixed inset-x-0 bottom-5 z-40 flex justify-center lg:hidden">
      <motion.div
        ref={pillRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        animate={{ scale: pressing ? 1.05 : 1 }}
        transition={SPRING}
        className="relative h-11 w-48 shrink-0 cursor-pointer touch-none overflow-hidden rounded-full bg-card shadow-[var(--shadow-4)] select-none"
      >
        {/* Fixed-size frame matching the pill exactly, holding the mask —
            the gradient's stops need to be relative to the *visible* pill
            width, not the much-wider scrolling track, so the mask lives
            here and the track (which does the actual moving) nests inside
            it. The pill itself stays unmasked, so its card background is
            solid edge to edge; only the labels fade into it. */}
        <div
          className="absolute inset-0"
          style={{
            maskImage: "linear-gradient(to right, transparent, black 20%, black 80%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 20%, black 80%, transparent)",
          }}
        >
          <motion.div
            className="absolute top-1/2 left-0 flex items-center gap-6 whitespace-nowrap"
            animate={{ x: offset, y: "-50%" }}
            transition={SPRING}
          >
            {NAVIGABLE.map((row, i) => (
              <motion.span
                key={row.key}
                ref={(el) => {
                  if (el) itemRefs.current.set(row.key, el);
                }}
                animate={{ color: i === shownIndex ? ACCENT : "var(--color-muted-foreground)" }}
                transition={SPRING}
                className="shrink-0 text-[13px] font-medium"
              >
                {row.label}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
