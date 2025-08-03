import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  getAllScholarships,
  getScholarshipById,
  createScholarship,
  updateScholarship,
  deleteScholarship
} from '../controller/scholarshipController.js';

const router = express.Router();

// Public routes
router.get('/', getAllScholarships);
router.get('/:id', getScholarshipById);

// Protected routes (admin only)
router.post('/', protect, createScholarship);
router.put('/:id', protect, updateScholarship);
router.delete('/:id', protect, deleteScholarship);

export default router;