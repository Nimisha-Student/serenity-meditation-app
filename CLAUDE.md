# Serenity - Meditation App

A beautiful React meditation app with timer, breathing exercises, ambient sounds, and dark mode support. PWA-installable for offline use.

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173 in your browser
```

## Available Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run test` | Run tests in watch mode |
| `npm run test:run` | Run all tests once |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run lint` | Run ESLint |

## Project Structure

```
src/
├── components/           # React components
│   ├── AmbientSound.jsx  # Ambient sound player with volume control
│   ├── BreathingGuide.jsx # Animated breathing guide
│   ├── ProgressCircle.jsx # SVG progress circle
│   ├── ThemeToggle.jsx   # Dark/light mode toggle
│   └── TimerControls.jsx # Timer presets and play/pause
├── context/
│   └── ThemeContext.jsx  # Theme state management
├── hooks/
│   └── useTimer.js       # Timer logic custom hook
├── __tests__/            # Test files
├── App.jsx               # Main app component
├── App.css               # App-specific styles
└── index.css             # Global styles and theme variables
```

## Features

- **Timer**: 5, 10, and 20-minute presets with visual progress circle
- **Breathing Guide**: 4-4-4-2 breathing pattern animation (inhale-hold-exhale-hold)
- **Ambient Sounds**: Rain, Forest, Ocean, and Fire sounds from freesound.org
- **Dark Mode**: Toggle between dark and light themes (persisted to localStorage)
- **PWA**: Installable as a Progressive Web App for offline use

## Tech Stack

- React 19
- Vite 7
- Vitest (testing)
- vite-plugin-pwa (PWA support)

## PWA Installation

The app is PWA-ready. In production, users can install it:
- Chrome/Edge: Click the install icon in the address bar
- Safari iOS: Tap Share → Add to Home Screen
- Android: Tap the browser menu → Add to Home Screen

## Notes

- Audio files are streamed from freesound.org (requires internet for first load)
- Theme preference is saved to localStorage
- The breathing guide syncs with the timer (active when timer is running)
