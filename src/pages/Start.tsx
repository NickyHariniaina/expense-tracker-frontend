import Button from "../components/Button/Button";
import Logo from "../components/Logo/Logo";

export default function Start() {
  return (
    <div className="w-screen h-screen overflow-hidden relative">
      <h1 className="text-[32px] font-bold m-4 absolute top-0 left-0">
        WalletWatch
      </h1>

      <div className="w-full h-full flex flex-col items-center justify-center text-center space-y-4">
      <Logo size={150} />
        <h2 className="text-[44px] font-bold w-1/2">
          Take a full control of your money - all in one place
        </h2>
        <h3 className="text-[16px]">
          Your money, Your plan, Your growth
        </h3>
        <Button text="GET STARTED" bg_color="secondary" size="lg" />
      </div>
    </div>
  );
}