import { GraduationCap, Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin, ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-gradient-to-br from-sky-600 to-sky-700 text-white p-2.5 rounded-xl shadow-medium">
                <GraduationCap className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold">ScholarshipHub</h3>
                <p className="text-xs text-slate-400 -mt-1">Your Gateway to Education</p>
              </div>
            </div>
            <p className="text-slate-300 mb-6 leading-relaxed">
              Your gateway to educational opportunities. We connect students with scholarships and funding programs 
              to make higher education accessible for everyone. Start your journey towards academic success today.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-sky-400 transition-colors p-2 hover:bg-slate-800 rounded-lg">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-sky-400 transition-colors p-2 hover:bg-slate-800 rounded-lg">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-sky-400 transition-colors p-2 hover:bg-slate-800 rounded-lg">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-sky-400 transition-colors p-2 hover:bg-slate-800 rounded-lg">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a href="#scholarships" className="text-slate-300 hover:text-sky-400 transition-colors flex items-center group">
                  <ArrowRight className="h-3 w-3 mr-2 group-hover:translate-x-1 transition-transform" />
                  Browse Scholarships
                </a>
              </li>
              <li>
                <a href="#kpr" className="text-slate-300 hover:text-sky-400 transition-colors flex items-center group">
                  <ArrowRight className="h-3 w-3 mr-2 group-hover:translate-x-1 transition-transform" />
                  KPR Programs
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-sky-400 transition-colors flex items-center group">
                  <ArrowRight className="h-3 w-3 mr-2 group-hover:translate-x-1 transition-transform" />
                  Application Tips
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-sky-400 transition-colors flex items-center group">
                  <ArrowRight className="h-3 w-3 mr-2 group-hover:translate-x-1 transition-transform" />
                  Success Stories
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Contact Info</h4>
            <ul className="space-y-4 text-slate-300">
              <li className="flex items-start">
                <Mail className="h-4 w-4 mr-3 mt-0.5 text-sky-400" />
                <span>info@scholarshiphub.edu</span>
              </li>
              <li className="flex items-start">
                <Phone className="h-4 w-4 mr-3 mt-0.5 text-sky-400" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start">
                <MapPin className="h-4 w-4 mr-3 mt-0.5 text-sky-400" />
                <span>123 Education St, Learning City, LC 12345</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm">&copy; 2024 ScholarshipHub. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-slate-400 hover:text-sky-400 text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-slate-400 hover:text-sky-400 text-sm transition-colors">Terms of Service</a>
            <a href="#" className="text-slate-400 hover:text-sky-400 text-sm transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
