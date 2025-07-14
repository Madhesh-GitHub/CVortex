import React, { useEffect, useRef } from "react";

const MouseTracker = () => {
  const trackerRef = useRef(null);

  useEffect(() => {
    const moveTracker = (e) => {
      if (trackerRef.current) {
        trackerRef.current.style.left = `${e.clientX}px`;
        trackerRef.current.style.top = `${e.clientY}px`;
      }
    };

    window.addEventListener("mousemove", moveTracker);
    return () => window.removeEventListener("mousemove", moveTracker);
  }, []);

  return (
    <div
      ref={trackerRef}
      className="hidden md:block pointer-events-none fixed top-0 left-0 w-80 h-80 rounded-full bg-gradient-to-r from-purple-400/20 via-blue-400/15 to-emerald-400/20 blur-3xl mix-blend-screen z-[9999] transition-all duration-75 ease-out transform -translate-x-1/2 -translate-y-1/2"
    />
  );
};

export default MouseTracker;