import { useState, useEffect } from 'react'
import './SplashScreen.css'

const QUOTES = [
  { text: "Breathe in peace, breathe out stress.", author: null },
  { text: "The present moment is filled with joy and happiness. If you are attentive, you will see it.", author: "Thich Nhat Hanh" },
  { text: "Almost everything will work again if you unplug it for a few minutes, including you.", author: "Anne Lamott" },
  { text: "Within you, there is a stillness and a sanctuary to which you can retreat at any time.", author: "Hermann Hesse" },
  { text: "Feelings come and go like clouds in a windy sky. Conscious breathing is my anchor.", author: "Thich Nhat Hanh" },
  { text: "The mind is like water. When it's turbulent, it's difficult to see. When it's calm, everything becomes clear.", author: null },
  { text: "Be where you are, not where you think you should be.", author: null },
  { text: "Surrender to what is. Let go of what was. Have faith in what will be.", author: "Sonia Ricotti" },
  { text: "In the midst of movement and chaos, keep stillness inside of you.", author: "Deepak Chopra" },
  { text: "The greatest weapon against stress is our ability to choose one thought over another.", author: "William James" },
  { text: "Quiet the mind, and the soul will speak.", author: "Ma Jaya Sati Bhagavati" },
  { text: "Your calm mind is the ultimate weapon against your challenges.", author: "Bryant McGill" },
  { text: "Nature does not hurry, yet everything is accomplished.", author: "Lao Tzu" },
  { text: "Peace comes from within. Do not seek it without.", author: "Buddha" },
  { text: "Let go of the thoughts that don't make you strong.", author: null },
]

export function SplashScreen({ onComplete }) {
  const [quote] = useState(() => QUOTES[Math.floor(Math.random() * QUOTES.length)])
  const [phase, setPhase] = useState('fadeIn') // fadeIn -> visible -> fadeOut

  useEffect(() => {
    // Fade in complete, stay visible
    const visibleTimer = setTimeout(() => {
      setPhase('visible')
    }, 1000)

    // Start fade out
    const fadeOutTimer = setTimeout(() => {
      setPhase('fadeOut')
    }, 3500)

    // Complete and unmount
    const completeTimer = setTimeout(() => {
      onComplete()
    }, 4500)

    return () => {
      clearTimeout(visibleTimer)
      clearTimeout(fadeOutTimer)
      clearTimeout(completeTimer)
    }
  }, [onComplete])

  return (
    <div className={`splash-screen ${phase}`}>
      <div className="splash-content">
        <div className="splash-logo">S</div>
        <blockquote className="splash-quote">
          <p>"{quote.text}"</p>
          {quote.author && <cite>— {quote.author}</cite>}
        </blockquote>
      </div>
      <div className="splash-bg">
        <div className="splash-orb splash-orb-1"></div>
        <div className="splash-orb splash-orb-2"></div>
      </div>
    </div>
  )
}
