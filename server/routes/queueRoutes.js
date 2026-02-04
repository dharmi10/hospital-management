// url the frontend talks to
// /api/queue/status, /complete

import express from 'express';
import {getQueue, updateStatus } from '../comntrollers/queueController.js';

//import the middleware 

import {verifyToken} from '../middleware/authMiddleware.js';

const router = express.Router();
// dashboard 
//url : /api/queue
router.get('/', verifyToken, getQueue);

//update patient  
//url /api/queue/:id 
router.put('/:id', verifyToken, updateStatus);

export default router; 
