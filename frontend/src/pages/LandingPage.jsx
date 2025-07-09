import React from 'react'
import Header from '../components/Header/Header'
import Hero from '../components/Hero/Hero'
import HowItWorks from '../components/HowItWorks'
import Whychoose from '../components/WhyChoose'
import Footer from '../components/Footer'
import ReadyToBoost from '../components/ReadyToBoost'

const LandingPage = () => {
  return (
    <div>
      <Header/>
      <Hero/>
      <HowItWorks/>
      <Whychoose/>
      <ReadyToBoost/>
      <Footer />
    </div>
  )
}

export default LandingPage