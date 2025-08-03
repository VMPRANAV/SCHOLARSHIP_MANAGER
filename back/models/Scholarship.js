import mongoose from 'mongoose';

const scholarshipSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  amount: {
    type: String,
    required: true
  },
  educationLevel: {
    type: String,
    required: true,
    enum: ["High School", "Bachelor's", "Master's", "PhD"]
  },
  applicationEndDate: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  eligibility: {
    type: String,
    required: true
  },
  community: {
    type: String,
    default: ""
  },
  genderRequirement: {
    type: String,
    enum: ["All Genders", "Male", "Female", "Other"],
    default: "All Genders"
  },
  applicationLink: {
    type: String,
    default: ""
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active"
  },
  organizationLogo: {
    type: String, // Will store base64 string
    default: null
  },
  applicationFormData: {
    type: String, // Will store base64 string
    default: null
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Scholarship = mongoose.model('Scholarship', scholarshipSchema);

export default Scholarship;