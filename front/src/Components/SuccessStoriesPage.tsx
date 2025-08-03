"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import {
  GraduationCap,
  Menu,
  X,
  Award,
  Star,
  Quote,
  Filter,
  Search,
  TrendingUp,
  Users,
  DollarSign,
  ArrowRight,
  Mail,
  Phone,
} from "lucide-react"

export default function SuccessStoriesPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredStories, setFilteredStories] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const categories = [
    { id: "all", label: "All Stories", count: 24 },
    { id: "academic", label: "Academic Excellence", count: 8 },
    { id: "stem", label: "STEM", count: 6 },
    { id: "community", label: "Community Service", count: 5 },
    { id: "athletic", label: "Athletic", count: 3 },
    { id: "arts", label: "Arts & Culture", count: 2 },
  ]

  const successStories = [
    {
      id: 1,
      name: "Sarah Johnson",
      category: "academic",
      scholarship: "Merit Excellence Scholarship",
      amount: "$25,000",
      university: "Stanford University",
      major: "Computer Science",
      year: "2023",
      image: "/placeholder.svg?height=300&width=300&text=Sarah",
      quote:
        "This scholarship didn't just provide financial support - it opened doors to research opportunities and mentorship that shaped my entire academic journey.",
      story:
        "Sarah graduated valedictorian from her high school and received the Merit Excellence Scholarship to pursue her dream of studying Computer Science at Stanford. She's now working on AI research and has published three papers.",
      achievements: [
        "Published 3 research papers in AI",
        "Interned at Google and Microsoft",
        "Founded a coding bootcamp for underserved communities",
        "Graduated Summa Cum Laude",
      ],
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      category: "stem",
      scholarship: "STEM Innovation Grant",
      amount: "$30,000",
      university: "MIT",
      major: "Mechanical Engineering",
      year: "2022",
      image: "/placeholder.svg?height=300&width=300&text=Marcus",
      quote:
        "The scholarship program connected me with industry mentors who guided me through my engineering journey and helped me land my dream job.",
      story:
        "Marcus overcame financial hardships to pursue his passion for engineering. The STEM Innovation Grant enabled him to focus on his studies and research in renewable energy systems.",
      achievements: [
        "Developed a solar panel efficiency improvement system",
        "Won the National Engineering Design Competition",
        "Secured a position at Tesla's energy division",
        "Holds 2 provisional patents",
      ],
    },
    {
      id: 3,
      name: "Aisha Patel",
      category: "community",
      scholarship: "Community Leadership Award",
      amount: "$20,000",
      university: "Harvard University",
      major: "Public Policy",
      year: "2023",
      image: "/placeholder.svg?height=300&width=300&text=Aisha",
      quote:
        "This scholarship recognized my commitment to community service and gave me the platform to expand my impact on social justice issues.",
      story:
        "Aisha founded a nonprofit organization that provides educational resources to underprivileged children. Her community work earned her the Community Leadership Award.",
      achievements: [
        "Founded 'Education for All' nonprofit",
        "Served 500+ students in underserved communities",
        "Spoke at the UN Youth Climate Summit",
        "Received the President's Volunteer Service Award",
      ],
    },
    {
      id: 4,
      name: "David Chen",
      category: "athletic",
      scholarship: "Athletic Excellence Scholarship",
      amount: "$40,000",
      university: "UCLA",
      major: "Kinesiology",
      year: "2022",
      image: "/placeholder.svg?height=300&width=300&text=David",
      quote:
        "Balancing athletics and academics was challenging, but this scholarship gave me the support I needed to excel in both areas.",
      story:
        "David is a nationally ranked swimmer who received a full athletic scholarship. He's now pursuing a career in sports medicine while continuing to compete.",
      achievements: [
        "3-time NCAA Division I Champion",
        "Olympic Trials qualifier",
        "Team captain for 2 consecutive years",
        "Maintained 3.8 GPA throughout college",
      ],
    },
    {
      id: 5,
      name: "Emily Thompson",
      category: "arts",
      scholarship: "Creative Arts Scholarship",
      amount: "$15,000",
      university: "Juilliard School",
      major: "Music Performance",
      year: "2023",
      image: "/placeholder.svg?height=300&width=300&text=Emily",
      quote:
        "This scholarship allowed me to pursue my passion for music without the burden of financial stress, enabling me to focus entirely on my craft.",
      story:
        "Emily is a talented violinist who received the Creative Arts Scholarship to attend Juilliard. She's now performing with major orchestras worldwide.",
      achievements: [
        "Principal violinist in university orchestra",
        "Winner of International Young Artists Competition",
        "Performed at Carnegie Hall",
        "Signed with a major talent agency",
      ],
    },
    {
      id: 6,
      name: "James Wilson",
      category: "stem",
      scholarship: "Future Engineers Grant",
      amount: "$35,000",
      university: "Georgia Tech",
      major: "Biomedical Engineering",
      year: "2022",
      image: "/placeholder.svg?height=300&width=300&text=James",
      quote:
        "The scholarship program didn't just fund my education - it connected me with a network of professionals who became lifelong mentors.",
      story:
        "James developed a passion for biomedical engineering after his grandmother's battle with heart disease. His scholarship enabled him to focus on developing medical devices.",
      achievements: [
        "Developed a low-cost heart monitoring device",
        "Interned at Johns Hopkins Medical Center",
        "Co-founded a medical device startup",
        "Published research in Nature Biomedical Engineering",
      ],
    },
  ]

  const statistics = [
    {
      icon: Users,
      label: "Success Stories",
      value: "500+",
      description: "Students who achieved their dreams",
    },
    {
      icon: DollarSign,
      label: "Total Awarded",
      value: "$12M+",
      description: "In scholarship funding distributed",
    },
    {
      icon: GraduationCap,
      label: "Graduation Rate",
      value: "98%",
      description: "Of scholarship recipients graduate",
    },
    {
      icon: TrendingUp,
      label: "Career Success",
      value: "95%",
      description: "Find employment within 6 months",
    },
  ]

  useEffect(() => {
    let filtered = successStories

    if (selectedCategory !== "all") {
      filtered = filtered.filter((story) => story.category === selectedCategory)
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(
        (story) =>
          story.name.toLowerCase().includes(term) ||
          story.major.toLowerCase().includes(term) ||
          story.university.toLowerCase().includes(term) ||
          story.scholarship.toLowerCase().includes(term),
      )
    }

    setFilteredStories(filtered)
  }, [selectedCategory, searchTerm])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-cyan-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Loading success stories...</p>
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
              <Link to="/success-stories" className="text-cyan-600 font-medium border-b-2 border-cyan-600 pb-1">
                Success Stories
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
                to="/success-stories"
                className="block px-3 py-2 rounded-md text-base font-medium text-cyan-600 bg-cyan-50"
              >
                Success Stories
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
            <Award className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Success Stories</h1>
          <p className="text-xl md:text-2xl mb-4 opacity-90 max-w-3xl mx-auto">
            Inspiring journeys of students who achieved their dreams through scholarships
          </p>
          <p className="text-lg opacity-80 max-w-3xl mx-auto">
            Discover how our scholarship programs have transformed lives and opened doors to incredible opportunities.
          </p>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {statistics.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 text-center transform hover:-translate-y-2"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-lg font-semibold text-gray-800 mb-1">{stat.label}</div>
              <div className="text-sm text-gray-600">{stat.description}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center">
              <Filter className="w-5 h-5 text-cyan-600 mr-2" />
              <h2 className="text-lg font-semibold text-gray-900">Filter Stories</h2>
            </div>

            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search stories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent w-full md:w-64"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? "bg-cyan-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category.label} ({category.count})
              </button>
            ))}
          </div>
        </div>

        {/* Success Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStories.map((story) => (
            <div
              key={story.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2"
            >
              <div className="relative">
                <img src={story.image || "/placeholder.svg"} alt={story.name} className="w-full h-64 object-cover" />
                <div className="absolute top-4 right-4">
                  <span className="bg-white bg-opacity-90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-800">
                    {story.year}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-bold text-lg">{story.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{story.name}</h3>
                    <p className="text-sm text-gray-600">{story.university}</p>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Scholarship:</span>
                    <span className="text-sm font-medium text-gray-900">{story.scholarship}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Amount:</span>
                    <span className="text-sm font-semibold text-green-600">{story.amount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Major:</span>
                    <span className="text-sm font-medium text-gray-900">{story.major}</span>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <Quote className="w-5 h-5 text-cyan-600 mb-2" />
                  <p className="text-sm text-gray-700 italic">"{story.quote}"</p>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Key Achievements:</h4>
                  <ul className="space-y-1">
                    {story.achievements.slice(0, 2).map((achievement, index) => (
                      <li key={index} className="flex items-start">
                        <Star className="w-4 h-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:from-cyan-600 hover:to-blue-700 transition-colors">
                  Read Full Story
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl shadow-xl text-white p-8 text-center">
          <div className="w-16 h-16 bg-white bg-opacity-20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Ready to Write Your Success Story?</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of students who have achieved their dreams through our scholarship programs. Your journey to
            success starts here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/scholarships"
              className="bg-white text-cyan-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Browse Scholarships
            </Link>
            <Link
              to="/application-tips"
              className="bg-white bg-opacity-20 backdrop-blur-sm text-white px-8 py-3 rounded-xl font-semibold hover:bg-opacity-30 transition-colors border border-white border-opacity-30"
            >
              Application Tips
            </Link>
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
