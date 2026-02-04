// models folder - database schema(structure of data)
// stores login info (patient or doctor)
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  // basic indentity 
  name: {
    type: String,
    required: true,
    trim: true  // removes spaces before and after the word 
  },

  email: {
    type: String,
    required: true,
    unique: true, // two user with same email not possible 
    lowercase: true // // only lowercase emails 
  },

  // security 
  password: {
    type: String,
    required: true
  },

  // role based access 
  role: {
    type: String,
    enum: ['patient', 'doctor', 'admin'], 
    default: 'patient'
  },

  phone: {
    type: String,
    default: ''
  }

}, { timestamps: true });

export default mongoose.model('User', userSchema);