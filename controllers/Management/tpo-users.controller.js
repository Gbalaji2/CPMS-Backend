import Users from "../../models/user.model.js";

export const UsersTPO = async (req, res) => {
  try {
    const tpoUsers = await Users.find({ role: "tpo_admin" });
    return res.json({ tpoUsers });
  } catch (error) {
    console.error("user.tpo.controller.js => UsersTPO", error);
    return res.status(500).json({ msg: "Internal Server Error!" });
  }
};