"use client"

import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"

const testimonials = [
  { name: "Sarah Chen", role: "Graduate Student, Stanford", quote: "I was skeptical at first, but Unscript saved my thesis submission. Turnitin flagged my ChatGPT draft at 87% AI. After running it through Aggressive mode? 4%. My advisor never knew.", rating: 5 },
  { name: "Marcus Johnson", role: "Freelance SEO Writer", quote: "I write 50 articles a month with AI assistance. Unscript is the difference between client rejection and client retention. The Creative mode actually makes my content read better than my original prompts.", rating: 5 },
  { name: "Elena Rodriguez", role: "Content Marketing Lead", quote: "Our team publishes 20+ blog posts weekly. We used to get flagged by Originality.ai constantly. Since switching to Unscript, we've had zero flagged pieces in three months.", rating: 5 },
  { name: "David Park", role: "Product Manager, Series B Startup", quote: "I use it for internal docs, PRDs, and investor updates. The Academic mode keeps things precise while stripping out that unmistakable AI cadence. Worth every penny of the Pro plan.", rating: 5 },
]

export default function Testimonials() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <h2 className="font-display text-4xl sm:text-5xl mb-4">Loved by writers everywhere</h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">Real people, real results, real peace of mind.</p>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <motion.div key={t.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="panel relative">
              <Quote className="absolute top-6 right-6 w-8 h-8 text-accent/10" />
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-warning text-warning" />
                ))}
              </div>
              <p className="text-sm leading-relaxed mb-6">&ldquo;{t.quote}&rdquo;</p>
              <div>
                <div className="font-semibold text-sm">{t.name}</div>
                <div className="text-xs text-text-secondary">{t.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
