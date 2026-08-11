"use client"

import { HumanizeMode } from "../components/ModeSelector"
import { ToneSettings } from "../components/ToneControls"
import { DetectorResult } from "../components/DetectorResults"

const contractions: Record<string, string> = {
  "it is": "it's", "that is": "that's", "there is": "there's",
  "what is": "what's", "where is": "where's", "how is": "how's",
  "he is": "he's", "she is": "she's", "they are": "they're",
  "we are": "we're", "you are": "you're", "I am": "I'm",
  "do not": "don't", "does not": "doesn't", "did not": "didn't",
  "will not": "won't", "would not": "wouldn't", "could not": "couldn't",
  "should not": "shouldn't", "cannot": "can't", "is not": "isn't",
  "are not": "aren't", "was not": "wasn't", "were not": "weren't",
  "has not": "hasn't", "have not": "haven't", "had not": "hadn't",
}

const hedgingPhrases = [
  "it is important to note", "it should be noted", "it is worth mentioning",
  "it is essential to understand", "it is crucial to recognize",
  "it is significant that", "it is imperative to acknowledge",
  "it is vital to consider", "it is necessary to point out",
  "it is critical to emphasize",
]

const formalToCasual: Record<string, string> = {
  "utilize": "use", "demonstrate": "show", "illustrate": "show",
  "indicate": "show", "substantial": "big", "considerable": "big",
  "numerous": "many", "abundant": "plenty", "sufficient": "enough",
  "adequate": "enough", "furthermore": "also", "moreover": "also",
  "additionally": "also", "consequently": "so", "therefore": "so",
  "thus": "so", "however": "but", "nevertheless": "but",
  "nonetheless": "but", "regarding": "about", "concerning": "about",
  "pertaining to": "about",
}

const sentenceStarters = [
  "Look,", "Honestly,", "Here's the thing:", "The truth is,",
  "Let's be real —", "So,", "Well,", "Basically,",
  "You know what?", "Real talk:",
]

function splitSentences(text: string): string[] {
  return text.replace(/([.!?])\s+/g, "$1|").split("|").filter(s => s.trim().length > 0)
}

function addContractions(text: string): string {
  let result = text
  Object.entries(contractions).forEach(([full, contracted]) => {
    const regex = new RegExp("\b" + full + "\b", "gi")
    result = result.replace(regex, () => Math.random() > 0.15 ? contracted : full)
  })
  return result
}

function removeHedging(text: string): string {
  let result = text
  hedgingPhrases.forEach(phrase => {
    const regex = new RegExp("\b" + phrase + "\b,?\s*", "gi")
    result = result.replace(regex, () => Math.random() > 0.3 ? "" : phrase + " ")
  })
  return result
}

function addInformalTouches(text: string, mode: HumanizeMode): string {
  const sentences = splitSentences(text)
  return sentences.map((sentence, i) => {
    let s = sentence.trim()
    if (!s) return ""
    if ((mode === "aggressive" || mode === "creative") && i === 0 && Math.random() > 0.6) {
      const starter = sentenceStarters[Math.floor(Math.random() * sentenceStarters.length)]
      s = starter + " " + s.charAt(0).toLowerCase() + s.slice(1)
    }
    if ((mode === "aggressive" || mode === "creative") && i > 0 && Math.random() > 0.85) {
      const connector = Math.random() > 0.5 ? "And " : "But "
      s = connector + s.charAt(0).toLowerCase() + s.slice(1)
    }
    return s
  }).join(" ")
}

function replaceFormalWords(text: string, mode: HumanizeMode): string {
  if (mode === "academic" || mode === "minimal") return text
  let result = text
  Object.entries(formalToCasual).forEach(([formal, casual]) => {
    const regex = new RegExp("\b" + formal + "\b", "gi")
    const chance = mode === "aggressive" ? 0.9 : mode === "creative" ? 0.7 : 0.4
    result = result.replace(regex, () => Math.random() < chance ? casual : formal)
  })
  return result
}

function academicPolish(text: string): string {
  const map: Record<string, string> = {
    "get": "obtain", "Get": "Obtain", "got": "obtained", "Got": "Obtained",
    "getting": "obtaining", "Getting": "Obtaining", "show": "demonstrate",
    "Show": "Demonstrate", "showed": "demonstrated", "Showed": "Demonstrated",
    "showing": "demonstrating", "Showing": "Demonstrating", "big": "substantial",
    "Big": "Substantial", "huge": "considerable", "Huge": "Considerable",
    "lots": "numerous", "Lots": "Numerous",
  }
  return text.replace(/(get|got|getting|show|showed|showing|big|huge|lots)/gi, (m) => map[m] || m)
}

function minimalChanges(text: string): string {
  const verySyns = ["quite", "rather", "fairly", "pretty", "really"]
  const goodSyns = ["solid", "strong", "sound", "fine", "decent"]
  return text
    .replace(/(very|extremely|highly)/gi, () => verySyns[Math.floor(Math.random() * verySyns.length)])
    .replace(/(good|great|excellent)/gi, () => goodSyns[Math.floor(Math.random() * goodSyns.length)])
}

export function humanizeText(text: string, mode: HumanizeMode, tone: ToneSettings): string {
  if (!text.trim()) return ""
  let result = text

  const sentences = splitSentences(result)
  result = sentences.join(" ")

  switch (mode) {
    case "standard":
      result = addContractions(result)
      result = removeHedging(result)
      result = replaceFormalWords(result, mode)
      break
    case "aggressive":
      result = addContractions(result)
      result = removeHedging(result)
      result = replaceFormalWords(result, mode)
      result = addInformalTouches(result, mode)
      break
    case "academic":
      result = academicPolish(result)
      result = removeHedging(result)
      break
    case "creative":
      result = addContractions(result)
      result = replaceFormalWords(result, mode)
      result = addInformalTouches(result, mode)
      break
    case "minimal":
      result = minimalChanges(result)
      break
  }

  if (tone.formality < 30) {
    result = addContractions(result)
    result = replaceFormalWords(result, "aggressive")
  } else if (tone.formality > 70) {
    result = academicPolish(result)
  }

  result = result.replace(/\s+/g, " ").replace(/\s+([.,!?;:])/g, "$1").trim()
  return result
}

export function simulateDetectors(text: string, mode: HumanizeMode): DetectorResult[] {
  const baseScore = mode === "aggressive" ? 5 : mode === "creative" ? 12 : mode === "standard" ? 18 : mode === "minimal" ? 25 : 15
  const detectors = [
    { name: "GPTZero", variance: 8 }, { name: "Originality.ai", variance: 6 },
    { name: "Turnitin AI", variance: 10 }, { name: "Copyleaks", variance: 7 },
    { name: "Winston AI", variance: 9 }, { name: "Sapling", variance: 5 },
    { name: "ZeroGPT", variance: 11 }, { name: "Content at Scale", variance: 8 },
  ]

  return detectors.map(d => {
    const randomVariance = (Math.random() - 0.5) * d.variance * 2
    const score = Math.max(0, Math.min(100, Math.round(baseScore + randomVariance)))
    let status: "human" | "borderline" | "ai"
    if (score < 20) status = "human"
    else if (score < 50) status = "borderline"
    else status = "ai"
    return { name: d.name, score, status }
  })
}
