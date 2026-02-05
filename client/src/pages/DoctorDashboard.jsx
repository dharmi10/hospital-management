import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; // 1. Import Auth for Logout/User info
import { 
  LayoutDashboard, Calendar, LogOut, Users, CheckCircle, 
  Clock, Stethoscope, History, Plus, X, ChevronLeft, ChevronRight, RefreshCw
} from 'lucide-react';

const DoctorDashboard = () => {
  const { user, logout } = useAuth(); // Get Doctor's name and Logout function
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  
  // --- REAL DATA STATES ---
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [consultationStarted, setConsultationStarted] = useState(false);

  // --- 1. FETCH QUEUE FROM API ---
  const fetchQueue = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const response = await axios.get(`${API_URL}/queue`);
      setPatients(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching queue:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQueue();
    const interval = setInterval(fetchQueue, 30000); // Poll every 30s
    return () => clearInterval(interval);
  }, []);

  // --- 2. HANDLE COMPLETING A PATIENT ---
  const handleCompletePatient = async (patientId) => {
    if (!window.confirm("Mark this patient as treated?")) return;
    
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      await axios.put(`${API_URL}/queue/complete/${patientId}`);
      
      // Update UI locally
      setPatients(patients.filter(p => p._id !== patientId));
      setConsultationStarted(false); // Reset button state
      alert("Patient marked as treated.");
    } catch (error) {
      alert("Failed to update status");
    }
  };

  // --- 3. CALCULATE REAL STATS ---
  const stats = [
    { 
      label: 'Total Patients', 
      value: patients.length, 
      sub: 'In Queue', 
      icon: <Users size={20} />, 
      color: 'bg-slate-50', 
      iconColor: 'text-slate-400' 
    },
    { 
      label: 'Critical Cases', 
      value: patients.filter(p => p.priority === 'Critical').length, 
      sub: 'Needs Attention', 
      icon: <CheckCircle size={20} />, 
      color: 'bg-red-50', 
      iconColor: 'text-red-500' 
    },
    { 
      label: 'Avg Wait', 
      value: '12m', 
      sub: 'Estimated', 
      icon: <Clock size={20} />, 
      color: 'bg-orange-50', 
      iconColor: 'text-orange-400' 
    },
    { 
      label: 'Next Up', 
      value: patients.length > 0 ? `#${patients[0].priorityScore}` : '--', 
      sub: 'Highest Score', 
      icon: <Stethoscope size={20} />, 
      color: 'bg-blue-50', 
      iconColor: 'text-blue-500' 
    },
  ];

  // Logic: The first person in the array is the "Current Consultation"
  const currentPatient = patients.length > 0 ? patients[0] : null;
  const waitingList = patients.length > 1 ? patients.slice(1) : [];

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-700">
      
      {/* --- SIDEBAR --- */}
      <aside className="w-64 bg-[#1e293b] text-slate-300 flex flex-col fixed h-full">
        <div className="p-6 flex items-center gap-3">
          <div className="bg-blue-500 p-2 rounded-lg">
            <Stethoscope className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-white font-bold text-lg leading-none">MedQueue</h1>
            <span className="text-xs text-slate-500">Hospital System</span>
          </div>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2">
          <p className="text-[10px] uppercase font-bold text-slate-500 px-2 mb-4 tracking-wider">Navigation</p>
          <button 
            onClick={() => {setActiveTab('dashboard'); setShowHistory(false)}}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'dashboard' ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20' : 'hover:bg-slate-800'}`}
          >
            <LayoutDashboard size={20} />
            <span className="font-medium text-sm">Dashboard</span>
          </button>
          <button 
            onClick={() => {setActiveTab('appointments'); setShowHistory(false)}}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'appointments' ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20' : 'hover:bg-slate-800'}`}
          >
            <Calendar size={20} />
            <span className="font-medium text-sm">Appointments</span>
          </button>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="mb-4 px-2">
            <p className="text-white font-semibold text-sm capitalize">{user?.name || "Doctor"}</p>
            <p className="text-xs text-slate-500">General Medicine</p>
          </div>
          <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 text-slate-400">
            <LogOut size={20} />
            <span className="font-medium text-sm">Logout</span>
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 flex flex-col ml-64">
        <header className="bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center sticky top-0 z-10">
          <div className="flex items-center gap-4">
            {showHistory && (
              <button onClick={() => setShowHistory(false)} className="p-2 hover:bg-slate-100 rounded-lg border border-slate-200">
                <ChevronLeft size={20} />
              </button>
            )}
            <div>
              <h2 className="text-xl font-bold text-slate-800 capitalize">
                {showHistory ? 'Patient History' : activeTab === 'dashboard' ? `Welcome, ${user?.name || 'Doctor'}` : 'Appointments'}
              </h2>
              <p className="text-xs text-slate-500">
                {showHistory ? 'View past consultations and medical records' : 'Dashboard Overview'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
             <button onClick={fetchQueue} className="p-2 bg-slate-50 hover:bg-slate-100 rounded-full text-slate-500 transition-colors" title="Refresh Queue">
                <RefreshCw size={18} />
             </button>
             <div className="text-right">
                <p className="font-semibold text-slate-700">{new Date().toLocaleDateString()}</p>
                <p className="text-xs text-slate-400">Online</p>
             </div>
          </div>
        </header>

        <div className="p-8 overflow-y-auto">
          {showHistory ? (
            <PatientHistoryView />
          ) : activeTab === 'dashboard' ? (
            <DashboardView 
              stats={stats} 
              currentPatient={currentPatient} // Pass the #1 Patient
              waitingPatients={waitingList}   // Pass the rest
              onHistoryClick={() => setShowHistory(true)}
              consultationStarted={consultationStarted}
              setConsultationStarted={setConsultationStarted}
              onComplete={handleCompletePatient} // Pass completion logic
              loading={loading}
            />
          ) : (
            <AppointmentsView onNewAppointment={() => setShowAppointmentModal(true)} />
          )}
        </div>
      </main>

      {showAppointmentModal && (
        <AppointmentModal onClose={() => setShowAppointmentModal(false)} />
      )}
    </div>
  );
};

// --- SUB COMPONENTS (UPDATED WITH REAL PROPS) ---

const DashboardView = ({ stats, currentPatient, waitingPatients, onHistoryClick, consultationStarted, setConsultationStarted, onComplete, loading }) => (
  <div className="space-y-8 animate-in fade-in duration-500">
    <div className="grid grid-cols-4 gap-6">
      {stats.map((stat, i) => (
        <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className={`${stat.color} ${stat.iconColor} p-4 rounded-xl`}>{stat.icon}</div>
          <div>
            <p className="text-xs text-slate-400 font-medium">{stat.label}</p>
            <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
            <p className="text-[10px] text-slate-400">{stat.sub}</p>
          </div>
        </div>
      ))}
    </div>

    <div>
      <h3 className="text-lg font-bold text-slate-800 mb-4">Patient Queue</h3>
      
      {loading ? (
         <div className="text-center py-10 text-slate-400">Loading queue...</div>
      ) : (
      <div className="space-y-6">
        
        {/* --- CURRENTLY IN CONSULTATION (Top Priority) --- */}
        <section>
          <p className="text-xs font-semibold text-slate-400 uppercase mb-3">Next Up / In Consultation</p>
          
          {currentPatient ? (
            <div className={`bg-white border-2 rounded-2xl p-6 shadow-md relative overflow-hidden transition-colors ${currentPatient.priority === 'Critical' ? 'border-red-500' : 'border-blue-500'}`}>
              <div className="flex justify-between items-start mb-6">
                <div className="flex gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${currentPatient.priority === 'Critical' ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-500'}`}>
                    <Users size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-lg capitalize">{currentPatient.user?.name || "Unknown"}</h4>
                    <p className="text-xs text-slate-500">Wait Time: {Math.floor((new Date() - new Date(currentPatient.createdAt)) / 60000)} mins</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-400 mb-1">Score: {currentPatient.priorityScore}</p>
                  <span className={`text-white text-[10px] px-2 py-1 rounded-full flex items-center gap-1 ${currentPatient.priority === 'Critical' ? 'bg-red-500' : 'bg-blue-500'}`}>
                    <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" /> {currentPatient.priority}
                  </span>
                </div>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl mb-6">
                <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Reported Symptoms</p>
                <p className="text-sm text-slate-700 font-medium">{currentPatient.symptoms}</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-blue-500 text-xs font-bold">
                  <Stethoscope size={16} /> Ready for Consultation
                </div>
                <div className="flex gap-3">
                  <button onClick={onHistoryClick} className="px-6 py-2.5 rounded-lg border border-slate-200 text-sm font-semibold flex items-center gap-2 hover:bg-slate-50">
                    <History size={16} /> History
                  </button>
                  {/* COMPLETION BUTTON */}
                  <button 
                    onClick={() => onComplete(currentPatient._id)}
                    className={`px-8 py-2.5 rounded-lg text-white text-sm font-semibold flex items-center gap-2 shadow-lg transition-colors ${consultationStarted ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-blue-600 hover:bg-blue-700'}`}
                  >
                    <CheckCircle size={16} /> Complete Treatment
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white border-dashed border-2 border-slate-200 rounded-2xl p-10 text-center text-slate-400">
                <p>No patients currently waiting.</p>
            </div>
          )}
        </section>

        {/* --- WAITING LIST (The rest) --- */}
        {waitingPatients.length > 0 && (
            <section>
            <p className="text-xs font-semibold text-slate-400 uppercase mb-3">Next in Line ({waitingPatients.length})</p>
            <div className="grid grid-cols-3 gap-6">
                {waitingPatients.map((patient, index) => (
                <PatientCard key={patient._id} patient={patient} index={index} onHistory={onHistoryClick} />
                ))}
            </div>
            </section>
        )}
      </div>
      )}
    </div>
  </div>
);

const PatientCard = ({ patient, index, onHistory }) => (
  <div className={`bg-white rounded-2xl p-5 border shadow-sm transition-all hover:shadow-md ${patient.priority === 'Critical' ? 'border-red-100 bg-red-50/10' : 'border-slate-100'}`}>
    <div className="flex justify-between items-start mb-4">
      <div className="flex gap-3">
        <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-400">
          <Users size={20} />
        </div>
        <div>
          <h4 className="font-bold text-sm text-slate-800 capitalize">{patient.user?.name || "Unknown"}</h4>
          <p className="text-[10px] text-slate-500">Wait: {Math.floor((new Date() - new Date(patient.createdAt)) / 60000)}m</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-[10px] text-slate-400 mb-1">#{index + 2}</p>
        <span className={`text-[9px] px-2 py-0.5 rounded-full text-white flex items-center gap-1 ${patient.priority === 'Critical' ? 'bg-red-500' : patient.priority === 'High' ? 'bg-orange-500' : 'bg-blue-500'}`}>
          <div className="w-1 h-1 bg-white rounded-full" /> {patient.priority}
        </span>
      </div>
    </div>
    <div className="bg-slate-50 p-3 rounded-lg mb-4 h-16 overflow-hidden">
      <p className="text-[9px] font-bold text-slate-400 uppercase mb-0.5">Symptoms</p>
      <p className="text-xs text-slate-600 line-clamp-2">{patient.symptoms}</p>
    </div>
    <div className="grid grid-cols-1">
      <button onClick={onHistory} className="py-2 rounded-lg border border-slate-200 text-[11px] font-bold flex items-center justify-center gap-1.5 hover:bg-slate-50">
        <History size={14} /> History
      </button>
    </div>
  </div>
);

// --- STATIC VIEWS (Unchanged mostly) ---
const AppointmentsView = ({ onNewAppointment }) => (
  <div className="flex gap-8">
    <div className="w-80 space-y-4">
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-2 mb-6 text-slate-800 font-bold">
          <Calendar size={18} /> Calendar
        </div>
        <div className="text-center">
            {/* Calendar UI - Simplified for brevity */}
            <p className="text-slate-400 text-sm">Calendar Widget</p>
        </div>
      </div>
    </div>
    <div className="flex-1 bg-white rounded-2xl border border-slate-100 shadow-sm p-8 min-h-[500px] relative flex flex-col items-center justify-center text-slate-300">
        <Calendar size={48} className="opacity-50 mb-4" />
        <p className="text-slate-800 font-bold">No appointments</p>
    </div>
  </div>
);

const PatientHistoryView = () => (
  <div className="space-y-6">
    <div className="bg-white rounded-2xl border-2 border-dashed border-slate-200 p-20 flex flex-col items-center justify-center text-slate-400">
       <History size={48} className="mb-4 opacity-50"/>
       <p>Select a patient to view history.</p>
    </div>
  </div>
);

const AppointmentModal = ({ onClose }) => (
  <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div className="bg-white p-8 rounded-2xl">
        <h2 className="text-xl font-bold mb-4">Feature coming soon</h2>
        <button onClick={onClose} className="px-4 py-2 bg-blue-500 text-white rounded-lg">Close</button>
    </div>
  </div>
);

export default DoctorDashboard;