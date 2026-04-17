import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const filledIcon = { fontVariationSettings: "'FILL' 1" }

const values = [
  {
    icon: 'auto_fix_high',
    color: 'primary',
    title: 'Instant AI Feedback',
    description:
      'Submit your writing or speaking response and receive granular feedback within seconds — band score estimates, grammar analysis, and vocabulary suggestions all at once.',
  },
  {
    icon: 'mic',
    color: 'tertiary',
    title: 'Speaking Practice',
    description:
      'Engage with an AI examiner that mirrors real IELTS speaking tests. Build fluency, reduce hesitation, and sharpen pronunciation with every session.',
  },
  {
    icon: 'query_stats',
    color: 'primary',
    title: 'Score Accuracy',
    description:
      'Our model is trained on thousands of IELTS submissions. Band score predictions are calibrated to match official examiner criteria as closely as possible.',
  },
  {
    icon: 'schedule',
    color: 'tertiary',
    title: '24 / 7 Access',
    description:
      'No appointments, no waiting lists. Practice at midnight before your exam day or early morning on a commute — the tutor is always there.',
  },
]

const howItHelps = [
  {
    number: '01',
    title: 'Identify Weak Areas Fast',
    body: 'Detailed criterion-level scores (Task Achievement, Coherence, Lexical Resource, Grammar) surface exactly where you lose points — so you study smarter, not harder.',
  },
  {
    number: '02',
    title: 'Build Confidence Through Repetition',
    body: 'Volume matters. AGINTIC lets you complete dozens of practice tasks per week at zero additional cost, replacing the expensive cycle of human tutor sessions.',
  },
  {
    number: '03',
    title: 'Track Progress Over Time',
    body: 'Every session is logged. Watch your band score trend upward as you apply feedback and re-attempt similar tasks, with a clear history to share with your teacher.',
  },
]

export default function AboutUs() {
  const navigate = useNavigate()

  return (
    <div className="bg-surface font-body text-on-surface">
      <Navbar />

      {/* ── Hero ── */}
      <header className="relative pt-36 pb-28 md:pt-52 md:pb-40 hero-gradient overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-40" />
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 mb-8">
            <span className="material-symbols-outlined text-amber-200 text-sm mr-2" style={filledIcon}>
              school
            </span>
            <span className="text-amber-50 text-sm font-semibold uppercase tracking-widest">
              Our Story
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-white font-headline leading-[1.1] tracking-tight mb-8">
            About{' '}
            <span className="text-red-400">AGINTIC</span>
            <br />
            AI Tutor
          </h1>

          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
            We built the AI tutor we wished we had — one that gives expert-level IELTS feedback
            instantly, affordably, and without judgment, so every student can reach their target band.
          </p>
        </div>
      </header>

      {/* ── Mission ── */}
      <section className="py-24 bg-surface-container-lowest">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">

            {/* Left: text */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-widest">
                <span className="material-symbols-outlined text-base" style={filledIcon}>flag</span>
                Our Mission
              </div>
              <h2 className="text-4xl md:text-5xl font-black font-headline text-on-surface leading-tight">
                Democratize world-class IELTS preparation
              </h2>
              <p className="text-on-surface-variant leading-relaxed text-lg">
                Quality IELTS coaching has historically been locked behind expensive tutors and
                rigid schedules. AGINTIC breaks that barrier by pairing the depth of a human examiner's
                insight with the scalability of AI — available to every student, everywhere, at any hour.
              </p>
              <p className="text-on-surface-variant leading-relaxed">
                We focus exclusively on IELTS Writing Task 2 and Speaking because these two sections
                have the steepest learning curve and benefit most from repeated, structured practice
                with detailed feedback loops.
              </p>
            </div>

            {/* Right: stat blocks */}
            <div className="grid grid-cols-2 gap-6">
              {[
                { label: 'Students Helped', value: '12 K+', icon: 'group' },
                { label: 'Practice Sessions', value: '80 K+', icon: 'history_edu' },
                { label: 'Avg. Band Gain', value: '+1.2', icon: 'trending_up' },
                { label: 'Countries Reached', value: '60+', icon: 'public' },
              ].map(({ label, value, icon }) => (
                <div
                  key={label}
                  className="bg-surface-container p-6 rounded-xl border border-surface-variant"
                >
                  <span className="material-symbols-outlined text-primary text-3xl mb-3 block" style={filledIcon}>
                    {icon}
                  </span>
                  <p className="text-3xl font-black font-headline text-on-surface">{value}</p>
                  <p className="text-sm text-on-surface-variant mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Value Cards ── */}
      <section className="py-24 bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black font-headline text-on-surface mb-4">
              Why AGINTIC Works
            </h2>
            <p className="text-on-surface-variant max-w-2xl mx-auto">
              Every feature is designed around one goal: helping you achieve your target band score as efficiently as possible.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map(({ icon, color, title, description }) => (
              <div
                key={title}
                className="bg-surface-container-lowest p-8 rounded-xl shadow-lg border border-surface-variant flex flex-col gap-4"
              >
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                    color === 'primary'
                      ? 'bg-primary/10'
                      : 'bg-tertiary-container/10'
                  }`}
                >
                  <span
                    className={`material-symbols-outlined text-2xl ${
                      color === 'primary' ? 'text-primary' : 'text-tertiary'
                    }`}
                  >
                    {icon}
                  </span>
                </div>
                <h3 className="text-lg font-bold font-headline text-on-surface">{title}</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed flex-1">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Helps Students ── */}
      <section className="py-32 bg-surface">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-20">
            <h2 className="text-4xl font-black font-headline text-on-surface uppercase tracking-tighter">
              How It Helps Students
            </h2>
            <div className="h-1.5 w-24 bg-primary mx-auto mt-4 rounded-full" />
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start space-y-16 md:space-y-0 md:space-x-12 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-slate-200 -z-0" />

            {howItHelps.map((step, i) => (
              <div key={step.number} className="flex-1 relative z-10 text-center">
                <div
                  className={`w-20 h-20 border-4 border-primary text-xl font-black rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl font-headline ${
                    i === 1 ? 'bg-primary text-white' : 'bg-surface-container-lowest text-primary'
                  }`}
                >
                  {step.number}
                </div>
                <h4 className="text-xl font-bold mb-3 font-headline">{step.title}</h4>
                <p className="text-on-surface-variant px-4 leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Vision / Team ── */}
      <section className="py-24 bg-surface-container-lowest">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black font-headline text-on-surface mb-4">
              Our Vision
            </h2>
            <p className="text-on-surface-variant max-w-2xl mx-auto">
              Built by students and educators who believe technology should remove barriers, not create new ones.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: 'lightbulb',
                color: 'primary',
                heading: 'Student-First Design',
                body: 'Every decision is made by asking: does this genuinely help a student prepare better? We skip flashy features that don\'t move the needle on band scores.',
              },
              {
                icon: 'science',
                color: 'tertiary',
                heading: 'Research-Backed AI',
                body: 'Our scoring models are continuously evaluated against official IELTS criteria and validated through real exam outcomes reported by our users.',
              },
              {
                icon: 'diversity_3',
                color: 'primary',
                heading: 'Global Accessibility',
                body: 'We aim to keep AGINTIC free or deeply affordable for students in lower-income regions where expensive human tutoring is simply not an option.',
              },
            ].map(({ icon, color, heading, body }) => (
              <div
                key={heading}
                className="bg-surface-container p-8 rounded-xl border border-surface-variant"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${
                    color === 'primary' ? 'bg-primary/10' : 'bg-tertiary-container/10'
                  }`}
                >
                  <span
                    className={`material-symbols-outlined text-xl ${
                      color === 'primary' ? 'text-primary' : 'text-tertiary'
                    }`}
                    style={filledIcon}
                  >
                    {icon}
                  </span>
                </div>
                <h3 className="text-xl font-bold font-headline mb-3">{heading}</h3>
                <p className="text-on-surface-variant leading-relaxed text-sm">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto hero-gradient rounded-3xl p-12 md:p-24 text-center relative overflow-hidden">
          <div className="absolute inset-0 grid-overlay opacity-20" />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black text-white font-headline mb-8">
              Ready to reach your target band?
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto mb-12 leading-relaxed">
              Join thousands of students already improving with AGINTIC AI Tutor —
              no tutor appointments, no waiting, just results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/writing-module')}
                className="bg-white text-primary px-12 py-5 rounded-xl font-black text-xl hover:scale-105 transition-transform shadow-2xl"
              >
                Start Writing Practice
              </button>
              <button
                onClick={() => navigate('/speaking-module')}
                className="bg-white/10 backdrop-blur-sm border border-white/30 text-white px-12 py-5 rounded-xl font-black text-xl hover:bg-white/20 transition-colors"
              >
                Try Speaking Module
              </button>
            </div>
            <p className="text-white/60 mt-8 text-sm">
              "Start where you are, use what you have, do what you can." — Arthur Ashe
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
