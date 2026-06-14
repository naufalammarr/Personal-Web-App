import { motion } from 'framer-motion'
import CountUp from './CountUp'

/**
 * KpiCardShared
 * -------------
 * Project-scale summary cell, Apple-monochrome: a flat card surface, a large
 * extrabold display number that counts up in view, and an all-caps muted
 * label. Lifts gently on hover. Text and borders flip automatically with the
 * surrounding surface context. No glows, gradients, or shadows.
 *
 * Props:
 *  - icon:   Lucide icon component (optional, rendered small + monochrome)
 *  - value:  the primary metric (string or number)
 *  - suffix: small unit shown next to the value, e.g. "+", "%"
 *  - label:  description beneath the metric
 */
export default function KpiCardShared({ icon: Icon, value, suffix = '', label }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className="bg-card p-8 transition-colors hover:bg-card-hover"
    >
      {Icon && (
        <Icon size={18} strokeWidth={1.75} className="mb-5 text-muted" />
      )}

      <div className="flex items-baseline gap-1">
        <span className="font-display text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
          <CountUp value={value} />
        </span>
        <span className="font-display text-xl font-extrabold text-muted">{suffix}</span>
      </div>

      <p className="eyebrow mt-3 !text-[0.65rem]">{label}</p>
    </motion.div>
  )
}
