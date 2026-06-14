import { useCallback, useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import MagneticButton from '../shared/MagneticButton'

/**
 * Navbar
 * ------
 * Apple-style overlay navigation: a fully transparent, floating bar fixed over
 * the page — no background, ever. Its elements adapt colour to the surface
 * currently behind the bar: white over dark sections, near-black over light
 * ones, with a smooth fade. (mix-blend-mode can't do this for a fixed bar — a
 * fixed element creates its own stacking context, so it blends only against its
 * own transparent backdrop, never the page behind it.) Instead we hit-test the
 * `[data-tone]` section under the bar. On mobile the hamburger opens a
 * full-screen black overlay menu.
 */
const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/services', label: 'Services' },
]

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3, ease: 'easeOut', when: 'beforeChildren', staggerChildren: 0.07 },
  },
  exit: { opacity: 0, transition: { duration: 0.25, ease: 'easeIn', when: 'afterChildren' } },
}

const linkVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.2 } },
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  // Tone of the section behind the bar: 'dark' -> white nav, 'light' -> black.
  const [tone, setTone] = useState('dark')
  const { pathname } = useLocation()

  // Hit-test a few points just below the bar for the nearest [data-tone] band.
  const sampleTone = useCallback(() => {
    const y = 80
    const xs = [28, Math.round(window.innerWidth / 2), window.innerWidth - 28]
    for (const x of xs) {
      const sec = document.elementFromPoint(x, y)?.closest?.('[data-tone]')
      if (sec) {
        setTone(sec.getAttribute('data-tone') === 'light' ? 'light' : 'dark')
        return
      }
    }
  }, [])

  // Re-sample on scroll / resize, rAF-throttled. The page scrolls inside an
  // inner container, so listen on the capture phase to catch it.
  useEffect(() => {
    let raf = 0
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(() => { raf = 0; sampleTone() })
    }
    schedule()
    document.addEventListener('scroll', schedule, true)
    window.addEventListener('resize', schedule)
    return () => {
      document.removeEventListener('scroll', schedule, true)
      window.removeEventListener('resize', schedule)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [sampleTone])

  // Re-sample after a route change, once the new sections have painted.
  useEffect(() => {
    const t = setTimeout(sampleTone, 120)
    return () => clearTimeout(t)
  }, [pathname, sampleTone])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  const onDark = tone === 'dark'
  const ink = onDark ? 'text-white' : 'text-[#1d1d1f]'

  const capLink = ({ isActive }) =>
    `link-underline text-sm font-medium tracking-tight transition-colors duration-300 ${
      isActive ? ink : onDark ? 'text-white/60 hover:text-white' : 'text-black/50 hover:text-[#1d1d1f]'
    }`

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav className="flex items-center justify-between px-6 py-5 sm:px-10">
        {/* Wordmark */}
        <Link
          to="/"
          onClick={() => setOpen(false)}
          className={`font-display text-base font-extrabold tracking-[0.22em] transition-colors duration-300 ${ink}`}
        >
          NAZ
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-9 md:flex">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} className={capLink} end={link.to === '/'}>
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Desktop CTA — outline pill; colour adapts to the surface behind it */}
        <MagneticButton className="hidden md:inline-flex">
          <Link to="/#contact" onClick={() => setOpen(false)}>
            <span
              className={`inline-flex items-center justify-center rounded-full border px-5 py-2.5 text-[0.8rem] font-semibold transition-colors duration-300 ${
                onDark
                  ? 'border-white text-white hover:bg-white hover:text-black'
                  : 'border-[#1d1d1f] text-[#1d1d1f] hover:bg-[#1d1d1f] hover:text-white'
              }`}
            >
              Contact
            </span>
          </Link>
        </MagneticButton>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen(true)}
          className={`transition-colors duration-300 md:hidden ${ink}`}
        >
          <Menu size={22} strokeWidth={2} />
        </button>
      </nav>

      {/* Full-screen overlay menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="overlay"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="surface-black fixed inset-0 z-[60] flex h-screen w-screen flex-col items-center justify-center md:hidden"
          >
            <motion.button
              variants={linkVariants}
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="absolute right-6 top-5 text-ink"
            >
              <X size={24} strokeWidth={1.75} />
            </motion.button>

            <nav className="flex flex-col items-center gap-8">
              {links.map((link) => (
                <motion.div key={link.to} variants={linkVariants}>
                  <NavLink
                    to={link.to}
                    end={link.to === '/'}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `font-display text-3xl font-extrabold tracking-tight transition-colors sm:text-4xl ${
                        isActive ? 'text-ink' : 'text-muted hover:text-ink'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}

              <motion.div variants={linkVariants} className="mt-4">
                <Link to="/#contact" onClick={() => setOpen(false)} className="btn-primary">
                  Contact
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
