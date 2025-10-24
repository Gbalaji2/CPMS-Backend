import User from "../../models/user.model.js";
import bcrypt from "bcrypt";

export const Signup = async (req, res) => {
  const { first_name, email, number, password } = req.body;

  try {
    if (await User.findOne({ email })) {
      return res.status(400).json({ msg: "User Already Exists!" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      first_name,
      email,
      number,
      password: hashPassword,
      role: "student",
      studentProfile: {
        isApproved: false,
      },
    });

    await newUser.save();
    return res.json({ msg: "User Created!" });
  } catch (error) {
    console.error("student.signup.controller.js =>", error);
    return res.status(500).json({ msg: "Internal Server Error!" });
  }
};