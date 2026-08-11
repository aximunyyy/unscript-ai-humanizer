"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Shield, AlertTriangle, XCircle, CheckCircle2 } from "lucide-react"

export interface DetectorResult {
  name: string
  score: number
  status: "human" | "borderline" | "ai"
}

interface DetectorResultsProps {
  results: DetectorResult[]
  isScanning: boolean
}

export default function DetectorResults({ results, isScanning }: DetectorResultsProps) {
  const [animatedScores, setAnimatedScores] = useState<number[]>([])

  useEffect(() => {
    if (results.length > 0 && !isScanning) {
      const targets = results.map(r => r.score)
      setAnimatedScores(new Array(targets.length).fill(0))

      const duration = 800
      const steps = 30
      const interval = duration / steps
      let step = 0

      const timer = setInterval(() => {
        step++
        const progress = step / steps
        const eased = 1 - Math.pow(1 - progress, 3)
        setAnimatedScores(targets.map(target => Math.round(target * eased)))
        if (step >= steps) {
          clearInterval(timer)
          setAnimatedScores(targets)
        }
      }, interval)

      return () => clearInterval(timer)
    }
  }, [results, isScanning])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "human": return <CheckCircle2 className="w-4 h-4 text-success" />
      case "borderline": return <AlertTriangle className="w-4 h-4 text-warning" />
      case "ai": return <XCircle className="w-4 h-4 text-danger" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "human": return "#22C55E"
      case "borderline": return "#F59E0B"
      case "ai": return "#EF4444"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "human": return "Human"
      case "borderline": return "Borderline"
      case "ai": return "AI Detected"
    }
  }

  if (results.length === 0 && !isScanning) {
    return (
      <div className="panel mt-6 text-center py-8">
        <Shield className="w-8 h-8 mx-auto mb-3 text-text-secondary opacity-50" />
        <p className="text-sm text-text-secondary">Run humanization to see detector scores</p>
      </div>
    )
  }

  return (
    <div className="panel mt-6">
      <div className="flex items-center gap-2 mb-4">
        <Shield className="w-5 h-5 text-accent" />
        <h3 className="font-semibold">AI Detector Results</h3>
        {isScanning && (
          <span className="text-xs px-2 py-1 rounded-full bg-accent/10 text-accent animate-pulse">Scanning...</span>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {results.map((result, i) => (
          <motion.div
            key={result.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-3 rounded-xl border"
            style={{ borderColor: "var(--border)" }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-text-secondary">{result.name}</span>
              {getStatusIcon(result.status)}
            </div>
            <div className="flex items-end gap-2">
              <span className="text-2xl font-mono font-bold" style={{ color: getStatusColor(result.status) }}>
                {isScanning ? "--" : `${animatedScores[i] || 0}%`}
              </span>
            </div>
            <div className="mt-2 h-1.5 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: getStatusColor(result.status) }}
                initial={{ width: 0 }}
                animate={{ width: isScanning ? "100%" : `${animatedScores[i] || 0}%` }}
                transition={{ duration: 0.8, ease: "easeOut", delay: i * 0.1 }}
              />
            </div>
            <div className="mt-1 text-xs" style={{ color: getStatusColor(result.status) }}>
              {isScanning ? "Analyzing..." : getStatusLabel(result.status)}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
