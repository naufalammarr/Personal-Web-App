import { useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/layout/Navbar'
import CustomCursor from './components/shared/CustomCursor'
import SoundToggle from './components/shared/SoundToggle'
import ThemeToggle from './components/shared/ThemeToggle'
import TorchBackground from './components/shared/TorchBackground'
import Preloader from './components/shared/Preloader'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import Services from './pages/Services'

/**
 * App
 * ---
 * Root layout + router.
 *
 * The floating <Navbar> is fixed and lives outside the scroll container.
 * The <main> below is a full-page scroll-snap container: each routed page
 * (wrapped in <PageTransition>) is exactly one viewport tall and acts as a
 * snap point. Because routing mounts one page at a time, each page remounts
 * fresh at the top — so no manual scroll reset is needed.
 *
 * <Routes> is wrapped in <AnimatePresence> and keyed by pathname so each
 * page's enter/exit animation runs cleanly.
 */
export default function App() {
  const location = useLocation()
  // First-load splash, shown once per browser session. We persist a flag in
  // sessionStorage so re-renders/route changes (and refreshes within the same
  // tab session) skip it; opening a new tab/session shows it again. <Preloader>
  // drives the 000→100 counter and calls onDone, which sets the flag and drops
  // this state so its lift-away exit plays.
  const [loading, setLoading] = useState(() => {
    try {
      return sessionStorage.getItem('preloaded') !== '1'
    } catch {
      return true
    }
  })

  const dismissPreloader = () => {
    try {
      sessionStorage.setItem('preloaded', '1')
    } catch {
      /* sessionStorage unavailable (private mode) — just hide it */
    }
    setLoading(false)
  }

  // Light/dark — the whole grayscale UI is flipped B↔W with a single
  // `filter: invert(1)` on <html> (.invert-theme). Initial value comes from the
  // class an inline script in index.html sets pre-paint (so there's no flash);
  // we mirror it here for the toggle's aria state, persist the choice to
  // localStorage, and reveal the swap with a circular View-Transition wiping out
  // from the button. Reduced-motion / unsupported browsers flip instantly.
  const [inverted, setInverted] = useState(
    () => typeof document !== 'undefined' &&
      document.documentElement.classList.contains('invert-theme'),
  )

  const toggleInvert = (x, y) => {
    const root = document.documentElement
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    )
    root.style.setProperty('--vt-x', `${x}px`)
    root.style.setProperty('--vt-y', `${y}px`)
    root.style.setProperty('--vt-r', `${radius}px`)

    const apply = () => {
      const next = !root.classList.contains('invert-theme')
      root.classList.toggle('invert-theme', next)
      try {
        localStorage.setItem('invert-theme', next ? '1' : '0')
      } catch {
        /* ignore */
      }
      setInverted(next)
    }

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (document.startViewTransition && !reduced) {
      document.startViewTransition(apply)
    } else {
      apply()
    }
  }

  return (
    <div className="bg-canvas">
      <AnimatePresence>
        {loading && <Preloader onDone={dismissPreloader} />}
      </AnimatePresence>

      <TorchBackground />
      <CustomCursor />
      <SoundToggle />
      <ThemeToggle inverted={inverted} onToggle={toggleInvert} />
      <Navbar />

      <main className="relative z-10 h-screen overflow-y-auto scroll-smooth snap-y snap-mandatory">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/services" element={<Services />} />
            {/* Fallback: unknown routes render the landing page */}
            <Route path="*" element={<Home />} />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  )
}

