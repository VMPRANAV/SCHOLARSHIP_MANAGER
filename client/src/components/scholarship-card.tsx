import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Scholarship } from "@shared/schema";

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

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-lg transition-shadow duration-300">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          {scholarship.organizationLogo && scholarship.organizationLogo.startsWith('/uploads') ? (
            <img 
              src={scholarship.organizationLogo} 
              alt="Organization logo"
              className="w-12 h-12 rounded-lg object-cover"
            />
          ) : (
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
              {getLogoInitials(scholarship.name, scholarship.organizationLogo)}
            </div>
          )}
          <Badge variant={scholarship.status === 'active' ? 'default' : 'secondary'} className="bg-emerald-100 text-emerald-700">
            {scholarship.status === 'active' ? 'Active' : 'Inactive'}
          </Badge>
        </div>
        
        <h4 className="text-lg font-semibold text-slate-800 mb-2">{scholarship.name}</h4>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600">Amount:</span>
            <span className="font-bold text-emerald-600 text-lg">{formatAmount(scholarship.amount)}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600">Education Level:</span>
            <span className="text-slate-800 font-medium">{scholarship.educationLevel}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600">Deadline:</span>
            <span className="text-red-600 font-medium">{formatDate(scholarship.applicationEndDate)}</span>
          </div>
        </div>
        
        <div className="flex space-x-3">
          {scholarship.applicationLink && (
            <Button 
              onClick={handleApply}
              className="flex-1 bg-education-blue text-white hover:bg-blue-800"
              size="sm"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Apply
            </Button>
          )}
          <Button 
            onClick={() => onViewMore(scholarship)}
            variant="outline"
            className="flex-1"
            size="sm"
          >
            View More
          </Button>
        </div>
      </div>
    </div>
  );
}
