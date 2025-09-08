import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button/Button'
const Login: React.FC=()=>{
    const [email, setEmail]= useState<string>('');
    const [password, setPassword]=useState<string>('');
    const [isLoading,setIsLoading]=useState<boolean>(false);
    const [error , setError]= useState<string |null>(null);

    const handleSubmit =async(e: React.FormEvent)=>{
        e.preventDefault();
        setIsLoading(true);
        setError(null);
    }
    const formData ={email,password};
    try {
        
    } catch (error) {
        
    }
    return(
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Connexion</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={isLoading}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={isLoading}
            />
          </div>
          <Button
            text={isLoading ? 'Connexion...' : 'Se connecter'}
            type="submit"
            bg_color="primary"
            size="md"
            disabled={isLoading}
            className="w-full"
          />
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Pas de compte ?{' '}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Créer un compte
          </Link>
        </p>
      </div>
    </div>
    )
}
export default Login