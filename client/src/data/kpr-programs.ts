export const kprPrograms = {
  merit: {
    id: 'kpr-merit',
    name: 'KPR Merit Scholarship',
    type: 'merit' as const,
    description: 'The KPR Merit Scholarship is designed to recognize and support academically outstanding students who demonstrate exceptional academic performance, leadership potential, and commitment to their educational goals. This comprehensive program provides financial assistance to deserving students pursuing higher education.',
    eligibility: [
      'Minimum GPA of 3.5 or equivalent',
      'Currently enrolled or accepted in an accredited institution',
      'Demonstrate financial need',
      'Must be a citizen or permanent resident',
      'Age limit: 18-25 years',
      'No previous disciplinary actions'
    ],
    benefits: [
      'Full tuition coverage for up to 4 years',
      'Monthly stipend for living expenses',
      'Book and study material allowance',
      'Access to mentorship programs',
      'Internship opportunities',
      'Career guidance and placement support'
    ],
    applicationProcess: [
      'Complete online application',
      'Submit required documents',
      'Written examination',
      'Personal interview'
    ],
    requirements: [
      'Completed application form',
      'Official academic transcripts',
      'Two letters of recommendation',
      'Personal statement (500 words)',
      'Financial need documentation',
      'Copy of valid ID',
      'Recent passport-size photographs',
      'Medical fitness certificate'
    ],
    deadlines: {
      application: 'March 31, 2025',
      document: 'April 15, 2025',
      interview: 'May 1-15, 2025'
    },
    contactInfo: {
      email: 'merit@kpr.edu',
      phone: '+1 (555) 123-4567',
      address: 'KPR Foundation, 123 Education Blvd, Academic City, AC 12345'
    }
  },
  sports: {
    id: 'kpr-sports',
    name: 'KPR Sports Scholarship',
    type: 'sports' as const,
    description: 'The KPR Sports Scholarship program is dedicated to supporting talented student-athletes who excel in their chosen sports while maintaining strong academic performance. This program aims to develop well-rounded individuals who can balance athletic excellence with academic achievement.',
    eligibility: [
      'Demonstrated excellence in any recognized sport',
      'Minimum GPA of 3.0 or equivalent',
      'Currently enrolled or accepted in an accredited institution',
      'Must represent the institution in sports competitions',
      'Age limit: 16-23 years',
      'Medical fitness for sports participation'
    ],
    benefits: [
      'Partial to full tuition coverage',
      'Sports equipment and training gear',
      'Access to professional coaching',
      'Sports medicine and healthcare',
      'Competition travel expenses',
      'Performance-based incentives'
    ],
    applicationProcess: [
      'Submit application with sports portfolio',
      'Physical fitness assessment',
      'Skills demonstration trial',
      'Academic record review'
    ],
    requirements: [
      'Completed application form',
      'Sports performance records/certificates',
      'Coach recommendation letter',
      'Academic transcripts',
      'Medical fitness certificate',
      'Sports portfolio/video demonstrations',
      'Personal statement focusing on sports goals',
      'Copy of valid ID'
    ],
    deadlines: {
      application: 'April 30, 2025',
      document: 'May 15, 2025',
      interview: 'June 1-10, 2025'
    },
    contactInfo: {
      email: 'sports@kpr.edu',
      phone: '+1 (555) 123-4568',
      address: 'KPR Sports Foundation, 456 Athletic Ave, Sports City, SC 67890'
    }
  }
};