# ULIP App — Architecture Overview

## What Is This?

ULIP (Unified Learning & Intelligence Platform) is a **frontend-only React SPA** simulating an AI-powered corporate learning platform for Tata Steel employees. It is a prototype/mockup — there is no backend, no API calls, and no real authentication. All data is hardcoded in local JS files.

**Running locally:** `npm run dev` → `http://localhost:5178/` (port auto-increments if taken)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 (functional components, hooks only) |
| Build tool | Vite 8 |
| Styling | Inline styles everywhere — no CSS framework, no CSS modules |
| Routing | Manual `switch` on a `useState` string — no React Router |
| State | Local `useState` per component — no global store (no Redux, no Context) |
| Fonts | Google Fonts: Playfair Display (headings) + DM Sans (body) |
| Data | Static JS objects imported directly into components |
| Auth | Simulated: `loggedIn` boolean in `App.jsx` state |

---

## Directory Structure

```
ulip-app/
├── src/
│   ├── main.jsx              # React root, mounts <ULIP /> into #root
│   ├── App.jsx               # Root component: auth gate + routing
│   ├── theme.js              # Global color palette (C object)
│   │
│   ├── components/           # Reusable / layout components
│   │   ├── ui.jsx            # Primitive components: Card, Bdg, Btn, SLabel, Select
│   │   ├── Sidebar.jsx       # Left nav (230px fixed, blue background)
│   │   ├── TopBar.jsx        # Search bar, streak badge, notifications, profile dropdown
│   │   ├── TDAChatbot.jsx    # Floating AI assistant (fixed bottom-right)
│   │   ├── MicrolearningPopup.jsx  # Modal that fires 15s after login (TQM micro quiz)
│   │   ├── MicrolearningEngine.jsx # Full send/list/quiz builder UI (used by ProgramDirector)
│   │   ├── LiveWorkUpdates.jsx     # Live work order list (used by ProgramDirector)
│   │   ├── ProfileAvatar.jsx # Circular avatar with initials "VM"
│   │   ├── SOEBadge.jsx      # School of Excellence badge by level (Gold/Silver/Platinum)
│   │   └── Logos.jsx         # ULIP logo SVG + Tata Steel logo SVG
│   │
│   ├── pages/                # One component per nav destination
│   │   ├── LoginPage.jsx     # Full-screen login (any creds accepted)
│   │   ├── HomePage.jsx      # Dashboard: recommended learning, micros, calendar
│   │   ├── ProfilePage.jsx   # Skill gaps, journey roadmap, goal selector, certifications
│   │   ├── GoalsPage.jsx     # TQM competency goals (12 goals with progress bars)
│   │   ├── GigsPage.jsx      # Internal gig opportunities matched by skill
│   │   ├── MentorsPage.jsx   # Mentor directory with booking UI
│   │   ├── JobsPage.jsx      # Internal job openings with skill match %
│   │   ├── CommunitiesPage.jsx  # Social feed / community posts
│   │   ├── ProgramDirector.jsx  # Trainer-only admin hub (16 tabs)
│   │   └── PlaceholderPage.jsx  # Fallback for nav items without a dedicated page
│   │
│   ├── data/                 # All hardcoded data
│   │   ├── navItems.js       # NAV_ITEMS array (id, icon, label)
│   │   ├── learningData.js   # Skills, gaps, learning maps, certs, calendar, micro content
│   │   └── workData.js       # Work orders, gigs, jobs, mentors, community posts, programs
│   │
│   └── assets/              # Static images (hero.png, react.svg, vite.svg)
│
├── public/                   # favicon.svg, icons.svg
├── index.html                # HTML shell
├── vite.config.js            # Vite + @vitejs/plugin-react
└── package.json
```

---

## App Shell (`App.jsx`)

The root component `ULIP` owns three pieces of state:

```
loggedIn  (bool)   — gates the entire app behind LoginPage
active    (string) — controls which page renders (matches NAV_ITEMS id)
showMicro (bool)   — triggers MicrolearningPopup 15 seconds after login
```

Layout when authenticated:
```
<div style="display:flex; height:100vh">
  <Sidebar />          ← 230px, fixed left
  <main style="flex:1"> ← scrollable right panel
    <TopBar />
    {renderPage()}     ← switches on `active`
  </main>
</div>
<TDAChatbot />         ← fixed bottom-right, always rendered
{showMicro && <MicrolearningPopup />}  ← modal overlay
```

---

## Navigation

Navigation is driven by `NAV_ITEMS` in [src/data/navItems.js](src/data/navItems.js):

| id | Label | Page Component |
|---|---|---|
| `home` | Home | `HomePage` |
| `profile` | Profile | `ProfilePage` |
| `goals` | My Learning Goals | `GoalsPage` |
| `gigs` | Gigs | `GigsPage` |
| `mentors` | Mentors | `MentorsPage` |
| `jobs` | Jobs | `JobsPage` |
| `communities` | Communities | `CommunitiesPage` |
| `director` | Program Director | `ProgramDirector` (PRO badge) |

Clicking a `Sidebar` button calls `setActive(id)` in `App.jsx`, which triggers `renderPage()` to swap the content.

---

## Theme System (`theme.js`)

A single exported object `C` holds all color tokens. Every component imports this directly:

```js
import C from "../theme";
```

Key colors: `C.blue` (#0080C7), `C.bg` (#F4F8FC), `C.text` (#0A1629), `C.green` (#18B982), `C.accent` (#F5A623), `C.red` (#E5484D), `C.sidebar` (#0080C7).

---

## UI Primitives (`components/ui.jsx`)

Four reusable building blocks used across all pages:

| Component | Purpose |
|---|---|
| `<Card>` | White rounded card with border + shadow. Props: `pad` (default 20), `style` |
| `<SLabel>` | Section label in small uppercase — used as subheadings within cards |
| `<Bdg>` | Inline colored badge/chip. Props: `label`, `color` |
| `<Btn>` | Button with `variant="fill"` or `variant="outline"` and `color` |
| `<Select>` | Styled `<select>` dropdown |

---

## Data Layer

No API. All data lives in two files:

### `src/data/learningData.js`
- `SKILL_MODULES` — learning path modules (micros, courses, assessments) per skill with quiz questions and correct answers
- `SKILL_NAMES` — flat list of 20 skill names (used for goal search autocomplete)
- `SKILL_GAPS` — 12 skills with `current` and `required` proficiency % for gap analysis
- `LEARNING_MAP` — 4 proficiency levels (Beginner → Expert) with step templates
- `REC_LEARNINGS` — 4 AI-recommended courses for HomePage
- `POPULAR_MICRO` — 5 trending microlearnings for HomePage
- `CALENDAR_EVENTS` — 5 upcoming training events
- `TQM_GOALS` — 12 TQM competency goals with progress % for GoalsPage
- `SOE_CERTS` — 4 School of Excellence certifications earned by the user
- `TQM_MICRO` — content object for the MicrolearningPopup quiz

### `src/data/workData.js`
- `WORK_ORDERS` — 6 live work orders with skills + engagement % (used in LiveWorkUpdates)
- `GIGS_DATA` — 6 internal gig opportunities with match %, skills, deadlines
- `JOB_OPENINGS` — 6 internal job postings with match %
- `MENTOR_LIST` — 6 mentors with area, dept, experience
- `COMMUNITY_POSTS` — 3 community feed posts
- `SKILL_GAP_DATA` — per-department skill gap arrays (for ProgramDirector)
- `CREATED_TRAININGS`, `ACTIVE_PROGRAMS`, `REQUESTED_TRAININGS` — trainer program data
- `EXISTING_MICROS` — 5 microlearnings with analytics (sent, open rate, success rate)
- `TQM_MICRO` — reused microlearning content object
- Filter arrays: `DEPT_FILTERS`, `LEVEL_FILTERS`, `BIZ_UNITS`, `OPR_LEVELS`, `NOPR_LEVELS`

---

## Key Pages

### `HomePage`
Three-column grid: Recommended Learnings | Popular Microlearnings | Upcoming Programs. Below that: three action tiles (Feedback, Goals, Explore ULIP). Data from `learningData.js`.

### `ProfilePage`
Most complex learner-facing page. Contains:
- Profile header with Skill XP (4,820) and badges
- 5 stat tiles (trainings completed, due, goal %, projects)
- **Learning Journey Roadmap** — horizontal scrolling skill path, filterable by category (Safety/Engineering/Leadership/Digital)
- **Skill Drilldown modal** (`SkillDrilldown`) — opens on click, shows learning modules and an interactive quiz with XP reward
- **Skill Passport modal** (`SkillPassport`) — downloadable summary card
- **Goal Selector** — autocomplete search → pick proficiency level → generates a learning path
- **Skill Gap bars** — 12 skills, clickable to open drilldown
- **SOE Certification Wall** — 4 certs in a 2×2 grid

### `ProgramDirector`
Trainer-admin hub. Has **16 tabs** in a horizontally scrollable tab bar:

| Tab | Content |
|---|---|
| Skill Gap Analysis | Department/level filters + bar chart of gaps |
| Sentiment & Effectiveness | Open rate chart, training effectiveness table |
| Past Trainings | Created trainings list |
| AI Content Creator | GPT-style content generation for scenarios/courses |
| Microlearning Engine | Full `MicrolearningEngine` component (send/list/quiz builder) |
| Live Work Updates | `LiveWorkUpdates` component (work order cards) |
| Scenario & Simulation | Simulation content builder |
| Gamified Creator | Gamified quiz builder |
| Case Study / Incident | Incident case study creator |
| Book Training | Audience selector + booking form |
| Training Calendar | Monthly calendar with program scheduling |
| Training Dashboard | Org-wide KPI metrics |
| AI Insights | AI-generated recommendations |
| Requested Trainings | Pending training requests from managers |
| Active Programs | AURA Circles, Safety First, etc. |
| Create Campaign | Multi-channel nudge campaign builder |

### `GigsPage`
Cards for 6 gigs with match %, skills required (with level), deadline, and an "Apply" flow.

### `MentorsPage`
6 mentor cards, each with a "Book a session" modal-style form.

### `JobsPage`
6 job listings with skill match % and a detail view.

### `CommunitiesPage`
Social feed with 3 posts (tip/insight/achievement) and a compose box.

### `GoalsPage`
3-column grid of 12 TQM competency goal cards, each showing progress and 4 sub-items.

---

## Simulated AI Features

All "AI" is UI theatre — no actual model calls:

| Feature | Where | Simulation |
|---|---|---|
| **TDA Chatbot** | `TDAChatbot.jsx` | Fixed bot response template: "Here's what I found on X: Check the SOP module in ULIP." |
| **AI Content Generator** | `ProgramDirector` → AI Content Creator tab | Button triggers a 1.8s fake loading state then shows "Done!" |
| **AI Auto-Nudge** | `MicrolearningEngine` | Static UI showing "Active" triggers list |
| **AI Question Generator** | `MicrolearningEngine` → Add Quiz tab | `setAiGenerated(true)` populates hardcoded question text |
| **AI Insights** | `ProgramDirector` → AI Insights tab | Static recommendations text |
| **Match %** | Gigs, Jobs | Hardcoded numbers (e.g. 94%, 91%) |

---

## Simulated Learner Identity

The persona is fixed throughout the app — no real user system:

- **Name:** Vikram Mehta
- **Role:** Maintenance Engineer, IL4
- **Department:** TQM
- **Area:** H Blast Furnace, Plant TSN, Jamshedpur
- **Skill XP:** 4,820 (top 12% of team)
- **Streak:** 42 days
- **Certs:** School of Analytics (Gold), School of TQM (Platinum), School of Maintenance (Gold), School of Blockchain (Silver)

---

## Key Behavioral Notes

- **MicrolearningPopup** fires automatically 15 seconds after login (`useEffect` in `App.jsx`). It presents the TPM Autonomous Maintenance microlearning with a multiple-choice quiz.
- **Skill Drilldown modal** is the only place with real interactivity beyond navigation: selecting an answer and submitting evaluates it against a `correct` index and shows XP reward or retry.
- All dropdowns and forms in ProgramDirector are visual — no handlers persist state beyond the component.
- The `ProfilePage` goal autocomplete (`SKILL_NAMES.filter(...)`) is the only live search; it works against the static skill list.
- `PlaceholderPage` renders for any `active` id not explicitly handled in `App.jsx`'s switch — it shows the label from NAV_ITEMS.

---

## How to Run

```bash
cd ulip-app
npm install
npm run dev        # starts at http://localhost:5173 (or next free port)
```

Login with any username/password — the login button just calls `setLoggedIn(true)`.

To build for production:
```bash
npm run build      # outputs to dist/
npm run preview    # serves the dist/ folder
```
