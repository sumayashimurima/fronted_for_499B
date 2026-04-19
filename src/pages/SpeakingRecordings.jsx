import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllRecordings, deleteRecording, deleteAllRecordings } from '../db'

const navItems = [
  { icon: 'filter_1',     label: 'Part 1',     path: '/start-speaking' },
  { icon: 'filter_2',     label: 'Part 2',     path: '/start-speaking' },
  { icon: 'filter_3',     label: 'Part 3',     path: '/start-speaking' },
  { icon: 'history',      label: 'Progress',   path: '/speaking-history' },
  { icon: 'mic',          label: 'Recordings', path: '/speaking-recordings', active: true },
  { icon: 'home',         label: 'Home',       path: '/' },
  { icon: 'help_outline', label: 'Help',       path: null },
]

const PART_COLORS = ['#b61722', '#005f7b', '#e07b00']

function formatDate(ts) {
  return new Date(ts).toLocaleString(undefined, {
    month: 'short', day: 'numeric', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

function formatDuration(s) {
  if (!s) return '0:00'
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
}

export default function SpeakingRecordings() {
  const navigate = useNavigate()
  const [recordings, setRecordings] = useState([])
  const [loading, setLoading] = useState(true)
  const [playingId, setPlayingId] = useState(null)
  const [deletingId, setDeletingId] = useState(null)
  const [confirmDeleteAll, setConfirmDeleteAll] = useState(false)
  const audioRef = useRef(new Audio())
  const currentUrlRef = useRef(null)

  useEffect(() => {
    getAllRecordings()
      .then(setRecordings)
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    const onEnded = () => setPlayingId(null)
    audio.addEventListener('ended', onEnded)
    return () => {
      audio.removeEventListener('ended', onEnded)
      audio.pause()
      if (currentUrlRef.current) URL.revokeObjectURL(currentUrlRef.current)
    }
  }, [])

  const handlePlay = (rec) => {
    const audio = audioRef.current
    if (playingId === rec.id) {
      audio.pause()
      setPlayingId(null)
      return
    }
    audio.pause()
    if (currentUrlRef.current) URL.revokeObjectURL(currentUrlRef.current)
    const url = URL.createObjectURL(rec.blob)
    currentUrlRef.current = url
    audio.src = url
    audio.play()
    setPlayingId(rec.id)
  }

  const handleDelete = async (id) => {
    setDeletingId(id)
    if (playingId === id) {
      audioRef.current.pause()
      setPlayingId(null)
    }
    await deleteRecording(id)
    setRecordings((prev) => prev.filter((r) => r.id !== id))
    setDeletingId(null)
  }

  const handleDeleteAll = async () => {
    audioRef.current.pause()
    setPlayingId(null)
    await deleteAllRecordings()
    setRecordings([])
    setConfirmDeleteAll(false)
  }

  return (
    <div className="font-body text-on-surface antialiased bg-surface min-h-screen">

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
      </aside>

      {/* ── Top Navbar ── */}
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
        <button className="material-symbols-outlined text-on-surface-variant hover:opacity-80 transition-opacity">
          account_circle
        </button>
      </header>

      {/* ── Main Content ── */}
      <main className="pt-24 pb-32 px-6 md:pl-72 md:pr-12 max-w-7xl mx-auto min-h-screen">
        <div className="max-w-4xl mx-auto space-y-8">

          {/* Page header */}
          <div className="flex items-end justify-between gap-4">
            <div>
              <span className="text-primary font-bold tracking-widest text-xs uppercase">
                Speaking Practice
              </span>
              <h1 className="text-4xl font-black text-on-surface tracking-tighter mt-1">
                My Recordings
              </h1>
              <p className="text-on-surface-variant mt-2">
                {recordings.length} recording{recordings.length !== 1 ? 's' : ''} saved
              </p>
            </div>

            {recordings.length > 0 && (
              <div className="flex items-center gap-2 shrink-0">
                {confirmDeleteAll ? (
                  <>
                    <span className="text-sm text-on-surface-variant">Delete all?</span>
                    <button
                      onClick={handleDeleteAll}
                      className="px-4 py-2 bg-primary text-white text-sm font-bold rounded-lg active:scale-95 transition-all"
                    >
                      Yes, delete all
                    </button>
                    <button
                      onClick={() => setConfirmDeleteAll(false)}
                      className="px-4 py-2 bg-surface-container-high text-on-surface text-sm font-bold rounded-lg active:scale-95 transition-all"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setConfirmDeleteAll(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-surface-container-high text-on-surface text-sm font-bold rounded-lg hover:bg-primary/10 hover:text-primary active:scale-95 transition-all"
                  >
                    <span className="material-symbols-outlined text-lg">delete_sweep</span>
                    Delete All
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Loading */}
          {loading && (
            <div className="flex items-center justify-center py-24">
              <span className="material-symbols-outlined text-primary text-4xl animate-spin">progress_activity</span>
            </div>
          )}

          {/* Empty state */}
          {!loading && recordings.length === 0 && (
            <div
              className="flex flex-col items-center justify-center py-24 rounded-xl bg-surface-container-lowest"
              style={{ boxShadow: '0 10px 30px rgba(26,28,28,0.06)' }}
            >
              <span className="material-symbols-outlined text-6xl text-on-surface-variant mb-4">mic_off</span>
              <p className="text-xl font-bold text-on-surface">No recordings yet</p>
              <p className="text-on-surface-variant mt-2 text-sm">Start a speaking test and your answers will be saved here.</p>
              <button
                onClick={() => navigate('/start-speaking')}
                className="mt-6 px-8 py-3 text-white font-bold rounded-xl active:scale-95 transition-all"
                style={{ background: 'linear-gradient(135deg, #b61722 0%, #da3437 100%)' }}
              >
                Start Speaking Test
              </button>
            </div>
          )}

          {/* Recording cards */}
          {!loading && recordings.length > 0 && (
            <div className="space-y-4">
              {recordings.map((rec) => {
                const partColor = PART_COLORS[(rec.part ?? 1) - 1] ?? PART_COLORS[0]
                const isPlaying = playingId === rec.id
                return (
                  <div
                    key={rec.id}
                    className="bg-surface-container-lowest rounded-xl p-6 flex flex-col gap-4"
                    style={{ boxShadow: '0 4px 16px rgba(26,28,28,0.06)' }}
                  >
                    {/* Top row */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4 flex-1 min-w-0">
                        {/* Part badge */}
                        <div
                          className="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-white text-xs font-black"
                          style={{ background: partColor }}
                        >
                          P{rec.part ?? 1}
                        </div>
                        {/* Question text */}
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-on-surface text-sm leading-snug line-clamp-2">
                            {rec.question ?? 'Unknown question'}
                          </p>
                          <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                            <span className="text-[11px] text-on-surface-variant">
                              Q{rec.questionIndex ?? '?'}
                            </span>
                            <span className="text-[11px] text-on-surface-variant">
                              {formatDuration(rec.duration)}
                            </span>
                            <span className="text-[11px] text-on-surface-variant">
                              {formatDate(rec.createdAt)}
                            </span>
                          </div>
                        </div>
                      </div>
                      {/* Delete button */}
                      <button
                        onClick={() => handleDelete(rec.id)}
                        disabled={deletingId === rec.id}
                        className="shrink-0 w-9 h-9 rounded-lg flex items-center justify-center text-on-surface-variant hover:bg-primary/10 hover:text-primary active:scale-95 transition-all disabled:opacity-40"
                      >
                        <span className="material-symbols-outlined text-xl">delete</span>
                      </button>
                    </div>

                    {/* Play bar */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handlePlay(rec)}
                        className="flex items-center gap-2 px-5 py-2 rounded-lg font-bold text-sm text-white active:scale-95 transition-all"
                        style={{ background: isPlaying ? '#005f7b' : '#1a1c1c' }}
                      >
                        <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
                          {isPlaying ? 'pause' : 'play_arrow'}
                        </span>
                        {isPlaying ? 'Pause' : 'Play'}
                      </button>
                      {isPlaying && (
                        <div className="flex items-end gap-0.5 h-5">
                          {[4,8,12,6,10,14,8,4,12,8,6].map((h, i) => (
                            <div
                              key={i}
                              className="w-1 rounded-full bg-tertiary"
                              style={{
                                height: `${h}px`,
                                animation: `wave-bar ${0.4 + i * 0.07}s ease-in-out infinite alternate`,
                              }}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}

        </div>
      </main>

      <style>{`
        @keyframes wave-bar {
          from { transform: scaleY(0.4); }
          to   { transform: scaleY(1.4); }
        }
      `}</style>

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
        <div onClick={() => navigate('/start-speaking')} className="flex flex-col items-center justify-center text-on-surface-variant p-2 transition-transform active:scale-95 cursor-pointer">
          <span className="material-symbols-outlined">mic</span>
          <span className="text-[10px] font-bold uppercase mt-1">Test</span>
        </div>
        <div className="flex flex-col items-center justify-center text-primary bg-primary/10 rounded-xl p-2 transition-transform active:scale-95">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>mic</span>
          <span className="text-[10px] font-bold uppercase mt-1">Recordings</span>
        </div>
        <div onClick={() => navigate('/speaking-history')} className="flex flex-col items-center justify-center text-on-surface-variant p-2 transition-transform active:scale-95 cursor-pointer">
          <span className="material-symbols-outlined">history</span>
          <span className="text-[10px] font-bold uppercase mt-1">Progress</span>
        </div>
        <div className="flex flex-col items-center justify-center text-on-surface-variant p-2 transition-transform active:scale-95">
          <span className="material-symbols-outlined">help</span>
          <span className="text-[10px] font-bold uppercase mt-1">Help</span>
        </div>
      </nav>
    </div>
  )
}
