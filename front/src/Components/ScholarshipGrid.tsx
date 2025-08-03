import React from 'react'
import { DollarSign, Calendar, GraduationCap,Building } from 'lucide-react'
import { Scholarship, ScholarshipGridProps } from '../types/scholarship'

export default function ScholarshipGrid({ 
  scholarships, 
  loading, 
  error, 
  onViewDetails, 
  onApply 
}: ScholarshipGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow animate-pulse">
            <div className="p-6">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-full mb-4"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
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

  if (scholarships.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg">No scholarships found</div>
      </div>
    )
  }

  const formatAmount = (amount: string) => {
    // Handle potential formatting issues
    const cleanAmount = amount.replace(/[^0-9.-]/g, '');
    const numAmount = parseFloat(cleanAmount);
    return isNaN(numAmount) ? amount : `$${numAmount.toLocaleString()}`;
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString();
    } catch (error) {
      return dateString; // Return original if parsing fails
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {scholarships.map((scholarship) => (
        <div key={scholarship._id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
          <div className="p-6">
            <div className="flex items-start gap-4 mb-4">
  <div className="flex-shrink-0">
    {scholarship.organizationLogo ? (
      <img
        src={scholarship.organizationLogo}
        alt={`${scholarship.name} logo`}
        className="w-12 h-12 rounded-lg object-cover border border-gray-200"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
          target.nextElementSibling?.classList.remove('hidden');
        }}
      />
    ) : null}
    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center ${scholarship.organizationLogo ? 'hidden' : ''}`}>
      <Building className="w-6 h-6 text-white" />
    </div>
  </div>
  <div className="flex-1 min-w-0">
    <h3 className="text-lg font-semibold mb-2 line-clamp-2">{scholarship.name}</h3>
  </div>
</div>
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">{scholarship.description}</p>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm">
                <DollarSign className="w-4 h-4 text-green-600" />
                <span className="font-semibold">{formatAmount(scholarship.amount)}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <GraduationCap className="w-4 h-4 text-blue-600" />
                <span>{scholarship.educationLevel}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-orange-600" />
                <span>{formatDate(scholarship.applicationEndDate)}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => onApply(scholarship)}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Apply
              </button>
              <button
                onClick={() => onViewDetails(scholarship)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Details
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
