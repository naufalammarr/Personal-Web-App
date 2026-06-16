import { motion } from 'framer-motion'
import { Brain, Cpu, Layout, Mic, Server, Workflow } from 'lucide-react'
import PageTransition from '../components/shared/PageTransition'
import StatCard from '../components/shared/StatCard'
import RevealText from '../components/shared/RevealText'
import foto from '../assets/Foto.jpeg'
import certFundamentals from '../assets/AI Fundamentals.webp'
import certBrainstorming from '../assets/AI for Brainstorming and Planning.webp'
import certContent from '../assets/AI for Content Creation.webp'
import certResearch from '../assets/AI for Research and Insights.webp'
import certWriting from '../assets/AI for Writing and Communicating.webp'

/**
 * About
 * -----
 * Background, education, and software-engineering interests in the
 * Apple-monochrome system: extrabold sentence-case headings, eyebrows, and
 * card surfaces that alternate black → parchment → white → parchment.
 */
const skills = [
  {
    icon: Layout,
    title: 'Frontend',
    desc: 'Building accessible, responsive interfaces with a focus on performance and clean component architecture.',
    tags: ['React', 'Next.js', 'JavaScript', 'Tailwind CSS'],
    level: 100,
  },
  {
    icon: Server,
    title: 'Backend',
    desc: 'Designing REST APIs and relational data models that scale cleanly and stay maintainable.',
    tags: ['Node.js', 'Express', 'MySQL', 'PostgreSQL'],
    level: 90,
  },
  {
    icon: Workflow,
    title: 'DevOps',
    desc: 'Containerizing applications and managing reliable server deployments end to end.',
    tags: ['Docker', 'Containerization', 'Server Deployment'],
    level: 85,
  },
]

const interests = [
  {
    icon: Brain,
    title: 'Software Engineering Patterns',
    desc: 'Applying proven design patterns and clean-architecture principles to keep codebases scalable and testable.',
  },
  {
    icon: Cpu,
    title: 'Low-Code Optimization',
    desc: 'Researching low-code development workflows, including the DCGen method, to accelerate delivery without sacrificing quality.',
  },
  {
    icon: Mic,
    title: 'Applied AI',
    desc: 'Exploring Voice Cloning / RVC, Text-to-Speech, and Image Generation to build expressive, AI-powered features.',
  },
]

const education = [
  {
    period: '2021 — Present',
    title: 'Undergraduate, Informatics / Software Engineering',
    place: 'Completing final-year research (Tugas Akhir)',
  },
  {
    period: 'Focus',
    title: 'Fullstack Web Development',
    place: 'Self-driven projects, internships & real-world systems',
  },
]

const certificates = [
  { image: certFundamentals, title: 'AI Fundamentals' },
  { image: certBrainstorming, title: 'AI for Brainstorming and Planning' },
  { image: certResearch, title: 'AI for Research and Insights' },
  { image: certContent, title: 'AI for Content Creation' },
  { image: certWriting, title: 'AI for Writing and Communicating' },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

export default function About() {
  return (
    <PageTransition>
      {/* Intro */}
      <section data-tone="dark" className="surface-black border-b border-line px-6 pb-16 pt-36 sm:px-10">
        <div className="mx-auto grid max-w-5xl items-center gap-12 lg:grid-cols-[1fr_auto]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="eyebrow">About</p>
            <RevealText
              as="h1"
              text="Engineer at heart, student by passion"
              className="display-serif mt-6 max-w-xl text-4xl text-ink sm:text-6xl"
            />
            <p className="mt-8 max-w-xl text-lg font-medium leading-relaxed text-muted">
              I&apos;m Naufal Ammar Zaidan — a fullstack developer and undergraduate
              student based in Bandung / Jakarta. I&apos;m currently finishing my
              final-year research (Tugas Akhir) while building real-world web
              applications. I care deeply about clean code, thoughtful architecture,
              and shipping products that feel fast and intentional.
            </p>
          </motion.div>

          {/* Portrait in a liquid-glass frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="glass mx-auto w-fit rounded-[1.6rem] p-2.5 lg:mx-0"
          >
            <img
              src={foto}
              alt="Naufal Ammar Zaidan"
              className="media-mono media-hover-color h-80 w-64 rounded-[1.15rem] object-cover object-top sm:h-96 sm:w-72"
            />
          </motion.div>
        </div>
      </section>

      {/* Education */}
      <section data-tone="light" className="surface-parchment border-b border-line px-6 py-16 sm:px-10">
        <div className="mx-auto max-w-5xl">
          <p className="eyebrow mb-8">Education &amp; Journey</p>
          <div className="grid gap-4 sm:grid-cols-2">
            {education.map((edu, i) => (
              <motion.div
                key={edu.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="glass-card p-8"
              >
                <span className="eyebrow !text-[0.65rem]">{edu.period}</span>
                <h3 className="mt-3 text-xl font-extrabold tracking-tight text-ink">
                  {edu.title}
                </h3>
                <p className="mt-2 text-sm font-medium text-muted">{edu.place}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section data-tone="light" className="surface-white border-b border-line px-6 py-16 sm:px-10">
        <div className="mx-auto max-w-5xl">
          <p className="eyebrow mb-2">Technical Skills</p>
          <p className="mb-10 text-sm font-medium text-muted">
            The stack I use to take products from idea to deployment.
          </p>
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="grid gap-4 md:grid-cols-3"
          >
            {skills.map((skill) => (
              <motion.div key={skill.title} variants={item}>
                <StatCard {...skill} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Interests */}
      <section data-tone="light" className="surface-parchment px-6 py-16 sm:px-10">
        <div className="mx-auto max-w-5xl">
          <p className="eyebrow mb-2">Technical Interests</p>
          <p className="mb-10 text-sm font-medium text-muted">
            The topics I love exploring beyond day-to-day development.
          </p>
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="grid gap-4 md:grid-cols-3"
          >
            {interests.map(({ icon: Icon, title, desc }) => (
              <motion.div
                key={title}
                variants={item}
                whileHover={{ y: -6 }}
                className="glass-card p-8"
              >
                <Icon size={22} strokeWidth={1.5} className="mb-5 text-ink" />
                <h3 className="text-lg font-extrabold tracking-tight text-ink">
                  {title}
                </h3>
                <p className="mt-3 text-sm font-medium leading-relaxed text-muted">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Certifications */}
      <section data-tone="light" className="surface-white px-6 py-16 sm:px-10">
        <div className="mx-auto max-w-5xl">
          <p className="eyebrow mb-2">Certifications</p>
          <p className="mb-10 text-sm font-medium text-muted">
            Google AI Essentials — credentials earned through Coursera.
          </p>
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {certificates.map(({ image, title }) => (
              <motion.figure
                key={title}
                variants={item}
                whileHover={{ y: -6 }}
                className="glass-card overflow-hidden p-2.5"
              >
                <img
                  src={image}
                  alt={`${title} certificate — Google AI Essentials`}
                  loading="lazy"
                  className="media-mono media-hover-color aspect-[4/3] w-full rounded-[0.9rem] object-cover"
                />
                <figcaption className="px-3 pb-2 pt-4 text-sm font-extrabold tracking-tight text-ink">
                  {title}
                </figcaption>
              </motion.figure>
            ))}
          </motion.div>
        </div>
      </section>
    </PageTransition>
  )
}
