import ScrubberNav from "./ScrubberNav";
import MobileNavStrip from "./MobileNavStrip";

export default function AnimationRail() {
  return (
    <>
      <ScrubberNav className="fixed left-8 top-1/2 z-40 hidden -translate-y-1/2 lg:block" />
      <MobileNavStrip />
    </>
  );
}
