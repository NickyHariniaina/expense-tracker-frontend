import React from "react";
import Logo from "../components/Logo/Logo";
import expenseAuthImage from "../assets/expense-auth.svg";

const Auth: React.FC = () => {
  return (
    <div className="w-full h-full flex text-center space-y-3 relative z-10">
      <h1 className="font-baskerville  text-[24px] font-bold m-4 absolute top-0 left-0 z-10">
        WalletWatch
      </h1>

      <div className="flex flex-row justify-between items-center">
        {/*left side*/}
        <div className="flex flex-col ml-12 gap-4 items-start justify-center min-h-screen bg-white">
          {/*Logo*/}
          <div className="mb-6">
            <Logo size={100} />
          </div>

          <h1 className="text-[50px] font-bold w-1/2 font-baskerville text-left">
            Take a full control of your money - all in one place
          </h1>

          <p className="text-[24px] font-spartan font-light py-3 w-1/2 text-left">
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
            className="animate-pulse w-40 ounded-2xl items-center relative"
          />
        </div>
      </div>
    </div>
  );
};

export default Auth;
