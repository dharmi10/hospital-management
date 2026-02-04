// login page
import React, { useState } from 'react';
import { Heart, User, Stethoscope, Mail, Phone, ArrowRight } from 'lucide-react';

const LoginPortal = () => {
  const [userType, setUserType] = useState('patient');
  const [loginMethod, setLoginMethod] = useState('email');

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 font-sans text-slate-700">
      
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

        <div className="mb-6">
          <label className="text-sm font-semibold mb-3 block text-slate-600">I am a</label>
          <div className="grid grid-cols-2 gap-4">
            <button
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

        <div className="mb-6">
          <label className="text-sm font-semibold mb-3 block text-slate-600">Login with</label>
          <div className="flex bg-slate-100 p-1.5 rounded-2xl">
            <button
              onClick={() => setLoginMethod('email')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl transition-all ${
                loginMethod === 'email' ? 'bg-white shadow-sm text-slate-800 font-semibold' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <Mail size={18} />
              <span>Email</span>
            </button>
            <button
              onClick={() => setLoginMethod('phone')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl transition-all ${
                loginMethod === 'phone' ? 'bg-white shadow-sm text-slate-800 font-semibold' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <Phone size={18} />
              <span>Phone</span>
            </button>
          </div>
        </div>

        <div className="mb-8">
          <label className="text-sm font-semibold mb-2 block text-slate-600">
            {loginMethod === 'email' ? 'Email Address' : 'Phone Number'}
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
              {loginMethod === 'email' ? <Mail size={18} /> : <Phone size={18} />}
            </div>
            <input
              type={loginMethod === 'email' ? 'email' : 'tel'}
              placeholder={loginMethod === 'email' ? 'you@example.com' : '+1 (555) 000-0000'}
              className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-300"
            />
          </div>
        </div>

        <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-100 mb-8 active:scale-[0.98]">
          Continue
          <ArrowRight size={20} />
        </button>

        <div className="relative mb-8 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-100"></div>
          </div>
          <span className="relative px-4 bg-white text-sm text-slate-400">New to MediCare+?</span>
        </div>

        <button className="w-full bg-white border-2 border-blue-500 text-blue-600 font-bold py-4 rounded-2xl hover:bg-blue-50 transition-all active:scale-[0.98]">
          Create an Account
        </button>
      </div>

      <p className="mt-8 text-sm text-slate-400">
        By continuing, you agree to our <a href="#" className="text-blue-500 font-medium hover:underline">Terms of Service</a> and <a href="#" className="text-blue-500 font-medium hover:underline">Privacy Policy</a>
      </p>
    </div>
  );
};

export default LoginPortal;