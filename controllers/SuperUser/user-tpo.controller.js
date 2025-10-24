import User from "../../models/user.model.js";
import bcrypt from "bcrypt";

// Get all TPO users
export const tpoUsers = async (req, res) => {
  try {
    const tpoUsers = await User.find({ role: "tpo_admin" });
    return res.json({ tpoUsers });
  } catch (error) {
    console.error("user-tpo.controller =>", error);
    return res.status(500).json({ msg: "Server error" });
  }
};

// Add a TPO user
export const tpoAddUsers = async (req, res) => {
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
      role: "tpo_admin"
    });

    await newUser.save();
    return res.json({ msg: "User Created!" });
  } catch (error) {
    console.error("user-tpo.controller =>", error);
    return res.status(500).json({ msg: "Internal Server Error!" });
  }
};

// Delete a TPO user
export const tpoDeleteUsers = async (req, res) => {
  try {
    const ress = await User.deleteOne({ email: req.body.email });
    if (ress.acknowledged) {
      return res.json({ msg: "User Deleted Successfully!" });
    } else {
      return res.json({ msg: "Error While Deleting User!" });
    }
  } catch (error) {
    console.error("user-tpo.controller =>", error);
    return res.status(500).json({ msg: "Internal Server Error!" });
  }
};