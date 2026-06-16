/**
 * SurfaceFade
 * -----------
 * A full-width gradient band that smoothly blends one surface tone into the
 * next, replacing the hard hairline divider between stacked sections. The
 * `from` colour must match the BOTTOM of the section above and `to` the TOP of
 * the section below, so each page reads as one continuous white → black → white
 * flow while section content stays on solid ground for legibility.
 *
 * The blend is *eased* (smootherstep) rather than linear: the colour barely
 * moves near each end and changes fastest in the middle, so the band melts
 * seamlessly into the flat sections above/below with no perceptible junction.
 * Per-channel interpolation across many stops also keeps grayscale banding low.
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

const hexToRgb = (hex) => {
  const n = parseInt(hex.slice(1), 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

// Ken Perlin's smootherstep — zero first AND second derivative at both ends,
// so the fade eases in and out with no visible seam.
const smootherstep = (t) => t * t * t * (t * (t * 6 - 15) + 10)

const STOPS = 16

// Build an eased, many-stop vertical gradient between two tones (memoised per
// from→to pair so it isn't recomputed on every render).
const cache = {}
const easedGradient = (from, to) => {
  const key = `${from}>${to}`
  if (cache[key]) return cache[key]

  const a = hexToRgb(TONE[from])
  const b = hexToRgb(TONE[to])
  const parts = []
  for (let i = 0; i <= STOPS; i += 1) {
    const p = i / STOPS
    const e = smootherstep(p)
    const r = Math.round(a[0] + (b[0] - a[0]) * e)
    const g = Math.round(a[1] + (b[1] - a[1]) * e)
    const bl = Math.round(a[2] + (b[2] - a[2]) * e)
    parts.push(`rgb(${r}, ${g}, ${bl}) ${(p * 100).toFixed(2)}%`)
  }
  cache[key] = `linear-gradient(to bottom, ${parts.join(', ')})`
  return cache[key]
}

export default function SurfaceFade({ from, to, className = '' }) {
  return (
    <div
      aria-hidden="true"
      className={`h-44 w-full sm:h-64 ${className}`}
      style={{ backgroundImage: easedGradient(from, to) }}
    />
  )
}
