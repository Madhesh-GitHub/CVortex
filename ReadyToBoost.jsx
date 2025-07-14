import React from 'react';

const ReadyToBoost = () => {
  return (
    <div className="py-16 sm:py-20 md:py-24 lg:py-32 bg-white dark:bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-700 dark:text-foreground mb-6 sm:mb-8">
          Ready To Boost Your Job Search?
        </h2>
        <p className="text-lg sm:text-xl md:text-2xl text-slate-600 dark:text-muted-foreground mb-12 sm:mb-16 leading-relaxed max-w-3xl mx-auto">
          Don't let your resume get lost in the ATS black hole. Optimize it today and start getting the interviews you deserve.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center max-w-2xl mx-auto">
          <button className="w-full sm:w-auto bg-gradient-to-r from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30 text-purple-700 dark:text-purple-300 px-8 py-4 rounded-xl font-semibold text-lg hover:from-purple-200 hover:to-purple-300 dark:hover:from-purple-800/40 dark:hover:to-purple-700/40 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
            Upload Your Resume
          </button>
          <button className="w-full sm:w-auto bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
            Build ATS Ready Resume
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReadyToBoost;