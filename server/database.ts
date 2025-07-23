import { storage, type IStorage } from "./storage";
import dotenv from 'dotenv';
dotenv.config();

export async function initializeDatabase(): Promise<void> {
  // No explicit connect needed; MongoStorage connects automatically.
  console.log("Database ready (MongoStorage will connect on demand).");
}

export function getDatabase(): IStorage {
  if (!storage) {
    throw new Error("Database not initialized. Call initializeDatabase() first.");
  }
  return storage;
}
