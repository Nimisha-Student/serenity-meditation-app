import { useState, useEffect } from 'react'
import './BreathingGuide.css'

const BREATH_PHASES = [
  { name: 'Breathe In', duration: 4000 },
  { name: 'Hold', duration: 4000 },
  { name: 'Breathe Out', duration: 4000 },
  { name: 'Hold', duration: 2000 },
]

export function BreathingGuide({ isActive }) {
  const [phase, setPhase] = useState(0)
  const [isPaused, setIsPaused] = useState(!isActive)

  useEffect(() => {
    setIsPaused(!isActive)
  }, [isActive])

  useEffect(() => {
    if (isPaused) return

    const timer = setTimeout(() => {
      setPhase(prev => (prev + 1) % BREATH_PHASES.length)
    }, BREATH_PHASES[phase].duration)

    return () => clearTimeout(timer)
  }, [phase, isPaused])

  const currentPhase = BREATH_PHASES[phase]
  const isInhaling = phase === 0
  const isExhaling = phase === 2

  return (
    <div className={`breathing-guide ${isPaused ? 'paused' : ''}`}>
      <div className="breathing-container">
        <div
          className={`breathing-circle ${isInhaling ? 'inhale' : ''} ${isExhaling ? 'exhale' : ''}`}
          style={{
            animationDuration: `${currentPhase.duration}ms`,
            animationPlayState: isPaused ? 'paused' : 'running'
          }}
        >
          <div className="breathing-inner">
            <div className="breathing-core"></div>
          </div>
        </div>

        <div className="breathing-rings">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className={`ring ring-${i + 1}`}
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>

      <div className="breathing-text">
        <span className="phase-name">{currentPhase.name}</span>
        <div className="phase-dots">
          {BREATH_PHASES.map((_, i) => (
            <span key={i} className={`dot ${i === phase ? 'active' : ''}`} />
          ))}
        </div>
      </div>
    </div>
  )
}
