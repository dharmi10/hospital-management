// the view for doctors 
import React, { useState } from 'react';
import { 
  LayoutDashboard, Calendar, LogOut, Users, CheckCircle, 
  Clock, Stethoscope, History, Plus, X, ChevronLeft, ChevronRight 
} from 'lucide-react';

const MedQueue = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [consultationStarted, setConsultationStarted] = useState(false);

  const stats = [
    { label: 'Total Patients', value: '5', sub: 'Assigned today', icon: <Users size={20} />, color: 'bg-slate-50', iconColor: 'text-slate-400' },
    { label: 'Consulted', value: '0', sub: 'Completed', icon: <CheckCircle size={20} />, color: 'bg-emerald-50', iconColor: 'text-emerald-500' },
    { label: 'Waiting', value: '4', sub: 'In queue', icon: <Clock size={20} />, color: 'bg-orange-50', iconColor: 'text-orange-400' },
    { label: 'Current Queue', value: '#1', sub: 'Next patient', icon: <Stethoscope size={20} />, color: 'bg-blue-50', iconColor: 'text-blue-500' },
  ];

  const waitingPatients = [
    { id: 1, name: 'John Smith', age: 45, symptoms: 'Chest pain, shortness of breath', type: 'Emergency', queue: '#1' },
    { id: 2, name: 'Linda Wilson', age: 42, symptoms: 'Severe headaches', type: 'Emergency', queue: '#2' },
    { id: 3, name: 'James Brown', age: 35, symptoms: 'Follow-up for hypertension', type: 'Follow-up', queue: '#3' },
    { id: 4, name: 'Michael Taylor', age: 55, symptoms: 'Post-surgery follow-up', type: 'Follow-up', queue: '#4' },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-700">
      <aside className="w-64 bg-[#1e293b] text-slate-300 flex flex-col">
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
            <p className="text-white font-semibold text-sm">Dr. Sarah Johnson</p>
            <p className="text-xs text-slate-500">Cardiology</p>
          </div>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 text-slate-400">
            <LogOut size={20} />
            <span className="font-medium text-sm">Logout</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col">
        <header className="bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            {showHistory && (
              <button onClick={() => setShowHistory(false)} className="p-2 hover:bg-slate-100 rounded-lg border border-slate-200">
                <ChevronLeft size={20} />
              </button>
            )}
            <div>
              <h2 className="text-xl font-bold text-slate-800">
                {showHistory ? 'Patient History' : activeTab === 'dashboard' ? 'Good Evening, Dr. Sarah Johnson' : 'Appointments'}
              </h2>
              <p className="text-xs text-slate-500">
                {showHistory ? 'View past consultations and medical records' : 'Cardiology • Interventional Cardiology'}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-semibold text-slate-700">Wednesday, February 4, 2026</p>
            <p className="text-xs text-slate-400">11:16 PM</p>
          </div>
        </header>

        <div className="p-8 overflow-y-auto">
          {showHistory ? (
            <PatientHistoryView />
          ) : activeTab === 'dashboard' ? (
            <DashboardView 
              stats={stats} 
              waitingPatients={waitingPatients} 
              onHistoryClick={() => setShowHistory(true)}
              consultationStarted={consultationStarted}
              setConsultationStarted={setConsultationStarted}
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

const DashboardView = ({ stats, waitingPatients, onHistoryClick, consultationStarted, setConsultationStarted }) => (
  <div className="space-y-8">
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
      <div className="space-y-6">
        <section>
          <p className="text-xs font-semibold text-slate-400 uppercase mb-3">Currently in Consultation</p>
          <div className="bg-white border-2 border-blue-500 rounded-2xl p-6 shadow-md relative overflow-hidden">
            <div className="flex justify-between items-start mb-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-500">
                  <Users size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">David White</h4>
                  <p className="text-xs text-slate-500">Age: 50</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-400 mb-1">Queue #11</p>
                <span className="bg-red-500 text-white text-[10px] px-2 py-1 rounded-full flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" /> Emergency
                </span>
              </div>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl mb-6">
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Symptoms</p>
              <p className="text-sm text-slate-700">Chest tightness, anxiety</p>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-blue-500 text-xs font-bold">
                <Stethoscope size={16} /> In Consultation
              </div>
              <div className="flex gap-3">
                <button onClick={onHistoryClick} className="px-6 py-2.5 rounded-lg border border-slate-200 text-sm font-semibold flex items-center gap-2 hover:bg-slate-50">
                  <History size={16} /> History
                </button>
                <button 
                  onClick={() => setConsultationStarted(!consultationStarted)}
                  className={`px-8 py-2.5 rounded-lg text-white text-sm font-semibold flex items-center gap-2 shadow-lg transition-colors ${consultationStarted ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-blue-500 hover:bg-blue-600'}`}
                >
                  <CheckCircle size={16} /> {consultationStarted ? 'Complete' : 'Start'}
                </button>
              </div>
            </div>
          </div>
        </section>

        <section>
          <p className="text-xs font-semibold text-slate-400 uppercase mb-3">Waiting (4)</p>
          <div className="grid grid-cols-3 gap-6">
            {waitingPatients.slice(0, 3).map((patient) => (
              <PatientCard key={patient.id} patient={patient} onHistory={onHistoryClick} />
            ))}
          </div>
        </section>
      </div>
    </div>
  </div>
);

const PatientCard = ({ patient, onHistory }) => (
  <div className={`bg-white rounded-2xl p-5 border shadow-sm transition-all hover:shadow-md ${patient.type === 'Emergency' ? 'border-red-100' : 'border-slate-100'}`}>
    <div className="flex justify-between items-start mb-4">
      <div className="flex gap-3">
        <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-400">
          <Users size={20} />
        </div>
        <div>
          <h4 className="font-bold text-sm text-slate-800">{patient.name}</h4>
          <p className="text-[10px] text-slate-500">Age: {patient.age}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-[10px] text-slate-400 mb-1">Queue {patient.queue}</p>
        <span className={`text-[9px] px-2 py-0.5 rounded-full text-white flex items-center gap-1 ${patient.type === 'Emergency' ? 'bg-red-500' : 'bg-blue-500'}`}>
          <div className="w-1 h-1 bg-white rounded-full" /> {patient.type}
        </span>
      </div>
    </div>
    <div className="bg-slate-50 p-3 rounded-lg mb-4 h-16">
      <p className="text-[9px] font-bold text-slate-400 uppercase mb-0.5">Symptoms</p>
      <p className="text-xs text-slate-600 line-clamp-2">{patient.symptoms}</p>
    </div>
    <div className="grid grid-cols-2 gap-2">
      <button onClick={onHistory} className="py-2 rounded-lg border border-slate-200 text-[11px] font-bold flex items-center justify-center gap-1.5 hover:bg-slate-50">
        <History size={14} /> History
      </button>
      <button className="py-2 rounded-lg bg-blue-600 text-white text-[11px] font-bold flex items-center justify-center gap-1.5 hover:bg-blue-700 shadow-md">
        <Stethoscope size={14} /> Start
      </button>
    </div>
  </div>
);

const AppointmentsView = ({ onNewAppointment }) => (
  <div className="flex gap-8">
    <div className="w-80 space-y-4">
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-2 mb-6 text-slate-800 font-bold">
          <Calendar size={18} /> Calendar
        </div>
        <div className="text-center">
          <div className="flex justify-between items-center mb-4">
            <button className="p-1 hover:bg-slate-100 rounded-md"><ChevronLeft size={16}/></button>
            <span className="text-sm font-bold">February 2026</span>
            <button className="p-1 hover:bg-slate-100 rounded-md"><ChevronRight size={16}/></button>
          </div>
          <div className="grid grid-cols-7 text-[10px] font-bold text-slate-400 mb-2">
            <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
          </div>
          <div className="grid grid-cols-7 gap-1">
            {[...Array(31)].map((_, i) => (
              <button key={i} className={`h-8 text-xs rounded-lg transition-colors ${i + 1 === 4 ? 'bg-blue-500 text-white font-bold' : 'hover:bg-slate-50'}`}>
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>

    <div className="flex-1 bg-white rounded-2xl border border-slate-100 shadow-sm p-8 min-h-[500px] relative">
      <div className="flex justify-between items-center mb-12">
        <h3 className="text-lg font-bold text-slate-800">Appointments for February 4, 2026</h3>
        <button onClick={onNewAppointment} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-bold shadow-lg">
          <Plus size={18} /> New Appointment
        </button>
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-300">
        <div className="bg-slate-50 p-4 rounded-2xl mb-4 border border-slate-100">
          <Calendar size={48} className="opacity-50" />
        </div>
        <p className="text-slate-800 font-bold">No appointments</p>
        <p className="text-sm">No appointments scheduled for this date.</p>
      </div>
    </div>
  </div>
);

const PatientHistoryView = () => (
  <div className="space-y-6">
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex justify-between items-center">
      <div className="flex gap-4">
        <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center text-blue-500">
          <Users size={28} />
        </div>
        <div>
          <h4 className="text-lg font-bold text-slate-800">David White</h4>
          <p className="text-sm text-slate-500">Age: 50 years</p>
          <p className="text-sm text-slate-400 mt-1">Current symptoms: Chest tightness, anxiety</p>
        </div>
      </div>
      <span className="bg-red-500 text-white text-xs px-3 py-1 rounded-full flex items-center gap-2">
        <div className="w-2 h-2 bg-white rounded-full" /> Emergency
      </span>
    </div>

    <div className="space-y-4">
      <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Consultation History</h3>
      <div className="bg-white rounded-2xl border-2 border-dashed border-slate-200 p-20 flex flex-col items-center justify-center text-slate-400">
        <div className="mb-4">
          <CheckCircle size={48} strokeWidth={1} />
        </div>
        <p className="text-slate-800 font-bold mb-1">No consultation history</p>
        <p className="text-sm">This patient has no previous consultations on record.</p>
      </div>
    </div>
  </div>
);

const AppointmentModal = ({ onClose }) => (
  <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
      <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold text-slate-800">Schedule Appointment</h3>
          <p className="text-xs text-slate-400">Schedule a new appointment for February 4, 2026</p>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full text-slate-400"><X size={20} /></button>
      </div>
      <div className="p-8 space-y-6">
        <div>
          <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Patient</label>
          <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm">
            <option>Select a patient</option>
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Time Slot</label>
            <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm">
              <option>Select time</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Appointment Type</label>
            <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm">
              <option>New Consultation</option>
            </select>
          </div>
        </div>
        <div>
          <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Notes (Optional)</label>
          <textarea placeholder="Additional notes..." className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 h-24 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm resize-none"></textarea>
        </div>
      </div>
      <div className="px-8 py-6 bg-slate-50 flex justify-end gap-3">
        <button onClick={onClose} className="px-6 py-2.5 rounded-xl font-bold text-sm text-slate-600 hover:bg-slate-200 transition-colors">Cancel</button>
        <button className="px-6 py-2.5 rounded-xl font-bold text-sm text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200 transition-colors">Schedule Appointment</button>
      </div>
    </div>
  </div>
);

export default MedQueue;
