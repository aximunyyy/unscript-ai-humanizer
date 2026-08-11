"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check, Zap } from "lucide-react"

const plans = [
  {
    name: "Free", description: "For casual users trying it out",
    monthlyPrice: 0, yearlyPrice: 0,
    features: ["500 words / month", "Standard mode only", "1 detector check", "Basic tone controls", "Copy & download output"],
    cta: "Start for free", popular: false,
  },
  {
    name: "Pro", description: "For serious writers and students",
    monthlyPrice: 15, yearlyPrice: 9,
    features: ["50,000 words / month", "All 5 humanization modes", "Full detector suite (8 tools)", "Advanced tone & style controls", "Session history & search", "Batch processing (up to 10 files)", "Priority processing"],
    cta: "Upgrade to Pro", popular: true,
  },
  {
    name: "Team", description: "For agencies and organizations",
    monthlyPrice: 49, yearlyPrice: 29,
    features: ["Unlimited words", "All Pro features", "API access", "Shared workspace", "Team member management", "Custom integrations", "Dedicated support", "SSO & SAML"],
    cta: "Contact Sales", popular: false,
  },
]

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false)

  return (
    <section id="pricing" className="py-24 border-t" style={{ borderColor: "var(--border)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
          <h2 className="font-display text-4xl sm:text-5xl mb-4">Simple, transparent pricing</h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto mb-8">Start free, upgrade when you need more power. No hidden fees.</p>
          <div className="inline-flex items-center gap-3 p-1 rounded-full border" style={{ borderColor: "var(--border)" }}>
            <button onClick={() => setIsYearly(false)} className="px-4 py-2 rounded-full text-sm font-medium transition-all" style={{ background: !isYearly ? "#6366F1" : "transparent", color: !isYearly ? "white" : "var(--text-secondary)" }}>Monthly</button>
            <button onClick={() => setIsYearly(true)} className="px-4 py-2 rounded-full text-sm font-medium transition-all" style={{ background: isYearly ? "#6366F1" : "transparent", color: isYearly ? "white" : "var(--text-secondary)" }}>
              Yearly <span className="ml-1.5 text-xs px-1.5 py-0.5 rounded-full bg-success/20 text-success">-40%</span>
            </button>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div key={plan.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} whileHover={{ y: -4 }} className="panel relative flex flex-col" style={{ borderColor: plan.popular ? "#6366F1" : "var(--border)", borderWidth: plan.popular ? "2px" : "1px" }}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-accent text-white text-xs font-medium"><Zap className="w-3 h-3" />Most Popular</div>
                </div>
              )}
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-1">{plan.name}</h3>
                <p className="text-sm text-text-secondary">{plan.description}</p>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold font-display">${isYearly ? plan.yearlyPrice : plan.monthlyPrice}</span>
                <span className="text-text-secondary">/mo</span>
                {isYearly && plan.monthlyPrice > 0 && (
                  <div className="text-xs text-text-secondary mt-1">Billed annually (${(isYearly ? plan.yearlyPrice : plan.monthlyPrice) * 12}/year)</div>
                )}
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm"><Check className="w-4 h-4 text-success shrink-0 mt-0.5" /><span>{feature}</span></li>
                ))}
              </ul>
              <button className="w-full py-3 rounded-xl font-medium transition-all" style={{ background: plan.popular ? "linear-gradient(90deg, #6366F1, #8B5CF6)" : "var(--surface)", color: plan.popular ? "white" : "var(--text-primary)", border: plan.popular ? "none" : "1px solid var(--border)", boxShadow: plan.popular ? "0 0 20px rgba(99, 102, 241, 0.3)" : "none" }}>
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
