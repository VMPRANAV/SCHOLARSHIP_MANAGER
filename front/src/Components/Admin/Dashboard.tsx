"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import ScholarshipForm from "./ScholarshipForm"
import AdminLayout from "./AdminLayout"
import {
  Search,
  Plus,
  Edit,
  Trash2,
  ToggleLeft,
  ToggleRight,
  GraduationCap,
  Users,
  Grid,
  List,
  BookOpen,
  TrendingUp,
  DollarSign
} from "lucide-react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from "recharts"
import { Scholarship, Activity, Analytics } from '../../types/scholarship'

const API_URL = "http://localhost:5000/api"

// Chart data interfaces
interface ChartDataPoint {
  name: string;
  count?: number;
  users?: number;
  amount?: number;
  value?: number;
}

// Mock chart data
const applicationData: ChartDataPoint[] = [
  { name: 'Jan', count: 4 },
  { name: 'Feb', count: 7 },
  { name: 'Mar', count: 5 },
  { name: 'Apr', count: 10 },
  { name: 'May', count: 8 },
  { name: 'Jun', count: 12 },
  { name: 'Jul', count: 9 },
];

const scholarshipDistributionData: ChartDataPoint[] = [
  { name: 'STEM', value: 35 },
  { name: 'Arts', value: 20 },
  { name: 'Business', value: 25 },
  { name: 'Medicine', value: 15 },
  { name: 'Others', value: 5 },
];

const userGrowthData: ChartDataPoint[] = [
  { name: 'Week 1', users: 120 },
  { name: 'Week 2', users: 145 },
  { name: 'Week 3', users: 175 },
  { name: 'Week 4', users: 210 },
  { name: 'Week 5', users: 250 },
  { name: 'Week 6', users: 290 },
  { name: 'Week 7', users: 320 },
];

const fundingData: ChartDataPoint[] = [
  { name: 'Jan', amount: 12000 },
  { name: 'Feb', amount: 19000 },
  { name: 'Mar', amount: 15000 },
  { name: 'Apr', amount: 25000 },
  { name: 'May', amount: 22000 },
  { name: 'Jun', amount: 30000 },
  { name: 'Jul', amount: 27000 },
];

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE'];

export default function AdminDashboard() {
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [filteredScholarships, setFilteredScholarships] = useState<Scholarship[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [selectedScholarship, setSelectedScholarship] = useState<Scholarship | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [timeRange, setTimeRange] = useState<string>("7");
  const navigate = useNavigate();

  // Dashboard analytics state
  const [analytics, setAnalytics] = useState<Analytics>({
    totalScholarships: 0,
    activeScholarships: 0,
    totalApplications: 0,
    totalFunding: 0,
    recentActivity: []
  });

  useEffect(() => {
    fetchScholarships();
  }, []);

  useEffect(() => {
    if (scholarships.length > 0) {
      fetchAnalytics();
    }
  }, [scholarships]); // Run analytics when scholarships change

  useEffect(() => {
    if (scholarships.length > 0) {
      let results = [...scholarships];

      // Filter by search term
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        results = results.filter(
          (s) =>
            s.name.toLowerCase().includes(term) ||
            s.description.toLowerCase().includes(term) ||
            s.eligibility?.toLowerCase().includes(term)
        );
      }

      // Filter by status
      if (statusFilter !== "all") {
        results = results.filter((s) => s.status === statusFilter);
      }

      setFilteredScholarships(results);
    } else {
      setFilteredScholarships([]);
    }
  }, [scholarships, searchTerm, statusFilter]);

  const fetchScholarships = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(""); // Clear previous errors
      
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await axios.get(`${API_URL}/scholarships`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data && Array.isArray(response.data)) {
        setScholarships(response.data);
        setFilteredScholarships(response.data);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || "Failed to fetch scholarships";
      setError(errorMessage);
      console.error("Fetch scholarships error:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAnalytics = async (): Promise<void> => {
    try {
      const activeCount = scholarships.filter(s => s?.status === "active").length;
      
      const totalAmount = scholarships.reduce((sum, scholarship) => {
        const amount = parseFloat(scholarship?.amount || '0');
        return sum + (isNaN(amount) ? 0 : amount);
      }, 0);
      
      // Generate recent activity
      const recentActivity: Activity[] = [
        { 
          type: "new_scholarship", 
          message: "New scholarship added: STEM Excellence Award", 
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString() 
        },
        { 
          type: "application", 
          message: "5 new applications received", 
          timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString() 
        },
        { 
          type: "deadline", 
          message: "Merit Scholarship deadline approaching", 
          timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString() 
        },
        { 
          type: "user", 
          message: "New user registered: john.doe@example.com", 
          timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() 
        }
      ];
      
      setAnalytics({
        totalScholarships: scholarships.length,
        activeScholarships: activeCount,
        totalApplications: 42,
        totalFunding: totalAmount,
        recentActivity: recentActivity
      });
    } catch (err: any) {
      console.error("Failed to fetch analytics", err);
    }
  };

  const handleEditScholarship = (scholarship: Scholarship): void => {
    setSelectedScholarship(scholarship); // scholarship is guaranteed to exist here
    setIsFormOpen(true);
  };

  const handleAddScholarship = (): void => {
    setSelectedScholarship(null); // explicitly set to null for new scholarship
    setIsFormOpen(true);
  };

  const handleDeleteScholarship = async (id: string): Promise<void> => {
    if (!window.confirm("Are you sure you want to delete this scholarship?")) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      await axios.delete(`${API_URL}/scholarships/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      await fetchScholarships();
      await fetchAnalytics();
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Failed to delete scholarship";
      setError(errorMessage);
      console.error("Delete scholarship error:", err);
    }
  };

  const handleToggleStatus = async (scholarship: Scholarship): Promise<void> => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const newStatus = scholarship.status === "active" ? "inactive" : "active";

      await axios.put(
        `${API_URL}/scholarships/${scholarship._id}`,
        { ...scholarship, status: newStatus },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await fetchScholarships();
      await fetchAnalytics();
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Failed to update scholarship status";
      setError(errorMessage);
      console.error("Toggle status error:", err);
    }
  };

  const handleFormClose = (): void => {
    setIsFormOpen(false);
    fetchScholarships();
    fetchAnalytics();
  };

  const getTimeAgo = (timestamp: string): string => {
    const now = new Date();
    const past = new Date(timestamp);
    const diffMs = now.getTime() - past.getTime();
    
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffDays > 0) {
      return `${diffDays}d ago`;
    } else if (diffHours > 0) {
      return `${diffHours}h ago`;
    } else if (diffMins > 0) {
      return `${diffMins}m ago`;
    } else {
      return 'Just now';
    }
  };

  const getScholarshipInitials = (name: string): string => {
    return name ? name.substring(0, 2).toUpperCase() : "??";
  };

  const formatAmount = (amount: string): string => {
    const numAmount = parseFloat(amount || '0');
    return isNaN(numAmount) ? '0' : numAmount.toLocaleString();
  };

  const formatFunding = (amount: number): string => {
    return (amount / 1000).toFixed(1);
  };

  const getAverageAmount = (): number => {
    return analytics.totalFunding / (analytics.totalScholarships || 1);
  };

  const getActivePercentage = (): number => {
    return Math.round((analytics.activeScholarships / (analytics.totalScholarships || 1)) * 100);
  };

  return (
    <AdminLayout title="Admin Dashboard" currentPage="dashboard">
      {/* Error Message */}
      {error && (
        <div className="mb-4 bg-red-50 border-l-4 border-red-400 p-4">
          <div className="flex">
            <div>
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Dashboard Overview */}
      <div className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 - Total Scholarships */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Scholarships</p>
                <h3 className="text-3xl font-bold text-gray-900 mt-1">{analytics.totalScholarships}</h3>
              </div>
              <div className="p-3 bg-indigo-50 rounded-lg">
                <BookOpen className="w-6 h-6 text-indigo-500" />
              </div>
            </div>
            <div className="flex items-center mt-4">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-xs font-medium text-green-500">+12% from last month</span>
            </div>
          </div>

          {/* Card 2 - Active Scholarships */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Active Scholarships</p>
                <h3 className="text-3xl font-bold text-gray-900 mt-1">{analytics.activeScholarships}</h3>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <ToggleRight className="w-6 h-6 text-green-500" />
              </div>
            </div>
            <div className="flex items-center mt-4">
              <span className="text-xs font-medium text-gray-500">
                {getActivePercentage()}% of total
              </span>
            </div>
          </div>

          {/* Card 3 - Total Applications */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Applications</p>
                <h3 className="text-3xl font-bold text-gray-900 mt-1">{analytics.totalApplications}</h3>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <Users className="w-6 h-6 text-blue-500" />
              </div>
            </div>
            <div className="flex items-center mt-4">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-xs font-medium text-green-500">+8% from last week</span>
            </div>
          </div>

          {/* Card 4 - Total Funding */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Funding</p>
                <h3 className="text-3xl font-bold text-gray-900 mt-1">
                  ${formatFunding(analytics.totalFunding)}k
                </h3>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <DollarSign className="w-6 h-6 text-purple-500" />
              </div>
            </div>
            <div className="flex items-center mt-4">
              <span className="text-xs font-medium text-gray-500">
                Average ${getAverageAmount().toFixed(0)} per scholarship
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="mb-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Application Trend Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Application Trends</h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={applicationData}>
              <defs>
                <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="count" stroke="#8884d8" fillOpacity={1} fill="url(#colorCount)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        {/* Scholarship Distribution Pie Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Scholarship Categories</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={scholarshipDistributionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({name, percent}) => `${name}: ${((percent ?? 0) * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {scholarshipDistributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value}`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        {/* User Growth Line Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">User Growth</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={userGrowthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="users" stroke="#82ca9d" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        {/* Funding Bar Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Funding Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={fundingData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => `$${value}`} />
              <Legend />
              <Bar dataKey="amount" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Scholarships Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Table/Grid Area - Scholarships */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100">
              <div className="flex flex-col md:flex-row justify-between md:items-center">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Recent Scholarships</h2>
                  <p className="text-sm text-gray-500">Latest scholarships added to the system</p>
                </div>

                {/* Controls */}
                <div className="flex flex-wrap items-center gap-3 mt-3 md:mt-0">
                  <div className="flex items-center bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-1.5 rounded-md transition-colors ${viewMode === "grid" ? "bg-white shadow-sm text-indigo-600" : "text-gray-500"}`}
                    >
                      <Grid className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode("table")}
                      className={`p-1.5 rounded-md transition-colors ${viewMode === "table" ? "bg-white shadow-sm text-indigo-600" : "text-gray-500"}`}
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>

                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="text-sm rounded-lg bg-gray-50 border border-gray-200 py-1.5 px-3"
                  >
                    <option value="all">All Statuses</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>

                  <button
                    onClick={handleAddScholarship}
                    className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add New
                  </button>
                </div>
              </div>

              {/* Search Bar */}
              <div className="mt-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search scholarships..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="block w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div className="p-0">
              {loading ? (
                <div className="text-center py-16">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-indigo-500 border-t-transparent"></div>
                  <p className="mt-2 text-gray-500">Loading scholarships...</p>
                </div>
              ) : filteredScholarships.length === 0 ? (
                <div className="text-center py-16">
                  <GraduationCap className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 mb-2">No scholarships found.</p>
                  <button
                    onClick={handleAddScholarship}
                    className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Scholarship
                  </button>
                </div>
              ) : viewMode === "grid" ? (
                /* Grid View */
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
                  {filteredScholarships.slice(0, 4).map((scholarship) => (
                    <div
                      key={scholarship._id}
                      className="bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow transition-shadow"
                    >
                      <div className="p-4">
                        <div className="flex items-center">
                          {scholarship.organizationLogo ? (
                            <img
                              src={scholarship.organizationLogo || "/placeholder.svg"}
                              alt="Logo"
                              className="w-10 h-10 rounded-lg object-contain mr-3 bg-gray-50 p-1"
                            />
                          ) : (
                            <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
                              <span className="text-indigo-700 font-bold text-sm">
                                {getScholarshipInitials(scholarship.name)}
                              </span>
                            </div>
                          )}
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-900 text-sm leading-5 truncate">{scholarship.name}</h3>
                            <div className="flex items-center mt-1">
                              <button
                                onClick={() => handleToggleStatus(scholarship)}
                                className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                                  scholarship.status === "active"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-gray-100 text-gray-800"
                                }`}
                              >
                                {scholarship.status === "active" ? (
                                  <ToggleRight className="w-3 h-3 mr-1" />
                                ) : (
                                  <ToggleLeft className="w-3 h-3 mr-1" />
                                )}
                                {scholarship.status}
                              </button>
                              <span className="ml-2 text-xs text-gray-500">
                                ${formatAmount(scholarship.amount)}
                              </span>
                            </div>
                          </div>
                          <div className="flex">
                            <button
                              onClick={() => handleEditScholarship(scholarship)}
                              className="text-gray-400 hover:text-indigo-600 p-1"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteScholarship(scholarship._id)}
                              className="text-gray-400 hover:text-red-600 p-1"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* Table View */
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Amount
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredScholarships.slice(0, 5).map((scholarship) => (
                        <tr key={scholarship._id} className="hover:bg-gray-50">
                          <td className="px-6 py-3 whitespace-nowrap">
                            <div className="flex items-center">
                              {scholarship.organizationLogo ? (
                                <img
                                  src={scholarship.organizationLogo || "/placeholder.svg"}
                                  alt="Logo"
                                  className="h-8 w-8 mr-3 object-contain rounded bg-gray-50 p-1"
                                />
                              ) : (
                                <div className="h-8 w-8 rounded bg-indigo-100 flex items-center justify-center mr-3">
                                  <span className="text-xs font-medium text-indigo-700">
                                    {getScholarshipInitials(scholarship.name)}
                                  </span>
                                </div>
                              )}
                              <div className="text-sm font-medium text-gray-900">{scholarship.name}</div>
                            </div>
                          </td>
                          <td className="px-6 py-3 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              ${formatAmount(scholarship.amount)}
                            </div>
                          </td>
                          <td className="px-6 py-3 whitespace-nowrap">
                            <button
                              onClick={() => handleToggleStatus(scholarship)}
                              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                scholarship.status === "active"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {scholarship.status === "active" ? (
                                <ToggleRight className="w-3 h-3 mr-1" />
                              ) : (
                                <ToggleLeft className="w-3 h-3 mr-1" />
                              )}
                              {scholarship.status}
                            </button>
                          </td>
                          <td className="px-6 py-3 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleEditScholarship(scholarship)}
                                className="text-indigo-600 hover:text-indigo-900 p-1 rounded hover:bg-indigo-50"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteScholarship(scholarship._id)}
                                className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
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
        </div>

        {/* Side Panel - Activity Feed */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="px-6 py-5 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                {analytics.recentActivity.map((activity, index) => (
                  <div key={index} className="flex">
                    <div className="mr-4">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-100">
                        {activity.type === 'new_scholarship' && <BookOpen className="w-5 h-5 text-indigo-600" />}
                        {activity.type === 'application' && <Users className="w-5 h-5 text-blue-600" />}
                        {activity.type === 'deadline' && <ToggleRight className="w-5 h-5 text-amber-600" />}
                        {activity.type === 'user' && <Users className="w-5 h-5 text-green-600" />}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-800">{activity.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{getTimeAgo(activity.timestamp)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {isFormOpen && (
        <ScholarshipForm 
          scholarship={selectedScholarship} // This is now properly typed as Scholarship | null
          onClose={handleFormClose} 
        />
      )}
    </AdminLayout>
  );
}