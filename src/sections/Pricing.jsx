const filledCheck = { fontVariationSettings: "'FILL' 1" }

export default function Pricing() {
  return (
    <section className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black font-headline text-on-surface">
            Simple, Transparent Pricing
          </h2>
          <p className="text-on-surface-variant mt-4">
            Start for free, upgrade when you're ready to master the test.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">

          {/* Free Tier */}
          <div className="bg-surface-container-lowest p-10 rounded-xl shadow-sm border border-slate-200">
            <h3 className="text-2xl font-bold mb-2">Free</h3>
            <div className="flex items-baseline mb-6">
              <span className="text-4xl font-black">$0</span>
              <span className="text-on-surface-variant ml-2">/month</span>
            </div>
            <ul className="space-y-4 mb-10">
              {[
                '2 Essays per week',
                '10 min Speaking session',
                'Basic band estimation',
              ].map((item) => (
                <li key={item} className="flex items-center text-on-surface-variant">
                  <span className="material-symbols-outlined text-slate-400 mr-2 text-xl">check</span>
                  {item}
                </li>
              ))}
            </ul>
            <button className="w-full py-4 bg-surface-container-high text-on-surface font-bold rounded-xl hover:bg-surface-variant transition-colors">
              Start Free
            </button>
          </div>

          {/* Pro Tier */}
          <div className="bg-surface-container-lowest p-10 rounded-xl shadow-2xl border-2 border-primary relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest whitespace-nowrap">
              Most Popular
            </div>
            <h3 className="text-2xl font-bold mb-2">Pro</h3>
            <div className="flex items-baseline mb-6">
              <span className="text-4xl font-black text-primary">$29</span>
              <span className="text-on-surface-variant ml-2">/month</span>
            </div>
            <ul className="space-y-4 mb-10">
              {[
                'Unlimited Essay Grading',
                'Unlimited AI Speaking Practice',
                'Detailed Linguistic Feedback',
                'Priority support & Examiner tips',
              ].map((item) => (
                <li key={item} className="flex items-center text-on-surface">
                  <span
                    className="material-symbols-outlined text-primary mr-2 text-xl"
                    style={filledCheck}
                  >
                    check_circle
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <button className="w-full py-4 bg-primary text-white font-bold rounded-xl hover:opacity-90 shadow-[0_0_20px_rgba(175,16,26,0.3)] transition-all">
              Go Pro Now
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
