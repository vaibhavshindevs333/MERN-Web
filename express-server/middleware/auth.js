import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const jwtSecret = process.env.JWT_SECRET;
const tokenBlacklist = [];

export const auth = async (req, res, next) => {
  try {
    let token = req.header("Authorization"); 
    if (!token) {
      return res.status(401).send("Access Denied");
    }
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trim();
    }
    if (tokenBlacklist.includes(token)) {
     return res.status(403).json({ error: "Token is invalid or expired" });
    }
    const user = jwt.verify(token, jwtSecret);
    console.log(user);
    req.user = {
      _id: user.id,
      email: user.email,
      role: user.role,
    };
    if (req.user._id === req.params.id || req.user.role === 'admin' || req.user.role === 'manager') {
      next();
    } else {
      res.status(403).send("Access denied. Not authorized...");
    }
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(500).json({ error: error });
  }
};
