import DynamicInfoCard from "./DynamicInfoCard";

// DynamicInfoCard is "embedded" mode is `absolute top-0`, flush against
// whatever positioned ancestor it's given — this just gives it a relative
// box with room below to expand into on hover.
export default function NotchCardDemo() {
  return (
    <div className="relative min-h-[220px] w-full">
      <DynamicInfoCard variant="embedded" />
    </div>
  );
}
