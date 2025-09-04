import React from "react";
import logo from "../../assets/logo.png"; 

interface LogoProps {
  size?: number; 
}

const Logo: React.FC<LogoProps> = ({ size = 100}) => {
  return (
    <div
      className="flex items-center justify-center neutraly-color rounded-full"
      style={{ width: size, height: size }}
    >
      <img
        src={logo}
        alt="Application Logo"
        className="p-2 w-3/4 h-3/4 object-contain"
      />
    </div>
  );
};

export default Logo;
