import { useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import { isSoundEnabled, playClick, setSoundEnabled } from '../../lib/sound'

/**
 * SoundToggle
 * -----------
 * A small fixed control to mute / unmute the UI sound effects. Persists via
 * lib/sound (localStorage). Clicking while enabling also unlocks the
 * AudioContext (counts as the required user gesture).
 */
export default function SoundToggle() {
  const [on, setOn] = useState(isSoundEnabled())

  const toggle = () => {
    const next = !on
    setOn(next)
    setSoundEnabled(next)
    if (next) playClick()
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={on ? 'Mute sound effects' : 'Enable sound effects'}
      className="fixed bottom-5 right-5 z-50 inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#d2d2d7] bg-white/80 text-[#1d1d1f] backdrop-blur-md transition-colors hover:bg-white hover:text-black"
    >
      {on ? <Volume2 size={17} /> : <VolumeX size={17} />}
    </button>
  )
}
