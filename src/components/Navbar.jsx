import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const navLinks = [
  { label: 'Home', to: '/' },
  {
    label: 'Features',
    children: [
      { label: 'Writing',  to: '/writing-module' },
      { label: 'Speaking', to: '/speaking-module' },
    ]
  },
  { label: 'Free resources', href: 'https://learnenglish.britishcouncil.org/free-resources/vocabulary' },
  { label: 'About Us', to: '/about-us' },
]

function NavLink({ link, className, onClick }) {
  if (link.to) {
    return <Link to={link.to} className={className} onClick={onClick}>{link.label}</Link>
  }
  return <a href={link.href} className={className} onClick={onClick}>{link.label}</a>
}

function DropdownItem({ link, onClick }) {
  return (
    <Link
      to={link.to}
      onClick={onClick}
      className="flex items-center gap-2 px-4 py-2.5 text-sm font-headline font-bold text-secondary hover:text-primary hover:bg-surface-container transition-colors"
    >
      {link.label}
    </Link>
  )
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [featuresOpen, setFeaturesOpen] = useState(false)
  const [mobileFeaturesOpen, setMobileFeaturesOpen] = useState(false)
  const dropdownRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setFeaturesOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

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
          {navLinks.map((link) =>
            link.children ? (
              <div key={link.label} className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setFeaturesOpen(!featuresOpen)}
                  className="flex items-center gap-1 font-headline font-bold tracking-tight text-secondary hover:text-on-surface transition-colors duration-200"
                >
                  {link.label}
                  <span className="material-symbols-outlined text-base" style={{ fontSize: '18px' }}>
                    {featuresOpen ? 'expand_less' : 'expand_more'}
                  </span>
                </button>
                {featuresOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-40 bg-white rounded-xl shadow-lg border border-slate-900/10 overflow-hidden">
                    {link.children.map((child) => (
                      <DropdownItem
                        key={child.label}
                        link={child}
                        onClick={() => setFeaturesOpen(false)}
                      />
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                key={link.label}
                link={link}
                className="font-headline font-bold tracking-tight text-secondary hover:text-on-surface transition-opacity duration-200"
              />
            )
          )}
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
          {navLinks.map((link) =>
            link.children ? (
              <div key={link.label}>
                <button
                  onClick={() => setMobileFeaturesOpen(!mobileFeaturesOpen)}
                  className="flex items-center gap-1 w-full py-2 font-headline font-bold tracking-tight text-secondary hover:text-on-surface"
                >
                  {link.label}
                  <span className="material-symbols-outlined text-base" style={{ fontSize: '18px' }}>
                    {mobileFeaturesOpen ? 'expand_less' : 'expand_more'}
                  </span>
                </button>
                {mobileFeaturesOpen && (
                  <div className="pl-4 space-y-1">
                    {link.children.map((child) => (
                      <Link
                        key={child.label}
                        to={child.to}
                        className="block py-1.5 font-headline font-semibold text-sm text-secondary hover:text-primary"
                        onClick={() => { setMobileOpen(false); setMobileFeaturesOpen(false) }}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                key={link.label}
                link={link}
                className="block py-2 font-headline font-bold tracking-tight text-secondary hover:text-on-surface"
                onClick={() => setMobileOpen(false)}
              />
            )
          )}
        </div>
      )}
    </nav>
  )
}
