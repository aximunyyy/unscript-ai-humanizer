"use client"

import { motion } from "framer-motion"
import { ArrowRight, Users, Shield, Clock } from "lucide-react"

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] opacity-20"
          style={{ background: "radial-gradient(ellipse, rgba(99, 102, 241, 0.4) 0%, transparent 70%)" }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8"
            style={{ 
              background: "rgba(99, 102, 241, 0.1)",
              border: "1px solid rgba(99, 102, 241, 0.2)",
              color: "#818CF8"
            }}
          >
            <Shield className="w-4 h-4" />
            Trusted by 1M+ students, writers, and researchers
          </motion.div>

          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-normal leading-tight mb-6">
            Make AI Writing Sound{" "}
            <span className="gradient-text italic">Human</span>
            <br />— Instantly
          </h1>

          <p className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed">
            Paste any AI text. Get back writing that passes GPTZero, Turnitin, Originality, 
            and every other detector. Clean. Natural. Yours.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.a
              href="#editor"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-primary inline-flex items-center gap-2 text-lg px-8 py-4"
            >
              Humanize for free
              <ArrowRight className="w-5 h-5" />
            </motion.a>
            <p className="text-sm text-text-secondary">No credit card required</p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto"
          >
            {[
              { icon: Users, label: "Active Users", value: "1M+" },
              { icon: Shield, label: "Detector Pass Rate", value: "99.2%" },
              { icon: Clock, label: "Avg. Processing", value: "3.2s" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <stat.icon className="w-5 h-5 mx-auto mb-2 text-accent" />
                <div className="text-2xl font-semibold font-display">{stat.value}</div>
                <div className="text-xs text-text-secondary mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
