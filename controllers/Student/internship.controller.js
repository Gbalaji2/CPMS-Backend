import User from "../../models/user.model.js";

export const GetInternships = async (req, res) => {
  try {
    const { studentId, internshipId } = req.query;
    const student = await User.findById(studentId);
    if (!student) return res.status(404).json({ msg: "Student Not Found!" });

    const internships = student?.studentProfile?.internships || [];
    if (internships.length === 0) return res.json({ msg: "No Internship Found!" });

    const internship = internships.find(intern => intern._id.toString() === internshipId);

    return res.json({ internships, internship });
  } catch (error) {
    console.error("internship.controller.js => GetInternships", error);
    return res.status(500).json({ msg: "Internal Server Error!" });
  }
};

export const UpdateInternship = async (req, res) => {
  try {
    const { studentId, internshipId } = req.query;
    const { internship } = req.body;

    if (!internship) return res.status(400).json({ msg: "No Data received to update!" });

    const student = await User.findById(studentId);
    if (!student) return res.status(404).json({ msg: "Student Not Found!" });

    const {
      companyName,
      companyAddress,
      companyWebsite,
      internshipDuration,
      startDate,
      endDate,
      monthlyStipend,
      description,
      type,
    } = internship;

    if (!companyName || !internshipDuration || !startDate || !type) {
      return res.status(400).json({ msg: "Star marked fields are mandatory!" });
    }

    const newInternship = { type, companyName, companyAddress, companyWebsite, internshipDuration, startDate, endDate, monthlyStipend, description };

    if (!internshipId || internshipId === "undefined") {
      // Add new internship
      student.studentProfile.internships.push(newInternship);
    } else {
      // Update existing internship
      const existingInternship = student.studentProfile.internships.find(intern => intern._id.toString() === internshipId);
      if (!existingInternship) return res.status(404).json({ msg: "Internship Not Found!" });

      Object.assign(existingInternship, newInternship);
    }

    await student.save();
    return res.json({ msg: "Internship Updated Successfully!" });
  } catch (error) {
    console.error("internship.controller.js => UpdateInternship", error);
    return res.status(500).json({ msg: "Internal Server Error!" });
  }
};

export const DeleteInternship = async (req, res) => {
  try {
    const { studentId, internshipId } = req.body;

    const student = await User.findById(studentId);
    if (!student) return res.status(404).json({ msg: "Student Not Found!" });

    const internshipIndex = student.studentProfile.internships.findIndex(intern => intern._id.toString() === internshipId);
    if (internshipIndex === -1) return res.status(404).json({ msg: "No Internship Found!" });

    student.studentProfile.internships.splice(internshipIndex, 1);
    await student.save();

    return res.json({ msg: "Internship Deleted Successfully!" });
  } catch (error) {
    console.error("internship.controller.js => DeleteInternship", error);
    return res.status(500).json({ msg: "Internal Server Error!" });
  }
};
