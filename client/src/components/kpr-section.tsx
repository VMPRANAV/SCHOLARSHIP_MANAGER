import { Download, Info, Award, Trophy, Star, Users } from "lucide-react";
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
    <section id="kpr" className="bg-slate-50 py-20 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-sky-100 rounded-full mb-6">
            <Award className="h-8 w-8 text-sky-700" />
          </div>
          <h2 className="text-4xl font-bold text-slate-800 mb-4">KPR Scholarship Programs</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Special scholarship programs with dedicated application forms and requirements. 
            Choose the program that best fits your academic or athletic achievements.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* KPR Merit Scholarship */}
          <div className="bg-white rounded-2xl p-8 shadow-soft border border-slate-200 hover:shadow-medium transition-all duration-300">
            <div className="flex items-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-sky-600 to-sky-700 rounded-xl flex items-center justify-center text-white font-bold text-2xl mr-4 shadow-medium">
                KPR
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-800">KPR Merit Scholarship</h3>
                <p className="text-slate-600">Academic Excellence Program</p>
              </div>
            </div>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                <span className="text-slate-600 font-medium">Program Type:</span>
                <span className="font-semibold text-slate-800">NEW/RENEWAL</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                <span className="text-slate-600 font-medium">Application Status:</span>
                <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium border border-emerald-200">
                  Available
                </span>
              </div>
              <div className="flex items-center text-slate-600">
                <Star className="h-4 w-4 mr-2 text-sky-600" />
                <span className="text-sm">For students with outstanding academic performance</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <Button 
                onClick={() => handleDownload('merit')}
                className="w-full bg-sky-700 text-white hover:bg-sky-800 shadow-soft hover:shadow-medium transition-all duration-200 font-medium"
              >
                <Download className="h-4 w-4 mr-3" />
                Download Application Form (PDF)
              </Button>
              <Button 
                variant="outline" 
                className="w-full border-slate-200 text-slate-700 hover:bg-sky-50 hover:border-sky-200 hover:text-sky-700 transition-all duration-200 font-medium"
              >
                <Info className="h-4 w-4 mr-3" />
                View Program Details
              </Button>
            </div>
          </div>

          {/* KPR Sports Scholarship */}
          <div className="bg-white rounded-2xl p-8 shadow-soft border border-slate-200 hover:shadow-medium transition-all duration-300">
            <div className="flex items-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-xl flex items-center justify-center text-white font-bold text-2xl mr-4 shadow-medium">
                KPR
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-800">KPR Sports Scholarship</h3>
                <p className="text-slate-600">Athletic Excellence Program</p>
              </div>
            </div>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                <span className="text-slate-600 font-medium">Program Type:</span>
                <span className="font-semibold text-slate-800">NEW/RENEWAL</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                <span className="text-slate-600 font-medium">Application Status:</span>
                <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium border border-emerald-200">
                  Available
                </span>
              </div>
              <div className="flex items-center text-slate-600">
                <Trophy className="h-4 w-4 mr-2 text-emerald-600" />
                <span className="text-sm">For students with exceptional athletic achievements</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <Button 
                onClick={() => handleDownload('sports')}
                className="w-full bg-emerald-600 text-white hover:bg-emerald-700 shadow-soft hover:shadow-medium transition-all duration-200 font-medium"
              >
                <Download className="h-4 w-4 mr-3" />
                Download Application Form (PDF)
              </Button>
              <Button 
                variant="outline" 
                className="w-full border-slate-200 text-slate-700 hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-700 transition-all duration-200 font-medium"
              >
                <Info className="h-4 w-4 mr-3" />
                View Program Details
              </Button>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-soft border border-slate-200">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-sky-100 rounded-xl mb-4">
              <Users className="h-6 w-6 text-sky-700" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">Need Help?</h3>
            <p className="text-slate-600 mb-4">
              Our team is here to assist you with the application process and answer any questions you may have.
            </p>
            <Button 
              variant="outline" 
              className="border-sky-200 text-sky-700 hover:bg-sky-50 hover:border-sky-300 transition-all duration-200 font-medium"
            >
              Contact Support
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
