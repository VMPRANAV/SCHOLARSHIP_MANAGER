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
    <Card className="mb-6">
      <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
        <CardHeader className="pb-4 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-slate-600" />
              <CardTitle className="text-lg">Filters</CardTitle>
              {hasActiveFilters() && (
                <Badge variant="secondary" className="ml-2">
                  {getActiveFilterCount()} active
                </Badge>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <p className="text-sm text-slate-600">
                {totalResults} results
              </p>
              {hasActiveFilters() && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClearFilters}
                  className="text-red-600 hover:text-red-700"
                >
                  <X className="h-4 w-4 mr-1" />
                  Clear
                </Button>
              )}
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
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
          <CardContent className="space-y-6">
            {/* Search */}
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">
                Search
              </label>
              <Input
                placeholder="Search scholarships by name, description, or community..."
                value={localFilters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="w-full"
              />
            </div>

            {/* Basic Filters Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Education Level */}
              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">
                  Education Level
                </label>
                <Select
                  value={localFilters.educationLevel}
                  onValueChange={(value) => handleFilterChange('educationLevel', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    {EDUCATION_LEVELS.map((level) => (
                      <SelectItem key={level.value} value={level.value}>
                        {level.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Gender Requirement */}
              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">
                  Gender Requirement
                </label>
                <Select
                  value={localFilters.genderRequirement}
                  onValueChange={(value) => handleFilterChange('genderRequirement', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    {GENDER_REQUIREMENTS.map((gender) => (
                      <SelectItem key={gender.value} value={gender.value}>
                        {gender.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Sort By */}
              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">
                  Sort By
                </label>
                <Select
                  value={localFilters.sortBy}
                  onValueChange={(value) => handleFilterChange('sortBy', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    {SORT_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Amount Range */}
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">
                Amount Range: ${localFilters.amountRange[0].toLocaleString()} - ${localFilters.amountRange[1].toLocaleString()}
              </label>
              <Slider
                value={localFilters.amountRange}
                onValueChange={handleAmountRangeChange}
                max={100000}
                min={0}
                step={1000}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>$0</span>
                <span>$100,000</span>
              </div>
            </div>

            {/* Deadline Range */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">
                  Deadline From
                </label>
                <Input
                  type="date"
                  value={localFilters.deadlineRange[0] || ''}
                  onChange={(e) => handleFilterChange('deadlineRange', [e.target.value, localFilters.deadlineRange[1]])}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">
                  Deadline To
                </label>
                <Input
                  type="date"
                  value={localFilters.deadlineRange[1] || ''}
                  onChange={(e) => handleFilterChange('deadlineRange', [localFilters.deadlineRange[0], e.target.value])}
                />
              </div>
            </div>

            {/* Community Tags */}
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">
                Community
              </label>
              <div className="flex flex-wrap gap-2">
                {COMMUNITIES.map((community) => (
                  <Badge
                    key={community}
                    variant={localFilters.community.includes(community) ? "default" : "outline"}
                    className="cursor-pointer hover:bg-slate-100"
                    onClick={() => handleCommunityToggle(community)}
                  >
                    {community}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Active Filters Display */}
            {hasActiveFilters() && (
              <div className="pt-4 border-t border-slate-200">
                <h4 className="text-sm font-medium text-slate-700 mb-2">Active Filters:</h4>
                <div className="flex flex-wrap gap-2">
                  {localFilters.search && (
                    <Badge variant="secondary" className="text-xs">
                      Search: "{localFilters.search}"
                    </Badge>
                  )}
                  {localFilters.educationLevel && (
                    <Badge variant="secondary" className="text-xs">
                      Level: {localFilters.educationLevel}
                    </Badge>
                  )}
                  {(localFilters.amountRange[0] > 0 || localFilters.amountRange[1] < 100000) && (
                    <Badge variant="secondary" className="text-xs">
                      Amount: ${localFilters.amountRange[0].toLocaleString()} - ${localFilters.amountRange[1].toLocaleString()}
                    </Badge>
                  )}
                  {localFilters.community.map((community) => (
                    <Badge key={community} variant="secondary" className="text-xs">
                      {community}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
} 