import React, { useState } from 'react';
import axios from 'axios'; // 1. Import Axios for API calls
import { useAuth } from '../context/AuthContext'; // 2. Import Auth to get User Name
import { 
  User, 
  Clock, 
  Stethoscope, 
  X, 
  Info, 
  RefreshCw, 
  Eye, 
  Plus,
  ChevronDown,
  ArrowRight,
  Activity
} from 'lucide-react';

const PatientDashboard = () => {
  const { user } = useAuth(); // Get logged in user details
  const [symptoms, setSymptoms] = useState([]); // Start empty
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // State to store the result from the Backend (AI Triage)
  const [triageResult, setTriageResult] = useState(null);

  const suggestions = ['Headache', 'Fever', 'Cough', 'Fatigue', 'Chest Pain', 'Dizziness'];

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

  // --- 3. THE SUBMIT FUNCTION ---
  const handleSubmit = async () => {
    if (symptoms.length === 0) return alert("Please add at least one symptom.");
    
    setLoading(true);
    try {
      // Convert array ["Fever", "Cough"] -> String "Fever, Cough"
      const symptomString = symptoms.join(", ");
      
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      
      const response = await axios.post(`${API_URL}/patient/add`, {
        userId: user.id || user._id, // Handle different ID formats
        symptoms: symptomString
      });

      // Save the real AI response to state
      setTriageResult(response.data); 
      console.log("AI Diagnosis:", response.data);

    } catch (error) {
      console.error("Error submitting symptoms:", error);
      alert("Failed to submit symptoms. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Helper to determine color based on returned Priority
  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'critical': return 'text-red-500 bg-red-50';
      case 'high': return 'text-orange-500 bg-orange-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-blue-500 bg-blue-50';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center p-6 font-sans text-slate-700">
      <div className="w-full max-w-lg space-y-5">
        
        {/* --- DYNAMIC PROFILE HEADER --- */}
        <div className="bg-[#1e90ff] rounded-[2rem] p-8 text-white shadow-lg shadow-blue-100 relative overflow-hidden">
          <div className="flex items-center gap-5 relative z-10">
            <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-md">
              <User size={32} strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-sm opacity-90 font-medium mb-0.5">Welcome back,</p>
              {/* Uses real user name */}
              <h2 className="text-3xl font-bold tracking-tight capitalize">
                {user?.name || "Patient"} 
              </h2>
              <p className="text-[10px] opacity-75 mt-1 font-bold uppercase tracking-widest">
                Today: {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="absolute -right-6 -bottom-6 bg-white/10 w-32 h-32 rounded-full blur-2xl"></div>
        </div>

        {/* --- INPUT SECTION (Only show if NOT submitted yet) --- */}
        {!triageResult && (
          <div className="bg-white rounded-[1.5rem] p-6 border border-slate-100 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2.5">
                <div className="text-[#1e90ff]"><Stethoscope size={20} /></div>
                <h3 className="text-sm font-bold text-slate-800">Describe Your Symptoms</h3>
              </div>
              <span className="text-[11px] font-bold text-slate-300">{symptoms.length} Added</span>
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
                placeholder="Type a symptom (e.g., Chest pain)..." 
                className="w-full bg-white border-2 border-slate-100 focus:border-[#1e90ff] rounded-2xl px-5 py-4 text-sm outline-none transition-all placeholder:text-slate-300 font-medium"
              />
              {showSuggestions && (
                <div className="absolute top-full left-0 right-0 bg-white border border-slate-100 shadow-2xl rounded-2xl mt-3 z-30 overflow-hidden">
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

            {/* SUBMIT BUTTON */}
            <button 
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-[#1e90ff] hover:bg-[#1c86ee] text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2.5 text-sm shadow-lg shadow-blue-100 transition-all active:scale-[0.98] mt-4"
            >
              {loading ? 'Analyzing...' : 'Submit Assessment'}
              {!loading && <ArrowRight size={18} />}
            </button>
          </div>
        )}

        {/* --- RESULT / QUEUE CARD (Only show AFTER submission) --- */}
        {triageResult && (
          <div className="bg-white rounded-[1.5rem] p-6 border border-slate-100 shadow-sm space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-slate-800">Assessment Complete</h3>
              <span className="bg-[#f0f7ff] text-[#1e90ff] text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-[#1e90ff] rounded-full" /> In Queue
              </span>
            </div>

            <div className="flex items-center justify-between px-2">
              <div className="bg-[#f0f7ff] p-5 rounded-[1.5rem] w-[100px] text-center">
                {/* Random Queue number or from Backend if available */}
                <p className="text-3xl font-black text-[#1e90ff]">#{Math.floor(Math.random() * 20) + 1}</p>
                <p className="text-[9px] text-[#1e90ff] uppercase font-black mt-1 tracking-tighter">Your Token</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-2 mb-2">
                   <Activity size={16} className="text-slate-300" />
                   <span className="text-sm font-bold text-slate-700">AI Score</span>
                </div>
                {/* DISPLAY REAL SCORE */}
                <div className="text-2xl font-black text-slate-700">{triageResult.savedEntry.priorityScore}</div>
              </div>

              <div className="bg-[#f0f7ff] p-5 rounded-[1.5rem] w-[100px] text-center">
                <p className="text-2xl font-black text-[#1e90ff]">--</p>
                <p className="text-[9px] text-[#1e90ff] uppercase font-black mt-1 tracking-tighter">Est. Wait</p>
              </div>
            </div>

            <div className="flex justify-between items-center py-4 border-y border-slate-50">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Priority Level</p>
              
              {/* DYNAMIC PRIORITY BADGE */}
              <div className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-100 transition-colors font-bold uppercase text-xs ${getPriorityColor(triageResult.savedEntry.priority)}`}>
                <User size={16} />
                {triageResult.savedEntry.priority}
              </div>
            </div>

            <div className="bg-[#f0f7ff]/60 p-4 rounded-2xl flex gap-4 border border-[#f0f7ff]">
              <div className="bg-[#1e90ff] text-white p-1 rounded-full h-fit mt-0.5">
                <Info size={14} strokeWidth={3} />
              </div>
              <div>
                <p className="text-[11px] font-black text-[#003366] uppercase tracking-tight">AI Assessment Note</p>
                <p className="text-[10px] text-slate-500 leading-relaxed mt-1 font-medium">
                  Based on your symptoms, our AI has prioritized your case as <strong>{triageResult.savedEntry.priority}</strong>.
                </p>
              </div>
            </div>
            
            <button onClick={() => setTriageResult(null)} className="w-full bg-white border-2 border-slate-100 text-[#1e90ff] font-bold py-4 rounded-2xl flex items-center justify-center gap-2.5 text-sm hover:bg-slate-50 transition-all active:scale-[0.98]">
              <RefreshCw size={18} /> Submit New Symptoms
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientDashboard;