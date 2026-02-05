import Appointment from '../models/Appointment.js'; 
import Patient from '../models/Patient.js';
// --- 1. GET THE QUEUE (For Doctor) ---
export const getQueue = async (req, res) => {
  console.log("⚡ CONTROLLER IS RUNNING: Sending Fake Data");

  // 👇 FORCE HARDCODED DATA (Ignore Database for 1 minute)
  const fakeQueue = [
    {
      _id: "test-123",
      user: { name: "TEST PATIENT WORKS" }, // <--- Look for this name!
      symptoms: "Testing Connection",
      priority: "Critical",
      priorityScore: 99,
      status: "waiting",
      createdAt: new Date()
    }
  ];

  return res.status(200).json(fakeQueue);
};

// ... keep updateStatus as is ...

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