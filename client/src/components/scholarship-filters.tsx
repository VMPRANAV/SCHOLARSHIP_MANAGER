import { useState, useEffect } from "react";
import { X, Filter, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

export interface FilterOptions {
  search: string;
  educationLevel: string;
  amountRange: [number, number];
  deadlineRange: [string | null, string | null];
  community: string[];
  genderRequirement: string;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

interface ScholarshipFiltersProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  onClearFilters: () => void;
  totalResults: number;
}

const EDUCATION_LEVELS = [
  { value: "all", label: "All Levels" },
  { value: "High School", label: "High School" },
  { value: "Bachelor's", label: "Bachelor's" },
  { value: "Master's", label: "Master's" },
  { value: "PhD", label: "PhD" },
];

const COMMUNITIES = [
  "STEM Students",
  "International Students",
  "Graduate Students",
  "Engineering Students",
  "Future Leaders",
  "Women in Tech",
  "Minority Students",
  "First Generation",
  "Veterans",
  "Athletes",
];

const GENDER_REQUIREMENTS = [
  { value: "All Genders", label: "All Genders" },
  { value: "Female", label: "Female Only" },
  { value: "Male", label: "Male Only" },
];

const SORT_OPTIONS = [
  { value: "name", label: "Name" },
  { value: "amount", label: "Amount" },
  { value: "deadline", label: "Deadline" },
  { value: "createdAt", label: "Date Added" },
];

export default function ScholarshipFilters({
  filters,
  onFiltersChange,
  onClearFilters,
  totalResults,
}: ScholarshipFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [localFilters, setLocalFilters] = useState<FilterOptions>(filters);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleFilterChange = (key: keyof FilterOptions, value: any) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleAmountRangeChange = (value: number[]) => {
    handleFilterChange('amountRange', [value[0], value[1]]);
  };

  const handleCommunityToggle = (community: string) => {
    const currentCommunities = localFilters.community;
    const newCommunities = currentCommunities.includes(community)
      ? currentCommunities.filter(c => c !== community)
      : [...currentCommunities, community];
    handleFilterChange('community', newCommunities);
  };

  const hasActiveFilters = () => {
    return (
      (localFilters.search && localFilters.search.trim()) ||
      (localFilters.educationLevel && localFilters.educationLevel !== 'all') ||
      localFilters.amountRange[0] > 0 ||
      localFilters.amountRange[1] < 100000 ||
      (localFilters.deadlineRange[0] && localFilters.deadlineRange[1]) ||
      localFilters.community.length > 0 ||
      (localFilters.genderRequirement && localFilters.genderRequirement !== 'All Genders') ||
      localFilters.sortBy !== 'name'
    );
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (localFilters.search && localFilters.search.trim()) count++;
    if (localFilters.educationLevel && localFilters.educationLevel !== 'all') count++;
    if (localFilters.amountRange[0] > 0 || localFilters.amountRange[1] < 100000) count++;
    if (localFilters.deadlineRange[0] && localFilters.deadlineRange[1]) count++;
    if (localFilters.community.length > 0) count++;
    if (localFilters.genderRequirement && localFilters.genderRequirement !== 'All Genders') count++;
    if (localFilters.sortBy !== 'name') count++;
    return count;
  };

  return (
    <Card className="mb-8 bg-gradient-to-br from-slate-900/95 to-black/95 backdrop-blur-lg border-2 border-blue-500 shadow-floating hover:shadow-floating-hover transition-all duration-500 relative before:absolute before:inset-0 before:bg-gradient-to-br before:from-blue-500/10 before:to-transparent before:pointer-events-none animate-pulse-royal-blue rounded-2xl transform hover:-translate-y-2 hover:scale-[1.01]">
      <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
        <CardHeader className="pb-4 relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-br from-education-blue to-blue-700 text-white p-3 rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-110 hover:-rotate-3 transition-all duration-300">
                <Filter className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-200">
                Filters
              </CardTitle>
              {hasActiveFilters() && (
                <Badge variant="secondary" className="ml-2 bg-cyan-100 text-cyan-700 shadow-lg animate-bounce">
                  {getActiveFilterCount()} active
                </Badge>
              )}
            </div>
            <div className="flex items-center space-x-4">
              <p className="text-sm text-slate-300 font-medium">
                {totalResults} results
              </p>
              {hasActiveFilters() && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClearFilters}
                  className="text-red-400 hover:text-red-300 hover:bg-red-900/30 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  <X className="h-4 w-4 mr-1" />
                  Clear
                </Button>
              )}
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:text-blue-400 hover:bg-blue-900/30 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  {isExpanded ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </CollapsibleTrigger>
            </div>
          </div>
        </CardHeader>
        <CollapsibleContent>
          <CardContent className="space-y-6 relative z-10">
            {/* Search */}
            <div>
              <label className="text-sm font-medium text-white mb-2 block">
                Search
              </label>
              <Input
                placeholder="Search scholarships by name, description, or community..."
                value={localFilters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="w-full bg-slate-800/50 border-slate-600 text-white placeholder-white focus:border-cyan-400 shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5 transition-all duration-200 focus:scale-[1.01]"
              />
            </div>

            {/* Basic Filters Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Education Level */}
              <div>
                <label className="text-sm font-medium text-white mb-2 block">
                  Education Level
                </label>
                <Select
                  value={localFilters.educationLevel}
                  onValueChange={(value) => handleFilterChange('educationLevel', value)}
                >
                  <SelectTrigger className="bg-slate-800/50 border-slate-600 text-white focus:border-cyan-400 shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5 transition-all duration-200">
                    <SelectValue placeholder="Select level" className="text-white" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600 shadow-2xl">
                    {EDUCATION_LEVELS.map((level) => (
                      <SelectItem key={level.value} value={level.value} className="text-white hover:bg-slate-700">
                        {level.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Gender Requirement */}
              <div>
                <label className="text-sm font-medium text-white mb-2 block">
                  Gender Requirement
                </label>
                <Select
                  value={localFilters.genderRequirement}
                  onValueChange={(value) => handleFilterChange('genderRequirement', value)}
                >
                  <SelectTrigger className="bg-slate-800/50 border-slate-600 text-white focus:border-cyan-400 shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5 transition-all duration-200">
                    <SelectValue placeholder="Select gender" className="text-white" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600 shadow-2xl">
                    {GENDER_REQUIREMENTS.map((gender) => (
                      <SelectItem key={gender.value} value={gender.value} className="text-white hover:bg-slate-700">
                        {gender.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Sort By */}
              <div>
                <label className="text-sm font-medium text-white mb-2 block">
                  Sort By
                </label>
                <Select
                  value={localFilters.sortBy}
                  onValueChange={(value) => handleFilterChange('sortBy', value)}
                >
                  <SelectTrigger className="bg-slate-800/50 border-slate-600 text-white focus:border-cyan-400 shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5 transition-all duration-200">
                    <SelectValue placeholder="Sort by" className="text-white" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600 shadow-2xl">
                    {SORT_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value} className="text-white hover:bg-slate-700">
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Amount Range - Fire Orange with floating effect and dual thumbs */}
            <div className="transform hover:-translate-y-1 transition-all duration-300">
              <label className="text-lg font-bold text-white  mb-3 block drop-shadow-lg">
                Amount Range: ${localFilters.amountRange[0].toLocaleString()} - ${localFilters.amountRange[1].toLocaleString()}
              </label>
              <div className="bg-slate-800/30 rounded-lg p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
<Slider
  value={localFilters.amountRange}
  onValueChange={handleAmountRangeChange}
  min={0}
  max={100000}
  step={1000}
  className="w-full
    [&_[data-index='0']]:bg-orange-500 [&_[data-index='1']]:bg-orange-500
    [&_[data-index='0']]:border-orange-500 [&_[data-index='1']]:border-orange-500
    [&_[data-index='0']]:h-4 [&_[data-index='0']]:w-4 [&_[data-index='0']]:rounded-full
    [&_[data-index='1']]:h-4 [&_[data-index='1']]:w-4 [&_[data-index='1']]:rounded-full
    [&_[data-index='0']]:shadow [&_[data-index='1']]:shadow"
/>

                
                <div className="flex justify-between text-sm text-orange-400 mt-3 font-medium">
                  <span className="bg-slate-800/50 px-2 py-1 rounded">$0</span>
                  <span className="bg-slate-800/50 px-2 py-1 rounded">$100,000</span>
                </div>
                
                {/* Visual indicators for the current range */}
                <div className="flex justify-between text-xs text-orange-300 mt-1 font-semibold">
                  <span>Min: ${localFilters.amountRange[0].toLocaleString()}</span>
                  <span>Max: ${localFilters.amountRange[1].toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Deadline Range */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-white mb-2 block">
                  Deadline From
                </label>
                <Input
                  type="date"
                  value={localFilters.deadlineRange[0] || ''}
                  onChange={(e) => handleFilterChange('deadlineRange', [e.target.value, localFilters.deadlineRange[1]])}
                  className="bg-slate-800/50 border-slate-600 text-white focus:border-cyan-400 shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5 transition-all duration-200"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-white mb-2 block">
                  Deadline To
                </label>
                <Input
                  type="date"
                  value={localFilters.deadlineRange[1] || ''}
                  onChange={(e) => handleFilterChange('deadlineRange', [localFilters.deadlineRange[0], e.target.value])}
                  className="bg-slate-800/50 border-slate-600 text-white focus:border-cyan-400 shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5 transition-all duration-200"
                />
              </div>
            </div>

            {/* Community Tags */}
            <div>
              <label className="text-sm font-medium text-white mb-2 block">
                Community
              </label>
              <div className="flex flex-wrap gap-2">
                {COMMUNITIES.map((community) => (
                  <Badge
                    key={community}
                    variant={localFilters.community.includes(community) ? "default" : "outline"}
                    className={`cursor-pointer transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 ${
                      localFilters.community.includes(community) 
                        ? 'bg-cyan-500 text-white shadow-2xl hover:bg-cyan-600 shadow-cyan-500/60' 
                        : 'border-cyan-400 text-cyan-400 hover:bg-cyan-500/20 hover:text-cyan-300 shadow-lg hover:shadow-cyan-500/40'
                    } hover:shadow-2xl`}
                    onClick={() => handleCommunityToggle(community)}
                  >
                    {community}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Active Filters Display */}
            {hasActiveFilters() && (
              <div className="pt-4 border-t border-slate-600 transform hover:-translate-y-0.5 transition-all duration-300">
                <h4 className="text-sm font-medium text-white mb-2">Active Filters:</h4>
                <div className="flex flex-wrap gap-2">
                  {localFilters.search && (
                    <Badge variant="secondary" className="text-xs bg-blue-500/20 text-blue-300 border-blue-400 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                      Search: "{localFilters.search}"
                    </Badge>
                  )}
                  {localFilters.educationLevel && localFilters.educationLevel !== 'all' && (
                    <Badge variant="secondary" className="text-xs bg-blue-500/20 text-blue-300 border-blue-400 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                      Level: {localFilters.educationLevel}
                    </Badge>
                  )}
                  {(localFilters.amountRange[0] > 0 || localFilters.amountRange[1] < 100000) && (
                    <Badge variant="secondary" className="text-xs bg-orange-500/20 text-orange-300 border-orange-400 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                      Amount: ${localFilters.amountRange[0].toLocaleString()} - ${localFilters.amountRange[1].toLocaleString()}
                    </Badge>
                  )}
                  {localFilters.community.map((community) => (
                    <Badge key={community} variant="secondary" className="text-xs bg-cyan-500/20 text-cyan-300 border-cyan-400 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                      {community}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
      
      {/* Enhanced Moving Royal Blue Border Animation */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
        <div className="absolute -inset-3 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 opacity-25 blur-lg animate-spin-slow"></div>
        <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 opacity-20 blur-sm animate-spin-slow"></div>
        <div className="absolute -inset-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-50 animate-pulse-border"></div>
      </div>

      {/* Enhanced Glowing Border Effect */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-pulse opacity-80"></div>
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-pulse opacity-60"></div>
    </Card>
  );
}