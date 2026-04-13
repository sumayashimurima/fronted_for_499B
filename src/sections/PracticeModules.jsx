const filledCheck = { fontVariationSettings: "'FILL' 1" }

const writingPoints = [
  'Instant band score evaluation',
  'Detailed grammar & coherence feedback',
  'Task response & lexical resource analysis',
]

const speakingPoints = [
  'AI-driven conversational flow',
  'Pronunciation feedback',
  'Fluency & intonation scoring',
]


export default function PracticeModules() {
  return (
    <section className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-6 space-y-0">

        {/* ── Row 1: Image LEFT · Content RIGHT ── */}
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16 pb-16">
          {/* Image */}
          <div className="w-full md:w-1/2">
            <img
              src="/design/for_writing.jpg"
              alt="IELTS Writing Practice"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>

          {/* Content */}
          <div className="w-full md:w-1/2 space-y-5">
            <span className="inline-block text-[10px] font-black uppercase tracking-[0.18em] text-primary bg-primary/8 px-3 py-1 rounded-full">
              Expert Writing Analysis
            </span>

            <h2 className="text-3xl md:text-4xl font-black font-headline text-on-surface leading-tight">
              Practice IELTS Writing Task&nbsp;2
            </h2>

            <p className="text-on-surface-variant leading-relaxed">
              Focus on the most challenging part of the writing test. Our AI is specialized for{' '}
              <span className="font-semibold text-on-surface">Task 2 only</span>, providing the
              deep technical feedback needed to push your band score higher.
            </p>

            <ul className="space-y-3 pt-1">
              {writingPoints.map((pt) => (
                <li key={pt} className="flex items-center gap-3 text-on-surface">
                  <span
                    className="material-symbols-outlined text-primary text-xl shrink-0"
                    style={filledCheck}
                  >
                    check_circle
                  </span>
                  <span className="text-sm font-medium">{pt}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-surface-variant" />

        {/* ── Row 2: Content LEFT · Image RIGHT ── */}
        <div className="flex flex-col-reverse md:flex-row items-center gap-10 md:gap-16 pt-16">
          {/* Content */}
          <div className="w-full md:w-1/2 space-y-5">
            <span className="inline-block text-[10px] font-black uppercase tracking-[0.18em] text-tertiary bg-tertiary/8 px-3 py-1 rounded-full">
              Interactive Speaking
            </span>

            <h2 className="text-3xl md:text-4xl font-black font-headline text-on-surface leading-tight">
              Practice Speaking with AI
            </h2>

            <p className="text-on-surface-variant leading-relaxed">
              Speak naturally with an AI that understands context. Improve your{' '}
              <span className="font-semibold text-on-surface">fluency and pronunciation</span> with
              lifelike conversational practice modelled on real examiner behaviour.
            </p>

            <ul className="space-y-3 pt-1">
              {speakingPoints.map((pt) => (
                <li key={pt} className="flex items-center gap-3 text-on-surface">
                  <span
                    className="material-symbols-outlined text-tertiary text-xl shrink-0"
                    style={filledCheck}
                  >
                    check_circle
                  </span>
                  <span className="text-sm font-medium">{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Image */}
          <div className="w-full md:w-1/2">
            <img
              src="/design/for_speaking.png"
              alt="IELTS Speaking Practice"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        </div>

      </div>
    </section>
  )
}
