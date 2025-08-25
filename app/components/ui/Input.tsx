"use client"

import { cn } from "../../lib/utils"
import { forwardRef, useState } from "react"
import { Eye, EyeOff } from "lucide-react"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  showPasswordToggle?: boolean
  fullWidth?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ 
    label, 
    error, 
    helperText, 
    className, 
    leftIcon, 
    rightIcon, 
    showPasswordToggle = false,
    fullWidth = true,
    type = "text",
    id,
    required,
    ...props 
  }, ref) => {
    const [showPassword, setShowPassword] = useState(false)
    const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`
    const inputType = showPasswordToggle ? (showPassword ? "text" : "password") : type

    return (
      <div className={cn("space-y-2", fullWidth ? "w-full" : "")}>
        {label && (
          <label 
            htmlFor={inputId}
            className="block text-sm font-medium text-text"
          >
            {label}
            {required && <span className="text-error ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            type={inputType}
            className={cn(
              "bg-surface border border-border rounded-md px-3 py-2 text-text w-full",
              "placeholder:text-muted/70 transition-colors duration-200",
              "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary",
              error && "border-error focus:border-error focus:ring-error/20",
              leftIcon && "pl-10",
              (rightIcon || showPasswordToggle) && "pr-10",
              className
            )}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
            required={required}
            {...props}
          />
          {rightIcon && !showPasswordToggle && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted">
              {rightIcon}
            </div>
          )}
          {showPasswordToggle && type === "password" && (
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-primary transition-colors"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )}
        </div>
        {error && (
          <p 
            id={`${inputId}-error`}
            className="text-sm text-error"
            role="alert"
          >
            {error}
          </p>
        )}
        {helperText && !error && (
          <p 
            id={`${inputId}-helper`}
            className="text-sm text-muted"
          >
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = "Input"
