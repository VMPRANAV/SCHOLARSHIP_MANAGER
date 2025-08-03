import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Scholarship, ScholarshipFormProps } from '../../types/scholarship';

const API_URL = "http://localhost:5000/api";
interface ScholarshipFormData extends Partial<Scholarship> {
  applicationFormData?: string; // For PDF file
}
export default function ScholarshipForm({ scholarship = null, onClose }: ScholarshipFormProps) {
  const [formData, setFormData] = useState<ScholarshipFormData>({
    name: '',
    description: '',
    amount: '',
    educationLevel: '',
    applicationEndDate: '',
    eligibility: '',
    community: '',
    genderRequirement: 'All Genders',
    status: 'active',
    organizationLogo: '',
    applicationLink: '',
     applicationFormData: ''
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (scholarship) {
      setFormData({
        name: scholarship.name || '',
        description: scholarship.description || '',
        amount: scholarship.amount || '',
        educationLevel: scholarship.educationLevel || '',
        applicationEndDate: scholarship.applicationEndDate || '',
        eligibility: scholarship.eligibility || '',
        community: scholarship.community || '',
        genderRequirement: scholarship.genderRequirement || 'All Genders',
        status: scholarship.status || 'active',
        organizationLogo: scholarship.organizationLogo || '',
        applicationLink: scholarship.applicationLink || '',
         applicationFormData: ''
      });
    }
  }, [scholarship]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, fileType: 'logo' | 'form'): Promise<void> => {
    const file = e.target.files?.[0];
    if (!file) return;
 // Validate file types
    if (fileType === 'logo' && !file.type.startsWith('image/')) {
      setError('Please select a valid image file for the logo.');
      return;
    }

    if (fileType === 'form' && file.type !== 'application/pdf') {
      setError('Please select a valid PDF file for the application form.');
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB.');
      return;
    }
    try {
      setError('');
      const base64String = await convertFileToBase64(file);
      setFormData(prev => ({
        ...prev,
        [fileType === 'logo' ? 'organizationLogo' : 'applicationFormData']: base64String
      }));
    } catch (err) {
      console.error('Error converting file to base64:', err);
      setError(`Failed to process ${fileType}. Please try again.`);
    }
  };

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  };
const validateForm = (): boolean => {
    const requiredFields = ['name', 'description', 'amount', 'educationLevel', 'applicationEndDate', 'eligibility'];
    
    for (const field of requiredFields) {
      if (!formData[field as keyof ScholarshipFormData]) {
        setError(`${field.charAt(0).toUpperCase() + field.slice(1)} is required.`);
        return false;
      }
    }

    // Validate amount is a positive number
    const amount = parseFloat(formData.amount || '0');
    if (isNaN(amount) || amount <= 0) {
      setError('Amount must be a valid positive number.');
      return false;
    }

    // Validate date is in the future
    const endDate = new Date(formData.applicationEndDate || '');
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (endDate <= today) {
      setError('Application deadline must be in the future.');
      return false;
    }

    // Validate URL format if provided
    if (formData.applicationLink && formData.applicationLink.trim()) {
      try {
        new URL(formData.applicationLink);
      } catch {
        setError('Please enter a valid URL for the application link.');
        return false;
      }
    }

    return true;
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      
      if (scholarship) {
        // Update existing scholarship
        await axios.put(`${API_URL}/scholarships/${scholarship._id}`, formData, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
      } else {
        // Create new scholarship
        await axios.post(`${API_URL}/scholarships`, formData, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
      }

      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to save scholarship');
    } finally {
      setLoading(false);
    }
  };
  const handleCancel = (): void => {
    if (loading) return; // Prevent cancel during submission
    onClose();
  };
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6">
          {scholarship ? 'Edit Scholarship' : 'Add Scholarship'}
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Scholarship Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Education Level</label>
              <select
                name="educationLevel"
                value={formData.educationLevel}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              >
                <option value="">Select Level</option>
                <option value="High School">High School</option>
                <option value="Bachelor's">Bachelor's</option>
                <option value="Master's">Master's</option>
                <option value="PhD">PhD</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Application Deadline</label>
              <input
                type="date"
                name="applicationEndDate"
                value={formData.applicationEndDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Eligibility</label>
            <textarea
              name="eligibility"
              value={formData.eligibility}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Target Community</label>
              <input
                type="text"
                name="community"
                value={formData.community}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gender Requirement</label>
              <select
                name="genderRequirement"
                value={formData.genderRequirement}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="All Genders">All Genders</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Application Link</label>
            <input
              type="url"
              name="applicationLink"
              value={formData.applicationLink}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Organization Logo</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, 'logo')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              {formData.organizationLogo && (
                <div className="mt-2">
                  <p className="text-sm text-gray-500 mb-1">Current logo:</p>
                  <img 
                    src={formData.organizationLogo} 
                    alt="Organization Logo" 
                    className="h-12 mt-1"
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Application Form (PDF)</label>
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => handleFileChange(e, 'form')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              {formData.applicationFormData && (
                <div className="mt-2">
                  <p className="text-sm text-green-600">PDF file uploaded successfully</p>
                  <a 
                    href={formData.applicationFormData}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    View current application form
                  </a>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-6 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
            >
              {loading ? 'Saving...' : scholarship ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
