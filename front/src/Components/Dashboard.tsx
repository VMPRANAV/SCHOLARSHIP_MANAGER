"use client"

import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { 
  Search, 
  Bell, 
  User, 
  Settings, 
  LogOut, 
  Clock, 
  Award, 
  BookOpen, 
  GraduationCap,
  Home,
  Phone,
  Users,
  Trophy,
  FileText,
  ChevronDown
} from "lucide-react"
import axios from "axios"
import { Users as UsersType, Scholarship, Application } from '../types/scholarship'
import ScholarshipDetailsModal from "./ScholarshipDetailsModal"

const API_URL = "http://localhost:5000/api"

export default function Dashboard() {
  const [user, setUser] = useState<UsersType | null>(null)
  const [selectedScholarship, setSelectedScholarship] = useState<Scholarship | null>(null)
  const [scholarships, setScholarships] = useState<Scholarship[]>([])
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [profileImage, setProfileImage] = useState("")
  const [activeTab, setActiveTab] = useState("applications") // Changed default to applications
  const [searchTerm, setSearchTerm] = useState("")
  const [filterLevel, setFilterLevel] = useState("all")
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const userStr = localStorage.getItem('user')
    if (!userStr) {
      navigate('/login')
      return
    }

    const userData = JSON.parse(userStr)
    
    // If user is admin, redirect to admin dashboard
    if (userData.role === 'admin' || userData.email === 'admin@gmail.com') {
      navigate('/admin/dashboard')
      return
    }
    
    setUser(userData)
    
    // Load profile image if exists
    const savedProfileImage = localStorage.getItem('profileImage')
    if (savedProfileImage) {
      setProfileImage(savedProfileImage)
    }
    
    fetchScholarships()
    fetchApplications()
  }, [navigate])

  const fetchScholarships = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('token')
      const response = await axios.get(`${API_URL}/scholarships?status=active`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setScholarships(response.data)
      setLoading(false)
    } catch (err) {
      setError("Failed to fetch scholarships")
      setLoading(false)
    }
  }

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem('token')
      // In a real app, this would fetch user's applications
      // const response = await axios.get(`${API_URL}/applications`, {
      //   headers: { Authorization: `Bearer ${token}` }
      // })
      // For now, using mock data
      setApplications([])
    } catch (err) {
      console.error("Failed to fetch applications")
    }
  }

  const handleApplyNow = (scholarship: Scholarship) => {
    localStorage.setItem('applying_scholarship', JSON.stringify(scholarship))
    
    if (scholarship.applicationLink) {
      window.open(scholarship.applicationLink, '_blank')
    } else {
      const confirmed = window.confirm(`Apply for ${scholarship.name}? This will submit your profile information.`)
      if (confirmed) {
        const newApplication = {
          id: Date.now().toString(),
          scholarshipName: scholarship.name,
          status: 'pending',
          appliedDate: new Date().toISOString().split('T')[0],
          amount: scholarship.amount,
          deadline: new Date(scholarship.applicationEndDate).toISOString().split('T')[0]
        }
        
        setApplications([newApplication, ...applications])
        alert(`Application for ${scholarship.name} submitted successfully!`)
      }
    }
  }

  const getFilteredScholarships = () => {
    return scholarships.filter(scholarship => {
      const matchesSearch = scholarship.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          scholarship.description.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesLevel = filterLevel === 'all' || 
                           scholarship.educationLevel.toLowerCase() === filterLevel.toLowerCase()
      
      return matchesSearch && matchesLevel
    })
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('profileImage')
    navigate('/login')
  }

  const handleViewDetails = (scholarship: Scholarship) => {
    setSelectedScholarship(scholarship)
    setIsDetailModalOpen(true)
  }

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false)
    setSelectedScholarship(null)
  }

  if (!user) return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
      <p className="ml-2 text-gray-600">Loading...</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Navigation Bar */}
      <nav className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo and Navigation Links */}
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <GraduationCap className="h-8 w-8 text-cyan-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">ScholarshipHub</span>
              </div>

              {/* Navigation Links */}
              <div className="hidden md:ml-8 md:flex md:space-x-8">
                <button
                  onClick={() => setActiveTab("applications")}
                  className={`px-3 py-2 text-sm font-medium border-b-2 ${
                    activeTab === "applications" 
                      ? "text-cyan-600 border-cyan-600" 
                      : "text-gray-500 border-transparent hover:text-cyan-600 hover:border-cyan-300"
                  } transition-colors`}
                >
                  My Applications
                </button>
                <Link
                  to="/"
                  className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-cyan-600 transition-colors flex items-center"
                >
                  <Home className="w-4 h-4 mr-1" />
                  Home
                </Link>
                <Link
                  to="/scholarships"
                  className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-cyan-600 transition-colors flex items-center"
                >
                  <BookOpen className="w-4 h-4 mr-1" />
                  Scholarships
                </Link>
                <Link
                  to="/kpr-programs"
                  className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-cyan-600 transition-colors flex items-center"
                >
                  <Trophy className="w-4 h-4 mr-1" />
                  KPR Programs
                </Link>
                <Link
                  to="/about"
                  className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-cyan-600 transition-colors flex items-center"
                >
                  <Users className="w-4 h-4 mr-1" />
                  About
                </Link>
                <Link
                  to="/contact"
                  className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-cyan-600 transition-colors flex items-center"
                >
                  <Phone className="w-4 h-4 mr-1" />
                  Contact
                </Link>
              </div>
            </div>

            {/* Right side - Notifications and Profile */}
            <div className="flex items-center space-x-4">
              <button className="rounded-full p-1 text-gray-500 hover:text-cyan-600 hover:bg-cyan-50 transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              
              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-3 text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                >
                  {profileImage ? (
                    <img className="h-8 w-8 rounded-full object-cover" src={profileImage} alt="Profile" />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-cyan-100 flex items-center justify-center">
                      <span className="text-cyan-800 font-medium text-sm">
                        {user?.name?.charAt(0).toUpperCase() || "U"}
                      </span>
                    </div>
                  )}
                  <span className="hidden md:block text-gray-700 font-medium">{user?.name}</span>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>

                {isProfileOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                    <div className="py-1">
                      <Link
                        to="/profile"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <User className="w-4 h-4 mr-2" />
                        Profile Settings
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden rounded-md p-2 text-gray-500 hover:text-cyan-600 hover:bg-cyan-50 transition-colors"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 bg-white">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <button
                  onClick={() => {
                    setActiveTab("applications")
                    setIsMobileMenuOpen(false)
                  }}
                  className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-cyan-600 hover:bg-cyan-50 rounded-md w-full text-left"
                >
                  My Applications
                </button>
                <Link
                  to="/"
                  className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-cyan-600 hover:bg-cyan-50 rounded-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/scholarships"
                  className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-cyan-600 hover:bg-cyan-50 rounded-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Scholarships
                </Link>
                <Link
                  to="/kpr-programs"
                  className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-cyan-600 hover:bg-cyan-50 rounded-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  KPR Programs
                </Link>
                <Link
                  to="/about"
                  className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-cyan-600 hover:bg-cyan-50 rounded-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  to="/contact"
                  className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-cyan-600 hover:bg-cyan-50 rounded-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-gray-600 mt-2">
            Track the status of your scholarship applications and discover new opportunities.
          </p>
        </div>

        {/* Applications Section - Always Show */}
        <div>
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">My Applications</h1>
            <p className="text-gray-600 mt-1">Track the status of your scholarship applications</p>
          </div>
          
          {applications.length === 0 ? (
            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <Clock className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No applications yet</h3>
              <p className="text-gray-500 mb-4">You haven't applied for any scholarships yet.</p>
              <Link
                to="/scholarships"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Browse Scholarships
              </Link>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Scholarship</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applied Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {applications.map((application) => (
                      <tr key={application.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{application.scholarshipName}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            application.status === 'approved' ? 'bg-green-100 text-green-800' :
                            application.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {application.appliedDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                          ${Number.parseFloat(application.amount).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-indigo-600 hover:text-indigo-900">View Details</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Scholarship Details Modal */}
      {selectedScholarship && (
        <ScholarshipDetailsModal
          scholarship={selectedScholarship}
          isOpen={isDetailModalOpen}
          onClose={handleCloseDetailModal}
          onApply={handleApplyNow}
        />
      )}
    </div>
  )
}
