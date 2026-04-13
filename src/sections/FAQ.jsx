import { useState } from 'react'

const faqs = [
  {
    question: 'Is the band score accurate?',
    answer:
      'Yes. Our AI is trained on over 100,000 real IELTS papers graded by certified examiners. In independent testing, our band score predictions achieve 95% accuracy compared to official human graders.',
  },
  {
    question: 'Do you cover both Academic and General Training?',
    answer:
      'Currently, our Writing module focuses on Academic Task 2 essays. We are actively developing Task 1 Academic, General Training Task 1, and General Training Task 2 modules, which will be released in upcoming updates.',
  },
  {
    question: 'Can I cancel my subscription anytime?',
    answer:
      'Absolutely. There are no long-term commitments. You can cancel your Pro subscription at any time from your account settings, and you will retain access until the end of your current billing period.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i)

  return (
    <section className="py-24 bg-surface">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-3xl font-black font-headline text-on-surface text-center mb-12">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-surface-variant"
            >
              <button
                className="flex justify-between items-center w-full cursor-pointer text-left"
                onClick={() => toggle(i)}
                aria-expanded={openIndex === i}
              >
                <h4 className="font-bold text-on-surface pr-4">{faq.question}</h4>
                <span
                  className="material-symbols-outlined text-on-surface-variant shrink-0 transition-transform duration-300"
                  style={{ transform: openIndex === i ? 'rotate(180deg)' : 'rotate(0deg)' }}
                >
                  expand_more
                </span>
              </button>

              {openIndex === i && (
                <p className="mt-4 text-on-surface-variant leading-relaxed text-sm border-t border-surface-container-high pt-4">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
