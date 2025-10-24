import express from "express";
import authenticateToken from "../middleware/auth.middleware.js";

import { Login } from "../controllers/SuperUser/login.controller.js";
import { managementUsers, managementAddUsers, managementDeleteUsers } from "../controllers/SuperUser/user-management.controller.js";
import { tpoUsers, tpoAddUsers, tpoDeleteUsers } from "../controllers/SuperUser/user-tpo.controller.js";
import { studentUsers, studentAddUsers, studentDeleteUsers, studentApprove } from "../controllers/SuperUser/user-student.controller.js";

const router = express.Router();

// login
router.post("/login", Login);

// management
router.get("/management-users", authenticateToken, managementUsers);
router.post("/management-add-user", authenticateToken, managementAddUsers);
router.post("/management-delete-user", authenticateToken, managementDeleteUsers);

// TPO
router.get("/tpo-users", authenticateToken, tpoUsers);
router.post("/tpo-add-user", authenticateToken, tpoAddUsers);
router.post("/tpo-delete-user", authenticateToken, tpoDeleteUsers);

// student
router.get("/student-users", authenticateToken, studentUsers);
router.post("/student-add-user", authenticateToken, studentAddUsers);
router.post("/student-delete-user", authenticateToken, studentDeleteUsers);
router.post("/student-approve", authenticateToken, studentApprove);

export default router;