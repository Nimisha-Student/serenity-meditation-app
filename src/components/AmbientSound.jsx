import { useState, useRef, useEffect, useCallback } from 'react'
import './AmbientSound.css'

const SOUNDS = [
  { id: 'rain', name: 'Rain', icon: '🌧️' },
  { id: 'forest', name: 'Forest', icon: '🌲' },
  { id: 'ocean', name: 'Ocean', icon: '🌊' },
  { id: 'fire', name: 'Fire', icon: '🔥' }
]

// Create noise buffer for ambient sounds
function createNoiseBuffer(ctx, duration = 2) {
  const sampleRate = ctx.sampleRate
  const length = sampleRate * duration
  const buffer = ctx.createBuffer(2, length, sampleRate)

  for (let channel = 0; channel < 2; channel++) {
    const data = buffer.getChannelData(channel)
    for (let i = 0; i < length; i++) {
      data[i] = Math.random() * 2 - 1
    }
  }
  return buffer
}

// Create brown noise (smoother, lower frequency)
function createBrownNoiseBuffer(ctx, duration = 2) {
  const sampleRate = ctx.sampleRate
  const length = sampleRate * duration
  const buffer = ctx.createBuffer(2, length, sampleRate)

  for (let channel = 0; channel < 2; channel++) {
    const data = buffer.getChannelData(channel)
    let lastOut = 0
    for (let i = 0; i < length; i++) {
      const white = Math.random() * 2 - 1
      data[i] = (lastOut + (0.02 * white)) / 1.02
      lastOut = data[i]
      data[i] *= 3.5 // Normalize
    }
  }
  return buffer
}

export function AmbientSound() {
  const [activeSound, setActiveSound] = useState(null)
  const [volume, setVolume] = useState(0.5)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioContextRef = useRef(null)
  const nodesRef = useRef({ source: null, gain: null, filters: [] })

  // Initialize audio context
  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current || audioContextRef.current.state === 'closed') {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)()
    }
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume()
    }
    return audioContextRef.current
  }, [])

  // Stop current sound
  const stopSound = useCallback(() => {
    if (nodesRef.current.source) {
      try {
        nodesRef.current.source.stop()
      } catch (e) {
        // Already stopped
      }
      nodesRef.current.source = null
    }
    if (nodesRef.current.gain) {
      nodesRef.current.gain.disconnect()
      nodesRef.current.gain = null
    }
    nodesRef.current.filters.forEach(f => f.disconnect())
    nodesRef.current.filters = []
  }, [])

  // Create rain sound (filtered brown noise)
  const createRainSound = useCallback((ctx, gainNode) => {
    const buffer = createBrownNoiseBuffer(ctx, 2)
    const source = ctx.createBufferSource()
    source.buffer = buffer
    source.loop = true

    // Highpass filter for rain texture
    const highpass = ctx.createBiquadFilter()
    highpass.type = 'highpass'
    highpass.frequency.value = 400

    // Lowpass for smoothness
    const lowpass = ctx.createBiquadFilter()
    lowpass.type = 'lowpass'
    lowpass.frequency.value = 8000

    source.connect(highpass)
    highpass.connect(lowpass)
    lowpass.connect(gainNode)

    nodesRef.current.filters = [highpass, lowpass]
    return source
  }, [])

  // Create forest sound (layered filtered noise)
  const createForestSound = useCallback((ctx, gainNode) => {
    const buffer = createNoiseBuffer(ctx, 2)
    const source = ctx.createBufferSource()
    source.buffer = buffer
    source.loop = true

    // Bandpass for wind-like sound
    const bandpass = ctx.createBiquadFilter()
    bandpass.type = 'bandpass'
    bandpass.frequency.value = 500
    bandpass.Q.value = 0.5

    // Lowpass for softness
    const lowpass = ctx.createBiquadFilter()
    lowpass.type = 'lowpass'
    lowpass.frequency.value = 2000

    source.connect(bandpass)
    bandpass.connect(lowpass)
    lowpass.connect(gainNode)

    nodesRef.current.filters = [bandpass, lowpass]
    return source
  }, [])

  // Create ocean sound (modulated brown noise)
  const createOceanSound = useCallback((ctx, gainNode) => {
    const buffer = createBrownNoiseBuffer(ctx, 4)
    const source = ctx.createBufferSource()
    source.buffer = buffer
    source.loop = true

    // LFO for wave modulation
    const lfo = ctx.createOscillator()
    const lfoGain = ctx.createGain()
    lfo.frequency.value = 0.1 // Slow wave
    lfoGain.gain.value = 0.3

    // Lowpass for deep ocean sound
    const lowpass = ctx.createBiquadFilter()
    lowpass.type = 'lowpass'
    lowpass.frequency.value = 500

    // Connect LFO to modulate gain
    lfo.connect(lfoGain)
    lfoGain.connect(gainNode.gain)

    source.connect(lowpass)
    lowpass.connect(gainNode)

    lfo.start()
    nodesRef.current.filters = [lowpass, lfo, lfoGain]
    return source
  }, [])

  // Create fire sound (crackling noise)
  const createFireSound = useCallback((ctx, gainNode) => {
    const buffer = createNoiseBuffer(ctx, 2)
    const source = ctx.createBufferSource()
    source.buffer = buffer
    source.loop = true

    // Bandpass for crackling texture
    const bandpass = ctx.createBiquadFilter()
    bandpass.type = 'bandpass'
    bandpass.frequency.value = 1000
    bandpass.Q.value = 2

    // Highpass to remove low rumble
    const highpass = ctx.createBiquadFilter()
    highpass.type = 'highpass'
    highpass.frequency.value = 200

    source.connect(bandpass)
    bandpass.connect(highpass)
    highpass.connect(gainNode)

    nodesRef.current.filters = [bandpass, highpass]
    return source
  }, [])

  // Play sound based on type
  const playSound = useCallback((soundId) => {
    stopSound()

    const ctx = getAudioContext()
    const gainNode = ctx.createGain()
    gainNode.gain.value = volume * 0.5
    gainNode.connect(ctx.destination)
    nodesRef.current.gain = gainNode

    let source
    switch (soundId) {
      case 'rain':
        source = createRainSound(ctx, gainNode)
        break
      case 'forest':
        source = createForestSound(ctx, gainNode)
        break
      case 'ocean':
        source = createOceanSound(ctx, gainNode)
        break
      case 'fire':
        source = createFireSound(ctx, gainNode)
        break
      default:
        return
    }

    source.start()
    nodesRef.current.source = source
  }, [volume, stopSound, getAudioContext, createRainSound, createForestSound, createOceanSound, createFireSound])

  // Update volume
  useEffect(() => {
    if (nodesRef.current.gain) {
      nodesRef.current.gain.gain.value = volume * 0.5
    }
  }, [volume])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopSound()
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }
  }, [stopSound])

  const handleSoundSelect = (sound) => {
    if (activeSound?.id === sound.id) {
      if (isPlaying) {
        stopSound()
        setIsPlaying(false)
      } else {
        playSound(sound.id)
        setIsPlaying(true)
      }
    } else {
      setActiveSound(sound)
      playSound(sound.id)
      setIsPlaying(true)
    }
  }

  return (
    <div className="ambient-sound">
      <h3 className="ambient-title">Ambient Sounds</h3>

      <div className="sound-grid">
        {SOUNDS.map((sound) => (
          <button
            key={sound.id}
            className={`sound-btn ${activeSound?.id === sound.id ? 'active' : ''} ${activeSound?.id === sound.id && isPlaying ? 'playing' : ''}`}
            onClick={() => handleSoundSelect(sound)}
            aria-label={`${sound.name} sound`}
          >
            <span className="sound-icon">{sound.icon}</span>
            <span className="sound-name">{sound.name}</span>
            {activeSound?.id === sound.id && isPlaying && (
              <span className="sound-waves">
                <span className="wave"></span>
                <span className="wave"></span>
                <span className="wave"></span>
              </span>
            )}
          </button>
        ))}
      </div>

      {activeSound && (
        <div className="volume-control">
          <VolumeIcon volume={volume} />
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="volume-slider"
            aria-label="Volume"
          />
        </div>
      )}
    </div>
  )
}

function VolumeIcon({ volume }) {
  if (volume === 0) {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.796 8.796 0 0021 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06a8.99 8.99 0 003.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
      </svg>
    )
  }
  if (volume < 0.5) {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z"/>
      </svg>
    )
  }
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
    </svg>
  )
}
