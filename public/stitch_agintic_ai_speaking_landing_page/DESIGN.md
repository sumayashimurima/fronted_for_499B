# Design System Specification: The Redacted Intelligence

## 1. Overview & Creative North Star: "The Academic Pulse"
This design system is built to move beyond the generic "SaaS dashboard" aesthetic. Our Creative North Star is **"The Academic Pulse"**—a fusion of high-end editorial clarity and high-velocity AI innovation. 

We reject the "box-within-a-box" layout. Instead, we embrace **Soft Minimalism**: a philosophy where structure is defined by light, air, and tonal transitions rather than rigid lines. By leveraging intentional asymmetry, oversized typography, and sophisticated layering, we create a digital environment that feels premium, authoritative, and human. The goal is to make the user feel like they are interacting with a living, breathing mentor, not a cold database.

---

## 2. Colors & Surface Philosophy
The palette is rooted in high-contrast clarity, using a surgical application of red to drive action and emotional resonance.

### Tone & Role
*   **Primary (`#b61722`):** Our "Heartbeat" color. Used for critical intent and momentum.
*   **Surface (`#f9f9f9`):** The canvas. This is a "living white"—slightly warm to reduce eye strain compared to pure hex white.
*   **Tertiary (`#006765`):** Used sparingly for "Success" or "AI Thinking" states to provide a sophisticated counter-balance to the red.

### The "No-Line" Rule
**Explicit Instruction:** Do not use 1px solid borders to define sections or cards. Boundaries must be established through:
1.  **Tonal Shifts:** Placing a `surface-container-lowest` card on a `surface-container` background.
2.  **Negative Space:** Using the 8px spacing system to create "islands" of content.
3.  **Shadow Depth:** Using elevation to imply a boundary.

### The Glass & Gradient Rule
To achieve "The Academic Pulse" look, primary CTAs must use a **Signature Texture**: 
*   **Linear Gradient:** `primary` (#b61722) to `primary-container` (#da3437) at a 135-degree angle. This prevents the red from looking "flat" or "alarming" and makes it feel "luminous."
*   **Floating Elements:** Use `surface-container-lowest` with a 70% opacity and a 12px backdrop-blur for floating navigation or hovering tooltips.

---

## 3. Typography: The Editorial Voice
We use **Inter** exclusively, but we treat it with the scale of a broadsheet newspaper.

*   **Display Scale (`display-lg` to `display-sm`):** Use these for hero sections and major milestones. Tighten letter-spacing by -0.02em to give a "custom-cast" look.
*   **Headline Scale:** Bold, assertive, and black (#111111). These should be the first thing a user sees on any screen.
*   **Body & Labels:** `body-lg` (16px) is our standard. Use `on-surface-variant` (#5b403e) for secondary body text to maintain a soft, premium feel without the harshness of pure gray.

**Hierarchy Strategy:** Every page should have one "Statement" (Display) and clear "Directives" (Headlines). If everything is loud, nothing is heard.

---

## 4. Elevation & Depth: Tonal Layering
Forget traditional shadows. We build depth through physical stacking of "paper" layers.

*   **The Layering Principle:**
    *   **Level 0 (Base):** `surface` (#f9f9f9)
    *   **Level 1 (Sections):** `surface-container-low` (#f3f3f3)
    *   **Level 2 (Cards):** `surface-container-lowest` (#ffffff)
*   **Ambient Shadows:** For elements that must float (Modals, Popovers), use a shadow color derived from the surface: `rgba(26, 28, 28, 0.06)` with a 40px blur and 12px Y-offset. It should feel like a soft glow, not a dark smudge.
*   **The Ghost Border:** If a border is required for accessibility in input fields, use `outline-variant` (#e4beba) at 40% opacity.

---

## 5. Components & Primitive Logic

### Buttons
*   **Primary:** Red Gradient block, `xl` (1.5rem) corner radius. White text. Subtle inner-glow on hover.
*   **Secondary:** `surface-container-highest` background with `on-surface` text. No border.
*   **Tertiary:** Text only, bolded, with a 2px red underline that appears on hover.

### Cards & Lists
*   **The Divider Forbid:** Never use `<hr>` tags or lines between list items. Use 16px of vertical padding and a background shift (`surface-container-low`) on hover to indicate interactivity.
*   **Corner Radius:** Standardized at `xl` (1.5rem / 24px) for large containers and `lg` (1rem / 16px) for nested elements. This "nested rounding" creates a friendly, organic feel.

### Input Fields
*   **Resting State:** `surface-container-high` background, no border.
*   **Active State:** `surface-container-lowest` background with a 1px `primary` ghost border.
*   **Corner Radius:** `md` (0.75rem) to differentiate from the rounder layout containers.

### AI Interaction Chips
*   Specialized chips for AI-suggested prompts. Use a `tertiary-fixed` (#87f4f0) background at 20% opacity with `on-tertiary-fixed-variant` text. This separates "AI-generated" content from "User-generated" content.

---

## 6. Do’s and Don’ts

### Do:
*   **Embrace Asymmetry:** Let a headline sit slightly off-center or overlap a card onto a new background section.
*   **Use Massive Padding:** If you think there’s enough white space, add 16px more. Space is luxury.
*   **Tint Your Neutrals:** Always ensure "gray" text has a hint of the primary red or tertiary teal to keep the palette cohesive.

### Don’t:
*   **Don't use pure Black (#000):** It breaks the premium "paper" feel. Use `on-surface` (#1a1c1c).
*   **Don't use 100% opaque borders:** They create "visual noise" and make the SaaS look dated/templated.
*   **Don't clutter the Footer:** Keep the end of the journey as clean as the beginning. Use `surface-container-lowest` for the footer area to lift it off the base background.

---

## 7. Spacing Scale
The system operates on an **8px base grid**.
*   **Micro:** 4px, 8px (Inner component spacing)
*   **Moderate:** 16px, 24px, 32px (Content grouping)
*   **Macro:** 64px, 80px, 128px (Section breathing room)

*Director’s Closing Note: This design system is not a set of constraints; it is a framework for confidence. Every pixel should feel like it was placed with a specific purpose. If an element doesn't serve the user's focus, remove it.*