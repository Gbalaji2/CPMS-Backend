import multer from "multer";
import path from "path";
import fs from "fs";

// Define upload directory
const uploadDir = "public/profileImgs/";

// Ensure folder exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const uploadUserProfile = multer({ storage });

export default uploadUserProfile;