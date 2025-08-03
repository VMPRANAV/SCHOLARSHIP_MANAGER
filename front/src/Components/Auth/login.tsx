import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { 
  LoginRequest, 
  LoginResponse, 
  StoredUser 
} from "../../types/scholarship";

const API_URL = "http://localhost:5000/api";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");
    
    if (token && userStr) {
      try {
        const user: StoredUser = JSON.parse(userStr);
        const redirectPath = getRedirectPath(user.role);
        navigate(redirectPath);
      } catch (error) {
        // Clear corrupted data
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }
  }, [navigate]);

  // Validation function
  const validateForm = (): boolean => {
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address");
      return false;
    }
    
    if (password.length < 1) {
      setError("Password is required");
      return false;
    }
    
    return true;
  };

  // Login function with proper typing
  const loginUser = async (userData: LoginRequest): Promise<LoginResponse> => {
    try {
      const response = await axios.post<LoginResponse>(
        `${API_URL}/auth/login`, 
        userData, 
        {
          headers: {
            "Content-Type": "application/json"
          },
          timeout: 10000 // 10 second timeout
        }
      );
      
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || "Login failed");
      }
      throw new Error("Network error. Please check your connection.");
    }
  };

  // Store user data in localStorage
  const storeUserData = (userData: LoginResponse): void => {
    // Store token
    localStorage.setItem("token", userData.token);
    
    // Store user info using proper role from backend or default to 'student'
    const storedUser: StoredUser = {
      id: userData._id,
      name: userData.name,
      email: userData.email,
      role: userData.role || 'student' // Use backend role or default
    };
    
    localStorage.setItem("user", JSON.stringify(storedUser));
  };

  // Determine redirect path based on role
  const getRedirectPath = (role: string): string => {
    switch (role) {
      case 'admin':
        return '/admin/dashboard';
      case 'teacher':
        return '/teacher/dashboard';
      case 'organization':
        return '/organization/dashboard';
      default:
        return '/dashboard'; // Student dashboard
    }
  };

  // Handle admin mock login (remove this in production)
  const handleMockAdminLogin = (): void => {
    const adminData: StoredUser = {
      id: 'admin-123',
      name: 'Administrator',
      email: 'admin@gmail.com',
      role: 'admin'
    };
    
    localStorage.setItem("token", 'admin-token-123');
    localStorage.setItem("user", JSON.stringify(adminData));
    
    setSuccess("Admin login successful! Redirecting...");
    setTimeout(() => navigate('/admin/dashboard'), 1000);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validate form
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      // Special handling for admin user (remove this in production)
      if (email === 'admin@gmail.com' && password === '123') {
        handleMockAdminLogin();
        return;
      }
      
      // Regular login API call
      const userData = await loginUser({ email, password });
      
      // Store user data
      storeUserData(userData);
      
      // Show success message
      setSuccess("Login successful! Redirecting...");
      
      // Navigate based on user role after a brief delay
      setTimeout(() => {
        const redirectPath = getRedirectPath(userData.role || 'student');
        navigate(redirectPath);
      }, 1000);
      
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Welcome back to our scholarship platform
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
              <div className="flex">
                <div>
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
              <div className="flex">
                <div>
                  <p className="text-sm text-green-700">{success}</p>
                </div>
              </div>
            </div>
          )}
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address *
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  className={`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                    isLoading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  placeholder="Enter your email address"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password *
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  className={`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                    isLoading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors ${
                  isLoading 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:bg-indigo-700'
                }`}
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or
                </span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link 
                  to="/signup" 
                  className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
                >
                  Sign up
                </Link>
              </p>
            </div>

            {/* Demo credentials */}
            <div className="mt-4 p-3 bg-blue-50 rounded-md border border-blue-200">
              <p className="text-xs text-blue-800 font-medium mb-1">Demo Credentials:</p>
              <p className="text-xs text-blue-700">Admin: admin@gmail.com / 123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
