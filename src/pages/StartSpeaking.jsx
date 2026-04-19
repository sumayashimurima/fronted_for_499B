import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { saveRecording } from '../db'

const waveHeights = [16, 32, 20, 40, 12, 24, 48, 28, 36, 16, 8, 8, 8]

// Per-part question time limits (seconds): Part1=30s, Part2=59s, Part3=45s
const QUESTION_DURATION = [30, 59, 45]
const TOTAL_DURATION = 600 // 10 minutes

const partQuestions = [
  // Part 1 — simple strings
  [
    'What is your full name?',
    'Can I see your ID?',
    'Do you enjoy reading books?',
    'What kind of music do you like?',
    'Do you prefer living in a city or the countryside?',
    'How do you usually spend your weekends?',
    'What is your favourite season and why?',
    'Do you like cooking? Why or why not?',
    'How often do you use public transport?',
    'What sports or physical activities do you enjoy?',
    'Do you prefer shopping online or in stores?',
    'What do you like to do in your free time?',
  ],
  // Part 2 — Candidate Task Card objects
  [
    {
      topic: 'Describe a toy you liked in your childhood.',
      bullets: ['What it was', 'Who gave it to you', 'What it looked like'],
      closing: 'Explain why it was a special toy for you.',
    },
    {
      topic: 'Describe a place you have visited that impressed you.',
      bullets: ['Where it is', 'When you visited', 'What you saw there'],
      closing: 'Explain why it made such an impression on you.',
    },
    {
      topic: 'Describe a person in your life who has inspired you.',
      bullets: ['Who this person is', 'How long you have known them', 'What they have achieved'],
      closing: 'Explain why this person has inspired you.',
    },
    {
      topic: 'Describe an important decision you have made in your life.',
      bullets: ['What the decision was', 'When you made it', 'How you made it'],
      closing: 'Explain why it was an important decision.',
    },
    {
      topic: 'Describe a book or film that had a strong impact on you.',
      bullets: ['What it is about', 'When you read or watched it', 'Who recommended it to you'],
      closing: 'Explain why it had such a strong impact on you.',
    },
  ],
  // Part 3 — simple strings
  [
    'How important is reading in today\'s digital age?',
    'Do you think music education should be compulsory in schools?',
    'How has urbanisation affected the quality of life in your country?',
    'What are the advantages and disadvantages of remote work?',
    'How can governments encourage people to live more sustainably?',
    'Do you think technology has made people more or less social?',
    'What role do libraries play in modern society?',
    'How has globalisation affected local cultures?',
  ],
]

export default function StartSpeaking() {
  const navigate = useNavigate()
  const [activePart, setActivePart] = useState(0)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [isRecording, setIsRecording] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [totalSecondsLeft, setTotalSecondsLeft] = useState(TOTAL_DURATION)
  const [questionSecondsLeft, setQuestionSecondsLeft] = useState(QUESTION_DURATION[0])
  const [micPermission, setMicPermission] = useState('idle') // 'idle' | 'requesting' | 'granted' | 'denied'
  const [liveWaveHeights, setLiveWaveHeights] = useState(waveHeights)
  const [showTimeOver, setShowTimeOver] = useState(false)

  const intervalRef = useRef(null)
  const activePartRef = useRef(activePart)
  const qIndexRef = useRef(currentQuestionIndex)
  const isRecordingRef = useRef(isRecording)
  const isPausedRef = useRef(isPaused)
  const streamRef = useRef(null)
  const mediaRecorderRef = useRef(null)
  const analyserRef = useRef(null)
  const animationFrameRef = useRef(null)
  const audioCtxRef = useRef(null)
  const segmentMetaRef = useRef(null)
  const pendingNextMetaRef = useRef(null)
  const segmentStartRef = useRef(null)

  useEffect(() => { activePartRef.current = activePart }, [activePart])
  useEffect(() => { qIndexRef.current = currentQuestionIndex }, [currentQuestionIndex])
  useEffect(() => { isRecordingRef.current = isRecording }, [isRecording])
  useEffect(() => { isPausedRef.current = isPaused }, [isPaused])

  // Cleanup mic on unmount
  useEffect(() => {
    return () => {
      cancelAnimationFrame(animationFrameRef.current)
      mediaRecorderRef.current?.stop()
      streamRef.current?.getTracks().forEach((t) => t.stop())
      audioCtxRef.current?.close()
    }
  }, [])

  const questions = partQuestions[activePart] ?? partQuestions[0]
  const totalQuestions = questions.length
  const currentQuestion = questions[currentQuestionIndex]

  const formatTime = (s) =>
    `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`

  const startWaveformAnimation = (analyser) => {
    const dataArray = new Uint8Array(analyser.frequencyBinCount)
    const BARS = 13
    const step = Math.floor(analyser.frequencyBinCount / BARS)
    const tick = () => {
      animationFrameRef.current = requestAnimationFrame(tick)
      analyser.getByteFrequencyData(dataArray)
      setLiveWaveHeights(
        Array.from({ length: BARS }, (_, i) =>
          Math.max(4, Math.round((dataArray[i * step] / 255) * 48))
        )
      )
    }
    tick()
  }

  const stopWaveformAnimation = () => {
    cancelAnimationFrame(animationFrameRef.current)
    setLiveWaveHeights(Array(13).fill(4))
  }

  // Start a new MediaRecorder segment; saves blob on stop, then restarts if pending
  const startRecorderSegment = (meta) => {
    const stream = streamRef.current
    if (!stream || stream.getTracks().some((t) => t.readyState === 'ended')) return
    segmentMetaRef.current = meta
    segmentStartRef.current = Date.now()
    const chunks = []
    const recorder = new MediaRecorder(stream)
    mediaRecorderRef.current = recorder
    recorder.ondataavailable = (e) => { if (e.data.size > 0) chunks.push(e.data) }
    recorder.onstop = async () => {
      if (chunks.length > 0 && segmentMetaRef.current) {
        const blob = new Blob(chunks, { type: 'audio/webm' })
        const duration = segmentStartRef.current
          ? Math.round((Date.now() - segmentStartRef.current) / 1000)
          : 0
        saveRecording({ blob, ...segmentMetaRef.current, duration, createdAt: Date.now() })
          .catch(() => {})
      }
      if (pendingNextMetaRef.current) {
        const nextMeta = pendingNextMetaRef.current
        pendingNextMetaRef.current = null
        startRecorderSegment(nextMeta)
      }
    }
    recorder.start()
  }

  const handlePartChange = (index) => {
    setActivePart(index)
    setCurrentQuestionIndex(0)
    setQuestionSecondsLeft(QUESTION_DURATION[index])
  }

  const handleNextQuestion = () => {
    const part = activePartRef.current
    const curIdx = qIndexRef.current
    const nextIdx = (curIdx + 1) % partQuestions[part].length
    setCurrentQuestionIndex(nextIdx)
    setQuestionSecondsLeft(QUESTION_DURATION[part])
    // Stop current segment and pause — user must press Record for the new question
    if (isRecordingRef.current && !isPausedRef.current) {
      pendingNextMetaRef.current = null
      mediaRecorderRef.current?.stop()
      setIsPaused(true)
      stopWaveformAnimation()
    }
  }

  const handleRecord = async () => {
    if (isRecording && !isPaused) return
    setMicPermission('requesting')
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream
      setMicPermission('granted')

      const audioCtx = new AudioContext()
      audioCtxRef.current = audioCtx
      const source = audioCtx.createMediaStreamSource(stream)
      const analyser = audioCtx.createAnalyser()
      analyser.fftSize = 256
      source.connect(analyser)
      analyserRef.current = analyser

      const part = activePartRef.current
      const qIdx = qIndexRef.current
      const qRaw = partQuestions[part][qIdx]
      startRecorderSegment({
        question: typeof qRaw === 'string' ? qRaw : qRaw.topic,
        part: part + 1,
        questionIndex: qIdx + 1,
      })

      setIsRecording(true)
      setIsPaused(false)
      startWaveformAnimation(analyser)
    } catch {
      setMicPermission('denied')
    }
  }

  const handlePause = () => {
    if (!isRecording || isPaused) return
    pendingNextMetaRef.current = null
    mediaRecorderRef.current?.stop()
    setIsPaused(true)
    stopWaveformAnimation()
  }

  const handleResume = () => {
    if (!isRecording || !isPaused) return
    const part = activePartRef.current
    const qIdx = qIndexRef.current
    const qRaw = partQuestions[part][qIdx]
    startRecorderSegment({
      question: typeof qRaw === 'string' ? qRaw : qRaw.topic,
      part: part + 1,
      questionIndex: qIdx + 1,
    })
    setIsPaused(false)
    if (analyserRef.current) startWaveformAnimation(analyserRef.current)
  }

  // Countdown timers
  useEffect(() => {
    if (isRecording && !isPaused) {
      intervalRef.current = setInterval(() => {
        setTotalSecondsLeft((t) => Math.max(0, t - 1))
        setQuestionSecondsLeft((q) => Math.max(0, q - 1))
      }, 1000)
    } else {
      clearInterval(intervalRef.current)
    }
    return () => clearInterval(intervalRef.current)
  }, [isRecording, isPaused])

  // Auto-advance when question timer hits 0
  useEffect(() => {
    if (questionSecondsLeft === 0 && isRecording && !isPaused) {
      handleNextQuestion()
    }
  }, [questionSecondsLeft, isRecording, isPaused])

  // Stop everything when total time runs out
  useEffect(() => {
    if (totalSecondsLeft === 0 && isRecording) {
      pendingNextMetaRef.current = null
      mediaRecorderRef.current?.stop()
      streamRef.current?.getTracks().forEach((t) => t.stop())
      stopWaveformAnimation()
      setIsRecording(false)
      setIsPaused(false)
      setShowTimeOver(true)
    }
  }, [totalSecondsLeft, isRecording])

  const navItems = [
    { icon: 'filter_1',     label: 'Part 1',      index: 0, path: null },
    { icon: 'filter_2',     label: 'Part 2',      index: 1, path: null },
    { icon: 'filter_3',     label: 'Part 3',      index: 2, path: null },
    { icon: 'history',      label: 'Progress',    index: 3, path: '/speaking-history' },
    { icon: 'mic',          label: 'Recordings',  index: 6, path: '/speaking-recordings' },
    { icon: 'home',         label: 'Home',        index: 5, path: '/' },
    { icon: 'help_outline', label: 'Help',        index: 4, path: null },
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
                onClick={() => item.path ? navigate(item.path) : handlePartChange(item.index)}
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
              className="bg-surface-container-lowest rounded-xl p-10 flex flex-col min-h-80"
              style={{ boxShadow: '0 10px 30px rgba(26,28,28,0.06)' }}
            >
              {/* Header row */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-primary font-bold text-xs uppercase tracking-[0.2em]">
                    Part {activePart + 1} Question
                  </span>
                  <span className="text-on-surface-variant text-xs font-medium bg-surface-container px-2 py-0.5 rounded-full">
                    {currentQuestionIndex + 1} / {totalQuestions}
                  </span>
                </div>
                {/* Per-question countdown */}
                <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                  isRecording && questionSecondsLeft <= 5
                    ? 'bg-primary/10 text-primary'
                    : 'bg-surface-container text-on-surface-variant'
                }`}>
                  <span className="material-symbols-outlined text-sm">timer</span>
                  {formatTime(questionSecondsLeft)}
                </div>
              </div>

              {typeof currentQuestion === 'string' ? (
                /* Part 1 & 3 — plain question */
                <div className="flex-1 flex flex-col items-center justify-center text-center">
                  <h1 className="text-[2.2rem] leading-tight font-bold text-on-surface tracking-tight mb-4">
                    {currentQuestion}
                  </h1>
                  <p className="text-on-surface-variant">Answer naturally and clearly.</p>
                </div>
              ) : (
                /* Part 2 — Candidate Task Card */
                <div className="flex-1 space-y-4">
                  <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">
                    Candidate Task Card
                  </p>
                  <h1 className="text-2xl font-bold text-on-surface leading-snug">
                    {currentQuestion.topic}
                  </h1>
                  <div>
                    <p className="text-sm text-on-surface-variant mb-2">You should say:</p>
                    <ul className="space-y-1">
                      {currentQuestion.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2 text-sm text-on-surface">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <p className="text-sm text-on-surface">{currentQuestion.closing}</p>
                  <p className="text-xs text-on-surface-variant leading-relaxed pt-2 border-t border-surface-container">
                    You will have to talk about the topic for <strong className="text-on-surface">1 to 2 minutes.</strong><br />
                    You have one minute to think about what you&apos;re going to say.<br />
                    You can make some notes to help you if you wish.
                  </p>
                </div>
              )}
            </div>

            {/* Waveform — live when recording */}
            <div className="flex flex-col items-center gap-4 py-4">
              <div className="flex items-end gap-1 h-12">
                {liveWaveHeights.map((h, i) => (
                  <div
                    key={i}
                    className={`w-1.5 rounded-full transition-all duration-75 ${
                      isRecording && !isPaused ? 'bg-primary' : 'bg-surface-container-highest'
                    }`}
                    style={{ height: `${h}px` }}
                  />
                ))}
              </div>
            </div>

            {/* ── 3-Control Bar: Pause/Record | Status pill | Next ── */}
            <div
              className="flex items-center justify-between rounded-xl px-6 py-4"
              style={{
                background: 'rgba(255,255,255,0.9)',
                boxShadow: '0 2px 12px rgba(26,28,28,0.08)',
                borderTop: '1px solid rgba(26,28,28,0.06)',
              }}
            >
              {/* Left: Pause when recording, Record otherwise */}
              <div className="flex flex-col items-start gap-1">
                {isRecording && !isPaused ? (
                  <button
                    onClick={handlePause}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-on-surface active:scale-95 transition-all"
                    style={{ background: '#f0f0f0', boxShadow: '0 2px 8px rgba(26,28,28,0.10)' }}
                  >
                    <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>pause</span>
                    Pause
                  </button>
                ) : (
                  <button
                    onClick={isRecording && isPaused ? handleResume : handleRecord}
                    disabled={micPermission === 'requesting'}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white active:scale-95 transition-all disabled:opacity-50"
                    style={{ background: 'linear-gradient(135deg, #b61722 0%, #da3437 100%)', boxShadow: '0 8px 24px rgba(182,23,34,0.25)' }}
                  >
                    <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                      {micPermission === 'denied' ? 'mic_off' : 'mic'}
                    </span>
                    {micPermission === 'requesting' ? 'Requesting…' : 'Record'}
                  </button>
                )}
                {micPermission === 'denied' && (
                  <span className="text-[11px] text-primary font-medium leading-tight max-w-35">
                    Mic blocked. Allow microphone in browser settings and retry.
                  </span>
                )}
              </div>

              {/* Center: Recording pill / On pause / idle */}
              <div className="flex items-center justify-center">
                {isRecording && !isPaused ? (
                  <div
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm text-white select-none"
                    style={{ background: 'linear-gradient(90deg, #b61722 55%, rgba(218,52,55,0.65) 100%)', boxShadow: '0 4px 16px rgba(182,23,34,0.22)' }}
                  >
                    <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>graphic_eq</span>
                    Recording&nbsp;
                    <span style={{ opacity: 0.85 }}>{formatTime(questionSecondsLeft)}</span>
                  </div>
                ) : isRecording && isPaused ? (
                  <span className="text-sm font-bold text-on-surface-variant px-2">On pause</span>
                ) : (
                  <span className="text-sm text-on-surface-variant px-2">Tap Record to start</span>
                )}
              </div>

              {/* Right: Next button — dark */}
              <button
                onClick={handleNextQuestion}
                className="flex items-center gap-1.5 px-6 py-3 rounded-xl font-bold text-white active:scale-95 transition-all"
                style={{ background: '#1a1c1c', boxShadow: '0 4px 14px rgba(26,28,28,0.25)' }}
              >
                Next
                <span className="material-symbols-outlined text-base">chevron_right</span>
                <span className="material-symbols-outlined text-base -ml-3">chevron_right</span>
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
            <div className="text-5xl font-black tracking-tighter text-on-surface">{formatTime(totalSecondsLeft)}</div>
            <div className="mt-2 text-xs text-on-surface-variant">
              Question: <span className={`font-bold ${questionSecondsLeft <= 5 ? 'text-primary' : 'text-on-surface'}`}>{formatTime(questionSecondsLeft)}</span>
            </div>
            {/* Progress pills */}
            <div className="mt-8 flex gap-1">
              {[0, 1, 2].map((i) => (
                <div key={i} className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${activePart === i ? 'bg-primary' : 'bg-surface-container-highest'}`} />
              ))}
            </div>
            <div className="flex justify-between mt-2">
              {['Part 1', 'Part 2', 'Part 3'].map((label, i) => (
                <span key={label} className={`text-[10px] font-bold ${activePart === i ? 'text-primary' : 'text-on-surface-variant'}`}>{label}</span>
              ))}
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
          {/* <div className="rounded-xl overflow-hidden relative group">
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
          </div> */}

        </aside>
      </div>

      {/* ── Time Over Popup ── */}
      {showTimeOver && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ background: 'rgba(26,28,28,0.45)', backdropFilter: 'blur(4px)' }}
        >
          <div
            className="bg-surface-container-lowest rounded-2xl px-16 py-12 flex flex-col items-center gap-6 mx-4"
            style={{ boxShadow: '0 24px 60px rgba(26,28,28,0.18)', maxWidth: '440px', width: '100%' }}
          >
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-3xl">timer_off</span>
            </div>
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-black text-on-surface tracking-tight">Your time is over!</h2>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                The 10-minute session has ended. Your recordings have been saved.
              </p>
            </div>
            <div className="flex gap-3 w-full">
              <button
                onClick={() => { setShowTimeOver(false); navigate('/speaking-recordings') }}
                className="flex-1 py-3 text-white font-bold rounded-xl active:scale-95 transition-all"
                style={{ background: 'linear-gradient(135deg, #b61722 0%, #da3437 100%)', boxShadow: '0 8px 24px rgba(182,23,34,0.25)' }}
              >
                View Recordings
              </button>
              <button
                onClick={() => { setShowTimeOver(false); setTotalSecondsLeft(TOTAL_DURATION); setQuestionSecondsLeft(QUESTION_DURATION[activePart]) }}
                className="flex-1 py-3 bg-surface-container-high text-on-surface font-bold rounded-xl active:scale-95 transition-all"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      )}

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
