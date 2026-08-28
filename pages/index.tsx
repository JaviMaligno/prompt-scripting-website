import { SeoHead } from '@/components/SeoHead'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
import { Features } from '@/components/sections/Features'
import { Demo } from '@/components/sections/Demo'
import { CTA } from '@/components/sections/CTA'
import { Waitlist } from '@/components/sections/Waitlist'

export default function Home() {
  return (
    <>
      <SeoHead path="/" />
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Demo />
        <CTA />
        <Waitlist />
      </main>
      <Footer />
    </>
  )
}


