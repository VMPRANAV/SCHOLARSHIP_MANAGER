"use client"
import { useState } from "react"
import { Download, Eye, Award } from "lucide-react"
import Navbar from "../Components/Layout/Navbar"
import Footer from "../Components/Layout/Footer"
import Header from "../Components/Layout/Header"
import KPRProgramDetailedModal from "../Components/KPRProgramDetailedModal"
import { KPRProgram } from "@/types/scholarship"

export default function KPRPrograms() {
  const [selectedProgram, setSelectedProgram] = useState<KPRProgram | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const programs: KPRProgram[] = [
    {
      id: 1,
      name: "KPR Merit Scholarship",
      subtitle: "Academic Excellence Program",
      type: "NEW/RENEWAL",
      status: "Available",
      description: "For students with outstanding academic performance in engineering and graduate studies",
      icon: "KPR",
      color: "bg-cyan-600",
      bgColor: "bg-cyan-50",
      textColor: "text-cyan-600",
      amount: "$5,000",
      educationLevel: "Engineering & Graduate",
      applicationEndDate: "2025-12-31",
      eligibility: [
        "Must be enrolled in an Engineering program or Graduate studies",
        "Minimum GPA of 3.5 on a 4.0 scale",
        "Full-time student status required",
        "Must be a citizen or permanent resident",
        "Demonstrate academic excellence and leadership potential"
      ],
      requirements: [
        "Completed application form",
        "Official academic transcripts",
        "Two letters of recommendation from faculty members",
        "Personal statement (500 words maximum)",
        "Proof of enrollment in engineering or graduate program",
        "Financial need documentation (if applicable)"
      ],
      benefits: [
        "Financial support of $5,000 per academic year",
        "Mentorship opportunities with industry professionals",
        "Access to exclusive networking events",
        "Priority consideration for internship programs",
        "Certificate of recognition",
        "Renewable for up to 4 years (subject to academic performance)"
      ],
      applicationProcess: [
        "Download and complete the application form",
        "Gather all required documents and transcripts",
        "Obtain two faculty recommendation letters",
        "Submit complete application package before deadline",
        "Participate in interview process (if selected)",
        "Await final decision notification"
      ]
    },
    {
      id: 2,
      name: "KPR Sports Scholarship",
      subtitle: "Athletic Excellence Program",
      type: "NEW/RENEWAL",
      status: "Available",
      description: "For students with exceptional athletic achievements and sports excellence",
      icon: "KPR",
      color: "bg-green-600",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
      amount: "$3,500",
      educationLevel: "All Levels",
      applicationEndDate: "2025-11-30",
      eligibility: [
        "Demonstrated excellence in sports or athletic activities",
        "Must be a student-athlete in recognized sports",
        "Minimum GPA of 3.0 on a 4.0 scale",
        "Active participation in college/university sports teams",
        "Display sportsmanship and leadership qualities"
      ],
      requirements: [
        "Completed sports scholarship application form",
        "Athletic performance records and achievements",
        "Coach recommendation letter",
        "Academic transcripts",
        "Sports participation certificates",
        "Medical clearance certificate",
        "Personal essay on sports achievements and goals"
      ],
      benefits: [
        "Financial support of $3,500 per academic year",
        "Access to advanced sports training facilities",
        "Sports equipment and gear allowance",
        "Participation in elite sports development programs",
        "Sports medicine and physiotherapy support",
        "Career guidance in sports-related fields"
      ],
      applicationProcess: [
        "Complete the sports scholarship application",
        "Submit athletic performance documentation",
        "Obtain coach recommendation and endorsement",
        "Provide academic transcripts and records",
        "Attend sports skill assessment (if required)",
        "Complete interview with sports committee"
      ]
    },
  ]

  const handleDownloadForm = (program: KPRProgram) => {
    // In a real application, this would download the actual PDF
    alert(`Downloading application form for ${program.name}`)
  }

  const handleViewDetails = (program: KPRProgram) => {
    setSelectedProgram(program)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedProgram(null)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar currentPage="kpr-programs" />

      <Header
        title="KPR Scholarship Programs"
        subtitle="Special scholarship programs with dedicated application forms and requirements."
        icon={<Award className="w-10 h-10 text-white" />}
      />

      {/* Enhanced Programs Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {programs.map((program) => (
            <div
              key={program.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 transform hover:-translate-y-4 hover:scale-105 cursor-pointer group"
            >
              <div className="p-8">
                {/* Program Header */}
                <div className="flex items-center mb-6">
                  <div
                    className={`w-16 h-16 ${program.color} rounded-xl flex items-center justify-center mr-4 shadow-md group-hover:shadow-lg transition-all duration-300`}
                  >
                    <span className="text-white font-bold text-xl">{program.icon}</span>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-1 group-hover:text-cyan-700 transition-colors duration-300">
                      {program.name}
                    </h2>
                    <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                      {program.subtitle}
                    </p>
                  </div>
                </div>

                {/* Program Details */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <span className="text-sm font-medium text-gray-500">Program Type:</span>
                    <div className="mt-1">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800 group-hover:bg-gray-200 transition-all duration-300">
                        {program.type}
                      </span>
                    </div>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Application Status:</span>
                    <div className="mt-1">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 group-hover:bg-green-200 transition-all duration-300">
                        {program.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Amount Display */}
                <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-medium text-blue-700">Scholarship Amount:</span>
                    <span className="text-lg font-bold text-blue-900">{program.amount}</span>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-8">
                  <p className="text-gray-700 group-hover:text-gray-800 transition-colors duration-300">
                    {program.description}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="space-y-4">
                  <button
                    onClick={() => handleDownloadForm(program)}
                    className={`w-full ${program.color} text-white py-3 px-6 rounded-xl font-semibold hover:opacity-90 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 hover:scale-105 flex items-center justify-center duration-300`}
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Download Application Form (PDF)
                  </button>

                  <button
                    onClick={() => handleViewDetails(program)}
                    className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
                  >
                    <Eye className="w-5 h-5 mr-2" />
                    View Program Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Help Section */}
        <div className="mt-20 bg-white rounded-2xl shadow-xl border border-gray-100 p-10 text-center">
          <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Award className="w-8 h-8 text-cyan-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Need Help?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Our team is here to assist you with the application process and answer any questions you may have.
          </p>
          <button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
            Contact Support
          </button>
        </div>
      </div>

      <Footer />

      {/* KPR Program Details Modal */}
      <KPRProgramDetailedModal
        program={selectedProgram}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onDownload={handleDownloadForm}
      />
    </div>
  )
}