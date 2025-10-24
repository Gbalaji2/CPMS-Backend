import User from "../../models/user.model.js";
import bcrypt from "bcrypt";

// Get management users
export const managementUsers = async (req, res) => {
  try {
    const managementUsers = await User.find({ role: "management_admin" });
    res.json({ managementUsers });
  } catch (error) {
    console.error("management.user.controller =>", error);
    res.status(500).json({ msg: "Internal Server Error!" });
  }
};

// Add management user
export const managementAddUsers = async (req, res) => {
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
      role: "management_admin"
    });
    await newUser.save();
    return res.json({ msg: "User Created!" });
  } catch (error) {
    console.error("management.user.controller =>", error);
    return res.json({ msg: "Internal Server Error!" });
  }
};

// Delete management user
export const managementDeleteUsers = async (req, res) => {
  try {
    const ress = await User.deleteOne({ email: req.body.email });
    if (ress.acknowledged) {
      return res.json({ msg: "User Deleted Successfully!" });
    } else {
      return res.json({ msg: "Error While Deleting User!" });
    }
  } catch (error) {
    console.error("management.user.controller =>", error);
    return res.json({ msg: "Internal Server Error!" });
  }
};