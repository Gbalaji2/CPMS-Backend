import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import mongodb from "./config/MongoDB.js";

dotenv.config();
const app = express();

// ES module doesn't have __dirname, so recreate it:
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://placementmgmnt.netlify.app/",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

// Static folders
app.use('/profileImgs', express.static(path.join(__dirname, 'public/profileImgs')));
app.use('/resume', express.static(path.join(__dirname, 'public/resumes')));
app.use('/offerLetter', express.static(path.join(__dirname, 'public/offerLetter')));

// Database
mongodb();

// Routes
import userRoutes from "./routes/user.route.js";
import studentRoutes from "./routes/student.route.js";
import tpoRoutes from "./routes/tpo.route.js";
import managementRoutes from "./routes/management.route.js";
import adminRoutes from "./routes/superuser.route.js";
import companyRoutes from "./routes/company.route.js";

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/student', studentRoutes);
app.use('/api/v1/tpo', tpoRoutes);
app.use('/api/v1/management', managementRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/company', companyRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));