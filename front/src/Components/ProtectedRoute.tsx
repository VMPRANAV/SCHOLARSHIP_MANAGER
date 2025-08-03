import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface ProtectedRouteProps {
  children: React.ReactNode
  adminOnly?: boolean
  redirectTo?: string
}

interface UserData {
  name: string
  email: string
  role?: string
}

export default function ProtectedRoute({ 
  children, 
  adminOnly = false, 
  redirectTo = "/login" 
}: ProtectedRouteProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<UserData | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token")
      const userStr = localStorage.getItem("user")

      if (!token || !userStr) {
        navigate(redirectTo)
        return
      }

      try {
        const userData = JSON.parse(userStr)
        
        // If adminOnly route, check if user is admin
        if (adminOnly) {
          if (userData.role !== "admin" && userData.email !== "admin@gmail.com") {
            navigate("/dashboard") // Redirect non-admin users to regular dashboard
            return
          }
        }
        
        setUser(userData)
        setIsLoading(false)
      } catch (error) {
        console.error("Failed to parse user data:", error)
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        navigate(redirectTo)
      }
    }

    checkAuth()
  }, [navigate, adminOnly, redirectTo])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}