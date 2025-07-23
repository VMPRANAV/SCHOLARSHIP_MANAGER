import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, ALargeSmall, List } from "lucide-react";
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
import { useToast } from "@/hooks/use-toast"; // Import useToast
import { scholarshipApi } from "@/lib/api";
import type { Scholarship } from "@shared/schema";

export default function Home() {
  const [filters, setFilters] = useState<FilterOptions>({
    search: "",
    educationLevel: "all",
    amountRange: [0, 100000],
    deadlineRange: [null, null], // Initialize with Date | null
    community: [],
    genderRequirement: "All Genders",
    sortBy: "name",
    sortOrder: "asc"
  });
  const [selectedScholarship, setSelectedScholarship] = useState<Scholarship | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const { toast } = useToast(); // Initialize useToast

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
      deadlineRange: [null, null], // Reset to Date | null
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
      <section className="bg-gradient-to-br from-education-blue to-education-sky text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-cyan-500">Find Your Perfect Scholarship</h2>
          <p className="text-xl text-slate-700 mb-8 max-w-3xl mx-auto">
            Discover hundreds of scholarships and funding opportunities to support your educational journey. Your future starts here.
          </p>
          
          {/* Search and Filter Bar */}
          <div className="bg-white rounded-xl p-6 shadow-lg max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <Input
                  type="text"
                  placeholder="Search scholarships..."
                  value={filters.search}
                  onChange={(e) => handleFiltersChange({ ...filters, search: e.target.value })}
                  className="w-full text-slate-800"
                />
              </div>
              <Select value={filters.educationLevel} onValueChange={(value) => handleFiltersChange({ ...filters, educationLevel: value })}>
                <SelectTrigger className="text-slate-800">
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

      {/* Main Content */}
      <main id="scholarships" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Advanced Filters */}
        <ScholarshipFilters
          filters={filters}
          onFiltersChange={handleFiltersChange}
          onClearFilters={handleClearFilters}
          totalResults={scholarships.length}
        />

        <div className="flex justify-between items-center mb-8">
          <div>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">Available Scholarships</h3>
            <p className="text-slate-600">
              {isLoading ? 'Loading...' : `Showing ${scholarships.length} scholarships`}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex border border-slate-300 rounded-lg overflow-hidden">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className={viewMode === 'grid' ? 'bg-education-blue' : ''}
              >
                <ALargeSmall className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className={viewMode === 'list' ? 'bg-education-blue' : ''}
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
              <div key={i} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
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
          <div className="text-center py-12">
            <p className="text-slate-600 text-lg">No scholarships found matching your criteria.</p>
            <p className="text-slate-500 mt-2">Try adjusting your search filters or browse all scholarships.</p>
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
