import { useEffect, useRef, useState } from 'react'
import { animate, useInView, useReducedMotion } from 'framer-motion'

/**
 * CountUp
 * -------
 * Counts a numeric value up from zero the first time it scrolls into view,
 * easing on the brand curve. Non-numeric values (or reduced-motion users)
 * render the value verbatim with no animation. Only the text node updates —
 * the surrounding markup never re-mounts.
 *
 * Props:
 *  - value:    the target (e.g. "15", "99"); rendered as-is if not a number
 *  - duration: count length in seconds (default 1.4)
 */
export default function CountUp({ value, duration = 1.4 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const reduced = useReducedMotion()

  const target = parseFloat(value)
  const isNumeric = !Number.isNaN(target) && /^\d/.test(String(value))

  const [display, setDisplay] = useState(isNumeric && !reduced ? '0' : value)

  useEffect(() => {
    if (!isNumeric || reduced || !inView) return
    const controls = animate(0, target, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(String(Math.round(v))),
    })
    return () => controls.stop()
  }, [inView, isNumeric, reduced, target, duration])

  return <span ref={ref}>{display}</span>
}
