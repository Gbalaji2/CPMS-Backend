import User from '../../models/user.model.js';

export const UserData = async (req, res) => {
  const { userId } = req.params;

  try {
    // Fetch user details from the database and populate job/company info
    const user = await User.findById(userId)
      .populate({
        path: 'studentProfile.appliedJobs.jobId',
        populate: { path: 'company', select: 'companyName' } // Populate companyName from Company model
      });

    if (!user) {
      return res.status(404).json({ msg: 'Student not found' });
    }

    return res.json(user);
  } catch (error) {
    // Handle invalid ObjectId
    if (error.name === 'CastError' && error.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'User not found' });
    }
    console.error('Error fetching user details:', error);
    return res.status(500).json({ msg: 'Server error' });
  }
};
