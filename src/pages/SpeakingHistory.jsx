import { useNavigate } from 'react-router-dom'

const navItems = [
  { icon: 'filter_1', label: 'Part 1',  path: '/start-speaking' },
  { icon: 'filter_2', label: 'Part 2',  path: '/start-speaking' },
  { icon: 'filter_3', label: 'Part 3',  path: '/start-speaking' },
  { icon: 'history',  label: 'Progress', path: '/speaking-history', active: true },
  { icon: 'home', label: 'Home',    path: null },
  { icon: 'help_outline', label: 'Help', path: null },
]

const scoreCards = [
  { icon: 'speed',      label: 'Fluency & Cohesion', score: '7.0', desc: 'Strong flow with natural use of connective devices.' },
  { icon: 'menu_book',  label: 'Lexical Resource',   score: '6.0', desc: 'Good range but occasional errors in word choice.' },
  { icon: 'spellcheck', label: 'Grammar Range',      score: '6.5', desc: 'Mixed use of simple and complex structures.' },
]

export default function SpeakingHistory() {
  const navigate = useNavigate()

  return (
    <div className="font-body text-on-surface antialiased bg-surface min-h-screen">

      {/* ── Left Sidebar (desktop) ── */}
      <aside className="bg-surface-container-low h-screen w-64 fixed left-0 top-16 flex-col py-6 hidden md:flex">
        <div className="px-6 mb-8">
            <div className="text-lg font-black text-primary mb-1">IELTS Prep</div>
            <div className="text-xs font-medium text-on-surface-variant uppercase tracking-widest">Speaking Module</div>
          </div>

        <nav className="flex-1 space-y-1">
          {navItems.map((item) => (
            <div
              key={item.label}
              onClick={() => item.path && navigate(item.path)}
              className={`flex items-center gap-3 px-4 py-3 transition-colors duration-200 cursor-pointer ${
                item.active
                  ? 'border-l-4 border-primary bg-surface-container-lowest text-on-surface'
                  : 'text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              <span className={`material-symbols-outlined ${item.active ? 'text-primary' : ''}`}>
                {item.icon}
              </span>
              <span className="text-sm font-medium">{item.label}</span>
            </div>
          ))}
        </nav>

        {/* Profile card */}
        
        <div className="px-4 mt-auto">
          <div className="flex items-center gap-3 p-3 bg-surface-container-lowest rounded-xl">
            <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-on-surface-variant">person</span>
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold truncate">IELTS Prep</p>
              <p className="text-xs text-on-surface-variant truncate">Speaking Module</p>
            </div>
          </div>
        </div>
      </aside>

      {/* ── Top App Bar ── */}
      <header
        className="bg-surface-container-lowest text-primary font-body tracking-tight flex justify-between items-center w-full px-8 h-16 fixed top-0 z-50"
        style={{ boxShadow: '0 1px 0 rgba(26,28,28,0.06)' }}
      >
        <button
          onClick={() => navigate('/speaking-module')}
          className="text-xl font-bold tracking-tighter text-primary hover:opacity-80 transition-opacity"
        >
          AGINTIC AI TUTOR
        </button>

        <button className="material-symbols-outlined text-on-surface-variant hover:opacity-80 transition-opacity active:scale-95 duration-200">
          account_circle
        </button>
      </header>

      {/* ── Main Content ── */}
      <main className="pt-24 pb-32 px-6 md:pl-72 md:pr-12 max-w-7xl mx-auto min-h-screen">
        <div className="max-w-4xl mx-auto space-y-10">

          {/* Result Header */}
          <div className="text-center space-y-2">
            <span className="text-primary font-bold tracking-widest text-xs uppercase">
              Assessment Complete
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-on-surface tracking-tighter">
              Your Estimated Band Score
            </h1>
          </div>

          {/* Premium Score Card */}
          <div
            className="relative overflow-hidden bg-surface-container-lowest rounded-xl p-8 md:p-16 flex flex-col items-center"
            style={{ boxShadow: '0 10px 30px rgba(26,28,28,0.06)' }}
          >
            {/* Decorative blurs */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-tertiary/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative flex flex-col items-center">
              {/* Score circle */}
              <div className="w-48 h-48 md:w-56 md:h-56 rounded-full border-[12px] border-surface-container flex items-center justify-center relative">
                <svg className="absolute inset-0 w-full h-full -rotate-90" aria-hidden="true">
                  <circle
                    cx="50%"
                    cy="50%"
                    r="46%"
                    fill="none"
                    stroke="#b61722"
                    strokeWidth="12"
                    strokeDasharray="290 100"
                    strokeLinecap="round"
                  />
                </svg>
                <span className="text-7xl md:text-8xl font-black text-on-surface leading-none">
                  6.5
                </span>
              </div>

              {/* Level badge + description */}
              <div className="mt-8 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-surface-container-high rounded-full">
                  <span className="material-symbols-outlined text-primary text-lg">verified</span>
                  <span className="text-lg font-bold text-on-surface">Intermediate (B2)</span>
                </div>
                <p className="mt-4 text-on-surface-variant max-w-md mx-auto leading-relaxed">
                  You demonstrated a good operational command of the language, despite some inaccuracies
                  and misunderstandings in complex situations.
                </p>
              </div>
            </div>
          </div>

          {/* Score Breakdown Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {scoreCards.map((card) => (
              <div key={card.label} className="bg-surface-container-low p-6 rounded-xl space-y-4">
                <div className="flex justify-between items-start">
                  <span className="material-symbols-outlined text-primary p-2 bg-surface-container-lowest rounded-lg">
                    {card.icon}
                  </span>
                  <span className="text-sm font-bold text-primary">{card.score}</span>
                </div>
                <div>
                  <h3 className="font-bold text-on-surface">{card.label}</h3>
                  <p className="text-sm text-on-surface-variant mt-1">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Key Insights */}
          <div className="bg-surface-container-lowest rounded-xl p-8 space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <span className="material-symbols-outlined text-tertiary">lightbulb</span>
              Key Insights &amp; Feedback
            </h2>
            <div className="space-y-4">
              <div className="flex gap-4 items-start border-l-4 border-tertiary pl-4 py-1">
                <div className="flex-1">
                  <p className="font-bold text-sm">Strength: Pronunciation</p>
                  <p className="text-sm text-on-surface-variant">
                    Your word stress and intonation were consistent, making you easy to understand
                    throughout the test.
                  </p>
                </div>
              </div>
              <div
                className="flex gap-4 items-start pl-4 py-1"
                style={{ borderLeft: '4px solid rgba(182,23,34,0.3)' }}
              >
                <div className="flex-1">
                  <p className="font-bold text-sm text-on-secondary-fixed-variant">
                    Improvement: Idiomatic Language
                  </p>
                  <p className="text-sm text-on-surface-variant">
                    To reach Band 7.0, try to incorporate more idiomatic expressions and less common
                    vocabulary.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <button
              onClick={() => navigate('/start-speaking')}
              className="w-full sm:w-auto px-10 py-4 text-white font-bold rounded-xl text-lg hover:opacity-90 transition-all active:scale-95"
              style={{ background: 'linear-gradient(135deg, #b61722 0%, #da3437 100%)', boxShadow: '0 8px 24px rgba(182,23,34,0.25)' }}
            >
              Retake Test
            </button>
            <button className="w-full sm:w-auto px-10 py-4 bg-surface-container-high text-on-surface font-bold rounded-xl hover:bg-surface-container-highest transition-all active:scale-95 text-lg">
              View History
            </button>
          </div>

        </div>
      </main>

      {/* ── Mobile Bottom Navigation ── */}
      <nav
        className="md:hidden fixed bottom-0 w-full z-50 rounded-t-3xl flex justify-around items-center px-4 pt-2 pb-6"
        style={{
          background: 'rgba(255,255,255,0.85)',
          backdropFilter: 'blur(16px)',
          boxShadow: '0 -10px 30px rgba(0,0,0,0.05)',
          borderTop: '1px solid rgba(243,243,243,0.8)',
        }}
      >
        <div
          onClick={() => navigate('/start-speaking')}
          className="flex flex-col items-center justify-center text-on-surface-variant p-2 transition-transform active:scale-95 cursor-pointer"
        >
          <span className="material-symbols-outlined">mic</span>
          <span className="text-[10px] font-bold uppercase mt-1">Test</span>
        </div>
        <div className="flex flex-col items-center justify-center text-primary bg-primary/10 rounded-xl p-2 transition-transform active:scale-95">
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
