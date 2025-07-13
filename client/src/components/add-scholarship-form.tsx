import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { X, Upload } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { insertScholarshipSchema } from "@shared/schema";
import { scholarshipApi } from "@/lib/api";
import { z } from "zod";

const formSchema = insertScholarshipSchema.extend({
  amount: z.string().min(1, "Amount is required"),
});

type FormData = z.infer<typeof formSchema>;

interface AddScholarshipFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddScholarshipForm({ isOpen, onClose }: AddScholarshipFormProps) {
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [formFile, setFormFile] = useState<File | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      amount: "",
      educationLevel: "",
      applicationEndDate: "",
      description: "",
      eligibility: "",
      community: "",
      genderRequirement: "All Genders",
      applicationLink: "",
      status: "active",
    },
  });

  const createMutation = useMutation({
    mutationFn: (data: FormData) => {
      const formData = new FormData();
      
      Object.entries(data).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });
      
      if (logoFile) formData.append('logo', logoFile);
      if (formFile) formData.append('applicationForm', formFile);
      
      return scholarshipApi.create(formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/scholarships'] });
      toast({
        title: "Success",
        description: "Scholarship created successfully",
      });
      onClose();
      form.reset();
      setLogoFile(null);
      setFormFile(null);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create scholarship",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: FormData) => {
    createMutation.mutate(data);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'logo' | 'form') => {
    const file = e.target.files?.[0];
    if (file) {
      if (type === 'logo') {
        setLogoFile(file);
      } else {
        setFormFile(file);
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-slate-800">Add New Scholarship</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Scholarship Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter scholarship name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Scholarship Amount</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="25000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="educationLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Education Level</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="High School">High School</SelectItem>
                        <SelectItem value="Bachelor's">Bachelor's Degree</SelectItem>
                        <SelectItem value="Master's">Master's Degree</SelectItem>
                        <SelectItem value="PhD">PhD</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="applicationEndDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Application Deadline</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Logo Upload */}
            <div className="space-y-2">
              <Label>Organization Logo</Label>
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-education-blue transition-colors cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, 'logo')}
                  className="hidden"
                  id="logo-upload"
                />
                <label htmlFor="logo-upload" className="cursor-pointer">
                  <Upload className="h-8 w-8 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-600 mb-2">
                    {logoFile ? logoFile.name : 'Click to upload or drag and drop'}
                  </p>
                  <p className="text-sm text-slate-500">PNG, JPG up to 2MB</p>
                </label>
              </div>
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea rows={4} placeholder="Enter scholarship description..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="eligibility"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Eligibility Criteria</FormLabel>
                  <FormControl>
                    <Textarea rows={4} placeholder="Enter eligibility requirements (separate with semicolons)..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="community"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Target Community</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., STEM Students, International Students" {...field} value={field.value ?? ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="genderRequirement"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender Requirements</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value ?? ""}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="All Genders" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="All Genders">All Genders</SelectItem>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="applicationLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Application Link</FormLabel>
                  <FormControl>
                    <Input type="url" placeholder="https://example.com/apply" {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Application Form Upload */}
            <div className="space-y-2">
              <Label>Application Form (PDF)</Label>
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-education-blue transition-colors cursor-pointer">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => handleFileChange(e, 'form')}
                  className="hidden"
                  id="form-upload"
                />
                <label htmlFor="form-upload" className="cursor-pointer">
                  <Upload className="h-8 w-8 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-600 mb-2">
                    {formFile ? formFile.name : 'Click to upload application form'}
                  </p>
                  <p className="text-sm text-slate-500">PDF up to 10MB</p>
                </label>
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-6 border-t border-slate-200">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="bg-education-blue text-white hover:bg-blue-800"
                disabled={createMutation.isPending}
              >
                {createMutation.isPending ? 'Adding...' : 'Add Scholarship'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
