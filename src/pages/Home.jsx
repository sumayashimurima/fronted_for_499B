import Navbar from '../components/Navbar'
import Hero from '../sections/Hero'
import Stats from '../sections/Stats'
import PracticeModules from '../sections/PracticeModules'
import Features from '../sections/Features'
import HowItWorks from '../sections/HowItWorks'
import AIEdge from '../sections/AIEdge'
import Pricing from '../sections/Pricing'
import Testimonials from '../sections/Testimonials'
import FAQ from '../sections/FAQ'
import FinalCTA from '../sections/FinalCTA'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <div className="bg-surface font-body text-on-surface">
      <Navbar />
      <Hero />
      {/* <Stats /> */}
      <PracticeModules />
      <Features />
      <HowItWorks />
      <AIEdge />
      {/* <Pricing /> */}
      <Testimonials />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  )
}
