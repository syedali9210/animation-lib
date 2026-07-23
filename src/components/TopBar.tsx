import Link from "next/link";
import ThemeSwitcher from "./ThemeSwitcher";

export default function TopBar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-[680px] items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="text-base font-medium text-foreground">
          Syed.Ali / Animations
        </Link>
        <ThemeSwitcher />
      </div>
    </header>
  );
}
