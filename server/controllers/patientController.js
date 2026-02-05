import Patient from '../models/Patient.js';
import { triageSymptoms } from '../services/aiService.js'; // 👈 Now this file exists!

export const createPatientEntry = async (req, res) => {
  try {
    console.log("📥 Received Symptoms:", req.body);

    const { userId, symptoms } = req.body;

    if (!userId || !symptoms) {
      return res.status(400).json({ message: "Missing data" });
    }

    // 1. Calculate Priority using our new AI Service
    const assessment = await triageSymptoms(symptoms);

    // 2. Create Database Entry
    const newEntry = await Patient.create({
      user: userId,
      symptoms,
      priority: assessment.priority,
      priorityScore: assessment.score,
      status: "waiting"
    });

    console.log("✅ Patient Saved:", newEntry);
    res.status(201).json({ message: "Success", savedEntry: newEntry });

  } catch (error) {
    console.error("🔥 Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const getPatientHistory = async (req, res) => {
  try {
    const history = await Patient.find({ user: req.params.userId }).sort({ createdAt: -1 });
    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ message: "Error fetching history" });
  }
};