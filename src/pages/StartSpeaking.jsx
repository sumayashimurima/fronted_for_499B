import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const waveHeights = [16, 32, 20, 40, 12, 24, 48, 28, 36, 16, 8, 8, 8]

export default function StartSpeaking() {
  const navigate = useNavigate()
  const [activePart, setActivePart] = useState(0)

  const navItems = [
    { icon: 'filter_1',    label: 'Part 1',  index: 0, path: null },
    { icon: 'filter_2',    label: 'Part 2',  index: 1, path: null },
    { icon: 'filter_3',    label: 'Part 3',  index: 2, path: null },
    { icon: 'history',     label: 'Progress', index: 3, path: '/speaking-history' },
    { icon: 'home', label: 'Home',   index: 5, path: null },
    { icon: 'help_outline', label: 'Help',   index: 4, path: null },
    
  ]

  return (
    <div className="font-body text-on-surface overflow-hidden">
      <style>{`
        .mic-active {
          box-shadow: 0 0 0 0 rgba(182, 23, 34, 0.4);
          animation: mic-pulse 2s infinite;
        }
        @keyframes mic-pulse {
          0%   { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(182, 23, 34, 0.7); }
          70%  { transform: scale(1);    box-shadow: 0 0 0 20px rgba(182, 23, 34, 0); }
          100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(182, 23, 34, 0); }
        }
      `}</style>

      {/* ── Top Navbar ── */}
      <header className="bg-surface-container-lowest text-primary font-body tracking-tight flex justify-between items-center w-full px-8 h-16 fixed top-0 z-50"
        style={{ boxShadow: '0 1px 0 rgba(26,28,28,0.06)' }}>
        <button
          onClick={() => navigate('/speaking-module')}
          className="text-xl font-bold tracking-tighter text-primary hover:opacity-80 transition-opacity"
        >
          AGINTIC AI TUTOR
        </button>
        <div className="flex items-center gap-6">
          <span className="text-on-surface-variant hover:opacity-80 transition-opacity cursor-pointer text-sm">Explore</span>
          <span className="text-primary font-semibold hover:opacity-80 transition-opacity cursor-pointer text-sm">Test</span>
          <span className="material-symbols-outlined text-on-surface-variant cursor-pointer">account_circle</span>
        </div>
      </header>

      <div className="flex h-screen pt-16">

        {/* ── Left Sidebar ── */}
        <aside className="bg-surface-container-low h-screen w-64 fixed left-0 top-16 flex-col py-6 hidden md:flex">
          <div className="px-6 mb-8">
            <div className="text-lg font-black text-primary mb-1">IELTS Prep</div>
            <div className="text-xs font-medium text-on-surface-variant uppercase tracking-widest">Speaking Module</div>
          </div>
          <nav className="flex-1 space-y-1">
            {navItems.map((item) => (
              <div
                key={item.label}
                onClick={() => item.path ? navigate(item.path) : setActivePart(item.index)}
                className={`flex items-center gap-3 px-4 py-3 transition-colors duration-200 cursor-pointer ${
                  activePart === item.index
                    ? 'border-l-4 border-primary bg-surface-container-lowest text-on-surface'
                    : 'text-on-surface-variant hover:bg-surface-container'
                }`}
              >
                <span className={`material-symbols-outlined ${activePart === item.index ? 'text-primary' : ''}`}>
                  {item.icon}
                </span>
                <span className="text-sm font-medium">{item.label}</span>
              </div>
            ))}
          </nav>
        </aside>

        {/* ── Center Main Content ── */}
        <main className="md:ml-64 md:mr-80 flex-1 p-8 overflow-y-auto bg-surface">
          <div className="max-w-3xl mx-auto space-y-8">

            {/* Question Card */}
            <div
              className="bg-surface-container-lowest rounded-xl p-12 text-center flex flex-col items-center justify-center min-h-[320px]"
              style={{ boxShadow: '0 10px 30px rgba(26,28,28,0.06)' }}
            >
              <span className="text-primary font-bold text-xs uppercase tracking-[0.2em] mb-4">
                Part 1 Question
              </span>
              <h1 className="text-[2.75rem] leading-tight font-bold text-on-surface tracking-tight mb-6">
                Do you enjoy reading books?
              </h1>
              <p className="text-on-surface-variant text-lg">Answer naturally and clearly.</p>
            </div>

            {/* Waveform + Mic Section */}
            <div className="flex flex-col items-center gap-8 py-8">

              {/* Waveform bars */}
              <div className="flex items-end gap-1 h-12">
                {waveHeights.map((h, i) => (
                  <div
                    key={i}
                    className={`w-1 rounded-full ${i >= 10 ? 'bg-primary-fixed-dim' : 'bg-primary'}`}
                    style={{ height: `${h}px` }}
                  />
                ))}
              </div>

              {/* Mic button */}
              <div className="relative group">
                <button
                  className="mic-active w-20 h-20 rounded-full flex items-center justify-center text-white active:scale-90 transition-transform duration-200 z-10 relative"
                  style={{ background: 'linear-gradient(135deg, #b61722 0%, #da3437 100%)' }}
                >
                  <span
                    className="material-symbols-outlined text-4xl"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    mic
                  </span>
                </button>
              </div>

              {/* Recording label */}
              <div className="flex flex-col items-center">
                <span className="text-primary font-bold text-sm">Recording...</span>
                <span className="text-on-surface-variant text-xs mt-1">Tap to pause recording</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-center gap-4">
              <button className="px-8 py-3 bg-primary text-white font-bold rounded-xl hover:shadow-[0px_8px_24px_rgba(175,16,26,0.30)] active:scale-95 transition-all  flex items-center gap-2 group">
                Next Question
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </button>
              <button className="px-8 py-3 bg-surface-container-high text-on-surface font-bold rounded-xl hover:shadow-[0px_8px_24px_rgba(175,16,26,0.30)] active:scale-95 transition-all">
                Finish Test
              </button>
            </div>

          </div>
        </main>

        {/* ── Right Panel ── */}
        <aside className="w-80 fixed right-0 top-16 h-screen bg-surface-container-low p-6 space-y-6 hidden md:block overflow-y-auto">

          {/* Timer Card */}
          <div
            className="bg-surface-container-lowest rounded-xl p-6"
            style={{
              backdropFilter: 'blur(12px)',
              background: 'rgba(255,255,255,0.8)',
              boxShadow: '0 10px 30px rgba(26,28,28,0.04)',
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">
                Time Remaining
              </span>
              <span className="material-symbols-outlined text-on-surface-variant text-sm">schedule</span>
            </div>
            <div className="text-5xl font-black tracking-tighter text-on-surface">01:30</div>
            {/* Progress pills */}
            <div className="mt-8 flex gap-1">
              <div className="h-1.5 flex-1 bg-primary rounded-full" />
              <div className="h-1.5 flex-1 bg-surface-container-highest rounded-full" />
              <div className="h-1.5 flex-1 bg-surface-container-highest rounded-full" />
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-[10px] font-bold text-primary">Part 1</span>
              <span className="text-[10px] font-bold text-on-surface-variant">Part 2</span>
              <span className="text-[10px] font-bold text-on-surface-variant">Part 3</span>
            </div>
          </div>

          {/* Performance Card */}
          <div
            className="bg-surface-container-lowest rounded-xl p-6"
            style={{ boxShadow: '0 10px 30px rgba(26,28,28,0.04)' }}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">
                Est. Performance
              </span>
              <span className="material-symbols-outlined text-tertiary">insights</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-on-surface">6.5</span>
              <span className="text-sm font-medium text-on-surface-variant">Current Pace</span>
            </div>
            <div className="mt-4 p-3 bg-tertiary/5 rounded-lg" style={{ borderWidth: '1px', borderColor: 'rgba(0,103,101,0.1)' }}>
              <p className="text-[11px] leading-relaxed text-on-surface-variant">
                <span className="font-bold text-tertiary">Pro-tip:</span> Your fluency is good, but try to
                use more complex vocabulary in this section.
              </p>
            </div>
          </div>

          {/* Image placeholder */}
          <div className="rounded-xl overflow-hidden relative group">
            <div
              className="w-full h-48 bg-surface-container-high flex items-center justify-center"
              style={{ opacity: 0.4 }}
            >
              <span className="material-symbols-outlined text-4xl text-on-surface-variant">
                menu_book
              </span>
            </div>
            <div
              className="absolute inset-0 rounded-xl"
              style={{ background: 'linear-gradient(to top, rgba(243,243,243,0.9) 0%, transparent 100%)' }}
            />
          </div>

        </aside>
      </div>

      {/* ── Mobile Bottom Navigation ── */}
      <nav
        className="md:hidden fixed bottom-0 w-full z-50 rounded-t-3xl flex justify-around items-center px-4 pt-2 pb-4"
        style={{
          background: 'rgba(255,255,255,0.85)',
          backdropFilter: 'blur(16px)',
          boxShadow: '0 -10px 30px rgba(0,0,0,0.05)',
          borderTop: '1px solid rgba(243,243,243,0.8)',
        }}
      >
        <div className="flex flex-col items-center justify-center text-primary bg-primary/10 rounded-xl p-2 transition-transform active:scale-95">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>mic</span>
          <span className="text-[10px] font-bold uppercase mt-1">Test</span>
        </div>
        <div className="flex flex-col items-center justify-center text-on-surface-variant p-2 transition-transform active:scale-95">
          <span className="material-symbols-outlined">history</span>
          <span className="text-[10px] font-bold uppercase mt-1">History</span>
        </div>
        <div className="flex flex-col items-center justify-center text-on-surface-variant p-2 transition-transform active:scale-95">
          <span className="material-symbols-outlined">person</span>
          <span className="text-[10px] font-bold uppercase mt-1">Profile</span>
        </div>
        <div className="flex flex-col items-center justify-center text-on-surface-variant p-2 transition-transform active:scale-95">
          <span className="material-symbols-outlined">help</span>
          <span className="text-[10px] font-bold uppercase mt-1">Help</span>
        </div>
      </nav>
    </div>
  )
}
