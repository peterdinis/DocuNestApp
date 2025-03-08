import { NextPage } from "next"
import Navigation from "./_components/shared/Navigation"
import Hero from "./_components/home/Hero"
import Features from "./_components/home/Features"
import CTA from "./_components/home/CTA"
import Footer from "./_components/shared/Footer"

const Homepage: NextPage = () => {
  return (
    <div className="relative min-h-screen">
    <div className="pointer-events-none fixed inset-0">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
      <div className="absolute right-0 top-0 h-[500px] w-[500px] bg-blue-500/10 blur-[100px]" />
      <div className="absolute bottom-0 left-0 h-[500px] w-[500px] bg-purple-500/10 blur-[100px]" />
    </div>

    <div className="relative z-10">
        <Navigation />
        <Hero />
        <Features />
        <CTA />
        <Footer />
    </div>
  </div>
  )
}

export default Homepage