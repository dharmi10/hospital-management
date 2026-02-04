// the url the frontend talks to 
// /api/patient/create-req

import express from 'express'; 
import {createAppointment, getPatientAppointment} from '..controllers/patientController.js';


// need a middleware to check if user is logged in or no 
import {verifyToken} from '../middleware/authMiddleware.js';

const router = express.Router();

//submit symptoms 
//url : /api/patient/ create-req 
router.post('/create-req', verifyToken, createAppointment);

//get history 
// user can see their past reqq
// url: /api/patient/history 
router.get('/history', verifyToken, getPatientAppointment);

export default router; 