// brain of backend (function that work)
//logic for submitting symptoms and fething live status 

import Appointment from "../models/Appointment.js";
import { getPriorityScore } from "../utils/priorityAlgo.js";

// create appointment 
 export const createAppointment = async (req,res) => {
    try {
        const {symptoms, appointmentDate } = req.body;

        // security check 
        // assume the user is logged in 
         if(!req.userId) { 
            return res.status(401).json({message : 'Unauthenticates'});
         }

         //connecting to the algo 
         // send symptoms to utility func to get a number 
         const score = getPriorityScore(symptoms);

         //determine label based on score 
         let label = 'Low' //default 
         if(score >=100) label = 'Critical';
         else if(score >= 60 ) label = 'High';
         else if(score >=30 )label = 'Medium '; 

         //create new database entry 
         const newAppointment = new Appointment ({
            patientId : req.userId, 
            symptoms, 
            appoinementDate,
            priorityScore : score, 
            priorityLabel : label, 
            status : 'pending'
         });

         //save the users appointment 
         await newAppointment.save();

         res.status(201).json(newAppointment);
    }
    catch(error){
        res.status(500).json({message : 'Failed to Submit symptoms ',error});
    }

 };

 //get status (fetch history) 

 export const getPatientAppointments = async (req,res) => {
    try { 
        // find all appointments for this specific user 
        const myAppointments = await Appointment.find({patientId : req.userId}).sort({createdAt : -1});
        res.status(200).json(myAppointments);
    }
    catch(error){
        res.status(500).json({message : 'Failed to fetch history ',error });
    }
 };