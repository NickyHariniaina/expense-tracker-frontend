import React, { useState } from "react";
import Button from "../Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUser, faKey } from "@fortawesome/free-solid-svg-icons";
import { login } from "../../utils/auth";
import { useNavigate } from "react-router-dom";

interface LoginFormProps {
  toggleForm: () => void;
}

const Login: React.FC<LoginFormProps> = ({ toggleForm }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const result = await login(email, password);

      if (result.success) {
        navigate("/dashboard");
      }
    } catch (error) {
      setError("An error occured during login.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <div className="w-full max-w-4xl">
        <section className="w-full md:basis-1/2 flex items-center justify-center relative">
          <div className="w-full sm:w-4/5 md:w-3/4 lg:w-1/2 p-6 md:p-8 bg-white rounded-lg shadow-lg shadow-gray-500 relative mb-8 md:mb-0">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 flex items-center justify-center rounded-full primary-color text-white">
                <FontAwesomeIcon icon={faUser} size="3x" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-center font-spartan mb-6">
              Login
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="relative">
                <h2 className="text-2xl font-light text-center font-spartan mb-2">
                  Email
                </h2>
                <div className="relative w-full">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="absolute text-red left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none z-10"
                  />
                  <input
                    placeholder="Enter your email"
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 h-10"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="relative">
                <h2 className="text-2xl font-light text-center font-spartan mb-2">
                  Password
                </h2>
                <div className="relative w-full">
                  <FontAwesomeIcon
                    icon={faKey}
                    className="absolute text-red left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none z-10"
                  />
                  <input
                    placeholder="Enter your password..."
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 h-10"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="text-center">
                <Button
                  text={isLoading ? "Connexion..." : "LOG IN"}
                  type="submit"
                  bg_color="secondary"
                  size="md"
                  disabled={isLoading}
                  className="w-1/2 rounded-2xl"
                />
              </div>

              <div className="text-center mt-4">
                <p
                  onClick={toggleForm}
                  style={{ cursor: "pointer" }}
                  className="text-blue hover:underline"
                >
                  Don't have an account? Sign up
                </p>
              </div>
              {error}
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Login;
