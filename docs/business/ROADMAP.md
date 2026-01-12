# Product Roadmap
## Serenity - Meditation App

**Last Updated:** January 2026

---

## Vision Statement

> **Serenity aims to be the most accessible, beautiful, and simple meditation app available - proving that premium experiences don't require premium prices.**

---

## Roadmap Overview

```
Phase 1: MVP          Phase 2: Enhanced      Phase 3: Growth       Phase 4: Scale
(Complete)            (Current)              (Next)                (Future)
─────────────────────────────────────────────────────────────────────────────────
Timer + Breathing     Voice Cues             Guided Sessions       Social Features
Ambient Sounds        More Sound Options     Statistics            Premium Tier
Dark Mode             Customization          Meditation Courses    API/Integrations
PWA Support           Accessibility          Multi-language        Enterprise
```

---

## Phase 1: MVP (Complete)

**Goal:** Deliver core meditation functionality with beautiful design

### Delivered Features

| Feature | Status | Description |
|---------|--------|-------------|
| Meditation Timer | Done | 5/10/20 minute presets with visual progress circle |
| Breathing Guide | Done | Animated 4-4-4-2 breathing pattern with visual cues |
| Ambient Sounds | Done | Rain, Forest, Ocean, Fire soundscapes |
| Dark/Light Mode | Done | Theme toggle with localStorage persistence |
| PWA Support | Done | Installable, works offline |
| Responsive Design | Done | Mobile-first, works on all screen sizes |

### Technical Achievements
- React 19 with Vite 7
- 48 passing tests
- Lighthouse PWA score: 90+
- Zero backend dependencies

---

## Phase 2: Enhanced Experience (Current)

**Goal:** Improve audio experience and add customization options

### Planned Features

| Feature | Priority | Status | Description |
|---------|----------|--------|-------------|
| Human Voice Cues | P0 | In Progress | Natural voice guidance for breathing |
| Singing Bowl Sounds | P0 | Done | Meditative bell/bowl audio cues |
| Custom Timer | P1 | Planned | User-defined duration |
| More Ambient Sounds | P1 | Planned | Singing bowls, wind, birds, white noise |
| Volume Mixer | P2 | Planned | Independent volume for voice/ambient/bells |
| Breathing Patterns | P2 | Planned | 4-7-8, box breathing, etc. |

### Success Criteria
- Users report "calming" audio experience
- Session completion rate increases by 10%
- Feature adoption >40%

---

## Phase 3: Growth (Next)

**Goal:** Add features that drive engagement and retention

### Planned Features

| Feature | Priority | Description |
|---------|----------|-------------|
| Session Statistics | P0 | Track meditation history, streaks |
| Guided Meditations | P1 | Pre-recorded meditation sessions |
| Daily Reminders | P1 | Optional push notifications |
| Meditation Courses | P2 | Structured multi-day programs |
| Achievements | P2 | Gamification elements |
| Share Progress | P2 | Social sharing capabilities |

### Success Criteria
- 30-day retention rate >20%
- Users complete 5+ sessions average
- NPS score >40

---

## Phase 4: Scale (Future)

**Goal:** Expand reach and explore sustainability options

### Potential Features

| Feature | Description |
|---------|-------------|
| Multi-language | Support for 10+ languages |
| Premium Tier | Optional subscription for advanced features |
| Enterprise Version | Workplace wellness solution |
| API Access | Developer integrations |
| Community Features | Shared sessions, groups |
| Health App Integration | Apple Health, Google Fit sync |
| Wearable Support | Apple Watch, Wear OS apps |

---

## Priority Matrix (MoSCoW)

### Must Have (P0)
- [ ] Improved voice/audio cues
- [x] Core timer functionality
- [x] Breathing guide
- [x] Ambient sounds
- [x] PWA support

### Should Have (P1)
- [ ] Custom timer duration
- [ ] More ambient sounds
- [ ] Session statistics
- [ ] Daily reminders

### Could Have (P2)
- [ ] Volume mixer
- [ ] Multiple breathing patterns
- [ ] Achievements
- [ ] Guided meditations

### Won't Have (This Phase)
- Premium subscription
- Social features
- Multi-language
- Native mobile apps

---

## Feature Dependencies

```
                    ┌─────────────────┐
                    │  Voice Cues     │
                    └────────┬────────┘
                             │
              ┌──────────────┴──────────────┐
              │                             │
    ┌─────────▼─────────┐         ┌─────────▼─────────┐
    │  Volume Mixer     │         │  Guided Sessions  │
    └─────────┬─────────┘         └─────────┬─────────┘
              │                             │
              └──────────────┬──────────────┘
                             │
                    ┌────────▼────────┐
                    │  Premium Tier   │
                    └─────────────────┘
```

---

## Release Timeline

| Phase | Target | Status |
|-------|--------|--------|
| Phase 1: MVP | Q4 2025 | Complete |
| Phase 2.1: Audio Enhancement | Q1 2026 | In Progress |
| Phase 2.2: Customization | Q1 2026 | Planned |
| Phase 3: Growth | Q2-Q3 2026 | Planning |
| Phase 4: Scale | Q4 2026+ | Future |

*Note: Timeline is approximate and subject to change based on user feedback and priorities.*

---

## Success Metrics by Phase

| Phase | Key Metric | Target |
|-------|------------|--------|
| Phase 1 | PWA Lighthouse Score | >90 |
| Phase 2 | Session Completion Rate | >60% |
| Phase 3 | 30-day Retention | >20% |
| Phase 4 | Monthly Active Users | 10,000+ |

---

## How to Contribute

Features can be proposed by:
1. Opening a GitHub issue with the `feature-request` label
2. Describing the user problem it solves
3. Explaining how it fits the product vision

We prioritize features based on:
- User impact (how many users benefit)
- Alignment with vision (simplicity, accessibility)
- Technical feasibility
- Maintenance burden

---

*This roadmap is a living document updated quarterly based on user feedback and business priorities.*
