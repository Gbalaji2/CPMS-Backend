import mongoose from 'mongoose';
const { Schema } = mongoose;

const jobSchema = new Schema({
  jobTitle: { type: String, required: true },
  jobDescription: { type: String, required: true },
  eligibility: { type: String },
  salary: { type: Number },
  howToApply: { type: String },
  postedAt: { type: Date, default: Date.now },
  applicationDeadline: { type: Date },
  // company details
  company: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
  // applicants details
  applicants: [
    {
      studentId: { type: Schema.Types.ObjectId, ref: 'Users' },
      currentRound: {
        type: String,
        enum: ['Aptitude Test', 'Technical Interview', 'HR Interview', 'Group Discussion']
      },
      roundStatus: { type: String, enum: ['pending', 'passed', 'failed'] },
      selectionDate: { type: Date },
      joiningDate: { type: Date },
      offerLetter: { type: String },
      status: { type: String, enum: ['applied', 'interview', 'hired', 'rejected'], default: 'applied' },
      appliedAt: { type: Date, default: Date.now }
    }
  ]
});

// Middleware to remove jobId from users' appliedJobs before deleting a job
jobSchema.pre('deleteOne', { document: true, query: false }, async function (next) {
  try {
    const jobId = this._id; // Get the current job's ID
    const User = mongoose.model('Users');

    // Remove the jobId from all users' appliedJobs array
    await User.updateMany(
      { 'studentProfile.appliedJobs.jobId': jobId },
      { $pull: { 'studentProfile.appliedJobs': { jobId: jobId } } }
    );

    next();
  } catch (error) {
    next(error);
  }
});

export default mongoose.model('Job', jobSchema, 'jobs');