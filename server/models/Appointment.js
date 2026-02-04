import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  //link to the patient 
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  },

  // the input the user enters 
  symptoms: {
    type: String,
    required: [true, "Symptoms are required for triage"]
  },


  appointmentDate: {
    type: Date,
    required: true
  },

  // the priority of the user 
  priorityScore: {
    type: Number,
    default: 0
  },
  
  priorityLabel: {
    type: String,
    enum: ['Critical', 'High', 'Medium', 'Low'], 
    default: 'Low'
  },

  // Status Tracking
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed', 'cancelled'],
    default: 'pending'
  }

}, { timestamps: true }); // Adds createdAt and updatedAt automatically

export default mongoose.model('Appointment', appointmentSchema);