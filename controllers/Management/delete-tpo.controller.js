import Users from '../../models/user.model.js';

export const DeleteTPO = async (req, res) => {
  try {
    const result = await Users.deleteOne({ email: req.body.email });

    if (result.acknowledged && result.deletedCount > 0) {
      return res.json({ msg: "User Deleted Successfully!" });
    } else {
      return res.status(404).json({ msg: "User Not Found or Already Deleted!" });
    }
  } catch (error) {
    console.error("management-user-delete-tpo =>", error);
    return res.status(500).json({ msg: "Internal Server Error!" });
  }
};