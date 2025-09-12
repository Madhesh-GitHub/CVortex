import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  // Load the Lottie web component script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@lottiefiles/dotlottie-wc@0.6.2/dist/dotlottie-wc.js';
    script.type = 'module';
    document.head.appendChild(script);

    return () => {
      // Cleanup script on unmount
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  const handleUploadClick = () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      navigate("/app");
    } else {
      navigate("/login", { state: { redirectTo: "/app" } });
    }
  };

  const handleBuilderClick = () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      navigate("/builder");
    } else {
      navigate("/login", { state: { redirectTo: "/builder" } });
    }
  };

  return (
    <div className="bg-indigo-50 px-[20px] md:px-[80px] py-[20px] md:py-[100px]">
      <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-[40px]">
        {/* Left Content */}
        <div className="flex-1 w-full md:max-w-[55%] pt-4">
          <div className="mb-8 text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4 leading-tight tracking-tight">
              Optimize Your Resume for{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 inline-block mt-2">
                ATS Success
              </span>
            </h1>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto md:mx-0">
              Boost your chances of landing interviews by passing through
              Applicant Tracking Systems. Our AI-powered resume analyzer ensures
              your resume stands out to recruiters and hiring managers.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button
              className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-[#4F46E5] hover:to-[#7C3AED] transition-all duration-300 transform hover:scale-102 shadow-xl"
              onClick={handleUploadClick}
            >
              Resume Analyzer
            </button>

            <button
              className="bg-gradient-to-r from-[#3B82F6] to-[#3B82F6] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-[#2563EB] hover:to-[#2563EB] transition-all duration-300 transform hover:scale-103 shadow-xl"
              onClick={handleBuilderClick}
            >
              Build ATS Resume
            </button>
          </div>
        </div>

        {/* Right Animation */}
        <div className="flex-1 w-full flex justify-center items-center">
          <div className="w-full max-w-[400px] sm:max-w-[500px] md:max-w-[600px] flex justify-center">
            <dotlottie-wc
              src="https://lottie.host/423e2977-ed6f-4428-a212-5ca6ebbb1832/Q78OHX4b6H.lottie"
              style={{
                width: "100%",
                height: "400px",
                maxWidth: "500px"
              }}
              speed="1"
              autoplay="true"
              loop="true"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
