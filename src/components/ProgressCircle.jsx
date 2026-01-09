import './ProgressCircle.css'

export function ProgressCircle({ progress, time, isComplete, children }) {
  const radius = 140
  const stroke = 8
  const normalizedRadius = radius - stroke * 2
  const circumference = normalizedRadius * 2 * Math.PI
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <div className="progress-circle-container">
      <svg
        height={radius * 2}
        width={radius * 2}
        className="progress-circle"
      >
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--gradient-start)" />
            <stop offset="100%" stopColor="var(--gradient-end)" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        <circle
          className="progress-circle-bg"
          stroke="var(--circle-bg)"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />

        <circle
          className="progress-circle-progress"
          stroke="url(#progressGradient)"
          fill="transparent"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference + ' ' + circumference}
          style={{ strokeDashoffset }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          filter="url(#glow)"
        />
      </svg>

      <div className="progress-circle-content">
        <span className={`time-display ${isComplete ? 'complete' : ''}`}>
          {time}
        </span>
        {isComplete && <span className="complete-text">Complete</span>}
        {children}
      </div>
    </div>
  )
}
