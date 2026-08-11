"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Copy, Download, Share2, Sparkles, FileText, 
  RotateCcw, Check, Loader2, Upload, Type 
} from "lucide-react"
import { useLocalStorage } from "../hooks/useLocalStorage"
import ModeSelector, { HumanizeMode } from "./ModeSelector"
import ToneControls, { ToneSettings } from "./ToneControls"
import DetectorResults, { DetectorResult } from "./DetectorResults"
import { humanizeText, simulateDetectors } from "../lib/humanizer"

export default function Editor() {
  const [inputText, setInputText] = useState("")
  const [outputText, setOutputText] = useState("")
  const [mode, setMode] = useState<HumanizeMode>("standard")
  const [tone, setTone] = useState<ToneSettings>({
    formality: 50, region: "us", purpose: "Essay",
    preserveKeywords: false, keywords: "",
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const [detectorResults, setDetectorResults] = useState<DetectorResult[]>([])
  const [isScanning, setIsScanning] = useState(false)
  const [copied, setCopied] = useState(false)
  const [wordBalance, setWordBalance] = useLocalStorage("wordBalance", 500)
  const [history, setHistory] = useLocalStorage<any[]>("humanizeHistory", [])

  const wordCount = inputText.trim().split(/\s+/).filter(Boolean).length
  const MAX_WORDS = 5000

  const handleHumanize = useCallback(async () => {
    if (!inputText.trim() || wordCount === 0) return
    if (wordCount > wordBalance) {
      alert("Not enough word balance! Upgrade to Pro for more words.")
      return
    }

    setIsProcessing(true)
    setOutputText("")
    setDetectorResults([])

    await new Promise(r => setTimeout(r, 1500 + Math.random() * 1000))

    const humanized = humanizeText(inputText, mode, tone)
    setOutputText(humanized)
    setWordBalance(prev => Math.max(0, prev - wordCount))

    const newEntry = {
      id: Date.now(), timestamp: new Date().toISOString(),
      original: inputText, humanized, mode, wordCount,
    }
    setHistory(prev => [newEntry, ...prev].slice(0, 50))
    setIsProcessing(false)

    setIsScanning(true)
    await new Promise(r => setTimeout(r, 2000))
    setDetectorResults(simulateDetectors(humanized, mode))
    setIsScanning(false)
  }, [inputText, mode, tone, wordCount, wordBalance, setWordBalance, setHistory])

  const handleCopy = async () => {
    if (!outputText) return
    await navigator.clipboard.writeText(outputText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    if (!outputText) return
    const blob = new Blob([outputText], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `humanized-${Date.now()}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleShare = async () => {
    if (!outputText) return
    if (navigator.share) {
      await navigator.share({ text: outputText })
    } else {
      await navigator.clipboard.writeText(outputText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleReset = () => {
    setInputText("")
    setOutputText("")
    setDetectorResults([])
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (event) => {
      const text = event.target?.result as string
      setInputText(text)
    }
    reader.readAsText(file)
  }

  return (
    <section id="editor" className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {wordBalance < 100 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 rounded-xl border border-warning/30 bg-warning/10 text-warning text-sm text-center"
          >
            You are running low on words! <button className="underline font-medium">Upgrade to Pro</button> for 50,000 words/month.
          </motion.div>
        )}

        <div className="mb-6">
          <ModeSelector selected={mode} onSelect={setMode} />
        </div>

        <div className="mb-6">
          <ToneControls settings={tone} onChange={setTone} />
        </div>

        <div className="grid lg:grid-cols-2 gap-4">
          <div className="panel flex flex-col" style={{ minHeight: "400px" }}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Type className="w-4 h-4 text-text-secondary" />
                <span className="text-sm font-medium">Original Text</span>
              </div>
              <div className="flex items-center gap-2">
                <label className="cursor-pointer p-2 rounded-lg hover:bg-white/5 transition-colors">
                  <Upload className="w-4 h-4 text-text-secondary" />
                  <input type="file" accept=".txt,.doc,.docx" className="hidden" onChange={handleFileUpload} />
                </label>
                <button onClick={handleReset} className="p-2 rounded-lg hover:bg-white/5 transition-colors" title="Clear">
                  <RotateCcw className="w-4 h-4 text-text-secondary" />
                </button>
              </div>
            </div>

            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste your AI-generated text here..."
              className="flex-1 w-full resize-none bg-transparent outline-none text-sm leading-relaxed scrollbar-thin"
              style={{ minHeight: "300px" }}
            />

            <div className="flex items-center justify-between mt-4 pt-4 border-t" style={{ borderColor: "var(--border)" }}>
              <span className="text-xs text-text-secondary font-mono">
                {wordCount.toLocaleString()} / {MAX_WORDS.toLocaleString()} words
              </span>
              <span className="text-xs text-text-secondary">Balance: {wordBalance} words left</span>
            </div>
          </div>

          <div className="panel flex flex-col relative" style={{ minHeight: "400px" }}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium">Humanized Output</span>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={handleCopy} className="p-2 rounded-lg hover:bg-white/5 transition-colors" title="Copy">
                  {copied ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4 text-text-secondary" />}
                </button>
                <button onClick={handleDownload} className="p-2 rounded-lg hover:bg-white/5 transition-colors" title="Download">
                  <Download className="w-4 h-4 text-text-secondary" />
                </button>
                <button onClick={handleShare} className="p-2 rounded-lg hover:bg-white/5 transition-colors" title="Share">
                  <Share2 className="w-4 h-4 text-text-secondary" />
                </button>
              </div>
            </div>

            <div className="flex-1 relative">
              <AnimatePresence mode="wait">
                {isProcessing ? (
                  <motion.div
                    key="processing"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex flex-col items-center justify-center"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                      style={{ 
                        background: "rgba(99, 102, 241, 0.15)",
                        boxShadow: "0 0 30px rgba(99, 102, 241, 0.3)"
                      }}
                    >
                      <Sparkles className="w-8 h-8 text-accent" />
                    </motion.div>
                    <p className="text-sm text-text-secondary animate-pulse">Humanizing your text...</p>
                    <p className="text-xs text-text-secondary mt-2">This may take a few seconds</p>
                  </motion.div>
                ) : outputText ? (
                  <motion.textarea
                    key="output"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    value={outputText}
                    readOnly
                    className="w-full h-full resize-none bg-transparent outline-none text-sm leading-relaxed scrollbar-thin"
                  />
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 flex flex-col items-center justify-center text-text-secondary"
                  >
                    <FileText className="w-12 h-12 mb-3 opacity-30" />
                    <p className="text-sm">Your humanized text will appear here</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={handleHumanize}
          disabled={isProcessing || !inputText.trim()}
          className="w-full mt-6 py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            background: isProcessing 
              ? "linear-gradient(90deg, #4F46E5, #7C3AED)" 
              : "linear-gradient(90deg, #6366F1, #8B5CF6)",
            color: "white",
            boxShadow: isProcessing 
              ? "0 0 40px rgba(99, 102, 241, 0.4)" 
              : "0 0 20px rgba(99, 102, 241, 0.3)",
          }}
        >
          {isProcessing ? (
            <><Loader2 className="w-5 h-5 animate-spin" />Processing...</>
          ) : (
            <><Sparkles className="w-5 h-5" />Humanize Text</>
          )}
        </motion.button>

        <DetectorResults results={detectorResults} isScanning={isScanning} />
      </div>
    </section>
  )
}
