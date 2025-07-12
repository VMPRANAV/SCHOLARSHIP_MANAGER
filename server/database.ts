import { MongoClient, Db, Collection } from 'mongodb';
import type { Scholarship, AdminUser, InsertScholarship, InsertAdminUser } from '@shared/schema';

export interface IDatabase {
  // Scholarship methods
  getScholarships(filters?: { educationLevel?: string; status?: string; search?: string }): Promise<Scholarship[]>;
  getScholarship(id: string): Promise<Scholarship | null>;
  createScholarship(scholarship: InsertScholarship): Promise<Scholarship>;
  updateScholarship(id: string, scholarship: Partial<InsertScholarship>): Promise<Scholarship | null>;
  deleteScholarship(id: string): Promise<boolean>;
  
  // Admin methods
  getAdminUser(id: string): Promise<AdminUser | null>;
  getAdminUserByUsername(username: string): Promise<AdminUser | null>;
  createAdminUser(user: InsertAdminUser): Promise<AdminUser>;
}

class MongoDatabase implements IDatabase {
  private client: MongoClient;
  private db: Db;
  private scholarships: Collection<Scholarship>;
  private adminUsers: Collection<AdminUser>;

  constructor(client: MongoClient, dbName: string) {
    this.client = client;
    this.db = client.db(dbName);
    this.scholarships = this.db.collection<Scholarship>('scholarships');
    this.adminUsers = this.db.collection<AdminUser>('adminUsers');
  }

  async getScholarships(filters?: { educationLevel?: string; status?: string; search?: string }): Promise<Scholarship[]> {
    const query: any = {};

    if (filters?.educationLevel) {
      query.educationLevel = filters.educationLevel;
    }

    if (filters?.status) {
      query.status = filters.status;
    }

    if (filters?.search) {
      const searchRegex = new RegExp(filters.search, 'i');
      query.$or = [
        { name: searchRegex },
        { description: searchRegex },
        { community: searchRegex }
      ];
    }

    const result = await this.scholarships.find(query).toArray();
    return result.map(doc => ({
      ...doc,
      id: doc._id?.toString() || doc.id
    }));
  }

  async getScholarship(id: string): Promise<Scholarship | null> {
    const result = await this.scholarships.findOne({ _id: id } as any);
    if (!result) return null;
    
    return {
      ...result,
      id: result._id?.toString() || result.id
    };
  }

  async createScholarship(insertScholarship: InsertScholarship): Promise<Scholarship> {
    const scholarship = {
      ...insertScholarship,
      organizationLogo: insertScholarship.organizationLogo || null,
      community: insertScholarship.community || null,
      genderRequirement: insertScholarship.genderRequirement || null,
      applicationLink: insertScholarship.applicationLink || null,
      applicationFormPath: insertScholarship.applicationFormPath || null,
      status: insertScholarship.status || "active",
      createdAt: new Date()
    };

    const result = await this.scholarships.insertOne(scholarship as any);
    
    return {
      ...scholarship,
      id: result.insertedId.toString()
    };
  }

  async updateScholarship(id: string, updates: Partial<InsertScholarship>): Promise<Scholarship | null> {
    const result = await this.scholarships.findOneAndUpdate(
      { _id: id } as any,
      { $set: updates },
      { returnDocument: 'after' }
    );

    if (!result) return null;
    
    return {
      ...result,
      id: result._id?.toString() || result.id
    };
  }

  async deleteScholarship(id: string): Promise<boolean> {
    const result = await this.scholarships.deleteOne({ _id: id } as any);
    return result.deletedCount === 1;
  }

  async getAdminUser(id: string): Promise<AdminUser | null> {
    const result = await this.adminUsers.findOne({ _id: id } as any);
    if (!result) return null;
    
    return {
      ...result,
      id: result._id?.toString() || result.id
    };
  }

  async getAdminUserByUsername(username: string): Promise<AdminUser | null> {
    const result = await this.adminUsers.findOne({ username });
    if (!result) return null;
    
    return {
      ...result,
      id: result._id?.toString() || result.id
    };
  }

  async createAdminUser(insertUser: InsertAdminUser): Promise<AdminUser> {
    const user = {
      ...insertUser,
      email: insertUser.email || null,
      createdAt: new Date()
    };

    const result = await this.adminUsers.insertOne(user as any);
    
    return {
      ...user,
      id: result.insertedId.toString()
    };
  }
}

let database: IDatabase | null = null;

export async function initializeDatabase(): Promise<IDatabase> {
  if (database) return database;

  const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
  const dbName = process.env.MONGODB_DB_NAME || 'scholarship_hub';

  try {
    console.log('Connecting to MongoDB...');
    const client = new MongoClient(mongoUri, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      connectTimeoutMS: 5000,
    });
    await client.connect();
    
    console.log('Connected to MongoDB successfully');
    database = new MongoDatabase(client, dbName);

    // Create default admin user if it doesn't exist
    const existingAdmin = await database.getAdminUserByUsername('admin');
    if (!existingAdmin) {
      await database.createAdminUser({
        username: "admin",
        password: "admin123", // In production, this should be hashed
        email: "admin@scholarshiphub.edu"
      });
      console.log('Created default admin user');
    }

    // Create sample scholarships if collection is empty
    const existingScholarships = await database.getScholarships();
    if (existingScholarships.length === 0) {
      await createSampleScholarships(database);
      console.log('Created sample scholarships');
    }

    return database;
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    console.log('Falling back to in-memory storage...');
    
    // Import and use the in-memory storage as fallback
    const { storage } = await import('./storage');
    database = storage;
    return storage;
  }
}

async function createSampleScholarships(db: IDatabase) {
  const sampleScholarships = [
    {
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
    },
    {
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
    },
    {
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
    },
    {
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
    },
    {
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
    },
    {
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
    }
  ];

  for (const scholarship of sampleScholarships) {
    await db.createScholarship(scholarship);
  }
}

export function getDatabase(): IDatabase {
  if (!database) {
    throw new Error('Database not initialized. Call initializeDatabase() first.');
  }
  return database;
}