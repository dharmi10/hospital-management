import express from 'express';
import { createPatientEntry, getPatientHistory } from '../controllers/patientController.js';

const router = express.Router();

// The frontend sends POST request to /api/patient/add
router.post('/add', createPatientEntry);

// The frontend gets history from /api/patient/history/:userId
router.get('/history/:userId', getPatientHistory);

export default router;