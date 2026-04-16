import { useNavigate } from 'react-router-dom'

const filledCheck = { fontVariationSettings: "'FILL' 1" }

export default function Features() {
  const navigate = useNavigate()

  return (
    <section id="features" className="py-24 bg-surface-container-low">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black text-on-surface font-headline mb-4">
            Advanced Learning Blocks
          </h2>
          <p className="text-on-surface-variant max-w-2xl mx-auto">
            Focused modules designed to tackle the hardest parts of the IELTS exam.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-12">

          {/* Writing Card */}
          <div className="bg-surface-container-lowest p-10 rounded-xl shadow-lg border border-surface-variant relative overflow-hidden group">
            <div className="absolute top-6 right-6">
              <span className="bg-secondary-container text-on-secondary-fixed-variant px-3 py-1 rounded-full text-xs font-bold uppercase tracking-tight">
                Task 2 only
              </span>
            </div>

            <div className="w-16 h-16 bg-primary-container/10 rounded-2xl flex items-center justify-center mb-8">
              <span className="material-symbols-outlined text-primary text-3xl">auto_fix_high</span>
            </div>

            <h3 className="text-2xl font-bold mb-4 font-headline">Smart Writing Correction</h3>
            <p className="text-on-surface-variant mb-8 leading-relaxed">
              Submit your essays and receive detailed feedback on Grammatical Range, Lexical
              Resource, and Task Response with exact band score estimates.
            </p>

            <ul className="space-y-4 mb-8">
              <li className="flex items-center text-on-surface">
                <span className="material-symbols-outlined text-primary mr-2" style={filledCheck}>
                  check_circle
                </span>
                Instant grammar fixing
              </li>
              <li className="flex items-center text-on-surface">
                <span className="material-symbols-outlined text-primary mr-2" style={filledCheck}>
                  check_circle
                </span>
                Vocabulary enhancement suggestions
              </li>
            </ul>

            <button
              onClick={() => navigate('/writing-module')}
              className="w-full py-4 border-2 border-primary text-primary font-bold rounded-xl hover:bg-primary hover:text-white transition-all"
            >
              Try Writing Module
            </button>
          </div>

          {/* Speaking Card */}
          <div className="bg-surface-container-lowest p-10 rounded-xl shadow-lg border border-surface-variant relative overflow-hidden group">
            <div className="absolute top-6 right-6">
              <span className="bg-secondary-container text-on-secondary-fixed-variant px-3 py-1 rounded-full text-xs font-bold uppercase tracking-tight">
                Band score only
              </span>
            </div>

            <div className="w-16 h-16 bg-tertiary-container/10 rounded-2xl flex items-center justify-center mb-8">
              <span className="material-symbols-outlined text-tertiary text-3xl">psychology</span>
            </div>

            <h3 className="text-2xl font-bold mb-4 font-headline">AI Conversational Coach</h3>
            <p className="text-on-surface-variant mb-8 leading-relaxed">
              Practice real-time speaking with our AI that mimics examiner behavior. Receive
              feedback on fluency, pronunciation, and intonation instantly.
            </p>

            <ul className="space-y-4 mb-8">
              <li className="flex items-center text-on-surface">
                <span className="material-symbols-outlined text-tertiary mr-2" style={filledCheck}>
                  check_circle
                </span>
                Real-time speech-to-text analysis
              </li>
              <li className="flex items-center text-on-surface">
                <span className="material-symbols-outlined text-tertiary mr-2" style={filledCheck}>
                  check_circle
                </span>
                Fluency and pronunciation tracking
              </li>
            </ul>

            <button
              onClick={() => navigate('/speaking-module')}
              className="w-full py-4 border-2 border-tertiary text-tertiary font-bold rounded-xl hover:bg-tertiary hover:text-white transition-all"
            >
              Try Speaking Module
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
