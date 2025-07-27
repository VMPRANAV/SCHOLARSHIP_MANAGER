import { X, Download, Info, Calendar, Users, Award } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface KPRProgram {
  id: string;
  name: string;
  type: 'merit' | 'sports';
  description: string;
  eligibility: string[];
  benefits: string[];
  applicationProcess: string[];
  requirements: string[];
  deadlines: {
    application: string;
    document: string;
    interview?: string;
  };
  contactInfo: {
    email: string;
    phone: string;
    address: string;
  };
}

interface KPRDetailModalProps {
  program: KPRProgram | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function KPRDetailModal({ program, isOpen, onClose }: KPRDetailModalProps) {
  if (!program) return null;

  const handleDirectDownload = () => {
    const filename = program.type === 'merit' ? 'kpr-merit-application.pdf' : 'kpr-sports-application.pdf';
    const link = document.createElement('a');
    link.href = `/docs/kpr/${filename}`;
    link.download = filename;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const colorScheme = program.type === 'merit' 
    ? { primary: 'bg-blue-600', secondary: 'bg-blue-50', accent: 'text-blue-700' }
    : { primary: 'bg-emerald-600', secondary: 'bg-emerald-50', accent: 'text-emerald-700' };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center space-x-4">
            <div className={`w-16 h-16 ${colorScheme.primary} rounded-lg flex items-center justify-center text-white font-bold text-2xl`}>
              KPR
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold text-slate-800">{program.name}</DialogTitle>
              <p className="text-slate-600">{program.type === 'merit' ? 'Academic Excellence Program' : 'Athletic Excellence Program'}</p>
            </div>
          </div>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Program Overview */}
          <div className={`${colorScheme.secondary} rounded-lg p-6`}>
            <h3 className="text-lg font-semibold text-slate-800 mb-3">Program Overview</h3>
            <p className="text-slate-700 leading-relaxed">{program.description}</p>
          </div>

          {/* Program Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Eligibility Criteria */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-800 flex items-center">
                <Users className="h-5 w-5 mr-2 text-slate-600" />
                Eligibility Criteria
              </h3>
              <ul className="space-y-2">
                {program.eligibility.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-slate-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-800 flex items-center">
                <Award className="h-5 w-5 mr-2 text-slate-600" />
                Program Benefits
              </h3>
              <ul className="space-y-2">
                {program.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-slate-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Application Process */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-800 flex items-center">
              <Info className="h-5 w-5 mr-2 text-slate-600" />
              Application Process
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {program.applicationProcess.map((step, index) => (
                <div key={index} className="bg-white border border-slate-200 rounded-lg p-4">
                  <div className={`w-8 h-8 ${colorScheme.primary} rounded-full flex items-center justify-center text-white font-bold text-sm mb-3`}>
                    {index + 1}
                  </div>
                  <p className="text-sm text-slate-700">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Required Documents */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-800">Required Documents</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {program.requirements.map((req, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-slate-700">{req}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Important Dates */}
          <div className={`${colorScheme.secondary} rounded-lg p-6`}>
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Important Dates
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-slate-600">Application Deadline</label>
                <p className={`font-semibold ${colorScheme.accent}`}>{program.deadlines.application}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-600">Document Submission</label>
                <p className={`font-semibold ${colorScheme.accent}`}>{program.deadlines.document}</p>
              </div>
              {program.deadlines.interview && (
                <div>
                  <label className="text-sm font-medium text-slate-600">Interview Period</label>
                  <p className={`font-semibold ${colorScheme.accent}`}>{program.deadlines.interview}</p>
                </div>
              )}
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-slate-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-slate-600">Email</label>
                <p className="text-slate-800">{program.contactInfo.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-600">Phone</label>
                <p className="text-slate-800">{program.contactInfo.phone}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-600">Address</label>
                <p className="text-slate-800">{program.contactInfo.address}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-slate-200">
            <Button 
              onClick={handleDirectDownload}
              className={`flex-1 ${colorScheme.primary} text-white hover:opacity-90`}
            >
              <Download className="h-4 w-4 mr-3" />
              Download Application Form (PDF)
            </Button>
            <Button variant="outline" className="flex-1">
              <Info className="h-4 w-4 mr-3" />
              Program Guidelines
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}