import User from "../../models/user.model.js";

// Update any user data by admin
export const UpdateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.body._id || req.body.id);

    if (!user) return res.status(400).json({ msg: "User Doesn't Exist!" });

    // Check if email is being updated
    if (req.body.email && req.body.email !== user.email) {
      if (await User.findOne({ email: req.body.email }))
        return res.status(400).json({ msg: "Email Already Exists!" });
      user.email = req.body.email;
    }

    // Check if UIN is being updated
    if (req.body.studentProfile?.UIN) {
      const existingUIN = await User.findOne({ 'studentProfile.UIN': req.body.studentProfile.UIN });
      if (existingUIN) return res.status(400).json({ msg: "UIN Already Exists!" });
      user.studentProfile.UIN = req.body.studentProfile.UIN;
    }

    // Update common fields
    const fields = ['first_name', 'middle_name', 'last_name', 'number', 'gender', 'dateOfBirth', 'profile'];
    fields.forEach(f => { if (req.body[f]) user[f] = req.body[f]; });

    if (req.body.fullAddress) {
      if (req.body.fullAddress.address) user.fullAddress.address = req.body.fullAddress.address;
      if (req.body.fullAddress.pincode) user.fullAddress.pincode = req.body.fullAddress.pincode;
    }

    // Update student-specific fields
    if (user.role === "student" && req.body.studentProfile) {
      const sFields = ['rollNumber', 'department', 'year', 'addmissionYear', 'gap', 'liveKT'];
      sFields.forEach(f => {
        if (req.body.studentProfile[f] !== undefined) user.studentProfile[f] = req.body.studentProfile[f];
      });

      // Update SGPA
      if (req.body.studentProfile.SGPA) {
        Object.keys(req.body.studentProfile.SGPA).forEach(sem => {
          if (req.body.studentProfile.SGPA[sem] && req.body.studentProfile.SGPA[sem] !== "undefined")
            user.studentProfile.SGPA[sem] = req.body.studentProfile.SGPA[sem];
        });
      }

      // Update past qualifications
      if (req.body.studentProfile.pastQualification) {
        const pq = ['ssc', 'hsc', 'diploma'];
        pq.forEach(q => {
          if (req.body.studentProfile.pastQualification[q]) {
            Object.keys(req.body.studentProfile.pastQualification[q]).forEach(field => {
              if (req.body.studentProfile.pastQualification[q][field] !== undefined)
                user.studentProfile.pastQualification[q][field] = req.body.studentProfile.pastQualification[q][field];
            });
          }
        });
      }
    }

    if (req.body.role !== 'superuser') user.isProfileCompleted = true;

    await user.save();

    return res.json({ msg: "Data Updated Successfully!" });
  } catch (error) {
    console.error("user.update-profile.controller ==> ", error);
    return res.status(500).json({ msg: "Internal Server Error!" });
  }
};