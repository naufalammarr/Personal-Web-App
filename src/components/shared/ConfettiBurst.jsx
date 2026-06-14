import { motion } from 'framer-motion'

/**
 * ConfettiBurst
 * -------------
 * A tiny one-shot confetti burst (Framer Motion) for celebratory moments —
 * e.g. a successful form submit. Particles fly radially outward, spin, and
 * fade. Absolutely positioned and `pointer-events: none`, so it overlays its
 * parent without affecting layout. Render it only when you want it to fire.
 */
const COUNT = 16

const pieces = Array.from({ length: COUNT }, (_, i) => {
  const angle = (i / COUNT) * Math.PI * 2 + Math.random() * 0.4
  const distance = 38 + Math.random() * 46
  return {
    x: Math.cos(angle) * distance,
    y: Math.sin(angle) * distance,
    rotate: Math.random() * 360,
    color: i % 2 === 0 ? '#000000' : '#86868b',
    delay: Math.random() * 0.06,
  }
})

export default function ConfettiBurst() {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden="true">
      {pieces.map((p, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 }}
          animate={{ opacity: 0, x: p.x, y: p.y, scale: 0.3, rotate: p.rotate }}
          transition={{ duration: 0.8, delay: p.delay, ease: [0.22, 1, 0.36, 1] }}
          className="absolute h-1.5 w-1.5"
          style={{ backgroundColor: p.color }}
        />
      ))}
    </div>
  )
}
