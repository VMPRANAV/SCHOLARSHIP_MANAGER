import type React from "react"
interface HeaderProps {
  title: string
  subtitle?: string
  icon?: React.ReactNode
  backgroundGradient?: string
}

export default function Header({
  title,
  subtitle,
  icon,
  backgroundGradient = "from-cyan-500 to-blue-600",
}: HeaderProps) {
  return (
    <div className={`bg-gradient-to-br ${backgroundGradient} text-white py-20`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {icon && (
          <div className="w-20 h-20 bg-white bg-opacity-20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
            {icon}
          </div>
        )}
        <h1 className="text-4xl md:text-5xl font-bold mb-6">{title}</h1>
        {subtitle && <p className="text-xl md:text-2xl mb-4 opacity-90 max-w-3xl mx-auto">{subtitle}</p>}
      </div>
    </div>
  )
}
