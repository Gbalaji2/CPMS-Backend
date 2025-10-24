import User from "../../models/user.model.js";

export const UpdatePhoto = async (req, res) => {
  const file = req.file;

  if (!file) return res.status(400).json({ msg: 'No file uploaded.' });

  try {
    const userId = req.body.userId;

    // Retrieve user and update profile photo
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: 'User not found.' });

    user.profile = "/" + file.fieldname + "/" + file.filename;
    await user.save();

    return res.status(201).json({ msg: "Profile Picture Updated Successfully!", file: user.profile });
  } catch (error) {
    console.error('Error saving to database:', error);
    return res.status(500).send('Server error');
  }
};