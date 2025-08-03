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
  Trophy,
  BookOpen,
  Download,
} from "lucide-react"

import { KPRProgram,KPRProgramDetailedModalProps } from '@/types/scholarship'



export default function KPRProgramDetailedModal({
  program,
  isOpen,
  onClose,
  onDownload,
}: KPRProgramDetailedModalProps) {
  if (!isOpen || !program) return null

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

  const getDaysUntilDeadline = () => {
    const deadline = new Date(program.applicationEndDate)
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
    if (program.status === 'Available') {
      return <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Available</span>
    }
    return <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">Closed</span>
  }

  const getProgramIcon = () => {
    if (program.name.includes("Merit")) {
      return <BookOpen className="w-8 h-8 text-white" />
    }
    if (program.name.includes("Sports")) {
      return <Trophy className="w-8 h-8 text-white" />
    }
    return <Award className="w-8 h-8 text-white" />
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
                <h2 className="text-2xl font-bold text-gray-900">KPR Program Details</h2>
                <p className="text-sm text-gray-500">Complete program information and requirements</p>
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
          {/* Program Header */}
          <div className="flex items-start gap-6 mb-8">
            <div className={`w-20 h-20 ${program.color} rounded-2xl flex items-center justify-center shadow-lg`}>
              {getProgramIcon()}
            </div>
            <div className="flex-1">
              <h3 className="text-3xl font-bold text-gray-900 mb-3">{program.name}</h3>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">{program.subtitle}</p>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">{program.description}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {getStatusBadge()}
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                  {program.type}
                </span>
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                  KPR Institute
                </span>
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
              <div className="text-3xl font-bold text-blue-900">{program.amount}</div>
              <p className="text-blue-600 text-sm mt-1">Program value</p>
            </div>

            {/* Level */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border border-green-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-green-500 rounded-lg">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
                <span className="text-green-700 font-semibold">Level</span>
              </div>
              <div className="text-2xl font-bold text-green-900">{program.educationLevel}</div>
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
                {formatDate(program.applicationEndDate)}
              </div>
              <p className={`text-sm mt-1 ${isUrgent ? "text-orange-600" : "text-purple-600"}`}>Application deadline</p>
            </div>
          </div>

          {/* Eligibility Requirements */}
          <div className="bg-white border-2 border-gray-100 rounded-2xl p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <Users className="w-6 h-6 text-gray-700" />
              <h4 className="text-xl font-bold text-gray-900">Eligibility Requirements</h4>
            </div>

            <div className="space-y-4">
              {program.eligibility.map((requirement, index) => (
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

          {/* Application Requirements */}
          <div className="bg-gray-50 rounded-2xl p-8 mb-8 border border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <Award className="w-6 h-6 text-gray-700" />
              <h4 className="text-xl font-bold text-gray-900">Application Requirements</h4>
            </div>

            <div className="space-y-4">
              {program.requirements.map((requirement, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-200"
                >
                  <CheckCircle className="w-6 h-6 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 text-lg leading-relaxed">{requirement}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Program Benefits */}
          <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-8 mb-8 border border-cyan-200">
            <div className="flex items-center gap-3 mb-6">
              <Award className="w-6 h-6 text-cyan-700" />
              <h4 className="text-xl font-bold text-cyan-900">Program Benefits</h4>
            </div>

            <div className="space-y-4">
              {program.benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 bg-white rounded-xl border border-cyan-100"
                >
                  <CheckCircle className="w-6 h-6 text-cyan-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 text-lg leading-relaxed">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Application Process */}
          <div className="bg-white border-2 border-gray-100 rounded-2xl p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <GraduationCap className="w-6 h-6 text-gray-700" />
              <h4 className="text-xl font-bold text-gray-900">Application Process</h4>
            </div>

            <div className="space-y-4">
              {program.applicationProcess.map((step, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                  <span className="text-gray-700 text-lg leading-relaxed">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t-2 border-gray-100">
            <button
              onClick={() => onDownload(program)}
              disabled={isExpired}
              className={`flex-1 py-4 px-8 rounded-2xl font-bold text-lg transition-all duration-200 flex items-center justify-center gap-3 ${
                isExpired
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : `${program.color} text-white hover:opacity-90 hover:scale-105 shadow-lg hover:shadow-xl`
              }`}
            >
              <Download className="w-6 h-6" />
              {isExpired ? "Application Closed" : "Download Application Form"}
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