# Design System Strategy: The Focused Academic

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Digital Proctor."** 

Unlike standard educational platforms that feel cluttered or overly gamified, this system treats the IELTS experience with the gravity of a prestigious examination hall, filtered through a high-end editorial lens. We move beyond the "template" look by utilizing wide-set margins, intentional white space (negative space as a functional element), and a "No-Line" philosophy. 

The goal is to eliminate cognitive load. By using a monochromatic base with a singular, high-energy accent (`primary: #b61722`), we direct the student’s focus exclusively to the spoken word and the countdown. The interface doesn't just host the test; it facilitates a state of "flow."

---

## 2. Colors & Tonal Depth
We are moving away from the "bordered box" aesthetic. We define space through light and weight, not lines.

### The "No-Line" Rule
**Explicitly prohibit 1px solid borders for sectioning.** 
Boundaries must be defined solely through background color shifts. For example, the Sidebar should sit on `surface_container_low`, while the main workspace utilizes the `surface` base. 

### Surface Hierarchy & Nesting
Treat the UI as a series of stacked, premium paper sheets. 
- **Base Layer:** `background (#f9f9f9)`
- **Sectioning Layer:** `surface_container_low (#f3f3f3)`
- **Interactive Cards:** `surface_container_lowest (#ffffff)` (This creates a natural lift against the gray background).
- **Elevated Prompts:** `surface_bright (#f9f9f9)`

### The "Glass & Gradient" Rule
For floating elements like the **Timer Card** or **Mic Control**, use a "Frosted Glass" effect:
- **Background:** `surface_container_lowest` at 80% opacity.
- **Blur:** `backdrop-filter: blur(12px)`.
- **CTA Soul:** Apply a subtle linear gradient to the `primary` button (from `primary: #b61722` to `primary_container: #da3437`) at a 135-degree angle to provide a sense of "pressing" depth.

---

## 3. Typography: Editorial Authority
We use **Inter** not as a standard sans-serif, but as a Swiss-style typographic tool.

- **Display (The Exam Stage):** Use `display-md` (2.75rem) for the main exam question. It should feel authoritative. 
- **Headline & Title (The Context):** `headline-sm` is reserved for section headers. `title-lg` is for card headings.
- **Body (The Response):** `body-lg` (1rem) for all instructional text. 
- **The "High-Contrast" Rule:** Use `on_surface (#1a1c1c)` for all primary text. Use `on_surface_variant (#5b403e)` only for secondary metadata. Ensure the contrast ratio remains high to mimic printed exam papers.

---

## 4. Elevation & Depth
In this system, depth is a functional indicator of "active" versus "passive" states.

### The Layering Principle
Do not use shadows for static content. A `surface_container_lowest` card sitting on a `surface_container` background provides enough distinction. 

### Ambient Shadows
When a card must "float" (e.g., the Mic Waveform during active recording), use an **Ambient Shadow**:
- **Offset:** `0px 10px`
- **Blur:** `30px`
- **Color:** `rgba(26, 28, 28, 0.06)` (A tinted version of the `on_surface` color).

### The "Ghost Border" Fallback
If accessibility requires a container edge (e.g., high-contrast mode), use a **Ghost Border**:
- **Token:** `outline_variant` at 20% opacity.
- **Weight:** 1.5px (A thicker, softer line feels more premium than a thin, sharp 1px line).

---

## 5. Components

### Question Cards
- **Style:** `surface_container_lowest` background, `xl` (1.5rem / 24px) corner radius.
- **Instruction:** No dividers. Use `2rem` of internal padding to let the question "breathe" in the center of the card.

### Mic Control & Waveform
- **The Control:** A floating circular button using the `surface_tint` to `primary` gradient. 
- **The Waveform:** Instead of a line graph, use vertical bars that scale in height. Color bars using `primary` for active voice and `primary_fixed_dim` for silence.

### Timer Cards
- **Placement:** Top-right, floating with Glassmorphism.
- **Logic:** When the timer hits < 30 seconds, transition the text color from `on_surface` to `error (#ba1a1a)` using a soft 500ms CSS transition.

### Buttons (Primary/Secondary)
- **Primary:** `primary` background, `on_primary` text, `xl` (1.5rem) roundedness.
- **Secondary:** `surface_container_high` background, `on_surface` text. No border.

### Sidebar Navigation
- **Background:** `surface_container_low`. 
- **Active State:** A vertical pill shape (4px wide) in `primary` on the left edge, with the menu item text shifting to `on_surface`.

---

## 6. Do's and Don'ts

### Do
- **DO** use the `xl` (1.5rem) radius for all major containers to maintain a soft, modern SaaS feel.
- **DO** use white space as a separator. If you think you need a line, try adding `16px` of padding instead.
- **DO** use the `tertiary` color tokens (`#006765`) for "Success" states (e.g., Test Completed) to contrast against the exam's "Red" primary stress color.

### Don't
- **DON'T** use pure black (#000) or pure gray (#888). Always use the provided tokens (`on_surface`, `outline`) which contain subtle red/warm undertones to keep the UI feeling "human."
- **DON'T** use 100% opaque borders. They break the editorial flow and make the app look like a legacy database.
- **DON'T** crowd the screen. This is an IELTS test; if a component doesn't help the student speak, it shouldn't be there.