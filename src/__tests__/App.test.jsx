import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import App from '../App'

// Mock Audio
window.HTMLMediaElement.prototype.play = vi.fn(() => Promise.resolve())
window.HTMLMediaElement.prototype.pause = vi.fn()

describe('App', () => {
  it('renders the app title', () => {
    render(<App />)
    expect(screen.getByText('Serenity')).toBeInTheDocument()
  })

  it('renders the tagline', () => {
    render(<App />)
    expect(screen.getByText('Find your inner peace')).toBeInTheDocument()
  })

  it('renders the timer with default time', () => {
    render(<App />)
    expect(screen.getByText('05:00')).toBeInTheDocument()
  })

  it('renders preset buttons', () => {
    render(<App />)
    expect(screen.getByText('5 min')).toBeInTheDocument()
    expect(screen.getByText('10 min')).toBeInTheDocument()
    expect(screen.getByText('20 min')).toBeInTheDocument()
  })

  it('renders start button', () => {
    render(<App />)
    expect(screen.getByText('Start')).toBeInTheDocument()
  })

  it('renders reset button', () => {
    render(<App />)
    expect(screen.getByText('Reset')).toBeInTheDocument()
  })

  it('renders feature toggle buttons', () => {
    render(<App />)
    expect(screen.getByText('Breathing')).toBeInTheDocument()
    expect(screen.getByText('Sounds')).toBeInTheDocument()
  })

  it('switches between breathing and sounds view', () => {
    render(<App />)

    const soundsButton = screen.getByText('Sounds')
    fireEvent.click(soundsButton)

    expect(screen.getByText('Ambient Sounds')).toBeInTheDocument()
  })

  it('changes preset when clicking preset buttons', () => {
    render(<App />)

    const tenMinButton = screen.getByText('10 min')
    fireEvent.click(tenMinButton)

    expect(screen.getByText('10:00')).toBeInTheDocument()
  })

  it('starts timer when clicking start button', () => {
    render(<App />)

    const startButton = screen.getByText('Start')
    fireEvent.click(startButton)

    expect(screen.getByText('Pause')).toBeInTheDocument()
  })

  it('renders footer text', () => {
    render(<App />)
    expect(screen.getByText('Take a moment. Breathe. Be present.')).toBeInTheDocument()
  })

  it('renders theme toggle button', () => {
    render(<App />)
    const themeButton = screen.getByRole('button', { name: /switch to.*mode/i })
    expect(themeButton).toBeInTheDocument()
  })
})
