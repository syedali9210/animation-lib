"use client";

import { useEffect, useState } from "react";
import { Moon, SunMedium } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemeSwitcher() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const switchTheme = () => setTheme(resolvedTheme === "dark" ? "light" : "dark");

  const handleClick = () => {
    if (!document.startViewTransition) switchTheme();
    else document.startViewTransition(switchTheme);
  };

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={handleClick}
      className="flex size-7 shrink-0 items-center justify-center rounded-md bg-card text-foreground shadow-[var(--shadow-2)] transition-colors hover:bg-muted"
    >
      {mounted ? (
        resolvedTheme === "dark" ? (
          <Moon className="size-4" />
        ) : (
          <SunMedium className="size-4" />
        )
      ) : (
        <span className="size-4" />
      )}
    </button>
  );
}
