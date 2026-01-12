# Architecture Document
## Serenity - Meditation App

**Version:** 1.0
**Last Updated:** January 2026

---

## Table of Contents
1. [Overview](#overview)
2. [System Architecture](#system-architecture)
3. [Technology Stack](#technology-stack)
4. [Component Architecture](#component-architecture)
5. [State Management](#state-management)
6. [Audio Architecture](#audio-architecture)
7. [PWA Architecture](#pwa-architecture)
8. [File Structure](#file-structure)
9. [Design Decisions](#design-decisions)

---

## Overview

### Architecture Goals
- **Simplicity**: Minimal dependencies, easy to understand
- **Performance**: Fast load times, smooth animations (60 FPS)
- **Offline-first**: Full functionality without network
- **Accessibility**: WCAG 2.1 AA compliant
- **Maintainability**: Clear separation of concerns

### Constraints
- No backend server
- No user authentication
- No database (localStorage only for preferences)
- Client-side only

---

## System Architecture

### High-Level Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                          Browser                                     │
├─────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                    React Application                         │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │   │
│  │  │   Timer     │  │  Breathing  │  │   Sounds    │         │   │
│  │  │  Module     │  │   Module    │  │   Module    │         │   │
│  │  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘         │   │
│  │         │                │                │                 │   │
│  │  ┌──────┴────────────────┴────────────────┴──────┐         │   │
│  │  │              Shared State & Context           │         │   │
│  │  │         (Theme, Timer State, Audio)           │         │   │
│  │  └───────────────────────────────────────────────┘         │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────────┐   │
│  │ Service Worker  │  │  Web Audio API  │  │   localStorage   │   │
│  │   (Caching)     │  │   (Synthesis)   │  │  (Preferences)   │   │
│  └─────────────────┘  └─────────────────┘  └──────────────────┘   │
├─────────────────────────────────────────────────────────────────────┤
│                        External Resources                            │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │              Audio CDN (soundjay.com)                        │   │
│  │         Rain | Forest | Ocean | Fire sounds                  │   │
│  └─────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
```

### Data Flow

```
User Action → Component → Hook/Context → State Update → Re-render
     ↓
  Side Effects (Audio, localStorage)
```

---

## Technology Stack

### Core Technologies

| Layer | Technology | Version | Purpose |
|-------|------------|---------|---------|
| Framework | React | 19.x | UI library |
| Build Tool | Vite | 7.x | Fast bundling, HMR |
| Language | JavaScript (ES2022+) | - | Application code |
| Styling | CSS Modules / CSS Variables | - | Component styles |
| PWA | vite-plugin-pwa | 1.x | Service worker, manifest |

### Development Tools

| Tool | Purpose |
|------|---------|
| Vitest | Unit testing |
| React Testing Library | Component testing |
| ESLint | Code linting |
| Prettier | Code formatting |

### Browser APIs Used

| API | Purpose |
|-----|---------|
| Web Audio API | Synthesized sounds (singing bowls) |
| HTML5 Audio | Ambient sound playback |
| localStorage | Theme persistence |
| Service Worker | Offline caching |

---

## Component Architecture

### Component Hierarchy

```
App
├── ThemeProvider
│   └── Layout
│       ├── Header
│       │   └── ThemeToggle
│       ├── Main
│       │   ├── ProgressCircle
│       │   ├── TimerDisplay
│       │   ├── TimerControls (Presets)
│       │   ├── ActionButtons (Start/Pause/Reset)
│       │   ├── TabNavigation
│       │   └── TabContent
│       │       ├── BreathingGuide
│       │       └── AmbientSound
│       └── Footer (optional)
```

### Component Responsibilities

| Component | Responsibility |
|-----------|----------------|
| `App` | Root component, providers |
| `ThemeProvider` | Theme context, localStorage sync |
| `ProgressCircle` | SVG timer visualization |
| `TimerControls` | Preset selection UI |
| `BreathingGuide` | Breathing animation, audio cues |
| `AmbientSound` | Sound selection, volume control |
| `ThemeToggle` | Dark/light mode switch |

### Component Communication

```
                    ThemeContext
                         │
        ┌────────────────┼────────────────┐
        │                │                │
   ThemeToggle      ProgressCircle     Buttons
   (updates)         (consumes)       (consume)


                    Timer State (useTimer)
                         │
        ┌────────────────┼────────────────┐
        │                │                │
   TimerDisplay    ProgressCircle   BreathingGuide
   (display)        (progress)      (sync state)
```

---

## State Management

### State Categories

| Category | Storage | Scope |
|----------|---------|-------|
| Timer State | React Hook (useTimer) | App-wide |
| Theme | Context + localStorage | App-wide |
| Sound Selection | Component state | Sound module |
| Breathing Phase | Component state | Breathing module |

### useTimer Hook Interface

```javascript
const {
  time,           // Current time in seconds
  isRunning,      // Boolean - timer active
  isComplete,     // Boolean - timer finished
  progress,       // 0-100 percentage
  preset,         // Selected duration in minutes
  start,          // Function to start timer
  pause,          // Function to pause timer
  reset,          // Function to reset timer
  setPreset,      // Function to change preset
} = useTimer()
```

### Theme Context Interface

```javascript
const {
  theme,          // 'dark' | 'light'
  toggleTheme,    // Function to switch theme
} = useTheme()
```

---

## Audio Architecture

### Audio Types

```
Audio System
├── Synthesized (Web Audio API)
│   ├── Singing Bowl Tones (phase transitions)
│   └── Chimes (count sounds)
│
└── Streamed (HTML5 Audio)
    ├── Rain
    ├── Forest
    ├── Ocean
    └── Fire
```

### Web Audio API Implementation

```
┌─────────────────────────────────────────────────────────────────┐
│                    Web Audio Context                             │
│                                                                  │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐      │
│  │ Oscillator   │ →  │  GainNode    │ →  │ Destination  │      │
│  │ (Frequency)  │    │  (Volume)    │    │  (Speaker)   │      │
│  └──────────────┘    └──────────────┘    └──────────────┘      │
│                                                                  │
│  Additional for richness:                                        │
│  - Multiple oscillators (harmonics)                              │
│  - Envelope shaping (attack/decay)                               │
└─────────────────────────────────────────────────────────────────┘
```

### Sound Frequencies

| Sound | Note | Frequency (Hz) |
|-------|------|----------------|
| Inhale | C4 | 261.63 |
| Hold | E4 | 329.63 |
| Exhale | D4 | 293.66 |
| Hold 2 | F4 | 349.23 |
| Count 1 | C5 | 523.25 |
| Count 2 | D5 | 587.33 |
| Count 3 | E5 | 659.25 |
| Count 4 | G5 | 783.99 |

### Audio Flow

```
Timer Start
    │
    ▼
Breathing Phase Change
    │
    ├──► Play Bowl Tone (Web Audio)
    │
    ▼
Count Interval (1s)
    │
    └──► Play Chime (Web Audio)


Sound Button Click
    │
    ▼
Select/Toggle Sound
    │
    ├──► Stop previous audio
    └──► Start new audio (HTML5)
           │
           └──► Loop continuously
```

---

## PWA Architecture

### Service Worker Strategy

```
┌─────────────────────────────────────────────────────────────────┐
│                    Caching Strategy                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Precache (Install Time)        Runtime Cache                   │
│  ├── index.html                 ├── Audio files (on-demand)    │
│  ├── main.js                    └── API responses (if any)     │
│  ├── styles.css                                                 │
│  ├── manifest.json                                              │
│  └── icons/                                                     │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Workbox Configuration

```javascript
// vite.config.js (simplified)
VitePWA({
  registerType: 'autoUpdate',
  workbox: {
    globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
    runtimeCaching: [
      {
        urlPattern: /\.mp3$/,
        handler: 'CacheFirst',
        options: {
          cacheName: 'audio-cache',
          expiration: { maxEntries: 10 }
        }
      }
    ]
  }
})
```

### Offline Behavior

| Resource | Strategy | Fallback |
|----------|----------|----------|
| HTML/JS/CSS | Cache First | Precached |
| Audio (ambient) | Cache First | Silence |
| Audio (synthesized) | N/A | Always works |
| Images/Icons | Cache First | Precached |

---

## File Structure

```
meditation-app/
├── public/
│   ├── icons/              # PWA icons
│   └── manifest.json       # PWA manifest
│
├── src/
│   ├── components/
│   │   ├── ProgressCircle.jsx
│   │   ├── ProgressCircle.css
│   │   ├── TimerControls.jsx
│   │   ├── BreathingGuide.jsx
│   │   ├── BreathingGuide.css
│   │   ├── AmbientSound.jsx
│   │   ├── AmbientSound.css
│   │   ├── ThemeToggle.jsx
│   │   └── ThemeToggle.css
│   │
│   ├── hooks/
│   │   └── useTimer.js     # Timer logic
│   │
│   ├── context/
│   │   └── ThemeContext.jsx # Theme state
│   │
│   ├── styles/
│   │   └── global.css      # Global styles, CSS variables
│   │
│   ├── App.jsx             # Root component
│   ├── App.css             # App styles
│   └── main.jsx            # Entry point
│
├── tests/
│   └── *.test.jsx          # Test files
│
├── docs/                   # Documentation
│
├── vite.config.js          # Vite + PWA config
├── package.json
└── README.md
```

---

## Design Decisions

### ADR-001: Client-Side Only Architecture

**Decision:** No backend server

**Rationale:**
- Zero operational costs
- Maximum privacy (no data collection)
- Works offline by default
- Simpler deployment

**Consequences:**
- Cannot sync across devices
- No user accounts
- Limited analytics capabilities

---

### ADR-002: React 19 + Vite

**Decision:** Use React 19 with Vite instead of Create React App

**Rationale:**
- Faster development (HMR)
- Smaller bundle size
- Better PWA plugin support
- Active maintenance

**Consequences:**
- Need to manage config manually
- Fewer "batteries included" features

---

### ADR-003: Web Audio API for Sound Synthesis

**Decision:** Generate singing bowl sounds using Web Audio API

**Rationale:**
- No external audio file dependencies
- Works offline without caching audio
- Customizable frequencies
- Smaller bundle size

**Consequences:**
- More complex code
- Sound quality less "natural" than recordings
- Browser compatibility considerations

---

### ADR-004: CSS Variables for Theming

**Decision:** Use CSS custom properties for theme colors

**Rationale:**
- Native browser support
- No JavaScript runtime cost
- Easy to implement transitions
- Single source of truth

**Consequences:**
- Limited to colors/simple values
- Need fallbacks for very old browsers

---

### ADR-005: localStorage for Persistence

**Decision:** Use localStorage for theme preference only

**Rationale:**
- Simple API
- No dependencies
- Synchronous access
- Sufficient for small data

**Consequences:**
- Limited to ~5MB
- Not suitable for large data
- No cross-device sync

---

## Performance Considerations

### Bundle Size Budget

| Asset Type | Budget |
|------------|--------|
| JavaScript | <200 KB gzipped |
| CSS | <30 KB gzipped |
| Total | <300 KB gzipped |

### Animation Performance

- Use `transform` and `opacity` for animations (GPU accelerated)
- Avoid layout thrashing
- Use `requestAnimationFrame` for JavaScript animations
- Test on low-end devices

### Loading Strategy

1. Critical CSS inlined
2. JavaScript deferred
3. Audio loaded on-demand
4. Service worker caches after first load

---

## Security Considerations

| Concern | Mitigation |
|---------|------------|
| XSS | React escapes by default |
| HTTPS | Enforce HTTPS hosting |
| Dependencies | Regular npm audit |
| Data privacy | No data collection |

---

## Future Considerations

### Potential Enhancements
- IndexedDB for session history (Phase 3)
- Background sync for statistics
- Web Workers for audio processing
- WebGL for advanced visualizations

### Scalability Path
- Static hosting scales infinitely
- CDN for global distribution
- No server bottlenecks

---

*This document should be updated when significant architectural changes are made.*
