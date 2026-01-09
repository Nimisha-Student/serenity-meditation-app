import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useTimer } from '../hooks/useTimer'

describe('useTimer', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('initializes with default 5 minutes', () => {
    const { result } = renderHook(() => useTimer())

    expect(result.current.duration).toBe(300)
    expect(result.current.timeLeft).toBe(300)
    expect(result.current.isRunning).toBe(false)
    expect(result.current.progress).toBe(0)
  })

  it('initializes with custom minutes', () => {
    const { result } = renderHook(() => useTimer(10))

    expect(result.current.duration).toBe(600)
    expect(result.current.timeLeft).toBe(600)
  })

  it('starts the timer', () => {
    const { result } = renderHook(() => useTimer(5))

    act(() => {
      result.current.start()
    })

    expect(result.current.isRunning).toBe(true)
  })

  it('counts down when running', () => {
    const { result } = renderHook(() => useTimer(5))

    act(() => {
      result.current.start()
    })

    act(() => {
      vi.advanceTimersByTime(1000)
    })

    expect(result.current.timeLeft).toBe(299)
  })

  it('pauses the timer', () => {
    const { result } = renderHook(() => useTimer(5))

    act(() => {
      result.current.start()
    })

    act(() => {
      vi.advanceTimersByTime(1000)
    })

    act(() => {
      result.current.pause()
    })

    expect(result.current.isRunning).toBe(false)
    expect(result.current.timeLeft).toBe(299)
  })

  it('resets the timer', () => {
    const { result } = renderHook(() => useTimer(5))

    act(() => {
      result.current.start()
    })

    act(() => {
      vi.advanceTimersByTime(5000)
    })

    act(() => {
      result.current.reset()
    })

    expect(result.current.isRunning).toBe(false)
    expect(result.current.timeLeft).toBe(300)
  })

  it('sets preset correctly', () => {
    const { result } = renderHook(() => useTimer(5))

    act(() => {
      result.current.setPreset(10)
    })

    expect(result.current.duration).toBe(600)
    expect(result.current.timeLeft).toBe(600)
  })

  it('formats time correctly', () => {
    const { result } = renderHook(() => useTimer(5))

    expect(result.current.formatTime()).toBe('05:00')

    act(() => {
      result.current.setPreset(10)
    })

    expect(result.current.formatTime()).toBe('10:00')
  })

  it('calculates progress correctly', () => {
    const { result } = renderHook(() => useTimer(5))

    act(() => {
      result.current.start()
    })

    act(() => {
      vi.advanceTimersByTime(150000) // 2.5 minutes
    })

    expect(result.current.progress).toBe(50)
  })

  it('completes when time runs out', () => {
    const { result } = renderHook(() => useTimer(5))

    act(() => {
      result.current.start()
    })

    act(() => {
      vi.advanceTimersByTime(300000) // 5 minutes
    })

    expect(result.current.isComplete).toBe(true)
    expect(result.current.isRunning).toBe(false)
    expect(result.current.timeLeft).toBe(0)
  })
})
