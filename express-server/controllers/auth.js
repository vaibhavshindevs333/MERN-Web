import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from '../models/userModel.js';

const jwtSecret = process.env.JWT_SECRET;

/* REGISTER USER */
export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      contact,
      location,
      occupation,
      email,
      password,
    } = req.body;
    if (!firstName || !lastName || !contact || !email || !password) {
      return res.status(400).json({ message: 'First Name, Last Name, Contact, and Email are required' });
    }
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.status(409).json({ message: 'Email already exists' });
    }
    
    const imageBuffer = req.file ? req.file.buffer : null;

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName, 
      lastName,
      contact,
      location,
      occupation,
      picture: imageBuffer,
      email,
      password: passwordHash,
      role: 'user',
    });
    const user = await newUser.save();
    console.log(user._id, user.email, user.contact);
    res.set('Content-Type', 'application/json');
    return res.status(200).json({ message: "Registration successful"});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error });
  }
};

/* LOGGING IN */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User does not exist." });
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials." });
    
    if (user.role === 'admin' || user.role === 'manager' || user.role === 'user') console.log(user.role);

    const token = jwt.sign({ 
      id: user._id,  
      email: user.email,
      role: user.role,
    }, 
      jwtSecret, {
      expiresIn: "24h",
    });
    delete user.password;
    console.log(user._id);
    console.log(user.email);
    console.log(token);
    const imageBase64 = user.picture ? user.picture.toString('base64') : null;
    res.set('Content-Type', 'application/json');
    return res.status(200).json({ status: "ok", token: token, user: user, id: user._id, picture: imageBase64, firstName: user.firstName, lastName: user.lastName, contact: user.contact, location: user.location, occupation: user.occupation, role: user.role });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};
