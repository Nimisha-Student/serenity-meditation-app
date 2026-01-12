# User Stories Backlog
## Serenity - Meditation App

**Last Updated:** January 2026

---

## Story Format

```
ID: [EPIC]-[NUMBER]
As a [user type]
I want [goal/action]
So that [benefit/value]

Priority: P0/P1/P2
Status: Done/In Progress/Planned/Backlog
Points: [estimation]
```

---

## Epic: Timer (TIM)

### TIM-001: View Meditation Timer
**Status:** Done | **Priority:** P0 | **Points:** 3

As a **meditator**
I want **to see a visual timer with my remaining meditation time**
So that **I can track my session without watching a clock**

**Acceptance Criteria:**
- [ ] Timer displays in MM:SS format
- [ ] Progress circle shows visual countdown
- [ ] Time updates every second

---

### TIM-002: Select Timer Duration
**Status:** Done | **Priority:** P0 | **Points:** 2

As a **meditator**
I want **to choose from preset meditation durations**
So that **I can quickly start a session that fits my schedule**

**Acceptance Criteria:**
- [ ] 5, 10, and 20 minute presets available
- [ ] Active preset is visually highlighted
- [ ] Selecting preset updates timer display

---

### TIM-003: Start Meditation Session
**Status:** Done | **Priority:** P0 | **Points:** 2

As a **meditator**
I want **to start my meditation timer with a single click**
So that **I can begin meditating immediately**

**Acceptance Criteria:**
- [ ] Start button begins countdown
- [ ] Button changes to "Pause" when running
- [ ] Breathing guide activates automatically

---

### TIM-004: Pause and Resume Session
**Status:** Done | **Priority:** P0 | **Points:** 2

As a **meditator**
I want **to pause and resume my meditation**
So that **I can handle interruptions without losing progress**

**Acceptance Criteria:**
- [ ] Pause button stops countdown
- [ ] Time remaining is preserved
- [ ] Resume continues from paused time

---

### TIM-005: Reset Timer
**Status:** Done | **Priority:** P0 | **Points:** 1

As a **meditator**
I want **to reset my timer to start over**
So that **I can restart my session if needed**

**Acceptance Criteria:**
- [ ] Reset button returns to full duration
- [ ] Timer stops if running
- [ ] Progress circle resets to 0%

---

### TIM-006: Session Completion Notification
**Status:** Done | **Priority:** P0 | **Points:** 2

As a **meditator**
I want **to know when my meditation is complete**
So that **I can gently transition out of meditation**

**Acceptance Criteria:**
- [ ] "Complete" text displayed when timer ends
- [ ] Visual indication (color change, animation)
- [ ] Timer shows 00:00

---

### TIM-007: Custom Timer Duration
**Status:** Planned | **Priority:** P1 | **Points:** 3

As a **meditator**
I want **to set a custom meditation duration**
So that **I can meditate for exactly the time I need**

**Acceptance Criteria:**
- [ ] Input field for custom minutes
- [ ] Validation (min 1 min, max 60 min)
- [ ] Custom time appears in timer

---

## Epic: Breathing Guide (BRE)

### BRE-001: Visual Breathing Animation
**Status:** Done | **Priority:** P0 | **Points:** 5

As a **meditator**
I want **to see a visual guide for breathing rhythm**
So that **I can follow a structured breathing pattern**

**Acceptance Criteria:**
- [ ] Circle expands during inhale
- [ ] Circle contracts during exhale
- [ ] Animation is smooth (60 FPS)

---

### BRE-002: Breathing Phase Text
**Status:** Done | **Priority:** P0 | **Points:** 2

As a **meditator**
I want **to see text indicating the current breathing phase**
So that **I know what to do at each moment**

**Acceptance Criteria:**
- [ ] "Breathe In" during inhale
- [ ] "Hold" during holds
- [ ] "Breathe Out" during exhale

---

### BRE-003: Breathing Count Display
**Status:** Done | **Priority:** P0 | **Points:** 2

As a **meditator**
I want **to see a count for each breathing phase**
So that **I can pace my breath correctly**

**Acceptance Criteria:**
- [ ] Count displays 1, 2, 3, 4 during each phase
- [ ] Count resets at each phase change
- [ ] Count is visually prominent

---

### BRE-004: Audio Cues for Breathing
**Status:** Done | **Priority:** P1 | **Points:** 5

As a **meditator**
I want **audio cues for breathing phases**
So that **I can meditate with eyes closed**

**Acceptance Criteria:**
- [ ] Sound plays at phase transitions
- [ ] Sounds are calming (singing bowl tones)
- [ ] Softer chimes for count

---

### BRE-005: Mute Breathing Sounds
**Status:** Done | **Priority:** P1 | **Points:** 1

As a **meditator**
I want **to mute the breathing audio cues**
So that **I can meditate in silence if I prefer**

**Acceptance Criteria:**
- [ ] Mute button toggles all breathing sounds
- [ ] Visual indicator shows mute state
- [ ] Preference is temporary (resets on reload)

---

### BRE-006: Alternative Breathing Patterns
**Status:** Backlog | **Priority:** P2 | **Points:** 5

As a **meditator**
I want **to choose different breathing patterns**
So that **I can practice various breathing techniques**

**Acceptance Criteria:**
- [ ] 4-7-8 pattern option
- [ ] Box breathing (4-4-4-4) option
- [ ] Pattern selector UI

---

### BRE-007: Human Voice Guidance
**Status:** Backlog | **Priority:** P2 | **Points:** 8

As a **meditator**
I want **a calm human voice guiding my breathing**
So that **the experience feels more personal and natural**

**Acceptance Criteria:**
- [ ] Voice says "Inhale", "Hold", "Exhale"
- [ ] Voice counts "1, 2, 3, 4"
- [ ] Voice is calm and soothing

---

## Epic: Ambient Sounds (SND)

### SND-001: Select Ambient Sound
**Status:** Done | **Priority:** P0 | **Points:** 3

As a **meditator**
I want **to choose from different ambient sounds**
So that **I can create my preferred meditation atmosphere**

**Acceptance Criteria:**
- [ ] At least 4 sound options
- [ ] Visual selection buttons
- [ ] Selected sound is highlighted

---

### SND-002: Play/Stop Ambient Sound
**Status:** Done | **Priority:** P0 | **Points:** 2

As a **meditator**
I want **to start and stop ambient sounds**
So that **I have control over my soundscape**

**Acceptance Criteria:**
- [ ] Clicking sound starts playback
- [ ] Clicking again stops playback
- [ ] Playing indicator shown

---

### SND-003: Adjust Sound Volume
**Status:** Done | **Priority:** P0 | **Points:** 2

As a **meditator**
I want **to adjust the ambient sound volume**
So that **sounds aren't too loud or quiet**

**Acceptance Criteria:**
- [ ] Volume slider (0-100%)
- [ ] Real-time volume adjustment
- [ ] Slider only appears when sound selected

---

### SND-004: Seamless Sound Looping
**Status:** Done | **Priority:** P1 | **Points:** 2

As a **meditator**
I want **ambient sounds to loop seamlessly**
So that **I'm not distracted by audio gaps**

**Acceptance Criteria:**
- [ ] Sound loops without audible gap
- [ ] Loop continues until stopped

---

### SND-005: Additional Sound Options
**Status:** Planned | **Priority:** P1 | **Points:** 3

As a **meditator**
I want **more ambient sound choices**
So that **I can find sounds that work best for me**

**Acceptance Criteria:**
- [ ] Add singing bowls
- [ ] Add wind sounds
- [ ] Add bird sounds

---

## Epic: Theme (THM)

### THM-001: Toggle Dark/Light Mode
**Status:** Done | **Priority:** P0 | **Points:** 3

As a **user**
I want **to switch between dark and light themes**
So that **I can use the app comfortably in any lighting**

**Acceptance Criteria:**
- [ ] Toggle button switches theme
- [ ] Smooth color transition
- [ ] All elements update correctly

---

### THM-002: Persist Theme Preference
**Status:** Done | **Priority:** P1 | **Points:** 1

As a **user**
I want **my theme preference to be remembered**
So that **I don't have to set it every time**

**Acceptance Criteria:**
- [ ] Preference saved to localStorage
- [ ] Loads correct theme on return

---

## Epic: PWA (PWA)

### PWA-001: Install App
**Status:** Done | **Priority:** P0 | **Points:** 3

As a **mobile user**
I want **to install the app to my home screen**
So that **I can access it like a native app**

**Acceptance Criteria:**
- [ ] Install prompt appears
- [ ] App installs successfully
- [ ] Launches in standalone mode

---

### PWA-002: Offline Functionality
**Status:** Done | **Priority:** P0 | **Points:** 5

As a **user**
I want **the app to work without internet**
So that **I can meditate anywhere**

**Acceptance Criteria:**
- [ ] All features work offline
- [ ] Service worker caches assets
- [ ] Graceful handling of offline state

---

## Backlog Summary

| Status | Count |
|--------|-------|
| Done | 16 |
| In Progress | 0 |
| Planned | 2 |
| Backlog | 2 |
| **Total** | **20** |

---

## Story Points Summary

| Priority | Points |
|----------|--------|
| P0 | 38 |
| P1 | 14 |
| P2 | 13 |
| **Total** | **65** |

---

*This backlog is prioritized and refined during sprint planning sessions.*
