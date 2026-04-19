import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { saveWritingSession } from '../db'

const QUESTIONS = [
  {
    topic: "Some people believe that professional athletes' high salaries are justified, while others argue they are excessive.",
    instruction: "Discuss both views and give your own opinion. Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
  },
  {
    topic: 'Some people think that housing facilities should be built in the vacant areas of cities and towns, while others believe that parks should be set instead. Planting trees is very important for the environment.',
    instruction: 'Do you agree or disagree? Give reasons for your answer and include any relevant examples from your own knowledge or experience.',
  },
  {
    topic: 'In many countries, the proportion of older people is steadily increasing. Some think this is good, while others think it poses challenges to the country.',
    instruction: 'Discuss both views and give your own opinion. Give reasons for your answer and include any relevant examples from your own knowledge or experience.',
  },
  {
    topic: 'Some people think that a sense of competition in children should be encouraged. Others believe that children who are taught to co-operate rather than compete become more useful adults.',
    instruction: 'Discuss both views and give your own opinion. Give reasons for your answer and include any relevant examples from your own knowledge or experience.',
  },
  {
    topic: 'The Internet has transformed the way information is shared and consumed, but it has also created problems that did not exist before.',
    instruction: 'What are the most serious problems associated with the Internet and what solutions can you suggest? Give reasons for your answer and include any relevant examples from your own knowledge or experience.',
  },
  {
    topic: 'Many people believe that social media has had a largely negative impact on society. Others argue that its benefits outweigh its drawbacks.',
    instruction: 'Discuss both views and give your own opinion. Give reasons for your answer and include any relevant examples from your own knowledge or experience.',
  },
  {
    topic: "Some people think that governments should pay for public health care and education, while others believe that it is the individual's responsibility to pay for these services.",
    instruction: 'Discuss both views and give your own opinion. Give reasons for your answer and include any relevant examples from your own knowledge or experience.',
  },
]

const TOTAL_SECONDS = 40 * 60

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
  const navigate        = useNavigate()
  const [essay, setEssay]           = useState('')
  const [activeNav, setActiveNav]   = useState('criteria')
  const [questionIndex, setQuestionIndex] = useState(0)
  const [timeLeft, setTimeLeft]     = useState(TOTAL_SECONDS)
  const timerRef = useRef(null)

  const textareaRef = useRef(null)
  const wordCount = essay.trim() ? essay.trim().split(/\s+/).length : 0
  const canFinish = wordCount >= 250
  const question  = QUESTIONS[questionIndex]

  // Timer starts when question appears (component mount)
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) { clearInterval(timerRef.current); return 0 }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [])

  function formatTime(s) {
    return `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`
  }

  function handleNewQuestion() {
    setQuestionIndex((i) => (i + 1) % QUESTIONS.length)
    setEssay('')
    clearInterval(timerRef.current)
    setTimeLeft(TOTAL_SECONDS)
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) { clearInterval(timerRef.current); return 0 }
        return prev - 1
      })
    }, 1000)
  }

  function handleFormat(type) {
    const ta = textareaRef.current
    if (!ta) return
    const start = ta.selectionStart
    const end   = ta.selectionEnd
    const selected = essay.slice(start, end)

    if (type === 'format_bold') {
      const inner = selected || 'bold text'
      const newEssay = essay.slice(0, start) + `**${inner}**` + essay.slice(end)
      setEssay(newEssay)
      setTimeout(() => { ta.focus(); ta.setSelectionRange(start + 2, start + 2 + inner.length) }, 0)
    } else if (type === 'format_italic') {
      const inner = selected || 'italic text'
      const newEssay = essay.slice(0, start) + `*${inner}*` + essay.slice(end)
      setEssay(newEssay)
      setTimeout(() => { ta.focus(); ta.setSelectionRange(start + 1, start + 1 + inner.length) }, 0)
    } else if (type === 'format_list_bulleted') {
      const lineStart = essay.lastIndexOf('\n', start - 1) + 1
      const lineEnd   = essay.indexOf('\n', start)
      const before    = essay.slice(0, lineStart)
      const line      = essay.slice(lineStart, lineEnd === -1 ? essay.length : lineEnd)
      const after     = lineEnd === -1 ? '' : essay.slice(lineEnd)
      const toggled   = line.startsWith('• ') ? line.slice(2) : '• ' + line
      const offset    = toggled.length - line.length
      setEssay(before + toggled + after)
      setTimeout(() => { ta.focus(); ta.setSelectionRange(start + offset, end + offset) }, 0)
    }
  }

  function handleSave() {
    if (!canFinish) return
    const timeUsed = TOTAL_SECONDS - timeLeft
    saveWritingSession({
      question: question.topic,
      instruction: question.instruction,
      essay,
      wordCount,
      timeUsedSeconds: timeUsed,
      createdAt: Date.now(),
    }).catch(() => {})
  }

  const timerProgress = ((TOTAL_SECONDS - timeLeft) / TOTAL_SECONDS) * 100
  const isUrgent = timeLeft <= 300

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
              onClick={() => id === 'home' ? navigate('/') : id === 'history' ? navigate('/writing-history') : setActiveNav(id)}
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
                  <button
                    onClick={handleNewQuestion}
                    className="flex items-center gap-2 shadow-[0px_12px_32px_rgba(25,28,29,0.05)] border-2-4 border-primary text-primary font-bold hover:opacity-70 text-sm hover:shadow-[0px_8px_24px_rgba(175,16,26,0.30)] active:scale-95 transition-all">
                    <span className="material-symbols-outlined text-[18px]">refresh</span>
                    New Question
                  </button>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-bold leading-snug text-on-surface">
                    {question.topic}
                  </h3>
                  <p className="text-secondary italic leading-relaxed">
                    {question.instruction}
                  </p>
                  <p className="text-xs text-secondary">
                    Write <strong>at least 250 words</strong>. You should spend about <strong>40 minutes</strong> on this task.
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
                    <div>
                      <span className="block text-xs text-secondary mb-0.5">Word Count</span>
                      <span className={`text-xl font-bold tracking-tight ${wordCount >= 250 ? 'text-green-600' : 'text-on-surface'}`}>
                        {wordCount}{' '}
                        <span className="text-sm font-normal text-secondary">/ 500 words</span>
                      </span>
                      {/* {wordCount > 0 && wordCount < 250 && (
                        <span className="block text-xs text-secondary mt-0.5">{250 - wordCount} more to unlock Finish</span>
                      )} */}
                    </div>
                    {/* 2-color timer pill: white=elapsed (left), red=remaining (right) */}
                    <div className="relative overflow-hidden rounded-full shadow-lg select-none" style={{ minWidth: '140px', background: '#ffffff', border: '1.5px solid #fca5a5' }}>
                      <div
                        className="absolute right-0 top-0 bottom-0 transition-all duration-1000"
                        style={{ width: `${(timeLeft / TOTAL_SECONDS) * 100}%`, background: isUrgent ? '#dc2626' : '#D10000' }}
                      />
                      <div className="relative z-10 flex items-center justify-center px-10 py-3 font-black text-xl tabular-nums text-gray-700">
                        {formatTime(timeLeft)}
                      </div>
                    </div>
                  </div>

                  {/* Textarea */}
                  <textarea
                    ref={textareaRef}
                    className="grow w-full px-12 py-10 bg-transparent border-none focus:outline-none focus:ring-0 text-on-surface text-lg leading-[1.8] font-body resize-none"
                    placeholder="Start typing your essay here..."
                    value={essay}
                    onChange={(e) => setEssay(e.target.value)}
                    style={{ caretColor: 'var(--color-primary)' }}
                  />

                  {/* Bottom Bar */}
                  <div className="flex items-center justify-between px-8 py-6 bg-surface-container-lowest rounded-b-xl border-t border-surface-container">
                    
                    <button
                      disabled={!canFinish}
                      onClick={handleSave}
                      title={!canFinish ? 'Write at least 250 words to finish' : 'Submit your essay'}
                      className={`flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-base transition-all ${
                        canFinish
                          ? 'bg-linear-to-r from-primary to-primary-container text-on-primary shadow-lg hover:shadow-[0px_8px_24px_rgba(175,16,26,0.30)] active:scale-95'
                          : 'bg-surface-container text-secondary cursor-not-allowed opacity-60'
                      }`}
                    >
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
              <div className={`bg-surface-container-lowest rounded-xl p-8 shadow-[0px_12px_32px_rgba(25,28,29,0.05)] border-l-4 ${isUrgent ? 'border-red-500' : 'border-primary'}`}>
                <div className="flex items-center gap-3 mb-2">
                  <span className={`material-symbols-outlined text-3xl ${isUrgent ? 'text-red-500' : 'text-primary'}`}>alarm</span>
                  <h4 className="font-bold text-secondary text-xs uppercase tracking-widest">
                    Time Remaining
                  </h4>
                </div>
                <div className={`text-6xl font-black tracking-tighter tabular-nums mt-2 ${isUrgent ? 'text-red-500' : 'text-on-surface'} ${isUrgent ? 'animate-pulse' : ''}`}>
                  {formatTime(timeLeft)}
                </div>
                <div className="mt-6 w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-1000 ${isUrgent ? 'bg-red-500' : 'bg-primary'}`}
                    style={{ width: `${100 - timerProgress}%` }}
                  />
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