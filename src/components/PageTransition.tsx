"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";

// Same fade+rise recipe the portfolio uses for content appearing on scroll
// (see the source's FadeIn: opacity+y, 0.6s, [0.22,1,0.36,1]) — reused here
// as a mount-based crossfade so switching between the home greeting and an
// animation's page reads consistently with the rest of the site's motion
// language, even though this site swaps whole routes instead of scrolling.
export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-1 flex-col"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
