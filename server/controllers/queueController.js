import Appointment from '../models/Appointment.js'; 
import Patient from '../models/Patient.js';
// --- 1. GET THE QUEUE (For Doctor) ---
export const getQueue = async (req, res) => {
  try {
    console.log("🔍 Doctor is asking for the Queue...");

    // 1. Fetch EVERYTHING (Temporary removal of filter to see if data exists)
    // We will put the filter back later if this works.
    const allPatients = await Patient.find().populate('user', 'name');
    
    console.log(`📊 Total Patients in DB: ${allPatients.length}`);
    
    // 2. Now filter manually to see if 'waiting' is the problem
    const waitingPatients = allPatients.filter(p => p.status === 'waiting');
    console.log(`✅ Patients with 'waiting' status: ${waitingPatients.length}`);

    // Return the waiting list sorted by priority
    const queue = waitingPatients.sort((a, b) => b.priorityScore - a.priorityScore);

    res.status(200).json(queue);

  } catch (error) {
    console.error("🔥 Error in getQueue:", error);
    res.status(500).json({ message: "Server Error", error });
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