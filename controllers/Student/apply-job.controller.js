import User from "../../models/user.model.js";
import jobSchema from "../../models/job.model.js";

export const AppliedToJob = async (req, res) => {
  try {
    const { studentId, jobId } = req.params;

    if (!studentId || studentId === "undefined") return res.status(400).json({ msg: "Invalid studentId" });
    if (!jobId || jobId === "undefined") return res.status(400).json({ msg: "Invalid jobId" });

    const user = await User.findById(studentId);
    const job = await jobSchema.findById(jobId);

    if (!user) return res.status(404).json({ msg: "Student not found" });
    if (!job) return res.status(404).json({ msg: "Job not found" });

    // Return if already applied
    if (user?.studentProfile?.appliedJobs?.some(job => job.jobId == jobId)) {
      return res.json({ msg: "Already Applied!" });
    }

    if (!user?.studentProfile?.resume?.filename) {
      return res.json({ msg: 'Please Upload Resume First, Under "Placements" > "Placement Profile"' });
    }

    user.studentProfile.appliedJobs.push({ jobId, status: "applied" });
    job.applicants.push({ studentId: user._id });

    await user.save();
    await job.save();

    return res.status(201).json({ msg: "Applied Successfully!" });
  } catch (error) {
    console.error("apply-job.controller.js =>", error);
    return res.status(500).json({ msg: "Internal Server Error!" });
  }
};

export const CheckAlreadyApplied = async (req, res) => {
  try {
    const { studentId, jobId } = req.params;

    if (!studentId || studentId === "undefined") return res.status(400).json({ msg: "Invalid studentId" });
    if (!jobId || jobId === "undefined") return res.status(400).json({ msg: "Invalid jobId" });

    const user = await User.findById(studentId);

    if (!user) return res.status(404).json({ msg: "Student not found" });

    const alreadyApplied = user?.studentProfile?.appliedJobs?.some(job => job.jobId == jobId) || false;

    return res.json({ applied: alreadyApplied });
  } catch (error) {
    console.error("apply-job.controller.js =>", error);
    return res.status(500).json({ msg: "Internal Server Error!" });
  }
};