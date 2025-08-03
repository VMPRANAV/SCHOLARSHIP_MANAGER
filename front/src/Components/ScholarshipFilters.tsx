import React, { useState, useEffect, useCallback } from 'react'
import { Search, Filter, ChevronDown } from 'lucide-react'
import { ScholarshipFiltersProps } from '../types/scholarship'

export default function ScholarshipFilters({
  searchTerm,
  setSearchTerm,
  educationLevel,
  setEducationLevel,
  genderRequirement,
  setGenderRequirement,
  sortBy,
  setSortBy,
  showFilters,
  setShowFilters,
  filteredScholarships,
  loading
}: ScholarshipFiltersProps) {
  return (
    <div className="bg-white rounded-lg shadow mb-6">
      <div className="p-6">
        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search scholarships..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Filter Toggle */}
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-600">
            {loading ? 'Loading...' : `${filteredScholarships.length} scholarships found`}
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Filter className="w-4 h-4" />
            Filters
            <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Filter Options */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Education Level - Fixed to match form options */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Education Level
                </label>
                <select
                  value={educationLevel}
                  onChange={(e) => setEducationLevel(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                >
                  <option value="All Levels">All Levels</option>
                  <option value="High School">High School</option>
                  <option value="Bachelor's">Bachelor's</option>
                  <option value="Master's">Master's</option>
                  <option value="PhD">PhD</option>
                </select>
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender
                </label>
                <select
                  value={genderRequirement}
                  onChange={(e) => setGenderRequirement(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                >
                  <option value="All Genders">All Genders</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Sort - Fixed to match expected values */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                >
                  <option value="Name">Name</option>
                  <option value="Amount">Amount</option>
                  <option value="Deadline">Deadline</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
