import React from "react";
import Header from "./Header";
import Hero from "./Hero";
import BackgroundDots from "./BackgroundDots";
import HowItWorks from "./HowItWorks";
import Whychoose from "./WhyChoose";
import Footer from "./Footer";
import ReadyToBoost from "./ReadyToBoost";

const LandingPage = () => {
  return (
    <div>
      <BackgroundDots dotColor="#7873f5" className="z-[1000]" />
      <Header />
      <Hero />
      <HowItWorks/>
      <Whychoose/>
      <ReadyToBoost/>
      <Footer />
    </div>
  );
};

export default LandingPage;
