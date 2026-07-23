import type { ComponentType } from "react";
import PetBuddyPathHero from "@/animations/pet-buddy-hero/PetBuddyPathHero";
import PetBuddyGreeting from "@/animations/pet-buddy-greeting/PetBuddyGreeting";
import TabHopDemo from "@/animations/pet-buddy-tab-hop/TabHopDemo";
import NotchCardDemo from "@/animations/hover-expansion-card/NotchCardDemo";
import ScratchCardDemo from "@/animations/archive-scratch-card/ScratchCardDemo";
import ScrubberDemo from "@/animations/scrubber-navigation/ScrubberDemo";

export type Category = "mascot" | "hover-reveal" | "navigation";

export const CATEGORIES: { value: Category; label: string }[] = [
  { value: "mascot", label: "Buddy" },
  { value: "hover-reveal", label: "Hover and Reveal" },
  { value: "navigation", label: "Navigation" },
];

// Single accent used for the scrubber's live hover/navigation indicator —
// the pet buddy's own terracotta, already the brand color everywhere else
// (playhead, tab-hop sprite, maze walk). Content itself stays white/neutral;
// this is the only spot of color, reserved for "you're pointing at this."
export const ACCENT = "#db744f";

export interface AnimationStory {
  started: string;
  built: string;
  future: string;
}

export interface AnimationEntry {
  id: string;
  name: string;
  category: Category;
  Demo: ComponentType;
  story: AnimationStory;
}

export const ANIMATIONS: AnimationEntry[] = [
  {
    id: "pet-buddy-hero",
    name: "Maze Walk",
    category: "mascot",
    Demo: PetBuddyPathHero,
    story: {
      started:
        "I found a vanilla-JS reference for an isometric maze walkway and could not stop thinking about it — the pet walking back and forth along the centerline, pausing and bouncing at each end, a cursor-following spotlight revealing a glowing copy of the path edges wherever your mouse went. I liked it so much I decided to rebuild it pixel-for-pixel inside React instead of just admiring it from the sidelines.",
      built:
        "The hard part wasn't the walk cycle, it was keeping the geometry math identical to the original so the fidelity didn't drift — same polygon points, same isometric segments, same depth-based scaling so the buddy reads bigger the closer it gets to the bottom of the frame. I swapped `getElementById` and a global IIFE for refs and `requestAnimationFrame`, since that's how it has to work inside a component tree, but otherwise kept it a faithful port. Rebuilding it forced me to actually understand the isometric math — the point-in-polygon checks for the wall shading, the segment interpolation for the walk — rather than just admiring someone else's demo.",
      future:
        "I want to give the buddy more paths to choose from, maybe branch the maze and let it wander instead of just pacing back and forth. Day/night lighting on the walkway is on the list too, and eventually I'd like it to react to which section of the site you're actually looking at.",
    },
  },
  {
    id: "pet-buddy-greeting",
    name: "Hello",
    category: "mascot",
    Demo: PetBuddyGreeting,
    story: {
      started:
        "Same character and rig as the maze-walk hero, just idling next to a little sign instead of walking a path. I wanted a version of the buddy that felt less like a hero banner and more like a mascot that's just... there, hanging out, saying hi when you scroll past.",
      built:
        "It's registered as a real custom element (`<pet-buddy-greeting>`), not a React component, because the rig is a self-contained vanilla web component and `customElements.define` isn't something a React tree can do declaratively — so it gets loaded as a plain script and used like a native HTML tag. It's the one I use as the friendly face of the whole 'my space' area of my portfolio.",
      future:
        "This is the idling foundation for a few planned pet buddy variants — better interactions, more texture, more expressions. I'd like it to notice the time of day, or greet you differently depending on which page brought you here.",
    },
  },
  {
    id: "pet-buddy-tab-hop",
    name: "Tab Hop",
    category: "mascot",
    Demo: TabHopDemo,
    story: {
      started:
        "Switching tabs with a plain sliding underline felt dead to me — I wanted the mascot to actually pick the tab instead of a second indicator quietly competing with the first one.",
      built:
        "It's a tiny version of the buddy that perches on top of whichever tab is active. On switch it leaps — crouch, arc through the air, squash and stretch on landing, with a little dust poof where it touches down. The whole thing is built from a handful of keyframed values (`y`, `rotate`, `scaleX`/`scaleY`) timed against a single 340ms hop, plus a direction flag so it leans into the jump the way something would if it were actually pushing off toward where it's going.",
      future:
        "I want it to remember which tab you visit most and get a little more excited hopping there, and I've been tempted to add a tiny landing sound. Long term, I'd like this same hop rig to work as a generic cursor-follower anywhere on the site, not just inside tabs.",
    },
  },
  {
    id: "hover-expansion-card",
    name: "Info Notch Card",
    category: "hover-reveal",
    Demo: NotchCardDemo,
    story: {
      started:
        "I wanted a persistent 'who is this' widget that didn't take up permanent space — something styled after a MacBook's screen notch, flush against the top, flat on top, rounded only on the bottom.",
      built:
        "Collapsed, it's just an avatar, name, and a live clock. Hover it (or tap it on mobile, since there's no hover there) and it grows downward to reveal social links and an availability badge. The trickiest bit was the 'ears' — the two curved pieces that carve the concave join between the flat top edge and the card's rounded bottom corners, the actual notch illusion. Each one is a clipped box holding an oversized, offset box-shadow copy of the card's own color, so only a quarter-circle sliver of it peeks through. It stays pure black regardless of site theme, because that's the real notch's actual color.",
      future:
        "I'd like the expanded state to show more — recent activity, maybe a status line I can update remotely without redeploying. A subtle idle animation while it's collapsed, so it doesn't just sit there dead until you hover, is on the list too.",
    },
  },
  {
    id: "archive-scratch-card",
    name: "Scratch Card",
    category: "hover-reveal",
    Demo: ScratchCardDemo,
    story: {
      started:
        "I wanted to gate my portfolio's Archive tab behind a bit of friction instead of just showing everything immediately, and I'd been wanting an excuse to try the Framer University 'Image Scratch' technique for a while.",
      built:
        "It's a pixel-exact replica: a black card with a dotted foil surface that scratches off under a grungy brush to reveal whatever's hiding underneath — in my case, the hover-expand notch card. The foil is a real overlay image painted onto a `<canvas>`, then erased along the pointer path using `destination-out` composite stamps of a custom brush texture, not a CSS mask trick. Coverage is tracked on a coarse 16×16 grid instead of reading canvas pixels every frame, since that's cheap to update and plenty accurate for 'have they scratched off most of it yet.' Past ~70% coverage, the foil fades the rest of the way out on its own and hands control to whatever's underneath.",
      future:
        "I want to rotate what's hidden underneath periodically so revisiting the Archive tab is worth it, and maybe stack a few scratch cards side by side, each with a different reveal.",
    },
  },
  {
    id: "scrubber-navigation",
    name: "Nav Scrubber",
    category: "navigation",
    Demo: ScrubberDemo,
    story: {
      started:
        "A normal dot-nav felt too static for how much scrolling a single-page portfolio needs. I wanted something that made the page feel like it could be scanned and jumped through quickly, more like scrubbing a video timeline than clicking a menu.",
      built:
        "Drag it, click anywhere on the track, or use the arrow keys to jump between sections. On the real page it syncs both ways: scroll normally and an `IntersectionObserver` moves the playhead to match, or drag the playhead and it scrolls the page for you, with a ref flag so the observer doesn't fight the drag mid-gesture. The demo above is a standalone copy running on local state instead of real page sections, so it doesn't collide with the actual nav.",
      future:
        "Turning it into a full categorized index — colored groups, animation names right there in the list — is step one of where I wanted this to go, and you're looking at it. Next is probably a keyboard-driven fuzzy search so you can jump anywhere by typing instead of scrubbing.",
    },
  },
];
