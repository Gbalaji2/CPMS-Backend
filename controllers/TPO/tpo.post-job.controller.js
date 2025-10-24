import JobSchema from "../../models/job.model.js";

export const PostJob = async (req, res) => {
  try {
    const company = req.body.company;
    const jobTitle = req.body.jobTitle;
    const jobDescription = req.body.jobDescription;
    const eligibility = req.body.eligibility;
    const salary = req.body.salary;
    const howToApply = req.body.howToApply;
    const applicationDeadline = req.body.applicationDeadline;

    if (!jobTitle || !jobDescription || !eligibility || !company) {
      return res.status(400).json({ msg: 'Job title, job description, eligibility and company name are required.' });
    }

    const job = await JobSchema.findById(req.body._id);

    if (job) {
      await job.updateOne({
        company,
        jobTitle,
        jobDescription,
        eligibility,
        salary,
        howToApply,
        applicationDeadline
      });
      return res.status(201).json({ msg: 'Job Updated successfully' });
    } else {
      const newJob = new JobSchema({
        jobTitle,
        jobDescription,
        eligibility,
        salary,
        howToApply,
        postedAt: new Date(),
        applicationDeadline,
        company
      });
      await newJob.save();
      return res.status(201).json({ msg: 'Job posted successfully' });
    }

  } catch (error) {
    console.error("tpo.post-job.controller.js =>", error);
    return res.status(500).json({ msg: 'Server error', error: error });
  }
};