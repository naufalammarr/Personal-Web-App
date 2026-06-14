import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import Footer from '../layout/Footer'
import { PageScrollContext } from './PageScrollContext'

/**
 * PageTransition
 * --------------
 * The outermost wrapper of every routed page:
 *
 *  1. Animates children on mount/unmount with a restrained scale + cross-fade.
 *     The heavy lifting of the route change is the <Curtain> wipe in App.jsx;
 *     this just lets the incoming page settle softly as the curtain reveals it
 *     (no blur, so the two effects don't compound). Works with
 *     <AnimatePresence mode="wait"> in App.jsx (keyed by pathname) so one page
 *     fully resolves before the next begins.
 *  2. Is a precise full-page snap anchor — exactly one viewport tall
 *     (`h-screen`), a snap stop (`snap-start shrink-0`), content centered
 *     (`justify-center`).
 *  3. Holds the content + shared <Footer> in an inner region capped at
 *     `max-h-screen` with `overflow-y-auto`: short pages stay centered,
 *     long pages scroll internally so nothing is clipped and the outer snap
 *     jump stays pixel-precise.
 */
const EASE_OUT = [0.22, 1, 0.36, 1]
const EASE_IN = [0.55, 0, 0.65, 0.2]

const variants = {
  initial: { opacity: 0, scale: 0.99, y: 10 },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_OUT },
  },
  exit: {
    opacity: 0,
    scale: 1.006,
    y: -8,
    transition: { duration: 0.32, ease: EASE_IN },
  },
}

// Reduced-motion: a plain, quick cross-fade — no scale or drift.
const reducedVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
}

export default function PageTransition({ children, className = '' }) {
  const reduced = useReducedMotion()

  // Drive a thin reading-progress bar from this page's own scroll region.
  const scrollRef = useRef(null)
  const { scrollYProgress } = useScroll({ container: scrollRef })
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 })

  return (
    <motion.div
      variants={reduced ? reducedVariants : variants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{ willChange: 'transform, opacity' }}
      className={`relative flex h-screen w-full shrink-0 snap-start flex-col justify-center ${className}`}
    >
      {/* Reading-progress bar — white through mix-blend-difference, so it reads
          black on light surfaces and white on dark, always legible. */}
      <motion.div
        aria-hidden="true"
        style={{ scaleX }}
        className="pointer-events-none absolute inset-x-0 top-0 z-[55] h-[3px] origin-left bg-white mix-blend-difference"
      />

      <div ref={scrollRef} className="flex max-h-screen w-full flex-col overflow-y-auto scroll-smooth">
        <PageScrollContext.Provider value={scrollRef}>
          <div className="flex-1">{children}</div>
        </PageScrollContext.Provider>
        <Footer />
      </div>
    </motion.div>
  )
}
