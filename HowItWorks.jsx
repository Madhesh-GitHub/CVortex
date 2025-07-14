import React from "react";
import { FiUploadCloud, FiBarChart2, FiSettings } from "react-icons/fi";

const HowItWorks = () => {
  const steps = [
    {
      number: "1",
      title: "Upload Resume",
      description: "Drop in your resume — we support PDF, DOCX, or TXT formats",
      icon: FiUploadCloud,
      color: "from-red-500 to-pink-500"
    },
    {
      number: "2", 
      title: "Check ATS Score",
      description: "Get an instant ATS compatibility score with smart insights",
      icon: FiBarChart2,
      color: "from-blue-500 to-purple-500"
    },
    {
      number: "3",
      title: "Optimize & Improve", 
      description: "Use AI-powered recommendations to stand out and get noticed",
      icon: FiSettings,
      color: "from-emerald-500 to-teal-500"
    }
  ];

  return (
    <div className="py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="bg-card/30 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-12 md:p-16 lg:p-20">
          <div className="text-center mb-16 sm:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-6 sm:mb-8">
              How It Works
            </h2>
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-muted-foreground">
              A smarter resume in{" "}
              <span className="inline-flex items-center gap-2">
                <span className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl md:text-2xl">
                  3
                </span>
                quick steps
              </span>
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12 md:gap-16">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="mb-6 sm:mb-8">
                    <div className={`inline-flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6`}>
                      <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center text-white font-bold text-xl sm:text-2xl shadow-lg`}>
                        {step.number}
                      </div>
                      <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
                        {step.title}
                      </h3>
                    </div>
                  </div>

                  <div className="bg-card rounded-2xl p-6 sm:p-8 shadow-elegant hover:shadow-glow transition-all duration-300 group-hover:scale-105">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-muted/80 transition-colors duration-300">
                      <IconComponent className="text-muted-foreground text-2xl sm:text-3xl md:text-4xl" />
                    </div>
                    <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;