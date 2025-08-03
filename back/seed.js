import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// Load environment variables
dotenv.config();

// Import models
import Scholarship from './models/Scholarship.js';

// Get directory name
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Read the scholarship data from the JSON file
const scholarshipData = JSON.parse(
  fs.readFileSync(path.join(__dirname, '..', 'ScholarshipTracker.scholarships.json'), 'utf8')
);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  dbName: 'main'
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

// Function to convert image file to base64
const imageToBase64 = (imagePath) => {
  try {
    const imageBuffer = fs.readFileSync(imagePath);
    const imageType = path.extname(imagePath).substring(1); // Get extension without dot
    return `data:image/${imageType};base64,${imageBuffer.toString('base64')}`;
  } catch (error) {
    console.error(`Error converting image to base64: ${imagePath}`, error);
    return null;
  }
};

// Get all image files from the img directory
const imgDirectory = path.join(__dirname, 'img');
const imageFiles = fs.readdirSync(imgDirectory)
  .filter(file => /\.(png|jpg|jpeg|gif)$/i.test(file))
  .map(file => path.join(imgDirectory, file));

console.log(`Found ${imageFiles.length} images in the img directory`);

// Process the data to match our schema
const processedData = scholarshipData.map((scholarship, index) => {
  // Convert ObjectId string to ObjectId
  delete scholarship._id;
  
  // Convert date strings to Date objects
  if (scholarship.createdAt && scholarship.createdAt.$date) {
    scholarship.createdAt = new Date(scholarship.createdAt.$date);
  }
  
  // Assign an image from the img folder to each scholarship (in sequence, looping if needed)
  if (imageFiles.length > 0) {
    const imageIndex = index % imageFiles.length;
    scholarship.organizationLogo = imageToBase64(imageFiles[imageIndex]);
    console.log(`Assigned image ${imageFiles[imageIndex]} to scholarship: ${scholarship.name}`);
  } else {
    scholarship.organizationLogo = null;
  }
  
  // Clear the applicationFormPath to use base64 instead
  if (scholarship.applicationFormPath) {
    scholarship.applicationFormData = null;
    delete scholarship.applicationFormPath;
  }
  
  return scholarship;
});

// Function to seed the database
const seedDatabase = async () => {
  try {
    // Clear existing scholarships
    await Scholarship.deleteMany({});
    console.log('Deleted existing scholarships');

    // Insert new scholarships
    await Scholarship.insertMany(processedData);
    console.log(`Successfully seeded ${processedData.length} scholarships`);
    
    // Disconnect from MongoDB
    mongoose.disconnect();
    console.log('MongoDB disconnected');
  } catch (error) {
    console.error('Error seeding database:', error);
    mongoose.disconnect();
    process.exit(1);
  }
};

// Run the seed function
seedDatabase();