import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';
import type { Scholarship, InsertScholarship, InsertAdminUser, AdminUser } from '@shared/schema';
dotenv.config();

export interface IStorage {
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
  getAdminUser(id: string): Promise<AdminUser | null>;
  getAdminUserByUsername(username: string): Promise<AdminUser | null>;
  createAdminUser(user: InsertAdminUser): Promise<AdminUser>;
}

// MongoDB Storage Implementation
export class MongoStorage implements IStorage {
  private client: MongoClient;
  private dbName: string;
  private connected: boolean = false;

  constructor(uri: string, dbName: string) {
    this.client = new MongoClient(uri);
    this.dbName = dbName;
  }

  private async getDb() {
    if (!this.connected) {
      await this.client.connect();
      console.log("MongoDB connected!");
      this.connected = true;
    }
    return this.client.db(this.dbName);
  }

  async getScholarships(filters: {
    educationLevel?: string;
    status?: string;
    search?: string;
    amountRange?: [number, number];
    deadlineRange?: [string, string];
    community?: string[];
    genderRequirement?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  } = {}): Promise<Scholarship[]> {
    const db = await this.getDb();
    const query: any = {};
    if (filters.educationLevel && filters.educationLevel !== 'all') {
      query.educationLevel = filters.educationLevel;
    }
    if (filters.status) {
      query.status = filters.status;
    }
    if (filters.search) {
      query.$or = [
        { name: { $regex: filters.search, $options: 'i' } },
        { description: { $regex: filters.search, $options: 'i' } },
        { community: { $regex: filters.search, $options: 'i' } },
      ];
    }
    const scholarships = await db.collection('scholarships').find(query).toArray();
    return scholarships.map((doc: any) => ({
      id: doc._id.toString(),
      name: doc.name,
      organizationLogo: typeof doc.organizationLogo === 'string' ? doc.organizationLogo : undefined,
      amount: doc.amount,
      educationLevel: doc.educationLevel,
      applicationEndDate: doc.applicationEndDate,
      description: doc.description,
      eligibility: doc.eligibility,
      community: typeof doc.community === 'string' ? doc.community : undefined,
      genderRequirement: typeof doc.genderRequirement === 'string' ? doc.genderRequirement : undefined,
      applicationLink: typeof doc.applicationLink === 'string' ? doc.applicationLink : undefined,
      applicationFormPath: typeof doc.applicationFormPath === 'string' ? doc.applicationFormPath : undefined,
      status: doc.status,
      createdAt: doc.createdAt || null,
    }));
  }

  async getScholarship(id: string): Promise<Scholarship | null> {
    const db = await this.getDb();
    const doc = await db.collection('scholarships').findOne({ _id: new ObjectId(id) });
    if (!doc) return null;
    return {
      id: doc._id.toString(),
      name: doc.name,
      organizationLogo: typeof doc.organizationLogo === 'string' ? doc.organizationLogo : undefined,
      amount: doc.amount,
      educationLevel: doc.educationLevel,
      applicationEndDate: doc.applicationEndDate,
      description: doc.description,
      eligibility: doc.eligibility,
      community: typeof doc.community === 'string' ? doc.community : undefined,
      genderRequirement: typeof doc.genderRequirement === 'string' ? doc.genderRequirement : undefined,
      applicationLink: typeof doc.applicationLink === 'string' ? doc.applicationLink : undefined,
      applicationFormPath: typeof doc.applicationFormPath === 'string' ? doc.applicationFormPath : undefined,
      status: doc.status,
      createdAt: doc.createdAt || null,
    };
  }

  async createScholarship(scholarship: InsertScholarship): Promise<Scholarship> {
    const db = await this.getDb();
    const result = await db.collection('scholarships').insertOne({
      ...scholarship,
      createdAt: new Date(),
    });
    return {
      id: result.insertedId.toString(),
      name: scholarship.name,
      organizationLogo: typeof scholarship.organizationLogo === 'string' ? scholarship.organizationLogo : undefined,
      amount: scholarship.amount,
      educationLevel: scholarship.educationLevel,
      applicationEndDate: scholarship.applicationEndDate,
      description: scholarship.description,
      eligibility: scholarship.eligibility,
      community: typeof scholarship.community === 'string' ? scholarship.community : undefined,
      genderRequirement: typeof scholarship.genderRequirement === 'string' ? scholarship.genderRequirement : undefined,
      applicationLink: typeof scholarship.applicationLink === 'string' ? scholarship.applicationLink : undefined,
      applicationFormPath: typeof scholarship.applicationFormPath === 'string' ? scholarship.applicationFormPath : undefined,
      status: scholarship.status ?? '',
      createdAt: new Date(),
    };
  }

  async updateScholarship(id: string, updates: Partial<InsertScholarship>): Promise<Scholarship | null> {
    const db = await this.getDb();
    const result = await db.collection('scholarships').findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updates },
      { returnDocument: 'after' }
    );
    if (!result || !result.value) return null;
    return {
      id: result.value._id.toString(),
      name: result.value.name,
      organizationLogo: typeof result.value.organizationLogo === 'string' ? result.value.organizationLogo : undefined,
      amount: result.value.amount,
      educationLevel: result.value.educationLevel,
      applicationEndDate: result.value.applicationEndDate,
      description: result.value.description,
      eligibility: result.value.eligibility,
      community: typeof result.value.community === 'string' ? result.value.community : undefined,
      genderRequirement: typeof result.value.genderRequirement === 'string' ? result.value.genderRequirement : undefined,
      applicationLink: typeof result.value.applicationLink === 'string' ? result.value.applicationLink : undefined,
      applicationFormPath: typeof result.value.applicationFormPath === 'string' ? result.value.applicationFormPath : undefined,
      status: result.value.status,
      createdAt: result.value.createdAt || null,
    };
  }

  async deleteScholarship(id: string): Promise<boolean> {
    const db = await this.getDb();
    const result = await db.collection('scholarships').deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount === 1;
  }

  async getAdminUser(id: string): Promise<AdminUser | null> {
    const db = await this.getDb();
    const doc = await db.collection('admin_users').findOne({ _id: new ObjectId(id) });
    if (!doc) return null;
    return {
      id: doc._id.toString(),
      username: doc.username,
      password: doc.password,
      email: typeof doc.email === 'string' ? doc.email : null,
      createdAt: doc.createdAt || null,
    };
  }

  async getAdminUserByUsername(username: string): Promise<AdminUser | null> {
    const db = await this.getDb();
    const doc = await db.collection('admin_users').findOne({ username });
    if (!doc) return null;
    return {
      id: doc._id.toString(),
      username: doc.username,
      password: doc.password,
      email: typeof doc.email === 'string' ? doc.email : null,
      createdAt: doc.createdAt || null,
    };
  }

  async createAdminUser(user: InsertAdminUser): Promise<AdminUser> {
    const db = await this.getDb();
    const result = await db.collection('admin_users').insertOne({
      ...user,
      email: typeof user.email === 'string' ? user.email : null,
      createdAt: new Date(),
    });
    return {
      id: result.insertedId.toString(),
      username: user.username,
      password: user.password,
      email: typeof user.email === 'string' ? user.email : null,
      createdAt: new Date(),
    };
  }
}

// Always use MongoStorage for storage
const mongoUri = process.env.MONGODB_URI;
const mongoDbName ='ScholarshipTracker';
if (!mongoUri) {
  throw new Error("MONGODB_URI is not set. Please set it in your .env file.");
}

const storage: IStorage = new MongoStorage(mongoUri, mongoDbName);

// Create default admin user if not exists
(async () => {
  const adminUser = await storage.getAdminUserByUsername("admin");
  if (!adminUser) {
    await storage.createAdminUser({
      username: "admin",
      password: "admin123",
      email: "admin@example.com"
    });
    console.log("Default admin user created.");
  }
})();

export { storage };