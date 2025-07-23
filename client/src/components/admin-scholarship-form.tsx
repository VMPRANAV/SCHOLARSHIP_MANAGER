import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Upload } from "lucide-react"; // Only for file upload icons
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { insertScholarshipSchema, type Scholarship } from "@shared/schema";
import { scholarshipApi } from "@/lib/api";
import { z } from "zod";

interface AdminScholarshipFormProps {
  scholarship?: Scholarship;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const formSchema = insertScholarshipSchema.extend({
  amount: z.string().min(1, "Amount is required"),
  applicationEndDate: z.string().min(1, "Application end date is required"), // Keep as string for input type="date"
  logo: z.any().nullable(), // For file input
  applicationForm: z.any().nullable(), // For file input
});

type FormData = z.infer<typeof formSchema>;

const EDUCATION_LEVELS = [
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

const STATUS_OPTIONS = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];

export default function AdminScholarshipForm({
  scholarship,
  onSuccess,
  onCancel,
}: AdminScholarshipFormProps) {
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [formFile, setFormFile] = useState<File | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: scholarship?.name || "",
      amount: scholarship?.amount || "",
      educationLevel: scholarship?.educationLevel || "",
      applicationEndDate: scholarship?.applicationEndDate || "",
      description: scholarship?.description || "",
      eligibility: scholarship?.eligibility || "",
      community: scholarship?.community || "", // Will be converted to string for default
      genderRequirement: scholarship?.genderRequirement || "All Genders",
      applicationLink: scholarship?.applicationLink || "",
      status: scholarship?.status || "active",
      logo: null,
      applicationForm: null,
    },
  });

  useEffect(() => {
    if (scholarship) {
      form.reset({
        ...scholarship,
        amount: scholarship.amount, // Ensure amount is string
        community: scholarship.community || "", // Convert array to string for default value
      });
    }
  }, [scholarship, form]);

  const createUpdateMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (key === "logo" || key === "applicationForm") {
          // Files are handled separately
          return;
        }
        if (value !== null && value !== undefined) {
          formData.append(key, value);
        }
      });

      if (logoFile) formData.append("logo", logoFile);
      if (formFile) formData.append("applicationForm", formFile);

      if (scholarship) {
        return scholarshipApi.update(scholarship.id, formData);
      } else {
        return scholarshipApi.create(formData);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/scholarships"] });
      toast({
        title: "Success",
        description: `Scholarship ${scholarship ? "updated" : "created"} successfully`,
      });
      onSuccess?.(); // Changed from onClose() to onSuccess()
      form.reset();
      setLogoFile(null);
      setFormFile(null);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : `Failed to ${scholarship ? "update" : "create"} scholarship`,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: FormData) => {
    createUpdateMutation.mutate(data);
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
    <div className="p-6 bg-white rounded-lg shadow-md max-w-4xl mx-auto my-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        {scholarship ? "Edit Scholarship" : "Add New Scholarship"}
      </h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="educationLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Education Level</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {EDUCATION_LEVELS.map((level) => (
                          <SelectItem key={level.value} value={level.value}>
                            {level.label}
                          </SelectItem>
                        ))}
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
                    <FormLabel>Application End Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="genderRequirement"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender Requirement</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value ?? ""}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select gender requirement" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {GENDER_REQUIREMENTS.map((gender) => (
                          <SelectItem key={gender.value} value={gender.value}>
                            {gender.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value ?? ""}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {STATUS_OPTIONS.map((status) => (
                          <SelectItem key={status.value} value={status.value}>
                            {status.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Description and Eligibility */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700">Details</h3>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea rows={4} placeholder="Enter detailed description of the scholarship" {...field} />
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
          </div>

          {/* Community and Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700">Community and Links</h3>
            <FormField
              control={form.control}
              name="community"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Target Communities</FormLabel>
                  <FormControl>
                    {/* Simple input for communities, user will enter comma-separated */}
                    <Input
                      placeholder="e.g., STEM Students, International Students"
                      {...field}
                      value={field.value || ''}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="applicationLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Application Link</FormLabel>
                  <FormControl>
                    <Input type="url" placeholder="https://example.com/apply" {...field} value={field.value || ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* File Uploads */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700">Files</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Logo Upload */}
              <div className="space-y-2">
                <Label htmlFor="logo-upload">Organization Logo</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, 'logo')}
                    className="hidden"
                    id="logo-upload"
                  />
                  <label htmlFor="logo-upload" className="cursor-pointer">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">
                      {logoFile ? logoFile.name : 'Click to upload logo'}
                    </p>
                    <p className="text-sm text-gray-500">PNG, JPG up to 10MB</p>
                  </label>
                </div>
              </div>

              {/* Application Form Upload */}
              <div className="space-y-2">
                <Label htmlFor="form-upload">Application Form (PDF)</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors cursor-pointer">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => handleFileChange(e, 'form')}
                    className="hidden"
                    id="form-upload"
                  />
                  <label htmlFor="form-upload" className="cursor-pointer">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">
                      {formFile ? formFile.name : 'Click to upload application form'}
                    </p>
                    <p className="text-sm text-gray-500">PDF up to 10MB</p>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 text-white hover:bg-blue-700"
              disabled={createUpdateMutation.isPending}
            >
              {createUpdateMutation.isPending
                ? "Saving..."
                : scholarship
                ? "Update Scholarship"
                : "Add Scholarship"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}