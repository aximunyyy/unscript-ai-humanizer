"use client"

import { motion } from "framer-motion"
import { ClipboardPaste, SlidersHorizontal, Wand2 } from "lucide-react"

const steps = [
  { icon: ClipboardPaste, number: "01", title: "Paste or upload", description: "Drop in text from ChatGPT, Claude, Gemini, or any AI model. Supports direct paste, file upload, or typing." },
  { icon: SlidersHorizontal, number: "02", title: "Choose your settings", description: "Select a humanization mode and fine-tune tone, formality, region, and purpose. Lock keywords you want preserved." },
  { icon: Wand2, number: "03", title: "Hit Humanize", description: "Get human-sounding output in seconds. Review detector scores, copy, download, or share — all in one click." },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 border-t" style={{ borderColor: "var(--border)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <h2 className="font-display text-4xl sm:text-5xl mb-4">How it works</h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">Three simple steps from AI-generated to human-sounding.</p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div key={step.number} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.15 }} className="relative text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 bg-accent/10">
                <step.icon className="w-8 h-8 text-accent" />
              </div>
              <div className="text-5xl font-display font-bold text-text-secondary/20 mb-4">{step.number}</div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed max-w-xs mx-auto">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
