import { motion, useReducedMotion } from 'framer-motion'

/**
 * Curtain
 * -------
 * A cinematic route-change wipe: a full-screen slab sweeps up from below the
 * viewport, holds to fully cover the screen, then exits past the top —
 * revealing the freshly-swapped page beneath. The centred full name fades in
 * while the screen is covered.
 *
 * The slab colour alternates per route (true-monochrome statement): some pages
 * wipe with a black slab + white wordmark, others invert to white + black. The
 * mapping is deterministic by pathname, so navigating back and forth always
 * shows the same colour for a given page.
 *
 * Rendered in App keyed by pathname, so it remounts and replays its one-shot
 * timeline on every navigation. The hold window (~42–58% of the timeline) is
 * tuned to land on the page handoff performed by <AnimatePresence mode="wait">,
 * so the swap happens out of sight.
 *
 * Disabled entirely for reduced-motion users (the page cross-fade carries the
 * transition instead).
 */
const EASE = [0.76, 0, 0.24, 1]
const TIMES = [0, 0.42, 0.58, 1]
const DURATION = 0.7

// Deterministic colour per route — even slots wipe dark, odd slots wipe light.
const ORDER = ['/', '/about', '/projects', '/services']

export default function Curtain({ pathname }) {
  const reduced = useReducedMotion()
  if (reduced) return null

  const idx = ORDER.indexOf(pathname)
  const dark = idx === -1 || idx % 2 === 0
  const bg = dark ? '#000000' : '#ffffff'
  const fg = dark ? '#ffffff' : '#000000'

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[70] flex items-center justify-center"
      style={{ backgroundColor: bg }}
      initial={{ y: '100%' }}
      animate={{ y: ['100%', '0%', '0%', '-100%'] }}
      transition={{ duration: DURATION, times: TIMES, ease: EASE }}
    >
      <motion.span
        className="px-6 text-center font-display text-2xl font-extrabold tracking-tight sm:text-4xl"
        style={{ color: fg }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: DURATION, times: TIMES, ease: 'easeInOut' }}
      >
        Naufal Ammar Zaidan
      </motion.span>
    </motion.div>
  )
}
