export default function AIEdge() {
  return (
    <section className="py-24 bg-surface-container-low">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-black font-headline text-on-surface mb-12">The AI Edge</h2>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6">

          {/* Wide card — Officially Calibrated */}
          <div className="md:col-span-2 bg-surface-container-lowest p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <span className="material-symbols-outlined text-primary text-3xl mb-4 block">verified</span>
            <h4 className="text-xl font-bold mb-2">Officially Calibrated</h4>
            <p className="text-on-surface-variant">
              Our AI is trained on over 100,000 graded IELTS papers, ensuring 95% accuracy in band
              score prediction compared to real examiners.
            </p>
          </div>

          {/* Accent card — 24/7 */}
          <div className="bg-primary p-8 rounded-xl text-white shadow-lg flex flex-col justify-end">
            <span className="material-symbols-outlined text-4xl mb-4 block">schedule</span>
            <h4 className="text-xl font-bold mb-2">24/7 Tutor Availability</h4>
            <p className="text-white/80">No waiting for office hours. Study at 2 AM or 2 PM.</p>
          </div>

          {/* Progress Mapping */}
          <div className="bg-surface-container-lowest p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <span className="material-symbols-outlined text-primary text-3xl mb-4 block">chart_data</span>
            <h4 className="text-xl font-bold mb-2">Progress Mapping</h4>
            <p className="text-on-surface-variant">
              Visual charts showing your trajectory across all 4 criteria.
            </p>
          </div>

          {/* Wide card — Linguistic Diversity */}
          <div className="md:col-span-2 bg-surface-container-lowest p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <span className="material-symbols-outlined text-primary text-3xl mb-4 block">language</span>
            <h4 className="text-xl font-bold mb-2">Linguistic Diversity</h4>
            <p className="text-on-surface-variant">
              Feedback adapted to your native language context, helping you overcome common
              regional errors in English speaking.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
