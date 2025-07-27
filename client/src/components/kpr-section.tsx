import { Download, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import KPRDetailModal from "./kpr-detail-modal";
import { kprPrograms } from "@/data/kpr-programs";

export default function KPRSection() {
  const [selectedProgram, setSelectedProgram] = useState<typeof kprPrograms.merit | typeof kprPrograms.sports | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDirectDownload = (type: 'merit' | 'sports') => {
    const filename = type === 'merit' ? 'kpr-merit-application.pdf' : 'kpr-sports-application.pdf';
    const link = document.createElement('a');
    link.href = `/docs/kpr/${filename}`;
    link.download = filename;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleViewDetails = (type: 'merit' | 'sports') => {
    setSelectedProgram(kprPrograms[type]);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProgram(null);
  };

  return (
    <>
      <section id="kpr" className="bg-dark-overlay rounded-2xl p-8 m-4 border border-blue-500/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">KPR Institute Programs</h3>
            <p className="text-slate-300 max-w-2xl mx-auto">
              Exclusive scholarship programs from KPR Institute of Engineering and Technology
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* KPR Merit Scholarship */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border-2 border-blue-200 shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-300 hover:border-blue-300 relative before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:to-transparent before:rounded-2xl before:pointer-events-none">
              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-education-blue rounded-xl flex items-center justify-center text-white font-bold text-2xl mr-4 shadow-lg transform hover:scale-105 transition-transform duration-200">
                    KPR
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-800">KPR Merit Scholarship</h4>
                    <p className="text-slate-600">Academic Excellence Program</p>
                  </div>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Program Type:</span>
                    <span className="font-semibold text-slate-800">NEW/RENEWAL</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Application Status:</span>
                    <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium shadow-sm">Available</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Application Deadline:</span>
                    <span className="text-red-600 font-medium">March 31, 2025</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Button 
                    onClick={() => handleDirectDownload('merit')}
                    className="w-full bg-education-blue text-white hover:bg-blue-800 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
                  >
                    <Download className="h-4 w-4 mr-3" />
                    Download Application Form (PDF)
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                    onClick={() => handleViewDetails('merit')}
                  >
                    <Info className="h-4 w-4 mr-3" />
                    View Program Details
                  </Button>
                </div>
              </div>
            </div>

            {/* KPR Sports Scholarship */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-emerald-200 shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-300 hover:border-emerald-300 relative before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:to-transparent before:rounded-2xl before:pointer-events-none">
              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-emerald-600 rounded-xl flex items-center justify-center text-white font-bold text-2xl mr-4 shadow-lg transform hover:scale-105 transition-transform duration-200">
                    KPR
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-800">KPR Sports Scholarship</h4>
                    <p className="text-slate-600">Athletic Excellence Program</p>
                  </div>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Program Type:</span>
                    <span className="font-semibold text-slate-800">NEW/RENEWAL</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Application Status:</span>
                    <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium shadow-sm">Available</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Application Deadline:</span>
                    <span className="text-red-600 font-medium">April 30, 2025</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Button 
                    onClick={() => handleDirectDownload('sports')}
                    className="w-full bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
                  >
                    <Download className="h-4 w-4 mr-3" />
                    Download Application Form (PDF)
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                    onClick={() => handleViewDetails('sports')}
                  >
                    <Info className="h-4 w-4 mr-3" />
                    View Program Details
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <KPRDetailModal
        program={selectedProgram}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  );
}
