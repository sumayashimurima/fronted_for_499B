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

function ImagePlaceholder({ variant }) {
  const isWriting = variant === 'writing'

  return (
    <div
      className={`relative w-full rounded-xl overflow-hidden aspect-[5/4] shadow-xl ${
        isWriting
          ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-[#1a0506]'
          : 'bg-gradient-to-br from-[#001820] via-slate-800 to-slate-900'
      }`}
    >
      {/* Dot grid overlay */}
      <div className="absolute inset-0 grid-overlay opacity-20" />

      {/* Ambient glow */}
      <div
        className={`absolute inset-0 ${
          isWriting
            ? 'bg-[radial-gradient(ellipse_at_bottom_left,rgba(175,16,26,0.25),transparent_60%)]'
            : 'bg-[radial-gradient(ellipse_at_top_right,rgba(0,95,123,0.3),transparent_60%)]'
        }`}
      />

      {/* Central icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className={`material-symbols-outlined text-[96px] opacity-10 ${
            isWriting ? 'text-primary-fixed' : 'text-tertiary-fixed'
          }`}
          style={{ fontVariationSettings: "'FILL' 1, 'wght' 300, 'opsz' 96" }}
        >
          {isWriting ? 'edit_document' : 'record_voice_over'}
        </span>
      </div>

      {/* Floating info chip */}
      <div
        className={`absolute bottom-5 left-5 right-5 backdrop-blur-md rounded-xl p-4 border ${
          isWriting
            ? 'bg-white/8 border-white/10'
            : 'bg-white/8 border-white/10'
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
              isWriting ? 'bg-primary/80' : 'bg-tertiary/80'
            }`}
          >
            <span
              className="material-symbols-outlined text-white text-base"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              {isWriting ? 'auto_fix_high' : 'mic'}
            </span>
          </div>
          <div>
            <p className="text-xs font-bold text-white">
              {isWriting ? 'AI Scoring Engine' : 'Live AI Session'}
            </p>
            <p className="text-xs text-white/50">
              {isWriting ? 'Band 6.5 → 8.0 pathway' : 'Analyzing pronunciation…'}
            </p>
          </div>
          <div className="ml-auto flex gap-0.5 items-end">
            {[3, 5, 7, 5, 4, 6, 8].map((h, i) => (
              <div
                key={i}
                className={`w-0.5 rounded-full ${isWriting ? 'bg-primary-fixed' : 'bg-tertiary-fixed'} opacity-70`}
                style={{ height: `${h * 3}px` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function PracticeModules() {
  return (
    <section className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-6 space-y-0">

        {/* ── Row 1: Image LEFT · Content RIGHT ── */}
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16 pb-16">
          {/* Image */}
          <div className="w-full md:w-1/2">
            <ImagePlaceholder variant="writing" />
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
            <ImagePlaceholder variant="speaking" />
          </div>
        </div>

      </div>
    </section>
  )
}
