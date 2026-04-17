import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const filledCheck = { fontVariationSettings: "'FILL' 1" }

const faqData = [
  {
    q: 'Can I practice on mobile?',
    a: "Yes! AGINTIC is fully optimized for mobile browsers. You can practice your speaking skills on the go using your smartphone's built-in microphone.",
  },
  {
    q: 'How accurate is the AI Band Score?',
    a: 'Our scoring engine has a 94% correlation with certified IELTS examiners. It uses the official 4-pillar criteria: Fluency & Coherence, Lexical Resource, Grammatical Range, and Pronunciation.',
  },
  {
    q: 'Is there a free trial?',
    a: 'Absolutely. Every new account gets 3 full practice sessions for free to experience the depth of our AI feedback.',
  },
  {
    q: 'Does it cover all parts of the test?',
    a: 'Yes, you can choose to practice Part 1, Part 2, Part 3 individually, or take a Full Mock Test that simulates the entire 14-minute interview process.',
  },
]

const modes = [
  {
    icon: 'chat_bubble',
    title: 'Part 1',
    desc: 'Introduction and general questions (4-5 mins).',
    active: true,
  },
  { icon: 'timer', title: 'Part 2', desc: 'Individual long turn with cue card (3-4 mins).', active: false },
  { icon: 'forum', title: 'Part 3', desc: 'Two-way analytical discussion (4-5 mins).', active: false },
  {
    icon: 'rocket_launch',
    title: 'Full Test',
    desc: 'Complete simulation with band score (11-14 mins).',
    active: false,
  },
]

const features = [
  {
    icon: 'history_edu',
    title: 'Real IELTS questions',
    desc: 'Updated weekly with actual questions from recent tests around the globe.',
  },
  {
    icon: 'analytics',
    title: 'AI analysis',
    desc: 'Get detailed breakdowns of pronunciation, lexical resource, and grammar.',
  },
  {
    icon: 'update',
    title: 'Practice anytime',
    desc: 'No need to schedule. Your AI tutor is available 24/7 for unlimited rounds.',
  },
  {
    icon: 'fact_check',
    title: 'Instant results',
    desc: "Don't wait days for feedback. See your estimated band score within 30 seconds.",
  },
]

export default function SpeakingModule() {
  const navigate = useNavigate()
  const [openFaq, setOpenFaq] = useState(null)
  const [selectedMode, setSelectedMode] = useState(0)

  return (
    <div className="bg-surface font-body text-on-surface">
      <Navbar />

      {/* ── Hero ── */}
      <section className="pt-32 pb-20 hero-gradient">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left copy */}
          <div className="lg:col-span-6">
            <span className="inline-block px-4 py-1.5 rounded-full bg-secondary-container text-on-secondary-fixed-variant text-xs font-bold mb-6 tracking-wider uppercase">
              AI-Powered Training
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white font-headline leading-[1.1] tracking-tight">
              Practice IELTS <span className="text-red-400">Speaking</span> with AI
            </h1>
            <p className="text-lg md:text-xl text-slate-300 max-w-xl font-light leading-relaxed">
              Take Part 1, Part 2, or Full Speaking tests in a realistic environment. Get instant band
              scores and detailed analytical feedback.
            </p>
            <div className="flex items-center gap-4 flex-wrap">
              <button
                onClick={() => navigate('/start-speaking')}
                className="bg-white text-primary px-8 py-4 rounded-xl font-bold text-lg hover:shadow-[0px_8px_24px_rgba(175,16,26,0.30)] active:scale-95 transition-alltransition-colors shadow-lg"
              >
                Start Speaking

              </button>
              <button className="bg-white/10 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-colors">
                View Demo
              </button>
            </div>
          </div>

          {/* Right UI mockup */}
          <div className="lg:col-span-6 relative">
            <div
              className="relative bg-surface-container-lowest rounded-3xl p-6 overflow-hidden"
              style={{ boxShadow: '0 40px 80px -20px rgba(26,28,28,0.08)' }}
            >
              <div className="flex justify-between items-center mb-12">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined">account_circle</span>
                  </div>
                  <span className="font-bold text-sm tracking-tight text-on-surface">Candidate ID: #8291</span>
                </div>
                <div className="px-3 py-1 bg-tertiary/10 rounded-lg text-tertiary text-xs font-bold">
                  LIVE SESSION
                </div>
              </div>

              <div className="text-center py-6">
                <div className="text-on-surface-variant text-sm mb-4">Current Question: Part 2</div>
                <h3 className="text-2xl font-bold mb-8">
                  "Describe a book you recently read and found interesting."
                </h3>
                {/* Waveform */}
                <div className="flex items-center justify-center gap-1 h-12 mb-10">
                  {[6, 10, 16, 12, 8, 14, 6].map((h, i) => (
                    <div
                      key={i}
                      className="w-1.5 rounded-full bg-primary"
                      style={{ height: `${h * 4}px`, opacity: i % 2 === 0 ? 0.3 : i === 2 || i === 5 ? 1 : 0.6 }}
                    />
                  ))}
                </div>
                {/* Mic button */}
                <div className="flex justify-center">
                  <div
                    className="w-18 h-18 rounded-full bg-linear-to-br from-primary to-primary-container flex items-center justify-center text-white animate-pulse"
                    style={{ boxShadow: '0 40px 80px -20px rgba(26,28,28,0.08)' }}
                  >
                    <span
                      className="material-symbols-outlined text-4xl"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      mic
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating AI card */}
              <div
                className="absolute top-1/4 -right-4 p-4 rounded-2xl border border-white/40 max-w-45"
                style={{
                  background: 'rgba(255,255,255,0.7)',
                  backdropFilter: 'blur(12px)',
                  boxShadow: '0 8px 32px rgba(26,28,28,0.12)',
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-tertiary text-sm">check_circle</span>
                  <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
                    Analysis
                  </span>
                </div>
                <div className="text-xs text-on-surface leading-tight">
                  "Fluency is improving. Avoid 'um' in next sentence."
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mode Selector ── */}
      <section className="py-24 bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-black tracking-tight mb-4 font-headline">
            Choose Your Practice Mode
          </h2>
          <p className="text-on-surface-variant mb-16">
            Target specific sections or simulate the full exam experience.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {modes.map((mode, i) => (
              <div
                key={mode.title}
                onClick={() => setSelectedMode(i)}
                className={`bg-surface-container-lowest p-8 rounded-3xl transition-all cursor-pointer ${
                  selectedMode === i
                    ? 'border-2 border-primary shadow-lg shadow-primary/10'
                    : 'border border-transparent hover:border-outline-variant hover:bg-white'
                }`}
                style={{ boxShadow: selectedMode === i ? undefined : '0 40px 80px -20px rgba(26,28,28,0.04)' }}
              >
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 mx-auto ${
                    selectedMode === i
                      ? 'bg-primary text-white'
                      : 'bg-surface-container-high text-on-surface'
                  }`}
                >
                  <span className="material-symbols-outlined">{mode.icon}</span>
                </div>
                <h4 className="text-xl font-bold mb-2">{mode.title}</h4>
                <p className="text-sm text-on-surface-variant mb-6">{mode.desc}</p>
                <button
                  className={`w-full py-3 rounded-xl font-bold text-sm transition-colors ${
                    selectedMode === i
                      ? 'bg-primary text-white'
                      : 'bg-surface-container-high text-on-surface hover:bg-surface-container-highest'
                  }`}
                >
                  Select Mode
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features Bento ── */}
      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-xl">
              <h2 className="text-5xl font-black tracking-tighter mb-6 leading-tight font-headline">
                Master Speaking with Precision
              </h2>
              <p className="text-lg text-on-surface-variant">
                Our AI is trained on thousands of official IELTS examiner criteria to give you the most
                accurate feedback available.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-surface-container-lowest p-8 rounded-3xl hover:-translate-y-2 transition-transform"
                style={{ boxShadow: '0 40px 80px -20px rgba(26,28,28,0.08)' }}
              >
                <div className="text-primary mb-6">
                  <span className="material-symbols-outlined text-4xl">{f.icon}</span>
                </div>
                <h4 className="text-lg font-bold mb-3 tracking-tight">{f.title}</h4>
                <p className="text-on-surface-variant text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-24 bg-surface-container-low relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black tracking-tight font-headline">How It Works</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative">
            {/* connector line */}
            <div className="hidden md:block absolute top-16 left-0 w-full h-0.5 bg-outline-variant/30 -z-10" />

            {[
              {
                icon: 'list_alt',
                title: 'Choose part',
                desc: 'Select the specific part of the speaking test you want to focus on or go full exam.',
                n: 1,
              },
              {
                icon: 'mic',
                title: 'Answer via mic',
                desc: "Listen to the AI's prompts and record your answers. It's just like the real interview.",
                n: 2,
              },
              {
                icon: 'emoji_events',
                title: 'Get band score',
                desc: 'Review your performance with an estimated band score and AI-powered advice.',
                n: 3,
              },
            ].map((step) => (
              <div key={step.n} className="flex flex-col items-center text-center">
                <div
                  className="w-20 h-20 rounded-3xl bg-surface-container-lowest text-primary flex items-center justify-center mb-8 relative"
                  style={{ boxShadow: '0 40px 80px -20px rgba(26,28,28,0.08)' }}
                >
                  <span className="material-symbols-outlined text-3xl">{step.icon}</span>
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-linear-to-br from-primary to-primary-container text-white flex items-center justify-center text-xs font-black">
                    {step.n}
                  </div>
                </div>
                <h4 className="text-xl font-bold mb-4">{step.title}</h4>
                <p className="text-on-surface-variant text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Performance & Insights ── */}
      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* Score panel */}
            <div className="order-2 lg:order-1 space-y-8">
              <div
                className="bg-surface-container-lowest p-10 rounded-3xl"
                style={{ boxShadow: '0 40px 80px -20px rgba(26,28,28,0.08)' }}
              >
                <div className="flex items-center justify-between mb-8">
                  <h4 className="font-bold text-lg">Performance Score</h4>
                  <div className="text-4xl font-black text-primary">7.5</div>
                </div>
                <div className="space-y-6">
                  {[
                    { label: 'Fluency & Coherence', score: '8.0', pct: '80%' },
                    { label: 'Pronunciation', score: '7.0', pct: '70%' },
                    { label: 'Grammar', score: '7.5', pct: '75%' },
                  ].map((row) => (
                    <div key={row.label}>
                      <div className="flex justify-between text-xs font-bold uppercase mb-2">
                        <span>{row.label}</span>
                        <span>{row.score}</span>
                      </div>
                      <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: row.pct }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI suggestion */}
              <div className="bg-tertiary/5 p-8 rounded-3xl border border-tertiary/10">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-tertiary-container flex items-center justify-center text-white shrink-0">
                    <span className="material-symbols-outlined">tips_and_updates</span>
                  </div>
                  <div>
                    <h5 className="font-bold mb-2">AI Suggestion</h5>
                    <p className="text-sm text-on-surface-variant leading-relaxed">
                      "Try to use more complex subordinating conjunctions like 'notwithstanding' or
                      'whereas' to boost your grammatical range score."
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Copy */}
            <div className="order-1 lg:order-2">
              <h2 className="text-5xl font-black tracking-tight mb-8 leading-tight font-headline">
                Actionable Insights
              </h2>
              <p className="text-lg text-on-surface-variant mb-10">
                We don't just give you a number. We provide a surgical breakdown of where you're losing
                points and how to fix it before test day.
              </p>
              <ul className="space-y-4">
                {[
                  'Detailed transcription of your speech',
                  'Highlighting of filler words (um, uh, like)',
                  'Vocabulary replacement suggestions',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 font-medium">
                    <span className="material-symbols-outlined text-primary" style={filledCheck}>
                      check_circle
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div
            className="bg-linear-to-br from-primary hero-gradient rounded-3xl px-12 py-20 text-center text-white relative overflow-hidden"
            style={{ boxShadow: '0 40px 80px -20px rgba(26,28,28,0.08)' }}
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />
            <h2 className="text-5xl font-black tracking-tight mb-8 relative z-10 font-headline">
              Start Practicing Your Speaking Today
            </h2>
            <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto relative z-10">
              Join 10,000+ students who improved their IELTS Speaking band by 1.5 points on average
              using our AI platform.
            </p>
            <button className="bg-white text-primary px-10 py-5 rounded-2xl text-lg font-black hover:scale-105 active:scale-95 transition-all relative z-10 shadow-lg">
              Get Started For Free
            </button>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 bg-surface">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl font-black tracking-tight text-center mb-16 font-headline">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqData.map((item, i) => (
              <div
                key={i}
                className="bg-surface-container-lowest rounded-2xl p-6"
                style={{ boxShadow: '0 40px 80px -20px rgba(26,28,28,0.08)' }}
              >
                <button
                  className="w-full flex justify-between items-center text-left group"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <h4 className="font-bold text-lg">{item.q}</h4>
                  <span
                    className={`material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-all ${
                      openFaq === i ? 'rotate-180' : ''
                    }`}
                  >
                    expand_more
                  </span>
                </button>
                {openFaq === i && (
                  <div className="mt-4 text-on-surface-variant text-sm leading-relaxed">{item.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
