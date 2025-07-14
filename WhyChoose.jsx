import React from 'react';
import { FiSearch, FiLayout, FiBarChart2, FiTarget, FiCpu, FiShield } from 'react-icons/fi';

const WhyChoose = () => {
  const features = [
    {
      icon: FiSearch,
      title: "Keyword Optimization",
      description: "Our AI identifies industry-specific keywords missing from your resume and suggests optimal placement strategies.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: FiLayout,
      title: "Format Analysis", 
      description: "We check your resume's formatting to ensure it's readable by all ATS platforms without information loss.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: FiBarChart2,
      title: "Performance Metrics",
      description: "Track your resume's improvement over time with detailed analytics and comprehensive scoring metrics.",
      gradient: "from-emerald-500 to-teal-500"
    },
    {
      icon: FiTarget,
      title: "Job-Specific Tailoring",
      description: "Customize your resume for specific job descriptions to maximize your match percentage and relevance.",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: FiCpu,
      title: "AI-Powered Suggestions", 
      description: "Get intelligent content recommendations and strategic advice to strengthen your professional narrative.",
      gradient: "from-indigo-500 to-purple-500"
    },
    {
      icon: FiShield,
      title: "Privacy Protection",
      description: "Your resume data is encrypted and never shared with third parties or potential employers. Complete security guaranteed.",
      gradient: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <div className="py-16 sm:py-20 md:py-24 lg:py-32 bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-muted/20 dark:to-muted/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-700 dark:text-foreground mb-4 sm:mb-6">
            Why Choose Our ATS Resume Checker
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-slate-600 dark:text-muted-foreground max-w-4xl mx-auto">
            Join thousands of job seekers who have improved their application success rate with our advanced optimization tools
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div 
                key={index}
                className="bg-white dark:bg-card rounded-2xl p-6 sm:p-8 shadow-elegant hover:shadow-glow transition-all duration-300 hover:scale-105 group border border-white/20"
              >
                <div className="flex items-center gap-4 mb-4 sm:mb-6">
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="text-white text-xl sm:text-2xl" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-700 dark:text-foreground">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-base sm:text-lg text-slate-600 dark:text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WhyChoose;