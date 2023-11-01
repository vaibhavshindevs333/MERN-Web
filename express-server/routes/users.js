import express from "express";
import multer from "multer";
import {getUser, updateUser, forgotPassword, getResetPassword, postResetPassword, deleteUser, getAllUser, logout} from "../controllers/users.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.get("/", function(req, res){
    res.send('User Profile');
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

  const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  
  const upload = multer({  
    storage: storage,
    fileFilter
  });

/* For User */
router.get("/:id", auth, getUser);
router.post("/logout", logout);
router.put("/updateUser/:id", upload.single('picture'), updateUser);
router.post("/forgotPassword", forgotPassword);
router.get("/resetPassword/:id/:token", getResetPassword);
router.post("/resetPassword/:id/:token", postResetPassword);

/* For Admin */
router.get("/getAllUser/:id", getAllUser);
router.post("/deleteUser", deleteUser);

export default router;
