import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Edit, Eye, Trash2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { scholarshipApi } from "@/lib/api";
import AddScholarshipForm from "./add-scholarship-form";
import EditScholarshipForm from "./edit-scholarship-form";
import ScholarshipDetailModal from "./scholarship-detail-modal";
import type { Scholarship } from "@shared/schema";

export default function AdminDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedScholarship, setSelectedScholarship] = useState<Scholarship | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: scholarships = [], isLoading } = useQuery({
    queryKey: ['/api/scholarships', { search: searchQuery, status: statusFilter }],
    queryFn: () => scholarshipApi.getAll({ 
      search: searchQuery, 
      status: statusFilter === 'all' ? undefined : statusFilter 
    }),
  });

  const deleteMutation = useMutation({
    mutationFn: scholarshipApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/scholarships'] });
      toast({
        title: "Success",
        description: "Scholarship deleted successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete scholarship",
        variant: "destructive",
      });
    },
  });

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this scholarship?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleEdit = (scholarship: Scholarship) => {
    setSelectedScholarship(scholarship);
    setIsEditFormOpen(true);
  };

  const handleView = (scholarship: Scholarship) => {
    setSelectedScholarship(scholarship);
    setIsViewModalOpen(true);
  };

  const closeEditForm = () => {
    setIsEditFormOpen(false);
    setSelectedScholarship(null);
  };

  const closeViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedScholarship(null);
  };

  const formatAmount = (amount: string) => {
    const num = parseFloat(amount);
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(num);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getLogoInitials = (name: string, logo?: string | null) => {
    if (logo && !logo.startsWith('/uploads')) {
      return logo;
    }
    return name.split(' ').map(word => word[0]).join('').substring(0, 3);
  };

  const activeScholarships = scholarships.filter((s: Scholarship) => s.status === 'active');
  const totalAmount = scholarships.reduce((sum: number, s: Scholarship) => sum + parseFloat(s.amount), 0);

  return (
    <div className="flex-1 bg-dark-overlay rounded-2xl p-8 m-4">
      <div className="p-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-white">Dashboard Overview</h2>
          <Button 
            onClick={() => setIsAddFormOpen(true)}
            className="bg-education-blue text-white hover:bg-blue-800"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Scholarship
          </Button>
        </div>

        {/* Stats Grid - Update card backgrounds */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-dark-overlay rounded-lg p-6 shadow-sm border border-blue-500/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm">Total Scholarships</p>
                <p className="text-2xl font-bold text-slate-800">{scholarships.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Plus className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-dark-overlay rounded-lg p-6 shadow-sm border border-blue-500/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm">Active Scholarships</p>
                <p className="text-2xl font-bold text-emerald-600">{activeScholarships.length}</p>
              </div>
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <Eye className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-dark-overlay rounded-lg p-6 shadow-sm border border-blue-500/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm">Total Amount</p>
                <p className="text-2xl font-bold text-purple-600">
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    notation: 'compact',
                  }).format(totalAmount)}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-purple-600 font-bold">$</span>
              </div>
            </div>
          </div>
          
          <div className="bg-dark-overlay rounded-lg p-6 shadow-sm border border-blue-500/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm">Average Amount</p>
                <p className="text-2xl font-bold text-orange-600">
                  {scholarships.length > 0 ? formatAmount((totalAmount / scholarships.length).toString()) : '$0'}
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <span className="text-orange-600 font-bold">~</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scholarship Management Table - Update background */}
        <div className="bg-dark-overlay rounded-lg shadow-sm border border-blue-500/30">
          <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-slate-800">All Scholarships</h3>
            <div className="flex space-x-3">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <Input
                  placeholder="Search scholarships..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Scholarship</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Education Level</TableHead>
                  <TableHead>Deadline</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <div className="flex items-center">
                          <Skeleton className="w-8 h-8 rounded-lg mr-3" />
                          <div>
                            <Skeleton className="w-32 h-4 mb-1" />
                            <Skeleton className="w-24 h-3" />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell><Skeleton className="w-16 h-4" /></TableCell>
                      <TableCell><Skeleton className="w-20 h-4" /></TableCell>
                      <TableCell><Skeleton className="w-20 h-4" /></TableCell>
                      <TableCell><Skeleton className="w-16 h-6 rounded-full" /></TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Skeleton className="w-6 h-6" />
                          <Skeleton className="w-6 h-6" />
                          <Skeleton className="w-6 h-6" />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : scholarships.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-slate-500">
                      No scholarships found
                    </TableCell>
                  </TableRow>
                ) : (
                  scholarships.map((scholarship: Scholarship) => (
                    <TableRow key={scholarship.id}>
                      <TableCell>
                        <div className="flex items-center">
                          {scholarship.organizationLogo && scholarship.organizationLogo.startsWith('/uploads') ? (
                            <img 
                              src={scholarship.organizationLogo} 
                              alt="Organization logo"
                              className="w-8 h-8 rounded-lg object-cover mr-3"
                            />
                          ) : (
                            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white text-xs font-bold mr-3">
                              {getLogoInitials(scholarship.name, scholarship.organizationLogo)}
                            </div>
                          )}
                          <div>
                            <div className="text-sm font-medium text-slate-900">{scholarship.name}</div>
                            <div className="text-sm text-slate-500">ID: {scholarship.id}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-slate-900">
                        {formatAmount(scholarship.amount)}
                      </TableCell>
                      <TableCell className="text-sm text-slate-900">
                        {scholarship.educationLevel}
                      </TableCell>
                      <TableCell className="text-sm text-slate-900">
                        {formatDate(scholarship.applicationEndDate)}
                      </TableCell>
                      <TableCell>
                        <Badge variant={scholarship.status === 'active' ? 'default' : 'secondary'}>
                          {scholarship.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={() => handleEdit(scholarship)}
                            title="Edit scholarship"
                          >
                            <Edit className="h-4 w-4 text-education-blue" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={() => handleView(scholarship)}
                            title="View scholarship details"
                          >
                            <Eye className="h-4 w-4 text-slate-600" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={() => handleDelete(scholarship.id)}
                            disabled={deleteMutation.isPending}
                            title="Delete scholarship"
                          >
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      <AddScholarshipForm 
        isOpen={isAddFormOpen} 
        onClose={() => setIsAddFormOpen(false)} 
      />

      <EditScholarshipForm 
        scholarship={selectedScholarship}
        isOpen={isEditFormOpen} 
        onClose={closeEditForm} 
      />

      <ScholarshipDetailModal
        scholarship={selectedScholarship}
        isOpen={isViewModalOpen}
        onClose={closeViewModal}
      />
    </div>
  );
}
