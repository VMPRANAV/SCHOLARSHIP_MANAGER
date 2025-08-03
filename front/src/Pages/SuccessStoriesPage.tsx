"use client"

import { useState, useEffect } from "react"
import { Award, Star, Quote, Filter, Search, TrendingUp, Users, DollarSign, GraduationCap } from "lucide-react"
import Navbar from "../Components/Layout/Navbar"
import Footer from "../Components/Layout/Footer"
import Header from "../Components/Layout/Header"

export default function SuccessStoriesPage() {
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
      <Navbar currentPage="success-stories" />

      <Header
        title="Success Stories"
        subtitle="Inspiring journeys of students who achieved their dreams through scholarships"
        icon={<Award className="w-10 h-10 text-white" />}
      />

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
            <button
              onClick={() => (window.location.href = "/scholarships")}
              className="bg-white text-cyan-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Browse Scholarships
            </button>
            <button
              onClick={() => (window.location.href = "/application-tips")}
              className="bg-white bg-opacity-20 backdrop-blur-sm text-white px-8 py-3 rounded-xl font-semibold hover:bg-opacity-30 transition-colors border border-white border-opacity-30"
            >
              Application Tips
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
