import { useState, useEffect, useRef, useCallback } from 'react'
import './BreathingGuide.css'

const BREATH_PHASES = [
  { name: 'Breathe In', duration: 5000, counts: 4, note: 261.63 },  // C4
  { name: 'Hold', duration: 5000, counts: 4, note: 329.63 },        // E4
  { name: 'Breathe Out', duration: 5000, counts: 4, note: 293.66 }, // D4
  { name: 'Hold', duration: 3000, counts: 2, note: 349.23 },        // F4
]

// Singing bowl frequencies for counts (pentatonic scale - very meditative)
const COUNT_NOTES = {
  1: 523.25,  // C5
  2: 587.33,  // D5
  3: 659.25,  // E5
  4: 783.99,  // G5
}

// Ambient sound URL
const AMBIENT_URL = 'https://www.soundjay.com/nature/sounds/waterfall-1.mp3'

export function BreathingGuide({ isActive }) {
  const [phase, setPhase] = useState(0)
  const [count, setCount] = useState(0)
  const [isPaused, setIsPaused] = useState(!isActive)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const audioContextRef = useRef(null)
  const countIntervalRef = useRef(null)
  const timeoutsRef = useRef([])
  const ambientAudioRef = useRef(null)

  // Initialize audio context and ambient audio
  useEffect(() => {
    ambientAudioRef.current = new Audio(AMBIENT_URL)
    ambientAudioRef.current.loop = true
    ambientAudioRef.current.volume = 0.15

    return () => {
      if (ambientAudioRef.current) {
        ambientAudioRef.current.pause()
        ambientAudioRef.current = null
      }
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }
  }, [])

  // Create singing bowl / bell sound
  const playSingingBowl = useCallback((frequency, duration = 2000, volume = 0.3) => {
    if (!soundEnabled) return

    try {
      if (!audioContextRef.current || audioContextRef.current.state === 'closed') {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)()
      }

      const ctx = audioContextRef.current
      if (ctx.state === 'suspended') {
        ctx.resume()
      }

      const now = ctx.currentTime

      // Main tone
      const osc1 = ctx.createOscillator()
      const gain1 = ctx.createGain()
      osc1.type = 'sine'
      osc1.frequency.setValueAtTime(frequency, now)

      // Harmonic overtone (octave up, quieter)
      const osc2 = ctx.createOscillator()
      const gain2 = ctx.createGain()
      osc2.type = 'sine'
      osc2.frequency.setValueAtTime(frequency * 2, now)

      // Third harmonic (fifth, very quiet)
      const osc3 = ctx.createOscillator()
      const gain3 = ctx.createGain()
      osc3.type = 'sine'
      osc3.frequency.setValueAtTime(frequency * 3, now)

      // Envelope for singing bowl sound (slow attack, long decay)
      const attackTime = 0.1
      const decayTime = duration / 1000

      gain1.gain.setValueAtTime(0, now)
      gain1.gain.linearRampToValueAtTime(volume, now + attackTime)
      gain1.gain.exponentialRampToValueAtTime(0.001, now + decayTime)

      gain2.gain.setValueAtTime(0, now)
      gain2.gain.linearRampToValueAtTime(volume * 0.3, now + attackTime)
      gain2.gain.exponentialRampToValueAtTime(0.001, now + decayTime)

      gain3.gain.setValueAtTime(0, now)
      gain3.gain.linearRampToValueAtTime(volume * 0.1, now + attackTime)
      gain3.gain.exponentialRampToValueAtTime(0.001, now + decayTime)

      // Connect
      osc1.connect(gain1).connect(ctx.destination)
      osc2.connect(gain2).connect(ctx.destination)
      osc3.connect(gain3).connect(ctx.destination)

      // Start and stop
      osc1.start(now)
      osc2.start(now)
      osc3.start(now)
      osc1.stop(now + decayTime)
      osc2.stop(now + decayTime)
      osc3.stop(now + decayTime)

    } catch (e) {
      console.log('Audio not supported')
    }
  }, [soundEnabled])

  // Play soft chime for counts
  const playCountChime = useCallback((countNum) => {
    const note = COUNT_NOTES[countNum] || COUNT_NOTES[1]
    playSingingBowl(note, 800, 0.15)
  }, [playSingingBowl])

  // Control ambient music
  useEffect(() => {
    if (!ambientAudioRef.current) return

    if (isActive && soundEnabled && !isPaused) {
      ambientAudioRef.current.volume = 0
      ambientAudioRef.current.play().catch(() => {})

      let vol = 0
      const fadeIn = setInterval(() => {
        vol += 0.01
        if (vol >= 0.15) {
          clearInterval(fadeIn)
          vol = 0.15
        }
        if (ambientAudioRef.current) {
          ambientAudioRef.current.volume = vol
        }
      }, 50)
    } else {
      if (ambientAudioRef.current.volume > 0) {
        let vol = ambientAudioRef.current.volume
        const fadeOut = setInterval(() => {
          vol -= 0.01
          if (vol <= 0) {
            clearInterval(fadeOut)
            ambientAudioRef.current?.pause()
          }
          if (ambientAudioRef.current) {
            ambientAudioRef.current.volume = Math.max(0, vol)
          }
        }, 50)
      }
    }
  }, [isActive, soundEnabled, isPaused])

  const clearAllTimeouts = useCallback(() => {
    timeoutsRef.current.forEach(t => clearTimeout(t))
    timeoutsRef.current = []
  }, [])

  const stopTimers = useCallback(() => {
    if (countIntervalRef.current) {
      clearInterval(countIntervalRef.current)
      countIntervalRef.current = null
    }
    clearAllTimeouts()
  }, [clearAllTimeouts])

  const startCounting = useCallback((totalCounts, duration, phaseNote) => {
    stopTimers()

    // Play singing bowl for phase start
    playSingingBowl(phaseNote, 3000, 0.25)
    setCount(1)

    const countInterval = duration / totalCounts
    let currentCount = 1

    // Play first count chime after delay
    const firstChimeTimeout = setTimeout(() => {
      playCountChime(1)
    }, 800)
    timeoutsRef.current.push(firstChimeTimeout)

    countIntervalRef.current = setInterval(() => {
      currentCount++
      if (currentCount <= totalCounts) {
        setCount(currentCount)
        playCountChime(currentCount)
      }
    }, countInterval)

  }, [playSingingBowl, playCountChime, stopTimers])

  useEffect(() => {
    setIsPaused(!isActive)
    if (!isActive) {
      stopTimers()
      setCount(0)
    }
  }, [isActive, stopTimers])

  useEffect(() => {
    if (isPaused) {
      stopTimers()
      return
    }

    const currentPhase = BREATH_PHASES[phase]
    startCounting(currentPhase.counts, currentPhase.duration, currentPhase.note)

    const timer = setTimeout(() => {
      setPhase(prev => (prev + 1) % BREATH_PHASES.length)
      setCount(0)
    }, currentPhase.duration)

    timeoutsRef.current.push(timer)

    return () => {
      if (countIntervalRef.current) {
        clearInterval(countIntervalRef.current)
      }
    }
  }, [phase, isPaused, startCounting, stopTimers])

  useEffect(() => {
    return () => {
      stopTimers()
      if (ambientAudioRef.current) {
        ambientAudioRef.current.pause()
      }
    }
  }, [stopTimers])

  const currentPhase = BREATH_PHASES[phase]
  const isInhaling = phase === 0
  const isExhaling = phase === 2

  const toggleSound = () => {
    if (soundEnabled) {
      if (ambientAudioRef.current) {
        ambientAudioRef.current.pause()
        ambientAudioRef.current.volume = 0
      }
    }
    setSoundEnabled(prev => !prev)
  }

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
            <div className="breathing-core">
              {!isPaused && count > 0 && (
                <span className="breath-count">{count}</span>
              )}
            </div>
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

      <button
        className={`sound-toggle ${soundEnabled ? 'enabled' : 'disabled'}`}
        onClick={toggleSound}
        aria-label={soundEnabled ? 'Mute sounds' : 'Enable sounds'}
      >
        {soundEnabled ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.796 8.796 0 0021 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06a8.99 8.99 0 003.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
          </svg>
        )}
      </button>
    </div>
  )
}
