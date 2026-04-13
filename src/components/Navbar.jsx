import { useState } from 'react'

const navLinks = [
  { label: 'Home', href: '#Home', active: true },
  { label: 'Features', href: '#features' },
  { label: 'Free resources', href: 'https://learnenglish.britishcouncil.org/free-resources/vocabulary' },
  { label: 'About', href: '#' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-slate-900/10 shadow-sm">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-6 h-20">

        {/* Logo */}
        <div className="text-xl font-black tracking-tighter text-primary font-headline">
          AGINTIC AI TUTOR
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={
                link.active
                  ? 'font-headline font-bold tracking-tight text-primary border-b-2 border-primary pb-1'
                  : 'font-headline font-bold tracking-tight text-secondary hover:text-on-surface transition-opacity duration-200'
              }
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA + Hamburger */}
        <div className="flex items-center space-x-4">
          <a
            href="#features"
            className="bg-gradient-to-br from-primary to-primary-container text-white px-6 py-2.5 rounded-full font-semibold active:scale-90 transition-transform hover:opacity-90"
          >
            Get Started
          </a>
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
            <a
              key={link.label}
              href={link.href}
              className={`block py-2 font-headline font-bold tracking-tight ${
                link.active ? 'text-primary' : 'text-secondary hover:text-on-surface'
              }`}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}
