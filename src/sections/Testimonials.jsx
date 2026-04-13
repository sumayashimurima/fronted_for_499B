const filledStar = { fontVariationSettings: "'FILL' 1" }

const testimonials = [
  {
    quote:
      '"I went from a 6.0 to a 7.5 in Writing in just 3 weeks. The feedback on my lexical range was the game changer."',
    name: 'David Chen',
    target: 'Target: 7.5 (Achieved)',
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBfB_Or3fjAwDHl4l85PqGXjaxOuIAuRha5fd3NVWw-L3wtzhqm-a7sBDruLNeAdOOcSzDJENUo7bSzIaozntgpnHIxOu-jmhd6ySkp3o9bjPVjLKCpY79ksV-anyZNlLSKju6PyKarOoTArDrwPatzPrS379l5qu-5B7RkoTtKoPx95Mca8Fcl6eB3g13JWwZZkbXN2faSPT8RYeCBJpru1O7SqW4R-Iq5m9uUn_NtbCXNjJbdc6r1XWOM4905KASMOaXiAK404wQ',
  },
  {
    quote:
      '"The AI Speaking tutor is incredibly realistic. It really helped me get over my nerves for the actual interview."',
    name: 'Maria Rossi',
    target: 'Target: 7.0 (Achieved)',
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAzB4nqFvLab8oVwhwLBuUKvccuQvlOoFYZYn2ctMkBwbSCXlP8B3BUMeVHMxkvZhksuniOtU-K-ONnxqR73xbrzSwCVXF52KhsmxK4iVRukG7REv20HB_8xYFfO-qvw9U1RwgB7ZuGFSuoNn0jBgc0wzAQsRDBtSEJ5GqHIPxXm-Rb0bXub5GFjLGkE1u7YxzY3LBpgp8jGeOyV5UIWxOR3IStRDYn3aeZjUxJS0SlrZSrhTsICH9oxWOByGpDk5IBt7ji5wT43Gk',
  },
  {
    quote: '"Detailed, fast, and accurate. It\'s like having an IELTS examiner in your pocket at all times."',
    name: 'Ahmed Khalil',
    target: 'Target: 8.0 (Achieved)',
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC6e0NtRWgNgnxztK2j-l5cMVJSsOOT6w0EWxe0GW0bOVfSsE7yM4KlzETzGhLQvJFOQ8ogZ4fRNSlA9w5P76tdXTgdlPDuTQeAsee8hPFaHKmWpRwPJcZMEEJm0AZZM_UzQmv1-3GXUdk9yKBEmUpGATMSn-sbNdUM2qTZMDS0SBATxBRJjyR3x9xCUVROlyPyaXY_8PaW0gl0iHn0N1pUTKqk_v7ngsFQP9t-Aw-BRzpgKibEzS9xvzsyJAUfXIqxVtD4RFK2Mcs',
  },
]

export default function Testimonials() {
  return (
    <section className="py-24 bg-surface-container-low">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-center text-4xl font-black font-headline text-on-surface mb-16">
          What Our Students Say
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-surface-container-lowest p-8 rounded-xl shadow-sm">
              {/* Stars */}
              <div className="flex text-primary mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="material-symbols-outlined" style={filledStar}>
                    star
                  </span>
                ))}
              </div>

              <p className="text-on-surface-variant italic mb-6">{t.quote}</p>

              {/* Author */}
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-slate-200 mr-3 overflow-hidden shrink-0">
                  <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="font-bold text-on-surface">{t.name}</p>
                  <p className="text-xs text-secondary">{t.target}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
