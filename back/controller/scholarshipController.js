import Scholarship from '../models/Scholarship.js';

export const getAllScholarships = async (req, res) => {
  try {
    const { search, status } = req.query;
    
    let query = {};
    
    if (search) {
      query = { 
        ...query, 
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } }
        ] 
      };
    }
    
    if (status && status !== 'all') {
      query.status = status;
    }
    
    const scholarships = await Scholarship.find(query).sort({ createdAt: -1 });
    res.json(scholarships);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getScholarshipById = async (req, res) => {
  try {
    const scholarship = await Scholarship.findById(req.params.id);
    if (!scholarship) {
      return res.status(404).json({ message: 'Scholarship not found' });
    }
    res.json(scholarship);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createScholarship = async (req, res) => {
  try {
    const scholarshipData = req.body;
    
    // Base64 data is already in the request body
    // organizationLogo and applicationFormData fields will contain the base64 strings
    
    // Set the creator
    if (req.user) {
      scholarshipData.createdBy = req.user._id;
    }
    
    const scholarship = await Scholarship.create(scholarshipData);
    res.status(201).json(scholarship);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateScholarship = async (req, res) => {
  try {
    const { id } = req.params;
    const scholarshipData = req.body;
    
    const scholarship = await Scholarship.findById(id);
    if (!scholarship) {
      return res.status(404).json({ message: 'Scholarship not found' });
    }
    
    // Base64 data is already in the request body
    
    const updatedScholarship = await Scholarship.findByIdAndUpdate(
      id, 
      scholarshipData, 
      { new: true, runValidators: true }
    );
    
    res.json(updatedScholarship);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteScholarship = async (req, res) => {
  try {
    const { id } = req.params;
    
    const scholarship = await Scholarship.findById(id);
    if (!scholarship) {
      return res.status(404).json({ message: 'Scholarship not found' });
    }
    
    await Scholarship.findByIdAndDelete(id);
    
    res.json({ message: 'Scholarship deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};