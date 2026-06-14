import { Link } from 'react-router-dom'
import { Mail, MapPin } from 'lucide-react'

/**
 * Brand icons (GitHub / LinkedIn / Instagram)
 * -------------------------------------------
 * Lucide removed its brand icons, so we provide lightweight inline SVGs.
 * They accept a `size` prop and use `currentColor` to match Lucide's API,
 * so they drop into the same markup as the other icons.
 */
function GithubIcon({ size = 18, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.3-1.8-1.3-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .5Z" />
    </svg>
  )
}

function LinkedinIcon({ size = 18, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  )
}

function InstagramIcon({ size = 18, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37Z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

/**
 * Footer
 * ------
 * Site footer with brand blurb, quick navigation, social links, and a
 * copyright line. Fully responsive: stacks on mobile, spreads into
 * columns on larger screens.
 */
const socials = [
  { href: 'https://github.com/naufalammarr', label: 'GitHub', icon: GithubIcon },
  {
    href: 'https://www.linkedin.com/in/naufal-ammar-zaidan/',
    label: 'LinkedIn',
    icon: LinkedinIcon,
  },
  {
    href: 'https://www.instagram.com/naufalammaarr/',
    label: 'Instagram',
    icon: InstagramIcon,
  },
  { href: 'mailto:naufalammarz04@gmail.com', label: 'Email', icon: Mail },
]

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/services', label: 'Services' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="surface-parchment border-t border-line">
      <div className="mx-auto max-w-6xl px-6 py-12 sm:px-10">
        <div className="flex flex-col gap-12 md:flex-row md:justify-between">
          {/* Brand */}
          <div className="max-w-sm">
            <Link
              to="/"
              className="font-display text-lg font-extrabold tracking-[0.22em] text-ink"
            >
              NAZ
            </Link>
            <p className="mt-5 text-sm font-medium leading-relaxed text-muted">
              Fullstack Developer &amp; Undergraduate Student building modern,
              performant web applications — from frontend polish to deployment.
            </p>
            <p className="mt-5 inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.18em] text-muted">
              <MapPin size={14} />
              Bandung / Jakarta, Indonesia
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="eyebrow mb-5">Navigation</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="link-underline text-sm font-medium text-muted transition-colors hover:text-ink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h4 className="eyebrow mb-5">Connect</h4>
            <div className="flex gap-3">
              {socials.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-ink hover:text-ink"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-line pt-6 text-xs font-medium text-muted sm:flex-row">
          <p>© {year} Naufal Ammar Zaidan</p>
          <p>Built with React · Tailwind · Framer Motion</p>
        </div>
      </div>
    </footer>
  )
}
