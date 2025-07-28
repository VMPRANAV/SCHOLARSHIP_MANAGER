import { Link, useLocation } from "wouter";
import { GraduationCap, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [location] = useLocation();

  return (
    <header className="bg-white shadow-soft border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="bg-gradient-to-br from-sky-600 to-sky-700 text-white p-2.5 rounded-xl shadow-medium group-hover:shadow-lg transition-all duration-300">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800 group-hover:text-sky-700 transition-colors">ScholarshipHub</h1>
              <p className="text-xs text-slate-500 -mt-1">Your Gateway to Education</p>
            </div>
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            <Link 
              href="/" 
              className={`text-slate-600 hover:text-sky-700 transition-colors font-medium relative group ${
                location === '/' ? 'text-sky-700' : ''
              }`}
            >
              Home
              {location === '/' && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-sky-700 rounded-full"></span>
              )}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sky-700 rounded-full group-hover:w-full transition-all duration-300"></span>
            </Link>
            <a href="#scholarships" className="text-slate-600 hover:text-sky-700 transition-colors font-medium relative group">
              Scholarships
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sky-700 rounded-full group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#kpr" className="text-slate-600 hover:text-sky-700 transition-colors font-medium relative group">
              KPR Programs
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sky-700 rounded-full group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#contact" className="text-slate-600 hover:text-sky-700 transition-colors font-medium relative group">
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sky-700 rounded-full group-hover:w-full transition-all duration-300"></span>
            </a>
          </nav>
          
          <div className="flex items-center space-x-4">
            <Link href="/admin">
              <Button className="bg-sky-700 text-white hover:bg-sky-800 shadow-medium hover:shadow-lg transition-all duration-300 font-medium">
                <Shield className="h-4 w-4 mr-2" />
                Admin Login
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
