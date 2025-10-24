import Users from '../../models/user.model.js';
import bcrypt from 'bcrypt';

export const AddTPO = async (req, res) => {
  const { email, password, first_name, number } = req.body;

  try {
    if (await Users.findOne({ email })) {
      return res.json({ msg: "User Already Exists!" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new Users({
      first_name,
      email,
      number,
      password: hashPassword,
      role: "tpo_admin"
    });

    await newUser.save();
    return res.json({ msg: "User Created!" });
  } catch (error) {
    console.error("management-user-add-tpo => ", error);
    return res.status(500).json({ msg: "Internal Server Error!" });
  }
};

export const AddManagement = async (req, res) => {
  const { email, password, first_name, number } = req.body;

  try {
    if (await Users.findOne({ email })) {
      return res.json({ msg: "User Already Exists!" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new Users({
      first_name,
      email,
      number,
      password: hashPassword,
      role: "management_admin"
    });

    await newUser.save();
    return res.json({ msg: "User Created!" });
  } catch (error) {
    console.error("management-user-add-management => ", error);
    return res.status(500).json({ msg: "Internal Server Error!" });
  }
};

export const AddStudent = async (req, res) => {
  const { email, password, first_name, number } = req.body;

  try {
    if (await Users.findOne({ email })) {
      return res.json({ msg: "User Already Exists!" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new Users({
      first_name,
      email,
      number,
      password: hashPassword,
      role: "student",
      studentProfile: { isApproved: true }
    });

    await newUser.save();
    return res.json({ msg: "User Created!" });
  } catch (error) {
    console.error("management-user-add-student => ", error);
    return res.status(500).json({ msg: "Internal Server Error!" });
  }
};