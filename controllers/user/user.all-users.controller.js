import User from "../../models/user.model.js";

export const AllUsersLen = async (req, res) => {
  try {
    const studentUsers = (await User.find({ role: "student" })).length;
    const studentApprovalPendingUsers = (await User.find({ role: "student" }))
      .filter(ele => !ele.studentProfile.isApproved).length;
    const tpoUsers = (await User.find({ role: "tpo_admin" })).length;
    const managementUsers = (await User.find({ role: "management_admin" })).length;
    const superUsers = (await User.find({ role: "superuser" })).length;

    return res.json({ studentUsers, studentApprovalPendingUsers, tpoUsers, managementUsers, superUsers });
  } catch (error) {
    console.error("user.route.js =>", error);
    return res.status(500).json({ msg: "Internal Server Error!" });
  }
};