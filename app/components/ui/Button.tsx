'use client'

import { cn } from '../../lib/utils'
import { type ButtonHTMLAttributes, type ReactNode } from 'react'
import { Loader2 } from 'lucide-react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost' | 'success' | 'warning' | 'error'
  size?: 'xs' | 'sm' | 'md' | 'lg'
  className?: string
  isLoading?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  fullWidth?: boolean
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  onClick,
  disabled = false,
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  type = 'button',
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'
  
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary/90 shadow-sm hover:shadow focus-visible:ring-primary/30',
    secondary: 'bg-surface text-text hover:bg-bg border border-border shadow-sm hover:shadow focus-visible:ring-primary/30',
    accent: 'bg-accent text-white hover:bg-accent/90 shadow-sm hover:shadow focus-visible:ring-accent/30',
    outline: 'border border-primary text-primary hover:bg-primary/10 focus-visible:ring-primary/30',
    ghost: 'text-primary hover:bg-primary/10 focus-visible:ring-primary/30',
    success: 'bg-success text-white hover:bg-success/90 shadow-sm hover:shadow focus-visible:ring-success/30',
    warning: 'bg-warning text-white hover:bg-warning/90 shadow-sm hover:shadow focus-visible:ring-warning/30',
    error: 'bg-error text-white hover:bg-error/90 shadow-sm hover:shadow focus-visible:ring-error/30'
  }
  
  const sizes = {
    xs: 'h-7 px-2 text-xs',
    sm: 'h-9 px-3 text-sm',
    md: 'h-10 px-4 text-base',
    lg: 'h-12 px-6 text-lg'
  }

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      className={cn(
        baseStyles, 
        variants[variant], 
        sizes[size], 
        widthClass,
        isLoading && 'opacity-80 pointer-events-none',
        className
      )}
      onClick={onClick}
      disabled={disabled || isLoading}
      type={type}
      aria-disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {children}
        </>
      ) : (
        <>
          {leftIcon && <span className="mr-2">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="ml-2">{rightIcon}</span>}
        </>
      )}
    </button>
  )
}
