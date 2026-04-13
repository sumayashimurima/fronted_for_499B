export default function FinalCTA() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto hero-gradient rounded-3xl p-12 md:p-24 text-center relative overflow-hidden">
        {/* Dot grid overlay */}
        <div className="absolute inset-0 grid-overlay opacity-20" />

        <div className="relative z-10">
          <h2 className="text-4xl md:text-6xl font-black text-white font-headline mb-8">
            Ready to ace your IELTS?
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-12 leading-relaxed">
            Join thousands of students who have already improved their band scores with our AI-Powered tutoring system.
          </p>
          <button className="bg-white text-primary px-12 py-5 rounded-xl font-black text-xl hover:scale-105 transition-transform shadow-2xl">
            Start Now Free
          </button>
          <p className="text-white/60 mt-6 text-sm">"start where you are,use what you have,do what you can"- Arthur Ashe.</p>
        </div>
      </div>
    </section>
  )
}
