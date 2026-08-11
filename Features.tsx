"use client"

import { motion } from "framer-motion"
import { Shield, Brain, Globe, ScanLine, Settings, Zap } from "lucide-react"

const features = [
  { icon: Shield, title: "Undetectable Output", description: "Passes the hardest detectors at highest aggression setting. GPTZero, Turnitin, Originality — all cleared.", color: "#22C55E" },
  { icon: Brain, title: "Meaning Preserved", description: "Rewrites structure, not substance. Every fact, citation, and technical detail stays exactly as you wrote it.", color: "#6366F1" },
  { icon: Globe, title: "50+ Languages", description: "Full humanization pipeline across every major language. Spanish, French, Arabic, German, and beyond.", color: "#3B82F6" },
  { icon: ScanLine, title: "Built-in Detector", description: "Test before you publish. Simulated scores from 8 major detectors give you confidence before submission.", color: "#F59E0B" },
  { icon: Settings, title: "5 Rewrite Modes", description: "Tuned for every use case. Standard, Aggressive, Academic, Creative, or Minimal — you choose the intensity.", color: "#EC4899" },
  { icon: Zap, title: "Instant Turnaround", description: "Average 3.2 seconds per 1,000 words. No queues, no waiting. Paste, click, done.", color: "#8B5CF6" },
]

export default function Features() {
  return (
    <section id="features" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <h2 className="font-display text-4xl sm:text-5xl mb-4">Everything you need</h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">A complete toolkit for transforming AI text into human-sounding prose — without losing what matters.</p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div key={feature.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} whileHover={{ y: -4 }} className="panel group cursor-default">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110" style={{ backgroundColor: `${feature.color}15` }}>
                <feature.icon className="w-6 h-6" style={{ color: feature.color }} />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
