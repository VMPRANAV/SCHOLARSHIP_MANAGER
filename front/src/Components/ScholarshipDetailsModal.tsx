"use client"
import React from 'react'
import {
  X,
  DollarSign,
  GraduationCap,
  Calendar,
  Users,
  Shield,
  CheckCircle,
  ExternalLink,
  Award,
  Clock,
} from "lucide-react"
import { Scholarship } from '../types/scholarship'

interface ScholarshipDetailsModalProps {
  scholarship: Scholarship
  isOpen: boolean
  onClose: () => void
  onApply: (scholarship: Scholarship) => void
}

export default function ScholarshipDetailsModal({
  scholarship,
  isOpen,
  onClose,
  onApply,
}: ScholarshipDetailsModalProps) {
  if (!isOpen) return null

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    } catch {
      return dateString
    }
  }

  const formatAmount = (amount: string) => {
    const cleanAmount = amount.replace(/[^0-9.-]/g, '')
    const numAmount = parseFloat(cleanAmount)
    return isNaN(numAmount) ? amount : `$${numAmount.toLocaleString()}`
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .substring(0, 2)
      .toUpperCase()
  }

  const getDaysUntilDeadline = () => {
    const deadline = new Date(scholarship.applicationEndDate)
    const today = new Date()
    const diffTime = deadline.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const daysLeft = getDaysUntilDeadline()
  const isUrgent = daysLeft <= 7 && daysLeft > 0
  const isExpired = daysLeft < 0

  const getStatusBadge = () => {
    if (isExpired) {
      return <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">Expired</span>
    }
    if (isUrgent) {
      return <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">Urgent</span>
    }
    if (scholarship.status === 'active') {
      return <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Active</span>
    }
    return <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">Inactive</span>
  }

  const getCategoryTags = () => {
    const tags = []
    if (scholarship.educationLevel) {
      tags.push({ label: scholarship.educationLevel, color: "bg-blue-100 text-blue-700" })
    }
    if (scholarship.community && scholarship.community !== 'All Students') {
      tags.push({ label: scholarship.community, color: "bg-purple-100 text-purple-700" })
    }
    if (scholarship.genderRequirement && scholarship.genderRequirement !== 'All Genders') {
      tags.push({ label: scholarship.genderRequirement, color: "bg-pink-100 text-pink-700" })
    }
    return tags
  }

  const getEligibilityPoints = () => {
    return scholarship.eligibility
      .split('.')
      .filter(req => req.trim())
      .map(req => req.trim())
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[95vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 px-8 py-6 rounded-t-3xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Scholarship Details</h2>
                <p className="text-sm text-gray-500">Complete information and requirements</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-3 hover:bg-gray-100 rounded-full transition-all duration-200 hover:scale-105"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>
        </div>

        <div className="p-8">
          {/* Scholarship Header */}
          <div className="flex items-start gap-6 mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg">
              {scholarship.organizationLogo ? (
                <img
                  src={scholarship.organizationLogo}
                  alt="Organization"
                  className="w-20 h-20 rounded-2xl object-cover"
                />
              ) : (
                getInitials(scholarship.name)
              )}
            </div>
            <div className="flex-1">
              <h3 className="text-3xl font-bold text-gray-900 mb-3">{scholarship.name}</h3>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">{scholarship.description}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {getStatusBadge()}
                {getCategoryTags().map((tag, index) => (
                  <span key={index} className={`px-3 py-1 rounded-full text-xs font-medium ${tag.color}`}>
                    {tag.label}
                  </span>
                ))}
              </div>

              {/* Deadline Alert */}
              {!isExpired && (
                <div
                  className={`flex items-center gap-2 p-3 rounded-xl ${
                    isUrgent ? "bg-orange-50 border border-orange-200" : "bg-blue-50 border border-blue-200"
                  }`}
                >
                  <Clock className={`w-4 h-4 ${isUrgent ? "text-orange-600" : "text-blue-600"}`} />
                  <span className={`text-sm font-medium ${isUrgent ? "text-orange-800" : "text-blue-800"}`}>
                    {daysLeft === 1 ? "1 day left" : `${daysLeft} days left`} to apply
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Key Information Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Amount */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-blue-500 rounded-lg">
                  <DollarSign className="w-5 h-5 text-white" />
                </div>
                <span className="text-blue-700 font-semibold">Amount</span>
              </div>
              <div className="text-3xl font-bold text-blue-900">{formatAmount(scholarship.amount)}</div>
              <p className="text-blue-600 text-sm mt-1">Scholarship value</p>
            </div>

            {/* Level */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border border-green-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-green-500 rounded-lg">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
                <span className="text-green-700 font-semibold">Level</span>
              </div>
              <div className="text-2xl font-bold text-green-900">{scholarship.educationLevel}</div>
              <p className="text-green-600 text-sm mt-1">Education level</p>
            </div>

            {/* Deadline */}
            <div
              className={`bg-gradient-to-br rounded-2xl p-6 border ${
                isUrgent
                  ? "from-orange-50 to-orange-100 border-orange-200"
                  : "from-purple-50 to-purple-100 border-purple-200"
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`p-2 rounded-lg ${isUrgent ? "bg-orange-500" : "bg-purple-500"}`}>
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <span className={`font-semibold ${isUrgent ? "text-orange-700" : "text-purple-700"}`}>Deadline</span>
              </div>
              <div className={`text-xl font-bold ${isUrgent ? "text-orange-900" : "text-purple-900"}`}>
                {formatDate(scholarship.applicationEndDate)}
              </div>
              <p className={`text-sm mt-1 ${isUrgent ? "text-orange-600" : "text-purple-600"}`}>Application deadline</p>
            </div>
          </div>

          {/* Detailed Information */}
          <div className="bg-gray-50 rounded-2xl p-8 mb-8 border border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <Award className="w-6 h-6 text-gray-700" />
              <h4 className="text-xl font-bold text-gray-900">Scholarship Information</h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <span className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Community</span>
                  <div className="text-gray-900 mt-2 text-lg">{scholarship.community || 'All Students'}</div>
                </div>

                <div>
                  <span className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Gender Requirement</span>
                  <div className="text-gray-900 mt-2 text-lg">{scholarship.genderRequirement}</div>
                </div>

                <div>
                  <span className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Status</span>
                  <div className="flex items-center gap-2 mt-2">{getStatusBadge()}</div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <span className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Application End Date</span>
                  <div className="text-gray-900 mt-2 text-lg">{formatDate(scholarship.applicationEndDate)}</div>
                </div>

                {scholarship.createdAt && (
                  <div>
                    <span className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Created Date</span>
                    <div className="text-gray-900 mt-2 text-lg">{formatDate(scholarship.createdAt)}</div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Eligibility Requirements */}
          <div className="bg-white border-2 border-gray-100 rounded-2xl p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <Users className="w-6 h-6 text-gray-700" />
              <h4 className="text-xl font-bold text-gray-900">Eligibility Requirements</h4>
            </div>

            <div className="space-y-4">
              {getEligibilityPoints().map((requirement, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 bg-green-50 rounded-xl border border-green-100"
                >
                  <CheckCircle className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 text-lg leading-relaxed">{requirement}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Application Information */}
          {scholarship.applicationLink && (
            <div className="bg-gradient-to-r from-cyan-50 to-blue-50 border-2 border-cyan-200 rounded-2xl p-8 mb-8">
              <h4 className="text-xl font-bold text-cyan-900 mb-4">Application Information</h4>
              <p className="text-cyan-800 mb-6 text-lg">
                Ready to apply? Click the button below to access the official application form and start your journey.
              </p>
              <a
                href={scholarship.applicationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-cyan-600 hover:text-cyan-800 font-semibold text-lg transition-colors"
              >
                <ExternalLink className="w-5 h-5" />
                View Application Form
              </a>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t-2 border-gray-100">
            <button
              onClick={() => onApply(scholarship)}
              disabled={isExpired}
              className={`flex-1 py-4 px-8 rounded-2xl font-bold text-lg transition-all duration-200 flex items-center justify-center gap-3 ${
                isExpired
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-600 hover:to-blue-700 hover:scale-105 shadow-lg hover:shadow-xl"
              }`}
            >
              <ExternalLink className="w-6 h-6" />
              {isExpired ? "Application Closed" : "Apply Now"}
            </button>
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none bg-gray-100 text-gray-700 py-4 px-8 rounded-2xl font-bold text-lg hover:bg-gray-200 transition-all duration-200 hover:scale-105"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}