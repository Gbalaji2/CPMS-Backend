import User from "../../models/user.model.js";
import JobSchema from "../../models/job.model.js";

export const UploadOfferLetter = async (req, res) => {
  try {
    if (!req.file) return res.status(400).send("No offer letter uploaded");

    const job = await JobSchema.findById(req.body.jobId);
    if (!job) return res.status(400).send("Job not found!");

    const offerLetterPath = `/${req.file.fieldname}/${req.file.filename}`;

    // Find the applicant to upload offer letter
    const applicant = job?.applicants?.find(app => app.studentId == req.body.studentId);
    if (!applicant) return res.status(400).send("Error: student not applied to this job!");

    // Update offer letter path
    applicant.offerLetter = offerLetterPath;

    await job.save();

    return res.json({ msg: "Offer Letter Uploaded Successfully!" });
  } catch (error) {
    console.error("offerLetter.controller.js => UploadOfferLetter", error);
    return res.status(500).json({ msg: "Server error", error });
  }
};

export const DeleteOfferLetter = async (req, res) => {
  try {
    const { jobId, studentId } = req.params;
    if (!jobId || !studentId) return res.status(400).send("Error while receiving data!");

    const job = await JobSchema.findById(jobId);
    if (!job) return res.status(400).send("Job not found!");

    job.applicants = job.applicants.map(app => {
      if (app.studentId == studentId) {
        const { offerLetter, ...rest } = app.toObject();
        return rest;
      }
      return app;
    });

    await job.save();

    return res.json({ msg: "Offer Letter Deleted Successfully!" });
  } catch (error) {
    console.error("offerLetter.controller.js => DeleteOfferLetter", error);
    return res.status(500).json({ msg: "Server error", error });
  }
};
