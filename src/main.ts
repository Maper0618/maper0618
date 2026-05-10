import './styles/base.css'
import './styles/scroll-progress.css'
import './styles/nav.css'
import './styles/cursor-glow.css'
import './styles/starfield.css'
import './styles/terminal.css'
import './styles/journey.css'
import './styles/opinions.css'
import './styles/projects.css'
import './styles/works.css'
import './styles/contact.css'

import { initScrollProgress } from './utils/scroll-progress'
import { initCursorGlow } from './utils/cursor-glow'
import { initStarfield } from './utils/starfield'
import { initTheme } from './utils/theme'
import { initScrollReveal } from './utils/scroll-reveal'
import { initKonami } from './utils/konami'
import { initParallax } from './utils/parallax'
import { initToast } from './utils/toast'

import { initTerminal } from './sections/terminal'
import { initOpinions } from './sections/opinions'
import { initProjects } from './sections/projects'
import { initNav } from './sections/nav'
import { initContact } from './sections/contact'
import { initFooter } from './sections/footer'
import { initJourney } from './sections/journey'

document.addEventListener('DOMContentLoaded', () => {
  initScrollProgress()
  initCursorGlow()
  initStarfield()
  initTheme()
  initKonami()
  initParallax()
  initToast()

  initTerminal()
  initJourney()
  initScrollReveal()
  initOpinions()
  initProjects()
  initNav()
  initContact()
  initFooter()
})
