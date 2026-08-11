"use client"

import { Zap, Github, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="py-12 border-t" style={{ borderColor: "var(--border)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center"><Zap className="w-5 h-5 text-white" /></div>
              <span className="font-display text-xl font-semibold">Unscript</span>
            </div>
            <p className="text-sm text-text-secondary max-w-sm leading-relaxed">Write like a human. Every time. Transform AI-generated text into authentic, natural-sounding prose that passes every detector.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-sm">Product</h4>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li><a href="#features" className="hover:text-text-primary transition-colors">Features</a></li>
              <li><a href="#pricing" className="hover:text-text-primary transition-colors">Pricing</a></li>
              <li><a href="#editor" className="hover:text-text-primary transition-colors">Try it free</a></li>
              <li><span className="hover:text-text-primary transition-colors cursor-pointer">API Docs</span></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-sm">Legal</h4>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li><span className="hover:text-text-primary transition-colors cursor-pointer">Privacy Policy</span></li>
              <li><span className="hover:text-text-primary transition-colors cursor-pointer">Terms of Service</span></li>
              <li><span className="hover:text-text-primary transition-colors cursor-pointer">GDPR Compliance</span></li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t gap-4" style={{ borderColor: "var(--border)" }}>
          <p className="text-xs text-text-secondary">&copy; 2025 Unscript. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="text-xs px-2 py-1 rounded bg-white/5 text-text-secondary">GDPR</span>
            <span className="text-xs px-2 py-1 rounded bg-white/5 text-text-secondary">CCPA</span>
            <span className="text-xs px-2 py-1 rounded bg-white/5 text-text-secondary">PCI DSS</span>
          </div>
          <div className="flex items-center gap-3">
            <Github className="w-4 h-4 text-text-secondary hover:text-text-primary cursor-pointer transition-colors" />
            <Twitter className="w-4 h-4 text-text-secondary hover:text-text-primary cursor-pointer transition-colors" />
          </div>
        </div>
      </div>
    </footer>
  )
}
