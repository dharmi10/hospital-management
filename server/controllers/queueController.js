import Appointment from '../models/Appointment.js'; 

// --- 1. GET THE QUEUE (For Doctor) ---
export const getQueue = async (req, res) => {
    try {
        // Find all "pending" patients and sort them by Priority Score (Highest first)
        const queue = await Appointment.find({ status: 'pending' })
                                       .sort({ priorityScore: -1 }); 
        
        res.status(200).json(queue);

    } catch (error) {
        res.status(500).json({ message: "Error fetching queue", error });
    }
};

// --- 2. UPDATE STATUS (Mark as Completed) ---
export const updateStatus = async (req, res) => {
    try {
        const { id } = req.params;    // Grab the ID from the URL
        const { status } = req.body;  // Grab the new status (e.g. "completed")

        // Update the database
        const updatedAppointment = await Appointment.findByIdAndUpdate(
            id,
            { status: status },
            { new: true } // This tells Mongoose to return the *updated* version, not the old one
        );

        if (!updatedAppointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }

        res.status(200).json(updatedAppointment);

    } catch (error) {
        res.status(500).json({ message: "Error updating status", error });
    }
};