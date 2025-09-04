import Button from "../components/Button/Button";
import Logo from "../components/Logo/Logo";
import ParticleBackground from "../components/ParticuleBackground";

export default function Start() {
  return (
    <div className="w-screen h-screen overflow-hidden relative">

      <ParticleBackground />
      <h1 className="font-baskerville  text-[24px] font-bold m-4 absolute top-0 left-0 z-10">
        WalletWatch
      </h1>

      <div className="w-full h-full flex flex-col items-center justify-center text-center space-y-4 relative z-10">
      <Logo size={150} />
        <h2 className="text-[50px] font-bold w-1/2 font-baskerville">
          Take a full control of your money - all in one place
        </h2>
        <h3 className="text-[16px] font-normal">
          Your money, Your plan, Your growth
        </h3>
        <Button text="GET STARTED" bg_color="secondary" size="lg" />
      </div>

    </div>
  );
}