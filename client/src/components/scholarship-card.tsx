import { ExternalLink, Calendar, GraduationCap, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Scholarship } from "@shared/schema";
import img from "/home/ramji/Desktop/scholar/SCHOLARSHIP_MANAGER/uploads/logo-1753699250417-977557057.png"
interface ScholarshipCardProps {
  scholarship: Scholarship;
  onViewMore: (scholarship: Scholarship) => void;
}

export default function ScholarshipCard({ scholarship, onViewMore }: ScholarshipCardProps) {
  const handleApply = () => {
    if (scholarship.applicationLink) {
      window.open(scholarship.applicationLink, '_blank');
    }
  };

  const formatAmount = (amount: string) => {
    const num = parseFloat(amount);
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(num);
  };

  const getLogoInitials = (name: string, logo?: string | null) => {
    if (logo && !logo.startsWith('/uploads')) {
      return logo; // Use the stored initials
    }
    return name.split(' ').map(word => word[0]).join('').substring(0, 3);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getDaysUntilDeadline = (dateString: string) => {
    const deadline = new Date(dateString);
    const today = new Date();
    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysUntilDeadline = getDaysUntilDeadline(scholarship.applicationEndDate);

  return (
    <div className="bg-white rounded-xl shadow-soft border border-slate-200 hover:shadow-medium hover:border-sky-200 transition-all duration-300 group">
      <div className="p-6">
        {/* Header with Logo and Status */}
        <div className="flex items-start justify-between mb-4">
          {scholarship.organizationLogo && scholarship.organizationLogo.startsWith('/uploads') ? (
            <img 
              src="/attached_assets/l.png"
              alt="Organization logo"
              className="w-12 h-12 rounded-xl object-cover shadow-soft"
            />
          ) : (
            <div className="w-12 h-12 bg-gradient-to-br from-sky-500 to-sky-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-soft">
              {getLogoInitials(scholarship.name, scholarship.organizationLogo)}
            </div>
          )}
          <Badge 
            variant={scholarship.status === 'active' ? 'default' : 'secondary'} 
            className={`${
              scholarship.status === 'active' 
                ? 'bg-emerald-100 text-emerald-700 border-emerald-200' 
                : 'bg-slate-100 text-slate-600 border-slate-200'
            } font-medium`}
          >
            {scholarship.status === 'active' ? 'Active' : 'Inactive'}
          </Badge>
        </div>
        
        {/* Scholarship Title */}
        <h4 className="text-lg font-semibold text-slate-800 mb-3 group-hover:text-sky-700 transition-colors line-clamp-2">
          {scholarship.name}
        </h4>
        
        {/* Scholarship Details */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-slate-600">
              <DollarSign className="h-4 w-4 mr-2 text-sky-600" />
              <span className="text-sm">Amount</span>
            </div>
            <span className="font-bold text-emerald-600 text-lg">{formatAmount(scholarship.amount)}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center text-slate-600">
              <GraduationCap className="h-4 w-4 mr-2 text-sky-600" />
              <span className="text-sm">Level</span>
            </div>
            <span className="text-slate-800 font-medium">{scholarship.educationLevel}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center text-slate-600">
              <Calendar className="h-4 w-4 mr-2 text-sky-600" />
              <span className="text-sm">Deadline</span>
            </div>
            <div className="text-right">
              <div className="text-slate-800 font-medium">{formatDate(scholarship.applicationEndDate)}</div>
              {daysUntilDeadline > 0 && (
                <div className={`text-xs ${
                  daysUntilDeadline <= 7 ? 'text-red-600' : 
                  daysUntilDeadline <= 30 ? 'text-orange-600' : 'text-slate-500'
                }`}>
                  {daysUntilDeadline} day{daysUntilDeadline !== 1 ? 's' : ''} left
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex space-x-3">
          {scholarship.applicationLink && (
            <Button 
              onClick={handleApply}
              className="flex-1 bg-sky-700 text-white hover:bg-sky-800 shadow-soft hover:shadow-medium transition-all duration-200 font-medium"
              size="sm"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Apply Now
            </Button>
          )}
          <Button 
            onClick={() => onViewMore(scholarship)}
            variant="outline"
            className="flex-1 border-slate-200 text-slate-700 hover:bg-sky-50 hover:border-sky-200 hover:text-sky-700 transition-all duration-200 font-medium"
            size="sm"
          >
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
}
