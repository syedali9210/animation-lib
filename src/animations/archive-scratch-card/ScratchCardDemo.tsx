import DynamicInfoCard from "@/animations/hover-expansion-card/DynamicInfoCard";
import ScratchCard from "./ScratchCard";

// Same pairing as the portfolio's Archive tab: scratch the foil off, then
// hover what's revealed underneath — the hover-expand notch card.
export default function ScratchCardDemo() {
  return (
    <div className="mx-auto w-full max-w-[420px]">
      <ScratchCard
        caption="Scratch to reveal"
        reveal={
          <div className="relative h-full w-full">
            <div className="relative w-full origin-top scale-[0.85] pt-6">
              <DynamicInfoCard variant="embedded" />
            </div>
          </div>
        }
      />
    </div>
  );
}
