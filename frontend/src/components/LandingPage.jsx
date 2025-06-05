import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br bg-[#1E1E24 ]">
      <div className="text-center">
        <h1 className="text-white text-4xl font-bold mb-10">Welcome to ChatApp</h1>
        <div className="space-x-4">
          <button 
            onClick={() => navigate('/signup')} 
            className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow hover:bg-gray-100 transition"
          >
            Sign Up
          </button>
          <button 
            onClick={() => navigate('/login')} 
            className="px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg shadow hover:bg-gray-100 transition"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
