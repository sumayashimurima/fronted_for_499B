# Design System Specification: High-End Editorial AI

## 1. Overview & Creative North Star
**The Creative North Star: "The Academic Pulse"**
This design system moves away from the sterile, "template-ready" feel of traditional SaaS. Instead, it adopts an editorial, high-energy aesthetic that mirrors the prestige of international education. We are not building a simple utility; we are building a premium digital tutor. 

To break the "standard" UI look, the system leverages **Intentional Asymmetry** and **Tonal Depth**. By utilizing massive typography scales against a whisper-quiet background, we create an environment that feels authoritative, fast, and expensive. The layout should feel like a premium print journal brought to life with modern, fluid interactions.

---

## 2. Colors & Surface Architecture
The palette is rooted in a "Pure White" philosophy, using red not just as a color, but as a "Pulse" that guides the user’s eye toward success.

### Surface Hierarchy & The "No-Line" Rule
**Explicit Instruction:** Do not use 1px solid borders to define sections. Traditional borders create visual noise that distracts from learning. 
- **Containment:** Define boundaries through background shifts. A `surface-container-low` section sitting on a `surface` background provides all the separation necessary.
- **Nesting:** Treat the UI as stacked sheets of fine paper. 
    - Base Layer: `surface` (#f9f9f9)
    - Section Layer: `surface-container` (#eeeeee)
    - Content Card: `surface-container-lowest` (#ffffff)

### The Glass & Gradient Rule
To achieve "Investor-Level Polish," floating elements (like AI feedback snackbars or navigation bars) should utilize **Glassmorphism**.
- **Token:** `surface-container-lowest` at 80% opacity with a `24px` backdrop-blur.
- **The Signature Pulse:** Use a subtle radial gradient for primary CTAs, transitioning from `primary` (#b90014) to `primary-container` (#e31b23). This provides a "soul" to the red that flat hex codes cannot replicate.

---

## 3. Typography: The Editorial Voice
We use **Inter** not as a default, but as a structural tool. The contrast between `display` and `body` sizes is the primary driver of our visual identity.

- **Display-LG (3.5rem):** Used for "Hero" moments and IELTS score visualizations. Tight letter-spacing (-0.02em) to feel premium.
- **Headline-MD (1.75rem):** Bold and assertive. Used for module titles to instill confidence.
- **Body-LG (1rem):** The "Reading Mode." Generous line-height (1.6) to ensure long-form exam prompts are legible and low-strain.
- **Label-SM (0.6875rem):** Always uppercase with increased letter-spacing (+0.05em). Used for "Category" tags or "Time Remaining" indicators.

---

## 4. Elevation & Depth
In this system, depth is "felt," not seen. We replace structural lines with **Tonal Layering**.

### The Layering Principle
Hierarchy is achieved by stacking. A `surface-container-lowest` (#ffffff) card placed on a `surface-container-low` (#f3f3f3) background creates a natural lift. This mimics light hitting physical paper.

### Ambient Shadows
For "floating" interactive elements (e.g., an AI chat bubble):
- **Blur:** 32px to 48px.
- **Opacity:** 4% - 6%.
- **Color:** Use a tinted version of `on-surface` (#1a1c1c). Never use pure black shadows.

### The "Ghost Border" Fallback
If a border is required for accessibility (e.g., an input field), use the **Ghost Border**:
- **Token:** `outline-variant` (#e7bdb8) at **15% opacity**. It should be a suggestion of a line, not a hard barrier.

---

## 5. Components

### Buttons: The High-Energy Pulse
- **Primary:** `primary-container` (#e31b23) background. Apply a `0 4px 20px` glow using the primary color at 20% opacity. 
- **Secondary:** Transparent background with a `Ghost Border`. Text color: `primary`.
- **Corner Radius:** Always `xl` (1.5rem) or `full` (9999px) for buttons to maintain the modern, approachable feel.

### Input Fields: The Focus State
- **Style:** `surface-container-lowest` background with a `sm` (0.25rem) radius.
- **Interaction:** On focus, the border does not just change color—the element should receive a `surface-container-high` background shift and a subtle red "Glow" (2px spread, 10% opacity primary color).

### Cards: The Content Vessel
- **Rule:** **No Divider Lines.** 
- **Separation:** Use `8px` grid-based padding (e.g., `32px` internal padding) to let content breathe. Use `title-md` for headers and `body-md` for descriptions.

### AI Feedback Chips
- **Selection Chips:** Use `secondary-fixed` (#ffdad6) with `on-secondary-fixed-variant` (#8b1918) text for a sophisticated, low-contrast look that highlights AI corrections without feeling "aggressive."

---

## 6. Do’s and Don’ts

### Do:
- **Do** use white space as a functional element. If a screen feels cluttered, increase the margin, don't add a border.
- **Do** use "Inter" Bold for all headlines to create an authoritative, trustworthy "Tutor" persona.
- **Do** use the `primary` red sparingly. It is a laser, not a paint bucket.

### Don’t:
- **Don’t** use pure black (#000000). Use `on-surface` (#1a1c1c) for all "black" text to maintain the premium, soft-contrast look.
- **Don’t** use 1px solid dividers. If you need to separate content, use a `16px` vertical space or a `surface-variant` background block.
- **Don’t** use sharp corners. Everything in this system lives within the `lg` (1rem) to `xl` (1.5rem) roundedness range to maintain an "investor-level" soft polish.