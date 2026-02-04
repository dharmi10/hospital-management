// brain of backend (function that work)
//logic for submitting symptoms and fething live status

import Appointment from "../models/Appointment";
import { prioritizeTasks } from "../utils/priorityAlgo";

// the queue doc sees on their dashbaord. 
export const getQueue = async (req,res) => {
    try {
        // fetch only active appointments 
        // take only pending and inprogress patients 
        const rawAppointments = await Appointment.find({
            status : { $in : ['pending', 'in-progress']}
        });

        //prepare data for the algo 
        const formattedTasks = rawAppointments.map( app => ({
            ...app.toObject(), 
            deadLine : app.appointmentDate, 
            content : app.symptoms, 
            priority : app.priorityLabel 
        }));

        //run the algo 
        //list gets reordered based on urgency 
        const sortedQueue = prioritizeTasks(formattedTasks);

        //send list to frontend 
        res.status(200).json(sortedQueue);

    }
    catch(error) { 
        res.status(500).json({message : 'Failed to fetch queue '});
    }
};