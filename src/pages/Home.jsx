import { useContext, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { PageScrollContext } from '../components/shared/PageScrollContext'
import {
  ArrowRight,
  Boxes,
  CheckCircle2,
  Database,
  GitBranch,
  Layers,
  Loader2,
  Mail,
  MapPin,
  Send,
  TriangleAlert,
} from 'lucide-react'
import emailjs from '@emailjs/browser'
import PageTransition from '../components/shared/PageTransition'
import KpiCardShared from '../components/shared/KpiCardShared'
import RevealText from '../components/shared/RevealText'
import MagneticButton from '../components/shared/MagneticButton'
import ConfettiBurst from '../components/shared/ConfettiBurst'
import SurfaceFade from '../components/shared/SurfaceFade'

// EmailJS credentials, read from Vite env vars (see .env / .env.example).
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

/**
 * Home
 * ----
 * Landing page in the Apple-monochrome system: a black title-card hero, a
 * white KPI band, a graphite tech-stack band, and a parchment contact
 * section (EmailJS). Surfaces alternate museum-gallery style; no shadows or
 * gradients.
 */
const kpis = [
  { icon: Boxes, value: '15', suffix: '+', label: 'Projects shipped' },
  { icon: GitBranch, value: '3', suffix: 'yr', label: 'Building for the web' },
  { icon: Layers, value: '12', suffix: '+', label: 'Technologies' },
  { icon: Database, value: '99', suffix: '%', label: 'Deployment uptime' },
]

const stack = [
  'React',
  'Next.js',
  'JavaScript',
  'Tailwind CSS',
  'Node.js',
  'Express',
  'PostgreSQL',
  'MySQL',
  'Docker',
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

export default function Home() {
  // Hero parallax — drift the title card up and fade it as the page scrolls,
  // read from PageTransition's internal scroll container. Disabled for
  // reduced-motion users.
  const reduced = useReducedMotion()
  const scrollContainer = useContext(PageScrollContext)
  const heroRef = useRef(null)
  const { scrollYProgress: heroProgress } = useScroll({
    container: scrollContainer || undefined,
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const heroY = useTransform(heroProgress, [0, 1], reduced ? [0, 0] : [0, -90])
  const heroOpacity = useTransform(heroProgress, [0, 0.85], reduced ? [1, 1] : [1, 0])

  // Controlled contact form state + lightweight client-side validation.
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [sendError, setSendError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const validate = () => {
    const next = {}
    if (!form.name.trim()) next.name = 'Please enter your name.'
    if (!form.email.trim()) next.email = 'Please enter your email.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = 'Please enter a valid email address.'
    if (!form.message.trim()) next.message = 'Please enter a message.'
    return next
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSendError('')

    const next = validate()
    if (Object.keys(next).length > 0) {
      setErrors(next)
      return
    }

    // Guard against missing configuration so failures are obvious.
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      setSendError(
        'Email service is not configured yet. Please add your EmailJS keys to the .env file.',
      )
      return
    }

    setSending(true)
    try {
      // Send the message straight from the browser via EmailJS — no backend
      // and no mail client required. The keys here must match the variables
      // defined in your EmailJS email template.
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          reply_to: form.email,
          message: form.message,
        },
        { publicKey: EMAILJS_PUBLIC_KEY },
      )
      setSent(true)
    } catch (err) {
      console.error('EmailJS send failed:', err)
      setSendError('Something went wrong while sending. Please try again or email me directly.')
    } finally {
      setSending(false)
    }
  }

  // Shared classes for the text inputs / textarea.
  const fieldClass =
    'w-full rounded-lg border bg-field px-4 py-3 text-sm font-medium text-ink placeholder:text-muted outline-none transition-colors focus:border-ink'

  return (
    <PageTransition>
      {/* Hero — title card */}
      <section
        ref={heroRef}
        data-tone="dark"
        className="surface-black flex min-h-screen flex-col items-center justify-center px-6 py-32 text-center"
      >
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          style={{ y: heroY, opacity: heroOpacity }}
          className="flex flex-col items-center"
        >
          <motion.span variants={item} className="eyebrow">
            Fullstack Developer · Bandung / Jakarta
          </motion.span>

          <RevealText
            as="h1"
            text="Naufal Ammar Zaidan"
            className="display-serif mt-8 max-w-4xl text-5xl text-ink sm:text-7xl"
          />

          <motion.p
            variants={item}
            className="mt-8 max-w-xl text-lg font-medium leading-relaxed text-muted"
          >
            Undergraduate student finishing final-year research, building
            end-to-end products with React, Node.js, and modern DevOps.
          </motion.p>

          <motion.div variants={item} className="mt-10">
            <MagneticButton>
              <Link to="/projects" className="btn-primary">
                View Work
                <ArrowRight size={16} strokeWidth={2} />
              </Link>
            </MagneticButton>
          </motion.div>
        </motion.div>
      </section>

      <SurfaceFade from="black" to="white" />

      {/* KPI band */}
      <section data-tone="light" className="surface-white px-6 py-24 sm:px-10">
        <div className="mx-auto max-w-6xl">
          <p className="eyebrow mb-10">By the numbers</p>
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            className="grid grid-cols-2 gap-4 lg:grid-cols-4"
          >
            {kpis.map((kpi) => (
              <motion.div key={kpi.label} variants={item}>
                <KpiCardShared {...kpi} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <SurfaceFade from="white" to="graphite" />

      {/* Tech stack */}
      <section data-tone="dark" className="surface-graphite px-6 py-24 sm:px-10">
        <div className="mx-auto max-w-6xl">
          <p className="eyebrow mb-8">Tooling</p>
          <div className="marquee -mx-6 sm:-mx-10">
            <div className="marquee-track">
              {[0, 1].map((seq) => (
                <span key={seq} className="marquee-seq" aria-hidden={seq === 1}>
                  {stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-6 text-2xl font-extrabold tracking-tight text-muted transition-colors hover:text-ink sm:text-3xl"
                    >
                      {tech}
                    </span>
                  ))}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SurfaceFade from="graphite" to="parchment" />

      {/* Contact */}
      <section id="contact" data-tone="light" className="surface-parchment scroll-mt-24 px-6 py-24 sm:px-10">
        <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-2">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
          >
            <p className="eyebrow">Get in touch</p>
            <RevealText
              as="h2"
              inView
              text="Let’s build something"
              className="display-serif mt-6 text-4xl text-ink sm:text-5xl"
            />
            <p className="mt-6 max-w-md text-base font-medium leading-relaxed text-muted">
              Have a project, a question, or just want to say hi? Send a message
              and I&apos;ll get back to you.
            </p>

            <div className="mt-10 space-y-4">
              <a
                href="mailto:naufalammarz04@gmail.com"
                className="inline-flex w-fit items-center gap-3 text-sm font-medium text-soft transition-colors hover:text-ink"
              >
                <Mail size={16} className="text-muted" />
                <span className="link-underline">naufalammarz04@gmail.com</span>
              </a>
              <p className="flex items-center gap-3 text-sm font-medium text-soft">
                <MapPin size={16} className="text-muted" />
                Bandung / Jakarta, Indonesia
              </p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-card p-6 sm:p-8"
          >
            {sent ? (
              <div className="relative flex h-full flex-col items-center justify-center py-10 text-center">
                <ConfettiBurst />
                <motion.div
                  initial={{ scale: 0, rotate: -30 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', damping: 12, stiffness: 260 }}
                  className="mb-5"
                >
                  <CheckCircle2 size={36} className="text-ink" strokeWidth={1.75} />
                </motion.div>
                <h3 className="text-2xl font-extrabold tracking-tight text-ink">
                  Message sent
                </h3>
                <p className="mt-3 max-w-xs text-sm font-medium text-muted">
                  Thanks, {form.name}. I&apos;ll reply to{' '}
                  <span className="text-soft">{form.email}</span> soon.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setForm({ name: '', email: '', message: '' })
                    setSent(false)
                    setSendError('')
                  }}
                  className="btn-secondary mt-7"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="eyebrow mb-2 block">
                    Name
                  </label>
                  <div className="glow-field">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className={`${fieldClass} ${errors.name ? 'border-ink' : 'border-line'}`}
                    />
                  </div>
                  {errors.name && <p className="mt-1.5 text-xs text-soft">{errors.name}</p>}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="eyebrow mb-2 block">
                    Email
                  </label>
                  <div className="glow-field">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className={`${fieldClass} ${errors.email ? 'border-ink' : 'border-line'}`}
                    />
                  </div>
                  {errors.email && <p className="mt-1.5 text-xs text-soft">{errors.email}</p>}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="eyebrow mb-2 block">
                    Message
                  </label>
                  <div className="glow-field">
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project..."
                      className={`${fieldClass} resize-none ${
                        errors.message ? 'border-ink' : 'border-line'
                      }`}
                    />
                  </div>
                  {errors.message && (
                    <p className="mt-1.5 text-xs text-soft">{errors.message}</p>
                  )}
                </div>

                {sendError && (
                  <div className="flex items-start gap-2.5 border border-line px-4 py-3 text-xs text-soft">
                    <TriangleAlert size={15} className="mt-0.5 shrink-0" />
                    <span>{sendError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={sending}
                  className="btn-primary w-full disabled:opacity-60"
                >
                  {sending ? (
                    <>
                      Sending
                      <Loader2 size={15} className="animate-spin" />
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send size={15} />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </PageTransition>
  )
}
