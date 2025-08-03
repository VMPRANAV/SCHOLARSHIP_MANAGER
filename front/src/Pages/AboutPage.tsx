"use client"

import { useState, useEffect } from "react"
import { Target, Eye, Heart, Users, Award, TrendingUp, Globe, CheckCircle, Linkedin, Twitter } from "lucide-react"
import Navbar from "../Components/Layout/Navbar"
import Footer from "../Components/Layout/Footer"
import Header from "../Components/Layout/Header"

export default function AboutPage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const coreValues = [
    {
      icon: Target,
      title: "Excellence",
      description: "We strive for excellence in everything we do, from our scholarship programs to student support.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Heart,
      title: "Compassion",
      description: "We understand the challenges students face and approach every interaction with empathy and care.",
      color: "from-pink-500 to-rose-500",
    },
    {
      icon: Users,
      title: "Community",
      description: "We believe in building strong communities that support and uplift each other towards success.",
      color: "from-purple-500 to-indigo-500",
    },
    {
      icon: Globe,
      title: "Accessibility",
      description: "Education should be accessible to all. We work to remove barriers and create opportunities.",
      color: "from-green-500 to-emerald-500",
    },
  ]

  
  

  const statistics = [
    {
      icon: Users,
      label: "Students Served",
      value: "10,000+",
      description: "Across 50 states and 25 countries",
    },
    {
      icon: Award,
      label: "Scholarships Awarded",
      value: "$25M+",
      description: "In total funding distributed",
    },
    {
      icon: TrendingUp,
      label: "Success Rate",
      value: "95%",
      description: "Of our scholars graduate successfully",
    },
    {
      icon: Globe,
      label: "Partner Institutions",
      value: "200+",
      description: "Universities and organizations worldwide",
    },
  ]

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-cyan-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Loading about page...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar currentPage="about" />

      <Header
        title="About ScholarshipHub"
        subtitle="Empowering students worldwide through accessible education funding"
        icon={<Heart className="w-10 h-10 text-white" />}
      />

      {/* Mission & Vision */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mb-6">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              To democratize access to higher education by connecting deserving students with scholarship opportunities,
              removing financial barriers, and fostering a community of academic excellence and social impact.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                <span className="text-gray-700">Make education accessible to all</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                <span className="text-gray-700">Support underrepresented communities</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                <span className="text-gray-700">Foster academic excellence</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-6">
              <Eye className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              A world where every student, regardless of their financial background, has the opportunity to pursue
              higher education and achieve their full potential, creating positive change in their communities and
              beyond.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center">
                <CheckCircle className="w-5 h-5 text-purple-500 mr-3" />
                <span className="text-gray-700">Global educational equality</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-5 h-5 text-purple-500 mr-3" />
                <span className="text-gray-700">Empowered student communities</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-5 h-5 text-purple-500 mr-3" />
                <span className="text-gray-700">Sustainable social impact</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These values guide everything we do and shape how we interact with students, partners, and our community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 text-center transform hover:-translate-y-2"
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${value.color} rounded-full flex items-center justify-center mx-auto mb-6`}
                >
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Statistics */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Impact</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Numbers that reflect our commitment to making education accessible and our growing impact worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
        </div>

        
        </div>
        
      <Footer />
    </div>
    
  )
}
