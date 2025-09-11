
import React from "react";

interface SpinnerProps {
  size?: "sm" | "md" | "lg"; // different sizes
  color?: string; // Tailwind color for the spinner
}

const spinnerSizes = {
  sm: "w-6 h-6",
  md: "w-10 h-10",
  lg: "w-16 h-16",
};

const Loading: React.FC<SpinnerProps> = ({ size = "md", color = "blue-500" }) => {
  return (
    <div
      className={`border-4 border-t-${color} border-b-gray-200 rounded-full animate-spin ${spinnerSizes[size]}`}
    ></div>
  );
};

export default Loading;
