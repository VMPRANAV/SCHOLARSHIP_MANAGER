"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Search, Award, Users, DollarSign, GraduationCap, ChevronDown, Clock, ArrowRight } from "lucide-react"
import axios from "axios"
import Navbar from "../Components/Layout/Navbar"
import Footer from "../Components/Layout/Footer"
import { Scholarship } from "@/types/scholarship"
import ScholarshipDetailsModal from "@/Components/ScholarshipDetailsModal"
const API_URL = "http://localhost:5000/api"

export default function LandingPage() {
 const [searchTerm, setSearchTerm] = useState("")
  const [educationLevel, setEducationLevel] = useState("All Levels")
  const [scholarships, setScholarships] = useState<Scholarship[]>([])
  const [selectedScholarship, setSelectedScholarship] = useState<Scholarship | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [stats, setStats] = useState({
    totalScholarships: 6,
    studentsHelped: 1000,
    totalFunding: 5000000,
  })
  const navigate = useNavigate()

  useEffect(() => {
    fetchScholarships()
  }, [])

  const fetchScholarships = async () => {
    try {
      const response = await axios.get(`${API_URL}/scholarships?status=active`)
      setScholarships(response.data)
      setStats((prev) => ({
        ...prev,
        totalScholarships: response.data.length,
      }))
    } catch (err) {
      console.error("Failed to fetch scholarships")
    }
  }
  const handleViewDetails = (scholarship: Scholarship) => {
    setSelectedScholarship(scholarship)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedScholarship(null)
  }
  const handleApply = (scholarship: Scholarship) => {
    // Close modal first
    handleCloseModal()
    // Navigate to login or application page
    navigate("/login")
  }

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (searchTerm) params.append("search", searchTerm)
    if (educationLevel !== "All Levels") params.append("level", educationLevel)
    navigate(`/scholarships?${params.toString()}`)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar currentPage="home" />

      {/* Enhanced Hero Section */}
      <div className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white relative overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 left-0 right-0 bottom-0 opacity-10">
    <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-white flex items-center justify-center">
      <GraduationCap className="w-20 h-20 text-cyan-600" />
    </div>
    <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-blue-300 flex items-center justify-center">
      <DollarSign className="w-25 h-25 text-cyan-900"></DollarSign>
    </div>
    <div className="absolute top-40 right-20 w-20 h-20 rounded-full bg-cyan-200 flex items-center justify-center">
       <Award className="w-10 h-10 text-cyan-600"></Award>
    </div>
  </div>
        

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative z-10">
          <div className="text-center">
            {/* Icon */}
            <div className="w-20 h-20 bg-blue-500 bg-opacity-20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
              <GraduationCap className="w-10 h-10   text-white" />
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Find Your Perfect
              <br />
              <span className="text-cyan-100">Scholarship</span>
            </h1>

            {/* Description */}
            <p className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed opacity-90">
              Discover hundreds of scholarships and funding opportunities to support your educational journey. Your
              future starts here with our comprehensive scholarship database.
            </p>

            {/* Enhanced Search Section */}
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl p-6 shadow-2xl">
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Search Input */}
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search scholarships by name, organization, or keywords..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="w-full pl-12 pr-4 py-4 text-gray-700 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all shadow-sm hover:shadow-md"
                    />
                  </div>

                  {/* Education Level Dropdown */}
                  <div className="relative">
                    <select
                      value={educationLevel}
                      onChange={(e) => setEducationLevel(e.target.value)}
                      className="appearance-none bg-white border border-gray-200 rounded-xl px-6 py-4 pr-12 text-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent cursor-pointer transition-all shadow-sm hover:shadow-md"
                    >
                      <option value="All Levels">All Levels</option>
                      <option value="High School">High School</option>
                      <option value="Bachelor's">Bachelor's</option>
                      <option value="Master's">Master's</option>
                      <option value="PhD">PhD</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                  </div>

                  {/* Search Button */}
                  <button
                    onClick={handleSearch}
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 whitespace-nowrap"
                  >
                    Search Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Statistics Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Available Scholarships */}
            <div className="text-center bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2 duration-300">
              <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-cyan-600" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">{stats.totalScholarships}+</div>
              <div className="text-gray-600 font-medium">Available Scholarships</div>
            </div>

            {/* Students Helped */}
            <div className="text-center bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2 duration-300">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">1000+</div>
              <div className="text-gray-600 font-medium">Students Helped</div>
            </div>

            {/* Total Funding */}
            <div className="text-center bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2 duration-300">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-purple-600" />
              </div>organizationLogo
              <div className="text-4xl font-bold text-gray-900 mb-2">$5M+</div>
              <div className="text-gray-600 font-medium">Total Funding</div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Featured Scholarships */}
      {scholarships.length > 0 && (
        <div className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-cyan-600 font-semibold uppercase tracking-wider">Opportunities</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">Featured Scholarships</h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Explore some of our most popular scholarship opportunities and take the first step toward your academic
                goals
              </p>
            </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {scholarships.slice(0, 6).map((scholarship) => (
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
                className="w-16 h-16 rounded-xl object-cover mr-4 bg-black p-2 shadow-sm group-hover:shadow-md transition-all duration-300"
              />
            ) : (
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center mr-4 shadow-sm group-hover:shadow-md group-hover:from-cyan-600 group-hover:to-blue-700 transition-all duration-300">
                <span className="text-white font-bold text-lg">
                  {scholarship.name.substring(0, 2).toUpperCase()}
                </span>
              </div>
            )}
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 text-lg leading-tight group-hover:text-cyan-700 transition-colors duration-300">{scholarship.name}</h3>
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
              <span className="font-medium text-gray-900 ml-auto group-hover:text-gray-800 transition-colors duration-300">{scholarship.educationLevel}</span>
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
          <p className="text-gray-600 text-sm mb-6 line-clamp-3 min-h-[60px] group-hover:text-gray-700 transition-colors duration-300">{scholarship.description}</p>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => navigate("/login")}
              className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-2.5 px-4 rounded-lg font-medium hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 shadow hover:shadow-lg flex items-center justify-center transform hover:scale-105"
            >
              Apply Now
            </button>
            <button 
            onClick={() => handleViewDetails(scholarship)}
            className="px-4 py-2.5 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 transform hover:scale-105">
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  ))}
</div>
            <div className="text-center mt-12">
              <button
                onClick={() => navigate("/scholarships")}
                className="inline-flex items-center bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                View All Scholarships
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Help Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
            <div className="text-center">
              <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-cyan-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Need Help?</h2>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                Our team is here to assist you with the application process and answer any questions you may have. Don't
                hesitate to reach out!
              </p>
              <button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
       {/* Scholarship Details Modal */}
      {selectedScholarship && (
        <ScholarshipDetailsModal
          scholarship={selectedScholarship}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onApply={handleApply}
        />
      )}

      <Footer />
    </div>
  )
}
