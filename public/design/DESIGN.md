# Design System Specification: The Scholarly Luminary

## 1. Overview & Creative North Star
This design system is built upon the "Scholarly Luminary" creative north star. It moves beyond the clinical coldness of typical AI platforms, embracing a high-end editorial aesthetic that balances the authority of a prestigious university with the velocity of a modern startup.

To achieve a signature, premium feel, we reject "template" layouts. We prioritize **intentional asymmetry**, high-contrast typography scales, and **tonal layering**. The goal is to make the user feel they are interacting with a bespoke digital concierge rather than a generic database. We use white space not just as a gap, but as a luxury element that guides the eye toward the "Primary Deep Red" points of intent.

## 2. Colors & Chromatic Depth
The palette is rooted in a high-contrast relationship between the authoritative `primary` red and a sophisticated grayscale hierarchy.

### The "No-Line" Rule
Standard UI relies on 1px borders to separate ideas. In this system, **solid 1px borders are prohibited for sectioning.** Boundaries must be defined through background color shifts or subtle tonal transitions. For example, a `surface-container-low` section should sit directly on a `surface` background to define its territory.

### Surface Hierarchy & Nesting
Treat the UI as a physical stack of premium materials.
- **Base Layer:** `surface` (#f8f9fa) for the main page body.
- **Section Layer:** `surface-container-low` (#f3f4f5) for large content blocks.
- **Interactive Layer:** `surface-container-lowest` (#ffffff) for cards and floating elements to provide a "lifted" feel.

### The "Glass & Gradient" Rule
To escape the "flat" look, the sticky navbar and floating modals must utilize Glassmorphism. Use `surface_container_lowest` at 80% opacity with a `backdrop-filter: blur(20px)`. 

### Signature Textures
Main CTAs and hero highlights should not use flat colors. Utilize a subtle linear gradient:
- **Direction:** 135deg
- **From:** `primary` (#af101a)
- **To:** `primary_container` (#d32f2f)
This adds "soul" and a tactile, high-conversion energy to the EdTech experience.

## 3. Typography
The system employs a dual-font strategy to convey both modern intelligence and editorial prestige.

*   **Display & Headlines (Manrope):** Geometric and authoritative. Use `display-lg` for hero sections with tight letter-spacing (-0.02em) to create a "blocky" editorial impact.
*   **Body & UI (Inter):** Highly legible and neutral. Inter provides the "startup-quality" speed and clarity required for complex educational content.

**Hierarchy as Identity:** 
Use extreme scale contrast. A `display-lg` headline paired with a `body-md` description creates an intentional, "Director-level" sophistication that feels more curated than standard web layouts.

## 4. Elevation & Depth
We eschew traditional "Drop Shadows" in favor of **Tonal Layering** and **Ambient Light**.

*   **The Layering Principle:** Depth is achieved by "stacking." A `surface-container-lowest` card placed on a `surface-container-low` background creates a natural, soft lift.
*   **Ambient Shadows:** When a true floating effect is required (e.g., a primary modal), use a "Long Shadow" technique: `box-shadow: 0 20px 40px rgba(25, 28, 29, 0.05)`. The shadow must be tinted with the `on_surface` color, never pure black, to mimic natural environment light.
*   **The "Ghost Border" Fallback:** If a border is required for accessibility, it must be a "Ghost Border." Use `outline_variant` (#e4beba) at **15% opacity**. High-contrast, 100% opaque borders are strictly forbidden.

## 5. Components

### Buttons
- **Primary:** Gradient (`primary` to `primary_container`), `xl` roundedness (1.5rem), white text. Include a subtle `on_primary_container` inner glow on hover.
- **Secondary:** `surface_container_high` background with `primary` text. No border.
- **Tertiary:** Pure text with an underline that appears only on hover.

### Feature Cards
- **Style:** `xl` (1.5rem/24px) corner radius.
- **Structure:** Use `surface_container_lowest`. Forbid divider lines. Use `8px grid` spacing (32px or 48px padding) to separate header from body.
- **Hover:** Subtle transition to `surface_container_highest` or a 2px lift via ambient shadow.

### Input Fields
- **Base:** `surface_container_low` background, no border.
- **Focus State:** 2px "Ghost Border" using `primary` at 40% opacity and a subtle 4px blur glow.
- **Typography:** Labels use `label-md` in `on_surface_variant`.

### Sticky Navbar
- **Style:** `surface_container_lowest` with 80% opacity and `backdrop-blur(12px)`.
- **Detail:** Use a single "Ghost Border" at the very bottom edge (10% opacity) to separate it from the scrolling content without creating a hard visual stop.

### Chips & Tags
- **Style:** `full` (9999px) roundedness. 
- **Color:** `secondary_container` background with `on_secondary_fixed_variant` text for a muted, premium look.

## 6. Do's and Don'ts

### Do:
- **Embrace Asymmetry:** Place hero text on the left and allow AI visuals to bleed off the right edge of the screen.
- **Use Vertical Rhythm:** Use the 8px grid to create generous vertical breathing room (e.g., 128px between major sections).
- **Prioritize "Near Black":** Always use `on_surface` (#191c1d) for text. Pure #000000 is too harsh for a premium EdTech experience.

### Don't:
- **No Divider Lines:** Do not use `<hr>` or border-bottom to separate list items. Use background color shifts or 16px of vertical white space.
- **No Standard Shadows:** Avoid the "fuzzy grey" look. If it doesn't look like light hitting paper, the shadow is too heavy.
- **No Default Border Radius:** Never use a radius smaller than `md` (0.75rem). We want the UI to feel friendly and approachable, not sharp and aggressive.