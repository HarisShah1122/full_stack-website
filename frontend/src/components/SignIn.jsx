import React, { useState } from 'react';
import { FaEye, FaEyeSlash, FaGoogle, FaFacebookF } from 'react-icons/fa';
import { MdCheck } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const togglePassword = () => setShowPassword(!showPassword);

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8081/login', { email, password });
      if (response.status === 200) {
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div>
      <section className="py-8 bg-gray-50">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 text-center mb-6">Sign In</h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form onSubmit={handleSignIn}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                />
                <MdCheck className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500" />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                />
                <button type="button" onClick={togglePassword} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-500">
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            <div className="text-right mb-4">
              <a href="#" className="text-sm text-gray-600 hover:text-blue-500 hover:underline">Forget Password?</a>
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white font-semibold py-3 px-8 rounded-full hover:bg-blue-800 hover:scale-105 focus:ring-2 focus:ring-blue-400 transition-all duration-300">Sign In</button>
          </form>
          <p className="text-center text-sm text-gray-600 mt-4">
            Don’t have an account? <Link to="/signup" className="text-blue-500 font-medium hover:underline">Sign Up</Link>
          </p>
          <div className="flex justify-center gap-4 mt-4">
            <button onClick={() => window.location.href = 'http://localhost:8081/auth/facebook'} className="text-blue-600 hover:scale-110 transition-transform">
              <FaFacebookF />
            </button>
            <button onClick={() => window.location.href = 'http://localhost:8081/auth/google'} className="text-red-600 hover:scale-110 transition-transform">
              <FaGoogle />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignIn;