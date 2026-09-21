# design.md — SecuredChatGPT Design Tokens & Patterns

Extracted from the Figma design system (`y2tzDX5ow3xUx8CeVHc17c`, node 61:3262) and verified against the six reference screenshots in `References/`. Values marked **⚠ GAP** could not be confirmed from the API and need manual verification by opening the Figma file.

---

## 1. Color Tokens

All Tailwind classes consuming color must reference these tokens. Never use raw hex in component code.

### Light Mode

| Token | Figma variable name | Hex | Purpose |
|---|---|---|---|
| `--title-lm` | `--title_lm` | `#3a3a3a` | Headings, greeting text, project title in card — warmer dark, not pure black |
| `--color-black` | — | `#181818` | Deepest near-black (palette anchor) |
| `--gris-fonce-lm` | `--gris-foncé_lm` | `#5b5b5b` | Secondary text — nav item labels, inactive tab text, prompt placeholder |
| `--gris-clair-lm` | `--gris-clair_lm` | `#717171` | Tertiary text — project descriptions, date labels, "Avancé" chip label |
| `--separateurs-lm` | `--separateurs_lm` | `#e8e8e8` | Borders, dividers, LLM chip container background, card border |
| `--blanc-lm` | `--blanc_lm` | `#FFFFFF` | Card surfaces, prompt bar, message bubbles, active nav text on orange |
| `--orange` | `--orange` | `#EA8C3C` | Primary accent — CTAs, active nav bg, active tab underline, voice button, "Secured" brand word |
| `--color-orange-hover` | — | ⚠ GAP | Hover/pressed state of orange — exact value needs Figma verification |

### Dark Mode

| Token | Hex | Purpose |
|---|---|---|
| `--color-noir-1-dm` | `#212121` | Deep background (page canvas in dark mode) |
| `--color-noir-2-dm` | `#303030` | Surface / card in dark mode |
| `--color-noir-3-dm` | ⚠ GAP | Tertiary dark surface or elevated surface — needs Figma verification |
| `--color-gris-fonce-dm` | ⚠ GAP | Secondary text in dark mode — needs Figma verification |
| `--color-stroke-dm` | `#E8E8E8` | Borders and dividers in dark mode |

### Background

The page background is **not a flat color**. It is a composite:
- Base layer: `#FFFFFF`
- Overlay: a translucent warm gradient image (`opacity-25`) that produces the characteristic peachy-cream tone visible across all screens

Use the `Background / Desktop / LightMode` and `Background / Mobile / LightMode` components from Figma — do not replicate the gradient as a Tailwind class.

### Semantic groupings (Tailwind config mapping)

```js
// tailwind.config.js
colors: {
  black: '#181818',           // --color-black
  'gris-fonce': '#5b5b5b',   // --color-gris-fonce-lm
  blanc: '#FFFFFF',           // --color-blanc-lm
  orange: '#EA8C3C',          // --color-orange
  // dark mode
  'noir-1': '#212121',
  'noir-2': '#303030',
  'stroke-dm': '#E8E8E8',
  // ⚠ fill in gaps after Figma verification:
  // 'gris-clair': '???',
  // 'separateur': '???',
  // 'noir-3': '???',
  // 'gris-fonce-dm': '???',
  // 'orange-hover': '???',
}
```

---

## 2. Type Scale

**Font families (confirmed from Figma code):**
- **Onest** (Regular) — display/greeting text ("Bonjour Jeanne !", prompt suggestion titles, page headings)
- **Inter** — all body copy, labels, buttons, inputs, nav items
- **General Sans Variable** (Regular) — used in a few body-text contexts alongside Inter (treat as Inter-compatible fallback)

> ⚠ GAP: The full named type style list is not exposed via the API. Sizes below come from Figma CSS output + confirmed Figma variable names.

| Figma variable | Size | Family | Weight | Used for |
|---|---|---|---|---|
| `--h4_desktop` | `24px` | Onest/Inter | SemiBold | Section spacing ref (nav padding) |
| `--body_desktop` | `16px` | Inter | Regular / SemiBold | Nav items, list names, button text, body text |
| `--caption_desktop` | `14px` | Inter | Regular / Medium | LLM chip labels, secondary desktop labels |
| `--caption_mobile` | `12px` | Inter | Regular / Medium | Mobile chips, prompt suggestion text, date labels, card meta |
| Display / Greeting | `52px` (desktop) / `28px` (mobile) | Onest | Regular | "Bonjour Jeanne !" — the home greeting |
| Page title (desktop) | `40px` | Inter | SemiBold | "Projets" subheader title |
| Project description | `16px` | Inter | Regular | Body text inside project cards |
| Date / meta | `12px` | Inter | Regular | `--gris-clair_lm` colored date labels |

Inter weights confirmed in use: 400 (Regular), 500 (Medium), 600 (SemiBold).

---

## 3. Spacing Tokens

All dimensions in the component library are divisible by 4 — the base grid unit is **4px**.

> ⚠ GAP: Named spacing tokens were not exposed by the API. Values below are inferred from component dimensions in the Figma metadata.

| Figma variable | Value | Typical use |
|---|---|---|
| `--layout/spacing/small` | `8px` | Icon-to-text gap in nav items, secondary gaps |
| `--layout/spacing/medium` | `12px` | Nav horizontal padding, card outer gap, header vertical padding |
| `--layout/radius/medium` | `12px` | Nav item border-radius, project card radius, LLM chip container |
| `--layout/radius/large` | `16px` | Card vertical padding (used as a spacing ref), prompt bar padding |
| — | `16px` | Card inner horizontal padding (`px-[16px]`) |
| — | `24px` | Section top padding (`pt-[24px]`), prompt bar inner gap |
| — | `32px` | Page horizontal gutter (header, content container padding) |

Component-level reference dimensions (confirmed from Figma metadata):

| Component | Desktop | Mobile |
|---|---|---|
| Header height | 80px | 64px |
| Sidebar closed width | 76px | — |
| Sidebar open width | 300px | 254px (drawer) |
| Nav item height | 48px | 40px |
| Standard icon | 16×16px | 14×14px |
| Touch-target icon | 44×44px | 44×44px |
| DataGrid cell height | 56px | 52px |
| Button height (large) | 39px | — |
| Button height (small) | 33px | — |

---

## 4. Border Radius Tokens

> ⚠ GAP: Named radius tokens not exposed. Values are inferred from Figma code output and visual inspection.

| Token | Value | Used for |
|---|---|---|
| `radius-sm` | 8px | Small controls, context menu items |
| `radius-md` | 12px | LLM selector chips ("Rapide/Avancé"), badges |
| `radius-lg` | 16px | Cards (project cards, chat list, source list), inputs, modals |
| `radius-xl` | 20px | Prompt input bar, background container (confirmed: `rounded-[20px]` in Figma code) |
| `radius-full` | 9999px | Primary CTA buttons (pill shape), avatar |

---

## 5. UI Composition Patterns

### Page background
Full-bleed warm cream/peach gradient covers the entire viewport. Use the Figma `Background` component — it is white + a 25%-opacity textured gradient image. Cards and content float on top.

### Mobile header (64px)
Three-zone layout fixed at top:
- Left: square hamburger button (~40×40px, `radius-md`)
- Center: app logo (40px circle) + "**Secured**" (orange) "**ChatGPT**" (black), medium weight
- Right: user avatar (40×40px, `radius-full`)

No border or shadow on header — it blends into the background.

### Sidebar (desktop only)
Closed (76px): icons only, vertically centered. Open (300px): icon + label pairs, full Nav component. Mobile sidebar opens as an overlay drawer from the left (254px wide). Nav items are 48px tall on desktop, 40px on mobile, with 8px vertical padding.

### Cards & list containers
White (`#FFFFFF`) with `radius-lg` (16px) or `radius-xl` (20px). Very subtle shadow. Inner padding 16px horizontal, 12–16px vertical. Used for every data container: project list, chat list, source list, message bubbles, prompt bar.

### List rows (inside cards)
Thin horizontal separator (`--color-separateur-lm`) between rows. Each row height ~56px (2-line) or ~48px (1-line). Layout: `[icon 40px] [text block flex-1] [⋮ button 32px]`. Title in Body/Label weight (#181818), subtitle in Caption weight (gris-fonce-lm). The three-dot "⋮" button is right-aligned and vertically centered.

### Project card (project list page)
Full-width white card. Row 1: folder icon (16px) + project name (Body/Label, bold, #181818) + ⋮ right. Row 2: date (Caption, gris-fonce-lm). Cards are stacked with ~12px gap. No badge or thumbnail.

### Tabs (Chats / Sources)
Two-tab underline style. Active tab: orange text + 2px orange bottom border. Inactive tab: `gris-fonce-lm` text, no border. A full-width hairline divider runs under both tabs. Tabs sit below the subheader (project title + ⋮ button).

### Source tab
"+ Source" CTA button (orange pill, white text, leading "+" icon) sits above the source list. Source rows: file type icon (colored, branded — Excel green, PDF red, Word blue, generic for JSON/MD), filename (Body/Label), type + date (Caption, gris-fonce-lm), ⋮ right.

### Primary CTA button
Orange (#EA8C3C) background, white text, `radius-full` (pill). Height 39px (large) / 33px (small). Leading "+" icon for creation actions. On hover, use `--color-orange-hover`.

### Prompt input bar
White card, `radius-xl`, fixed at viewport bottom with ~12px margin. Internal layout:
- Left: orange "+" icon button (opens action menu)
- Center: text input (placeholder in gris-fonce-lm)
- Right: LLM chip switcher (Rapide/Avancé) + orange mic button (`radius-full`, 44×44px)

LLM chips: selected = orange pill (white text), unselected = transparent text only.

### Chat messages
- User query: right-aligned white card, `radius-lg`. If web search was active, a pill tag ("⊕ Rechercher sur le web") sits above the query text inside the bubble.
- AI response: left-aligned white card, `radius-lg`. Title line in bold (#181818), body in regular. Action row (copy / refresh / volume icons, 16px) sits below the card.

### Web search badge
Pill-shaped chip with globe icon + "Rechercher sur le web" label. Subtle background (near-white), thin border. Sits at the top of the user message card. Visible only when web search is active for that message.

### Typography rhythm
- Page arrives with a large H1 (page title) flush-left below the header, ~24px below header bottom.
- Subheader (project title + ⋮) sits ~16px below the H1 area.
- Tabs sit ~12px below subheader.
- Content cards start ~16px below the tab bar.
- Vertical spacing between items within a card is handled by the separator line, not by margin.
