import { useState } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import { useTimer } from './hooks/useTimer'
import { ProgressCircle } from './components/ProgressCircle'
import { TimerControls } from './components/TimerControls'
import { BreathingGuide } from './components/BreathingGuide'
import { AmbientSound } from './components/AmbientSound'
import { ThemeToggle } from './components/ThemeToggle'
import './App.css'

function MeditationApp() {
  const [showBreathing, setShowBreathing] = useState(true)
  const timer = useTimer(5)

  return (
    <div className="app">
      <ThemeToggle />

      <header className="app-header">
        <div className="logo">
          <span className="logo-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
              <path d="M12 2a10 10 0 0 0-6.88 17.23" strokeDasharray="4 4" />
            </svg>
          </span>
          <h1>Serenity</h1>
        </div>
        <p className="tagline">Find your inner peace</p>
      </header>

      <main className="app-main">
        <section className="timer-section">
          <ProgressCircle
            progress={timer.progress}
            time={timer.formatTime()}
            isComplete={timer.isComplete}
          />

          <TimerControls
            isRunning={timer.isRunning}
            duration={timer.duration}
            onStart={timer.start}
            onPause={timer.pause}
            onReset={timer.reset}
            onPresetSelect={timer.setPreset}
          />
        </section>

        <section className="features-section">
          <div className="feature-toggle">
            <button
              className={`feature-btn ${showBreathing ? 'active' : ''}`}
              onClick={() => setShowBreathing(true)}
            >
              Breathing
            </button>
            <button
              className={`feature-btn ${!showBreathing ? 'active' : ''}`}
              onClick={() => setShowBreathing(false)}
            >
              Sounds
            </button>
          </div>

          <div className="feature-content">
            {showBreathing ? (
              <BreathingGuide isActive={timer.isRunning} />
            ) : (
              <AmbientSound />
            )}
          </div>
        </section>
      </main>

      <footer className="app-footer">
        <p>Take a moment. Breathe. Be present.</p>
      </footer>

      <div className="background-decoration">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
      </div>
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <MeditationApp />
    </ThemeProvider>
  )
}

export default App
