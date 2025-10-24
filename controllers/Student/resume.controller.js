import User from "../../models/user.model.js";

export const UploadResume = async (req, res) => {
  try {
    if (!req.file) return res.status(400).send("No resume uploaded");

    const user = await User.findById(req.body.userId);
    if (!user) return res.status(404).send("Student not found!");

    const resumePath = `/${req.file.fieldname}/${req.file.filename}`;

    user.studentProfile.resume = {
      filename: req.file.filename,
      filepath: resumePath,
      contentType: req.file.mimetype,
    };

    await user.save();

    return res.status(200).json({ msg: "Resume uploaded successfully!" });
  } catch (error) {
    console.error("resume.controller.js => UploadResume", error);
    return res.status(500).json({ msg: "Server error", error });
  }
};