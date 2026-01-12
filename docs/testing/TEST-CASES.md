# Test Cases
## Serenity - Meditation App

**Version:** 1.0
**Last Updated:** January 2026

---

## Test Case Format

| Field | Description |
|-------|-------------|
| TC-ID | Unique identifier (FEATURE-NUMBER) |
| Title | Brief description |
| Priority | P0/P1/P2 |
| Type | Unit/Integration/E2E/Manual |
| Preconditions | Required setup |
| Steps | Actions to perform |
| Expected Result | What should happen |

---

## Timer Test Cases

### TC-TIM-001: Initial Timer Display
**Priority:** P0 | **Type:** Unit

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Open the app | App loads successfully |
| 2 | Observe timer display | Timer shows "05:00" |
| 3 | Observe progress circle | Circle shows 0% (empty) |
| 4 | Observe preset buttons | "5 min" button is highlighted |
| 5 | Observe action button | "Start" button is visible |

---

### TC-TIM-002: Select 10-Minute Preset
**Priority:** P0 | **Type:** Unit

**Precondition:** App is loaded, timer is not running

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Click "10 min" button | Button receives focus |
| 2 | Observe timer display | Shows "10:00" |
| 3 | Observe "10 min" button | Button is highlighted |
| 4 | Observe "5 min" button | Button is no longer highlighted |

---

### TC-TIM-003: Select 20-Minute Preset
**Priority:** P0 | **Type:** Unit

**Precondition:** App is loaded, timer is not running

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Click "20 min" button | Button receives focus |
| 2 | Observe timer display | Shows "20:00" |
| 3 | Observe "20 min" button | Button is highlighted |

---

### TC-TIM-004: Start Timer
**Priority:** P0 | **Type:** Integration

**Precondition:** Timer shows "05:00", not running

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Click "Start" button | Button text changes to "Pause" |
| 2 | Wait 1 second | Timer displays "04:59" |
| 3 | Observe progress circle | Circle shows slight progress |
| 4 | Observe breathing guide | Animation starts |
| 5 | Observe preset buttons | Buttons are disabled |

---

### TC-TIM-005: Pause Running Timer
**Priority:** P0 | **Type:** Integration

**Precondition:** Timer is running at "03:45"

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Click "Pause" button | Button text changes to "Start" |
| 2 | Wait 2 seconds | Timer still shows "03:45" |
| 3 | Observe breathing guide | Animation is paused |
| 4 | Observe progress circle | Progress is frozen |

---

### TC-TIM-006: Resume Paused Timer
**Priority:** P0 | **Type:** Integration

**Precondition:** Timer is paused at "03:45"

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Click "Start" button | Button text changes to "Pause" |
| 2 | Wait 1 second | Timer displays "03:44" |
| 3 | Observe breathing guide | Animation resumes |

---

### TC-TIM-007: Reset Running Timer
**Priority:** P0 | **Type:** Integration

**Precondition:** 10-min timer is running at "07:30"

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Click "Reset" button | Timer stops |
| 2 | Observe timer display | Shows "10:00" |
| 3 | Observe progress circle | Resets to 0% |
| 4 | Observe action button | Shows "Start" |
| 5 | Observe breathing guide | Animation stops |

---

### TC-TIM-008: Reset Paused Timer
**Priority:** P1 | **Type:** Integration

**Precondition:** 5-min timer is paused at "02:30"

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Click "Reset" button | Timer resets |
| 2 | Observe timer display | Shows "05:00" |
| 3 | Observe progress circle | Resets to 0% |
| 4 | Observe preset buttons | Buttons are enabled |

---

### TC-TIM-009: Timer Completion
**Priority:** P0 | **Type:** E2E

**Precondition:** Timer running with only 3 seconds remaining

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Wait for timer to reach 00:00 | Timer stops automatically |
| 2 | Observe timer display | Shows "Complete" or changes color |
| 3 | Observe progress circle | Shows 100% filled |
| 4 | Observe breathing guide | Animation stops |
| 5 | Observe action button | Shows "Start" or "Reset" |

---

### TC-TIM-010: Cannot Change Preset While Running
**Priority:** P1 | **Type:** Unit

**Precondition:** Timer is running

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Click "10 min" preset | Click has no effect |
| 2 | Click "20 min" preset | Click has no effect |
| 3 | Observe timer | Continues counting down |

---

## Breathing Guide Test Cases

### TC-BRE-001: Breathing Guide Initial State
**Priority:** P0 | **Type:** Unit

**Precondition:** App loaded, timer not running

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Observe breathing circle | Circle is visible, not animating |
| 2 | Observe phase text | Shows "Breathe In" (initial) |
| 3 | Observe circle size | At resting size |

---

### TC-BRE-002: Breathing Guide Activates with Timer
**Priority:** P0 | **Type:** Integration

**Precondition:** Timer not running

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Click "Start" on timer | Timer starts |
| 2 | Observe breathing circle | Circle begins animating |
| 3 | Observe phase text | Updates to match current phase |

---

### TC-BRE-003: Inhale Phase Animation
**Priority:** P0 | **Type:** Visual

**Precondition:** Breathing guide is active

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Wait for "Breathe In" phase | Phase text shows "Breathe In" |
| 2 | Observe circle | Circle expands smoothly |
| 3 | Observe count | Shows 1, 2, 3, 4 sequentially |
| 4 | Time the phase | Lasts approximately 5 seconds |

---

### TC-BRE-004: Hold Phase Animation
**Priority:** P0 | **Type:** Visual

**Precondition:** Breathing guide active, just finished inhale

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Wait for "Hold" phase | Phase text shows "Hold" |
| 2 | Observe circle | Circle maintains expanded size |
| 3 | Observe count | Shows 1, 2, 3, 4 sequentially |

---

### TC-BRE-005: Exhale Phase Animation
**Priority:** P0 | **Type:** Visual

**Precondition:** Breathing guide active, just finished first hold

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Wait for "Breathe Out" phase | Phase text shows "Breathe Out" |
| 2 | Observe circle | Circle contracts smoothly |
| 3 | Observe count | Shows 1, 2, 3, 4 sequentially |
| 4 | Time the phase | Lasts approximately 5 seconds |

---

### TC-BRE-006: Complete Breathing Cycle
**Priority:** P0 | **Type:** E2E

**Precondition:** Start timer from beginning

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Start timer | Breathing begins with "Breathe In" |
| 2 | Wait ~5 seconds | Transitions to "Hold" |
| 3 | Wait ~5 seconds | Transitions to "Breathe Out" |
| 4 | Wait ~5 seconds | Transitions to "Hold" |
| 5 | Wait ~3 seconds | Cycle repeats with "Breathe In" |

---

### TC-BRE-007: Audio Cues Play
**Priority:** P1 | **Type:** Manual

**Precondition:** Sound is not muted

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Start timer | Breathing guide activates |
| 2 | Listen at phase start | Singing bowl tone plays |
| 3 | Listen during phase | Softer chimes for counts |

---

### TC-BRE-008: Mute Breathing Sounds
**Priority:** P1 | **Type:** Integration

**Precondition:** Timer running, sounds playing

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Click mute/sound toggle | Button state changes |
| 2 | Listen | All breathing sounds stop |
| 3 | Observe animations | Visual animations continue |

---

### TC-BRE-009: Unmute Breathing Sounds
**Priority:** P1 | **Type:** Integration

**Precondition:** Timer running, sounds muted

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Click mute/sound toggle | Button state changes |
| 2 | Listen | Breathing sounds resume |

---

### TC-BRE-010: Breathing Pauses with Timer
**Priority:** P0 | **Type:** Integration

**Precondition:** Timer running, breathing active

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Click "Pause" on timer | Timer pauses |
| 2 | Observe breathing circle | Animation pauses |
| 3 | Observe phase text | Remains at current phase |
| 4 | Listen | Audio cues stop |

---

## Ambient Sounds Test Cases

### TC-SND-001: View Sound Options
**Priority:** P0 | **Type:** Unit

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to Sounds tab | Tab becomes active |
| 2 | Observe sound options | 4 options visible (Rain, Forest, Ocean, Fire) |
| 3 | Observe each option | Shows icon and name |
| 4 | Observe initial state | No sound is playing |

---

### TC-SND-002: Play Rain Sound
**Priority:** P0 | **Type:** Integration

**Precondition:** On Sounds tab, no sound playing

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Click "Rain" button | Sound begins playing |
| 2 | Observe Rain button | Shows active/playing state |
| 3 | Listen | Rain sound is audible |
| 4 | Observe volume slider | Slider appears |

---

### TC-SND-003: Stop Playing Sound
**Priority:** P0 | **Type:** Integration

**Precondition:** Rain sound is playing

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Click "Rain" button again | Sound stops |
| 2 | Observe Rain button | Returns to inactive state |
| 3 | Listen | Silence (no ambient sound) |

---

### TC-SND-004: Switch Between Sounds
**Priority:** P0 | **Type:** Integration

**Precondition:** Rain sound is playing

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Click "Ocean" button | Rain stops, Ocean starts |
| 2 | Observe Rain button | Inactive state |
| 3 | Observe Ocean button | Active state |
| 4 | Listen | Ocean sound is audible |

---

### TC-SND-005: Adjust Volume Up
**Priority:** P0 | **Type:** Integration

**Precondition:** Sound playing at 50% volume

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Drag slider to 75% | Slider moves |
| 2 | Listen | Sound gets louder |
| 3 | Observe slider position | Shows 75% |

---

### TC-SND-006: Adjust Volume Down
**Priority:** P0 | **Type:** Integration

**Precondition:** Sound playing at 50% volume

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Drag slider to 25% | Slider moves |
| 2 | Listen | Sound gets quieter |
| 3 | Observe slider position | Shows 25% |

---

### TC-SND-007: Mute via Volume to Zero
**Priority:** P1 | **Type:** Integration

**Precondition:** Sound playing

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Drag slider to 0% | Slider at minimum |
| 2 | Listen | Sound inaudible |
| 3 | Observe button | Still shows "playing" (not stopped) |

---

### TC-SND-008: Sound Loops Continuously
**Priority:** P1 | **Type:** Manual

**Precondition:** Sound playing

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Listen for full duration | Sound plays |
| 2 | Wait for loop point | Sound restarts seamlessly |
| 3 | Observe | No audible gap or click |

---

### TC-SND-009: Each Sound Type Plays
**Priority:** P0 | **Type:** E2E

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Click "Rain" | Rain sound plays |
| 2 | Click "Forest" | Forest sound plays |
| 3 | Click "Ocean" | Ocean sound plays |
| 4 | Click "Fire" | Fire/crackling sound plays |

---

## Theme Test Cases

### TC-THM-001: Default Theme is Dark
**Priority:** P0 | **Type:** Unit

**Precondition:** First visit or cleared localStorage

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Open app | App loads |
| 2 | Observe background | Dark color (#0d0d1a or similar) |
| 3 | Observe text | Light/white color |
| 4 | Observe toggle | Moon icon or dark indicator |

---

### TC-THM-002: Switch to Light Theme
**Priority:** P0 | **Type:** Integration

**Precondition:** App in dark theme

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Click theme toggle | Toggle animates |
| 2 | Observe background | Changes to light color |
| 3 | Observe text | Changes to dark color |
| 4 | Observe toggle | Sun icon or light indicator |

---

### TC-THM-003: Switch Back to Dark Theme
**Priority:** P0 | **Type:** Integration

**Precondition:** App in light theme

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Click theme toggle | Toggle animates |
| 2 | Observe background | Changes to dark color |
| 3 | Observe text | Changes to light color |

---

### TC-THM-004: Theme Persists After Reload
**Priority:** P0 | **Type:** E2E

**Precondition:** Switch to light theme

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Note current theme | Light theme |
| 2 | Refresh page (F5) | Page reloads |
| 3 | Observe theme | Still light theme |
| 4 | Observe toggle | Correct state |

---

### TC-THM-005: Smooth Theme Transition
**Priority:** P1 | **Type:** Visual

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Click theme toggle | Transition begins |
| 2 | Observe transition | Colors fade smoothly (~0.3s) |
| 3 | Observe for flash | No flash of unstyled content |

---

### TC-THM-006: All Elements Update on Theme Change
**Priority:** P1 | **Type:** Visual

**Precondition:** App in dark theme

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Click theme toggle | Switch to light |
| 2 | Check timer display | Colors updated |
| 3 | Check breathing circle | Colors updated |
| 4 | Check buttons | Colors updated |
| 5 | Check progress circle | Gradient updated |

---

## PWA Test Cases

### TC-PWA-001: Service Worker Registers
**Priority:** P0 | **Type:** Manual

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Open app in Chrome | App loads |
| 2 | Open DevTools > Application | Service Workers tab |
| 3 | Observe | Service worker is registered |

---

### TC-PWA-002: App is Installable
**Priority:** P0 | **Type:** Manual

**Precondition:** Using supported browser (Chrome)

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Visit app | App loads |
| 2 | Look for install prompt | Browser shows install option |
| 3 | Check address bar | Install icon available |

---

### TC-PWA-003: Install PWA
**Priority:** P0 | **Type:** Manual

**Precondition:** Install prompt available

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Click install prompt | Installation dialog appears |
| 2 | Confirm install | App installs |
| 3 | Check home screen/apps | Serenity icon present |

---

### TC-PWA-004: Launch Installed PWA
**Priority:** P0 | **Type:** Manual

**Precondition:** PWA installed

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Click app icon | App launches |
| 2 | Observe window | No browser chrome (standalone) |
| 3 | Observe status bar | Matches theme color |

---

### TC-PWA-005: Offline - App Loads
**Priority:** P0 | **Type:** Manual

**Precondition:** App visited before (cached)

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Enable airplane mode / disable network | Network off |
| 2 | Open/reload app | App loads completely |
| 3 | Observe | No error page |

---

### TC-PWA-006: Offline - Timer Works
**Priority:** P0 | **Type:** Manual

**Precondition:** App loaded offline

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Select preset | Preset activates |
| 2 | Click Start | Timer counts down |
| 3 | Click Pause | Timer pauses |
| 4 | Click Reset | Timer resets |

---

### TC-PWA-007: Offline - Breathing Guide Works
**Priority:** P0 | **Type:** Manual

**Precondition:** App loaded offline

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Start timer | Breathing activates |
| 2 | Observe animation | Circle animates |
| 3 | Observe phases | Phases cycle correctly |

---

### TC-PWA-008: Lighthouse PWA Score
**Priority:** P1 | **Type:** Automated

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Run Lighthouse audit | Audit completes |
| 2 | Check PWA score | Score is 90+ |
| 3 | Check installable | Passes criteria |
| 4 | Check offline | Passes criteria |

---

## Responsive Design Test Cases

### TC-RES-001: Mobile Portrait View (< 480px)
**Priority:** P0 | **Type:** Visual

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Set viewport to 375px wide | Mobile view |
| 2 | Observe layout | All elements fit |
| 3 | Observe text | Readable without zoom |
| 4 | Observe buttons | Minimum 44px tap targets |
| 5 | Observe timer circle | Appropriately sized |

---

### TC-RES-002: Tablet View (768px - 1024px)
**Priority:** P1 | **Type:** Visual

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Set viewport to 768px | Tablet view |
| 2 | Observe layout | Uses available space |
| 3 | Observe proportions | Elements properly sized |

---

### TC-RES-003: Desktop View (> 1024px)
**Priority:** P1 | **Type:** Visual

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Set viewport to 1440px | Desktop view |
| 2 | Observe layout | Content is centered |
| 3 | Observe max-width | Content doesn't stretch full width |

---

## Accessibility Test Cases

### TC-A11Y-001: Keyboard Navigation - Tab Order
**Priority:** P0 | **Type:** Manual

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Press Tab repeatedly | Focus moves through interactive elements |
| 2 | Observe order | Logical tab order |
| 3 | Observe focus indicator | Clearly visible on each element |

---

### TC-A11Y-002: Keyboard Navigation - Activate Buttons
**Priority:** P0 | **Type:** Manual

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Tab to Start button | Button focused |
| 2 | Press Enter or Space | Timer starts |
| 3 | Tab to preset button | Button focused |
| 4 | Press Enter or Space | Preset selected |

---

### TC-A11Y-003: Screen Reader - Button Labels
**Priority:** P0 | **Type:** Manual

**Precondition:** Screen reader enabled (NVDA/VoiceOver)

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to Start button | "Start" or "Start meditation" announced |
| 2 | Navigate to preset buttons | Duration announced |
| 3 | Navigate to theme toggle | "Toggle theme" or similar announced |

---

### TC-A11Y-004: Screen Reader - Timer Announcements
**Priority:** P1 | **Type:** Manual

**Precondition:** Screen reader enabled

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to timer | Time value announced |
| 2 | Start timer | State change communicated |
| 3 | Wait for completion | Completion announced |

---

### TC-A11Y-005: Color Contrast Check
**Priority:** P0 | **Type:** Automated

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Run axe-core or Lighthouse | Audit completes |
| 2 | Check contrast results | All text passes WCAG AA (4.5:1) |

---

### TC-A11Y-006: Reduced Motion Preference
**Priority:** P1 | **Type:** Manual

**Precondition:** Enable prefers-reduced-motion in OS

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Load app | App loads |
| 2 | Start timer | Timer works |
| 3 | Observe breathing circle | Animations minimal or instant |
| 4 | Verify functionality | All features still work |

---

## Cross-Browser Test Cases

### TC-XBR-001: Chrome Compatibility
**Priority:** P0 | **Type:** E2E

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Open in Chrome | App loads |
| 2 | Test timer | Works correctly |
| 3 | Test breathing | Animates correctly |
| 4 | Test sounds | Play correctly |
| 5 | Test theme | Toggles correctly |

---

### TC-XBR-002: Firefox Compatibility
**Priority:** P0 | **Type:** E2E

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Open in Firefox | App loads |
| 2 | Test all features | Work correctly |
| 3 | Test audio | Web Audio API works |

---

### TC-XBR-003: Safari Compatibility
**Priority:** P0 | **Type:** E2E

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Open in Safari | App loads |
| 2 | Test all features | Work correctly |
| 3 | Test audio | May require user interaction first |

---

### TC-XBR-004: Mobile Safari (iOS)
**Priority:** P0 | **Type:** E2E

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Open on iPhone | App loads |
| 2 | Test touch interactions | All buttons respond |
| 3 | Test audio | Plays after user interaction |
| 4 | Test PWA install | Add to Home Screen works |

---

### TC-XBR-005: Chrome Mobile (Android)
**Priority:** P0 | **Type:** E2E

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Open on Android | App loads |
| 2 | Test all features | Work correctly |
| 3 | Test PWA install | Install prompt appears |

---

## Test Results Summary Template

```markdown
## Test Execution Report

**Date:** YYYY-MM-DD
**Tester:** [Name]
**Environment:** [Browser/OS/Device]

### Summary

| Category | Total | Pass | Fail | Blocked | Skip |
|----------|-------|------|------|---------|------|
| Timer | 10 | | | | |
| Breathing | 10 | | | | |
| Sounds | 9 | | | | |
| Theme | 6 | | | | |
| PWA | 8 | | | | |
| Responsive | 3 | | | | |
| Accessibility | 6 | | | | |
| Cross-Browser | 5 | | | | |
| **TOTAL** | **57** | | | | |

### Failed Tests

| TC-ID | Issue Description | Bug ID |
|-------|-------------------|--------|
| | | |

### Notes

[Any observations or recommendations]
```

---

*Test cases should be updated when features change or new functionality is added.*
