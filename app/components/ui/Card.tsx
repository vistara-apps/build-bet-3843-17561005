
"use client"

import { cn } from "@/lib/utils"
import { type ReactNode } from "react"

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  variant?: 'default' | 'prediction-active' | 'prediction-resolved'
}

export function Card({ children, className, hover = false, variant = 'default' }: CardProps) {
  const variants = {
    default: "card",
    'prediction-active': "prediction-card active",
    'prediction-resolved': "prediction-card resolved"
  }

  return (
    <div className={cn(
      variants[variant],
      hover && "card-hover cursor-pointer",
      "animate-fade-in",
      className
    )}>
      {children}
    </div>
  )
}

export function CardHeader({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("mb-4", className)}>
      {children}
    </div>
  )
}

export function CardTitle({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <h3 className={cn("text-heading", className)}>
      {children}
    </h3>
  )
}

export function CardContent({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("space-y-4", className)}>
      {children}
    </div>
  )
}
