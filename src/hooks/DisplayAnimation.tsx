import { useEffect, useState } from "react";

const displayAnimation = (delay: number =2000): boolean=>{
    const [isVisible , setIsVisible] = useState<boolean>(false);
    useEffect(()=>{
        const timer =setTimeout(()=>{
            setIsVisible(true);
        }, delay);
        return ()=> clearTimeout(timer);
    },[delay]);
    return isVisible
}
export default displayAnimation;