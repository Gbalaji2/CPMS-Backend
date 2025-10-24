import User from "../../models/user.model.js";
import bcrypt from "bcrypt";

// Get all student users
export const studentUsers = async (req, res) => {
  try {
    const studentUsers = await User.find({ role: "student" });
    return res.json({ studentUsers });
  } catch (error) {
    console.error("student.user.controller =>", error);
    return res.status(500).json({ msg: "Server error" });
  }
};

// Add a new student user
export const studentAddUsers = async (req, res) => {
  const email = req.body.email;

  try {
    if (await User.findOne({ email }))
      return res.json({ msg: "User Already Exists!" });

    const hashPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = new User({
      first_name: req.body.first_name,
      email: req.body.email,
      number: req.body.number,
      password: hashPassword,
      role: "student",
      studentProfile: {
        isApproved: true
      }
    });

    await newUser.save();
    return res.json({ msg: "User Created!" });
  } catch (error) {
    console.error("student.user.controller =>", error);
    return res.status(500).json({ msg: "Server error" });
  }
};

// Delete a student user
export const studentDeleteUsers = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).json({ msg: "Student not found" });

    // Delete user and related data
    await user.deleteOne();
    return res.json({ msg: "User Deleted Successfully!" });
  } catch (error) {
    console.error("student.user-delete.controller =>", error);
    return res.status(500).json({ msg: "Server error" });
  }
};

// Approve a student
export const studentApprove = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).json({ msg: "Student not found" });

    user.studentProfile.isApproved = true;
    await user.save();
    return res.json({ msg: "Student Successfully Approved!" });
  } catch (error) {
    console.error("student.user-approve.controller =>", error);
    return res.status(500).json({ msg: "Server error" });
  }
};