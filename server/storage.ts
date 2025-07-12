import { scholarships, adminUsers, type Scholarship, type InsertScholarship, type AdminUser, type InsertAdminUser } from "@shared/schema";

export interface IStorage {
  // Scholarship methods
  getScholarships(filters?: { educationLevel?: string; status?: string; search?: string }): Promise<Scholarship[]>;
  getScholarship(id: number): Promise<Scholarship | undefined>;
  createScholarship(scholarship: InsertScholarship): Promise<Scholarship>;
  updateScholarship(id: number, scholarship: Partial<InsertScholarship>): Promise<Scholarship | undefined>;
  deleteScholarship(id: number): Promise<boolean>;
  
  // Admin methods
  getAdminUser(id: number): Promise<AdminUser | undefined>;
  getAdminUserByUsername(username: string): Promise<AdminUser | undefined>;
  createAdminUser(user: InsertAdminUser): Promise<AdminUser>;
}

export class MemStorage implements IStorage {
  private scholarships: Map<number, Scholarship>;
  private adminUsers: Map<number, AdminUser>;
  private currentScholarshipId: number;
  private currentAdminId: number;

  constructor() {
    this.scholarships = new Map();
    this.adminUsers = new Map();
    this.currentScholarshipId = 1;
    this.currentAdminId = 1;

    // Add default admin user
    this.createAdminUser({
      username: "admin",
      password: "admin123", // In production, this should be hashed
      email: "admin@scholarshiphub.edu"
    });

    // Add some sample scholarships
    this.createScholarship({
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

    this.createScholarship({
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

    this.createScholarship({
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

    this.createScholarship({
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

    this.createScholarship({
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

    this.createScholarship({
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

  async getScholarships(filters?: { educationLevel?: string; status?: string; search?: string }): Promise<Scholarship[]> {
    let result = Array.from(this.scholarships.values());

    if (filters?.educationLevel) {
      result = result.filter(s => s.educationLevel === filters.educationLevel);
    }

    if (filters?.status) {
      result = result.filter(s => s.status === filters.status);
    }

    if (filters?.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(s => 
        s.name.toLowerCase().includes(searchLower) ||
        s.description.toLowerCase().includes(searchLower) ||
        s.community?.toLowerCase().includes(searchLower)
      );
    }

    return result;
  }

  async getScholarship(id: number): Promise<Scholarship | undefined> {
    return this.scholarships.get(id);
  }

  async createScholarship(insertScholarship: InsertScholarship): Promise<Scholarship> {
    const id = this.currentScholarshipId++;
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

  async updateScholarship(id: number, updates: Partial<InsertScholarship>): Promise<Scholarship | undefined> {
    const existing = this.scholarships.get(id);
    if (!existing) return undefined;

    const updated: Scholarship = { ...existing, ...updates };
    this.scholarships.set(id, updated);
    return updated;
  }

  async deleteScholarship(id: number): Promise<boolean> {
    return this.scholarships.delete(id);
  }

  async getAdminUser(id: number): Promise<AdminUser | undefined> {
    return this.adminUsers.get(id);
  }

  async getAdminUserByUsername(username: string): Promise<AdminUser | undefined> {
    return Array.from(this.adminUsers.values()).find(
      (user) => user.username === username,
    );
  }

  async createAdminUser(insertUser: InsertAdminUser): Promise<AdminUser> {
    const id = this.currentAdminId++;
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
