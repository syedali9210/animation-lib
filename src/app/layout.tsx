import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "next-themes";
import TopBar from "@/components/TopBar";
import AnimationRail from "@/components/AnimationRail";
import PageTransition from "@/components/PageTransition";
import "./globals.css";

const segoeUI = localFont({
  src: [
    { path: "../../public/fonts/segoe-ui-light.woff2", weight: "300", style: "normal" },
    { path: "../../public/fonts/segoe-ui-regular.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/segoe-ui-italic.woff2", weight: "400", style: "italic" },
    { path: "../../public/fonts/segoe-ui-semibold.woff2", weight: "600", style: "normal" },
    { path: "../../public/fonts/segoe-ui-bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Animations — Syed Ali",
  description: "A gallery of animations I've recreated and built from scratch, with the story behind each one.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${segoeUI.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
          <TopBar />
          <AnimationRail />
          <main className="flex flex-1 flex-col pb-24 lg:pb-0">
            <PageTransition>{children}</PageTransition>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
