# Design System Specification: The Lucid Canvas

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Lucid Canvas."** 

In an AI writing environment, the interface must vanish to let the user’s thoughts emerge. We are moving beyond the "SaaS dashboard" aesthetic. Instead, we are adopting a **High-End Editorial** approach. This system treats digital space like a premium publication—prioritizing focus, authoritative white space, and intentional asymmetry. We break the rigid, boxed-in feel of traditional grids by using tonal layering and "breathing zones" that guide the eye toward the act of creation.

The personality is fast and professional, achieving "premium" status not through decoration, but through the extreme precision of its typography and the softness of its depth.

---

## 2. Colors & Surface Architecture
Our palette is rooted in a high-contrast relationship between pure whites and deep, ink-like blacks, punctuated by a surgical use of vibrant red.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders to section off content. Boundaries must be defined through background color shifts or vertical white space.
- To separate a sidebar from a main writing area, transition from `surface` (#f9f9f9) to `surface-container-low` (#f3f3f3).
- Structural integrity comes from color blocks, not lines.

### Surface Hierarchy & Nesting
Treat the UI as a physical stack of fine paper. 
- **Base Layer:** `surface` (#f9f9f9) or `surface-bright`.
- **Secondary Areas:** `surface-container` (#eeeeee) for utility panels.
- **Floating Elements:** `surface-container-lowest` (#ffffff) for the active writing canvas to create a "lifted" focal point.

### The "Glass & Gradient" Rule
To prevent the UI from feeling "flat" or "default," use Glassmorphism for floating toolbars or hovering menus. Use a semi-transparent `surface-container-lowest` with a `backdrop-blur` of 20px. 
For the primary red (`primary` #b61722), apply a subtle linear gradient toward `primary-container` (#da3437) to give CTAs a sense of volume and "soul" that flat hex codes lack.

---

## 3. Typography: The Editorial Voice
We use **Inter** not as a system font, but as a precision tool. The hierarchy is designed to make long-form reading effortless.

*   **Display (The Statement):** `display-lg` (3.5rem) should be used sparingly for empty states or landing headers. It conveys authority.
*   **Headline (The Context):** `headline-sm` (1.5rem) provides clear sectioning without clutter.
*   **Body (The Workhorse):** `body-lg` (1rem) is the standard for the writing test. Ensure a line-height of 1.6 to 1.7 to prevent eye fatigue during long sessions.
*   **Labels (The Utility):** `label-md` (0.75rem) in `secondary` (#5f5e5e) provides metadata without distracting from the primary text.

**Intentionality:** Use `on-surface` (#1a1c1c) for primary text. Never use pure black for body copy; the deep charcoal preserves readability and feels more "premium" against the off-white backgrounds.

---

## 4. Elevation & Depth: Tonal Layering
We do not use shadows to show "height"; we use light to show "importance."

*   **The Layering Principle:** Place a `surface-container-lowest` card on a `surface-container-low` background. This creates a soft, natural lift.
*   **Ambient Shadows:** When an element must float (e.g., a floating action menu), use an extra-diffused shadow. 
    *   *Value:* `0px 12px 32px`
    *   *Color:* Use `on-surface` at 5% opacity. It should feel like an ambient occlusion, not a "drop shadow."
*   **The "Ghost Border" Fallback:** If accessibility requires a border, use the `outline-variant` (#e4beba) at 15% opacity. A 100% opaque border is a failure of the design language.
*   **The Signature Red Glow:** For active writing states or focused inputs, apply a subtle outer glow using the `primary` token (#b61722) at 10% opacity with a 15px blur. This signals "Power On" without overwhelming the user.

---

## 5. Components

### Buttons
- **Primary:** `primary` background with `on-primary` text. 16px (`lg`) rounded corners. Use the subtle gradient mentioned in Section 2.
- **Secondary:** `secondary-container` background. No border.
- **Interaction:** On hover, increase the "Signature Red Glow."

### The Writing Canvas (Specialty Component)
The core of the interface. It should be a `surface-container-lowest` block with a 16px (`lg`) corner radius. No borders. Use `body-lg` for the text. The margins should be asymmetrical—wider on the left to create a sophisticated, editorial feel.

### Input Fields
- **State:** Active inputs should have no border. Instead, they shift from `surface-container` to `surface-container-lowest` and gain the Signature Red Glow.
- **Typography:** `title-md` for the input text to make the user's typing feel substantial.

### Chips & Tags
- Use `secondary-fixed-dim` for inactive states.
- Selection chips use `primary-fixed` with `on-primary-fixed` text for a soft, premium contrast that isn't as aggressive as a solid red block.

### Lists & Navigation
- **The No-Divider Rule:** Forbid 1px dividers. Separate list items using 8px of vertical space or a very subtle background hover state (`surface-container-high`).

---

## 6. Do’s and Don’ts

### Do:
- **Do** embrace "Extreme Whitespace." If you think there is enough space, add 16px more.
- **Do** use `primary` red only for "Action" or "Focus." It is a surgical tool, not a house paint.
- **Do** use the `xl` (1.5rem) corner radius for large containers to emphasize the "Soft Minimalist" personality.

### Don’t:
- **Don’t** use standard 1px borders. If you feel the need for a line, use a color shift instead.
- **Don’t** use a standard 12-column grid. Align elements to a central "Reading Column" to maintain focus.
- **Don’t** use high-opacity shadows. If the shadow is visible as a "shape," it is too dark. It should feel like a mist.
- **Don’t** use pure black backgrounds. Our "Deep Black" is `on-surface` (#1a1c1c), which maintains a sophisticated, soft-touch feel.