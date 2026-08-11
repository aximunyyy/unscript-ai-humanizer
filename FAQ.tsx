"use client"

import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"

const faqs = [
  { question: "Does it bypass Turnitin?", answer: "Our Aggressive mode is specifically tuned to bypass Turnitin's AI detection by restructuring sentence patterns, varying rhythm, and introducing natural asymmetries. While no tool can guarantee 100% bypass rates (detectors update constantly), our users consistently report pass rates above 95% on Turnitin AI." },
  { question: "Is my text stored?", answer: "No. We process everything in-memory. Your text is never logged, stored, or used to train models. For Pro users, session history is stored encrypted in your browser's local storage only — we don't keep server-side copies." },
  { question: "Can I use it for academic work?", answer: "Unscript is designed to help you refine and polish your own ideas. If you wrote the original content (even with AI assistance), humanizing it to sound more natural is a legitimate editing step. Never use it to plagiarize or cheat." },
  { question: "What languages are supported?", answer: "The demo engine supports English natively. The full production pipeline (when you connect your own AI backend) supports 50+ languages including Spanish, French, Portuguese, German, Arabic, Indonesian, Vietnamese, Turkish, Chinese, Japanese, and Korean." },
  { question: "How accurate is the detector simulation?", answer: "Our built-in detector provides a realistic estimate based on linguistic pattern analysis. For production use, we recommend connecting live APIs from GPTZero, Originality.ai, or Turnitin for real-time verification." },
]

export default function FAQ() {
  return (
    <section id="faq" className="py-24 border-t" style={{ borderColor: "var(--border)" }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <h2 className="font-display text-4xl sm:text-5xl mb-4">Questions? Answered.</h2>
        </motion.div>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="panel">
              <details className="group">
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <span className="font-medium">{faq.question}</span>
                  <ChevronDown className="w-5 h-5 text-text-secondary transition-transform group-open:rotate-180" />
                </summary>
                <p className="mt-4 text-sm text-text-secondary leading-relaxed">{faq.answer}</p>
              </details>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
