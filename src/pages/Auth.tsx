import React from "react";
import Login from "../components/Auth/LoginForm";

const Auth: React.FC = () => {
  return (
    <div className="w-full h-full flex text-center space-y-4 relative z-10">
      <Login></Login>
    </div>
  );
}

export default Auth;