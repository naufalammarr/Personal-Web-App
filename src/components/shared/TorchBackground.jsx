import { useEffect } from 'react'
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion'

/**
 * TorchBackground
 * ---------------
 * An interactive "torch" — a soft monochrome radial glow that follows the
 * cursor. Mouse coordinates feed two Framer Motion springs (lerp smoothing),
 * and `useMotionTemplate` composes the gradient string directly on the
 * element's style. Because the value is animated by Framer (not React state),
 * there are zero re-renders per mouse move — it stays 60fps even during the
 * scroll-snap.
 *
 * The layer paints a faint white pool through `mix-blend-mode: difference`,
 * so it darkens light surfaces (a ~black wash) and lightens dark surfaces
 * (a ~white wash) automatically — honouring the monochrome spec without
 * needing to know which section it is currently over.
 *
 * Rendered as a fixed, pointer-events-none layer at a low z-index so it sits
 * beneath all text/content and never interferes with the custom cursor or
 * other micro-interactions.
 */
export default function TorchBackground() {
  const initX = typeof window !== 'undefined' ? window.innerWidth / 2 : 0
  const initY = typeof window !== 'undefined' ? window.innerHeight / 2 : 0

  const mouseX = useMotionValue(initX)
  const mouseY = useMotionValue(initY)

  // Smooth, lagging follow so the light glides rather than snaps.
  const x = useSpring(mouseX, { damping: 30, stiffness: 200, mass: 0.5 })
  const y = useSpring(mouseY, { damping: 30, stiffness: 200, mass: 0.5 })

  const background = useMotionTemplate`radial-gradient(800px circle at ${x}px ${y}px, rgba(255, 255, 255, 0.04), transparent 80%)`

  useEffect(() => {
    // Respect reduced-motion: leave the light parked at center, no tracking.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const onMove = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [mouseX, mouseY])

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 mix-blend-difference"
      style={{ background }}
    />
  )
}
