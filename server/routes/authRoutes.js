// the url that frontend talks to
// /api/auth/login

import express from 'express'; 
import {register , login } from '../controllers/authController.js';

const router = express.Router(); 

// regi door 
// url : api/auth/register 
// POST method because we are sending thr data to create something new 

router.post('/register' , register); 

//login door
// url : /api/auth/login 
// post method, as sending sensitive password data 
router.post('/logim' , login); 

export default router; 