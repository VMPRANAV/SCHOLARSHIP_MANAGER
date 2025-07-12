import { GraduationCap, Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-4 mb-4">
              <div className="bg-education-blue text-white p-2 rounded-lg">
                <GraduationCap className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">ScholarshipHub</h3>
            </div>
            <p className="text-slate-300 mb-4">
              Your gateway to educational opportunities. We connect students with scholarships and funding programs to make higher education accessible for everyone.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Browse Scholarships</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">KPR Programs</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Application Tips</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Success Stories</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-2 text-slate-300">
              <li className="flex items-center">
                <Mail className="h-4 w-4 mr-3" />
                <span>info@scholarshiphub.edu</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-4 w-4 mr-3" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <MapPin className="h-4 w-4 mr-3" />
                <span>123 Education St, Learning City</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm">&copy; 2024 ScholarshipHub. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">Terms of Service</a>
            <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
