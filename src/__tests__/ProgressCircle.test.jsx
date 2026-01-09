import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ProgressCircle } from '../components/ProgressCircle'

describe('ProgressCircle', () => {
  it('renders the time display', () => {
    render(<ProgressCircle progress={0} time="05:00" isComplete={false} />)
    expect(screen.getByText('05:00')).toBeInTheDocument()
  })

  it('shows complete text when timer is done', () => {
    render(<ProgressCircle progress={100} time="00:00" isComplete={true} />)
    expect(screen.getByText('Complete')).toBeInTheDocument()
  })

  it('does not show complete text when timer is running', () => {
    render(<ProgressCircle progress={50} time="02:30" isComplete={false} />)
    expect(screen.queryByText('Complete')).not.toBeInTheDocument()
  })

  it('renders SVG progress circle', () => {
    render(<ProgressCircle progress={50} time="02:30" isComplete={false} />)
    const svg = document.querySelector('.progress-circle')
    expect(svg).toBeInTheDocument()
  })

  it('renders children if provided', () => {
    render(
      <ProgressCircle progress={0} time="05:00" isComplete={false}>
        <span data-testid="child">Child content</span>
      </ProgressCircle>
    )
    expect(screen.getByTestId('child')).toBeInTheDocument()
  })

  it('applies complete class when timer is done', () => {
    render(<ProgressCircle progress={100} time="00:00" isComplete={true} />)
    const timeDisplay = screen.getByText('00:00')
    expect(timeDisplay).toHaveClass('complete')
  })
})
