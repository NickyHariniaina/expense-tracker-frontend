import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button/Button";
import Logo from "../components/Logo/Logo";
import ParticleBackground from "../components/ParticuleBackground";
import { useUserStore } from "../store/user";
import { useFetchBasicUser } from "../hooks/useFetchBasicData";

export default function Start() {
  const navigate = useNavigate();
  const { userCategories, fetchUserCategories } = useUserStore();

  useEffect(() => {
    fetchUserCategories();
    if (userCategories != null) {
      navigate("/dashboard");
    }
  }, [userCategories, navigate]);

  const handleClick = () => {
    navigate("/auth");
  };

  return (
    <div className="w-screen h-screen overflow-hidden relative">
      <ParticleBackground />
      <h1 className="font-baskerville text-[24px] font-bold m-4 absolute top-0 left-0 z-10">
        WalletWatch
      </h1>

      <div className="w-full h-full flex flex-col items-center justify-center text-center space-y-4 relative z-10">
        <Logo size={150} />
        <h2 className="text-[50px] font-bold w-1/2 font-baskerville">
          Take full control of your money – all in one place
        </h2>
        <h3 className="text-[24px] font-spartan font-light py-3">
          Your money, Your plan, Your growth
        </h3>

        <Button
          onClick={handleClick}
          text="GET STARTED"
          bg_color="secondary"
          size="lg"
          className="hover:bg-[#059669]! transition-all! duration-300 ease-in-out"
        />
      </div>
    </div>
  );
}
