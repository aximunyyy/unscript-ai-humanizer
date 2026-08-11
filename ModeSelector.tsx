"use client"

import { motion } from "framer-motion"
import { Feather, Zap, GraduationCap, Palette, Minimize2 } from "lucide-react"

export type HumanizeMode = "standard" | "aggressive" | "academic" | "creative" | "minimal"

interface ModeSelectorProps {
  selected: HumanizeMode
  onSelect: (mode: HumanizeMode) => void
}

const modes = [
  { id: "standard" as HumanizeMode, label: "Standard", description: "Light touch, preserves most phrasing", icon: Feather, color: "#6366F1" },
  { id: "aggressive" as HumanizeMode, label: "Aggressive", description: "Heavy restructuring, max bypass", icon: Zap, color: "#EC4899" },
  { id: "academic" as HumanizeMode, label: "Academic", description: "Formal, precise, citation-safe", icon: GraduationCap, color: "#22C55E" },
  { id: "creative" as HumanizeMode, label: "Creative", description: "Loose, expressive, narrative", icon: Palette, color: "#F59E0B" },
  { id: "minimal" as HumanizeMode, label: "Minimal", description: "Synonym swaps only, fastest", icon: Minimize2, color: "#9CA3AF" },
]

export default function ModeSelector({ selected, onSelect }: ModeSelectorProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
      {modes.map((mode) => {
        const isSelected = selected === mode.id
        const Icon = mode.icon
        return (
          <motion.button
            key={mode.id}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onSelect(mode.id)}
            className="relative p-4 rounded-xl border-2 transition-all duration-200 text-left"
            style={{
              borderColor: isSelected ? mode.color : "var(--border)",
              background: isSelected ? `${mode.color}10` : "var(--surface)",
            }}
          >
            {isSelected && (
              <motion.div
                layoutId="mode-indicator"
                className="absolute inset-0 rounded-xl"
                style={{ border: `2px solid ${mode.color}`, background: `${mode.color}08` }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <div className="relative z-10">
              <Icon className="w-5 h-5 mb-2" style={{ color: mode.color }} />
              <div className="text-sm font-semibold">{mode.label}</div>
              <div className="text-xs text-text-secondary mt-1 leading-tight">{mode.description}</div>
            </div>
          </motion.button>
        )
      })}
    </div>
  )
}
