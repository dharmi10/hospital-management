// server/models/Patient.js
import mongoose from 'mongoose';

const patientSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Links this to the User model
    required: true
  },
  symptoms: {
    type: String,
    required: true
  },
  priority: {
    type: String,
    enum: ['Normal', 'High', 'Critical'],
    default: 'Normal'
  },
  priorityScore: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['waiting', 'seen', 'completed'],
    default: 'waiting'
  },
  createdAt: {
    type: Date,
    default: new Date()
  }
});

export default mongoose.model('Patient', patientSchema);