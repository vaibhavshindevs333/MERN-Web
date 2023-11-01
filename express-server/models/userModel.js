import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    contact: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    location: {
      type: String,
    },
    occupation: {
      type: String,
    },
    picture: {
      type: Buffer,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 8,
      max: 1024,
    },
    role: {
      type: String,
    },  
  },
  { timestamps: true }
);

const User = new mongoose.model('User', userSchema);
export default User;
