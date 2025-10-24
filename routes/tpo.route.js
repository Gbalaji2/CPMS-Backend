import express from "express";
import authenticateToken from "../middleware/auth.middleware.js";

import { Login } from "../controllers/TPO/tpo.login.controller.js";
import { PostJob } from "../controllers/TPO/tpo.post-job.controller.js";
import { AllJobs, DeleteJob, JobData, JobWithApplicants, StudentJobsApplied } from "../controllers/user/user.all-jobs.controller.js";

const router = express.Router();

// login
router.post("/login", Login);

// jobs
router.post("/post-job", authenticateToken, PostJob);
router.get("/jobs", AllJobs);
router.post("/delete-job", DeleteJob);
router.get("/job/:jobId", authenticateToken, JobData);
router.get("/job/applicants/:jobId", authenticateToken, JobWithApplicants);
router.get("/myjob/:studentId", authenticateToken, StudentJobsApplied);

export default router;