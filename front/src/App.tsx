import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Suspense, lazy, useState, useEffect } from "react"
import LoadingSpinner from "./Components/LoadingSpinner"
import type { ReactNode } from "react"

// Lazy load heavy components
const Dashboard = lazy(() => import("./Components/Dashboard"))
const AdminDashboard = lazy(() => import("./Components/Admin/Dashboard"))
const ScholarshipsPage = lazy(() => import("./Pages/ScholarshipsPage"))
const Login = lazy(() => import("./Components/Auth/login"))
const Signup = lazy(() => import("./Components/Auth/signup"))
const SettingsPage = lazy(() => import("./Components/Admin/SettingsPage"))
const UsersPage = lazy(() => import("./Components/Admin/UsersPage"))
const AdminScholarships = lazy(() => import("./Components/Admin/AdminScholarships"))
const Profile = lazy(() => import("./Components/Profile"))
const LandingPage = lazy(() => import("./Pages/LandingPage"))
const AboutPage = lazy(() => import("./Pages/AboutPage"))
const ContactPage = lazy(() => import("./Pages/ContactPage"))
const KPRPrograms = lazy(() => import("./Pages/KPRPrograms"))
const SuccessStoriesPage = lazy(() => import("./Pages/SuccessStoriesPage"))
const ApplicationTipsPage = lazy(() => import("./Components/ApplicationTipsPage"))

const queryClient = new QueryClient()

interface ProtectedRouteProps {
  children: ReactNode
  adminOnly?: boolean
}

const ProtectedRoute = ({ children, adminOnly = false }: ProtectedRouteProps) => {
  const token = localStorage.getItem("token")
  const userStr = localStorage.getItem("user")

  if (!token || !userStr) {
    return <Navigate to="/login" />
  }

  if (adminOnly) {
    try {
      const user = JSON.parse(userStr)
      if (user.email !== "admin@gmail.com" && user.role !== "admin") {
        return <Navigate to="/dashboard" />
      }
    } catch (error) {
      console.error("Error parsing user data:", error)
      return <Navigate to="/login" />
    }
  }

  return <>{children}</>
}

function App() {
  const [isInitialLoading, setIsInitialLoading] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 90) return prev
        return prev + Math.random() * 30
      })
    }, 100)

    const timeout = setTimeout(() => {
      setLoadingProgress(100)
      setTimeout(() => setIsInitialLoading(false), 200)
    }, 1000)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [])

  if (isInitialLoading) {
    return (
      <LoadingSpinner 
        message={`Loading ScholarshipHub... ${Math.round(loadingProgress)}%`} 
        fullScreen 
      />
    )
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Suspense fallback={<LoadingSpinner message="Loading page" fullScreen />}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/scholarships" element={<ScholarshipsPage />} />
            <Route path="/kpr-programs" element={<KPRPrograms />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/success-stories" element={<SuccessStoriesPage />} />
            <Route path="/tips" element={<ApplicationTipsPage />} />

            {/* Protected User Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            {/* Protected Admin Routes */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute adminOnly={true}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute adminOnly={true}>
                  <UsersPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/scholarships"
              element={
                <ProtectedRoute adminOnly={true}>
                  <AdminScholarships />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/settings"
              element={
                <ProtectedRoute adminOnly={true}>
                  <SettingsPage />
                </ProtectedRoute>
              }
            />

            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </Router>
    </QueryClientProvider>
  )
}

export default App
