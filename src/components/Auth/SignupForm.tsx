import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faKey, faUser } from '@fortawesome/free-solid-svg-icons';
import Button from '../Button/Button';
import { signup } from '../../utils/auth';

interface SignUpProps {
  toggleForm: () => void;
}

const SignUp: React.FC<SignUpProps> = ({ toggleForm }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMessage(null);
    if (password!==confirmPassword) {
      setIsLoading(false);
      return
    }
    try {
      await signup(email ,password)
      setSuccessMessage('well! the user is created.')
    } catch (error) {
      setErrorMessage("User creatin failled")
    }
      finally{
        setIsLoading(false)
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
            <h2 className="text-3xl font-bold text-center font-spartan mb-6">Sign Up</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="relative">
                <h2 className="text-2xl font-light text-center font-spartan mb-2">Email</h2>
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

              <div className="relative">
                <h2 className="text-2xl font-light text-center font-spartan mb-2">Password</h2>
                <div className='flex fles-col space-x-1'>
                  <div className="relative w-1/2">
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
                  <div className="relative w-1/2">
                    <FontAwesomeIcon
                      icon={faKey}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red pointer-events-none z-10"
                    />
                    <input
                      placeholder="Confirm your pass..."
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
            <div className='flex flex-row basis-1/2 m-9 justify-center items-center space-x-2'>
              <div className="text-center">
                <Button
                  text={isLoading ? 'Signing up' : 'SIGN UP'}
                  type="submit"
                  bg_color="primary"
                  size="md"
                  disabled={isLoading}
                  className="secondary-color rounded-full"
                />
              </div>
              <div className="text-center">
                <Button
                  text="GO BACK TO LOG IN"
                  onClick={toggleForm}
                  size="md"
                  className=" terty-color rounded-full"
                /> 
              </div>
              
            </div>
            
            {successMessage }
                {errorMessage}
                
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SignUp;