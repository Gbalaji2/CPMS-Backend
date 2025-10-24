import express from "express";
import uploadUserProfile from "../config/MulterProfilePhoto.js";
import authenticateToken from "../middleware/auth.middleware.js";

import { UserDetail } from "../controllers/user/user.detail.controller.js";
import { AllUsersLen } from "../controllers/user/user.all-users.controller.js";
import { UpdatePhoto } from "../controllers/user/user.update-photo.controller.js";
import { UpdateProfile } from "../controllers/user/user.update-profile.controller.js";
import { UpdatePassword } from "../controllers/user/user.update-password.js";
import { UserData } from "../controllers/user/user.show-data.js";

const router = express.Router();

// user details
router.get("/detail", authenticateToken, UserDetail);

// all users count
router.get("/all-users", AllUsersLen);

// get single user by id
router.get("/:userId", authenticateToken, UserData);

// upload user profile photo
router.post("/upload-photo", uploadUserProfile.single("profileImgs"), UpdatePhoto);

// update profile
router.post("/update-profile", authenticateToken, UpdateProfile);

// change password
router.post("/change-password", authenticateToken, UpdatePassword);

export default router;