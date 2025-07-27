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
    <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl border-2 border-blue-500 shadow-floating hover:shadow-floating-hover transform hover:-translate-y-2 transition-all duration-500 hover:border-blue-700 relative before:absolute before:inset-0 before:bg-gradient-to-br before:from-blue-500/10 before:to-transparent before:rounded-2xl before:pointer-events-none animate-pulse-royal-blue hover:scale-[1.01]">
      <div className="relative z-10 p-6">
        <div className="flex items-start justify-between mb-4">
          {scholarship.organizationLogo && scholarship.organizationLogo.startsWith('/uploads') ? (
            <img 
              src={scholarship.organizationLogo} 
              alt="Organization logo"
              className="w-12 h-12 rounded-xl object-cover shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            />
          ) : (
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
              {getLogoInitials(scholarship.name, scholarship.organizationLogo)}
            </div>
          )}
          <Badge variant={scholarship.status === 'active' ? 'default' : 'secondary'} className="bg-emerald-100 text-emerald-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
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
              className="flex-1 bg-education-blue text-white hover:bg-blue-800 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 hover:scale-105 shadow-cyan-500/40 hover:shadow-cyan-500/80"
              size="sm"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Apply
            </Button>
          )}
          <Button 
            onClick={() => onViewMore(scholarship)}
            variant="outline"
            className="flex-1 border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 bg-white/50 backdrop-blur-sm hover:scale-105 shadow-cyan-500/30 hover:shadow-cyan-500/70"
            size="sm"
          >
            View More
          </Button>
        </div>
      </div>
      
      {/* Enhanced Moving Royal Blue Border Animation - Synced with Filters */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
        <div className="absolute -inset-3 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 opacity-25 blur-lg animate-spin-slow"></div>
        <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 opacity-20 blur-sm animate-spin-slow"></div>
        <div className="absolute -inset-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-50 animate-pulse-border"></div>
      </div>
    </div>
  );
}
