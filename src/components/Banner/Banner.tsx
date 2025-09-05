import React from "react";
import displayAnimation from "../../hooks/DisplayAnimation";

const Banner: React.FC = () => {
  const isVisible = displayAnimation(300);

  return (
    <>
      {isVisible && (
        <footer className="fixed fade-in slide-in-left bottom-0 left-0 w-full z-50 primary-color text-white transition-opacity duration-500 opacity-100">
          <div className="relative w-full  h-32 bg-white overflow-hidden">
            <div className="absolute inset-0">
              <svg
                viewBox="0 0 1200 120"
                className="w-full h-full"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,120 L0,80 Q300,0 600,40 Q900,80 1200,30 L1200,120 Z"
                  fill="#059669"
                  className="opacity-90"
                />
              </svg>
            </div>

            <div className="absolute font-spartan bottom-5 right-5 text-[16px] text-white font-light">
              © Copyright 2025 | Student group
            </div>
          </div>
        </footer>
      )}
    </>
  );
};

export default Banner;
