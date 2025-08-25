"use client"

import { cn } from "../../lib/utils"
import { forwardRef, useState, useEffect } from "react"

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  helperText?: string
  showCount?: boolean
  maxLength?: number
  autoResize?: boolean
  fullWidth?: boolean
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ 
    label, 
    error, 
    helperText, 
    className, 
    showCount = false,
    maxLength,
    autoResize = false,
    fullWidth = true,
    id,
    required,
    ...props 
  }, ref) => {
    const [charCount, setCharCount] = useState(0)
    const textareaId = id || `textarea-${Math.random().toString(36).substring(2, 9)}`
    
    // Handle character count
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCharCount(e.target.value.length)
      props.onChange?.(e)
      
      if (autoResize) {
        e.target.style.height = 'auto'
        e.target.style.height = `${e.target.scrollHeight}px`
      }
    }
    
    // Initialize character count and auto-resize
    useEffect(() => {
      if (props.value && typeof props.value === 'string') {
        setCharCount(props.value.length)
      }
    }, [props.value])

    return (
      <div className={cn("space-y-2", fullWidth ? "w-full" : "")}>
        {label && (
          <label 
            htmlFor={textareaId}
            className="block text-sm font-medium text-text"
          >
            {label}
            {required && <span className="text-error ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          <textarea
            id={textareaId}
            ref={ref}
            className={cn(
              "bg-surface border border-border rounded-md px-3 py-2 text-text w-full min-h-[100px]",
              "placeholder:text-muted/70 transition-colors duration-200",
              "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary",
              error && "border-error focus:border-error focus:ring-error/20",
              autoResize ? "overflow-hidden resize-none" : "resize-vertical",
              className
            )}
            onChange={handleChange}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? `${textareaId}-error` : helperText ? `${textareaId}-helper` : undefined}
            maxLength={maxLength}
            required={required}
            {...props}
          />
          
          {showCount && maxLength && (
            <div className="absolute bottom-2 right-2 text-xs text-muted">
              {charCount}/{maxLength}
            </div>
          )}
        </div>
        
        {error && (
          <p 
            id={`${textareaId}-error`}
            className="text-sm text-error"
            role="alert"
          >
            {error}
          </p>
        )}
        {helperText && !error && (
          <p 
            id={`${textareaId}-helper`}
            className="text-sm text-muted"
          >
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

Textarea.displayName = "Textarea"
