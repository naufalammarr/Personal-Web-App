import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/**
 * MagneticButton
 * --------------
 * Wraps any element (button / link / span) and gently pulls it toward the
 * cursor while the pointer is near, then springs back on leave — the classic
 * "magnetic" effect. Movement is purely transform-based (translate via a
 * Framer spring), so it never triggers layout and stays 60fps-friendly.
 *
 * Props:
 *  - strength: how strongly it follows the cursor (0–1, default 0.4)
 *  - padding:  invisible hit-area expansion (px) so the pull begins ~before
 *              the cursor reaches the visible element (approximates a radius)
 */
export default function MagneticButton({
  children,
  className = '',
  strength = 0.4,
  padding = 16,
}) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { damping: 15, stiffness: 220, mass: 0.3 })
  const sy = useSpring(y, { damping: 15, stiffness: 220, mass: 0.3 })

  const handleMove = (e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const cx = r.left + r.width / 2
    const cy = r.top + r.height / 2
    x.set((e.clientX - cx) * strength)
    y.set((e.clientY - cy) * strength)
  }

  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy, padding, margin: -padding }}
      className={`inline-flex ${className}`}
    >
      {children}
    </motion.div>
  )
}
