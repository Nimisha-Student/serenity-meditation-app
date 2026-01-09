import { useState, useEffect, useCallback, useRef } from 'react'

export function useTimer(initialMinutes = 5) {
  const [duration, setDuration] = useState(initialMinutes * 60)
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const intervalRef = useRef(null)

  const progress = duration > 0 ? ((duration - timeLeft) / duration) * 100 : 0

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsRunning(false)
            setIsComplete(true)
            clearInterval(intervalRef.current)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRunning, timeLeft])

  const start = useCallback(() => {
    setIsComplete(false)
    setIsRunning(true)
  }, [])

  const pause = useCallback(() => {
    setIsRunning(false)
  }, [])

  const reset = useCallback(() => {
    setIsRunning(false)
    setTimeLeft(duration)
    setIsComplete(false)
  }, [duration])

  const setPreset = useCallback((minutes) => {
    setIsRunning(false)
    setDuration(minutes * 60)
    setTimeLeft(minutes * 60)
    setIsComplete(false)
  }, [])

  const formatTime = useCallback((seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }, [])

  return {
    timeLeft,
    duration,
    isRunning,
    isComplete,
    progress,
    start,
    pause,
    reset,
    setPreset,
    formatTime: () => formatTime(timeLeft)
  }
}
