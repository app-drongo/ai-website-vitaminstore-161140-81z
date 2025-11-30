import Hero from '@/components/sections/home/Hero'
import Productshowcase from '@/components/sections/home/Productshowcase'
import Features from '@/components/sections/home/Features'
import Benefits from '@/components/sections/home/Benefits'
import Testimonials from '@/components/sections/home/Testimonials'
import Newsletter from '@/components/sections/home/Newsletter'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Productshowcase />
      <Features />
      <Benefits />
      <Testimonials />
      <Newsletter />
    </>
  )
}