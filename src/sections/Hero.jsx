export default function Hero() {
  return (
    <header className="relative pt-32 pb-20 md:pt-48 md:pb-40 hero-gradient overflow-hidden">
      {/* Dot grid overlay */}
      <div className="absolute inset-0 grid-overlay opacity-40" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center">

        {/* Left: Copy */}
        <div className="md:w-1/2 text-left space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
            <span className="text-amber-50 text-sm font-semibold uppercase tracking-widest">
              New: AI Speaking 2.0
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-extrabold text-white font-headline leading-[1.1] tracking-tight">
            Boost Your IELTS <br />
            <span className="text-red-400">Writing and Speaking</span> with AI
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-slate-300 max-w-xl font-light leading-relaxed">
            Personalized coaching powered by advanced linguistics AI. Get band scores instantly
            and improve with 24/7 access to your private tutor.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <a
              href="#features"
              className="bg-white text-primary px-8 py-4 rounded-xl font-bold text-lg hover:shadow-[0px_8px_24px_rgba(175,16,26,0.30)] active:scale-95 transition-alltransition-colors shadow-lg"
            >
              Start Free Now
            </a>
            <button className="bg-white/10 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-colors">
              Explore Features
            </button>
          </div>
        </div>

        {/* Right: Floating UI Cards */}
        <div className="md:w-1/2 mt-16 md:mt-0 relative">

          {/* Writing Task Card */}
          <div className="relative bg-surface-container-lowest rounded-2xl shadow-2xl p-6 border border-white/10 backdrop-blur-md bg-opacity-95 md:rotate-3">
            <div className="flex items-center justify-between mb-6 border-b border-surface-variant pb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-white">
                  <span className="material-symbols-outlined">edit_square</span>
                </div>
                <span className="font-bold text-on-surface">Writing Task 2 Task</span>
              </div>
              <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold">
                In Progress
              </div>
            </div>

            <div className="space-y-4">
              <div className="h-4 bg-surface-container-low rounded-full w-3/4" />
              <div className="h-4 bg-surface-container-low rounded-full w-full" />
              <div className="h-4 bg-surface-container-low rounded-full w-5/6" />

              {/* Band Score */}
              <div className="bg-primary-fixed/30 p-4 rounded-xl mt-6">
                <div className="flex items-center justify-between">
                  <span className="text-on-surface-variant font-medium">Estimated Band Score</span>
                  <span className="text-3xl font-black text-primary">6.5</span>
                </div>
                <p className="text-sm text-on-surface-variant mt-2">
                  Grammar &amp; Cohesion:{' '}
                  <span className="font-bold text-on-surface">7.0</span>
                </p>
              </div>
            </div>
          </div>

          {/* Speaking card — floats bottom-left on large screens */}
          <div className="absolute -bottom-10 -left-10 hidden lg:block bg-surface-container-lowest p-5 rounded-2xl shadow-2xl border border-primary/20 w-64 -rotate-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-tertiary flex items-center justify-center text-white">
                <span
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  mic
                </span>
              </div>
              <span className="text-sm font-bold">Speaking Session</span>
            </div>

            {/* Waveform bars */}
            <div className="flex justify-center py-2">
              <div className="flex space-x-1 items-end h-8">
                {[4, 6, 8, 5, 7].map((h, i) => (
                  <div
                    key={i}
                    className="w-1 bg-primary rounded-full"
                    style={{ height: `${h * 4}px` }}
                  />
                ))}
              </div>
            </div>

            <p className="text-xs text-secondary text-center mt-3">Analyzing pronunciation...</p>
          </div>
        </div>
      </div>
    </header>
  )
}
