import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// --- REGISTER ---
export const register = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create the new user
       const newUser = await User.create({
            name: username, // 👈 CHANGE THIS LINE (Map 'username' to 'name')
            email,
            password: hashedPassword,
            role
        });

        res.status(201).json({ result: newUser, token: "Login to get token" });

    } catch (error) {
        // 👇 THIS WAS THE TYPO (You had 'erorr')
        res.status(500).json({ message: "Something went wrong", error });
    }
};

// --- LOGIN ---
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { email: existingUser.email, id: existingUser._id, role: existingUser.role },
            process.env.JWT_SECRET, // Make sure .env has this!
            { expiresIn: "1h" }
        );

        res.status(200).json({ result: existingUser, token, role: existingUser.role });

    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error });
    }
};