// brain of backend (functions that work)
// logic for login/register 

import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// REGISTER LOGIC 

export const register = async (req,res) => {
    try {
        // take data from the req body, what the user has typed 
        const {name, email ,password, role } = req.body; 

        //check if the user alr exists
        // asks the database if we have any user with this email 
        const existingUser = await User.findOne({email});
        if(existingUser) {
            return res.staus(400).json({message : 'User already exists'});
        }

        //security , hash the pass 
        const hashedPass = await bcrypt.hash(password,10);

        //create new user 
        const newUser = new User ({
            name,
            email, 
            password : hashedPass, 
            role : role || 'patient ' // default to patient
        });

        //save to database 
        await newUser.save();

        //send success message 
        res.status(201).json({message : "User registered Successfully!"});
    }
    catch (error) {
        res.status(500).json({message : "Something went wrong" , erorr}
        );
    }
};

//LOGIN LOGIC 

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if the user alr exists. 
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // verify password 
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // generate token 
    const token = jwt.sign(
      { id: user._id, role: user.role }, 
      'secret_key_123',
      { expiresIn: '1h' } // token expires in 1 hr 
    );

    // send back the token and user info
    res.status(200).json({ result: user, token });

  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
}