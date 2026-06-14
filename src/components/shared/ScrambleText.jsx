import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * ScrambleText
 * ------------
 * Decodes/"matrix-scrambles" its text: characters are randomized and then
 * resolve left-to-right into the final string over `duration` ms. Runs on
 * hover, and optionally once on mount (`playOnMount`) for a decode-in entrance
 * — skipped for reduced-motion users. Driven by a single requestAnimationFrame
 * loop (cancelled on unmount), so it's cheap and won't disturb scrolling.
 *
 * Props:
 *  - text:        the final string to resolve to
 *  - duration:    scramble length in ms (default 500)
 *  - playOnMount: decode in once when first mounted (default false)
 *  - className / as: styling + element tag (default <span>)
 */
const GLYPHS = '!<>-_\\/[]{}=+*^?#%$&@01'

export default function ScrambleText({
  text,
  duration = 500,
  playOnMount = false,
  className = '',
  as: Tag = 'span',
  ...rest
}) {
  const [display, setDisplay] = useState(text)
  const [prevText, setPrevText] = useState(text)
  const frame = useRef(0)

  // Keep the visible text in sync if the source `text` prop changes. Done
  // during render (React's "adjust state on prop change" pattern) rather than
  // in an effect, so it never triggers a cascading re-render.
  if (text !== prevText) {
    setPrevText(text)
    setDisplay(text)
  }

  const run = useCallback(() => {
    const start = performance.now()
    const len = text.length

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      const revealed = Math.floor(progress * len)
      let out = ''
      for (let i = 0; i < len; i++) {
        if (i < revealed || text[i] === ' ') out += text[i]
        else out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
      }
      setDisplay(out)
      if (progress < 1) frame.current = requestAnimationFrame(step)
      else setDisplay(text)
    }

    cancelAnimationFrame(frame.current)
    frame.current = requestAnimationFrame(step)
  }, [text, duration])

  // Optional decode-in on mount (respecting reduced-motion).
  useEffect(() => {
    if (!playOnMount) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    run()
  }, [playOnMount, run])

  useEffect(() => () => cancelAnimationFrame(frame.current), [])

  return (
    <Tag className={className} onMouseEnter={run} data-cursor="hover" {...rest}>
      {display}
    </Tag>
  )
}
