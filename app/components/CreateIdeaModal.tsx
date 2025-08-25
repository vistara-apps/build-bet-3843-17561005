
"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card"
import { Button } from "./ui/Button"
import { Input } from "./ui/Input"
import { Textarea } from "./ui/Textarea"
import { X, Lightbulb, Target, Sparkles } from "lucide-react"

interface CreateIdeaModalProps {
  onClose: () => void
  onSubmit: (idea: {
    title: string
    description: string
    successCriteria: string
    tags: string[]
  }) => void
}

export function CreateIdeaModal({ onClose, onSubmit }: CreateIdeaModalProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [successCriteria, setSuccessCriteria] = useState("")
  const [tags, setTags] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !description.trim() || !successCriteria.trim()) return

    setLoading(true)
    try {
      await onSubmit({
        title: title.trim(),
        description: description.trim(),
        successCriteria: successCriteria.trim(),
        tags: tags.split(',').map(tag => tag.trim()).filter(Boolean)
      })
      onClose()
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-fade-in">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-scale-in">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-accent" />
              Propose MVP Idea
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <Input
              label="MVP Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., AI Recipe Generator"
              required
              helperText="A catchy, descriptive name for your MVP idea"
            />

            {/* Description */}
            <Textarea
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your MVP idea, target audience, and key features..."
              required
              helperText="Explain what your MVP does and why it would be valuable"
              rows={4}
            />

            {/* Success Criteria */}
            <div className="space-y-2">
              <Input
                label="Success Criteria"
                value={successCriteria}
                onChange={(e) => setSuccessCriteria(e.target.value)}
                placeholder="e.g., 500+ active users in 30 days"
                required
                helperText="Define measurable criteria for success (users, downloads, revenue, etc.)"
              />
              <div className="bg-bg rounded-md p-3">
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

            {/* Tags */}
            <Input
              label="Tags (Optional)"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="AI, Social, Web3, Fitness, etc."
              helperText="Comma-separated tags to categorize your idea"
            />

            {/* AI Generation Notice */}
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

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button type="button" variant="secondary" onClick={onClose} className="flex-1">
                Cancel
              </Button>
              <Button 
                type="submit" 
                variant="primary" 
                loading={loading}
                disabled={!title.trim() || !description.trim() || !successCriteria.trim()}
                className="flex-1"
              >
                <Lightbulb className="w-4 h-4 mr-2" />
                Create Prediction Market
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
