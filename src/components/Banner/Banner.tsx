import React from "react";
import displayAnimation from "../../hooks/DisplayAnimation";

const Banner: React.FC = () => {
  const isVisible = displayAnimation(300);

  return (
    <>
      {isVisible && (
        <footer className="fixed fade-in slide-in-left bottom-0 left-0 w-full z-50 primary-color text-white transition-opacity duration-500 opacity-100">
          <div className="relative w-full  h-24 bg-white overflow-hidden">
            <div className="absolute inset-0">
              <svg
                viewBox="0 0 1200 96"
                className="w-full h-full"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,96 L0,70 Q300,20 600,35 Q900,50 1200,25 L1200,96 Z"
                  fill="#059669"
                  className="opacity-90"
                />
              </svg>
            </div>

            <div className="absolute font-spartan bottom-6 right-6 text-sm text-white font-light">
              © Copyright 2025 | Student group
            </div>
          </div>
        </footer>
      )}
    </>
  );
};

export default Banner;
