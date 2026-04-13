const stats = [
  { icon: 'description', value: '50k+', label: 'Essays Evaluated' },
  { icon: 'record_voice_over', value: '120k+', label: 'Speaking Sessions' },
  { icon: 'groups', value: '15k+', label: 'Active Students' },
  { icon: 'bolt', value: '< 10s', label: 'Fast AI Feedback' },
]

export default function Stats() {
  return (
    <section className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="p-8 bg-surface-container-lowest rounded-xl shadow-sm border-b-4 border-primary/20 hover:border-primary transition-colors"
            >
              <span className="material-symbols-outlined text-primary text-4xl mb-4 block">
                {stat.icon}
              </span>
              <h3 className="text-3xl font-extrabold text-on-surface font-headline">{stat.value}</h3>
              <p className="text-on-surface-variant font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
