import { SeoHead } from '@/components/SeoHead'
import { StructuredData } from '@/components/StructuredData'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
import { BeforeAfter } from '@/components/sections/BeforeAfter'
import { OnePromptOrNot } from '@/components/sections/OnePromptOrNot'
import { WhoItsFor } from '@/components/sections/WhoItsFor'
import { TrustStrip } from '@/components/sections/TrustStrip'
import { Demo } from '@/components/sections/Demo'
import { CTA } from '@/components/sections/CTA'
import { Waitlist } from '@/components/sections/Waitlist'

export default function Home() {
  return (
    <>
      <SeoHead path="/" />
      <StructuredData />
      <Navbar />
      <main>
        <Hero />
        <BeforeAfter />
        <OnePromptOrNot />
        <WhoItsFor />
        <TrustStrip />
        <Demo />
        <CTA />
        <Waitlist />
      </main>
      <Footer />
    </>
  )
}
