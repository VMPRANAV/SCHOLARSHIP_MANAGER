import { apiRequest } from "./queryClient";
import type { Scholarship, InsertScholarship } from "@shared/schema";

export const scholarshipApi = {
  getAll: async (filters?: { 
    educationLevel?: string; 
    status?: string; 
    search?: string;
    amountRange?: [number, number];
    deadlineRange?: [string, string];
    community?: string[];
    genderRequirement?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }) => {
    try {
      const params = new URLSearchParams();
      
      // Only add non-default values to avoid unnecessary filtering
      if (filters?.educationLevel && filters.educationLevel !== 'all') {
        params.append('educationLevel', filters.educationLevel);
      }
      if (filters?.status) {
        params.append('status', filters.status);
      }
      if (filters?.search && filters.search.trim()) {
        params.append('search', filters.search.trim());
      }
      if (filters?.amountRange && (filters.amountRange[0] > 0 || filters.amountRange[1] < 100000)) {
        params.append('amountMin', filters.amountRange[0].toString());
        params.append('amountMax', filters.amountRange[1].toString());
      }
      if (filters?.deadlineRange && filters.deadlineRange[0] && filters.deadlineRange[1]) {
        params.append('deadlineFrom', filters.deadlineRange[0]);
        params.append('deadlineTo', filters.deadlineRange[1]);
      }
      if (filters?.community && filters.community.length > 0) {
        filters.community.forEach(comm => params.append('community', comm));
      }
      if (filters?.genderRequirement && filters.genderRequirement !== "All Genders") {
        params.append('genderRequirement', filters.genderRequirement);
      }
      if (filters?.sortBy && filters.sortBy !== 'name') {
        params.append('sortBy', filters.sortBy);
      }
      if (filters?.sortOrder && filters.sortOrder !== 'asc') {
        params.append('sortOrder', filters.sortOrder);
      }
      
      const queryString = params.toString();
      const response = await fetch(`/api/scholarships${queryString ? `?${queryString}` : ''}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching scholarships:', error);
      throw new Error('Failed to fetch scholarships. Please try again.');
    }
  },

  getById: async (id: string) => {
    try {
      const response = await fetch(`/api/scholarships/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching scholarship:', error);
      throw new Error('Failed to fetch scholarship details.');
    }
  },

  create: (data: FormData) =>
    apiRequest('POST', '/api/scholarships', data),

  update: (id: string, data: FormData) =>
    apiRequest('PUT', `/api/scholarships/${id}`, data),

  delete: (id: string) =>
    apiRequest('DELETE', `/api/scholarships/${id}`),
};

export const adminApi = {
  login: (credentials: { username: string; password: string }) =>
    apiRequest('POST', '/api/admin/login', credentials),
};
