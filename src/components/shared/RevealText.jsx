import { Fragment } from 'react'
import { motion } from 'framer-motion'

/**
 * RevealText
 * ----------
 * Editorial mask-reveal for big headlines: each word sits in an
 * overflow-hidden box and rises into place with a staggered ease, giving
 * serif display type a luxury "settle" entrance. Words remain individually
 * wrappable, so multi-line headlines reveal line-by-line naturally.
 *
 * Plays on mount by default, or when scrolled into view (`inView`). Framer
 * automatically neutralises the motion for reduced-motion users.
 *
 * Props:
 *  - text:   the headline string
 *  - as:     tag for the wrapper (default 'h1')
 *  - inView: trigger on scroll-into-view instead of on mount
 *  - className: styling for the wrapper
 */
const wrap = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.08 } },
}
const word = {
  hidden: { y: '115%' },
  show: { y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

export default function RevealText({ text, as = 'h1', inView = false, className = '' }) {
  const MotionTag = motion[as] || motion.h1
  const words = String(text).split(' ')

  return (
    <MotionTag
      className={className}
      variants={wrap}
      initial="hidden"
      {...(inView
        ? { whileInView: 'show', viewport: { once: true, margin: '-80px' } }
        : { animate: 'show' })}
    >
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className="inline-block overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em]">
            <motion.span variants={word} className="inline-block">
              {w}
            </motion.span>
          </span>
          {i < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </MotionTag>
  )
}
