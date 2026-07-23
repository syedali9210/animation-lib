# Animations

Pulled from `portfolio v2` on 2026-07-22. Each folder is a standalone piece; `sections-reference/` shows how they're wired together on the live site.

## buddy-animations/
- `PetBuddyPathHero.tsx` — isometric maze hero: pet walks back and forth along a path, cursor-following orange spotlight reveals the path edges. Self-contained (no extra deps beyond React), colors are inline hex, walkway surface/stroke read from `--color-pbh-surface` / `--color-pbh-stroke` CSS vars.
- `PetBuddyGreeting.tsx` — idle "Hii!" wave variant, registers `<pet-buddy-greeting>` as a vanilla custom element via `pet-buddy.js` (loaded as a plain `<script>`, not a React tree). Needs `assets/pet-buddy-particle.png` at `/images/pet-buddy-particle.png`.
- `pet-buddy.js` — the actual vanilla-JS custom element definition both ports share the rig/character from.
- `PetBuddyTabHop.tsx` — tiny mascot that hops between tabs when the active tab changes (crouch, arc, squash-stretch, dust poof). Depends on `shared/springs.ts`. In the source app it's mounted inside the design-system `TabsList` (`petBuddy` prop) — not copied here since it's a big dependency chain (base-ui/react + several context files) unrelated to the animation itself.

## hover-expansion-card/
- `DynamicInfoCard.tsx` — the actual "hover-over expansion": a MacBook-notch-styled profile widget, flat on top, that grows on hover (or tap on mobile) to reveal social links + an availability badge. Lives in the Archive tab of the My Space section (`variant="embedded"`) but is also written to work as a `variant="fixed"` page-chrome notch.
- `LinkedinIcon.tsx`, `GithubIcon.tsx` — icons it renders.
- `assets/profile-avatar.jpg` — needs to be servable at `/images/profile-avatar.jpg`.

## archive-scratch-card/
- `ScratchCard.tsx` — the Archive tab's scratch-off foil card (canvas `destination-out` erasing under the pointer). Once scratched past threshold it reveals whatever's passed as `reveal` — in the source that's `DynamicInfoCard`, so scratching it off is what exposes the hover-expand card.
- `assets/foil-dots.png`, `brush-grunge.png`, `noise.png` — need to be servable at `/images/scratch/...`.

## scrubber-navigation/
- `Scrubber.tsx` — the fixed left-side vertical scrubber (drag/click/arrow-key to jump between page sections), synced to scroll position via `IntersectionObserver`. Fully self-contained, no extra deps.

## shared/
- `springs.ts` — the spring-duration tokens `PetBuddyTabHop` (and originally the design system) uses.

## sections-reference/
- `MySpace.tsx` — the actual "My Space" section: Blog Space tab (buddy greeting) + Archive tab (scratch card → hover-expand card). Kept for context on how the pieces above compose; its `Tabs`/`TabsList`/`TabPanel` import comes from the source repo's design system and wasn't copied over.
