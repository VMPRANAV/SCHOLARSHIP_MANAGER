"use client"

import { useState, useEffect, ChangeEvent, FormEvent } from "react"
import { useNavigate, Link } from "react-router-dom"
import { ExtendedUserProfile, NotificationKey, transformBackendUser, Users } from '../types/scholarship'; // Fixed import
import {
  Edit,
  Save,
  X,
  Camera,
  GraduationCap,
  Award,
  BookOpen,
  Target,
  Settings,
  Shield,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  User,
} from "lucide-react"
import LoadingSpinner from "./LoadingSpinner"

// Extended UserProfile interface for form data


export default function Profile() {
  const [user, setUser] = useState<Users | null>(null);
  
  const [profileImage, setProfileImage] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [activeTab, setActiveTab] = useState("profile")
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  // Extended form data to match your form fields
  const [formData, setFormData] = useState<ExtendedUserProfile>({
    name: '',
    bio: '',
    education: '',
    interests: '',
    profileImage: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
    twitter: ''
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    marketingEmails: false,
    weeklyDigest: true,
    applicationReminders: true,
  })

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "security", label: "Security", icon: Shield },
    { id: "preferences", label: "Preferences", icon: Settings },
    { id: "activity", label: "Activity", icon: BookOpen },
  ]

  useEffect(() => {
    const userStr = localStorage.getItem("user")
    if (!userStr) {
      navigate("/login")
      return
    }

    try {
      const userData = JSON.parse(userStr)
      const transformedUser = transformBackendUser(userData);
      setUser(transformedUser)
      
      // Set form data with all available fields
      setFormData({
        name: transformedUser.name || '',
        bio: transformedUser.bio || '',
        education: transformedUser.education || '',
        interests: transformedUser.interests || '',
        profileImage: transformedUser.profileImage || '',
        email: transformedUser.email || '',
        phone: transformedUser.phone || '',
        location: '', // Add default since it's not in User interface
        website: transformedUser.socialLinks?.website || '',
        linkedin: transformedUser.socialLinks?.linkedin || '',
        twitter: transformedUser.socialLinks?.twitter || ''
      })

      // Set preferences from user data
      if (transformedUser.preferences) {
        setPreferences(transformedUser.preferences)
      }

      // Load profile image if exists
      const savedProfileImage = localStorage.getItem("profileImage")
      if (savedProfileImage) {
        setProfileImage(savedProfileImage)
      }
    } catch (err) {
      console.error('Error parsing user data:', err)
      navigate("/login")
    }

    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [navigate])

  const handleProfileImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target || !e.target.files || !e.target.files[0]) return;

    const file = e.target.files[0];

    if (file.size > 5 * 1024 * 1024) {
      setError("Image size should be less than 5MB")
      return
    }

    try {
      const reader = new FileReader()
      reader.onload = () => {
        const base64String = reader.result;
        if (typeof base64String === 'string') {
          setProfileImage(base64String)
          localStorage.setItem("profileImage", base64String)
          setSuccess("Profile image updated successfully!")
          setTimeout(() => setSuccess(""), 3000)
        } else {
          setError("Error processing profile image")
        }
      };
      reader.readAsDataURL(file);
    } catch (err) {
      setError("Error processing profile image")
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (!e.target) return;
    
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target) return;
    
    const { name, value } = e.target
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handlePreferenceChange = (key: keyof typeof preferences) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    setIsSaving(true)

    if (!user) {
      setError("User data not available")
      setIsSaving(false)
      return
    }

    try {
      // Update user with form data, ensuring all required fields are present
      const updatedUser: Users = {
        ...user,
        name: formData.name,
        bio: formData.bio,
        education: formData.education,
        interests: formData.interests,
        profileImage: formData.profileImage,
        phone: formData.phone,
        socialLinks: {
          ...user.socialLinks,
          website: formData.website,
          linkedin: formData.linkedin,
          twitter: formData.twitter
        },
        updatedAt: new Date().toISOString()
      };
      
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      
      setIsEditing(false)
      setSuccess("Profile updated successfully!")
      setTimeout(() => setSuccess(""), 3000)
    } catch (err) {
      setError("Failed to update profile")
    } finally {
      setIsSaving(false)
    }
  }

  const handlePasswordSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError("New passwords do not match")
      return
    }

    if (passwordData.newPassword.length < 8) {
      setError("Password must be at least 8 characters long")
      return
    }

    setIsSaving(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
      setSuccess("Password updated successfully!")
      setTimeout(() => setSuccess(""), 3000)
    } catch (err) {
      setError("Failed to update password")
    } finally {
      setIsSaving(false)
    }
  }

  const handleSavePreferences = async () => {
    setIsSaving(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Update user with new preferences
      if (user) {
        const updatedUser: Users = {
          ...user,
          preferences: preferences
        };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }

      localStorage.setItem("userPreferences", JSON.stringify(preferences))
      setSuccess("Preferences saved successfully!")
      setTimeout(() => setSuccess(""), 3000)
    } catch (err) {
      setError("Failed to save preferences")
    } finally {
      setIsSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner message="Loading profile" />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">User not found</h2>
          <p className="text-gray-600">Please log in again.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center mr-3">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Profile Settings</h1>
                  <p className="text-xs text-gray-500">Manage your account</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Link to="/dashboard" className="text-gray-600 hover:text-cyan-600 font-medium transition-colors">
                Dashboard
              </Link>
              <Link
                to="/"
                className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:from-cyan-600 hover:to-blue-700 transition-colors"
              >
                Home
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success/Error Messages */}
        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg flex items-center">
            <CheckCircle className="w-5 h-5 mr-2" />
            {success}
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center">
            <AlertCircle className="w-5 h-5 mr-2" />
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              {/* Profile Summary */}
              <div className="text-center mb-6">
                <div className="relative mx-auto w-24 h-24 mb-4">
                  {profileImage ? (
                    <img
                      className="rounded-full h-24 w-24 object-cover border-4 border-gray-200"
                      src={profileImage}
                      alt="Profile"
                    />
                  ) : (
                    <div className="rounded-full h-24 w-24 bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                      <span className="text-white text-2xl font-bold">
                        {user.name?.charAt(0).toUpperCase() || "U"}
                      </span>
                    </div>
                  )}

                  <label
                    htmlFor="profile-upload"
                    className="absolute bottom-0 right-0 bg-cyan-600 rounded-full p-2 cursor-pointer hover:bg-cyan-700 transition-colors shadow-lg"
                  >
                    <Camera className="h-4 w-4 text-white" />
                    <input
                      id="profile-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleProfileImageChange}
                    />
                  </label>
                </div>
                <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>

              {/* Navigation Tabs */}
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? "bg-cyan-50 text-cyan-700 border border-cyan-200"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <tab.icon className="w-4 h-4 mr-3" />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
              {/* Header */}
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {tabs.find((tab) => tab.id === activeTab)?.label}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {activeTab === "profile" && "Update your personal information and profile details"}
                      {activeTab === "security" && "Manage your password and security settings"}
                      {activeTab === "preferences" && "Configure your notification and privacy preferences"}
                      {activeTab === "activity" && "View your recent activity and application history"}
                    </p>
                  </div>

                  {activeTab === "profile" && (
                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                    >
                      {isEditing ? (
                        <>
                          <X className="w-4 h-4 mr-2" />
                          Cancel
                        </>
                      ) : (
                        <>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {activeTab === "profile" && (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          disabled={!isEditing}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          disabled={true}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          disabled={!isEditing}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                        <input
                          type="text"
                          name="location"
                          value={formData.location}
                          onChange={handleChange}
                          disabled={!isEditing}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                      <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        disabled={!isEditing}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 resize-none"
                        placeholder="Tell us about yourself..."
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Education</label>
                        <input
                          type="text"
                          name="education"
                          value={formData.education}
                          onChange={handleChange}
                          disabled={!isEditing}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                          placeholder="Your educational background"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Interests</label>
                        <input
                          type="text"
                          name="interests"
                          value={formData.interests}
                          onChange={handleChange}
                          disabled={!isEditing}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                          placeholder="Your academic/career interests"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                        <input
                          type="url"
                          name="website"
                          value={formData.website}
                          onChange={handleChange}
                          disabled={!isEditing}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                          placeholder="https://yourwebsite.com"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn</label>
                        <input
                          type="url"
                          name="linkedin"
                          value={formData.linkedin}
                          onChange={handleChange}
                          disabled={!isEditing}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                          placeholder="LinkedIn profile URL"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Twitter</label>
                        <input
                          type="url"
                          name="twitter"
                          value={formData.twitter}
                          onChange={handleChange}
                          disabled={!isEditing}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                          placeholder="Twitter profile URL"
                        />
                      </div>
                    </div>

                    {isEditing && (
                      <div className="flex justify-end">
                        <button
                          type="submit"
                          disabled={isSaving}
                          className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 transition-all disabled:opacity-50"
                        >
                          {isSaving ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                              Saving...
                            </>
                          ) : (
                            <>
                              <Save className="w-4 h-4 mr-2" />
                              Save Changes
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </form>
                )}

                {activeTab === "security" && (
                  <div className="space-y-8">
                    <form onSubmit={handlePasswordSubmit} className="space-y-6">
                      <h4 className="text-lg font-semibold text-gray-900">Change Password</h4>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            name="currentPassword"
                            value={passwordData.currentPassword}
                            onChange={handlePasswordChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent pr-10"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4 text-gray-400" />
                            ) : (
                              <Eye className="h-4 w-4 text-gray-400" />
                            )}
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                          <input
                            type="password"
                            name="newPassword"
                            value={passwordData.newPassword}
                            onChange={handlePasswordChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                          <input
                            type="password"
                            name="confirmPassword"
                            value={passwordData.confirmPassword}
                            onChange={handlePasswordChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isSaving}
                        className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 transition-all disabled:opacity-50"
                      >
                        {isSaving ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                            Updating...
                          </>
                        ) : (
                          <>
                            <Shield className="w-4 h-4 mr-2" />
                            Update Password
                          </>
                        )}
                      </button>
                    </form>

                    <div className="border-t border-gray-200 pt-8">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Two-Factor Authentication</h4>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm text-gray-600 mb-4">
                          Add an extra layer of security to your account by enabling two-factor authentication.
                        </p>
                        <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                          <Shield className="w-4 h-4 mr-2" />
                          Enable 2FA
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "preferences" && (
                  <div className="space-y-8">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h4>
                      <div className="space-y-4">
                        {Object.entries(preferences).map(([key, value]) => (
                          <div key={key} className="flex items-center justify-between">
                            <div>
                              <h5 className="text-sm font-medium text-gray-900 capitalize">
                                {key.replace(/([A-Z])/g, " $1").trim()}
                              </h5>
                              <p className="text-sm text-gray-500">
                                {key === "emailNotifications" && "Receive notifications via email"}
                                {key === "smsNotifications" && "Receive notifications via SMS"}
                                {key === "pushNotifications" && "Receive push notifications"}
                                {key === "marketingEmails" && "Receive marketing and promotional emails"}
                                {key === "weeklyDigest" && "Receive weekly digest of activities"}
                                {key === "applicationReminders" && "Get reminders about application deadlines"}
                              </p>
                            </div>
                            <button
                              onClick={() => handlePreferenceChange(key as keyof typeof preferences)}
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                value ? "bg-cyan-600" : "bg-gray-200"
                              }`}
                            >
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                  value ? "translate-x-6" : "translate-x-1"
                                }`}
                              />
                            </button>
                          </div>
                        ))}
                      </div>

                      <div className="mt-6">
                        <button
                          onClick={handleSavePreferences}
                          disabled={isSaving}
                          className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 transition-all disabled:opacity-50"
                        >
                          {isSaving ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                              Saving...
                            </>
                          ) : (
                            <>
                              <Save className="w-4 h-4 mr-2" />
                              Save Preferences
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "activity" && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-blue-50 rounded-xl p-6 text-center">
                        <Award className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-blue-900">12</div>
                        <div className="text-sm text-blue-700">Applications Submitted</div>
                      </div>

                      <div className="bg-green-50 rounded-xl p-6 text-center">
                        <Target className="w-8 h-8 text-green-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-green-900">3</div>
                        <div className="text-sm text-green-700">Scholarships Won</div>
                      </div>

                      <div className="bg-purple-50 rounded-xl p-6 text-center">
                        <BookOpen className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-purple-900">8</div>
                        <div className="text-sm text-purple-700">Applications Pending</div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h4>
                      <div className="space-y-4">
                        {[
                          {
                            action: "Applied for Merit Excellence Scholarship",
                            date: "2 hours ago",
                            status: "pending",
                          },
                          {
                            action: "Profile updated",
                            date: "1 day ago",
                            status: "completed",
                          },
                          {
                            action: "Submitted STEM Innovation Grant application",
                            date: "3 days ago",
                            status: "completed",
                          },
                          {
                            action: "Won Community Leadership Award",
                            date: "1 week ago",
                            status: "success",
                          },
                        ].map((activity, index) => (
                          <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div>
                              <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                              <p className="text-xs text-gray-500">{activity.date}</p>
                            </div>
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                activity.status === "success"
                                  ? "bg-green-100 text-green-800"
                                  : activity.status === "pending"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-blue-100 text-blue-800"
                              }`}
                            >
                              {activity.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
