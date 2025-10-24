import User from "../../models/user.model.js";
import JobSchema from "../../models/job.model.js";

export const UpdateJobStatus = async (req, res) => {
  try {
    const job = await JobSchema.findById(req.params.jobId);
    const student = await User.findById(req.params.studentId);

    if (!job || !student) return res.status(404).json({ msg: "Student or Job Not Found!" });

    // Update job applicant info
    job.applicants.find(app => {
      if (String(app.studentId) === String(req.params.studentId)) {
        if (req.body.applicant.currentRound) app.currentRound = req.body.applicant.currentRound;
        if (req.body.applicant.roundStatus) app.roundStatus = req.body.applicant.roundStatus;
        if (req.body.applicant.selectionDate) app.selectionDate = req.body.applicant.selectionDate;
        if (req.body.applicant.joiningDate) app.joiningDate = req.body.applicant.joiningDate;
        if (req.body.applicant.offerLetter) app.offerLetter = req.body.applicant.offerLetter;
        if (req.body.applicant.status) app.status = req.body.applicant.status;
      }
    });

    // Update student applied job info
    student?.studentProfile?.appliedJobs?.find(app => {
      if (String(app.jobId) === String(req.params.jobId)) {
        if (req.body.applicant.status) app.status = req.body.applicant.status;
        if (req.body.applicant.package) app.package = req.body.applicant.package;
      }
    });

    await student.save();
    await job.save();

    return res.json({ msg: "Job Status Updated Successfully!" });
  } catch (error) {
    console.error("update-job-status.controller.js =>", error);
    return res.status(500).json({ msg: "Internal Server Error!" });
  }
};