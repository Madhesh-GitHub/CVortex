import React from "react";
import heroImage from "./assets/hero-image.png";
import { SiGooglegemini } from "react-icons/si";
import BackgroundDots from "./BackgroundDots";
import Lottie from "lottie-react";
import resumeAnim from "./Scan.json";
import { LuUpload } from "react-icons/lu";
import { RiGeminiFill } from "react-icons/ri";

const Hero = () => {
  return (
    <div className="relative overflow-hidden min-h-screen flex items-center justify-center">
      <BackgroundDots
        dotColor="rgba(168, 85, 247, 0.4)"
        className="z-0"
        backgroundColor="transparent"
        dotSize={1.5}
        gap={24}
      />
      
      <div className="relative w-full text-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 z-10 max-w-7xl mx-auto">
        <div className="mb-6 sm:mb-8 md:mb-12">
          <div className="inline-flex items-center justify-center gap-2 sm:gap-3 border-2 border-primary/30 px-4 sm:px-6 py-2 sm:py-3 rounded-full text-primary hover:shadow-glow transition-all duration-300 text-sm sm:text-base md:text-lg">
            <SiGooglegemini className="text-lg sm:text-xl" />
            <span className="font-medium">Join the AI Resume Revolution!</span>
          </div>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl tracking-tight font-extrabold leading-tight mb-8 sm:mb-12">
          <span className="bg-gradient-primary bg-clip-text text-transparent">
            Smarter
          </span>{" "}
          <span className="text-foreground">Resumes,</span>
          <br />
          <span className="text-foreground">Boundless</span>{" "}
          <span className="bg-gradient-primary bg-clip-text text-transparent">
            Opportunities
          </span>
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-12 sm:mb-16 max-w-3xl mx-auto leading-relaxed">
          Transform your resume with AI-powered optimization. Beat ATS systems, impress recruiters, and land your dream job.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 mb-12 sm:mb-16">
          <button className="flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl shadow-elegant hover:shadow-glow hover:scale-105 transition-all duration-300 text-base sm:text-lg font-semibold w-full sm:w-auto max-w-xs sm:max-w-none">
            <LuUpload className="text-xl" />
            <span>Upload Resume</span>
          </button>
          <button className="flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl shadow-elegant hover:shadow-glow hover:scale-105 transition-all duration-300 text-base sm:text-lg font-semibold w-full sm:w-auto max-w-xs sm:max-w-none">
            <RiGeminiFill className="text-xl" />
            <span>Build with AI</span>
          </button>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <img 
            src={heroImage} 
            alt="Resume optimization dashboard" 
            className="w-full h-auto rounded-2xl shadow-2xl border border-white/10"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent rounded-2xl" />
        </div>
      </div>
    </div>
  );
};

export default Hero;