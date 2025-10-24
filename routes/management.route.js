import express from "express";
import authenticateToken from "../middleware/auth.middleware.js";

import { Login } from "../controllers/Management/login.controller.js";
import { UsersTPO } from "../controllers/Management/tpo-users.controller.js";
import { DeleteTPO } from "../controllers/Management/delete-tpo.controller.js";
import { AddTPO, AddManagement, AddStudent } from "../controllers/Management/add-user.controller.js";
import { SendNotice, GetAllNotice, DeleteNotice, GetNotice } from "../controllers/Management/notice.controller.js";

const router = express.Router();

// login
router.post("/login", Login);

// TPO management
router.get("/tpo-users", authenticateToken, UsersTPO);
router.post("/deletetpo", authenticateToken, DeleteTPO);

// Add users
router.post("/addtpo", authenticateToken, AddTPO);
router.post("/add-management", authenticateToken, AddManagement);
router.post("/add-student", authenticateToken, AddStudent);

// notices
router.post("/send-notice", authenticateToken, SendNotice);
router.get("/get-all-notices", authenticateToken, GetAllNotice);
router.get("/get-notice", GetNotice);
router.post("/delete-notice", DeleteNotice);

export default router;