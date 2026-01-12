# Acceptance Criteria
## Serenity - Meditation App

**Last Updated:** January 2026

---

## Format

Each feature uses the **Given-When-Then** (GWT) format:

```gherkin
Feature: [Feature Name]

Scenario: [Scenario Description]
  Given [initial context/preconditions]
  When [action/trigger]
  Then [expected outcome]
```

---

## Feature: Meditation Timer

### Scenario: Display initial timer state
```gherkin
Given the user opens the app
When the page loads
Then the timer displays "05:00"
And the progress circle shows 0% completion
And the "5 min" preset button is highlighted
And the "Start" button is visible
```

### Scenario: Select different timer preset
```gherkin
Given the timer is not running
When the user clicks the "10 min" preset button
Then the timer displays "10:00"
And the "10 min" button becomes highlighted
And the "5 min" button is no longer highlighted
And the progress circle resets to 0%
```

### Scenario: Start timer countdown
```gherkin
Given the timer shows "05:00"
And the timer is not running
When the user clicks "Start"
Then the timer begins counting down
And the "Start" button changes to "Pause"
And the progress circle begins filling
And the breathing guide becomes active
And the preset buttons become disabled
```

### Scenario: Pause running timer
```gherkin
Given the timer is running
And the timer shows "03:45"
When the user clicks "Pause"
Then the countdown stops
And the timer still shows "03:45"
And the "Pause" button changes to "Start"
And the breathing guide pauses
```

### Scenario: Resume paused timer
```gherkin
Given the timer is paused at "03:45"
When the user clicks "Start"
Then the countdown resumes from "03:45"
And the button changes back to "Pause"
And the breathing guide resumes
```

### Scenario: Reset timer
```gherkin
Given the timer is running or paused
When the user clicks "Reset"
Then the timer returns to the selected preset duration
And the countdown stops
And the progress circle resets to 0%
And the breathing guide stops
And the "Start" button is visible
```

### Scenario: Timer completion
```gherkin
Given the timer is running
When the timer reaches "00:00"
Then the timer stops automatically
And "Complete" text is displayed
And the progress circle shows 100%
And the time display changes color (success state)
And the breathing guide stops
```

---

## Feature: Breathing Guide

### Scenario: Breathing guide initial state
```gherkin
Given the user opens the app
When the breathing tab is selected
Then the breathing circle is visible but not animating
And the text shows "Breathe In"
And the phase indicator dots show first dot active
And the circle appears at resting size
```

### Scenario: Breathing guide activates with timer
```gherkin
Given the timer is not running
When the user starts the timer
Then the breathing circle begins animating
And the text updates to match the current phase
And phase transition sounds play (if not muted)
```

### Scenario: Inhale phase
```gherkin
Given the breathing guide is active
When the phase is "Breathe In"
Then the circle expands over 5 seconds
And the text shows "Breathe In"
And the count displays 1, 2, 3, 4 sequentially
And a singing bowl tone plays at the start
And soft chimes play with each count
```

### Scenario: Hold phase
```gherkin
Given the breathing guide is active
And the inhale phase just completed
When the hold phase begins
Then the circle maintains expanded size
And the text changes to "Hold"
And the count displays 1, 2, 3, 4 sequentially
And a different tone plays at the start
```

### Scenario: Exhale phase
```gherkin
Given the breathing guide is active
And the first hold phase completed
When the exhale phase begins
Then the circle contracts over 5 seconds
And the text shows "Breathe Out"
And the count displays 1, 2, 3, 4 sequentially
```

### Scenario: Mute breathing sounds
```gherkin
Given the breathing guide is active
And sounds are playing
When the user clicks the sound toggle button
Then all breathing sounds stop immediately
And the button changes to muted state
And the visual animations continue unchanged
```

### Scenario: Unmute breathing sounds
```gherkin
Given the breathing sounds are muted
When the user clicks the sound toggle button
Then breathing sounds resume
And the button changes to unmuted state
```

---

## Feature: Ambient Sounds

### Scenario: View sound options
```gherkin
Given the user is on the app
When they click the "Sounds" tab
Then 4 sound options are displayed (Rain, Forest, Ocean, Fire)
And each option shows an icon and name
And no sound is playing initially
```

### Scenario: Play ambient sound
```gherkin
Given no sound is playing
When the user clicks on "Rain"
Then the rain sound begins playing
And the Rain button shows active/playing state
And the sound wave animation appears
And the volume slider appears
```

### Scenario: Stop ambient sound
```gherkin
Given rain sound is playing
When the user clicks on "Rain" again
Then the rain sound stops
And the button returns to inactive state
And the playing animation stops
```

### Scenario: Switch ambient sounds
```gherkin
Given rain sound is playing
When the user clicks on "Ocean"
Then the rain sound stops
And the ocean sound begins playing
And only Ocean button shows active state
```

### Scenario: Adjust volume
```gherkin
Given ocean sound is playing at 50% volume
When the user drags the volume slider to 25%
Then the sound volume decreases in real-time
And the slider position updates to 25%
```

### Scenario: Mute via volume slider
```gherkin
Given a sound is playing
When the user drags the volume slider to 0%
Then the sound becomes inaudible
And the volume icon changes to muted state
```

---

## Feature: Theme Toggle

### Scenario: Default theme is dark
```gherkin
Given the user opens the app for the first time
And no theme preference is stored
When the app loads
Then dark theme is applied
And the toggle shows moon icon on the thumb
```

### Scenario: Switch to light theme
```gherkin
Given the app is in dark theme
When the user clicks the theme toggle
Then the app transitions to light theme
And background changes to light colors
And text changes to dark colors
And the toggle thumb moves to sun position
```

### Scenario: Theme persists after reload
```gherkin
Given the user selected light theme
When they close and reopen the app
Then light theme is still applied
And the toggle shows the correct state
```

### Scenario: Smooth theme transition
```gherkin
Given the app is in dark theme
When the user clicks the theme toggle
Then colors transition smoothly over 0.3 seconds
And there is no flash of unstyled content
```

---

## Feature: PWA Installation

### Scenario: App is installable
```gherkin
Given the user visits the app in a supported browser
And the PWA criteria are met
When the browser detects the manifest
Then an install prompt becomes available
And the app can be added to home screen
```

### Scenario: Installed app launches correctly
```gherkin
Given the user has installed the PWA
When they tap the app icon on home screen
Then the app opens in standalone mode
And no browser chrome is visible
And the status bar matches the theme color
```

### Scenario: Offline functionality
```gherkin
Given the user has opened the app before
And the service worker has cached assets
When the user loses internet connection
Then the app still loads completely
And the timer functions normally
And the breathing guide works
And ambient sounds play (if cached)
```

---

## Feature: Responsive Design

### Scenario: Mobile portrait view
```gherkin
Given the user opens the app on mobile (< 480px width)
When the page renders
Then all elements fit within the viewport
And text is readable without zooming
And buttons are large enough to tap (44px minimum)
And the timer circle is appropriately sized
```

### Scenario: Tablet view
```gherkin
Given the user opens the app on tablet (768px - 1024px)
When the page renders
Then layout adjusts to use available space
And elements maintain proper proportions
```

### Scenario: Desktop view
```gherkin
Given the user opens the app on desktop (> 1024px)
When the page renders
Then content is centered with max-width
And excessive white space is avoided
```

---

## Feature: Accessibility

### Scenario: Keyboard navigation
```gherkin
Given the user is using keyboard only
When they press Tab
Then focus moves through interactive elements in logical order
And focus indicators are clearly visible
```

### Scenario: Screen reader support
```gherkin
Given the user is using a screen reader
When they navigate the app
Then all buttons have descriptive labels
And timer values are announced
And state changes are communicated
```

### Scenario: Reduced motion preference
```gherkin
Given the user has prefers-reduced-motion enabled
When the app loads
Then animations are minimized or disabled
And essential functionality remains intact
```

---

## Definition of Done (DoD)

A feature is considered **Done** when:

- [ ] All acceptance criteria pass
- [ ] Unit tests written and passing
- [ ] Code reviewed and approved
- [ ] No console errors or warnings
- [ ] Works in all supported browsers
- [ ] Responsive on mobile, tablet, desktop
- [ ] Accessibility audit passes
- [ ] Documentation updated
- [ ] Deployed to staging environment

---

*Acceptance criteria should be reviewed with stakeholders before development begins.*
