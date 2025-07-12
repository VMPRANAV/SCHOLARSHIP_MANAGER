import { apiRequest } from "./queryClient";
import type { Scholarship, InsertScholarship } from "@shared/schema";

export const scholarshipApi = {
  getAll: (filters?: { educationLevel?: string; status?: string; search?: string }) => {
    const params = new URLSearchParams();
    if (filters?.educationLevel) params.append('educationLevel', filters.educationLevel);
    if (filters?.status) params.append('status', filters.status);
    if (filters?.search) params.append('search', filters.search);
    
    const queryString = params.toString();
    return fetch(`/api/scholarships${queryString ? `?${queryString}` : ''}`).then(res => res.json());
  },

  getById: (id: number) => 
    fetch(`/api/scholarships/${id}`).then(res => res.json()),

  create: (data: FormData) =>
    apiRequest('POST', '/api/scholarships', data),

  update: (id: number, data: FormData) =>
    apiRequest('PUT', `/api/scholarships/${id}`, data),

  delete: (id: number) =>
    apiRequest('DELETE', `/api/scholarships/${id}`),
};

export const adminApi = {
  login: (credentials: { username: string; password: string }) =>
    apiRequest('POST', '/api/admin/login', credentials),
};

export const kprApi = {
  downloadForm: (type: 'merit' | 'sports') =>
    fetch(`/api/kpr/${type}/download`).then(res => res.json()),
};
