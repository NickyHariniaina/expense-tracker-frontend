import React, { useState } from "react";
import Logo from "../components/Logo/Logo";
import expenseAuthImage from "../assets/expense-auth.svg";
import ParticleBackground from "../components/ParticuleBackground";
import Login from "../components/Auth/LoginForm";
import SignUp from "../components/Auth/SignupForm";
import Banner from "../components/Banner/Banner";

const Auth: React.FC = () => {
  const [isLoging, setLoging] = useState(true);
    const toggleForm=()=>{
      setLoging(!isLoging);
    }
  return (
    <div className="w-full h-full flex text-center space-y-3 relative z-10">
      <ParticleBackground />
      <h1 className="font-baskerville text-[24px] font-bold m-4 absolute top-0 left-0 z-10">
        WalletWatch
      </h1>

      <div className="flex flex-row justify-between items-center relative z-10">
        {/* Left side */}
        <div className="flex flex-col mt-32 ml-12 w-1/2 gap-4 items-start justify-center bg-transparent">
          {/* Logo */}
          <div className="mb-6">
            <Logo size={100} />
          </div>

          <h1 className="text-[50px] w-4/5 font-bold font-baskerville text-left">
            Take a full control of your money - all in one place
          </h1>

          <p className="text-[24px] font-spartan font-light py-3 text-left">
            Whether you're managing your personal budget, running a small
            business, or just curious about your financial flow, WalletWatch
            gives you the clarity you need to stay in control.
          </p>

          <p className="text-[32px] font-spartan text-[#059669]">
            Your money. Your plan. Your growth.
          </p>

          <img
            src={expenseAuthImage}
            alt="Finance dashboard"
            className="animate-pulse w-40 rounded-2xl items-center relative z-1000"
          />
        </div>
        {/* Right side - Login Form */}
        <div className="w-1/2 h-full flex items-center justify-end">
          {
            isLoging?(
                <Login toggleForm={toggleForm}></Login>
              
            ):(
              <SignUp toggleForm={toggleForm}></SignUp>
            )
          }
        </div>
      </div>
      <Banner></Banner>
    </div>
  );
};

export default Auth;
