import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { TimerControls } from '../components/TimerControls'

describe('TimerControls', () => {
  const defaultProps = {
    isRunning: false,
    duration: 300,
    onStart: vi.fn(),
    onPause: vi.fn(),
    onReset: vi.fn(),
    onPresetSelect: vi.fn()
  }

  it('renders preset buttons', () => {
    render(<TimerControls {...defaultProps} />)
    expect(screen.getByText('5 min')).toBeInTheDocument()
    expect(screen.getByText('10 min')).toBeInTheDocument()
    expect(screen.getByText('20 min')).toBeInTheDocument()
  })

  it('marks active preset', () => {
    render(<TimerControls {...defaultProps} duration={600} />)
    const tenMinButton = screen.getByText('10 min')
    expect(tenMinButton).toHaveClass('active')
  })

  it('calls onPresetSelect when preset button is clicked', () => {
    const onPresetSelect = vi.fn()
    render(<TimerControls {...defaultProps} onPresetSelect={onPresetSelect} />)

    fireEvent.click(screen.getByText('20 min'))
    expect(onPresetSelect).toHaveBeenCalledWith(20)
  })

  it('shows start button when not running', () => {
    render(<TimerControls {...defaultProps} isRunning={false} />)
    expect(screen.getByText('Start')).toBeInTheDocument()
    expect(screen.queryByText('Pause')).not.toBeInTheDocument()
  })

  it('shows pause button when running', () => {
    render(<TimerControls {...defaultProps} isRunning={true} />)
    expect(screen.getByText('Pause')).toBeInTheDocument()
    expect(screen.queryByText('Start')).not.toBeInTheDocument()
  })

  it('calls onStart when start button is clicked', () => {
    const onStart = vi.fn()
    render(<TimerControls {...defaultProps} onStart={onStart} />)

    fireEvent.click(screen.getByText('Start'))
    expect(onStart).toHaveBeenCalled()
  })

  it('calls onPause when pause button is clicked', () => {
    const onPause = vi.fn()
    render(<TimerControls {...defaultProps} isRunning={true} onPause={onPause} />)

    fireEvent.click(screen.getByText('Pause'))
    expect(onPause).toHaveBeenCalled()
  })

  it('calls onReset when reset button is clicked', () => {
    const onReset = vi.fn()
    render(<TimerControls {...defaultProps} onReset={onReset} />)

    fireEvent.click(screen.getByText('Reset'))
    expect(onReset).toHaveBeenCalled()
  })

  it('disables preset buttons when timer is running', () => {
    render(<TimerControls {...defaultProps} isRunning={true} />)

    const presetButtons = screen.getAllByText(/min/)
    presetButtons.forEach(button => {
      expect(button).toBeDisabled()
    })
  })
})
