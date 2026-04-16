import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function WritingModule() {
  const [selectedModule, setSelectedModule] = useState('general')
  const navigate = useNavigate()

  return (
    <div className="bg-surface font-body text-on-surface">
      <Navbar />

      <main className="">

        {/* ── Hero ── */}
        <section className="relative min-h-215 flex items-center overflow-hidden hero-gradient">
          {/* dot grid */}
          {/* <div className="absolute inset-0 grid-overlay pointer-events-none" /> */}
          {/* ambient blob */}
          {/* <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" /> */}

          <div className="max-w-7xl mx-auto lg:px-12 grid lg:grid-cols-2 gap-12 items-center relative z-10 py-24">

            {/* Left – copy */}
            <div className="space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                <span className="text-amber-100 text-sm font-semibold uppercase tracking-widest" />
                Task 2 Only · Instant Band Score
              </div>

              <h1 className="text-5xl md:text-7xl font-extrabold text-white font-headline leading-[1.1] tracking-tight">
                IELTS Writing <br />
                <span className="text-red-400">Task 2 Practice</span>
              </h1>

              <p className="text-lg md:text-xl text-slate-300 max-w-xl font-light leading-relaxed">
                Write your essay and get your estimated band score instantly. Our high-end AI tutor
                analyses your grammar, vocabulary, and coherence in real-time.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  onClick={() => navigate('/start-writing')}
                  className="bg-white text-primary px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-100 transition-colors shadow-lg"
                >
                  Start Writing
                </button>
                <button className="bg-white/10 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-colors">
                  Learn More
                </button>
              </div>
            </div>

            {/* Right – browser mockup */}
            <div className="relative group">
              {/* glow behind card */}
              <div className="absolute inset-0 bg-primary/10 blur-[100px] rounded-full scale-90 group-hover:scale-100 transition-transform duration-700 pointer-events-none" />

              <div className="relative bg-white rounded-2xl shadow-2xl shadow-on-surface/5 border border-outline-variant/10 overflow-hidden lg:rotate-2 group-hover:rotate-0 transition-transform duration-500">
                {/* Window chrome */}
                <div className="flex items-center justify-between p-4 border-b border-surface-container">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-error/20" />
                    <div className="w-3 h-3 rounded-full bg-surface-container-highest" />
                    <div className="w-3 h-3 rounded-full bg-surface-container-highest" />
                  </div>
                  <span className="text-[0.6875rem] font-bold text-on-surface-variant tracking-widest uppercase">
                    Writing Assistant v2.0
                  </span>
                </div>

                {/* Editor content */}
                <div className="p-6 space-y-6">
                  {/* Prompt chip */}
                  <div className="p-4 bg-surface-container-low rounded-xl">
                    <p className="text-xs font-bold text-primary uppercase mb-2">Prompt</p>
                    <p className="text-sm font-medium text-on-surface italic">
                      "Some people believe that unpaid community service should be a compulsory part of high school programs..."
                    </p>
                  </div>

                  {/* Essay body */}
                  <div className="min-h-45 text-sm text-on-surface-variant leading-relaxed">
                    <p>
                      In recent years, the debate surrounding the inclusion of mandatory community
                      service in high school curricula has gained significant momentum. Advocates argue
                      that such programs cultivate a sense of civic responsibility, while critics
                      maintain that compulsory labor…{' '}
                      <span className="bg-primary/10 border-b-2 border-primary text-primary px-1">
                        contradicts
                      </span>{' '}
                      the very essence of volunteering.
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating score card */}
              <div className="absolute bottom-8 -right-6 w-44 bg-white p-5 rounded-2xl shadow-2xl border border-outline-variant/10 flex flex-col items-center z-10">
                <div className="text-[0.6875rem] font-bold text-on-surface-variant uppercase tracking-widest mb-1">
                  Estimated Score
                </div>
                <div className="text-5xl font-black text-primary mb-1">6.5</div>
                <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden mt-2">
                  <div className="w-[65%] h-full bg-primary" />
                </div>
                <div className="text-[10px] text-center mt-2 text-on-surface-variant font-medium">
                  Strong grammar, but needs better lexical variety.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Choose Your Exam Path ── */}
        <section className="py-24 bg-surface">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center mb-16">
            <h2 className="text-3xl font-extrabold tracking-tight text-on-surface font-headline mb-4">
              Choose Your Exam Path
            </h2>
            <p className="text-on-surface-variant max-w-2xl mx-auto">
              Select the module that matches your immigration or academic goals.
            </p>
          </div>

          <div className="max-w-4xl mx-auto px-6 lg:px-12 grid md:grid-cols-2 gap-8">
            {/* Academic */}
            <button
              onClick={() => setSelectedModule('academic')}
              className={`group p-8 rounded-2xl bg-surface-container-lowest text-left transition-all relative overflow-hidden ${
                selectedModule === 'academic'
                  ? 'border-2 border-primary shadow-xl shadow-primary/5'
                  : 'border border-outline-variant/10 hover:shadow-xl'
              }`}
            >
              {selectedModule === 'academic' && (
                <div className="absolute top-4 right-4 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-widest">
                  Selected
                </div>
              )}
              <div className="relative z-10">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-colors ${
                    selectedModule === 'academic'
                      ? 'bg-primary/10 text-primary'
                      : 'bg-surface-container text-on-surface-variant group-hover:bg-primary/10 group-hover:text-primary'
                  }`}
                >
                  <span className="material-symbols-outlined">school</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Academic Module</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  For university applications and professional registrations in English-speaking countries.
                </p>
              </div>
            </button>

            {/* General Training */}
            <button
              onClick={() => setSelectedModule('general')}
              className={`group p-8 rounded-2xl bg-surface-container-lowest text-left transition-all relative overflow-hidden ${
                selectedModule === 'general'
                  ? 'border-2 border-primary shadow-xl shadow-primary/5'
                  : 'border border-outline-variant/10 hover:shadow-xl'
              }`}
            >
              {selectedModule === 'general' && (
                <div className="absolute top-4 right-4 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-widest">
                  Selected
                </div>
              )}
              <div className="relative z-10">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-colors ${
                    selectedModule === 'general'
                      ? 'bg-primary/10 text-primary'
                      : 'bg-surface-container text-on-surface-variant group-hover:bg-primary/10 group-hover:text-primary'
                  }`}
                >
                  <span className="material-symbols-outlined">public</span>
                </div>
                <h3 className="text-xl font-bold mb-2">General Training</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  For migration purposes and secondary education or work experience in Australia,
                  Canada, and the UK.
                </p>
              </div>
            </button>
          </div>
        </section>

        {/* ── Feature Grid ── */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: 'edit_note',
                title: 'Task 2 Focused',
                desc: 'Master the most weighted part of the writing exam with specialised feedback loops.',
              },
              {
                icon: 'speed',
                title: 'Instant Score',
                desc: "Don't wait for days. Get your estimated band score within seconds of submission.",
              },
              {
                icon: 'bolt',
                title: 'Simple and Fast',
                desc: 'Clean interface designed for deep focus. No distractions, just high-quality practice.',
              },
              {
                icon: 'event_available',
                title: 'Practice Anytime',
                desc: 'Available 24/7. Your personal AI tutor is ready whenever you are to sharpen your skills.',
              },
            ].map(({ icon, title, desc }) => (
              <div
                key={title}
                className="p-8 rounded-2xl bg-surface-container-low/50 space-y-4"
              >
                <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">{icon}</span>
                </div>
                <h4 className="font-bold text-on-surface">{title}</h4>
                <p className="text-sm text-on-surface-variant">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── How It Works ── */}
        <section className="py-24 bg-surface">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            {/* Section header */}
            <div className="flex flex-col lg:flex-row items-end justify-between mb-16 gap-6">
              <div className="max-w-xl">
                <h2 className="text-3xl font-extrabold tracking-tight text-on-surface font-headline mb-4">
                  Master Task 2 in 3 Simple Steps
                </h2>
                <p className="text-on-surface-variant">
                  Our editorial approach makes studying feel less like a chore and more like a craft.
                </p>
              </div>
              <div className="h-px grow bg-outline-variant/30 hidden lg:block mb-4 mx-8" />
              <span className="text-primary font-black text-6xl opacity-10 shrink-0">01–03</span>
            </div>

            {/* Steps */}
            <div className="grid md:grid-cols-3 gap-12">
              {[
                {
                  n: '01',
                  title: 'Write Your Essay',
                  desc: 'Choose a practice prompt or paste your own. Type directly into our distraction-free editor.',
                },
                {
                  n: '02',
                  title: 'AI Analysis',
                  desc: 'Our neural engine scans your writing against official IELTS criteria: Task Response, CC, LR, and GRA.',
                },
                {
                  n: '03',
                  title: 'Review & Improve',
                  desc: 'Read detailed feedback, see corrections, and re-write to see your score climb in real-time.',
                },
              ].map(({ n, title, desc }) => (
                <div key={n} className="space-y-6">
                  <div className="text-5xl font-black text-surface-container-highest">{n}</div>
                  <h5 className="text-xl font-bold text-on-surface">{title}</h5>
                  <p className="text-on-surface-variant leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Info Notice ── */}
        <section className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-6 lg:px-12">
            <div className="bg-surface-container-low border-l-4 border-primary p-6 rounded-r-2xl flex gap-6 items-start">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                <span className="material-symbols-outlined">info</span>
              </div>
              <div>
                <h6 className="font-bold text-on-surface mb-1">Important Note on Scoring</h6>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  While our AI provides high-precision estimates, the final score can only be awarded
                  by an official IELTS examiner. Use these results as a benchmark for your preparation
                  progress.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Final CTA ── */}
        <section className="py-24 bg-white overflow-hidden relative">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="relative hero-gradient p-12 lg:p-20 rounded-[2.5rem] text-center overflow-hidden">
              {/* Decorative overlays */}
              <div className="absolute inset-0 opacity-10 grid-overlay pointer-events-none" />
              <div className="absolute top-0 left-0 w-64 h-64 bg-white/20 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2 pointer-events-none" />

              <div className="relative z-10 space-y-8">
                <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tight font-headline">
                  Ready to hit Band 8.0?
                </h2>
                <p className="text-white/80 max-w-xl mx-auto text-lg">
                  Stop guessing your progress. Start practising with the world's most accurate AI
                  IELTS writing tutor today.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                  <button onClick={() => navigate('/start-writing')}className="bg-white text-primary font-black px-10 py-5 rounded-full hover:scale-105 transition-transform shadow-2xl">
                    Get Started Now
                  </button>
                  <button
                    onClick={() => navigate('/')}
                    className="bg-white/10 text-white border border-white/30 backdrop-blur-sm font-bold px-10 py-5 rounded-full hover:bg-white/20 transition-colors"
                  >
                    Back to Home
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}
