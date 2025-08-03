"use client"

import { useState, useEffect } from "react"
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  DollarSign, 
  Calendar, 
  Users, 
  BookOpen,
  Award,
  AlertCircle,
  CheckCircle,
  Clock
} from "lucide-react"
import AdminLayout from "./AdminLayout"

interface Scholarship {
  _id: string
  name: string
  description: string
  amount: string
  educationLevel: string
  applicationEndDate: string
  eligibility: string
  community: string
  genderRequirement: string
  status: string
  createdAt?: string
  organizationLogo?: string
  applicationLink?: string
}

export default function AdminScholarships() {
  const [scholarships, setScholarships] = useState<Scholarship[]>([])
  const [filteredScholarships, setFilteredScholarships] = useState<Scholarship[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [editingScholarship, setEditingScholarship] = useState<Scholarship | null>(null)

  // Mock data for scholarships
  useEffect(() => {
    const mockScholarships: Scholarship[] = [
      {
        _id: "1",
        name: "STEM Excellence Scholarship",
        description: "Supporting outstanding students in Science, Technology, Engineering, and Mathematics fields",
        amount: "5000",
        educationLevel: "Undergraduate",
        applicationEndDate: "2025-12-31",
        eligibility: "3.5+ GPA, STEM major, US citizen",
        community: "STEM Students",
        genderRequirement: "All Genders",
        status: "active",
        createdAt: "2024-01-15",
        applicationLink: "https://example.com/apply"
      },
      {
        _id: "2",
        name: "Women in Technology Grant",
        description: "Empowering women pursuing careers in technology and computer science",
        amount: "3500",
        educationLevel: "Graduate",
        applicationEndDate: "2025-10-15",
        eligibility: "Female, Technology field, 3.0+ GPA",
        community: "Women in Tech",
        genderRequirement: "Female",
        status: "active",
        createdAt: "2024-02-01"
      },
      {
        _id: "3",
        name: "Future Leaders Scholarship",
        description: "For students demonstrating exceptional leadership potential",
        amount: "7500",
        educationLevel: "Undergraduate",
        applicationEndDate: "2025-08-30",
        eligibility: "Leadership experience, 3.2+ GPA",
        community: "Future Leaders",
        genderRequirement: "All Genders",
        status: "draft",
        createdAt: "2024-03-10"
      },
      {
        _id: "4",
        name: "International Student Support",
        description: "Supporting international students pursuing higher education",
        amount: "4000",
        educationLevel: "Graduate",
        applicationEndDate: "2024-12-01",
        eligibility: "International student status, 3.0+ GPA",
        community: "International Students",
        genderRequirement: "All Genders",
        status: "expired",
        createdAt: "2024-01-20"
      }
    ]

    // Simulate API call
    setTimeout(() => {
      setScholarships(mockScholarships)
      setFilteredScholarships(mockScholarships)
      setLoading(false)
    }, 1000)
  }, [])

  // Filter scholarships based on search and status
  useEffect(() => {
    let filtered = scholarships

    if (searchTerm) {
      filtered = filtered.filter(scholarship =>
        scholarship.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scholarship.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scholarship.community.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(scholarship => scholarship.status === statusFilter)
    }

    setFilteredScholarships(filtered)
  }, [scholarships, searchTerm, statusFilter])

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { color: "bg-green-100 text-green-800", icon: CheckCircle, text: "Active" },
      draft: { color: "bg-yellow-100 text-yellow-800", icon: Clock, text: "Draft" },
      expired: { color: "bg-red-100 text-red-800", icon: AlertCircle, text: "Expired" },
      paused: { color: "bg-gray-100 text-gray-800", icon: Clock, text: "Paused" }
    }

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.draft
    const Icon = config.icon

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        <Icon className="w-3 h-3 mr-1" />
        {config.text}
      </span>
    )
  }

  const handleDeleteScholarship = (id: string) => {
    if (window.confirm("Are you sure you want to delete this scholarship?")) {
      setScholarships(prev => prev.filter(s => s._id !== id))
    }
  }

  const handleToggleStatus = (id: string) => {
    setScholarships(prev => prev.map(s => 
      s._id === id 
        ? { ...s, status: s.status === 'active' ? 'paused' : 'active' }
        : s
    ))
  }

  const getScholarshipStats = () => {
    const total = scholarships.length
    const active = scholarships.filter(s => s.status === 'active').length
    const draft = scholarships.filter(s => s.status === 'draft').length
    const expired = scholarships.filter(s => s.status === 'expired').length
    const totalAmount = scholarships.reduce((sum, s) => sum + Number.parseFloat(s.amount), 0)

    return { total, active, draft, expired, totalAmount }
  }

  const stats = getScholarshipStats()

  return (
    <AdminLayout title="Scholarship Management" currentPage="scholarships">
      <div className="space-y-6">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <BookOpen className="w-5 h-5 text-blue-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Total</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Active</p>
                <p className="text-2xl font-bold text-gray-900">{stats.active}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="w-5 h-5 text-yellow-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Draft</p>
                <p className="text-2xl font-bold text-gray-900">{stats.draft}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertCircle className="w-5 h-5 text-red-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Expired</p>
                <p className="text-2xl font-bold text-gray-900">{stats.expired}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <DollarSign className="w-5 h-5 text-purple-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Total Value</p>
                <p className="text-2xl font-bold text-gray-900">${stats.totalAmount.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Header with Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">All Scholarships</h2>
            <p className="text-gray-600">Manage scholarship programs and applications</p>
          </div>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create Scholarship
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search scholarships..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="draft">Draft</option>
                <option value="expired">Expired</option>
                <option value="paused">Paused</option>
              </select>
            </div>
          </div>
        </div>

        {/* Scholarships Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading scholarships...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Scholarship
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Level
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Deadline
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
                  {filteredScholarships.map((scholarship) => (
                    <tr key={scholarship._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            {scholarship.organizationLogo ? (
                              <img
                                className="h-10 w-10 rounded-lg object-cover"
                                src={scholarship.organizationLogo}
                                alt=""
                              />
                            ) : (
                              <div className="h-10 w-10 rounded-lg bg-indigo-100 flex items-center justify-center">
                                <Award className="h-5 w-5 text-indigo-600" />
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {scholarship.name}
                            </div>
                            <div className="text-sm text-gray-500 max-w-xs truncate">
                              {scholarship.description}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-green-600">
                          ${Number.parseFloat(scholarship.amount).toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{scholarship.educationLevel}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(scholarship.applicationEndDate).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(scholarship.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => {/* View logic */}}
                            className="text-indigo-600 hover:text-indigo-900 p-1 rounded"
                            title="View"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setEditingScholarship(scholarship)}
                            className="text-green-600 hover:text-green-900 p-1 rounded"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleToggleStatus(scholarship._id)}
                            className="text-yellow-600 hover:text-yellow-900 p-1 rounded"
                            title={scholarship.status === 'active' ? 'Pause' : 'Activate'}
                          >
                            <Clock className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteScholarship(scholarship._id)}
                            className="text-red-600 hover:text-red-900 p-1 rounded"
                            title="Delete"
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

          {!loading && filteredScholarships.length === 0 && (
            <div className="text-center py-8">
              <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No scholarships found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm || statusFilter !== 'all' 
                  ? 'Try adjusting your search or filters.'
                  : 'Get started by creating a new scholarship.'
                }
              </p>
              {!searchTerm && statusFilter === 'all' && (
                <div className="mt-6">
                  <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Create Scholarship
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}