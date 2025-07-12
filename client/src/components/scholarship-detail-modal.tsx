import { X, ExternalLink, Download, Share } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Scholarship } from "@shared/schema";

interface ScholarshipDetailModalProps {
  scholarship: Scholarship | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ScholarshipDetailModal({ scholarship, isOpen, onClose }: ScholarshipDetailModalProps) {
  if (!scholarship) return null;

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
      return logo;
    }
    return name.split(' ').map(word => word[0]).join('').substring(0, 3);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleApply = () => {
    if (scholarship.applicationLink) {
      window.open(scholarship.applicationLink, '_blank');
    }
  };

  const handleDownloadForm = () => {
    if (scholarship.applicationFormPath) {
      window.open(scholarship.applicationFormPath, '_blank');
    }
  };

  const eligibilityItems = scholarship.eligibility.split(';').filter(item => item.trim());

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-slate-800">{scholarship.name}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Scholarship Summary */}
          <div className="flex items-start space-x-4">
            {scholarship.organizationLogo && scholarship.organizationLogo.startsWith('/uploads') ? (
              <img 
                src={scholarship.organizationLogo} 
                alt="Organization logo"
                className="w-16 h-16 rounded-lg object-cover"
              />
            ) : (
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                {getLogoInitials(scholarship.name, scholarship.organizationLogo)}
              </div>
            )}
            <div className="flex-1">
              <h4 className="text-lg font-semibold text-slate-800 mb-2">{scholarship.name}</h4>
              <p className="text-slate-600 mb-4">{scholarship.description}</p>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-blue-100 text-blue-700">Merit Based</Badge>
                {scholarship.community && (
                  <Badge className="bg-green-100 text-green-700">{scholarship.community}</Badge>
                )}
                <Badge className="bg-purple-100 text-purple-700">Research Focused</Badge>
              </div>
            </div>
          </div>

          {/* Detailed Information */}
          <div className="bg-slate-50 rounded-lg p-6">
            <h5 className="text-lg font-semibold text-slate-800 mb-4">Scholarship Details</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-600">Amount</label>
                  <p className="text-slate-800 font-semibold">{formatAmount(scholarship.amount)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600">Education Level</label>
                  <p className="text-slate-800">{scholarship.educationLevel}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600">Community</label>
                  <p className="text-slate-800">{scholarship.community || 'All Students'}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-600">Gender Requirements</label>
                  <p className="text-slate-800">{scholarship.genderRequirement || 'All Genders'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600">Application Deadline</label>
                  <p className="text-red-600 font-semibold">{formatDate(scholarship.applicationEndDate)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600">Status</label>
                  <Badge variant={scholarship.status === 'active' ? 'default' : 'secondary'} className="bg-emerald-100 text-emerald-700">
                    {scholarship.status === 'active' ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Eligibility Criteria */}
          <div>
            <h5 className="text-lg font-semibold text-slate-800 mb-3">Eligibility Criteria</h5>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <ul className="space-y-2 text-slate-700">
                {eligibilityItems.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    {item.trim()}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            {scholarship.applicationLink && (
              <Button 
                onClick={handleApply}
                className="flex-1 bg-education-blue text-white hover:bg-blue-800"
              >
                <ExternalLink className="h-4 w-4 mr-3" />
                Apply Now
              </Button>
            )}
            {scholarship.applicationFormPath && (
              <Button 
                onClick={handleDownloadForm}
                variant="outline"
                className="flex-1"
              >
                <Download className="h-4 w-4 mr-3" />
                Download Application Form
              </Button>
            )}
            <Button variant="outline" className="px-4">
              <Share className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
