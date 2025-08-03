// === SCHOLARSHIP INTERFACES ===
export interface Scholarship {
  _id: string;
  name: string;
  description: string;
  amount: string;
  educationLevel: string;
  applicationEndDate: string;
  eligibility: string;
  community: string;
  genderRequirement: string;
  status: string;
  createdAt?: string;
  organizationLogo?: string;
  applicationLink?: string;
}

export interface Application {
  id: string;
  scholarshipName: string;
  status: string;
  appliedDate: string;
  amount: string;
  deadline: string;
}

// === USER INTERFACES ===

// 1. Basic backend user (what MongoDB returns)
export interface BackendUser {
  _id: string;
  name: string;
  email: string;
  role?: 'student' | 'admin' | 'teacher' | 'organization' | 'parent';
  bio?: string;
  education?: string;
  interests?: string;
  profileImage?: string;
  phone?: string;
  isActive?: boolean;
  isVerified?: boolean;
  createdAt: string;
  updatedAt: string;
}

// 2. Complete user interface (for frontend state)
export interface Users {
  // Core identity
  id: string;                    // Derived from _id
  _id?: string;                  // Keep for backend compatibility
  name: string;
  email: string;
  role: 'student' | 'admin' | 'teacher' | 'organization' | 'parent';
  
  // Profile information
  phone?: string;
  dateOfBirth?: string;
  profileImage?: string;
  bio?: string;
  education?: string;
  interests?: string;
  
  // Location (flat structure for simplicity)
  city?: string;
  state?: string;
  country?: string;
  
  // System fields
  isActive: boolean;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
  
  // Preferences
  preferences?: NotificationPreferences;
  
  // Social links
  socialLinks?: SocialLinks;
}

// 3. Supporting interfaces
export interface NotificationPreferences {
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
  marketingEmails: boolean;
  weeklyDigest: boolean;
  applicationReminders: boolean;
}

export interface SocialLinks {
  linkedin?: string;
  twitter?: string;
  website?: string;
}

// 4. User Profile interfaces (CONSOLIDATED - removed duplication)
export interface UserProfile {
  name: string;
  bio?: string;
  education?: string;
  interests?: string;
  profileImage?: string;
  phone?: string;
  city?: string;
  state?: string;
  country?: string;
  // Extended fields for admin users
  university?: string;
  major?: string;
  department?: string;
}

// Form data interface (no required id or system fields)
export interface ExtendedUserProfile {
  name: string;
  email?: string;
  phone?: string;
  bio?: string;
  education?: string;
  interests?: string;
  location?: string;
  website?: string;
  linkedin?: string;
  twitter?: string;
  profileImage?: string;
}

// === UTILITY TYPES ===
export type UserRole = 'student' | 'admin' | 'teacher' | 'organization' | 'parent';
export type NotificationKey = keyof NotificationPreferences;

// === FILTER INTERFACES ===
export interface ScholarshipFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  educationLevel: string;
  setEducationLevel: (value: string) => void;
  genderRequirement: string;
  setGenderRequirement: (value: string) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
  showFilters: boolean;
  setShowFilters: (value: boolean) => void;
  filteredScholarships: Scholarship[];
  loading: boolean;
}

export interface ScholarshipGridProps {
  scholarships: Scholarship[];
  loading: boolean;
  error: string | null;
  onViewDetails: (scholarship: Scholarship) => void;
  onApply: (scholarship: Scholarship) => void;
}

// === ADMIN INTERFACES ===

// Admin Layout
export interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
  currentPage: 'dashboard' | 'users' | 'scholarships' | 'settings' | 'help';
}

export interface Notification {
  id: number;
  message: string;
  timestamp: Date;
  read: boolean;
}

// Admin User (CONSOLIDATED - removed duplication)
export interface AdminUser {
  _id: string;
  name: string;
  email: string;
  role: 'student' | 'admin' | 'teacher' | 'parent';
  registeredOn: Date;
  lastActive: Date;
  applicationCount: number;
  profile: UserProfile;
}

// Admin Dashboard
export interface Activity {
  type: string;
  message: string;
  timestamp: string;
}

export interface Analytics {
  totalScholarships: number;
  activeScholarships: number;
  totalApplications: number;
  totalFunding: number;
  recentActivity: Activity[];
}

// Admin Forms
export interface ScholarshipFormProps {
  scholarship?: Scholarship | null;
  onClose: () => void;
}

// === ADMIN SETTINGS INTERFACES ===
export interface SettingsPageUser {
  name: string;
  email: string;
  role: string;
}

export interface GeneralSettings {
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  timezone: string;
  language: string;
}

export interface NotificationSettings {
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
  applicationAlerts: boolean;
  deadlineReminders: boolean;
  systemUpdates: boolean;
}

export interface SecuritySettings {
  twoFactorAuth: boolean;
  sessionTimeout: number;
  passwordExpiry: number;
  loginAttempts: number;
  ipWhitelist: string;
}

export interface EmailSettings {
  smtpHost: string;
  smtpPort: number;
  smtpUsername: string;
  smtpPassword: string;
  fromEmail: string;
  fromName: string;
}

export interface AppearanceSettings {
  theme: string;
  primaryColor: string;
  secondaryColor: string;
  logoUrl: string;
  faviconUrl: string;
}

export interface SystemSettings {
  maintenanceMode: boolean;
  debugMode: boolean;
  cacheEnabled: boolean;
  backupFrequency: string;
  maxFileSize: string;
}

export interface AllSettings {
  general: GeneralSettings;
  notifications: NotificationSettings;
  security: SecuritySettings;
  email: EmailSettings;
  appearance: AppearanceSettings;
  system: SystemSettings;
}

export type SettingsCategory = 'general' | 'notifications' | 'security' | 'email' | 'appearance' | 'system';

// === CHART DATA INTERFACE ===
export interface ChartData {
  name: string;
  value?: number;
  count?: number;
}

// === AUTH INTERFACES ===

// Registration request interface
export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

// Registration response interface  
export interface RegisterResponse {
  _id: string;
  name: string;
  email: string;
  role?: 'student' | 'admin' | 'teacher' | 'organization' | 'parent';
  token: string;
}

// Stored user data interface (what we save in localStorage)
export interface StoredUser {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin' | 'teacher' | 'organization' | 'parent';
}

// Login request interface
export interface LoginRequest {
  email: string;
  password: string;
}

// Login response interface
export interface LoginResponse {
  _id: string;
  name: string;
  email: string;
  role?: 'student' | 'admin' | 'teacher' | 'organization' | 'parent';
  token: string;
}
//KPR Program 
export interface KPRProgram {
  id: number
  name: string
  subtitle: string
  type: string
  status: string
  description: string
  icon: string
  color: string
  bgColor: string
  textColor: string
  amount: string
  educationLevel: string
  applicationEndDate: string
  eligibility: string[]
  requirements: string[]
  benefits: string[]
  applicationProcess: string[]
}
//KPR Program props
export interface KPRProgramDetailedModalProps {
  program: KPRProgram | null
  isOpen: boolean
  onClose: () => void
  onDownload: (program: KPRProgram) => void
}
// === HELPER FUNCTIONS ===

// Transform backend user to frontend user
export const transformBackendUser = (backendUser: BackendUser): Users => {
  return {
    id: backendUser._id,
    _id: backendUser._id,
    name: backendUser.name,
    email: backendUser.email,
    role: backendUser.role || 'student',
    phone: backendUser.phone,
    profileImage: backendUser.profileImage,
    bio: backendUser.bio,
    education: backendUser.education,
    interests: backendUser.interests,
    isActive: backendUser.isActive ?? true,
    isVerified: backendUser.isVerified ?? false,
    createdAt: backendUser.createdAt,
    updatedAt: backendUser.updatedAt,
    preferences: {
      emailNotifications: true,
      smsNotifications: false,
      pushNotifications: true,
      marketingEmails: false,
      weeklyDigest: true,
      applicationReminders: true
    }
  };
};

// Create user for backend (remove frontend-only fields)
export const prepareUserForBackend = (user: Users): Partial<BackendUser> => {
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    bio: user.bio,
    education: user.education,
    interests: user.interests,
    profileImage: user.profileImage,
    phone: user.phone,
    isActive: user.isActive,
    isVerified: user.isVerified
  };
};