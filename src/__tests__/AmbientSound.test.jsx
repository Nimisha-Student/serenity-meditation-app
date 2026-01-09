import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { AmbientSound } from '../components/AmbientSound'

// Mock Audio
window.HTMLMediaElement.prototype.play = vi.fn(() => Promise.resolve())
window.HTMLMediaElement.prototype.pause = vi.fn()

describe('AmbientSound', () => {
  it('renders the title', () => {
    render(<AmbientSound />)
    expect(screen.getByText('Ambient Sounds')).toBeInTheDocument()
  })

  it('renders all sound buttons', () => {
    render(<AmbientSound />)
    expect(screen.getByLabelText('Rain sound')).toBeInTheDocument()
    expect(screen.getByLabelText('Forest sound')).toBeInTheDocument()
    expect(screen.getByLabelText('Ocean sound')).toBeInTheDocument()
    expect(screen.getByLabelText('Fire sound')).toBeInTheDocument()
  })

  it('renders sound names', () => {
    render(<AmbientSound />)
    expect(screen.getByText('Rain')).toBeInTheDocument()
    expect(screen.getByText('Forest')).toBeInTheDocument()
    expect(screen.getByText('Ocean')).toBeInTheDocument()
    expect(screen.getByText('Fire')).toBeInTheDocument()
  })

  it('shows volume control when a sound is selected', () => {
    render(<AmbientSound />)

    fireEvent.click(screen.getByLabelText('Rain sound'))

    expect(screen.getByLabelText('Volume')).toBeInTheDocument()
  })

  it('activates selected sound button', () => {
    render(<AmbientSound />)

    const rainButton = screen.getByLabelText('Rain sound')
    fireEvent.click(rainButton)

    expect(rainButton).toHaveClass('active')
  })

  it('changes volume when slider is moved', () => {
    render(<AmbientSound />)

    fireEvent.click(screen.getByLabelText('Rain sound'))

    const volumeSlider = screen.getByLabelText('Volume')
    fireEvent.change(volumeSlider, { target: { value: '0.75' } })

    expect(volumeSlider.value).toBe('0.75')
  })
})
