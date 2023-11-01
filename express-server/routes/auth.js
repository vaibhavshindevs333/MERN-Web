import express from "express";
import multer from "multer";
import { register } from "../controllers/auth.js";
import { login } from "../controllers/auth.js";

const router = express.Router();

router.get("/", function(req, res){
    res.send('User Authentication');
});

/* FILE STORAGE */
const storage = multer.memoryStorage({
    destination: function (req, file, cb) {
      cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
      cb(null, new Date().toISOString() + file.originalname);
    },
  });
  const upload = multer({  
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 1, // 5 MB (adjust the size limit as needed)
    }, 
  });

/* ROUTES WITH FILES */
router.post("/register", upload.single("picture"), register);

router.post("/login", login);

export default router;
