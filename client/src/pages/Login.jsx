import React, { useState } from 'react';
import { Heart, User, Stethoscope, Mail, Phone, ArrowRight, Lock, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/authService';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  // 1. STATE FOR LOGIC
  const [userType, setUserType] = useState('patient'); // 'patient' or 'doctor'
  const [loginMethod, setLoginMethod] = useState('email');
  
  // Form State
  const [identifier, setIdentifier] = useState(''); // Stores Email or Phone
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Hooks
  const navigate = useNavigate();
  const { login } = useAuth();

  // 2. THE LOGIN FUNCTION
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Note: Our backend currently expects "email", so we send identifier as email
      const data = await loginUser(identifier, password);
      
      // Check if the user is logging in with the correct role
      if (data.role !== userType) {
        throw new Error(`Please switch to the ${data.role} tab to login.`);
      }

      login(data.result, data.token);
    
      // Redirect based on role
      if (data.role === 'doctor') navigate('/doctor');
      else navigate('/patient');

    } catch (err) {
      setError(err.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 font-sans text-slate-700">
      
      {/* HEADER LOGO */}
      <div className="flex items-center gap-2 mb-8">
        <div className="bg-blue-500 p-2 rounded-xl shadow-lg shadow-blue-200">
          <Heart className="text-white w-8 h-8" fill="currentColor" />
        </div>
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
          MediCare<span className="text-blue-500">+</span>
        </h1>
      </div>

      <div className="bg-white w-full max-w-md rounded-3xl shadow-xl shadow-slate-200/60 p-8 border border-slate-100">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Welcome Back</h2>
          <p className="text-slate-400">Sign in to access your healthcare portal</p>
        </div>

        {/* ERROR MESSAGE BOX */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-600 p-3 rounded-xl flex items-center gap-2 text-sm">
            <AlertCircle size={18} />
            {error}
          </div>
        )}

        {/* FORM START */}
        <form onSubmit={handleLogin}>

          {/* ROLE SELECTOR (Doctor vs Patient) */}
          <div className="mb-6">
            <label className="text-sm font-semibold mb-3 block text-slate-600">I am a</label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setUserType('patient')}
                className={`flex items-center justify-center gap-3 py-4 px-4 rounded-2xl border-2 transition-all duration-200 ${
                  userType === 'patient'
                    ? 'border-blue-500 bg-blue-50 text-blue-600'
                    : 'border-slate-100 bg-white text-slate-500 hover:border-slate-200'
                }`}
              >
                <div className={`p-2 rounded-lg ${userType === 'patient' ? 'bg-blue-500 text-white' : 'bg-slate-100 text-slate-400'}`}>
                  <User size={20} />
                </div>
                <span className="font-medium">Patient</span>
              </button>

              <button
                type="button"
                onClick={() => setUserType('doctor')}
                className={`flex items-center justify-center gap-3 py-4 px-4 rounded-2xl border-2 transition-all duration-200 ${
                  userType === 'doctor'
                    ? 'border-blue-500 bg-blue-50 text-blue-600'
                    : 'border-slate-100 bg-white text-slate-500 hover:border-slate-200'
                }`}
              >
                <div className={`p-2 rounded-lg ${userType === 'doctor' ? 'bg-blue-500 text-white' : 'bg-slate-100 text-slate-400'}`}>
                  <Stethoscope size={20} />
                </div>
                <span className="font-medium">Doctor</span>
              </button>
            </div>
          </div>

          {/* EMAIL INPUT */}
          <div className="mb-4">
            <label className="text-sm font-semibold mb-2 block text-slate-600">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <Mail size={18} />
              </div>
              <input
                type="email"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-300"
              />
            </div>
          </div>

          {/* PASSWORD INPUT (Added this!) */}
          <div className="mb-8">
            <label className="text-sm font-semibold mb-2 block text-slate-600">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <Lock size={18} />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-300"
              />
            </div>
          </div>

          {/* LOGIN BUTTON */}
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-100 mb-8 active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? 'Signing In...' : 'Continue'}
            {!loading && <ArrowRight size={20} />}
          </button>

        </form>
        {/* FORM END */}

        <div className="relative mb-8 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-100"></div>
          </div>
          <span className="relative px-4 bg-white text-sm text-slate-400">New to MediCare+?</span>
        </div>

        {/* REGISTER BUTTON */}
        <button 
          onClick={() => navigate('/register')}
          className="w-full bg-white border-2 border-blue-500 text-blue-600 font-bold py-4 rounded-2xl hover:bg-blue-50 transition-all active:scale-[0.98]"
        >
          Create an Account
        </button>
      </div>

      <p className="mt-8 text-sm text-slate-400">
        By continuing, you agree to our <a href="#" className="text-blue-500 font-medium hover:underline">Terms of Service</a> and <a href="#" className="text-blue-500 font-medium hover:underline">Privacy Policy</a>
      </p>
    </div>
  );
};

export default Login;