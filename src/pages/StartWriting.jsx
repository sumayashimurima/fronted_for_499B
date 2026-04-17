import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const NAV_ITEMS = [
  { id: 'drafts',    icon: 'edit_note',  label: 'Drafts'   },
  { id: 'criteria',  icon: 'analytics',  label: 'Criteria' },
  { id: 'history',   icon: 'history',    label: 'History'  },
  { id: 'settings',  icon: 'settings',   label: 'Settings' },
  { id: 'home',  icon: 'home',   label: 'Home' },
]

const CRITERIA = [
  { label: 'Task Response', score: '7.0', color: 'var(--color-primary)',              opacity: 1   },
  { label: 'Coherence',     score: '6.0', color: 'var(--color-secondary-fixed-dim)',  opacity: 1   },
  { label: 'Lexical',       score: '6.5', color: 'var(--color-primary)',              opacity: 0.6 },
  { label: 'Grammar',       score: '6.5', color: 'var(--color-primary)',              opacity: 0.6 },
]

export default function StartWriting() {
  const navigate      = useNavigate()
  const [essay, setEssay]       = useState('')
  const [activeNav, setActiveNav] = useState('criteria')

  const wordCount = essay.trim() ? essay.trim().split(/\s+/).length : 0

  return (
    <div className="bg-surface font-body text-on-surface antialiased min-h-screen">

      {/* ── Left Sidebar ── */}
      <aside className="w-64 fixed left-0 top-0 h-screen bg-surface-container-low flex flex-col p-6 z-40">
        <div className="mb-10">
          <h1 className="text-xl font-bold text-on-surface font-headline">IELTS Master</h1>
          <p className="text-xs text-secondary mt-0.5">Next Test: Oct 24</p>
        </div>

        <nav className="grow space-y-1">
          {NAV_ITEMS.map(({ id, icon, label }) => (
            <button
              key={id}
              onClick={() => setActiveNav(id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm ${
                activeNav === id
                  ? 'text-on-surface font-semibold border-r-4 border-primary bg-surface-container'
                  : 'text-secondary hover:bg-surface-container'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">{icon}</span>
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <div className="mt-auto">
          <div className="h-px w-full bg-surface-container mb-4" />
          <button className="w-full flex items-center gap-3 px-4 py-3 text-secondary hover:bg-surface-container transition-all rounded-xl text-sm">
            <span className="material-symbols-outlined text-[20px]">help_outline</span>
            <span>Help</span>
          </button>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <main className="ml-64 min-h-screen">

        {/* Top Navbar */}
        <header className="bg-surface sticky top-0 z-30">
          <div className="flex justify-between items-center w-full px-8 py-4">
            <span className="text-xl font-black tracking-tighter text-primary font-headline">
              AGINTIC AI TUTOR
            </span>
            <div className="flex items-center gap-2">
              <button className="hover:bg-surface-container p-2 rounded-lg transition-colors">
                <span className="material-symbols-outlined text-secondary">timer</span>
              </button>
              <button className="hover:bg-surface-container p-2 rounded-lg transition-colors">
                <span className="material-symbols-outlined text-secondary">account_circle</span>
              </button>
            </div>
          </div>
          <div className="h-px w-full bg-surface-container" />
        </header>

        {/* Canvas Body */}
        <div className="max-w-7xl mx-auto px-10 py-12">

          <header className="mb-12">
            <h2 className="text-4xl font-extrabold tracking-tight text-on-surface font-headline mb-2">
              IELTS Writing Task 2 Practice
            </h2>
            <p className="text-secondary text-base leading-relaxed">
              Refine your academic argumentation and linguistic precision.
            </p>
          </header>

          <div className="grid grid-cols-12 gap-12 items-start">

            {/* ── Left Column: Editor ── */}
            <div className="col-span-8 space-y-10">

              {/* Prompt Card */}
              <section className="bg-surface-container-low rounded-xl p-8 relative overflow-hidden">
                <div className="flex justify-between items-start mb-6">
                  <span className="hero-gradient text-on-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    Prompt
                  </span>
                  <button className="flex items-center gap-2 shadow-[0px_12px_32px_rgba(25,28,29,0.05)] border-2-4 border-primary text-primary font-bold hover:opacity-70 transition-all text-sm hover:shadow-[0px_8px_24px_rgba(175,16,26,0.30)] active:scale-95 transition-all">
                    <span className="material-symbols-outlined text-[18px]">refresh</span>
                    New Question
                  </button>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-bold leading-snug text-on-surface">
                    Some people believe that professional athletes' high salaries are justified,
                    while others argue they are excessive.
                  </h3>
                  <p className="text-secondary italic leading-relaxed">
                    Discuss both views and give your own opinion. Give reasons for your answer
                    and include any relevant examples from your own knowledge or experience.
                  </p>
                </div>
                {/* Decorative quote icon */}
                <div className="absolute -right-4 -bottom-4 opacity-5 pointer-events-none select-none">
                  <span className="material-symbols-outlined" style={{ fontSize: '120px' }}>
                    format_quote
                  </span>
                </div>
              </section>

              {/* Essay Editor */}
              <section>
                <div
                  className="bg-surface-container-lowest rounded-xl shadow-[0px_12px_32px_rgba(25,28,29,0.05)] min-h-150 flex flex-col focus-within:shadow-[0_0_20px_2px_rgba(175,16,26,0.10)] transition-shadow duration-300"
                  style={{
                    backgroundImage: 'radial-gradient(#e5e2e1 0.5px, transparent 0.5px)',
                    backgroundSize: '24px 24px',
                  }}
                >
                  {/* Toolbar */}
                  <div className="flex items-center justify-between px-8 py-4 border-b border-surface-container bg-surface-container-lowest rounded-t-xl">
                    <div className="flex gap-3">
                      {['format_bold', 'format_italic', 'format_list_bulleted'].map((ic) => (
                        <button
                          key={ic}
                          className="p-1.5 hover:bg-surface-container rounded transition-colors text-on-surface"
                        >
                          <span className="material-symbols-outlined text-[20px]">{ic}</span>
                        </button>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 text-secondary">
                      <span className="material-symbols-outlined text-[16px]">history_edu</span>
                      <span className="text-xs font-medium">Auto-saving...</span>
                    </div>
                  </div>

                  {/* Textarea */}
                  <textarea
                    className="grow w-full px-12 py-10 bg-transparent border-none focus:outline-none focus:ring-0 text-on-surface text-lg leading-[1.8] font-body resize-none"
                    placeholder="Start typing your essay here..."
                    value={essay}
                    onChange={(e) => setEssay(e.target.value)}
                    style={{ caretColor: 'var(--color-primary)' }}
                  />

                  {/* Bottom Bar */}
                  <div className="flex items-center justify-between px-8 py-6 bg-surface-container-lowest rounded-b-xl border-t border-surface-container">
                    <div>
                      <span className="block text-xs text-secondary mb-0.5">Word Count</span>
                      <span className="text-xl font-bold tracking-tight text-on-surface">
                        {wordCount}{' '}
                        <span className="text-sm font-normal text-secondary">/ 250 words</span>
                      </span>
                    </div>
                    <button className="flex items-center gap-3 bg-linear-to-r from-primary to-primary-container text-on-primary px-8 py-4 rounded-xl font-bold text-base shadow-lg hover:shadow-[0px_8px_24px_rgba(175,16,26,0.30)] active:scale-95 transition-all">
                      <span className="material-symbols-outlined">rocket_launch</span>
                      Evaluate Essay
                    </button>
                  </div>
                </div>
              </section>
            </div>

            {/* ── Right Column: Sticky Panel ── */}
            <aside className="col-span-4 space-y-8 sticky top-24">

              {/* Timer Card */}
              <div className="bg-surface-container-lowest rounded-xl p-8 shadow-[0px_12px_32px_rgba(25,28,29,0.05)] border-l-4 border-primary">
                <div className="flex items-center gap-3 mb-2">
                  <span className="material-symbols-outlined text-primary text-3xl">alarm</span>
                  <h4 className="font-bold text-secondary text-xs uppercase tracking-widest">
                    Time Remaining
                  </h4>
                </div>
                <div className="text-6xl font-black tracking-tighter text-on-surface tabular-nums mt-2">
                  40:00
                </div>
                <div className="mt-6 w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
                  <div className="bg-primary h-full w-full" />
                </div>
              </div>

              {/* Evaluation Result */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-lg text-on-surface">Evaluation Result</h4>
                  <span className="text-xs font-bold text-primary px-2 py-1 bg-primary-fixed rounded-lg">
                    DRAFT V1
                  </span>
                </div>

                {/* Overall Band Score — dark card */}
                <div
                  className="rounded-xl p-8 flex items-center justify-between overflow-hidden relative hero-gradient"
                  style={{ backgroundColor: 'var(--color-on-surface)', color: 'var(--color-surface)' }}
                >
                  <div className="relative z-10">
                    <p className="text-xs font-medium mb-1" style={{ color: 'var(--color-surface-dim)' }}>
                      Overall Band Score
                    </p>
                    <p className="text-6xl font-black" style={{ color: 'var(--color-surface-container-lowest)' }}>
                      6.5
                    </p>
                    <div className="mt-4 flex items-center gap-2" style={{ color: 'var(--color-primary-fixed)' }}>
                      <span className="material-symbols-outlined text-[16px]">trending_up</span>
                      <span className="text-xs">Upper Intermediate</span>
                    </div>
                  </div>
                  <div
                    className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full opacity-20"
                    style={{ backgroundColor: 'var(--color-primary)', filter: 'blur(80px)' }}
                  />
                </div>

                {/* Criteria 2×2 Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {CRITERIA.map(({ label, score, color, opacity }) => (
                    <div key={label} className="bg-surface-container-lowest p-5 rounded-xl shadow-[0px_2px_8px_rgba(25,28,29,0.06)]">
                      <span className="text-xs text-secondary block mb-2">{label}</span>
                      <div className="flex items-end gap-2">
                        <span className="text-3xl font-bold text-on-surface">{score}</span>
                        <div
                          className="h-8 w-1 rounded-full mb-1"
                          style={{ backgroundColor: color, opacity }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Detailed Feedback CTA */}
                <button className="w-full py-4 bg-surface-container-high hover:bg-surface-container-highest rounded-xl font-bold transition-all text-on-surface flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
                  Detailed AI Feedback
                </button>
              </div>
            </aside>

          </div>
        </div>
      </main>

    </div>
  )
}
