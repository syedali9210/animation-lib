import { CATEGORIES, type AnimationEntry } from "@/data/animations";
import AnimationStage from "./AnimationStage";

const CATEGORY_LABEL = Object.fromEntries(CATEGORIES.map((c) => [c.value, c.label]));

const STORY_BEATS: { key: keyof AnimationEntry["story"]; label: string }[] = [
  { key: "started", label: "How it started" },
  { key: "built", label: "How I built it" },
  { key: "future", label: "What's next" },
];

export default function AnimationSection({ entry }: { entry: AnimationEntry }) {
  const { Demo } = entry;

  return (
    <section className="mx-auto w-full max-w-[680px] px-4 py-10 sm:px-6">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h1 className="text-xl font-medium text-foreground">{entry.name}</h1>
        <span className="shrink-0 rounded-full bg-muted px-2.5 py-1 text-[11px] font-medium tracking-wide text-foreground uppercase">
          {CATEGORY_LABEL[entry.category]}
        </span>
      </div>

      <AnimationStage>
        <Demo />
      </AnimationStage>

      <div className="mt-10 space-y-8">
        {STORY_BEATS.map((beat) => (
          <div key={beat.key}>
            <p className="mb-2 text-[11px] font-semibold tracking-wide text-foreground/50 uppercase">{beat.label}</p>
            <p className="text-base leading-relaxed text-muted-foreground">{entry.story[beat.key]}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
