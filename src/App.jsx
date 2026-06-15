import { useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/layout/Navbar'
import CustomCursor from './components/shared/CustomCursor'
import SoundToggle from './components/shared/SoundToggle'
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

  return (
    <div className="bg-canvas">
      <AnimatePresence>
        {loading && <Preloader onDone={dismissPreloader} />}
      </AnimatePresence>

      <TorchBackground />
      <CustomCursor />
      <SoundToggle />
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

