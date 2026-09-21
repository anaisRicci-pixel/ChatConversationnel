# spec.md — SecuredChatGPT Projet Feature Prototype

Declarative build plan. Read `build-context.md` then `design.md` before this file.
A fresh agent must be able to implement and verify the prototype solely from this document + those two files.

---

## 1. Screen Inventory

### 1.1 Routes

| Route | Screen | Notes |
|---|---|---|
| `/` | Home | Existing SecuredChatGPT home — minimal shell, no new feature work |
| `/projects` | Liste Projets | Entry point for the Projet feature |
| `/projects/[id]` | Projet › Chats tab | Default tab on project open |
| `/projects/[id]/sources` | Projet › Sources tab | Second tab |
| `/projects/[id]/chat/[chatId]` | Chat inside project | Full conversation view |

### 1.2 Figma reference nodes

| Screen | Desktop node | Mobile node |
|---|---|---|
| Home | `3354:42768` | `3354:42718` |
| Liste Projets — vide | `3354:42691` | *(infer from desktop)* |
| Liste Projets — projets | `3354:42581` | *(infer: single-column list)* |
| Liste Projets — bannière expirée | `1362:48175` | `1362:48097` |
| Projet › Chats | `1378:70189` | `1378:69894` |
| Projet › Sources | `1368:49030` | `1368:48912` |
| Chat inside project | `1447:68801` | `1448:69024` |
| Aperçu fichier (modal) | `1369:52295` | `1369:52144` |
| Modal créer/modifier projet | *(overlay — design in Slot Content › Form)* | same |

Figma file key: `y2tzDX5ow3xUx8CeVHc17c`

---

## 2. Screen-by-Screen Spec

### 2.1 Liste Projets — `/projects`

#### Layout

**Desktop**
- Full-bleed background
- Sidebar (closed 76 px / open 300 px) — "Projets" nav item active (orange bg + white text)
- Main content: page title "Projets" (Inter SemiBold 40 px) flush-left + "+ Projet" orange pill button (right-aligned, same row)
- Below: 2-column grid of Projet cards (gap 12 px), newest first

**Mobile**
- Fixed header (64 px): hamburger + logo + avatar
- Page title "Projet" (bold) + "+ Projet" orange pill (same row)
- Single-column list of Projet cards (gap 12 px, full-width)

#### States

| State | Trigger | UI |
|---|---|---|
| **Vide** | No projects exist | Replace card grid with `Placeholder` component: document icon centered + "Vous n'avez pas encore de projet" caption |
| **Peuplé** | ≥ 1 project | Card grid/list as above |
| **Bannière expirée** | Any project has `expiresInDays ≤ 7` | `Information` banner injected above the card grid: orange left-dot + "**[nom]** expire dans [N] jours. Il sera supprimé automatiquement." + dismiss × button; dismissing hides banner for the session only |

#### Interactions

| Action | Result |
|---|---|
| Click "+ Projet" | Open **Créer Projet modal** (see §2.6) |
| Click project card | Navigate to `/projects/[id]` |
| Click ⋮ on card | Dropdown: Modifier, Épingler / Désépingler, Supprimer |
| Modifier | Open **Modifier Projet modal** pre-filled |
| Épingler | Move card to a "Épinglés" section at top of grid; card shows pin icon active |
| Supprimer | Open **Supprimer confirmation modal** |
| Dismiss bannière × | Hide banner (session state only) |

---

### 2.2 Projet › Chats — `/projects/[id]`

#### Layout

**Desktop**
- Sidebar: project name appears under "Projets" nav item; "Discussions" section shows project chats with a chat-bubble icon (vs clock icon for non-project chats)
- SubHeader: project name (Inter SemiBold 24 px) + ⋮ menu (right)
- Prompt bar (white card, `radius-xl`): fixed below SubHeader, above tabs
  - Left: orange "+" icon button (opens action menu: web search toggle)
  - Center: placeholder "Message Secured ChatGPT"
  - Right: LLM switcher (Rapide / Avancé chips) + voice mic orange button
- Tabs: **Chats** | **Sources** — underline style, orange active
- Content: `Tableau › Chats` list — each row: chat title + date + ⋮

**Mobile**
- Header (64 px) + SubHeader (project name + ⋮)
- Tabs below SubHeader
- Scrollable chat list
- Prompt bar **fixed at viewport bottom** (not above tabs)

#### States

| State | UI |
|---|---|
| **Chats — vide** | `Placeholder` component: speech-bubble icon + "Aucun chat pour ce projet" |
| **Chats — peuplé** | List of chat rows, newest first |
| **Bannière expirée** | `SubHeader` edge-case variant: orange alert bar below SubHeader title |

#### Interactions

| Action | Result |
|---|---|
| Send message from prompt bar | Create new chat → navigate to `/projects/[id]/chat/[chatId]` |
| Click chat row | Navigate to `/projects/[id]/chat/[chatId]` |
| Click ⋮ on chat row | Dropdown: Épingler / Désépingler, Supprimer |
| Supprimer | Confirmation modal → remove from list + sidebar |
| Click Sources tab | Navigate to `/projects/[id]/sources` |
| Click "+" in prompt bar | Toggle "Rechercher sur le web" tag in bar |

---

### 2.3 Projet › Sources — `/projects/[id]/sources`

#### Layout

Same shell as §2.2 (sidebar, header, SubHeader, prompt bar, tabs), but **Sources** tab active.

Below tabs:
- "+ Source" orange pill button (full-width left-aligned on mobile, auto-width on desktop)
- `Tableau › Sources` list — each row: [file-type icon 24 px] + filename (bold) + "type · date" (caption, `--gris-clair-lm`) + ⋮

File type icons (colored, rendered as Lucide icons mapped to type):
| Type | Lucide icon | Color |
|---|---|---|
| Excel (.xls/.xlsx) | `FileSpreadsheet` | green `#1D6F42` |
| PDF | `FileText` | red `#FF0000` |
| Image (.jpg/.png) | `Image` | gray `#717171` |
| Word (.docx) | `FileText` | blue `#2B579A` |
| Markdown (.md) | `FileCode` | gray `#717171` |
| JSON | `Braces` | gray `#717171` |

#### States

| State | UI |
|---|---|
| **Sources — vide** | `Placeholder`: upload icon + "Aucune source pour ce projet" |
| **Sources — peuplée** | List of source rows |

#### Interactions

| Action | Result |
|---|---|
| Click "+ Source" | Open system file picker (mocked — fires `<input type="file">`, does not upload) → see upload edge cases below |
| Click source row | Open **Aperçu fichier modal** |
| Click ⋮ on source row | Dropdown: Télécharger, Supprimer |
| Télécharger | Mock download (trigger `<a download>` on a placeholder blob) |
| Supprimer | Remove from list (client state) |

**Upload edge cases** (handled client-side, no real upload):

| Scenario | Detection | UI |
|---|---|---|
| Format non supporté | Extension not in allowlist | Toast / alert: "Format non supporté" |
| Fichier trop lourd | `file.size > 10 MB` (mock threshold) | Toast / alert: "Fichier trop lourd (max 10 Mo)" |
| Doublon | Same filename already in sources list | Toast / alert: "Ce fichier est déjà dans vos sources" |
| Succès | None of the above | Add mock source row to list; type inferred from extension |

---

### 2.4 Chat inside project — `/projects/[id]/chat/[chatId]`

#### Layout

**Desktop**
- Sidebar: active chat highlighted orange under "Discussions" with chat-bubble icon (distinguishes from non-project chats which use clock icon)
- No project SubHeader or tabs — this is a full-screen conversation view
- Scrollable message thread (user messages right, AI responses left)
- Prompt bar fixed at bottom: same as project page prompt bar + web search tag when active

**Mobile**
- Header (64 px) — no project title shown (navigated away from project)
- Scrollable thread
- Prompt bar fixed at bottom

#### Message anatomy

**User message** (`Prompt Envoi`):
- Right-aligned white card, `radius-lg`
- If web search active: globe pill badge "Rechercher sur le web" above the message text inside the card
- Message text below the badge

**AI response** (`Prompt Réponse`):
- Left-aligned white card, `radius-lg`
- Optional AI avatar (small icon left of card)
- Content: bold title line + body text; source references appear as inline clickable links
- Action row below card: copy, refresh, volume icons (16 px, `--gris-clair-lm`)

#### Web search

- **Activation**: click "+" in prompt bar → select "Rechercher sur le web"
- **Active state**: orange globe tag "⊕ Rechercher sur le web ×" appears inside prompt bar (left of LLM switcher)
- **Tag persists** across messages until user clicks ×
- **Visual**: user messages sent while active show the globe badge inside the bubble

#### Source references in AI response

- Inline `<a>` links inside response body text, e.g. "[voir Gartner adoption graph.jpg](#)"
- Clicking a reference opens the **Aperçu fichier modal** for that source
- Three cases to mock: 1 reference, multiple references, a file uploaded in the chat itself (not in project sources — label it "(chat)" in the reference link)

#### States

| State | UI |
|---|---|
| Default | Thread with messages |
| Web search active | Tag in prompt bar; globe badge on new user messages |
| No messages yet | Empty thread; prompt bar active |

#### Interactions

| Action | Result |
|---|---|
| Send message | Append user message bubble; after 800 ms delay append mock AI response (static string from mock data) |
| Click source reference link | Open **Aperçu fichier modal** |
| Click × on web search tag | Deactivate web search |

---

### 2.5 Aperçu fichier modal

Triggered from: Sources list row click, or source reference link in chat.

#### Layout

- Semi-transparent dark overlay over current page
- White modal card, `radius-lg`, max-width 640 px (desktop) / full-width 16 px inset (mobile)
- Header: filename (truncated at 40 chars + "…" if longer) + × close button (top-right)
- Preview area: image renders inline (for .jpg/.png); all other formats show `Slot Content › Image` placeholder with "Aperçu non disponible pour ce format" + "Télécharger" orange button (centered)
- Footer: orange "↑ Télécharger" pill button (bottom-right desktop, full-width mobile)

**Animation**: fade-in + scale(0.95 → 1.0) on open; reverse on close.

---

### 2.6 Modal Créer / Modifier Projet

Triggered by: "+ Projet" button, or "Modifier" from ⋮ dropdown.

#### Layout

- Dark overlay
- White modal card, `radius-lg`, width 480 px (desktop) / full-width 16 px inset (mobile)
- Title: "Nouveau projet" (create) or "Modifier le projet" (edit)
- Field 1 — **Nom du projet** (required):
  - `<input type="text">` with label
  - `maxlength="15"` — input is hard-blocked beyond 15 characters
  - Character counter "X/15" visible below the input
- Field 2 — **Instructions** (optional):
  - `<textarea>` with label
  - Placeholder: "Décrivez le contexte ou les instructions pour l'assistant…"
  - No character limit
- Footer buttons:
  - "Annuler" ghost/outline button (left) → closes modal, no change
  - "Enregistrer" orange pill button (right) — disabled until Nom field is non-empty

**On Enregistrer (create):**
1. Close modal with fade-out
2. Add new project object to client state (id = `crypto.randomUUID()`, date = "Aujourd'hui")
3. New card appears at top of the grid

**On Enregistrer (edit):**
1. Close modal
2. Update project name and instructions in client state
3. Card updates in place

**Animation**: fade-in + scale(0.95 → 1.0) on open; reverse on close.

---

### 2.7 Modal Supprimer

Triggered by: "Supprimer" from ⋮ dropdown (on project card or on chat row).

#### Layout

- Dark overlay
- White modal card, `radius-lg`, width 400 px (desktop) / full-width (mobile)
- Title: "Supprimer ce projet ?" (project) or "Supprimer ce chat ?" (chat)
- Body: "Cette action est irréversible."
- Footer: "Annuler" + "Supprimer" (destructive red or orange — use `--orange` for consistency)

**On Supprimer confirm:** remove item from client state; modal closes; if deleting the current project, navigate to `/projects`.

**Animation**: same fade + scale as other modals.

---

## 3. Component Inventory

All components live in `src/components/`. Deploy every component to Storybook with representative stories.

### 3.1 Component table

| Component | Figma section | Storybook data | Key variants / props |
|---|---|---|---|
| `Header` | HEADER | Static | `variant: "desktop" \| "mobile"` |
| `Sidebar` | (inferred) | Static | `open: boolean`, `activeItem`, `projects[]`, `chats[]` |
| `SubHeader` | SUBHEADER | Args | `title`, `expired?: boolean` |
| `ProjetCard` | PROJET | Args/Controls | `size: "large" \| "small"`, `titre`, `description`, `date`, `pinned`, `onPin`, `onEdit`, `onDelete` |
| `Placeholder` | PLACEHOLDER | Args | `icon`, `message` |
| `Tableau` | TABLEAU | Args | `variant: "chats" \| "sources"`, `items[]` |
| `ChatRow` | TABLEAU › Chats | Args | `title`, `date`, `onPin`, `onDelete` |
| `SourceRow` | DOCUMENT | Args | `name`, `type`, `date`, `onPreview`, `onDownload`, `onDelete` |
| `PromptBar` | ZONE DE PROMPTS | Args | `placeholder`, `webSearchActive`, `llmMode: "rapide" \| "avancé"` |
| `PromptEnvoi` | PROMPT ENVOI | Args | `message`, `webSearch: boolean` |
| `PromptReponse` | PROMPT RÉPONSE | Args | `content`, `sourceRefs[]` |
| `Information` | INFORMATION | Args | `message`, `onDismiss` |
| `ModalCreerProjet` | SLOT CONTENT › Form | Args | `mode: "create" \| "edit"`, `initialName?`, `initialInstructions?` |
| `ModalSupprimer` | (composed) | Args | `type: "project" \| "chat"`, `onConfirm`, `onCancel` |
| `ModalApercu` | SLOT CONTENT › Image + Upload | Args | `filename`, `type`, `previewUrl?` |
| `PromptSuggere` | PROMPT SUGGÉRÉ | Args | `title`, `description` |
| `CardBibliotheque` | CARD BIBLIOTHÈQUE | Args | `title`, `category` |
| `LLMChip` | (inferred) | Args | `mode: "rapide" \| "avancé"`, `active: boolean` |

### 3.2 Storybook setup

- One story file per component: `ComponentName.stories.tsx`
- Use `@storybook/nextjs` framework
- Args/controls for every data-driven prop (no imported JSON files — all data comes from story args)
- Provide a "Default", "Empty", and any relevant variant story per component
- Global decorator: wrap stories in the design-system background + Tailwind dark-mode toggle

---

## 4. Mock Data

All data lives in `src/lib/mock-data.ts`. Client state is managed with React Context + `useReducer` (no external store library). Data is not persisted across browser refreshes.

```typescript
// src/lib/mock-data.ts

export interface Project {
  id: string
  name: string          // max 15 chars
  description: string
  instructions: string
  date: string          // display string e.g. "Aujourd'hui", "20 août"
  pinned: boolean
  expiresInDays?: number // present → show expired banner on list
}

export interface Source {
  id: string
  projectId: string
  name: string
  type: 'Excel' | 'PDF' | 'Image' | 'Docx' | 'Md' | 'JSON'
  date: string
  previewUrl?: string   // for images: a local /images/ path; others: undefined
}

export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  webSearch?: boolean        // user message sent with web search active
  sourceRefs?: string[]      // source IDs referenced in AI response
}

export interface Chat {
  id: string
  projectId: string
  title: string
  date: string
  pinned: boolean
  messages: Message[]
}

export const MOCK_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    name: 'Voyage à Copenhague',
    description: 'Préparer un itinéraire de 1 semaine pour une visite complète de Copenhague',
    instructions: '',
    date: "Aujourd'hui",
    pinned: false,
  },
  {
    id: 'proj-2',
    name: 'Dashboard suivi',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    instructions: '',
    date: "Aujourd'hui",
    pinned: false,
  },
  {
    id: 'proj-3',
    name: 'Projet Secured',
    description: '',
    instructions: '',
    date: '20 août',
    pinned: false,
  },
  {
    id: 'proj-4',
    name: 'E-commerce vélo',
    description: 'Vendez, Achetez, Roulez - Troc Vélo, petites annonces vélo entre particuliers',
    instructions: '',
    date: '3 août',
    pinned: false,
  },
  {
    id: 'proj-5',
    name: 'POC Salesforce',
    description: 'Lorem Ipsum has been the industryum is simply',
    instructions: '',
    date: '20 août',
    pinned: false,
  },
  {
    id: 'proj-6',
    name: 'Migration AZURE',
    description: 'Lorem Ipsum has been the industryum is simply',
    instructions: '',
    date: '13 mars',
    pinned: false,
  },
  {
    id: 'proj-expired',
    name: 'Projet Secured V1',
    description: '',
    instructions: '',
    date: '25 août 2025',
    pinned: false,
    expiresInDays: 3,
  },
]

export const MOCK_SOURCES: Source[] = [
  { id: 'src-1', projectId: 'proj-2', name: 'Quarterly June-July 2026 analysis.xls', type: 'Excel', date: '12 août' },
  { id: 'src-2', projectId: 'proj-2', name: 'Analyse de marché sur les LLM 2026', type: 'PDF', date: '10 août' },
  { id: 'src-3', projectId: 'proj-2', name: 'Gartner adoption graph.jpg', type: 'Image', date: '9 août', previewUrl: '/images/gartner-graph.jpg' },
  { id: 'src-4', projectId: 'proj-2', name: 'Product requirement Dashboard de suivi.docx', type: 'Docx', date: '14 juillet' },
  { id: 'src-5', projectId: 'proj-2', name: 'Fichier partagé - etude de faisabilité.md', type: 'Md', date: '10 juillet' },
  { id: 'src-6', projectId: 'proj-2', name: 'Dataset.json', type: 'JSON', date: '8 juillet' },
]

export const MOCK_CHATS: Chat[] = [
  {
    id: 'chat-1',
    projectId: 'proj-2',
    title: 'Propose un plan pour implémenter le projet à partir du PRD',
    date: "Aujourd'hui",
    pinned: false,
    messages: [],
  },
  {
    id: 'chat-2',
    projectId: 'proj-2',
    title: "Créer un kanban à partir des user stories que tu as trouvé dans les sources",
    date: "Aujourd'hui",
    pinned: false,
    messages: [
      {
        id: 'msg-1',
        role: 'user',
        content: 'Quelles sont les 4 catégories du 4D Frameworks ?',
        webSearch: true,
      },
      {
        id: 'msg-2',
        role: 'assistant',
        content: '**Le 4D Framework appliqué au Design :**\n\nLa version que je pense la plus pertinente pour ton contexte est :\n\n**Discover → Define → Develop → Deliver**\n\nElle correspond à une démarche proche du Double Diamond du Design Council, avec une alternance entre exploration/divergence et synthèse/convergence',
        sourceRefs: ['src-3'],
      },
    ],
  },
]
```

---

## 5. State Management

Use a single React Context at the app root. Keep it minimal — one reducer, no selectors library.

```typescript
// src/lib/store.ts (sketch)

type Action =
  | { type: 'CREATE_PROJECT'; payload: Omit<Project, 'id' | 'date'> }
  | { type: 'UPDATE_PROJECT'; id: string; payload: Partial<Project> }
  | { type: 'DELETE_PROJECT'; id: string }
  | { type: 'PIN_PROJECT'; id: string; pinned: boolean }
  | { type: 'ADD_SOURCE'; payload: Source }
  | { type: 'DELETE_SOURCE'; id: string }
  | { type: 'CREATE_CHAT'; payload: Omit<Chat, 'id' | 'date' | 'messages'> }
  | { type: 'DELETE_CHAT'; id: string }
  | { type: 'PIN_CHAT'; id: string; pinned: boolean }
  | { type: 'SEND_MESSAGE'; chatId: string; message: Message }
  | { type: 'DISMISS_EXPIRED_BANNER' }
```

---

## 6. Routing & File Structure

```
src/
  app/
    layout.tsx                   # Root layout: Background, Sidebar, Header
    page.tsx                     # Home (redirect to /projects or existing home shell)
    projects/
      page.tsx                   # Liste Projets
      [id]/
        page.tsx                 # Projet › Chats tab
        sources/
          page.tsx               # Projet › Sources tab
        chat/
          [chatId]/
            page.tsx             # Chat inside project
  components/
    layout/
      Header.tsx
      Sidebar.tsx
      Background.tsx
    project/
      ProjetCard.tsx
      ProjetCard.stories.tsx
      Placeholder.tsx
      Tableau.tsx
      ChatRow.tsx
      SourceRow.tsx
      SubHeader.tsx
      Information.tsx
    chat/
      PromptBar.tsx
      PromptEnvoi.tsx
      PromptReponse.tsx
      LLMChip.tsx
    modals/
      ModalCreerProjet.tsx
      ModalSupprimer.tsx
      ModalApercu.tsx
  lib/
    mock-data.ts
    store.ts
    StoreProvider.tsx
  styles/
    globals.css
```

---

## 7. Design Token Integration

`tailwind.config.ts` must declare all tokens. Never use raw hex values in component code.

```typescript
// tailwind.config.ts (token section)
theme: {
  extend: {
    colors: {
      // Light mode
      'title-lm':     '#3a3a3a',
      'gris-fonce-lm':'#5b5b5b',
      'gris-clair-lm':'#717171',
      'separateurs-lm':'#e8e8e8',
      'blanc-lm':     '#ffffff',
      'orange':       '#ea8c3c',
      // Dark mode surfaces
      'noir-1':       '#212121',
      'noir-2':       '#303030',
      'stroke-dm':    '#e8e8e8',
    },
    fontFamily: {
      inter: ['Inter', 'sans-serif'],
      onest: ['Onest', 'sans-serif'],
    },
    borderRadius: {
      sm:   '8px',
      md:   '12px',
      lg:   '16px',
      xl:   '20px',
    },
    fontSize: {
      'display-desktop': '52px',
      'display-mobile':  '28px',
      'page-title':      '40px',
      'h4':              '24px',
      'body':            '16px',
      'caption-desktop': '14px',
      'caption-mobile':  '12px',
    },
  },
}
```

---

## 8. Animation Plan (Phase 3)

Use **Framer Motion** throughout. Install: `npm install framer-motion`.

| Animation | Type | Spec |
|---|---|---|
| Page transition (route change) | Slide | Outgoing: `x: 0 → -40px, opacity: 1 → 0` (100 ms); Incoming: `x: 40px → 0, opacity: 0 → 1` (200 ms) |
| Modal open | Fade + scale | `opacity: 0 → 1, scale: 0.95 → 1` (150 ms ease-out) |
| Modal close | Reverse | `opacity: 1 → 0, scale: 1 → 0.95` (100 ms ease-in) |
| New project card appear | Fade + slide | `opacity: 0 → 1, y: -12px → 0` (200 ms) on mount |
| Overlay backdrop | Fade | `opacity: 0 → 0.4` (150 ms) |
| Web search tag | Fade + width | `opacity: 0 → 1, width: 0 → auto` (150 ms) |

Wrap the page content in `<AnimatePresence mode="wait">` at the layout level to handle route transitions.

---

## 9. Accessibility (WCAG AA)

- All interactive elements reachable via keyboard (Tab / Enter / Escape)
- Modals use Radix `Dialog` (traps focus, closes on Esc, restores focus on close)
- Dropdowns (⋮ menus) use Radix `DropdownMenu`
- Tabs use Radix `Tabs` with `aria-selected` and keyboard arrow navigation
- Color contrast: `--gris-clair-lm (#717171)` on white = 4.6:1 ✓; `--orange (#ea8c3c)` on white = 3.0:1 — use only for non-text (icons, borders, decorative) or large text; body text uses `--title-lm` or `--gris-fonce-lm`
- All icons accompanied by `aria-label` or visible label
- File type icons: `aria-hidden="true"`, filename provides the accessible label for the row

---

## 10. Dark Mode

- Root strategy: `class` on `<html>` (Tailwind `darkMode: 'class'`)
- Toggle button in the header (Lucide `Sun` / `Moon`)
- Map tokens:
  - Page background → dark gradient (use dark-mode Background component from Figma)
  - Card surfaces → `bg-noir-2`
  - Body text → `text-blanc-lm`
  - Secondary text → `text-stroke-dm`
  - Borders → `border-stroke-dm`
  - Orange accent unchanged

---

## 11. Out of Scope

The following are **explicitly excluded** from this prototype:

- Real AI responses (all mocked with static strings)
- Real file upload / storage / parsing
- Authentication / login
- User account management
- Bibliothèque de prompts page (link exists in sidebar, no interaction required)
- Notifications or push alerts
- Collaboration / sharing
- Search within the app
- Settings / preferences page
- Export or integration with external tools
- Any route not listed in §1.1

---

## 12. Verification Checklist

A reviewer must be able to check each item independently.

### Component stories (Phase 1)
- [ ] Every component in §3.1 has a Storybook story
- [ ] `ProjetCard` story has args controls for `titre`, `description`, `date`, `pinned`
- [ ] `Tableau` has separate "Chats" and "Sources" variant stories
- [ ] `ModalCreerProjet` has "create" and "edit" mode stories
- [ ] `PromptBar` story shows web-search active and inactive states
- [ ] `PromptEnvoi` story shows `webSearch: true` and `false` variants
- [ ] Dark mode decorator toggles correctly in Storybook

### Desktop screens (Phase 2)
- [ ] `/projects` shows empty state when no projects exist
- [ ] `/projects` shows 2-column card grid when projects exist
- [ ] `/projects` shows expired banner for any project with `expiresInDays`
- [ ] Banner can be dismissed; does not reappear within the same session
- [ ] "+ Projet" opens modal; name input blocked at 15 chars; character counter shown
- [ ] "Enregistrer" disabled until name is non-empty
- [ ] New project appears at top of grid after creation
- [ ] ⋮ dropdown on card: Modifier, Épingler/Désépingler, Supprimer
- [ ] Modifier opens modal pre-filled; saves edits in place
- [ ] Épingler moves card to pinned section with active icon
- [ ] Supprimer shows confirmation modal; confirmed delete removes card
- [ ] Clicking a card navigates to `/projects/[id]`
- [ ] `/projects/[id]` default tab is Chats
- [ ] Chats tab shows empty state when no chats
- [ ] Sending a message creates a new chat and navigates to `/projects/[id]/chat/[chatId]`
- [ ] Sources tab accessible via tab click
- [ ] Sources tab shows empty state when no sources
- [ ] "+ Source" triggers file input; success adds row; duplicate/unsupported/oversized show correct error
- [ ] Clicking a source row opens preview modal
- [ ] Image format (jpg) previews inline in modal
- [ ] Non-previewable format shows "aperçu non disponible" + download button
- [ ] Download button fires mock download
- [ ] In chat: sending message with web search active shows globe badge on user bubble
- [ ] Web search tag stays active across messages until × clicked
- [ ] AI mock response appears after ~800 ms delay
- [ ] Source reference link in AI response opens preview modal
- [ ] Chat ⋮: Épingler and Supprimer (with confirmation) work

### Mobile screens (Phase 2)
- [ ] Project list is single-column on mobile
- [ ] Prompt bar is fixed at viewport bottom on project pages and chat pages
- [ ] Header is 64 px with hamburger, logo, avatar
- [ ] Sidebar opens as drawer overlay on mobile (tap hamburger)
- [ ] File preview modal is full-width with 16 px inset

### Animations (Phase 3)
- [ ] Route transitions slide: outgoing left, incoming from right
- [ ] Modal open: fade + scale from 0.95
- [ ] Modal close: reverse
- [ ] New project card fades + slides in on creation
- [ ] Web search tag animates width on appear/disappear
- [ ] No layout shift during animations

### Accessibility
- [ ] All modals trap focus and close on Esc
- [ ] Tab order is logical throughout
- [ ] Dropdown menus navigable with keyboard
- [ ] All icon-only buttons have `aria-label`
- [ ] Color contrast passes WCAG AA for all text

### Design tokens
- [ ] `grep -r '#[0-9a-fA-F]\{3,6\}' src/` returns zero results (no raw hex in component code)
- [ ] Tailwind config contains all tokens from §7
- [ ] Dark mode toggles correctly on all screens
