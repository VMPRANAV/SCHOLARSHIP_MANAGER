import { Link, useLocation } from "wouter";
import { GraduationCap, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [location] = useLocation();

  return (
    <header className="bg-white shadow-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-4">
            <div className="bg-education-blue text-white p-2 rounded-lg">
              <GraduationCap className="h-6 w-6" />
            </div>
            <h1 className="text-xl font-bold text-slate-800">ScholarshipHub</h1>
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            <Link 
              href="/" 
              className={`text-slate-600 hover:text-education-blue transition-colors font-medium ${
                location === '/' ? 'text-education-blue' : ''
              }`}
            >
              Home
            </Link>
            <a href="#scholarships" className="text-slate-600 hover:text-education-blue transition-colors font-medium">
              Scholarships
            </a>
            <a href="#kpr" className="text-slate-600 hover:text-education-blue transition-colors font-medium">
              KPR Programs
            </a>
            <a href="#contact" className="text-slate-600 hover:text-education-blue transition-colors font-medium">
              Contact
            </a>
          </nav>
          
          <div className="flex items-center space-x-4">
            <Link href="/admin">
              <Button className="bg-education-blue text-white hover:bg-blue-800">
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
