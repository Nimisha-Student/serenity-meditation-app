import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ThemeToggle } from '../components/ThemeToggle'
import { ThemeProvider } from '../context/ThemeContext'

const renderWithTheme = (component) => {
  return render(
    <ThemeProvider>
      {component}
    </ThemeProvider>
  )
}

describe('ThemeToggle', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.removeAttribute('data-theme')
  })

  it('renders the toggle button', () => {
    renderWithTheme(<ThemeToggle />)
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
  })

  it('has correct aria-label for dark mode', () => {
    localStorage.setItem('darkMode', 'true')
    renderWithTheme(<ThemeToggle />)
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('aria-label', 'Switch to light mode')
  })

  it('has correct aria-label for light mode', () => {
    localStorage.setItem('darkMode', 'false')
    renderWithTheme(<ThemeToggle />)
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('aria-label', 'Switch to dark mode')
  })

  it('toggles theme when clicked', () => {
    localStorage.setItem('darkMode', 'true')
    renderWithTheme(<ThemeToggle />)

    const button = screen.getByRole('button')
    fireEvent.click(button)

    expect(document.documentElement.getAttribute('data-theme')).toBe('light')
  })

  it('persists theme to localStorage', () => {
    localStorage.setItem('darkMode', 'true')
    renderWithTheme(<ThemeToggle />)

    const button = screen.getByRole('button')
    fireEvent.click(button)

    expect(localStorage.getItem('darkMode')).toBe('false')
  })
})
