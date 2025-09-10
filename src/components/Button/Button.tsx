import React from "react";

interface ButtonProps {
  text: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  bg_color?: "primary" | "secondary" | "terty" | "neutraly";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode; // Ajout de la prop children
}

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  type = "button",
  bg_color = "primary",
  size = "md",
  disabled = false,
  className = "",
  children, // Ajout de children comme paramètre
}) => {
  const bgClasses = {
    primary: "primary-color",
    secondary: "secondary-color",
    terty: "terty-color",
    neutraly: "neutraly-color",
  };

  const sizeClasses = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${bgClasses[bg_color]} ${
        sizeClasses[size]
      } rounded-[10px] text-white cursor-pointer 
        transition-transform active:scale-95 active:shadow-inner font-bold 
        font-spartan uppercase ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
    >
      {text}
      {children}
    </button>
  );
};

export default Button;