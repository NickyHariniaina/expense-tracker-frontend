import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faKey, faUser } from "@fortawesome/free-solid-svg-icons";
import Button from "../Button/Button";
import { signup } from "../../utils/auth";
import Loading from "../Loading/Loading";

interface SignUpProps {
  toggleForm: () => void;
}

const SignUp: React.FC<SignUpProps> = ({ toggleForm }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      await signup(email, password);

      setSuccessMessage("User created successfully!");
    } catch (error) {
      setErrorMessage("User creation failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full relative">
      <div className="w-full max-w-4xl relative">
        {/* Fullscreen overlay spinner */}
        {isLoading && (
          <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-50">
            <Loading size="lg" />
          </div>
        )}

        <section className="w-full md:basis-1/2 flex items-center justify-center relative">
          <div className="w-full sm:w-4/5 md:w-3/4 lg:w-1/2 p-6 md:p-8 bg-white rounded-lg shadow-lg shadow-gray-500 relative mb-8 md:mb-0">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 flex items-center justify-center rounded-full primary-color text-white">
                <FontAwesomeIcon icon={faUser} size="3x" />
              </div>
            </div>

            <h2 className="text-3xl font-bold text-center font-spartan mb-6">
              Sign Up
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div className="relative">
                <h2 className="text-2xl font-light text-center font-spartan mb-2">
                  Email
                </h2>
                <div className="relative w-full">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red pointer-events-none z-10"
                  />
                  <input
                    placeholder="Enter your email..."
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

              {/* Password & Confirm */}
              <div className="relative">
                <h2 className="text-2xl font-light text-center font-spartan mb-2">
                  Password
                </h2>
                <div className="flex flex-col gap-3 space-x-1">
                  <div className="relative">
                    <FontAwesomeIcon
                      icon={faKey}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red pointer-events-none z-10"
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
                  <div className="relative">
                    <FontAwesomeIcon
                      icon={faKey}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red pointer-events-none z-10"
                    />
                    <input
                      placeholder="Confirm your password..."
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 h-10"
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col xl:flex-row gap-2 basis-1/2 m-9 justify-center items-center">
                <Button
                  type="submit"
                  bg_color="primary"
                  size="md"
                  disabled={isLoading}
                  className="secondary-color rounded-2xl p-10 flex items-center justify-center gap-2"
                >
                  {isLoading ? <Loading size="sm" /> : "SIGN UP"}
                </Button>
                <Button
                  text="GO BACK TO LOG IN"
                  onClick={toggleForm}
                  size="md"
                  className="terty-color rounded-2xl p-3"
                  disabled={isLoading}
                />
              </div>

              {/* Messages */}
              {successMessage && (
                <p className="text-green-600 text-center font-medium">
                  {successMessage}
                </p>
              )}
              {errorMessage && (
                <p className="text-red-600 text-center font-medium">
                  {errorMessage}
                </p>
              )}
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SignUp;

