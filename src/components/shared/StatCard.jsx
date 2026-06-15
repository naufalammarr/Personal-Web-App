import { motion } from 'framer-motion'

/**
 * StatCard
 * --------
 * Skill / technology card, Apple-monochrome: a flat card surface, an
 * extrabold title in ink, muted body, hairline-bordered uppercase tags, and
 * an optional ink proficiency bar on a hairline track. Colours flip with the
 * surrounding surface context. No accent, no shadow.
 *
 * Props:
 *  - icon:   Lucide icon component (optional, monochrome)
 *  - title:  category name, e.g. "Frontend"
 *  - desc:   one-line description
 *  - tags:   array of technology strings
 *  - level:  optional number 0–100 for the proficiency bar
 */
export default function StatCard({ icon: Icon, title, desc, tags = [], level }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className="glass-card flex h-full flex-col p-8"
    >
      <div className="mb-4 flex items-center gap-3">
        {Icon && <Icon size={20} strokeWidth={1.75} className="text-ink" />}
        <h3 className="text-lg font-extrabold tracking-tight text-ink">
          {title}
        </h3>
      </div>

      <p className="mb-6 text-sm font-medium leading-relaxed text-muted">{desc}</p>

      <div className="mt-auto flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="border border-line px-2.5 py-1 text-[0.65rem] uppercase tracking-[0.12em] text-soft"
          >
            {tag}
          </span>
        ))}
      </div>

      {typeof level === 'number' && (
        <div className="mt-6 h-px w-full bg-line">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${level}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="h-px bg-ink"
          />
        </div>
      )}
    </motion.div>
  )
}
