/**
 * sound.js
 * --------
 * Ultra-light UI sound effects synthesized with the pure Web Audio API —
 * no external audio files, so playback is instant with zero network cost.
 *
 * Exposes two short, soft cues plus a global mute toggle:
 *   - playHover() : a thin upward "woosh" for hovering links / buttons
 *   - playClick() : a tactile "pop" for clicks / filter changes
 *
 * The AudioContext is created lazily and resumed on demand (browsers block
 * audio until a user gesture), and mute state persists in localStorage.
 */

let audioCtx = null
let enabled = true

// Restore persisted mute preference.
try {
  const saved = localStorage.getItem('sfx-enabled')
  if (saved !== null) enabled = saved === '1'
} catch {
  /* localStorage unavailable — keep default */
}

function getCtx() {
  if (typeof window === 'undefined') return null
  const AC = window.AudioContext || window.webkitAudioContext
  if (!AC) return null
  if (!audioCtx) audioCtx = new AC()
  if (audioCtx.state === 'suspended') audioCtx.resume()
  return audioCtx
}

export function isSoundEnabled() {
  return enabled
}

export function setSoundEnabled(value) {
  enabled = !!value
  try {
    localStorage.setItem('sfx-enabled', enabled ? '1' : '0')
  } catch {
    /* ignore */
  }
  // Touching the context inside the toggle click satisfies the gesture rule.
  if (enabled) getCtx()
}

// Throttle hover sounds so rapid pointer movement can't stack oscillators.
let lastHover = 0

export function playHover() {
  if (!enabled) return
  const now = performance.now()
  if (now - lastHover < 70) return
  lastHover = now

  const ctx = getCtx()
  if (!ctx) return
  const t = ctx.currentTime

  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.type = 'sine'
  osc.frequency.setValueAtTime(560, t)
  osc.frequency.exponentialRampToValueAtTime(940, t + 0.07)
  gain.gain.setValueAtTime(0.0001, t)
  gain.gain.exponentialRampToValueAtTime(0.03, t + 0.012)
  gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.13)
  osc.connect(gain).connect(ctx.destination)
  osc.start(t)
  osc.stop(t + 0.14)
}

export function playClick() {
  if (!enabled) return
  const ctx = getCtx()
  if (!ctx) return
  const t = ctx.currentTime

  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.type = 'triangle'
  osc.frequency.setValueAtTime(440, t)
  osc.frequency.exponentialRampToValueAtTime(170, t + 0.08)
  gain.gain.setValueAtTime(0.0001, t)
  gain.gain.exponentialRampToValueAtTime(0.08, t + 0.005)
  gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.15)
  osc.connect(gain).connect(ctx.destination)
  osc.start(t)
  osc.stop(t + 0.16)
}
