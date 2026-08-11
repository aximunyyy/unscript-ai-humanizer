import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Editor from "./components/Editor"
import Features from "./components/Features"
import HowItWorks from "./components/HowItWorks"
import DetectorLogos from "./components/DetectorLogos"
import Testimonials from "./components/Testimonials"
import Pricing from "./components/Pricing"
import FAQ from "./components/FAQ"
import Footer from "./components/Footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Editor />
      <Features />
      <HowItWorks />
      <DetectorLogos />
      <Testimonials />
      <Pricing />
      <FAQ />
      <Footer />
    </main>
  )
}
