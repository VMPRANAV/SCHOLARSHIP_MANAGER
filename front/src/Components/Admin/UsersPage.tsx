"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import AdminLayout from "./AdminLayout"
import { Search, Plus, Edit, Trash2, User, Filter, MoreHorizontal, Download, ChevronDown } from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts"
import { AdminUser, ChartData } from '../../types/scholarship'

const API_URL = "http://localhost:5000/api"

// Mock user roles data for pie chart
const userRolesData: ChartData[] = [
  { name: 'Student', value: 65 },
  { name: 'Admin', value: 5 },
  { name: 'Teacher', value: 15 },
  { name: 'Parent', value: 15 },
];

// Mock user registration data for bar chart
const userRegistrationData: ChartData[] = [
  { name: 'Jan', count: 12 },
  { name: 'Feb', count: 19 },
  { name: 'Mar', count: 15 },
  { name: 'Apr', count: 25 },
  { name: 'May', count: 22 },
  { name: 'Jun', count: 30 },
  { name: 'Jul', count: 27 },
];

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042'];

export default function UsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  // Mock users data - FIXED: Added name property to profile
  const mockUsers: AdminUser[] = [
    {
      _id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'student',
      registeredOn: new Date(2023, 0, 15),
      lastActive: new Date(2023, 6, 20),
      applicationCount: 3,
      profile: {
        name: 'John Doe', // FIXED: Added required name property
        university: 'MIT',
        major: 'Computer Science',
        bio: 'Computer Science student passionate about AI and machine learning.',
        education: 'Bachelor of Science in Computer Science'
      }
    },
    {
      _id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      role: 'student',
      registeredOn: new Date(2023, 1, 5),
      lastActive: new Date(2023, 6, 19),
      applicationCount: 2,
      profile: {
        name: 'Jane Smith', // FIXED: Added required name property
        university: 'Stanford',
        major: 'Biology',
        bio: 'Biology student interested in research and healthcare.',
        education: 'Bachelor of Science in Biology'
      }
    },
    {
      _id: '3',
      name: 'Admin User',
      email: 'admin@gmail.com',
      role: 'admin',
      registeredOn: new Date(2022, 10, 1),
      lastActive: new Date(2023, 6, 21),
      applicationCount: 0,
      profile: {
        name: 'Admin User', // FIXED: Added required name property
        university: 'N/A',
        major: 'N/A',
        bio: 'System administrator managing the scholarship platform.',
        education: 'Master of Business Administration'
      }
    },
    {
      _id: '4',
      name: 'Professor Johnson',
      email: 'prof.johnson@university.edu',
      role: 'teacher',
      registeredOn: new Date(2023, 2, 20),
      lastActive: new Date(2023, 6, 15),
      applicationCount: 0,
      profile: {
        name: 'Professor Johnson', // FIXED: Added required name property
        university: 'Harvard',
        department: 'Physics',
        bio: 'Physics professor specializing in quantum mechanics.',
        education: 'PhD in Physics'
      }
    },
    {
      _id: '5',
      name: 'Mary Williams',
      email: 'mary.williams@example.com',
      role: 'student',
      registeredOn: new Date(2023, 3, 10),
      lastActive: new Date(2023, 6, 18),
      applicationCount: 4,
      profile: {
        name: 'Mary Williams', // FIXED: Added required name property
        university: 'Yale',
        major: 'Literature',
        bio: 'Literature student with a passion for creative writing.',
        education: 'Bachelor of Arts in English Literature'
      }
    }
  ];

  const fetchUsers = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(""); // Clear previous errors
      
      // In a real app, this would fetch from API
      // const token = localStorage.getItem("token");
      // if (!token) {
      //   throw new Error("No authentication token found");
      // }
      // const response = await axios.get(`${API_URL}/users`, {
      //   headers: { Authorization: `Bearer ${token}` },
      // });
      // if (response.data && Array.isArray(response.data)) {
      //   setUsers(response.data);
      //   setFilteredUsers(response.data);
      // }
      
      // Using mock data instead
      setTimeout(() => {
        setUsers(mockUsers);
        setFilteredUsers(mockUsers);
        setLoading(false);
      }, 800);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || "Failed to fetch users";
      setError(errorMessage);
      console.error("Fetch users error:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (users.length > 0) {
      let results = [...users];

      // Filter by search term
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        results = results.filter(
          (u) =>
            u.name.toLowerCase().includes(term) ||
            u.email.toLowerCase().includes(term)
        );
      }

      // Filter by role
      if (roleFilter !== "all") {
        results = results.filter((u) => u.role === roleFilter);
      }

      setFilteredUsers(results);
    } else {
      setFilteredUsers([]);
    }
  }, [users, searchTerm, roleFilter]);

  const handleDeleteUser = async (id: string): Promise<void> => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      // In a real app, this would be an API call
      // const token = localStorage.getItem("token");
      // if (!token) {
      //   throw new Error("No authentication token found");
      // }
      // await axios.delete(`${API_URL}/users/${id}`, {
      //   headers: { Authorization: `Bearer ${token}` },
      // });
      
      // Simulate deletion
      const updatedUsers = users.filter(user => user._id !== id);
      setUsers(updatedUsers);
      setFilteredUsers(filteredUsers.filter(user => user._id !== id));
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Failed to delete user";
      setError(errorMessage);
      console.error("Delete user error:", err);
    }
  };

  const handleEditUser = (user: AdminUser): void => {
    // In a real app, this would navigate to edit form or open modal
    alert(`Edit user: ${user.name}`);
    // navigate(`/admin/users/${user._id}/edit`);
  };

  const handleAddUser = (): void => {
    // In a real app, this would navigate to add form or open modal
    alert("Add new user functionality would be implemented here");
    // navigate('/admin/users/new');
  };

  const handleExportUsers = (): void => {
    try {
      const csvContent = [
        // CSV header
        'Name,Email,Role,Registered,Applications',
        // CSV data
        ...filteredUsers.map(user => 
          `"${user.name}","${user.email}","${user.role}","${formatDate(user.registeredOn)}","${user.applicationCount}"`
        )
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `users_export_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err: any) {
      console.error("Export error:", err);
      alert("Failed to export users. Please try again.");
    }
  };

  const formatDate = (date: Date): string => {
    try {
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (err) {
      return 'Invalid Date';
    }
  };

  const getRoleBadgeClass = (role: string): string => {
    switch (role) {
      case 'admin':
        return 'bg-purple-100 text-purple-800';
      case 'teacher':
        return 'bg-blue-100 text-blue-800';
      case 'student':
        return 'bg-green-100 text-green-800';
      case 'parent':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getUserInitials = (name: string): string => {
    return name ? name.charAt(0).toUpperCase() : "?";
  };

  return (
    <AdminLayout title="Users Management" currentPage="users">
      {/* Error Display */}
      {error && (
        <div className="mb-6 bg-red-50 border-l-4 border-red-400 p-4">
          <div className="flex">
            <div>
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* User Roles Pie Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">User Distribution by Role</h2>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={userRolesData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({name, percent}) => `${name}: ${((percent || 0) * 100).toFixed(0)}%`} // FIXED: Added null check for percent
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {userRolesData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value}%`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        {/* User Registration Bar Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">User Registrations</h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={userRegistrationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" name="New Users" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100">
          <div className="flex flex-col md:flex-row justify-between md:items-center">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">All Users</h2>
              <p className="text-sm text-gray-500">
                Manage user accounts and permissions ({filteredUsers.length} users)
              </p>
            </div>

            {/* Controls */}
            <div className="flex flex-wrap items-center gap-3 mt-3 md:mt-0">
              <button 
                className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-lg border border-gray-200 text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                onClick={() => alert("Advanced filters would be implemented here")}
              >
                <Filter className="w-4 h-4 mr-2" />
                Advanced Filters
              </button>

              <div className="relative">
                <button 
                  className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-lg border border-gray-200 text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                  onClick={handleExportUsers}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export
                  <ChevronDown className="w-4 h-4 ml-1" />
                </button>
              </div>

              <button 
                className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
                onClick={handleAddUser}
              >
                <Plus className="w-4 h-4 mr-1" />
                Add User
              </button>
            </div>
          </div>

          {/* Search and Filter Controls */}
          <div className="flex flex-col md:flex-row gap-4 mt-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
              />
            </div>

            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="text-sm rounded-lg bg-gray-50 border border-gray-200 py-2 px-3 md:w-40 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
            >
              <option value="all">All Roles</option>
              <option value="student">Students</option>
              <option value="admin">Admins</option>
              <option value="teacher">Teachers</option>
              <option value="parent">Parents</option>
            </select>
          </div>
        </div>

        <div className="p-0">
          {loading ? (
            <div className="text-center py-16">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-indigo-500 border-t-transparent"></div>
              <p className="mt-2 text-gray-500">Loading users...</p>
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
                <User className="w-8 h-8 text-red-500" />
              </div>
              <p className="text-gray-800 font-medium mb-1">Error Loading Users</p>
              <p className="text-gray-500">{error}</p>
              <button 
                onClick={fetchUsers}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Try Again
              </button>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                <User className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500 mb-2">No users found matching your criteria</p>
              {(searchTerm || roleFilter !== "all") && (
                <button 
                  onClick={() => {
                    setSearchTerm("");
                    setRoleFilter("all");
                  }}
                  className="text-indigo-600 hover:text-indigo-500 text-sm"
                >
                  Clear filters
                </button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Registered
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Applications
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                              <span className="font-medium text-indigo-800">
                                {getUserInitials(user.name)}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleBadgeClass(user.role)}`}>
                          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(user.registeredOn)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">
                          {user.applicationCount}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-3">
                          <button
                            className="text-indigo-600 hover:text-indigo-900 p-1 rounded hover:bg-indigo-50 transition-colors"
                            onClick={() => handleEditUser(user)}
                            title="Edit user"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50 transition-colors"
                            onClick={() => handleDeleteUser(user._id)}
                            title="Delete user"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <div className="relative">
                            <button 
                              className="text-gray-500 hover:text-gray-700 p-1 rounded hover:bg-gray-50 transition-colors"
                              title="More options"
                              onClick={() => alert("More options would be implemented here")}
                            >
                              <MoreHorizontal className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}