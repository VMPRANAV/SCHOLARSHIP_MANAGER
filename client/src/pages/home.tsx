import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, ALargeSmall, List, Award, Users, Calendar, DollarSign } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ScholarshipCard from "@/components/scholarship-card";
import ScholarshipDetailModal from "@/components/scholarship-detail-modal";
import KPRSection from "@/components/kpr-section";
import ScholarshipFilters, { FilterOptions } from "@/components/scholarship-filters";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { scholarshipApi } from "@/lib/api";
import type { Scholarship } from "@shared/schema";

export default function Home() {
  const [filters, setFilters] = useState<FilterOptions>({
    search: "",
    educationLevel: "all",
    amountRange: [0, 100000],
    deadlineRange: [null, null],
    community: [],
    genderRequirement: "All Genders",
    sortBy: "name",
    sortOrder: "asc"
  });
  const [selectedScholarship, setSelectedScholarship] = useState<Scholarship | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const { toast } = useToast();

  // Convert Date objects to strings for API calls
  const apiFilters = {
    ...filters,
    deadlineRange: [
      filters.deadlineRange[0] || '',
      filters.deadlineRange[1] || ''
    ] as [string, string],
    status: 'active'
  };

  const { data: scholarships = [], isLoading, error } = useQuery({
    queryKey: ['scholarships', apiFilters],
    queryFn: () => scholarshipApi.getAll(apiFilters),
    staleTime: 2 * 60 * 1000,
  });

  // Show error notification if query fails
  if (error) {
    toast({
      title: 'Error',
      description: 'Failed to load scholarships. Please try again.',
      variant: 'destructive',
    });
  }

  const handleFiltersChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      search: "",
      educationLevel: "all",
      amountRange: [0, 100000],
      deadlineRange: [null, null],
      community: [],
      genderRequirement: "All Genders",
      sortBy: "name",
      sortOrder: "asc"
    });
  };

  const handleViewMore = (scholarship: Scholarship) => {
    setSelectedScholarship(scholarship);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedScholarship(null);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      {/* Hero Section */}
      <section className="gradient-bg text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
              <Award className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Find Your Perfect
              <span className="block text-sky-100">Scholarship</span>
            </h1>
            <p className="text-xl text-sky-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Discover hundreds of scholarships and funding opportunities to support your educational journey. 
              Your future starts here with our comprehensive scholarship database.
            </p>
          </div>
          
          {/* Search and Filter Bar */}
          <div className="bg-white rounded-2xl p-8 shadow-medium max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search scholarships by name, organization, or keywords..."
                  value={filters.search}
                  onChange={(e) => handleFiltersChange({ ...filters, search: e.target.value })}
                  className="w-full pl-10 text-slate-800 border-slate-200 focus:border-sky-500 focus:ring-sky-500"
                />
              </div>
              <Select value={filters.educationLevel} onValueChange={(value) => handleFiltersChange({ ...filters, educationLevel: value })}>
                <SelectTrigger className="text-slate-800 border-slate-200 focus:border-sky-500 focus:ring-sky-500">
                  <SelectValue placeholder="Education Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="High School">High School</SelectItem>
                  <SelectItem value="Bachelor's">Bachelor's</SelectItem>
                  <SelectItem value="Master's">Master's</SelectItem>
                  <SelectItem value="PhD">PhD</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-sky-100 rounded-xl mb-4">
                <Award className="h-6 w-6 text-sky-700" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">{scholarships.length}+</h3>
              <p className="text-slate-600">Available Scholarships</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-sky-100 rounded-xl mb-4">
                <Users className="h-6 w-6 text-sky-700" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">1000+</h3>
              <p className="text-slate-600">Students Helped</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-sky-100 rounded-xl mb-4">
                <DollarSign className="h-6 w-6 text-sky-700" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">$5M+</h3>
              <p className="text-slate-600">Total Funding</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main id="scholarships" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Advanced Filters */}
        <ScholarshipFilters
          filters={filters}
          onFiltersChange={handleFiltersChange}
          onClearFilters={handleClearFilters}
          totalResults={scholarships.length}
        />

        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-800 mb-2">Available Scholarships</h2>
            <p className="text-slate-600">
              {isLoading ? 'Loading scholarships...' : `Showing ${scholarships.length} scholarships`}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex border border-slate-300 rounded-lg overflow-hidden shadow-soft">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className={viewMode === 'grid' ? 'bg-sky-700 text-white' : 'text-slate-600 hover:text-sky-700'}
              >
                <ALargeSmall className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className={viewMode === 'list' ? 'bg-sky-700 text-white' : 'text-slate-600 hover:text-sky-700'}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Scholarship Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-soft border border-slate-200 p-6">
                <div className="flex items-start justify-between mb-4">
                  <Skeleton className="w-12 h-12 rounded-lg" />
                  <Skeleton className="w-16 h-6 rounded-full" />
                </div>
                <Skeleton className="w-full h-6 mb-4" />
                <div className="space-y-2 mb-4">
                  <Skeleton className="w-full h-4" />
                  <Skeleton className="w-full h-4" />
                  <Skeleton className="w-full h-4" />
                </div>
                <div className="flex space-x-3">
                  <Skeleton className="flex-1 h-10" />
                  <Skeleton className="flex-1 h-10" />
                </div>
              </div>
            ))}
          </div>
        ) : scholarships.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mb-6">
              <Search className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">No scholarships found</h3>
            <p className="text-slate-600 mb-4">No scholarships match your current search criteria.</p>
            <Button 
              onClick={handleClearFilters}
              className="bg-sky-700 text-white hover:bg-sky-800"
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {scholarships.map((scholarship: Scholarship) => (
              <ScholarshipCard
                key={scholarship.id}
                scholarship={scholarship}
                onViewMore={handleViewMore}
              />
            ))}
          </div>
        )}
      </main>

      <KPRSection />
      <Footer />

      <ScholarshipDetailModal
        scholarship={selectedScholarship}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
}
