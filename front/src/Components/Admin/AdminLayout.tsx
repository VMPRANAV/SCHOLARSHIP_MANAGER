import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  GraduationCap,
  Users,
  Settings,
  HelpCircle,
  LogOut,
  LayoutDashboard,
  BookOpen,
  ChevronRight,
  Bell
} from 'lucide-react'
import { AdminLayoutProps, Notification, AdminUser } from '../../types/scholarship'

export default function AdminLayout({ children, title, currentPage }: AdminLayoutProps) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [profileImage, setProfileImage] = useState<string>("");
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (!userStr) {
      navigate("/login");
      return;
    }

    try {
      const parsedUser: AdminUser = JSON.parse(userStr);
      if (parsedUser.email !== "admin@gmail.com" && parsedUser.role !== "admin") {
        navigate("/dashboard");
        return;
      }

      setUser(parsedUser);
    } catch (error) {
      console.error("Failed to parse user data:", error);
      localStorage.removeItem("user");
      navigate("/login");
      return;
    }

    // Load profile image if exists
    const savedProfileImage = localStorage.getItem("profileImage");
    if (savedProfileImage) {
      setProfileImage(savedProfileImage);
    }

    // Mock notifications
    const mockNotifications: Notification[] = [
      {
        id: 1,
        message: "New application submitted for STEM Excellence Scholarship",
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        read: false
      },
      {
        id: 2,
        message: "Upcoming deadline: Arts Foundation Grant",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        read: false
      }
    ];
    setNotifications(mockNotifications);
  }, [navigate]);

  const handleLogout = async (): Promise<void> => {
    // Show confirmation dialog
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (!confirmLogout) return;

    setIsLoggingOut(true);

    try {
      // Simulate logout API call (if needed)
      await new Promise(resolve => setTimeout(resolve, 500));

      // Clear all stored data
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("profileImage");
      
      // Clear any other admin-specific data
      localStorage.removeItem("adminSettings");
      localStorage.removeItem("adminPreferences");
      
      // Clear session storage as well
      sessionStorage.clear();

      // Navigate to login page
      navigate("/login", { replace: true });
      
    } catch (error) {
      console.error("Logout error:", error);
      // Even if there's an error, still clear data and redirect
      localStorage.clear();
      sessionStorage.clear();
      navigate("/login", { replace: true });
    } finally {
      setIsLoggingOut(false);
    }
  };

  if (!user) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="animate-spin h-10 w-10 border-4 border-indigo-600 rounded-full border-t-transparent"></div>
      <span className="ml-3 text-lg font-medium text-gray-700">Loading admin panel...</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 bg-white shadow-lg z-50 transform transition-all duration-300 ease-in-out ${
          isSidebarCollapsed ? "w-20" : "w-64"
        }`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-center border-b bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <GraduationCap className="h-8 w-8" />
            </div>
            {!isSidebarCollapsed && (
              <div className="ml-2">
                <h1 className="text-lg font-bold">ScholarHub</h1>
                <p className="text-xs font-light">Administration</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Profile Info */}
        <div className={`border-b px-4 py-4 flex items-center ${isSidebarCollapsed ? "justify-center" : ""}`}>
          <div className="flex-shrink-0">
            {profileImage ? (
              <img
                className="h-10 w-10 rounded-full object-cover border-2 border-indigo-100"
                src={profileImage}
                alt="Profile"
              />
            ) : (
              <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                <span className="text-indigo-800 font-medium text-sm">
                  {user.name?.charAt(0).toUpperCase() || "A"}
                </span>
              </div>
            )}
          </div>
          {!isSidebarCollapsed && (
            <div className="ml-3">
              <div className="text-sm font-medium text-gray-900">{user.name || "Admin"}</div>
              <div className="text-xs text-gray-500 truncate">{user.email}</div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="mt-4 px-2 flex flex-col h-full">
          <div className={`mb-6 ${isSidebarCollapsed ? "px-2" : "px-3"}`}>
            {!isSidebarCollapsed && <p className="text-xs text-gray-400 mb-2 uppercase font-semibold">Main</p>}
            <Link to="/admin/dashboard" 
              className={`flex items-center mb-2 py-2 px-3 rounded-lg transition-colors ${
                currentPage === 'dashboard' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'
              }`}>
              <LayoutDashboard className="w-5 h-5" />
              {!isSidebarCollapsed && <span className="ml-3 text-sm font-medium">Dashboard</span>}
            </Link>
            <Link to="/admin/users" 
              className={`flex items-center mb-2 py-2 px-3 rounded-lg transition-colors ${
                currentPage === 'users' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'
              }`}>
              <Users className="w-5 h-5" />
              {!isSidebarCollapsed && <span className="ml-3 text-sm font-medium">Users</span>}
            </Link>
            <Link to="/admin/scholarships" 
              className={`flex items-center mb-2 py-2 px-3 rounded-lg transition-colors ${
                currentPage === 'scholarships' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'
              }`}>
              <BookOpen className="w-5 h-5" />
              {!isSidebarCollapsed && <span className="ml-3 text-sm font-medium">Scholarships</span>}
            </Link>
          </div>

          <div className={`mb-6 ${isSidebarCollapsed ? "px-2" : "px-3"}`}>
            {!isSidebarCollapsed && <p className="text-xs text-gray-400 mb-2 uppercase font-semibold">System</p>}
            <Link to="/admin/settings" 
              className={`flex items-center mb-2 py-2 px-3 rounded-lg transition-colors ${
                currentPage === 'settings' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'
              }`}>
              <Settings className="w-5 h-5" />
              {!isSidebarCollapsed && <span className="ml-3 text-sm font-medium">Settings</span>}
            </Link>
            <Link to="/admin/help" 
              className={`flex items-center mb-2 py-2 px-3 rounded-lg transition-colors ${
                currentPage === 'help' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'
              }`}>
              <HelpCircle className="w-5 h-5" />
              {!isSidebarCollapsed && <span className="ml-3 text-sm font-medium">Help</span>}
            </Link>
          </div>

          {/* Enhanced Logout Button at bottom */}
          <div className={`mt-auto mb-6 ${isSidebarCollapsed ? "px-2" : "px-3"}`}>
            <button 
              onClick={handleLogout}
              disabled={isLoggingOut}
              className={`flex items-center w-full py-2 px-3 rounded-lg transition-all duration-200 ${
                isLoggingOut 
                  ? 'opacity-50 cursor-not-allowed bg-gray-100' 
                  : 'text-red-600 hover:bg-red-50 hover:text-red-700'
              }`}
              title={isLoggingOut ? "Logging out..." : "Logout"}
            >
              {isLoggingOut ? (
                <div className="w-5 h-5 border-2 border-red-300 border-t-red-600 rounded-full animate-spin" />
              ) : (
                <LogOut className="w-5 h-5" />
              )}
              {!isSidebarCollapsed && (
                <span className="ml-3 text-sm font-medium">
                  {isLoggingOut ? "Logging out..." : "Logout"}
                </span>
              )}
            </button>
          </div>
        </nav>

        {/* Toggle Sidebar Button */}
        <button 
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          className="absolute -right-3 top-20 bg-white rounded-full p-1 shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
        >
          <ChevronRight className={`w-4 h-4 text-gray-500 transform transition-transform ${isSidebarCollapsed ? "" : "rotate-180"}`} />
        </button>
      </aside>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${isSidebarCollapsed ? "ml-20" : "ml-64"}`}>
        {/* Top Navigation */}
        <header className="bg-white shadow-sm border-b">
          <div className="h-16 px-4 flex items-center justify-between">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-800">{title}</h1>
              <span className="ml-2 px-2 py-1 rounded text-xs bg-indigo-100 text-indigo-800">v1.0</span>
            </div>
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <div className="relative">
                <button className="p-2 rounded-full text-gray-500 hover:bg-gray-100 transition-colors">
                  <Bell className="w-5 h-5" />
                  {notifications.filter(n => !n.read).length > 0 && (
                    <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                      {notifications.filter(n => !n.read).length}
                    </span>
                  )}
                </button>
              </div>

              {/* Quick Logout Button in Header */}
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className={`hidden md:flex items-center text-sm transition-colors ${
                  isLoggingOut 
                    ? 'text-gray-400 cursor-not-allowed' 
                    : 'text-red-600 hover:text-red-800'
                }`}
                title="Logout"
              >
                {isLoggingOut ? (
                  <div className="w-4 h-4 border-2 border-red-300 border-t-red-600 rounded-full animate-spin mr-1" />
                ) : (
                  <LogOut className="w-4 h-4 mr-1" />
                )}
                <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
              </button>

              {/* Help Button */}
              <button className="hidden md:flex items-center text-sm text-indigo-600 hover:text-indigo-800 transition-colors">
                <HelpCircle className="w-4 h-4 mr-1" />
                <span>Help</span>
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  )
}