import { useState, useRef, useEffect } from 'react'
import './AmbientSound.css'

const SOUNDS = [
  {
    id: 'rain',
    name: 'Rain',
    icon: '🌧️',
    url: 'https://www.soundjay.com/nature/sounds/rain-01.mp3'
  },
  {
    id: 'forest',
    name: 'Forest',
    icon: '🌲',
    url: 'https://www.soundjay.com/nature/sounds/forest-1.mp3'
  },
  {
    id: 'ocean',
    name: 'Ocean',
    icon: '🌊',
    url: 'https://www.soundjay.com/nature/sounds/ocean-wave-1.mp3'
  },
  {
    id: 'fire',
    name: 'Fire',
    icon: '🔥',
    url: 'https://www.soundjay.com/nature/sounds/fire-1.mp3'
  }
]

export function AmbientSound() {
  const [activeSound, setActiveSound] = useState(null)
  const [volume, setVolume] = useState(0.5)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  const handleSoundSelect = (sound) => {
    if (activeSound?.id === sound.id) {
      if (isPlaying) {
        audioRef.current?.pause()
        setIsPlaying(false)
      } else {
        audioRef.current?.play()
        setIsPlaying(true)
      }
    } else {
      setActiveSound(sound)
      setIsPlaying(true)
    }
  }

  const handleAudioLoad = () => {
    if (audioRef.current && isPlaying) {
      audioRef.current.volume = volume
      audioRef.current.play().catch(() => {
        setIsPlaying(false)
      })
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

      {activeSound && (
        <audio
          ref={audioRef}
          src={activeSound.url}
          loop
          onCanPlayThrough={handleAudioLoad}
        />
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
