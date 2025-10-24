import express from "express";
import uploadResume from "../config/MulterResume.js";
import uploadOfferLetter from "../config/MulterOfferLetter.js";
import authenticateToken from "../middleware/auth.middleware.js";

import { Signup } from "../controllers/Student/signup.controller.js";
import { Login } from "../controllers/Student/login.controller.js";
import { UploadResume } from "../controllers/Student/resume.controller.js";
import { UploadOfferLetter, DeleteOfferLetter } from "../controllers/Student/offer-letter.controller.js";
import { AppliedToJob, CheckAlreadyApplied } from "../controllers/Student/apply-job.controller.js";
import { UpdateJobStatus } from "../controllers/Student/update-job-status.controller.js";
import { GetInternships, UpdateInternship, DeleteInternship } from "../controllers/Student/internship.controller.js";
import { StudentDataYearBranchWise, NotifyStudentStatus } from "../controllers/Student/student-data-for-admin.controller.js";

const router = express.Router();

// signup & login
router.post("/signup", Signup);
router.post("/login", Login);

// resume
router.post("/upload-resume", uploadResume.single("resume"), UploadResume);

// offer letter
router.post("/upload-offer-letter", uploadOfferLetter.single("offerLetter"), UploadOfferLetter);
router.post("/delete-offer-letter/:jobId/:studentId", DeleteOfferLetter);

// jobs
router.put("/job/:jobId/:studentId", AppliedToJob);
router.get("/check-applied/:jobId/:studentId", CheckAlreadyApplied);
router.post("/update-status/:jobId/:studentId", UpdateJobStatus);

// internships
router.get("/internship", GetInternships);
router.post("/update-internship", UpdateInternship);
router.post("/delete-internship", DeleteInternship);

// admin only routes
router.get("/all-students-data-year-and-branch", authenticateToken, StudentDataYearBranchWise);
router.get("/notify-interview-hired", authenticateToken, NotifyStudentStatus);

export default router;