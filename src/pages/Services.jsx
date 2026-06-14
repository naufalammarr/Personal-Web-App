import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Cloud, Code2, Database, Gauge, Layout, Server } from 'lucide-react'
import PageTransition from '../components/shared/PageTransition'
import MagneticButton from '../components/shared/MagneticButton'
import RevealText from '../components/shared/RevealText'

/**
 * Services
 * --------
 * Technical services in the Apple-monochrome system: a black header, a
 * parchment grid of white cards with extrabold sentence-case titles, and a
 * black closing band with a single primary pill CTA.
 */
const services = [
  {
    icon: Layout,
    title: 'Frontend Development',
    desc: 'Pixel-perfect, responsive interfaces built with modern React and Tailwind CSS.',
    points: [
      'React & Next.js applications',
      'Responsive, mobile-first design',
      'Reusable component systems',
      'Smooth animations & micro-interactions',
    ],
  },
  {
    icon: Server,
    title: 'Backend Development',
    desc: 'Robust APIs and data models that power your product reliably at scale.',
    points: [
      'REST APIs with Node.js & Express',
      'Relational schema design',
      'Authentication & authorization',
      'Third-party integrations',
    ],
  },
  {
    icon: Database,
    title: 'Database Design',
    desc: 'Well-structured, performant data layers built for growth and integrity.',
    points: [
      'MySQL & PostgreSQL modeling',
      'Query optimization',
      'Migrations & seeding',
      'Data integrity & backups',
    ],
  },
  {
    icon: Cloud,
    title: 'DevOps & Deployment',
    desc: 'Containerized, reproducible deployments so your app ships with confidence.',
    points: [
      'Docker & containerization',
      'Server provisioning & deployment',
      'Environment configuration',
      'Monitoring & maintenance',
    ],
  },
  {
    icon: Code2,
    title: 'Fullstack Solutions',
    desc: 'End-to-end products built from a single, cohesive engineering vision.',
    points: [
      'Idea to production delivery',
      'Clean, modular architecture',
      'Automation systems',
      'Dashboards & internal tools',
    ],
  },
  {
    icon: Gauge,
    title: 'Performance Optimization',
    desc: 'Faster load times and smoother experiences through careful tuning.',
    points: [
      'Bundle & asset optimization',
      'Rendering performance',
      'Lighthouse improvements',
      'Caching strategies',
    ],
  },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
}

export default function Services() {
  return (
    <PageTransition>
      <section data-tone="dark" className="surface-black border-b border-line px-6 pb-12 pt-36 sm:px-10">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="eyebrow">What I Offer</p>
            <RevealText
              as="h1"
              text="Services"
              className="display-serif mt-6 text-4xl text-ink sm:text-6xl"
            />
            <p className="mt-6 max-w-2xl text-lg font-medium text-muted">
              From a single component to a full production deployment — here&apos;s how
              I can help bring your product to life.
            </p>
          </motion.div>
        </div>
      </section>

      <section data-tone="light" className="surface-parchment px-6 py-16 sm:px-10">
        <div className="mx-auto max-w-6xl">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="grid gap-px bg-line md:grid-cols-2 lg:grid-cols-3"
          >
            {services.map(({ icon: Icon, title, desc, points }) => (
              <motion.div
                key={title}
                variants={item}
                whileHover={{ y: -6 }}
                className="flex h-full flex-col bg-card p-8 transition-colors hover:bg-card-hover"
              >
                <Icon size={24} strokeWidth={1.5} className="text-ink" />
                <h3 className="mt-6 text-lg font-extrabold tracking-tight text-ink">
                  {title}
                </h3>
                <p className="mt-3 text-sm font-medium leading-relaxed text-muted">{desc}</p>
                <ul className="mt-6 space-y-3 border-t border-line pt-5">
                  {points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-3 text-xs font-medium uppercase tracking-[0.08em] text-soft"
                    >
                      <span className="mt-1.5 h-px w-3 shrink-0 bg-muted" />
                      {point}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section data-tone="dark" className="surface-black border-t border-line px-6 py-24 text-center sm:px-10">
        <div className="mx-auto max-w-3xl">
          <RevealText
            as="h2"
            inView
            text="Ready to build something great?"
            className="display-serif text-3xl text-ink sm:text-5xl"
          />
          <p className="mx-auto mt-6 max-w-lg text-base font-medium text-muted">
            Tell me about your project and let&apos;s figure out the best way to ship it.
          </p>
          <div className="mt-10 flex justify-center">
            <MagneticButton>
              <Link to="/#contact" className="btn-primary">
                Start a Conversation
                <ArrowRight size={16} />
              </Link>
            </MagneticButton>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
