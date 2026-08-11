"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronUp, Lock } from "lucide-react"
import { useTheme } from "./ThemeProvider"

export interface ToneSettings {
  formality: number
  region: "us" | "uk" | "au" | "neutral"
  purpose: string
  preserveKeywords: boolean
  keywords: string
}

interface ToneControlsProps {
  settings: ToneSettings
  onChange: (settings: ToneSettings) => void
}

const purposes = ["Essay", "Blog", "Resume", "Report", "Email", "Story"]

export default function ToneControls({ settings, onChange }: ToneControlsProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { theme } = useTheme()

  return (
    <div className="rounded-xl border overflow-hidden" style={{ borderColor: "var(--border)" }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium transition-colors hover:bg-white/5"
      >
        <span>Tone & Style Controls</span>
        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-4">
              <div>
                <div className="flex justify-between text-xs text-text-secondary mb-2">
                  <span>Casual</span>
                  <span>Formal</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={settings.formality}
                  onChange={(e) => onChange({ ...settings, formality: parseInt(e.target.value) })}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #6366F1 ${settings.formality}%, ${theme === "dark" ? "#2A2A2E" : "#E5E7EB"} ${settings.formality}%)`,
                  }}
                />
              </div>

              <div className="grid grid-cols-4 gap-2">
                {(["us", "uk", "au", "neutral"] as const).map((region) => (
                  <button
                    key={region}
                    onClick={() => onChange({ ...settings, region })}
                    className="px-3 py-2 rounded-lg text-xs font-medium transition-all border"
                    style={{
                      borderColor: settings.region === region ? "#6366F1" : "var(--border)",
                      background: settings.region === region ? "rgba(99, 102, 241, 0.1)" : "transparent",
                      color: settings.region === region ? "#818CF8" : "var(--text-secondary)",
                    }}
                  >
                    {region === "us" ? "US" : region === "uk" ? "UK" : region === "au" ? "AU" : "Neutral"}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                {purposes.map((purpose) => (
                  <button
                    key={purpose}
                    onClick={() => onChange({ ...settings, purpose })}
                    className="px-3 py-1.5 rounded-full text-xs font-medium transition-all border"
                    style={{
                      borderColor: settings.purpose === purpose ? "#6366F1" : "var(--border)",
                      background: settings.purpose === purpose ? "rgba(99, 102, 241, 0.1)" : "transparent",
                      color: settings.purpose === purpose ? "#818CF8" : "var(--text-secondary)",
                    }}
                  >
                    {purpose}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => onChange({ ...settings, preserveKeywords: !settings.preserveKeywords })}
                  className="relative w-11 h-6 rounded-full transition-colors"
                  style={{ backgroundColor: settings.preserveKeywords ? "#6366F1" : "#4B5563" }}
                >
                  <motion.div
                    className="absolute top-1 w-4 h-4 rounded-full bg-white"
                    animate={{ left: settings.preserveKeywords ? "22px" : "4px" }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                </button>
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-text-secondary" />
                  <span className="text-sm">Preserve specific keywords</span>
                </div>
              </div>

              {settings.preserveKeywords && (
                <motion.input
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  type="text"
                  placeholder="Enter keywords separated by commas..."
                  value={settings.keywords}
                  onChange={(e) => onChange({ ...settings, keywords: e.target.value })}
                  className="input-field text-sm"
                />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
