import { Download, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { kprApi } from "@/lib/api";

export default function KPRSection() {
  const { toast } = useToast();

  const handleDownload = async (type: 'merit' | 'sports') => {
    try {
      const response = await kprApi.downloadForm(type);
      toast({
        title: "Download Started",
        description: response.message,
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "Unable to download the application form. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <section id="kpr" className="bg-white py-16 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-slate-800 mb-4">KPR Scholarship Programs</h3>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Special scholarship programs with dedicated application forms and requirements
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* KPR Merit Scholarship */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-100">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-education-blue rounded-lg flex items-center justify-center text-white font-bold text-2xl mr-4">
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
                <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium">Available</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <Button 
                onClick={() => handleDownload('merit')}
                className="w-full bg-education-blue text-white hover:bg-blue-800"
              >
                <Download className="h-4 w-4 mr-3" />
                Download Application Form (PDF)
              </Button>
              <Button variant="outline" className="w-full">
                <Info className="h-4 w-4 mr-3" />
                View Program Details
              </Button>
            </div>
          </div>

          {/* KPR Sports Scholarship */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-8 border border-green-100">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold text-2xl mr-4">
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
                <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium">Available</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <Button 
                onClick={() => handleDownload('sports')}
                className="w-full bg-emerald-600 text-white hover:bg-emerald-700"
              >
                <Download className="h-4 w-4 mr-3" />
                Download Application Form (PDF)
              </Button>
              <Button variant="outline" className="w-full">
                <Info className="h-4 w-4 mr-3" />
                View Program Details
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
