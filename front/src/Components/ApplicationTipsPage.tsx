"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import {
  GraduationCap,
  Menu,
  X,
  BookOpen,
  CheckCircle,
  Download,
  FileText,
  Lightbulb,
  Target,
  Clock,
  Star,
  ArrowRight,
  Mail,
  Phone,
} from "lucide-react"

export default function ApplicationTipsPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("preparation")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const tabs = [
    { id: "preparation", label: "Preparation", icon: Target },
    { id: "writing", label: "Writing Tips", icon: FileText },
    { id: "submission", label: "Submission", icon: CheckCircle },
  ]

  const preparationTips = [
    {
      title: "Research Thoroughly",
      description: "Understand the scholarship requirements, mission, and values of the organization.",
      checklist: [
        "Read all eligibility requirements carefully",
        "Research the organization's history and values",
        "Understand what they're looking for in candidates",
        "Check previous winners' profiles if available",
      ],
    },
    {
      title: "Gather Required Documents",
      description: "Collect all necessary documents well before the deadline.",
      checklist: [
        "Official transcripts from all institutions",
        "Letters of recommendation (2-3 typically)",
        "Personal statement or essay",
        "Resume or CV",
        "Financial aid documents if required",
      ],
    },
    {
      title: "Plan Your Timeline",
      description: "Create a timeline working backwards from the deadline.",
      checklist: [
        "Set reminder dates for each component",
        "Allow extra time for unexpected delays",
        "Request recommendation letters 4-6 weeks early",
        "Start essays at least 3-4 weeks before deadline",
      ],
    },
  ]

  const writingTips = [
    {
      title: "Personal Statement Excellence",
      description: "Your personal statement is your chance to shine and stand out.",
      tips: [
        "Start with a compelling hook that grabs attention",
        "Tell your unique story with specific examples",
        "Show, don't just tell about your achievements",
        "Connect your goals to the scholarship's mission",
        "End with a strong conclusion about your future impact",
      ],
    },
    {
      title: "Essay Structure",
      description: "Follow a clear structure to make your essay easy to follow.",
      tips: [
        "Introduction: Hook + thesis statement",
        "Body: 2-3 main points with supporting evidence",
        "Use transitions between paragraphs",
        "Conclusion: Summarize and look forward",
        "Keep within word limits (usually 500-1000 words)",
      ],
    },
    {
      title: "Common Mistakes to Avoid",
      description: "Learn from others' mistakes to improve your chances.",
      tips: [
        "Don't use generic, template-style essays",
        "Avoid focusing only on financial need",
        "Don't repeat information from your resume",
        "Avoid controversial topics unless relevant",
        "Don't submit without proofreading multiple times",
      ],
    },
  ]

  const submissionTips = [
    {
      title: "Final Review Checklist",
      description: "Double-check everything before submitting your application.",
      checklist: [
        "All required documents are included",
        "Essays are within word limits",
        "Contact information is correct",
        "Deadlines are met with time to spare",
        "Application is complete and error-free",
      ],
    },
    {
      title: "Submission Best Practices",
      description: "Follow these practices for a smooth submission process.",
      checklist: [
        "Submit at least 24 hours before deadline",
        "Keep copies of all submitted materials",
        "Get confirmation receipt if available",
        "Follow up if you don't receive confirmation",
        "Note any reference numbers for tracking",
      ],
    },
    {
      title: "After Submission",
      description: "What to do after you've submitted your application.",
      checklist: [
        "Send thank you notes to recommenders",
        "Keep track of notification dates",
        "Continue applying to other scholarships",
        "Prepare for potential interviews",
        "Stay organized with a tracking system",
      ],
    },
  ]

  const resources = [
    {
      title: "Scholarship Application Checklist",
      description: "A comprehensive checklist to ensure you don't miss anything",
      type: "PDF",
      size: "2.3 MB",
    },
    {
      title: "Essay Writing Guide",
      description: "Step-by-step guide to writing compelling scholarship essays",
      type: "PDF",
      size: "1.8 MB",
    },
    {
      title: "Interview Preparation Worksheet",
      description: "Practice questions and tips for scholarship interviews",
      type: "PDF",
      size: "1.2 MB",
    },
    {
      title: "Financial Aid Calculator",
      description: "Calculate your expected family contribution and aid eligibility",
      type: "Excel",
      size: "0.5 MB",
    },
  ]

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-cyan-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Loading application tips...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center mr-3">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">ScholarshipHub</h1>
                  <p className="text-xs text-gray-500">Your Gateway to Education</p>
                </div>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-600 hover:text-cyan-600 font-medium transition-colors">
                Home
              </Link>
              <Link to="/scholarships" className="text-gray-600 hover:text-cyan-600 font-medium transition-colors">
                Scholarships
              </Link>
              <Link to="/kpr-programs" className="text-gray-600 hover:text-cyan-600 font-medium transition-colors">
                KPR Programs
              </Link>
              <Link to="/application-tips" className="text-cyan-600 font-medium border-b-2 border-cyan-600 pb-1">
                Application Tips
              </Link>
              <Link to="/contact" className="text-gray-600 hover:text-cyan-600 font-medium transition-colors">
                Contact
              </Link>
            </div>

            <div className="flex items-center">
              <Link
                to="/login"
                className="hidden md:block bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:from-cyan-600 hover:to-blue-700 transition-colors"
              >
                Admin Login
              </Link>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-md text-gray-500 hover:text-cyan-600 hover:bg-gray-100"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                to="/"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-cyan-600 hover:bg-cyan-50"
              >
                Home
              </Link>
              <Link
                to="/scholarships"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-cyan-600 hover:bg-cyan-50"
              >
                Scholarships
              </Link>
              <Link
                to="/kpr-programs"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-cyan-600 hover:bg-cyan-50"
              >
                KPR Programs
              </Link>
              <Link
                to="/application-tips"
                className="block px-3 py-2 rounded-md text-base font-medium text-cyan-600 bg-cyan-50"
              >
                Application Tips
              </Link>
              <Link
                to="/contact"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-cyan-600 hover:bg-cyan-50"
              >
                Contact
              </Link>
              <Link
                to="/login"
                className="block px-3 py-2 rounded-md text-base font-medium text-white bg-cyan-600 hover:bg-cyan-700 mt-2"
              >
                Admin Login
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-20 h-20 bg-white bg-opacity-20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
            <BookOpen className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Application Tips & Guidance</h1>
          <p className="text-xl md:text-2xl mb-4 opacity-90 max-w-3xl mx-auto">
            Master the art of scholarship applications with our comprehensive guide
          </p>
          <p className="text-lg opacity-80 max-w-3xl mx-auto">
            From preparation to submission, we'll help you create winning applications that stand out.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center transition-colors ${
                    activeTab === tab.id
                      ? "border-cyan-500 text-cyan-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <tab.icon className="w-5 h-5 mr-2" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {activeTab === "preparation" && (
              <div className="space-y-8">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Preparation Phase</h2>
                  <p className="text-gray-600">Set yourself up for success with proper preparation</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {preparationTips.map((tip, index) => (
                    <div key={index} className="bg-gray-50 rounded-xl p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-3">{tip.title}</h3>
                      <p className="text-gray-600 mb-4">{tip.description}</p>
                      <ul className="space-y-2">
                        {tip.checklist.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "writing" && (
              <div className="space-y-8">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Writing Excellence</h2>
                  <p className="text-gray-600">Craft compelling essays that capture attention</p>
                </div>

                <div className="space-y-8">
                  {writingTips.map((section, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-xl p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{section.title}</h3>
                      <p className="text-gray-600 mb-4">{section.description}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {section.tips.map((tip, tipIndex) => (
                          <div key={tipIndex} className="flex items-start">
                            <Lightbulb className="w-5 h-5 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{tip}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "submission" && (
              <div className="space-y-8">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Submission & Follow-up</h2>
                  <p className="text-gray-600">Ensure your application is submitted successfully</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {submissionTips.map((tip, index) => (
                    <div key={index} className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-3">{tip.title}</h3>
                      <p className="text-gray-600 mb-4">{tip.description}</p>
                      <ul className="space-y-2">
                        {tip.checklist.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start">
                            <Star className="w-5 h-5 text-cyan-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Downloadable Resources */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Downloadable Resources</h2>
            <p className="text-gray-600">Free tools and guides to help you succeed</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resources.map((resource, index) => (
              <div key={index} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{resource.title}</h3>
                    <p className="text-gray-600 mb-4">{resource.description}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <span className="bg-gray-100 px-2 py-1 rounded mr-2">{resource.type}</span>
                      <span>{resource.size}</span>
                    </div>
                  </div>
                  <button className="ml-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-3 rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-colors">
                    <Download className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pro Tips Section */}
        <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl shadow-xl text-white p-8 text-center">
          <div className="w-16 h-16 bg-white bg-opacity-20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6">
            <Target className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Pro Tips for Success</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6">
              <Clock className="w-8 h-8 text-white mx-auto mb-4" />
              <h3 className="font-bold mb-2">Start Early</h3>
              <p className="text-sm opacity-90">Begin your application process at least 2-3 months before deadlines</p>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6">
              <Star className="w-8 h-8 text-white mx-auto mb-4" />
              <h3 className="font-bold mb-2">Be Authentic</h3>
              <p className="text-sm opacity-90">Tell your genuine story rather than what you think they want to hear</p>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6">
              <CheckCircle className="w-8 h-8 text-white mx-auto mb-4" />
              <h3 className="font-bold mb-2">Follow Instructions</h3>
              <p className="text-sm opacity-90">
                Carefully read and follow all application requirements and guidelines
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center mr-3">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-300 bg-clip-text text-transparent">
                    ScholarshipHub
                  </h3>
                  <p className="text-sm text-gray-400">Your Gateway to Education</p>
                </div>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Your gateway to educational opportunities. We connect students with scholarships and funding programs to
                make higher education accessible for everyone.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/scholarships"
                    className="text-gray-400 hover:text-cyan-300 transition-colors flex items-center"
                  >
                    <ArrowRight className="w-4 h-4 mr-2" />
                    Browse Scholarships
                  </Link>
                </li>
                <li>
                  <Link
                    to="/kpr-programs"
                    className="text-gray-400 hover:text-cyan-300 transition-colors flex items-center"
                  >
                    <ArrowRight className="w-4 h-4 mr-2" />
                    KPR Programs
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-6">Contact Info</h4>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-cyan-900 bg-opacity-30 rounded-lg flex items-center justify-center mr-3">
                    <Mail className="w-5 h-5 text-cyan-400" />
                  </div>
                  <span className="text-gray-400">info@scholarshiphub.edu</span>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-cyan-900 bg-opacity-30 rounded-lg flex items-center justify-center mr-3">
                    <Phone className="w-5 h-5 text-cyan-400" />
                  </div>
                  <span className="text-gray-400">+1 (555) 123-4567</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© 2024 ScholarshipHub. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-gray-400 hover:text-cyan-300 transition-colors text-sm">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-cyan-300 transition-colors text-sm">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
