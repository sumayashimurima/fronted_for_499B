import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllWritingSessions, deleteWritingSession } from '../db'

const NAV_ITEMS = [
  { id: 'drafts',   icon: 'edit_note',  label: 'Drafts'   },
  { id: 'criteria', icon: 'analytics',  label: 'Criteria' },
  { id: 'history',  icon: 'history',    label: 'History'  },
  { id: 'settings', icon: 'settings',   label: 'Settings' },
  { id: 'home',     icon: 'home',       label: 'Home'     },
]

function formatDate(ts) {
  return new Date(ts).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

function formatDuration(seconds) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return m > 0 ? `${m}m ${s}s` : `${s}s`
}

export default function WritingHistory() {
  const navigate = useNavigate()
  const [sessions, setSessions] = useState([])
  const [expanded, setExpanded] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAllWritingSessions()
      .then((data) => { setSessions(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  function handleDelete(id) {
    deleteWritingSession(id).then(() => setSessions((prev) => prev.filter((s) => s.id !== id)))
  }

  return (
    <div className="bg-surface font-body text-on-surface antialiased min-h-screen">

      {/* ── Left Sidebar ── */}
      <aside className="w-64 fixed left-0 top-0 h-screen bg-surface-container-low hidden md:flex flex-col p-6 z-40">
        <div className="mb-10">
          <h1 className="text-xl font-bold text-on-surface font-headline">IELTS Master</h1>
          <p className="text-xs text-secondary mt-0.5">Next Test: Oct 24</p>
        </div>

        <nav className="grow space-y-1">
          {NAV_ITEMS.map(({ id, icon, label }) => (
            <button
              key={id}
              onClick={() => id === 'home' ? navigate('/') : id === 'history' ? null : navigate('/start-writing')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm ${
                id === 'history'
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
      <main className="md:ml-64 min-h-screen pb-20 md:pb-0">

        {/* Top Navbar */}
        <header className="bg-surface sticky top-0 z-30">
          <div className="flex justify-between items-center w-full px-4 sm:px-8 py-4">
            <span className="text-xl font-black tracking-tighter text-primary font-headline">
              AGINTIC AI TUTOR
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate('/start-writing')}
                className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold hover:opacity-90 active:scale-95 transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">add</span>
                New Essay
              </button>
              <button className="hover:bg-surface-container p-2 rounded-lg transition-colors">
                <span className="material-symbols-outlined text-secondary">account_circle</span>
              </button>
            </div>
          </div>
          <div className="h-px w-full bg-surface-container" />
        </header>

        {/* Canvas Body */}
        <div className="max-w-5xl mx-auto px-4 sm:px-10 py-6 sm:py-12">

          <header className="mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-on-surface font-headline mb-2">
              Writing History
            </h2>
            <p className="text-secondary text-base leading-relaxed">
              Your saved Task 2 essay sessions.
            </p>
          </header>

          {loading ? (
            <div className="flex items-center justify-center py-24 text-secondary">
              <span className="material-symbols-outlined animate-spin mr-2">progress_activity</span>
              Loading…
            </div>
          ) : sessions.length === 0 ? (
            /* Empty state */
            <div className="flex flex-col items-center justify-center py-32 gap-4 text-center">
              <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center">
                <span className="material-symbols-outlined text-3xl text-secondary">history_edu</span>
              </div>
              <h3 className="text-xl font-bold text-on-surface">No essays saved yet</h3>
              <p className="text-secondary max-w-sm">Complete a writing session and click "Evaluate Essay" to save it here.</p>
              <button
                onClick={() => navigate('/start-writing')}
                className="mt-2 bg-primary text-white px-6 py-3 rounded-xl font-bold hover:opacity-90 active:scale-95 transition-all"
              >
                Start Writing
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {sessions.map((session) => (
                <div
                  key={session.id}
                  className="bg-surface-container-lowest rounded-xl shadow-[0px_12px_32px_rgba(25,28,29,0.05)] overflow-hidden"
                >
                  {/* Session header */}
                  <div
                    className="flex items-start justify-between px-4 sm:px-8 py-5 sm:py-6 cursor-pointer hover:bg-surface-container/40 transition-colors"
                    onClick={() => setExpanded(expanded === session.id ? null : session.id)}
                  >
                    <div className="flex-1 min-w-0 pr-6">
                      <p className="text-xs font-bold text-primary uppercase tracking-widest mb-2">Task 2 Essay</p>
                      <h3 className="font-bold text-on-surface leading-snug line-clamp-2 mb-3">
                        {session.question}
                      </h3>
                      <div className="flex flex-wrap gap-4 text-xs text-secondary">
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                          {formatDate(session.createdAt)}
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">format_size</span>
                          {session.wordCount} words
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">timer</span>
                          {formatDuration(session.timeUsedSeconds)}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${session.wordCount >= 250 ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>
                        {session.wordCount >= 250 ? '✓ Min. reached' : 'Under 250'}
                      </span>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleDelete(session.id) }}
                        className="p-2 rounded-lg hover:bg-error/10 text-secondary hover:text-error transition-colors"
                        title="Delete this session"
                      >
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                      <span className="material-symbols-outlined text-secondary transition-transform duration-200" style={{ transform: expanded === session.id ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                        expand_more
                      </span>
                    </div>
                  </div>

                  {/* Expanded essay */}
                  {expanded === session.id && (
                    <div className="px-4 sm:px-8 pb-6 sm:pb-8 border-t border-surface-container">
                      <p className="text-xs font-bold text-secondary uppercase tracking-widest mt-6 mb-3">Instruction</p>
                      <p className="text-sm text-secondary italic mb-6">{session.instruction}</p>
                      <p className="text-xs font-bold text-secondary uppercase tracking-widest mb-3">Essay</p>
                      <div
                        className="text-on-surface text-base leading-[1.8] whitespace-pre-wrap bg-surface-container-low rounded-xl px-4 sm:px-8 py-4 sm:py-6"
                        style={{
                          backgroundImage: 'radial-gradient(#e5e2e1 0.5px, transparent 0.5px)',
                          backgroundSize: '24px 24px',
                        }}
                      >
                        {session.essay}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

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
        <div
          onClick={() => navigate('/start-writing')}
          className="flex flex-col items-center justify-center text-on-surface-variant p-2 transition-transform active:scale-95 cursor-pointer"
        >
          <span className="material-symbols-outlined">edit_note</span>
          <span className="text-[10px] font-bold uppercase mt-1">Write</span>
        </div>
        <div className="flex flex-col items-center justify-center text-primary bg-primary/10 rounded-xl p-2 transition-transform active:scale-95">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>history</span>
          <span className="text-[10px] font-bold uppercase mt-1">History</span>
        </div>
        <div
          onClick={() => navigate('/')}
          className="flex flex-col items-center justify-center text-on-surface-variant p-2 transition-transform active:scale-95 cursor-pointer"
        >
          <span className="material-symbols-outlined">home</span>
          <span className="text-[10px] font-bold uppercase mt-1">Home</span>
        </div>
        <div className="flex flex-col items-center justify-center text-on-surface-variant p-2 transition-transform active:scale-95">
          <span className="material-symbols-outlined">help_outline</span>
          <span className="text-[10px] font-bold uppercase mt-1">Help</span>
        </div>
      </nav>

    </div>
  )
}
