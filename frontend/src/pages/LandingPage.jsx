import React, { useEffect } from 'react'
import Header from '../components/Header/Header'
import Hero from '../components/Hero/Hero'
import HowItWorks from '../components/HowItWorks'
import Whychoose from '../components/WhyChoose'
import Footer from '../components/Footer'
import Blog from '../components/Blog/Blog'
import ReadyToBoost from '../components/ReadyToBoost'
import JDAnalysisSection from '../components/JDAnalysisSection' // Add this import




const LandingPage = () => {
    useEffect(() => {
    // Set the flag to clear ATS page on next visit
    sessionStorage.setItem("clearATS", "true");
  }, []);

  return (
    
    <div className="min-h-screen bg-[#F9FAFB] font-roboto">
      <Header/>
      <Hero/>
      <JDAnalysisSection/> {/* Add this component before HowItWorks */}
      <HowItWorks/>
      <Whychoose/>
      <ReadyToBoost/>
      <Blog/>
      <Footer />
    </div>
  )
}

export default LandingPage