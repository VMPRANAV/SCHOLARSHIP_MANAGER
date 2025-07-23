import fetch from 'node-fetch';
import FormData from 'form-data';
import fs from 'fs';
import path from 'path';

async function testCreateScholarship() {
  const url = 'http://localhost:5000/api/scholarships'; // Ensure your server is running on this port

  const form = new FormData();

  // Add text fields
  form.append('name', 'Test Scholarship from API');
  form.append('amount', '10000');
  form.append('educationLevel', 'Bachelor\'s');
  form.append('applicationEndDate', '2025-12-31');
  form.append('description', 'This is a test scholarship created via API.');
  form.append('eligibility', 'Open to all test users.');
  form.append('community', 'Developers, Testers');
  form.append('genderRequirement', 'All Genders');
  form.append('applicationLink', 'https://example.com/test-apply');
  form.append('status', 'active');

  // Create dummy files for testing
  const dummyLogoPath = path.join(__dirname, 'dummy-logo.png');
  const dummyFormPath = path.join(__dirname, 'dummy-form.pdf');

  // Create dummy files if they don't exist
  if (!fs.existsSync(dummyLogoPath)) {
    fs.writeFileSync(dummyLogoPath, 'dummy image data');
  }
  if (!fs.existsSync(dummyFormPath)) {
    fs.writeFileSync(dummyFormPath, 'dummy PDF data');
  }

  // Append files
  form.append('logo', fs.createReadStream(dummyLogoPath), { filename: 'dummy-logo.png', contentType: 'image/png' });
  form.append('applicationForm', fs.createReadStream(dummyFormPath), { filename: 'dummy-form.pdf', contentType: 'application/pdf' });

  try {
    console.log('Sending POST request to create scholarship...');
    const response = await fetch(url, {
      method: 'POST',
      body: form,
      headers: form.getHeaders(), // Important for FormData
    });

    const data = await response.json();

    if (response.ok) {
      console.log('Scholarship created successfully:', data);
    } else {
      console.error('Failed to create scholarship:', response.status, data);
    }
  } catch (error) {
    console.error('Error during API call:', error);
  } finally {
    // Clean up dummy files
    if (fs.existsSync(dummyLogoPath)) {
      fs.unlinkSync(dummyLogoPath);
    }
    if (fs.existsSync(dummyFormPath)) {
      fs.unlinkSync(dummyFormPath);
    }
  }
}

testCreateScholarship();