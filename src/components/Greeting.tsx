import PetBuddyGreeting from "@/animations/pet-buddy-greeting/PetBuddyGreeting";

const ORIGIN_STORY = [
  "It started while I was building my portfolio — glued to my desk, earphones in, hunting for inspiration. Every time I found an animation I loved, admiring it wasn't enough; I had to know how it actually worked, so I'd try to rebuild it myself from scratch.",
  "Somewhere in there I made a pixel pet buddy to keep me company on the site, kind of like Claude's own mascot, and once I had a handful of these little experiments built I realized the result wasn't really the interesting part — the process was. How I found each one, what broke, what I learned rebuilding it, where I want to take it next.",
  "So this is that place. Everything here is real, live, and interactive — pick one from the list on the left to see it in action and read the story behind it. New stuff shows up whenever I get nerd-sniped by something new.",
];

export default function Greeting() {
  return (
    <div className="mx-auto w-full max-w-[680px] px-4 py-16 sm:px-6">
      <section>
        <p className="text-[24px] font-medium tracking-tight text-foreground">Welcome 👋</p>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          I&apos;m Syed — this is where I keep the animations I&apos;ve rebuilt, recreated, or just
          couldn&apos;t stop thinking about until I tried making them myself.
        </p>
        <div className="mt-8">
          <PetBuddyGreeting text="Hii! 👋" size={130} />
        </div>
      </section>

      <section className="mt-20">
        <p className="mb-6 text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
          How it all started
        </p>
        <div className="space-y-4">
          {ORIGIN_STORY.map((paragraph, i) => (
            <p key={i} className="text-base leading-relaxed text-muted-foreground">
              {paragraph}
            </p>
          ))}
        </div>
      </section>
    </div>
  );
}
