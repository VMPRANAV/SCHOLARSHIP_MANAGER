import { Link, useLocation } from "wouter";
import { GraduationCap, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [location] = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-br from-slate-900/95 to-black/95 backdrop-blur-lg border-b-2 border-blue-500 shadow-2xl hover:shadow-3xl transition-all duration-300 relative before:absolute before:inset-0 before:bg-gradient-to-br before:from-blue-500/10 before:to-transparent before:pointer-events-none animate-pulse-royal-blue">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Navigation */}
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-4 group">
            <div className="bg-gradient-to-br from-education-blue to-blue-700 text-white p-2 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
              <GraduationCap className="h-6 w-6" />
            </div>
            <h1 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-200">
              ScholarshipHub
            </h1>
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            <Link 
              href="/" 
              className={`text-slate-300 hover:text-blue-400 transition-all duration-200 font-medium px-3 py-2 rounded-lg hover:bg-blue-900/30 hover:shadow-md transform hover:-translate-y-0.5 ${
                location === '/' ? 'text-blue-400 bg-blue-900/30 shadow-sm' : ''
              }`}
            >
              Home
            </Link>
            <a 
              href="#scholarships" 
              className="text-slate-300 hover:text-blue-400 transition-all duration-200 font-medium px-3 py-2 rounded-lg hover:bg-blue-900/30 hover:shadow-md transform hover:-translate-y-0.5"
            >
              Scholarships
            </a>
            <a 
              href="#kpr" 
              className="text-slate-300 hover:text-blue-400 transition-all duration-200 font-medium px-3 py-2 rounded-lg hover:bg-blue-900/30 hover:shadow-md transform hover:-translate-y-0.5"
            >
              KPR Programs
            </a>
            <a 
              href="#contact" 
              className="text-slate-300 hover:text-blue-400 transition-all duration-200 font-medium px-3 py-2 rounded-lg hover:bg-blue-900/30 hover:shadow-md transform hover:-translate-y-0.5"
            >
              Contact
            </a>
          </nav>
          
          <div className="flex items-center space-x-4">
            <Link href="/admin">
              <Button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 border border-blue-500">
                <Shield className="h-4 w-4 mr-2" />
                Admin Login
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Moving Royal Blue Border Animation */}
      <div className="absolute inset-0 rounded-lg overflow-hidden pointer-events-none">
        <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 opacity-20 blur-sm animate-spin-slow"></div>
        <div className="absolute -inset-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-40 animate-pulse-border"></div>
      </div>

      {/* Glowing Border Effect */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-pulse"></div>
    </header>
  );
}
