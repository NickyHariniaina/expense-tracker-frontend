import type React from "react";
import displayAnimation from "../../hooks/DisplayAnimation";

interface AnimatedComponentsProps {
    delay?: number;
    className?: string;
    animationClass?: string;
    children : React.ReactNode;
}
const AnimatedComponent: React.FC<AnimatedComponentsProps>=({
    delay =2000,
    animationClass= "zoom-in",
    className= '',
    children,
}) =>{
    const isVisible = displayAnimation(delay);
    return(
        <div
        className={`animated-component  duration-500 ease-in-out transform scale-50 opacity-0 ${animationClass} ${className}`}
        >
{children}
        </div>
    )
    
}
export default AnimatedComponent