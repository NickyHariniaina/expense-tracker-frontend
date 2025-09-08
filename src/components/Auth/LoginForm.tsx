import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import Logo from '../Logo/Logo';
import photo from '../../assets/home.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUser, faKey } from "@fortawesome/free-solid-svg-icons";
import Banner from '../Banner/Banner';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
  };

  return (
    <div className=" min-h-screen mx-0 md:gap-x-8 lg:gap-x-12">
      <h1 className="m-8 text-green text-start font-spartan text-2xl font-bold">
        WalletWatch
      </h1>
      <div className='flex flex-col sm:flex-col md:flex-row mx-12 md:mx-12"'>
        <section className="md:basis-1/2 flex flex-col justify-center items-center bg-white relative mb-8 md:mb-0">
          <div className='text-start items-start'>
            <div className="mb-12 ">
              <Logo size={75} />
            </div>
            <h2 className="text-5xl font-bold text-green font-spartan mb-6">
              Take a full control of your money - all in one place
            </h2>
            <p className="font-spartan text-lg text- mb-6">
              Whether you’re managing your personal budget, running a small business,
              or just curious about your financial flow, WalletWatch gives you the clarity
              you need to stay in control.
            </p>
            <h2 className="font-spartan text-center font-bold text-2xl text-gray">
              Your money. Your plan. Your growth.
            </h2>
          </div>
          <div className="mt-4  text-center">
            <img src={photo} alt="home photo" />
          </div>
        </section>
        <section className="md:basis-1/2 flex h-full items-center justify-center relative">
          <div
            className="w-full sm:w-4/5 md:w-3/4 lg:w-1/2 p-8 h-auto md:h-3/4 bg-white rounded-lg shadow-lg shadow-gray-500 relative mb-8 md:mb-0"
          >
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 flex items-center justify-center rounded-full primary-color text-white">
                <FontAwesomeIcon icon={faUser} size="2x" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-center font-spartan mb-6">Login</h2>
            {error && <p className="text-red text-sm mb-4">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-5 ">
              <div className="relative">
                <h2 className="text-2xl font-light text-center font-spartan mb-2">Email</h2>
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="absolute left-3 top-4/6 text-red"
                />
                <input
                  placeholder="Enter your email"
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 p-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="relative">
                <h2 className="text-2xl font-light text-center font-spartan mb-2">Password</h2>
                <FontAwesomeIcon
                  icon={faKey}
                  className="absolute left-3 top-4/6 text-red"
                />
                <input
                  placeholder="Enter your password..."
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 p-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  disabled={isLoading}
                />
              </div>

              <Button
                text={isLoading ? 'Connexion...' : 'LOG IN'}
                type="submit"
                bg_color="secondary"
                size="md"
                disabled={isLoading}
                className="w-1/2 rounded-full"
              />
            </form>

            <Link to="/signup" className="hover:underline">
              Don’t have an account ?
            </Link>
          </div>
        </section>

      </div>
      <Banner>
      </Banner>
    </div>
  );
};

export default Login;
