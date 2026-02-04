// the view for patients
import React, { useState } from 'react';
import { 
  User, 
  Clock, 
  Stethoscope, 
  X, 
  Info, 
  RefreshCw, 
  Eye, 
  Plus,
  ChevronDown
} from 'lucide-react';

const PatientDashboard = () => {
  const [symptoms, setSymptoms] = useState(['pukish']);
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const suggestions = ['Headache', 'Fever', 'Cough', 'Fatigue', 'Body Aches'];

  const addSymptom = (s) => {
    if (!symptoms.includes(s)) {
      setSymptoms([...symptoms, s]);
    }
    setInputValue('');
    setShowSuggestions(false);
  };

  const removeSymptom = (s) => {
    setSymptoms(symptoms.filter(item => item !== s));
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center p-6 font-sans text-slate-700">
      <div className="w-full max-w-lg space-y-5">
        
        {/* Profile Header Card */}
        <div className="bg-[#1e90ff] rounded-[2rem] p-8 text-white shadow-lg shadow-blue-100 relative overflow-hidden">
          <div className="flex items-center gap-5 relative z-10">
            <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-md">
              <User size={32} strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-sm opacity-90 font-medium mb-0.5">Welcome back,</p>
              <h2 className="text-3xl font-bold tracking-tight">Sarah Johnson</h2>
              <p className="text-[10px] opacity-75 mt-1 font-bold uppercase tracking-widest">
                Appointment: February 4, 2026
              </p>
            </div>
          </div>
          {/* Decorative Circle */}
          <div className="absolute -right-6 -bottom-6 bg-white/10 w-32 h-32 rounded-full blur-2xl"></div>
        </div>

        {/* Appointment Details Card */}
        <div className="bg-white rounded-[1.5rem] p-6 border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-sm font-bold text-slate-800">Appointment Details</h3>
            <span className="bg-[#fff8e6] text-[#ffb300] text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5">
               <div className="w-1.5 h-1.5 bg-[#ffb300] rounded-full" /> In Queue
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-[#f0f7ff] text-[#1e90ff] p-3.5 rounded-2xl">
              <Clock size={22} />
            </div>
            <div>
              <p className="text-base font-bold text-slate-800">Dr. Michael Chen</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">General Medicine</p>
              <div className="flex items-center gap-1.5 text-slate-500 mt-1">
                <Clock size={14} className="opacity-60" />
                <span className="text-xs font-semibold">10:30 AM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Describe Symptoms Card */}
        <div className="bg-white rounded-[1.5rem] p-6 border border-slate-100 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2.5">
              <div className="text-[#1e90ff]"><Stethoscope size={20} /></div>
              <h3 className="text-sm font-bold text-slate-800">Describe Your Symptoms</h3>
            </div>
            <span className="text-[11px] font-bold text-slate-300">1/5</span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {symptoms.map(s => (
              <span key={s} className="bg-slate-50 text-slate-600 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2 border border-slate-100">
                {s} 
                <button onClick={() => removeSymptom(s)} className="text-slate-400 hover:text-red-400">
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>

          <div className="relative">
            <input 
              value={inputValue}
              onChange={(e) => {setInputValue(e.target.value); setShowSuggestions(true)}}
              onFocus={() => setShowSuggestions(true)}
              placeholder="Type a symptom..." 
              className="w-full bg-white border-2 border-slate-100 focus:border-[#1e90ff] rounded-2xl px-5 py-4 text-sm outline-none transition-all placeholder:text-slate-300 font-medium"
            />
            {showSuggestions && (
              <div className="absolute top-full left-0 right-0 bg-white border border-slate-100 shadow-2xl rounded-2xl mt-3 z-30 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                {suggestions.map(s => (
                  <button 
                    key={s} 
                    onClick={() => addSymptom(s)} 
                    className="w-full text-left px-5 py-4 text-sm text-slate-600 hover:bg-slate-50 flex items-center gap-3 transition-colors border-b border-slate-50 last:border-0"
                  >
                    <Plus size={16} className="text-slate-300" /> {s}
                  </button>
                ))}
              </div>
            )}
          </div>
          <p className="text-[10px] text-slate-400 font-medium px-1">Please add at least 2 more symptoms</p>
        </div>

        {/* Queue Status Card */}
        <div className="bg-white rounded-[1.5rem] p-6 border border-slate-100 shadow-sm space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-slate-800">Queue Status</h3>
            <span className="bg-[#f0f7ff] text-[#1e90ff] text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-[#1e90ff] rounded-full" /> Waiting
            </span>
          </div>

          <div className="flex items-center justify-between px-2">
            <div className="bg-[#f0f7ff] p-5 rounded-[1.5rem] w-[100px] text-center">
              <p className="text-3xl font-black text-[#1e90ff]">12</p>
              <p className="text-[9px] text-[#1e90ff] uppercase font-black mt-1 tracking-tighter">Your Token</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-2 mb-2">
                <User size={16} className="text-slate-300" />
                <span className="text-sm font-bold text-slate-700">3 ahead</span>
              </div>
              <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="w-1/2 h-full bg-[#1e90ff] rounded-full shadow-[0_0_8px_rgba(30,144,255,0.4)]"></div>
              </div>
            </div>

            <div className="bg-[#f0f7ff] p-5 rounded-[1.5rem] w-[100px] text-center">
              <p className="text-2xl font-black text-[#1e90ff]">25 <span className="text-xs font-bold">min</span></p>
              <p className="text-[9px] text-[#1e90ff] uppercase font-black mt-1 tracking-tighter">Est. Wait</p>
            </div>
          </div>

          <div className="flex justify-between items-center py-4 border-y border-slate-50">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Priority Level</p>
            <button className="flex items-center gap-2 bg-slate-50 px-4 py-2.5 rounded-xl text-slate-600 border border-slate-100 hover:bg-slate-100 transition-colors">
              <User size={16} className="text-slate-400" />
              <span className="text-xs font-bold">Normal</span>
              <ChevronDown size={14} className="text-slate-300 ml-1" />
            </button>
          </div>

          <div className="bg-[#f0f7ff]/60 p-4 rounded-2xl flex gap-4 border border-[#f0f7ff]">
            <div className="bg-[#1e90ff] text-white p-1 rounded-full h-fit mt-0.5">
              <Info size={14} strokeWidth={3} />
            </div>
            <div>
              <p className="text-[11px] font-black text-[#003366] uppercase tracking-tight">Queue position may change</p>
              <p className="text-[10px] text-slate-500 leading-relaxed mt-1 font-medium">
                Emergency and priority cases may be attended first. Your estimated wait time will update automatically.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <button className="bg-[#1e90ff] hover:bg-[#1c86ee] text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2.5 text-sm shadow-lg shadow-blue-100 transition-all active:scale-[0.98]">
              <Eye size={20} /> View Live Queue
            </button>
            <button className="bg-white border-2 border-slate-100 text-[#1e90ff] font-bold py-4 rounded-2xl flex items-center justify-center gap-2.5 text-sm hover:bg-slate-50 transition-all active:scale-[0.98]">
              <RefreshCw size={18} /> Refresh Status
            </button>
          </div>
          <p className="text-center text-[10px] text-slate-300 font-bold uppercase tracking-widest">
            Last updated: Just now
          </p>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;