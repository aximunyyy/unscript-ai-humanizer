"use client"

import { motion } from "framer-motion"

const detectors = ["GPTZero", "Turnitin", "Originality.ai", "Copyleaks", "Winston AI", "Sapling", "ZeroGPT", "Content at Scale"]

export default function DetectorLogos() {
  return (
    <section className="py-16 border-t border-b" style={{ borderColor: "var(--border)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center text-sm text-text-secondary mb-8">Compatible with every major AI detector</motion.p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {detectors.map((name, i) => (
            <motion.div key={name} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="text-lg font-semibold text-text-secondary/40 hover:text-text-secondary/70 transition-colors cursor-default">{name}</motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
