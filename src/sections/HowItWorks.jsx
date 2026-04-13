const steps = [
  {
    number: '1',
    title: 'Select Your Target',
    description: 'Choose Writing or Speaking and set your desired IELTS band score.',
    highlighted: false,
  },
  {
    number: '2',
    title: 'Practice with AI',
    description: 'Complete simulated tasks with 24/7 access to AI guidance and prompts.',
    highlighted: false,
  },
  {
    number: '3',
    title: 'Analyze & Improve',
    description: 'Review deep-dive feedback and track your progress toward the exam day.',
    highlighted: true,
  },
]

export default function HowItWorks() {
  return (
    <section className="py-32 bg-surface">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl font-black font-headline text-on-surface uppercase tracking-tighter">
            Your Journey to Band 8.0
          </h2>
          <div className="h-1.5 w-24 bg-primary mx-auto mt-4 rounded-full" />
        </div>

        {/* Steps */}
        <div className="flex flex-col md:flex-row justify-between items-start space-y-16 md:space-y-0 md:space-x-12 relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-slate-200 -z-0" />

          {steps.map((step) => (
            <div key={step.number} className="flex-1 relative z-10 text-center">
              <div
                className={`w-20 h-20 border-4 border-primary text-2xl font-black rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl ${
                  step.highlighted
                    ? 'bg-primary text-white'
                    : 'bg-surface-container-lowest text-primary'
                }`}
              >
                {step.number}
              </div>
              <h4 className="text-xl font-bold mb-3 font-headline">{step.title}</h4>
              <p className="text-on-surface-variant px-4">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
