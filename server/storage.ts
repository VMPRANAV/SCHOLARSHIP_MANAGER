import { scholarships, adminUsers, type Scholarship, type InsertScholarship, type AdminUser, type InsertAdminUser } from "@shared/schema";

export interface IStorage {
  // Scholarship methods
  getScholarships(filters?: { 
    educationLevel?: string; 
    status?: string; 
    search?: string;
    amountRange?: [number, number];
    deadlineRange?: [string, string];
    community?: string[];
    genderRequirement?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }): Promise<Scholarship[]>;
  getScholarship(id: string): Promise<Scholarship | null>;
  createScholarship(scholarship: InsertScholarship): Promise<Scholarship>;
  updateScholarship(id: string, scholarship: Partial<InsertScholarship>): Promise<Scholarship | null>;
  deleteScholarship(id: string): Promise<boolean>;
  
  // Admin methods
  getAdminUser(id: string): Promise<AdminUser | null>;
  getAdminUserByUsername(username: string): Promise<AdminUser | null>;
  createAdminUser(user: InsertAdminUser): Promise<AdminUser>;
}

export class MemStorage implements IStorage {
  private scholarships: Map<string, Scholarship>;
  private adminUsers: Map<string, AdminUser>;
  private currentScholarshipId: number;
  private currentAdminId: number;

  constructor() {
    this.scholarships = new Map();
    this.adminUsers = new Map();
    this.currentScholarshipId = 1;
    this.currentAdminId = 1;

    // Initialize with sample data
    this.initSampleData();
  }

  private async initSampleData() {
    // Add default admin user
    await this.createAdminUser({
      username: "admin",
      password: "admin123", // In production, this should be hashed
      email: "admin@scholarshiphub.edu"
    });

    // Add some sample scholarships
    await this.createScholarship({
      name: "MIT Excellence Scholarship",
      organizationLogo: "MIT",
      amount: "25000",
      educationLevel: "Bachelor's",
      applicationEndDate: "2024-12-15",
      description: "A prestigious scholarship program designed to support outstanding students pursuing undergraduate degrees at MIT. This comprehensive program covers tuition, living expenses, and provides additional support for research opportunities.",
      eligibility: "Minimum GPA of 3.8 on a 4.0 scale; Demonstrated excellence in STEM fields; Strong recommendation letters from faculty; Research experience or demonstrated interest in research; Full-time enrollment commitment",
      community: "STEM Students, International Students",
      genderRequirement: "All Genders",
      applicationLink: "https://mit.edu/apply",
      applicationFormPath: "/forms/mit-application.pdf",
      status: "active"
    });

    await this.createScholarship({
      name: "Stanford Research Grant",
      organizationLogo: "SF",
      amount: "15000",
      educationLevel: "Master's",
      applicationEndDate: "2025-01-30",
      description: "Supporting graduate students in innovative research projects across all disciplines.",
      eligibility: "Currently enrolled in Master's program; Research proposal required; Minimum 3.5 GPA",
      community: "Graduate Students",
      genderRequirement: "All Genders",
      applicationLink: "https://stanford.edu/apply",
      applicationFormPath: "/forms/stanford-application.pdf",
      status: "active"
    });

    await this.createScholarship({
      name: "Georgia Tech Merit Award",
      organizationLogo: "GT",
      amount: "12500",
      educationLevel: "Bachelor's",
      applicationEndDate: "2025-03-15",
      description: "Merit-based scholarship for engineering and technology students.",
      eligibility: "Engineering or technology major; Minimum 3.6 GPA; Leadership experience",
      community: "Engineering Students",
      genderRequirement: "All Genders",
      applicationLink: "https://gatech.edu/apply",
      applicationFormPath: "/forms/gatech-application.pdf",
      status: "active"
    });

    await this.createScholarship({
      name: "Harvard Leadership Fund",
      organizationLogo: "H",
      amount: "50000",
      educationLevel: "Master's",
      applicationEndDate: "2025-02-28",
      description: "Supporting future leaders in various fields through comprehensive funding.",
      eligibility: "Demonstrated leadership experience; Community service; Academic excellence; Vision for positive impact",
      community: "Future Leaders",
      genderRequirement: "All Genders",
      applicationLink: "https://harvard.edu/apply",
      applicationFormPath: "/forms/harvard-application.pdf",
      status: "active"
    });

    await this.createScholarship({
      name: "NYU Innovation Grant",
      organizationLogo: "NY",
      amount: "18000",
      educationLevel: "Bachelor's",
      applicationEndDate: "2025-04-10",
      description: "Supporting innovative students in creative and technological fields.",
      eligibility: "Innovation project or portfolio; Creative or tech focus; Strong academic record",
      community: "Innovation Students",
      genderRequirement: "All Genders",
      applicationLink: "https://nyu.edu/apply",
      applicationFormPath: "/forms/nyu-application.pdf",
      status: "active"
    });

    await this.createScholarship({
      name: "UC Berkeley Research Fund",
      organizationLogo: "UC",
      amount: "22000",
      educationLevel: "PhD",
      applicationEndDate: "2025-05-01",
      description: "Supporting doctoral research across all academic disciplines.",
      eligibility: "PhD program enrollment; Research proposal; Faculty recommendation; Academic excellence",
      community: "PhD Students",
      genderRequirement: "All Genders",
      applicationLink: "https://berkeley.edu/apply",
      applicationFormPath: "/forms/berkeley-application.pdf",
      status: "active"
    });
  }

  async getScholarships(filters?: { 
    educationLevel?: string; 
    status?: string; 
    search?: string;
    amountRange?: [number, number];
    deadlineRange?: [string, string];
    community?: string[];
    genderRequirement?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }): Promise<Scholarship[]> {
    let result = Array.from(this.scholarships.values());

    // Education Level filter - skip if "all" is selected
    if (filters?.educationLevel && filters.educationLevel !== "all") {
      result = result.filter(s => s.educationLevel === filters.educationLevel);
    }

    // Status filter
    if (filters?.status) {
      result = result.filter(s => s.status === filters.status);
    }

    // Search filter
    if (filters?.search && filters.search.trim()) {
      const searchLower = filters.search.toLowerCase().trim();
      result = result.filter(s => 
        s.name.toLowerCase().includes(searchLower) ||
        s.description.toLowerCase().includes(searchLower) ||
        (s.community && s.community.toLowerCase().includes(searchLower))
      );
    }

    // Amount range filter
    if (filters?.amountRange && (filters.amountRange[0] > 0 || filters.amountRange[1] < 100000)) {
      result = result.filter(s => {
        const amount = parseFloat(s.amount);
        return amount >= filters.amountRange![0] && amount <= filters.amountRange![1];
      });
    }

    // Deadline range filter - only apply if both dates are provided
    if (filters?.deadlineRange && filters.deadlineRange[0] && filters.deadlineRange[1]) {
      result = result.filter(s => {
        const deadline = new Date(s.applicationEndDate);
        const fromDate = new Date(filters.deadlineRange![0]);
        const toDate = new Date(filters.deadlineRange![1]);
        return deadline >= fromDate && deadline <= toDate;
      });
    }

    // Community filter - check if any of the selected communities match
    if (filters?.community && filters.community.length > 0) {
      result = result.filter(s => 
        s.community && filters.community!.some(comm => 
          s.community!.toLowerCase().includes(comm.toLowerCase())
        )
      );
    }

    // Gender requirement filter - skip if "All Genders" is selected
    if (filters?.genderRequirement && filters.genderRequirement !== "All Genders") {
      result = result.filter(s => s.genderRequirement === filters.genderRequirement);
    }

    // Sort results
    if (filters?.sortBy) {
      const sortField = filters.sortBy === 'deadline' ? 'applicationEndDate' : filters.sortBy;
      const sortOrder = filters.sortOrder === 'desc' ? -1 : 1;
      
      result.sort((a, b) => {
        let aValue: any = a[sortField as keyof Scholarship];
        let bValue: any = b[sortField as keyof Scholarship];
        
        if (sortField === 'amount') {
          aValue = parseFloat(aValue);
          bValue = parseFloat(bValue);
        } else if (sortField === 'applicationEndDate') {
          aValue = new Date(aValue);
          bValue = new Date(bValue);
        }
        
        if (aValue < bValue) return -1 * sortOrder;
        if (aValue > bValue) return 1 * sortOrder;
        return 0;
      });
    }

    return result;
  }

  async getScholarship(id: string): Promise<Scholarship | null> {
    return this.scholarships.get(id) || null;
  }

  async createScholarship(insertScholarship: InsertScholarship): Promise<Scholarship> {
    const id = (this.currentScholarshipId++).toString();
    const scholarship: Scholarship = { 
      ...insertScholarship,
      organizationLogo: insertScholarship.organizationLogo || null,
      community: insertScholarship.community || null,
      genderRequirement: insertScholarship.genderRequirement || null,
      applicationLink: insertScholarship.applicationLink || null,
      applicationFormPath: insertScholarship.applicationFormPath || null,
      status: insertScholarship.status || "active",
      id,
      createdAt: new Date()
    };
    this.scholarships.set(id, scholarship);
    return scholarship;
  }

  async updateScholarship(id: string, updates: Partial<InsertScholarship>): Promise<Scholarship | null> {
    const existing = this.scholarships.get(id);
    if (!existing) return null;

    const updated: Scholarship = { ...existing, ...updates };
    this.scholarships.set(id, updated);
    return updated;
  }

  async deleteScholarship(id: string): Promise<boolean> {
    return this.scholarships.delete(id);
  }

  async getAdminUser(id: string): Promise<AdminUser | null> {
    return this.adminUsers.get(id) || null;
  }

  async getAdminUserByUsername(username: string): Promise<AdminUser | null> {
    return Array.from(this.adminUsers.values()).find(
      (user) => user.username === username,
    ) || null;
  }

  async createAdminUser(insertUser: InsertAdminUser): Promise<AdminUser> {
    const id = (this.currentAdminId++).toString();
    const user: AdminUser = { 
      ...insertUser,
      email: insertUser.email || null,
      id,
      createdAt: new Date()
    };
    this.adminUsers.set(id, user);
    return user;
  }
}

export const storage = new MemStorage();
