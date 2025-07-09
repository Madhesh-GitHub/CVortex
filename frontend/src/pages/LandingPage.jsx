import React from 'react'
import Header from '../components/Header/Header'
import Hero from '../components/Hero/Hero'
import HowItWorks from '../components/HowItWorks'
import Whychoose from '../components/WhyChoose'
import Footer from '../components/Footer'

const LandingPage = () => {
  return (
    <div>
      <Header/>
      <Hero/>
      <HowItWorks/>
      <Whychoose/>
      <Footer />
    </div>
  )
}

export default LandingPage