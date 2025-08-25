"use client"

import { cn } from "../../lib/utils"
import { type HTMLAttributes, type ReactNode } from "react"

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  className?: string
  hover?: boolean
  variant?: 'default' | 'primary' | 'accent' | 'success' | 'warning' | 'error' | 'prediction-active' | 'prediction-resolved'
  bordered?: boolean
  elevated?: boolean
  onClick?: () => void
}

export function Card({ 
  children, 
  className, 
  hover = false, 
  variant = 'default',
  bordered = true,
  elevated = true,
  onClick,
  ...props
}: CardProps) {
  const baseStyles = cn(
    "bg-surface rounded-lg p-6 transition-all duration-200",
    bordered && "border border-border",
    elevated && "shadow-card",
    hover && "hover:shadow-modal hover:-translate-y-1 cursor-pointer",
    "animate-fade-in"
  )
  
  const variants = {
    default: "",
    primary: "border-l-4 border-l-primary bg-gradient-to-r from-primary/5 to-transparent",
    accent: "border-l-4 border-l-accent bg-gradient-to-r from-accent/5 to-transparent",
    success: "border-l-4 border-l-success bg-gradient-to-r from-success/5 to-transparent",
    warning: "border-l-4 border-l-warning bg-gradient-to-r from-warning/5 to-transparent",
    error: "border-l-4 border-l-error bg-gradient-to-r from-error/5 to-transparent",
    'prediction-active': "border-l-4 border-l-primary bg-gradient-to-r from-primary/5 to-transparent",
    'prediction-resolved': "border-l-4 border-l-success bg-gradient-to-r from-success/5 to-transparent"
  }

  return (
    <div 
      className={cn(baseStyles, variants[variant], className)}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
      {...props}
    >
      {children}
    </div>
  )
}

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  className?: string
}

export function CardHeader({ children, className, ...props }: CardHeaderProps) {
  return (
    <div className={cn("mb-4", className)} {...props}>
      {children}
    </div>
  )
}

export interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

export function CardTitle({ children, className, as = 'h3', ...props }: CardTitleProps) {
  const Component = as
  return (
    <Component className={cn("text-heading font-semibold", className)} {...props}>
      {children}
    </Component>
  )
}

export interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  className?: string
}

export function CardContent({ children, className, ...props }: CardContentProps) {
  return (
    <div className={cn("space-y-4", className)} {...props}>
      {children}
    </div>
  )
}

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  className?: string
}

export function CardFooter({ children, className, ...props }: CardFooterProps) {
  return (
    <div className={cn("flex items-center justify-end pt-4 mt-4 border-t border-border", className)} {...props}>
      {children}
    </div>
  )
}
