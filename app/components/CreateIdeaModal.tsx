"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "./ui/Card"
import { Button } from "./ui/Button"
import { Input } from "./ui/Input"
import { Textarea } from "./ui/Textarea"
import { Badge } from "./ui/Badge"
import { X, Lightbulb, Target, Sparkles, Tag, Calendar, TrendingUp, AlertTriangle } from "lucide-react"

export interface CreateIdeaModalProps {
  onClose: () => void
  onSubmit: (idea: {
    title: string
    description: string
    successCriteria: string
    tags: string[]
    duration?: number
  }) => void
  isOpen?: boolean
}

export function CreateIdeaModal({ onClose, onSubmit, isOpen = true }: CreateIdeaModalProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [successCriteria, setSuccessCriteria] = useState("")
  const [tags, setTags] = useState("")
  const [duration, setDuration] = useState(30)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<{
    title?: string;
    description?: string;
    successCriteria?: string;
  }>({})
  const [step, setStep] = useState(1)
  const [tagList, setTagList] = useState<string[]>([])
  const [charCount, setCharCount] = useState({
    title: 0,
    description: 0,
    successCriteria: 0
  })

  // Popular tags for quick selection
  const popularTags = ["AI", "Web3", "Social", "Finance", "Gaming", "Health", "Education", "Productivity"]

  // Update tag list when tags input changes
  useEffect(() => {
    const newTags = tags.split(',').map(tag => tag.trim()).filter(Boolean)
    setTagList(newTags)
  }, [tags])

  // Validate form fields
  const validateForm = () => {
    const newErrors: {
      title?: string;
      description?: string;
      successCriteria?: string;
    } = {}
    
    if (!title.trim()) {
      newErrors.title = "Title is required"
    } else if (title.length < 5) {
      newErrors.title = "Title must be at least 5 characters"
    }
    
    if (!description.trim()) {
      newErrors.description = "Description is required"
    } else if (description.length < 20) {
      newErrors.description = "Description must be at least 20 characters"
    }
    
    if (!successCriteria.trim()) {
      newErrors.successCriteria = "Success criteria is required"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setLoading(true)
    try {
      await onSubmit({
        title: title.trim(),
        description: description.trim(),
        successCriteria: successCriteria.trim(),
        tags: tagList,
        duration
      })
      onClose()
    } catch (error) {
      console.error("Error submitting idea:", error)
      // Show error message to user
    } finally {
      setLoading(false)
    }
  }

  const handleNextStep = () => {
    if (validateForm()) {
      setStep(2)
    }
  }

  const handlePrevStep = () => {
    setStep(1)
  }

  const handleTagClick = (tag: string) => {
    const currentTags = tagList
    
    if (currentTags.includes(tag)) {
      // Remove tag if already selected
      const newTags = currentTags.filter(t => t !== tag)
      setTagList(newTags)
      setTags(newTags.join(', '))
    } else {
      // Add tag if not already selected
      const newTags = [...currentTags, tag]
      setTagList(newTags)
      setTags(newTags.join(', '))
    }
  }

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setDescription(value)
    setCharCount(prev => ({ ...prev, description: value.length }))
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setTitle(value)
    setCharCount(prev => ({ ...prev, title: value.length }))
  }

  const handleSuccessCriteriaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSuccessCriteria(value)
    setCharCount(prev => ({ ...prev, successCriteria: value.length }))
  }

  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="create-idea-title"
    >
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-scale-in">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle id="create-idea-title" className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-accent" />
              {step === 1 ? "Propose MVP Idea" : "Finalize Your Prediction Market"}
            </CardTitle>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClose}
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <div className="w-full bg-border h-1 mt-4 rounded-full overflow-hidden">
            <div 
              className="bg-primary h-full transition-all duration-300 rounded-full"
              style={{ width: `${step === 1 ? 50 : 100}%` }}
            ></div>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 ? (
              <>
                {/* Step 1: Basic Information */}
                <Input
                  label="MVP Title"
                  value={title}
                  onChange={handleTitleChange}
                  placeholder="e.g., AI Recipe Generator"
                  required
                  helperText="A catchy, descriptive name for your MVP idea"
                  error={errors.title}
                  showCount
                  maxLength={60}
                />

                <Textarea
                  label="Description"
                  value={description}
                  onChange={handleDescriptionChange}
                  placeholder="Describe your MVP idea, target audience, and key features..."
                  required
                  helperText="Explain what your MVP does and why it would be valuable"
                  rows={4}
                  error={errors.description}
                  showCount
                  maxLength={500}
                  autoResize
                />

                <div className="space-y-2">
                  <Input
                    label="Success Criteria"
                    value={successCriteria}
                    onChange={handleSuccessCriteriaChange}
                    placeholder="e.g., 500+ active users in 30 days"
                    required
                    helperText="Define measurable criteria for success (users, downloads, revenue, etc.)"
                    error={errors.successCriteria}
                    showCount
                    maxLength={100}
                  />
                  <div className="bg-bg/50 rounded-md p-3 border border-border">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium">Success Criteria Examples</span>
                    </div>
                    <ul className="text-sm text-muted space-y-1">
                      <li>• 1000+ app downloads in 21 days</li>
                      <li>• 500+ active users in 30 days</li>
                      <li>• $1000+ revenue in first month</li>
                      <li>• 100+ social media followers in 14 days</li>
                    </ul>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Step 2: Additional Details */}
                <div className="space-y-4">
                  <div className="bg-bg/50 rounded-md p-4 border border-border">
                    <h3 className="text-lg font-medium text-primary mb-2">{title}</h3>
                    <p className="text-sm text-text mb-3">{description}</p>
                    <div className="flex items-center gap-2 text-sm text-primary">
                      <Target size={16} />
                      <span>{successCriteria}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-primary mb-2">
                        <div className="flex items-center gap-2">
                          <Tag size={16} />
                          <span>Tags</span>
                        </div>
                      </label>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {popularTags.map(tag => (
                          <Badge
                            key={tag}
                            variant={tagList.includes(tag) ? 'primary' : 'secondary'}
                            size="md"
                            className="cursor-pointer"
                            onClick={() => handleTagClick(tag)}
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <Input
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        placeholder="Custom tags (comma-separated)"
                        helperText="Add your own tags separated by commas"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-primary mb-2">
                        <div className="flex items-center gap-2">
                          <Calendar size={16} />
                          <span>Prediction Duration</span>
                        </div>
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {[7, 14, 30].map(days => (
                          <button
                            key={days}
                            type="button"
                            className={`p-2 rounded-md border text-center ${
                              duration === days 
                                ? 'bg-primary/10 border-primary text-primary' 
                                : 'bg-bg border-border text-text hover:bg-bg/80'
                            }`}
                            onClick={() => setDuration(days)}
                          >
                            {days} days
                          </button>
                        ))}
                      </div>
                      <p className="text-xs text-muted mt-1">
                        The prediction market will be active for this duration
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-accent/5 border border-accent/20 rounded-md p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-accent" />
                    <span className="text-sm font-medium text-accent">AI-Powered MVP Generation</span>
                  </div>
                  <p className="text-sm text-muted">
                    Once your idea receives enough positive predictions, our AI will automatically generate 
                    a basic MVP structure and implementation plan to bring your idea to life!
                  </p>
                </div>
                
                <div className="bg-warning/5 border border-warning/20 rounded-md p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-4 h-4 text-warning" />
                    <span className="text-sm font-medium text-warning">Important Note</span>
                  </div>
                  <p className="text-sm text-muted">
                    By creating this prediction market, you agree that the idea will be publicly visible 
                    and that others can bet on its success or failure. The success criteria will be used 
                    to determine the outcome.
                  </p>
                </div>
              </>
            )}
          </form>
        </CardContent>

        <CardFooter className="flex gap-3 pt-2">
          {step === 1 ? (
            <>
              <Button type="button" variant="secondary" onClick={onClose} className="flex-1">
                Cancel
              </Button>
              <Button 
                type="button" 
                variant="primary" 
                onClick={handleNextStep}
                disabled={!title.trim() || !description.trim() || !successCriteria.trim()}
                className="flex-1"
                rightIcon={<TrendingUp size={16} />}
              >
                Next Step
              </Button>
            </>
          ) : (
            <>
              <Button 
                type="button" 
                variant="secondary" 
                onClick={handlePrevStep} 
                className="flex-1"
              >
                Back
              </Button>
              <Button 
                type="button" 
                variant="accent" 
                onClick={handleSubmit}
                isLoading={loading}
                className="flex-1"
                leftIcon={<Lightbulb size={16} />}
              >
                Create Prediction Market
              </Button>
            </>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
