import './TimerControls.css'

const PRESETS = [
  { minutes: 5, label: '5 min' },
  { minutes: 10, label: '10 min' },
  { minutes: 20, label: '20 min' },
]

export function TimerControls({
  isRunning,
  duration,
  onStart,
  onPause,
  onReset,
  onPresetSelect
}) {
  const currentPreset = duration / 60

  return (
    <div className="timer-controls">
      <div className="preset-buttons">
        {PRESETS.map(({ minutes, label }) => (
          <button
            key={minutes}
            className={`preset-btn ${currentPreset === minutes ? 'active' : ''}`}
            onClick={() => onPresetSelect(minutes)}
            disabled={isRunning}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="action-buttons">
        {!isRunning ? (
          <button className="action-btn primary" onClick={onStart}>
            <PlayIcon />
            <span>Start</span>
          </button>
        ) : (
          <button className="action-btn secondary" onClick={onPause}>
            <PauseIcon />
            <span>Pause</span>
          </button>
        )}
        <button className="action-btn tertiary" onClick={onReset}>
          <ResetIcon />
          <span>Reset</span>
        </button>
      </div>
    </div>
  )
}

function PlayIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z"/>
    </svg>
  )
}

function PauseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
    </svg>
  )
}

function ResetIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.65 6.35A7.958 7.958 0 0012 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0112 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
    </svg>
  )
}
