import { storage, type IStorage } from "./storage";

let database: IStorage;

export function initializeDatabase(): Promise<void> {
  return new Promise((resolve) => {
    // For now, we're using in-memory storage
    // In production, this would initialize MongoDB or PostgreSQL
    database = storage;
    
    console.log("Database initialized with in-memory storage");
    resolve();
  });
}

export function getDatabase(): IStorage {
  if (!database) {
    throw new Error("Database not initialized. Call initializeDatabase() first.");
  }
  return database;
}
