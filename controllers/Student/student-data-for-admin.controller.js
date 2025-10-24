import User from "../../models/user.model.js";
import Job from "../../models/job.model.js";

export const StudentDataYearBranchWise = async (req, res) => {
  try {
    const departments = ["Computer", "Civil", "ECS", "AIDS", "Mechanical"];
    const years = [1, 2, 3, 4];

    const result = {};

    for (const year of years) {
      for (const dept of departments) {
        const key = `${year}Year${dept}`;
        result[key] = await User.find({
          role: "student",
          "studentProfile.department": dept,
          "studentProfile.year": year
        });
      }
    }

    return res.json(result);
  } catch (error) {
    console.error("student-data-for-admin.controller.js => StudentDataYearBranchWise", error);
    return res.status(500).json({ msg: "Internal Server Error!" });
  }
};

export const NotifyStudentStatus = async (req, res) => {
  try {
    const filteredStudents = await User.find({
      role: "student",
      "studentProfile.appliedJobs.status": { $in: ["interview", "hired"] }
    })
      .select("_id first_name last_name studentProfile.year studentProfile.department studentProfile.appliedJobs")
      .lean();

    const studentsWithJobDetails = [];

    for (const student of filteredStudents) {
      const appliedJobs = student.studentProfile.appliedJobs.filter(job =>
        ["interview", "hired"].includes(job.status)
      );

      const jobDetails = await Job.find({
        _id: { $in: appliedJobs.map(job => job.jobId) }
      })
        .populate("company", "companyName")
        .select("company jobTitle _id")
        .lean();

      const jobsWithDetails = appliedJobs.map(job => {
        const jobDetail = jobDetails.find(jd => String(jd._id) === String(job.jobId));
        return {
          status: job.status,
          companyName: jobDetail?.company?.companyName || "Unknown Company",
          jobId: jobDetail?._id || "Unknown JobId",
          jobTitle: jobDetail?.jobTitle || "Unknown Job Title"
        };
      });

      studentsWithJobDetails.push({
        _id: student._id,
        name: `${student.first_name} ${student.last_name}`,
        year: student.studentProfile.year,
        department: student.studentProfile.department,
        jobs: jobsWithDetails
      });
    }

    return res.status(200).json({ studentsWithJobDetails });
  } catch (error) {
    console.error("student-data-for-admin.controller.js => NotifyStudentStatus", error);
    return res.status(500).json({ msg: "Internal Server Error!" });
  }
};