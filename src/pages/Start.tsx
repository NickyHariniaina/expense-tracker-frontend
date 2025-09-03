import { useNavigate } from "react-router-dom";

export default function Start() {
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen overfolow-hidden">
      <h1 className="text-3xl font-bold">WalletWatch</h1>
      <div className="">
        <h2 className="text-4xl font-bold">Take a full control of your money - all in one place</h2>
        <h3 className="">Your money, Your plan, Your growth</h3>
      </div>
    </div>
  );
}
