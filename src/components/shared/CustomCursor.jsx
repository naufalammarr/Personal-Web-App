import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { playClick, playHover } from '../../lib/sound'

/**
 * CustomCursor
 * ------------
 * A custom pointer made of a fast inner dot and a smoothly-lerped outer
 * ring (Framer Motion springs). The whole layer renders through
 * `mix-blend-mode: difference`, so the white ring/dot read as pure black
 * over light surfaces and pure white over dark ones — true monochrome on
 * any background. Over interactive elements the ring grows and fills with
 * a faint wash. It also delegates the global UI sound cues (hover/click).
 *
 * Performance: only transform-based spring updates run per frame, the layers
 * are `pointer-events: none`, and the whole thing is skipped on touch /
 * reduced-motion devices — so scroll-snap stays at 60fps.
 */
const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, [data-cursor="hover"]'

export default function CustomCursor() {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)

  // Two spring profiles: a snappy dot and a softer, trailing ring (lerp feel).
  const dotX = useSpring(x, { damping: 40, stiffness: 900, mass: 0.25 })
  const dotY = useSpring(y, { damping: 40, stiffness: 900, mass: 0.25 })
  const ringX = useSpring(x, { damping: 28, stiffness: 250, mass: 0.55 })
  const ringY = useSpring(y, { damping: 28, stiffness: 250, mass: 0.55 })

  const [hovered, setHovered] = useState(false)
  const [visible, setVisible] = useState(false)
  const hoverRef = useRef(false)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduced) return

    document.documentElement.classList.add('has-custom-cursor')

    const onMove = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      if (!visible) setVisible(true)
    }

    const onOver = (e) => {
      if (e.target.closest?.(INTERACTIVE) && !hoverRef.current) {
        hoverRef.current = true
        setHovered(true)
        playHover()
      }
    }

    const onOut = (e) => {
      if (!e.target.closest?.(INTERACTIVE)) return
      const to = e.relatedTarget
      if (!to || !to.closest?.(INTERACTIVE)) {
        hoverRef.current = false
        setHovered(false)
      }
    }

    const onClick = (e) => {
      if (e.target.closest?.('a, button, [role="button"]')) playClick()
    }

    const onLeaveWindow = () => setVisible(false)

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver, { passive: true })
    document.addEventListener('mouseout', onOut, { passive: true })
    document.addEventListener('click', onClick, { passive: true })
    document.addEventListener('mouseleave', onLeaveWindow)

    return () => {
      document.documentElement.classList.remove('has-custom-cursor')
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      document.removeEventListener('click', onClick)
      document.removeEventListener('mouseleave', onLeaveWindow)
    }
  }, [x, y, visible])

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="cursor-layer"
        style={{ x: ringX, y: ringY, opacity: visible ? 1 : 0 }}
        aria-hidden="true"
      >
        <motion.span
          className="cursor-ring"
          animate={{
            width: hovered ? 56 : 32,
            height: hovered ? 56 : 32,
            backgroundColor: hovered ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0)',
            borderColor: hovered ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.7)',
          }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        />
      </motion.div>

      {/* Inner dot */}
      <motion.div
        className="cursor-layer"
        style={{ x: dotX, y: dotY, opacity: visible ? 1 : 0 }}
        aria-hidden="true"
      >
        <span className="cursor-dot" />
      </motion.div>
    </>
  )
}
