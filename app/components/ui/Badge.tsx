'use client'

import { cn } from '../../lib/utils'
import { type HTMLAttributes, type ReactNode } from 'react'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode
  variant?: 'default' | 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error' | 'outline'
  size?: 'xs' | 'sm' | 'md' | 'lg'
  className?: string
  icon?: ReactNode
  removable?: boolean
  onRemove?: () => void
}

export function Badge({
  children,
  variant = 'default',
  size = 'md',
  className,
  icon,
  removable = false,
  onRemove,
  ...props
}: BadgeProps) {
  const baseStyles = 'inline-flex items-center justify-center rounded-full font-medium transition-colors'
  
  const variants = {
    default: 'bg-primary/10 text-primary',
    primary: 'bg-primary text-white',
    secondary: 'bg-surface text-text border border-border',
    accent: 'bg-accent/10 text-accent',
    success: 'bg-success/10 text-success',
    warning: 'bg-warning/10 text-warning',
    error: 'bg-error/10 text-error',
    outline: 'bg-transparent border border-current'
  }
  
  const sizes = {
    xs: 'h-5 px-1.5 text-xs',
    sm: 'h-6 px-2 py-0.5 text-xs',
    md: 'h-7 px-3 py-1 text-sm',
    lg: 'h-8 px-4 py-1.5 text-base'
  }

  return (
    <span 
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {icon && <span className={cn("mr-1", size === 'xs' ? 'w-3 h-3' : 'w-4 h-4')}>{icon}</span>}
      {children}
      {removable && (
        <button
          type="button"
          className={cn(
            "ml-1 rounded-full hover:bg-black/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary",
            size === 'xs' ? 'w-3 h-3' : 'w-4 h-4'
          )}
          onClick={(e) => {
            e.stopPropagation();
            onRemove?.();
          }}
          aria-label="Remove"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="w-full h-full"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      )}
    </span>
  )
}
