import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// Internal links use `to` (React Router), external links keep `href`
const navLinks = [
  { label: 'Home',           to: '/' },
  { label: 'Features',       href: '#features' },
  { label: 'Free resources', href: 'https://learnenglish.britishcouncil.org/free-resources/vocabulary' },
  { label: 'About Us',       to: '/about-us' },
]

function NavLink({ link, className, onClick }) {
  if (link.to) {
    return (
      <Link to={link.to} className={className} onClick={onClick}>
        {link.label}
      </Link>
    )
  }
  return (
    <a href={link.href} className={className} onClick={onClick}>
      {link.label}
    </a>
  )
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-slate-900/10 shadow-sm">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-6 h-20">

        {/* Logo */}
        <button
          onClick={() => navigate('/')}
          className="text-xl font-black tracking-tighter text-primary font-headline"
        >
          AGINTIC AI TUTOR
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.label}
              link={link}
              className="font-headline font-bold tracking-tight text-secondary hover:text-on-surface transition-opacity duration-200"
            />
          ))}
        </div>

        {/* CTA + Hamburger */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/auth')}
            className="bg-gradient-to-br from-primary to-primary-container text-white px-6 py-2.5 rounded-full font-semibold active:scale-90 transition-transform hover:opacity-90"
          >
            Get Started
          </button>
          <button
            className="md:hidden p-2 rounded-lg text-on-surface hover:bg-surface-container-low transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined">
              {mobileOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-slate-900/10 px-6 py-4 space-y-2">
          {navLinks.map((link) => (
            <NavLink
              key={link.label}
              link={link}
              className="block py-2 font-headline font-bold tracking-tight text-secondary hover:text-on-surface"
              onClick={() => setMobileOpen(false)}
            />
          ))}
        </div>
      )}
    </nav>
  )
}
