import { X, ExternalLink, Download, Share, Calendar, DollarSign, GraduationCap, Users, Award } from "lucide-react";
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

  const getDaysUntilDeadline = (dateString: string) => {
    const deadline = new Date(dateString);
    const today = new Date();
    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
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
  const daysUntilDeadline = getDaysUntilDeadline(scholarship.applicationEndDate);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-4 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold text-slate-800 flex items-center">
              <Award className="h-6 w-6 mr-3 text-sky-700" />
              Scholarship Details
            </DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="space-y-8 py-4">
          {/* Scholarship Header */}
          <div className="flex items-start space-x-6">
            {scholarship.organizationLogo && scholarship.organizationLogo.startsWith('/uploads') ? (
              <img 
                src={scholarship.organizationLogo} 
                alt="Organization logo"
                className="w-20 h-20 rounded-xl object-cover shadow-soft"
              />
            ) : (
              <div className="w-20 h-20 bg-gradient-to-br from-sky-500 to-sky-600 rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-soft">
                {getLogoInitials(scholarship.name, scholarship.organizationLogo)}
              </div>
            )}
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-slate-800 mb-3">{scholarship.name}</h2>
              <p className="text-slate-600 mb-4 leading-relaxed">{scholarship.description}</p>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-sky-100 text-sky-700 border-sky-200 font-medium">Merit Based</Badge>
                {scholarship.community && (
                  <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 font-medium">{scholarship.community}</Badge>
                )}
                <Badge className="bg-purple-100 text-purple-700 border-purple-200 font-medium">Research Focused</Badge>
              </div>
            </div>
          </div>

          {/* Key Information Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-sky-50 rounded-xl p-4 border border-sky-200">
              <div className="flex items-center mb-2">
                <DollarSign className="h-5 w-5 text-sky-700 mr-2" />
                <span className="text-sm font-semibold text-slate-700">Amount</span>
              </div>
              <p className="text-2xl font-bold text-sky-700">{formatAmount(scholarship.amount)}</p>
            </div>
            
            <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
              <div className="flex items-center mb-2">
                <GraduationCap className="h-5 w-5 text-emerald-700 mr-2" />
                <span className="text-sm font-semibold text-slate-700">Level</span>
              </div>
              <p className="text-lg font-semibold text-emerald-700">{scholarship.educationLevel}</p>
            </div>
            
            <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
              <div className="flex items-center mb-2">
                <Calendar className="h-5 w-5 text-orange-700 mr-2" />
                <span className="text-sm font-semibold text-slate-700">Deadline</span>
              </div>
              <p className="text-lg font-semibold text-orange-700">{formatDate(scholarship.applicationEndDate)}</p>
              {daysUntilDeadline > 0 && (
                <p className={`text-sm ${
                  daysUntilDeadline <= 7 ? 'text-red-600' : 
                  daysUntilDeadline <= 30 ? 'text-orange-600' : 'text-slate-500'
                }`}>
                  {daysUntilDeadline} day{daysUntilDeadline !== 1 ? 's' : ''} left
                </p>
              )}
            </div>
          </div>

          {/* Detailed Information */}
          <div className="bg-slate-50 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-slate-800 mb-6 flex items-center">
              <Award className="h-5 w-5 mr-2 text-sky-700" />
              Scholarship Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold text-slate-600">Community</label>
                    <p className="text-slate-800 font-medium">{scholarship.community || 'All Students'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-slate-600">Gender Requirement</label>
                    <p className="text-slate-800">{scholarship.genderRequirement || 'All Genders'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-slate-600">Status</label>
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
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold text-slate-600">Application End Date</label>
                    <p className="text-slate-800">{formatDate(scholarship.applicationEndDate)}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-slate-600">Created Date</label>
                    <p className="text-slate-800">{scholarship.createdAt ? formatDate(scholarship.createdAt.toString()) : 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-slate-600">Eligibility</label>
                    <p className="text-slate-800 text-sm">{scholarship.eligibility}</p>
                  </div>
                </div>
            </div>
          </div>

          {/* Eligibility Requirements */}
          {eligibilityItems.length > 0 && (
            <div className="bg-slate-50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center">
                <Users className="h-5 w-5 mr-2 text-sky-700" />
                Eligibility Requirements
              </h3>
              <ul className="space-y-2">
                {eligibilityItems.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-sky-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-slate-700">{item.trim()}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-slate-200">
            {scholarship.applicationLink && (
              <Button 
                onClick={handleApply}
                className="flex-1 bg-sky-700 text-white hover:bg-sky-800 shadow-soft hover:shadow-medium transition-all duration-200 font-medium"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Apply Now
              </Button>
            )}
            {scholarship.applicationFormPath && (
              <Button 
                onClick={handleDownloadForm}
                variant="outline"
                className="flex-1 border-slate-200 text-slate-700 hover:bg-sky-50 hover:border-sky-200 hover:text-sky-700 transition-all duration-200 font-medium"
              >
                <Download className="h-4 w-4 mr-2" />
                Download Form
              </Button>
            )}
            <Button 
              variant="outline"
              className="border-slate-200 text-slate-700 hover:bg-slate-50 transition-all duration-200 font-medium"
            >
              <Share className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
