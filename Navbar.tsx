"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Moon, Sun, Zap } from "lucide-react"
import { useTheme } from "./ThemeProvider"
import { useLocalStorage } from "../hooks/useLocalStorage"

export default function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [wordBalance] = useLocalStorage("wordBalance", 500)
  const [isLoggedIn] = useLocalStorage("isLoggedIn", false)

  const usedWords = 500 - wordBalance
  const usagePercent = (usedWords / 500) * 100

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b transition-colors duration-300"
      style={{ 
        backgroundColor: theme === "dark" ? "rgba(13, 13, 15, 0.85)" : "rgba(247, 247, 248, 0.85)",
        borderColor: theme === "dark" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
        backdropFilter: "blur(12px)"
      }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="font-display text-xl font-semibold tracking-tight">Unscript</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">Features</a>
            <a href="#how-it-works" className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">How It Works</a>
            <a href="#pricing" className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">Pricing</a>
            <a href="#faq" className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">FAQ</a>
          </div>

          <div className="hidden md:flex items-center gap-4">
            {isLoggedIn && (
              <div className="flex items-center gap-3 mr-2">
                <div className="text-xs text-text-secondary">
                  <span className="font-mono font-medium" style={{ color: usagePercent > 80 ? "#EF4444" : "#22C55E" }}>
                    {wordBalance}
                  </span>
                  <span> / 500 words</span>
                </div>
                <div className="w-24 h-2 rounded-full overflow-hidden" style={{ background: theme === "dark" ? "#2A2A2E" : "#E5E7EB" }}>
                  <motion.div 
                    className="h-full rounded-full"
                    style={{ 
                      backgroundColor: usagePercent > 80 ? "#EF4444" : "#6366F1",
                      width: `${usagePercent}%`
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${usagePercent}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </div>
              </div>
            )}

            <button onClick={toggleTheme} className="p-2 rounded-lg transition-colors hover:bg-white/5">
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <button className="text-sm font-medium px-4 py-2 rounded-lg transition-colors hover:bg-white/5">
              Log in
            </button>
            <button className="btn-primary text-sm py-2">Get Started</button>
          </div>

          <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t"
            style={{ borderColor: theme === "dark" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)" }}
          >
            <div className="px-4 py-4 space-y-3">
              <a href="#features" className="block text-sm font-medium py-2">Features</a>
              <a href="#how-it-works" className="block text-sm font-medium py-2">How It Works</a>
              <a href="#pricing" className="block text-sm font-medium py-2">Pricing</a>
              <a href="#faq" className="block text-sm font-medium py-2">FAQ</a>
              <div className="pt-3 border-t flex flex-col gap-2" style={{ borderColor: theme === "dark" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)" }}>
                <button className="w-full text-sm font-medium px-4 py-2 rounded-lg border transition-colors" style={{ borderColor: theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)" }}>
                  Log in
                </button>
                <button className="btn-primary w-full text-sm py-2">Get Started</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
