import { useMemo, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion'
import { ArrowUpRight, BarChart3, CalendarClock, Rocket } from 'lucide-react'
import PageTransition from '../components/shared/PageTransition'
import ScrambleText from '../components/shared/ScrambleText'
import RevealText from '../components/shared/RevealText'

/**
 * Projects
 * --------
 * Filterable gallery in the Apple-monochrome system: a black header over a
 * parchment gallery of white cards, extrabold sentence-case titles. Category
 * chips drive an active filter; the grid animates items in/out with
 * AnimatePresence + layout.
 */
// To show a screenshot, add `image: '<url-or-import>'` to a project — it then
// appears as a full-bleed card header and in the cursor-follow preview, always
// rendered monochrome (and kept correct when the site is inverted).
const projects = [
  {
    title: 'Zoom Meeting Automation System',
    category: 'Automation',
    icon: CalendarClock,
    description:
      'A web-based system that automates Zoom meeting scheduling and link distribution at Bank BRI Regional Office Bandung — eliminating manual coordination and reducing errors.',
    tags: ['Node.js', 'Express', 'MySQL', 'Automation'],
  },
  {
    title: 'Ventify',
    category: 'Startup',
    icon: Rocket,
    description:
      'A modern web platform built as a major university project / startup — exploring product thinking, clean UI, and a scalable fullstack architecture.',
    tags: ['React', 'Tailwind CSS', 'Node.js', 'PostgreSQL'],
  },
  {
    title: 'Dasawisma ZIS & Kas Monitoring Dashboard',
    category: 'Web App',
    icon: BarChart3,
    description:
      'A real-time financial monitoring dashboard with interactive Recharts visualizations for tracking community ZIS and cash flow with clarity.',
    tags: ['React', 'Recharts', 'Express', 'MySQL'],
  },
]

const categories = ['All', 'Automation', 'Startup', 'Web App']

export default function Projects() {
  const [active, setActive] = useState('All')

  // Cursor-follow preview: which card is hovered + a lagging cursor position.
  const [hovered, setHovered] = useState(null)
  const mx = useMotionValue(-400)
  const my = useMotionValue(-400)
  const px = useSpring(mx, { damping: 26, stiffness: 320, mass: 0.4 })
  const py = useSpring(my, { damping: 26, stiffness: 320, mass: 0.4 })
  const onMove = (e) => {
    mx.set(e.clientX + 22)
    my.set(e.clientY + 22)
  }

  // Filter the project list against the active category.
  const filtered = useMemo(
    () => (active === 'All' ? projects : projects.filter((p) => p.category === active)),
    [active],
  )

  return (
    <PageTransition>
      <section data-tone="dark" className="surface-black border-b border-line px-6 pb-12 pt-36 sm:px-10">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="eyebrow">Selected Work</p>
            <RevealText
              as="h1"
              text="Projects"
              className="display-serif mt-6 text-4xl text-ink sm:text-6xl"
            />
            <p className="mt-6 max-w-2xl text-lg font-medium text-muted">
              A selection of products spanning automation, startups, and data-driven
              web apps. Filter by category to explore.
            </p>

            {/* Filter chips */}
            <div className="mt-12 flex flex-wrap gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActive(cat)}
                  className={`relative rounded-full border px-5 py-2 text-[0.8rem] font-semibold tracking-tight transition-colors ${
                    active === cat
                      ? 'border-ink text-on-ink'
                      : 'border-line text-muted hover:border-ink hover:text-ink'
                  }`}
                >
                  {active === cat && (
                    <motion.span
                      layoutId="chip-pill"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                      className="absolute inset-0 rounded-full bg-ink"
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gallery */}
      <section data-tone="light" className="surface-parchment px-6 py-16 sm:px-10" onMouseMove={onMove}>
        <div className="mx-auto max-w-6xl">
          <motion.div layout className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => {
                const Icon = project.icon
                return (
                  <motion.article
                    key={project.title}
                    layout
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ y: -6 }}
                    onMouseEnter={() => setHovered(project)}
                    onMouseLeave={() => setHovered(null)}
                    data-cursor="hover"
                    className="glass-card group flex flex-col overflow-hidden p-8"
                  >
                    {project.image && (
                      <div className="-mx-8 -mt-8 mb-6 h-40 overflow-hidden">
                        <img
                          src={project.image}
                          alt={project.title}
                          loading="lazy"
                          className="media-mono h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    )}

                    <div className="flex items-start justify-between">
                      <Icon size={24} strokeWidth={1.5} className="text-ink" />
                      <ArrowUpRight
                        size={18}
                        className="text-muted transition-all group-hover:-translate-y-0.5 group-hover:text-ink"
                      />
                    </div>

                    <span className="eyebrow mt-7 !text-[0.6rem]">{project.category}</span>
                    <ScrambleText
                      as="h3"
                      text={project.title}
                      className="mt-3 text-xl font-extrabold leading-tight tracking-tight text-ink"
                    />
                    <p className="mt-4 flex-1 text-sm font-medium leading-relaxed text-muted">
                      {project.description}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="border border-line px-2.5 py-1 text-[0.6rem] uppercase tracking-[0.12em] text-soft"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.article>
                )
              })}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <p className="py-20 text-center text-sm uppercase tracking-[0.16em] text-muted">
              No projects in this category yet.
            </p>
          )}
        </div>
      </section>

      {/* Cursor-follow project preview (pointer devices only) */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            key={hovered.title}
            aria-hidden="true"
            style={{ x: px, y: py }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none fixed left-0 top-0 z-40 hidden h-44 w-72 overflow-hidden rounded-xl border border-line md:block"
          >
            {hovered.image ? (
              <img
                src={hovered.image}
                alt=""
                className="media-mono h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center bg-graphite [background-image:linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:22px_22px]">
                {(() => {
                  const Icon = hovered.icon
                  return <Icon size={40} strokeWidth={1.25} className="text-white" />
                })()}
                <span className="mt-3 max-w-[80%] text-center text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-white/70">
                  {hovered.title}
                </span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  )
}
