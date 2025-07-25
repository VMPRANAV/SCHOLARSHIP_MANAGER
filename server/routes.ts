import type { Express } from "express";
import express from "express";
import { createServer, type Server } from "http";
import { getDatabase } from "./database";
import { insertScholarshipSchema } from "@shared/schema";
import multer from "multer";
import path from "path";
import fs from "fs";

// Set up multer for file uploads
const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    // Generate unique filename with original extension
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + extension);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.fieldname === 'logo') {
      // Accept images only
      if (file.mimetype.startsWith('image/')) {
        cb(null, true);
      } else {
        cb(new Error('Only image files are allowed for logo'));
      }
    } else if (file.fieldname === 'applicationForm') {
      // Accept PDFs only
      if (file.mimetype === 'application/pdf') {
        cb(null, true);
      } else {
        cb(new Error('Only PDF files are allowed for application forms'));
      }
    } else {
      cb(null, true);
    }
  }
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Serve uploaded files
  app.use('/uploads', express.static(uploadsDir));

  // Get all scholarships with optional filters
  app.get("/api/scholarships", async (req, res) => {
    try {
      const { 
        educationLevel, 
        status, 
        search, 
        amountMin, 
        amountMax, 
        deadlineFrom, 
        deadlineTo, 
        community, 
        genderRequirement,
        sortBy,
        sortOrder
      } = req.query;
      
      const database = getDatabase();
      const scholarships = await database.getScholarships({
        educationLevel: educationLevel as string,
        status: status as string,
        search: search as string,
        amountRange: amountMin && amountMax ? [parseInt(amountMin as string), parseInt(amountMax as string)] : undefined,
        deadlineRange: deadlineFrom && deadlineTo ? [deadlineFrom as string, deadlineTo as string] : undefined,
        community: community ? (Array.isArray(community) ? community as string[] : [community as string]) : undefined,
        genderRequirement: genderRequirement as string,
        sortBy: sortBy as string || 'name',
        sortOrder: (sortOrder as 'asc' | 'desc') || 'asc'
      });
      res.json(scholarships);
    } catch (error) {
      console.error("Error fetching scholarships:", error);
      res.status(500).json({ message: "Failed to fetch scholarships" });
    }
  });

  // Get scholarship by ID
  app.get("/api/scholarships/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const database = getDatabase();
      const scholarship = await database.getScholarship(id);
      if (!scholarship) {
        return res.status(404).json({ message: "Scholarship not found" });
      }
      res.json(scholarship);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch scholarship" });
    }
  });

  // Create new scholarship
  app.post("/api/scholarships", upload.fields([
    { name: 'logo', maxCount: 1 },
    { name: 'applicationForm', maxCount: 1 }
  ]), async (req, res) => {
    console.log('Incoming scholarship creation request body:', req.body);
    console.log('Type of req.body.amount:', typeof req.body.amount);
    try {
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
      
      // Parse the scholarship data
      if (req.body.amount === undefined || req.body.amount === null) {
        throw new Error("Amount is required");
      }
      const scholarshipData = {
        ...req.body,
        amount: req.body.amount.toString(),
      };

      // Add file paths if files were uploaded
      if (files?.logo?.[0]) {
        scholarshipData.organizationLogo = `/uploads/${files.logo[0].filename}`;
      }
      if (files?.applicationForm?.[0]) {
        scholarshipData.applicationFormPath = `/uploads/${files.applicationForm[0].filename}`;
      }

      // Validate the data
      const validatedData = insertScholarshipSchema.parse(scholarshipData);
      
      const database = getDatabase();
      const scholarship = await database.createScholarship(validatedData);
      res.status(201).json(scholarship);
    } catch (error) {
      console.error("Error creating scholarship:", error);
      res.status(400).json({ message: error instanceof Error ? error.message : "Invalid scholarship data" });
    }
  });

  // Update scholarship
  app.put("/api/scholarships/:id", upload.fields([
    { name: 'logo', maxCount: 1 },
    { name: 'applicationForm', maxCount: 1 }
  ]), async (req, res) => {
    try {
      const id = req.params.id;
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
      
      const database = getDatabase();
      // Get existing scholarship to clean up old files
      const existingScholarship = await database.getScholarship(id);
      if (!existingScholarship) {
        return res.status(404).json({ message: "Scholarship not found" });
      }
      
      const updates = { ...req.body };
      if (req.body.amount) {
        updates.amount = req.body.amount.toString();
      }

      // Add file paths if new files were uploaded and clean up old files
      if (files?.logo?.[0]) {
        updates.organizationLogo = `/uploads/${files.logo[0].filename}`;
        // Clean up old logo file if it exists and is in uploads folder
        if (existingScholarship.organizationLogo && existingScholarship.organizationLogo.startsWith('/uploads/')) {
          const oldLogoPath = path.join(uploadsDir, path.basename(existingScholarship.organizationLogo));
          if (fs.existsSync(oldLogoPath)) {
            fs.unlinkSync(oldLogoPath);
          }
        }
      }
      if (files?.applicationForm?.[0]) {
        updates.applicationFormPath = `/uploads/${files.applicationForm[0].filename}`;
        // Clean up old application form file if it exists and is in uploads folder
        if (existingScholarship.applicationFormPath && existingScholarship.applicationFormPath.startsWith('/uploads/')) {
          const oldFormPath = path.join(uploadsDir, path.basename(existingScholarship.applicationFormPath));
          if (fs.existsSync(oldFormPath)) {
            fs.unlinkSync(oldFormPath);
          }
        }
      }

      const scholarship = await database.updateScholarship(id, updates);
      res.json(scholarship);
    } catch (error) {
      res.status(400).json({ message: error instanceof Error ? error.message : "Invalid update data" });
    }
  });

  // Delete scholarship
  app.delete("/api/scholarships/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const database = getDatabase();
      
      // Get scholarship to clean up files before deletion
      const scholarship = await database.getScholarship(id);
      if (!scholarship) {
        return res.status(404).json({ message: "Scholarship not found" });
      }
      
      // Clean up associated files
      if (scholarship.organizationLogo && scholarship.organizationLogo.startsWith('/uploads/')) {
        const logoPath = path.join(uploadsDir, path.basename(scholarship.organizationLogo));
        if (fs.existsSync(logoPath)) {
          fs.unlinkSync(logoPath);
        }
      }
      if (scholarship.applicationFormPath && scholarship.applicationFormPath.startsWith('/uploads/')) {
        const formPath = path.join(uploadsDir, path.basename(scholarship.applicationFormPath));
        if (fs.existsSync(formPath)) {
          fs.unlinkSync(formPath);
        }
      }
      
      const success = await database.deleteScholarship(id);
      if (!success) {
        return res.status(404).json({ message: "Scholarship not found" });
      }
      res.json({ message: "Scholarship deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete scholarship" });
    }
  });

  // Admin login
  app.post("/api/admin/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      const database = getDatabase();
      const admin = await database.getAdminUserByUsername(username);
      
      if (!admin || admin.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // In production, you'd use proper session management
      res.json({ message: "Login successful", admin: { id: admin.id, username: admin.username, email: admin.email } });
    } catch (error) {
      res.status(500).json({ message: "Login failed" });
    }
  });

  // KPR scholarship forms download
  app.get("/api/kpr/:type/download", (req, res) => {
    const { type } = req.params;
    const formPath = path.join(process.cwd(), 'kpr-forms', `${type}-application.pdf`);
    
    // In a real application, you'd have actual PDF files
    // For now, we'll return a placeholder response
    res.json({ 
      message: `${type} application form download would start here`,
      downloadUrl: `/api/kpr/${type}/form.pdf`
    });
  });

  const httpServer = createServer(app);
  return httpServer;
}
