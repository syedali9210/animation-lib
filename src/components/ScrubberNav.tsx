"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { ACCENT, ANIMATIONS, CATEGORIES, type Category } from "@/data/animations";

const SPRING = { type: "spring" as const, bounce: 0.25, duration: 0.35 };

type NavRow = { key: string; label: string; href: string; category: Category | null };

const HOME: NavRow = { key: "home", label: "Home", href: "/", category: null };

const GROUPS = CATEGORIES.map((cat) => ({
  ...cat,
  items: ANIMATIONS.filter((a) => a.category === cat.value).map(
    (a): NavRow => ({ key: a.id, label: a.name, href: `/animations/${a.id}`, category: cat.value })
  ),
}));

const ALL_ROWS: NavRow[] = [HOME, ...GROUPS.flatMap((g) => g.items)];

interface RowProps {
  row: NavRow;
  isHighlighted: boolean;
  onHoverStart: (key: string) => void;
  onHoverEnd: () => void;
}

// Hoisted to module scope on purpose: defining this inside ScrubberNav
// would give it a brand-new function identity on every parent re-render
// (every hover, every navigation), so React would remount every row from
// scratch instead of updating it in place — motion's `animate` prop would
// restart from its initial value each time, reading as the whole list
// "refreshing." A stable component reference is what lets framer-motion
// actually transition between states instead of re-mounting.
function Row({ row, isHighlighted, onHoverStart, onHoverEnd }: RowProps) {
  return (
    <Link
      href={row.href}
      onMouseEnter={() => onHoverStart(row.key)}
      onMouseLeave={onHoverEnd}
      className="flex items-center gap-2 py-0.5 outline-none focus-visible:opacity-70"
    >
      <motion.span
        animate={{ width: isHighlighted ? 22 : 10, backgroundColor: isHighlighted ? ACCENT : "var(--color-foreground)" }}
        transition={SPRING}
        className="h-px shrink-0 rounded-full"
      />
      <motion.span
        animate={{ x: isHighlighted ? 4 : 0, color: isHighlighted ? ACCENT : "var(--color-muted-foreground)" }}
        transition={SPRING}
        className="text-[13px] whitespace-nowrap"
      >
        {row.label}
      </motion.span>
    </Link>
  );
}

// No outer container, no filler tick rail — each animation gets its own
// line+label pair, plain white by default. Whichever page you're actually
// on stays highlighted (line stretched, label tinted terracotta); hovering
// any row previews that same treatment on it instead, without disturbing
// anything else — hover always wins while it's active, active state
// resumes the moment you stop hovering.
export default function ScrubberNav({ className = "" }: { className?: string }) {
  const pathname = usePathname();
  const [hovered, setHovered] = useState<string | null>(null);

  const activeKey = ALL_ROWS.find((r) => r.href === pathname)?.key ?? HOME.key;
  const highlightKey = hovered ?? activeKey;

  return (
    <nav className={className}>
      <div className="flex flex-col gap-1">
        <Row row={HOME} isHighlighted={HOME.key === highlightKey} onHoverStart={setHovered} onHoverEnd={() => setHovered(null)} />
        {GROUPS.map((group) => (
          <div key={group.value} className="mt-4 flex flex-col gap-1 first:mt-0">
            <p className="pl-[calc(10px+0.5rem)] text-[10px] font-semibold tracking-wide text-foreground uppercase">
              {group.label}
            </p>
            <div className="flex flex-col gap-1">
              {group.items.map((row) => (
                <Row
                  key={row.key}
                  row={row}
                  isHighlighted={row.key === highlightKey}
                  onHoverStart={setHovered}
                  onHoverEnd={() => setHovered(null)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </nav>
  );
}
