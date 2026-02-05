// File: server/routes/authRoutes.js
import express from 'express';
import { register, login } from '../controllers/authController.js';

const router = express.Router();

// 👇 NOTICE: These are just '/' and nothing else.
// The '/api/auth' part comes from server.js automatically!
router.post('/register', register);
router.post('/login', login);

export default router;