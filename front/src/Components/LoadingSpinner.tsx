"use client"

import { useEffect, useState } from "react"
import { GraduationCap } from "lucide-react"

interface LoadingSpinnerProps {
  message?: string
  fullScreen?: boolean
}

export default function LoadingSpinner({ message = "Loading...", fullScreen = false }: LoadingSpinnerProps) {
  const [dots, setDots] = useState("")

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."))
    }, 500)

    return () => clearInterval(interval)
  }, [])

  const content = (
    <div className="flex flex-col items-center justify-center">
      <div className="relative">
        <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mb-4 animate-pulse">
          <GraduationCap className="w-8 h-8 text-white" />
        </div>
        <div className="absolute inset-0 w-16 h-16 border-4 border-cyan-200 rounded-full animate-spin border-t-cyan-600"></div>
      </div>
      <div className="text-center">
        <p className="text-gray-600 font-medium">
          {message}
          {dots}
        </p>
        <div className="flex space-x-1 mt-2 justify-center">
          <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
          <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
        </div>
      </div>
    </div>
  )

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-90 backdrop-blur-sm flex items-center justify-center z-50">
        {content}
      </div>
    )
  }

  return content
}
