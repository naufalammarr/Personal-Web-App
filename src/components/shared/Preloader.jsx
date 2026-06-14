import { useEffect, useState } from 'react'
import { animate, motion, useReducedMotion } from 'framer-motion'

/**
 * Preloader
 * ---------
 * First-load splash, shown once before the app is revealed. A black screen
 * with a "Welcome to my portfolio" greeting + full name, and a 000 → 100
 * counter filling a hairline progress bar; on completion it lifts up past the
 * top (matching the route curtain) to reveal Home, which has been mounting
 * underneath the whole time.
 *
 * Rendered inside an <AnimatePresence> in App and gated by a `loading` flag —
 * its `exit` plays the lift-away. Calls `onDone` once the count reaches 100
 * (after a brief hold) so App can drop the flag.
 *
 * Reduced-motion: skips the counter, holds briefly, then fades out.
 *
 * Props:
 *  - onDone: called when the splash is finished and should be dismissed
 */
const EASE = [0.76, 0, 0.24, 1]

export default function Preloader({ onDone }) {
  const reduced = useReducedMotion()
  const [count, setCount] = useState(reduced ? 100 : 0)

  useEffect(() => {
    if (reduced) {
      const t = setTimeout(onDone, 500)
      return () => clearTimeout(t)
    }
    const controls = animate(0, 100, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setCount(Math.round(v)),
      onComplete: () => setTimeout(onDone, 350),
    })
    return () => controls.stop()
  }, [reduced, onDone])

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-0 z-[80] flex flex-col items-center justify-center bg-black"
      initial={{ y: 0 }}
      exit={reduced ? { opacity: 0 } : { y: '-100%' }}
      transition={{ duration: reduced ? 0.4 : 0.7, ease: EASE }}
    >
      <motion.div
        className="flex flex-col items-center px-6 text-center"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-white/50">
          Welcome to my portfolio
        </span>
        <span className="mt-4 font-display text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
          Naufal Ammar Zaidan
        </span>
      </motion.div>

      <motion.div
        className="mt-8 flex w-56 max-w-[70vw] items-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="h-px flex-1 bg-white/20">
          <div className="h-px bg-white" style={{ width: `${count}%` }} />
        </div>
        <span className="font-display text-xs font-medium tabular-nums tracking-widest text-white/70">
          {String(count).padStart(3, '0')}
        </span>
      </motion.div>
    </motion.div>
  )
}
