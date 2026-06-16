/**
 * SurfaceFade
 * -----------
 * A full-width gradient band that smoothly blends one surface tone into the
 * next, replacing the hard hairline divider between stacked sections. The
 * `from` colour must match the BOTTOM of the section above and `to` the TOP of
 * the section below, so each page reads as one continuous white → black → white
 * flow while section content stays on solid ground for legibility.
 *
 * Purely decorative (aria-hidden). Under the .invert-theme root filter it swaps
 * black ↔ white along with everything else, so no special-casing is needed.
 */
const TONE = {
  white: '#ffffff',
  parchment: '#f5f5f7',
  graphite: '#1d1d1f',
  black: '#000000',
}

export default function SurfaceFade({ from, to, className = '' }) {
  return (
    <div
      aria-hidden="true"
      className={`h-28 w-full sm:h-36 ${className}`}
      style={{ backgroundImage: `linear-gradient(to bottom, ${TONE[from]}, ${TONE[to]})` }}
    />
  )
}
