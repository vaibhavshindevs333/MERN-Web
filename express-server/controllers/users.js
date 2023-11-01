import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import User from "../models/userModel.js";

const jwtSecret = process.env.JWT_SECRET;

/* READ */
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById({ _id : id });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const imageBase64 = user.picture ? user.picture.toString('base64') : null;
    res.set('Content-Type', 'application/json');
    return res.status(200).json({ status: "ok", picture: imageBase64, firstName: user.firstName, lastName: user.lastName, contact: user.contact, location: user.location, occupation: user.occupation, role: user.role });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  try{
    const { firstName, lastName, contact, location, occupation, password } = req.body;
    const user = await User.findById({ _id : id });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (!password || (!firstName && !lastName && !contact && !location && !occupation)) {
      return res.status(400).json({ message: 'You must provide a password and at least one other field to update.' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Password does not match. Re-enter the correct password / Go to Login and Change Password." });
    }
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (contact) user.contact = contact;
    if (location) user.location = location;
    if (occupation) user.occupation = occupation;
    if (req.file) {
      user.picture = req.file.buffer;
    }
    await user.save();
    return res.status(200).json({ message: 'profile updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while updating the user profile' });
  }
};

export const logout = async (req, res) => {
    try{
      const token = req.header("Authorization");
        console.log(token); 
      const tokenBlacklist = [];
        tokenBlacklist.push(token);
      res.set('Content-Type', 'application/json');
      return res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
      res.status(500).json({ error: error });
    }
};

//for admin
export const getAllUser = async (req, res) => {
  try {
    const allUser = await User.find({});
    if (!allUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    console.log('success to getting all users data from database');
    res.set('Content-Type', 'application/json');
    return res.status(200).json({ status: "ok", allUser: allUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" }); 
  }
};

//for admin
export const deleteUser = async (req, res) => {
  const { id } = req.body;
  try {
    const _id = await User.deleteOne({ _id: id });
    console.log("Success to delete user from database: ", _id);
    return res.status(200).json({ status: "Ok", data: "Deleted" });
  } catch (error) {
    console.log(error);
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const oldUser = await User.findOne({ email });
    if (!oldUser) {
      return res.json({ status: "User Not Exists!!" });
    }
    const secret = jwtSecret + oldUser.password;
    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "5m",
    });
    const link = `http://localhost:3000/reset-password/${oldUser._id}/${token}`;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "vaibhavshinde.vs333@gmail.com",
        pass: "rmdklolcsmswvyfw",
      },
    });

    const mailOptions = {
      from: "youremail@gmail.com",
      to: "vaibhavshinde.vs333@gmail.com",
      subject: "Password Reset",
      text: link,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    console.log(link);
  } catch (error) { 
    console.log(error);
  }
};

export const getResetPassword = async (req, res) => {
  const { id, token } = req.params;
  console.log(req.params);
  const oldUser = await User.findOne({ _id: id });
  if (!oldUser) {
    return res.json({ status: "User Not Exists!!" });
  }
  const secret = jwtSecret + oldUser.password;
  try {
    const verify = jwt.verify(token, secret);
    return res.json({ status: "Not Verified", email: verify.email });
  } catch (error) {
    console.log(error);
    res.send("Not Verified");
  }
};

export const postResetPassword = async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  const oldUser = await User.findOne({ _id: id });
  if (!oldUser) {
    return res.json({ status: "User Not Exists!!" });
  }
  const secret = jwtSecret + oldUser.password;
  try {
    const verify = jwt.verify(token, secret);
    const encryptedPassword = await bcrypt.hash(password, 10);
    await User.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          password: encryptedPassword,
        },
      }
    );
    return res.json({ status: "verified", email: verify.email });
  } catch (error) {
    console.log(error);
    res.json({ status: "Something Went Wrong" });
  }
};
