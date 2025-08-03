"use client"

import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { GraduationCap, DollarSign, Clock, Award, Sparkles, TrendingUp, User } from "lucide-react"
import axios from "axios"
import Navbar from "../Components/Layout/Navbar"
import Footer from "../Components/Layout/Footer"
import ScholarshipDetailsModal from "../Components/ScholarshipDetailsModal"
import ScholarshipFilters from "../Components/ScholarshipFilters"

const API_URL = "http://localhost:5000/api"

interface Scholarship {
  _id: string;
  name: string;
  description: string;
  amount: string;
  educationLevel: string;
  applicationEndDate: string;
  eligibility: string;
  community: string;
  genderRequirement: string;
  status: string;
  createdAt?: string;
  organizationLogo?: string;
  applicationLink?: string;
}

interface UserData {
  name: string;
  email: string;
  role?: string;
}

export default function ScholarshipsPage() {
  const location = useLocation()
  const navigate = useNavigate()

  // User authentication state
  const [user, setUser] = useState<UserData | null>(null)

  // Create a helper function to get search params
  const getSearchParam = (param: string) => {
    const urlParams = new URLSearchParams(location.search)
    return urlParams.get(param)
  }

  const [scholarships, setScholarships] = useState<Scholarship[]>([])
  const [filteredScholarships, setFilteredScholarships] = useState<Scholarship[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>("")
  const [selectedScholarship, setSelectedScholarship] = useState<Scholarship | null>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false)
  const [showFilters, setShowFilters] = useState<boolean>(false)

  // Filter states
  const [searchTerm, setSearchTerm] = useState<string>(getSearchParam("search") || "")
  const [educationLevel, setEducationLevel] = useState<string>(getSearchParam("level") || "All Levels")
  const [genderRequirement, setGenderRequirement] = useState<string>("All Genders")
  const [sortBy, setSortBy] = useState<string>("Name")
  const [amountRange, setAmountRange] = useState<number[]>([0, 100000])
  const [deadlineFrom, setDeadlineFrom] = useState<string>("")
  const [deadlineTo, setDeadlineTo] = useState<string>("")
  const [selectedCommunities, setSelectedCommunities] = useState<string[]>([])

  // Check user authentication on component mount
  useEffect(() => {
    const token = localStorage.getItem("token")
    const userStr = localStorage.getItem("user")
    
    if (token && userStr) {
      try {
        const userData = JSON.parse(userStr)
        setUser(userData)
      } catch (error) {
        console.error("Failed to parse user data:", error)
      }
    }
  }, [])

  const communities: string[] = [
    "STEM Students",
    "International Students", 
    "Graduate Students",
    "Engineering Students",
    "Future Leaders",
    "Women in Tech",
    "Minority Students",
    "First Generation",
    "Veterans",
    "Athletes",
  ]

  useEffect(() => {
    fetchScholarships()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [
    scholarships,
    searchTerm,
    educationLevel,
    genderRequirement,
    sortBy,
    amountRange,
    deadlineFrom,
    deadlineTo,
    selectedCommunities,
  ])

  const fetchScholarships = async (): Promise<void> => {
    try {
      setLoading(true)
      const response = await axios.get<Scholarship[]>(`${API_URL}/scholarships?status=active`)
      setScholarships(response.data)
      setLoading(false)
    } catch (err) {
      setError("Failed to fetch scholarships")
      setLoading(false)
    }
  }

  const applyFilters = (): void => {
    let filtered: Scholarship[] = [...scholarships]

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(
        (s: Scholarship) =>
          s.name.toLowerCase().includes(term) ||
          s.description.toLowerCase().includes(term) ||
          s.eligibility.toLowerCase().includes(term),
      )
    }

    // Education level filter
    if (educationLevel !== "All Levels") {
      filtered = filtered.filter((s: Scholarship) => s.educationLevel === educationLevel)
    }

    // Gender requirement filter
    if (genderRequirement !== "All Genders") {
      filtered = filtered.filter(
        (s: Scholarship) => s.genderRequirement === genderRequirement || s.genderRequirement === "All Genders",
      )
    }

    // Amount range filter
    filtered = filtered.filter((s: Scholarship) => {
      const amount = Number.parseFloat(s.amount)
      return amount >= amountRange[0] && amount <= amountRange[1]
    })

    // Deadline filters
    if (deadlineFrom) {
      filtered = filtered.filter((s: Scholarship) => new Date(s.applicationEndDate) >= new Date(deadlineFrom))
    }
    if (deadlineTo) {
      filtered = filtered.filter((s: Scholarship) => new Date(s.applicationEndDate) <= new Date(deadlineTo))
    }

    // Community filter
    if (selectedCommunities.length > 0) {
      filtered = filtered.filter((s: Scholarship) =>
        selectedCommunities.some(
          (community: string) => s.community && s.community.toLowerCase().includes(community.toLowerCase()),
        ),
      )
    }

    // Sort
    filtered.sort((a: Scholarship, b: Scholarship) => {
      switch (sortBy) {
        case "Amount":
          return Number.parseFloat(b.amount) - Number.parseFloat(a.amount)
        case "Deadline":
          return new Date(a.applicationEndDate).getTime() - new Date(b.applicationEndDate).getTime()
        default:
          return a.name.localeCompare(b.name)
      }
    })

    setFilteredScholarships(filtered)
  }

  const handleViewDetails = (scholarship: Scholarship): void => {
    setSelectedScholarship(scholarship)
    setIsDetailModalOpen(true)
  }

  const handleApply = (scholarship: Scholarship): void => {
    if (!user) {
      // If user is not logged in, redirect to login
      const confirmLogin = window.confirm("You need to be logged in to apply for scholarships. Would you like to sign in now?")
      if (confirmLogin) {
        navigate("/login")
      }
      return
    }

    if (scholarship.applicationLink) {
      window.open(scholarship.applicationLink, "_blank")
    } else {
      alert(`Application for ${scholarship.name} initiated. In a real app, this would open an application form.`)
    }
  }

  const toggleCommunity = (community: string): void => {
    setSelectedCommunities((prev: string[]) =>
      prev.includes(community) ? prev.filter((c: string) => c !== community) : [...prev, community],
    )
  }

  const handleCloseDetailModal = (): void => {
    setIsDetailModalOpen(false)
    setSelectedScholarship(null)
  }

  const getStatsData = () => {
    const totalAmount = filteredScholarships.reduce((sum: number, s: Scholarship) => sum + Number.parseFloat(s.amount), 0)
    const avgAmount = filteredScholarships.length > 0 ? totalAmount / filteredScholarships.length : 0
    const urgentDeadlines = filteredScholarships.filter((s: Scholarship) => {
      const deadline = new Date(s.applicationEndDate)
      const today = new Date()
      const diffDays = Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
      return diffDays <= 7 && diffDays > 0
    }).length

    return { totalAmount, avgAmount, urgentDeadlines }
  }

  const { totalAmount, avgAmount, urgentDeadlines } = getStatsData()

  // Enhanced ScholarshipGrid component with hover effects
  const EnhancedScholarshipGrid = () => {
    if (loading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-lg animate-pulse">
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-xl"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="h-3 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-8 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )
    }

    if (error) {
      return (
        <div className="text-center py-12">
          <div className="text-red-600 text-lg">{error}</div>
        </div>
      )
    }

    if (filteredScholarships.length === 0) {
      return (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">No scholarships found</div>
        </div>
      )
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredScholarships.map((scholarship) => (
          <div
            key={scholarship._id}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden transform hover:-translate-y-4 hover:scale-105 cursor-pointer group"
          >
            <div className="p-1">
              <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-6 rounded-t-xl group-hover:from-cyan-100 group-hover:to-blue-100 transition-all duration-300">
                {/* Scholarship Header */}
                <div className="flex items-center mb-4">
                  {scholarship.organizationLogo ? (
                    <img
                      src={scholarship.organizationLogo || "/placeholder.svg"}
                      alt="Logo"
                      className="w-16 h-16 rounded-xl object-cover mr-4 bg-white p-2 shadow-sm group-hover:shadow-md transition-all duration-300"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center mr-4 shadow-sm group-hover:shadow-md group-hover:from-cyan-600 group-hover:to-blue-700 transition-all duration-300">
                      <span className="text-white font-bold text-lg">
                        {scholarship.name.substring(0, 2).toUpperCase()}
                      </span>
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-lg leading-tight group-hover:text-cyan-700 transition-colors duration-300">
                      {scholarship.name}
                    </h3>
                    <div className="flex items-center mt-1">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 group-hover:bg-green-200 transition-all duration-300">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-1 group-hover:bg-green-600 transition-all duration-300"></span>
                        Active
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6">
                {/* Scholarship Details */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center">
                    <DollarSign className="w-4 h-4 text-green-600 mr-2 group-hover:text-green-700 transition-colors duration-300" />
                    <span className="text-sm text-gray-500">Amount:</span>
                    <span className="font-semibold text-green-600 ml-auto group-hover:text-green-700 transition-colors duration-300">
                      ${Number.parseFloat(scholarship.amount).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <GraduationCap className="w-4 h-4 text-cyan-600 mr-2 group-hover:text-cyan-700 transition-colors duration-300" />
                    <span className="text-sm text-gray-500">Level:</span>
                    <span className="font-medium text-gray-900 ml-auto group-hover:text-gray-800 transition-colors duration-300">
                      {scholarship.educationLevel}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 text-red-600 mr-2 group-hover:text-red-700 transition-colors duration-300" />
                    <span className="text-sm text-gray-500">Deadline:</span>
                    <span className="font-medium text-red-600 ml-auto group-hover:text-red-700 transition-colors duration-300">
                      {new Date(scholarship.applicationEndDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-6 line-clamp-3 min-h-[60px] group-hover:text-gray-700 transition-colors duration-300">
                  {scholarship.description}
                </p>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => handleApply(scholarship)}
                    className={`flex-1 ${
                      user 
                        ? "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white" 
                        : "bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 text-white"
                    } py-2.5 px-4 rounded-lg font-medium transition-all duration-300 shadow hover:shadow-lg flex items-center justify-center transform hover:scale-105`}
                    title={user ? "Apply now" : "Login required to apply"}
                  >
                    {user ? "Apply Now" : "Login to Apply"}
                  </button>
                  <button 
                    onClick={() => handleViewDetails(scholarship)}
                    className="px-4 py-2.5 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 transform hover:scale-105"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-cyan-50/30">
      <Navbar currentPage="scholarships" />

      {/* Hero Section with User Context */}
      <div className="bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                <GraduationCap className="w-8 h-8" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">
                {user ? `Welcome back, ${user.name}!` : "Discover Your Perfect Scholarship"}
              </h1>
            </div>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              {user 
                ? "Continue exploring scholarship opportunities tailored for you."
                : "Unlock your potential with thousands of scholarship opportunities. Find funding that matches your goals, background, and aspirations."
              }
            </p>

            {/* User Status Indicator */}
            {user && (
              <div className="mb-8 flex items-center justify-center gap-2 text-blue-100">
                <User className="w-5 h-5" />
                <span>Signed in as {user.email}</span>
              </div>
            )}

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Award className="w-6 h-6 text-yellow-300" />
                  <span className="text-2xl font-bold">{filteredScholarships.length}</span>
                </div>
                <p className="text-blue-100">Available Scholarships</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <DollarSign className="w-6 h-6 text-green-300" />
                  <span className="text-2xl font-bold">${avgAmount.toLocaleString()}</span>
                </div>
                <p className="text-blue-100">Average Award</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Clock className="w-6 h-6 text-orange-300" />
                  <span className="text-2xl font-bold">{urgentDeadlines}</span>
                </div>
                <p className="text-blue-100">Urgent Deadlines</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Enhanced Filters Section */}
        <div className="mb-8">
          <ScholarshipFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            educationLevel={educationLevel}
            setEducationLevel={setEducationLevel}
            genderRequirement={genderRequirement}
            setGenderRequirement={setGenderRequirement}
            sortBy={sortBy}
            setSortBy={setSortBy}
            showFilters={showFilters}
            setShowFilters={setShowFilters}
            filteredScholarships={filteredScholarships}
            loading={loading}
          />
        </div>

        {/* Results Summary */}
        {!loading && (
          <div className="mb-8 p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-cyan-600" />
                  <span className="text-lg font-semibold text-gray-900">
                    {filteredScholarships.length} scholarships found
                  </span>
                </div>
                {searchTerm && (
                  <span className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-sm font-medium">
                    Searching: "{searchTerm}"
                  </span>
                )}
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  <span>Total Value: ${totalAmount.toLocaleString()}</span>
                </div>
                {urgentDeadlines > 0 && (
                  <div className="flex items-center gap-1 text-orange-600">
                    <Clock className="w-4 h-4" />
                    <span>
                      {urgentDeadlines} urgent deadline{urgentDeadlines !== 1 ? "s" : ""}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Scholarship Grid */}
        <EnhancedScholarshipGrid />
      </div>

      <Footer />

      {/* Enhanced Detailed Modal */}
      {selectedScholarship && (
        <ScholarshipDetailsModal
          scholarship={selectedScholarship}
          isOpen={isDetailModalOpen}
          onClose={handleCloseDetailModal}
          onApply={handleApply}
        />
      )}
    </div>
  )
}