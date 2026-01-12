# Changelog
## Serenity - Meditation App

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Planned
- Human voice guidance option
- Custom timer duration input
- Additional ambient sounds (singing bowls, wind, birds)
- Volume mixer for independent audio control
- Alternative breathing patterns (4-7-8, box breathing)

---

## [1.0.0] - 2026-01

### Added

#### Core Features
- **Meditation Timer**
  - 5, 10, 20 minute preset durations
  - Visual progress circle with gradient stroke
  - Start, Pause, Reset controls
  - Completion state with visual feedback
  - Preset selection disabled during active session

- **Breathing Guide**
  - Animated expanding/contracting circle
  - 4-4-4-2 breathing pattern (Inhale-Hold-Exhale-Hold)
  - Phase text display ("Breathe In", "Hold", "Breathe Out")
  - Count display (1, 2, 3, 4) for each phase
  - Phase indicator dots
  - Syncs with timer start/pause

- **Audio Cues**
  - Singing bowl tones for phase transitions (Web Audio API)
  - Pentatonic scale chimes for counting
  - Mute/unmute toggle for breathing sounds
  - Ambient waterfall background during meditation

- **Ambient Sounds**
  - 4 nature soundscapes: Rain, Forest, Ocean, Fire
  - Volume slider control (0-100%)
  - Single sound at a time (auto-switch)
  - Seamless audio looping
  - Sound wave animation indicator

- **Theme System**
  - Dark mode (default)
  - Light mode
  - Smooth color transitions
  - Theme persistence via localStorage
  - Toggle with sun/moon icons

- **PWA Support**
  - Service worker for offline functionality
  - Web app manifest for installation
  - Custom app icons
  - Standalone display mode
  - Automatic cache updates

#### Technical
- React 19 with Vite 7
- Component-based architecture
- Custom useTimer hook
- ThemeContext for state management
- CSS custom properties for theming
- Responsive design (mobile-first)

#### Testing
- 48 unit/integration tests
- Vitest + React Testing Library
- 80%+ code coverage

#### Documentation
- CLAUDE.md with project commands
- Comprehensive docs/ folder
- Business Requirements Document
- Product Requirements Document
- Test Plan and Test Cases

### Technical Details
- Bundle size: <200KB gzipped
- Lighthouse PWA score: 90+
- Zero backend dependencies
- No user data collection

---

## Version History

| Version | Date | Highlights |
|---------|------|------------|
| 1.0.0 | Jan 2026 | Initial release - MVP complete |

---

## Migration Notes

### From 0.x to 1.0.0
- N/A (initial release)

---

## Deprecations

None currently.

---

## Contributors

- Initial development by Claude (AI)

---

*For detailed changes, see the [commit history](../../.git).*
