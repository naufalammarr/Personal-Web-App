import { Contrast } from 'lucide-react'

/**
 * ThemeToggle
 * -----------
 * Flips the entire monochrome site black <-> white. Because the UI is pure
 * grayscale, App applies a single `filter: invert(1)` to the root — an exact
 * tone swap. Fixed at bottom-left, mirroring the SoundToggle on the right.
 *
 * Props:
 *  - inverted: current state (for the aria label)
 *  - onToggle: flip handler, called with the button's centre (x, y) so App can
 *    originate the circular view-transition reveal from here
 */
export default function ThemeToggle({ inverted, onToggle }) {
  const handleClick = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    onToggle(r.left + r.width / 2, r.top + r.height / 2)
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={inverted ? 'Reset colours' : 'Invert colours'}
      aria-pressed={inverted}
      className="fixed bottom-5 left-5 z-50 inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#d2d2d7] bg-white/80 text-[#1d1d1f] backdrop-blur-md transition-colors hover:bg-white hover:text-black"
    >
      <Contrast size={17} />
    </button>
  )
}
