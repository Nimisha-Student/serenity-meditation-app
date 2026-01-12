# Product Requirements Document (PRD)
## Serenity - Meditation App

**Version:** 1.0
**Last Updated:** January 2026
**Product Owner:** TBD

---

## Table of Contents
1. [Overview](#overview)
2. [Features](#features)
3. [User Flows](#user-flows)
4. [Functional Requirements](#functional-requirements)
5. [Non-Functional Requirements](#non-functional-requirements)
6. [Out of Scope](#out-of-scope)
7. [Open Questions](#open-questions)

---

## Overview

### Product Summary
Serenity is a Progressive Web App that provides meditation and breathing exercises through an elegant, distraction-free interface. The app requires no account, works offline, and delivers a premium experience for free.

### Goals
1. Help users reduce stress through guided breathing
2. Provide a beautiful, calming meditation environment
3. Work seamlessly across all devices
4. Respect user privacy (no data collection)

---

## Features

### F1: Meditation Timer

**Description:** A visual countdown timer with preset durations for meditation sessions.

| Attribute | Specification |
|-----------|---------------|
| Presets | 5, 10, 20 minutes |
| Visual | Animated SVG progress circle |
| Completion | Visual and audio notification |
| Controls | Start, Pause, Reset buttons |

**UI Components:**
- Progress circle with gradient stroke
- Digital time display (MM:SS format)
- Preset selection buttons
- Action buttons (Start/Pause, Reset)

**Behavior:**
- Timer counts down in 1-second intervals
- Progress circle fills clockwise as time passes
- "Complete" message shown when timer reaches 0
- Timer can be paused and resumed
- Changing preset resets the timer

---

### F2: Breathing Guide

**Description:** Animated visual guide for structured breathing exercises.

| Attribute | Specification |
|-----------|---------------|
| Pattern | 4-4-4-2 (Inhale-Hold-Exhale-Hold) |
| Visual | Expanding/contracting circle animation |
| Audio | Singing bowl tones for phase transitions |
| Sync | Activates when timer starts |

**Breathing Phases:**
| Phase | Duration | Visual | Audio |
|-------|----------|--------|-------|
| Inhale | 5 seconds | Circle expands | C4 bowl tone |
| Hold | 5 seconds | Circle holds | E4 bowl tone |
| Exhale | 5 seconds | Circle contracts | D4 bowl tone |
| Hold | 3 seconds | Circle holds | F4 bowl tone |

**UI Components:**
- Animated breathing circle with gradient
- Ripple ring effects
- Phase name text ("Breathe In", "Hold", "Breathe Out")
- Count display (1, 2, 3, 4)
- Sound toggle button

---

### F3: Ambient Sounds

**Description:** Background nature sounds to enhance meditation atmosphere.

| Attribute | Specification |
|-----------|---------------|
| Sounds | Rain, Forest, Ocean, Fire |
| Format | Streaming MP3 |
| Looping | Continuous seamless loop |
| Volume | Adjustable via slider |

**Sound Sources:**
| Sound | Icon | Source URL |
|-------|------|------------|
| Rain | 🌧️ | soundjay.com |
| Forest | 🌲 | soundjay.com |
| Ocean | 🌊 | soundjay.com |
| Fire | 🔥 | soundjay.com |

**UI Components:**
- 4-button sound grid
- Volume slider (0-100%)
- Playing indicator animation
- Active state highlighting

---

### F4: Theme Toggle (Dark/Light Mode)

**Description:** Toggle between dark and light color themes.

| Attribute | Specification |
|-----------|---------------|
| Default | Dark mode |
| Persistence | localStorage |
| Transition | Smooth color animation |
| Position | Fixed top-right corner |

**Color Schemes:**

| Element | Dark Theme | Light Theme |
|---------|------------|-------------|
| Background | #0d0d1a | #f5f5f7 |
| Surface | #1a1a2e | #ffffff |
| Text Primary | #ffffff | #1a1a2e |
| Accent | #8a2be2 | #7b1fa2 |
| Gradient Start | #8a2be2 | #7b1fa2 |
| Gradient End | #00ced1 | #0097a7 |

---

### F5: PWA Support

**Description:** Progressive Web App capabilities for installation and offline use.

| Attribute | Specification |
|-----------|---------------|
| Installable | Yes - all platforms |
| Offline | Full functionality |
| Icon | Custom app icon |
| Splash | Themed splash screen |

**Manifest Configuration:**
- Name: "Serenity - Meditation App"
- Short name: "Serenity"
- Theme color: #1a1a2e
- Display: standalone
- Orientation: portrait

---

## User Flows

### Flow 1: Basic Meditation Session

```
┌─────────────────────────────────────────────────────────────────┐
│ User opens app                                                  │
│      ↓                                                          │
│ Sees timer (default 5 min) + breathing guide                    │
│      ↓                                                          │
│ [Optional] Selects different preset (10 or 20 min)              │
│      ↓                                                          │
│ [Optional] Switches to Sounds tab, selects ambient sound        │
│      ↓                                                          │
│ Clicks "Start" button                                           │
│      ↓                                                          │
│ Timer counts down + breathing guide animates                    │
│      ↓                                                          │
│ [Optional] User pauses/resumes as needed                        │
│      ↓                                                          │
│ Timer completes → "Complete" message shown                      │
│      ↓                                                          │
│ User clicks Reset or closes app                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Flow 2: PWA Installation

```
┌─────────────────────────────────────────────────────────────────┐
│ User visits app in browser                                      │
│      ↓                                                          │
│ Browser shows install prompt (after criteria met)               │
│      ↓                                                          │
│ User clicks "Install" / "Add to Home Screen"                    │
│      ↓                                                          │
│ App installs to device                                          │
│      ↓                                                          │
│ User launches from home screen                                  │
│      ↓                                                          │
│ App opens in standalone mode (no browser chrome)                │
└─────────────────────────────────────────────────────────────────┘
```

---

## Functional Requirements

### Timer Requirements

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-T1 | Timer shall display time in MM:SS format | P0 |
| FR-T2 | Timer shall support 5, 10, 20 minute presets | P0 |
| FR-T3 | Timer shall have Start, Pause, Reset controls | P0 |
| FR-T4 | Timer shall show visual progress indicator | P0 |
| FR-T5 | Timer shall indicate completion state | P0 |
| FR-T6 | Preset buttons shall be disabled while running | P1 |

### Breathing Guide Requirements

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-B1 | Guide shall animate breathing circle for each phase | P0 |
| FR-B2 | Guide shall display current phase name | P0 |
| FR-B3 | Guide shall show count for each phase | P0 |
| FR-B4 | Guide shall sync with timer (active when running) | P0 |
| FR-B5 | Guide shall play audio cues for phase transitions | P1 |
| FR-B6 | Guide shall have mute/unmute toggle | P1 |

### Sound Requirements

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-S1 | App shall offer 4 ambient sound options | P0 |
| FR-S2 | Sounds shall loop seamlessly | P0 |
| FR-S3 | User shall be able to adjust volume | P0 |
| FR-S4 | Only one sound shall play at a time | P0 |
| FR-S5 | Sound selection shall persist during session | P1 |

### Theme Requirements

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-TH1 | App shall support dark and light themes | P0 |
| FR-TH2 | Theme preference shall persist in localStorage | P0 |
| FR-TH3 | Theme transition shall be animated | P1 |
| FR-TH4 | Default theme shall be dark | P1 |

### PWA Requirements

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-P1 | App shall be installable as PWA | P0 |
| FR-P2 | App shall work offline | P0 |
| FR-P3 | App shall have appropriate manifest | P0 |
| FR-P4 | App shall register service worker | P0 |

---

## Non-Functional Requirements

### Performance

| ID | Requirement | Target |
|----|-------------|--------|
| NFR-P1 | Initial page load | <3 seconds |
| NFR-P2 | Time to interactive | <5 seconds |
| NFR-P3 | Animation frame rate | 60 FPS |
| NFR-P4 | Bundle size | <500 KB gzipped |

### Accessibility

| ID | Requirement | Standard |
|----|-------------|----------|
| NFR-A1 | Color contrast | WCAG 2.1 AA |
| NFR-A2 | Keyboard navigation | Full support |
| NFR-A3 | Screen reader support | ARIA labels |
| NFR-A4 | Reduced motion support | prefers-reduced-motion |

### Browser Support

| Browser | Minimum Version |
|---------|-----------------|
| Chrome | 80+ |
| Firefox | 75+ |
| Safari | 13+ |
| Edge | 80+ |
| Mobile Safari | iOS 13+ |
| Chrome Android | 80+ |

### Security

| ID | Requirement |
|----|-------------|
| NFR-S1 | No user data collection |
| NFR-S2 | No third-party analytics |
| NFR-S3 | HTTPS only |
| NFR-S4 | No external API calls (except audio CDN) |

---

## Out of Scope

The following are explicitly **not** included in the current version:

| Item | Reason |
|------|--------|
| User accounts | Privacy-first approach |
| Cloud sync | No backend infrastructure |
| Social features | Simplicity focus |
| Guided audio meditations | Content creation required |
| Custom breathing patterns | Phase 2 feature |
| Statistics/history | Phase 3 feature |
| Push notifications | Phase 3 feature |
| Multi-language | Phase 4 feature |

---

## Open Questions

| ID | Question | Status | Decision |
|----|----------|--------|----------|
| OQ-1 | Should we add custom timer input? | Open | Consider for Phase 2 |
| OQ-2 | Human voice vs synthesized audio cues? | Decided | Singing bowl tones for MVP |
| OQ-3 | Should sounds auto-play with timer? | Open | Currently manual |
| OQ-4 | Add haptic feedback on mobile? | Open | Research needed |

---

## Appendix

### Related Documents
- [Business Requirements (BRD)](../business/BRD.md)
- [Product Roadmap](../business/ROADMAP.md)
- [User Stories](./USER-STORIES.md)
- [Acceptance Criteria](./ACCEPTANCE-CRITERIA.md)

---

*This document is maintained by the Product team and updated with each feature release.*
