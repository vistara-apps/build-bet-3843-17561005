'use client'

import { Badge } from './ui/Badge'
import { Button } from './ui/Button'
import { cn } from '../lib/utils'

interface PredictionCardProps {
  id: string
  title: string
  description: string
  successCriteria: string
  endDate: Date
  totalBets: number
  status: 'active' | 'resolved'
  onBet: (id: string) => void
  className?: string
}

export function PredictionCard({
  id,
  title,
  description,
  successCriteria,
  endDate,
  totalBets,
  status,
  onBet,
  className
}: PredictionCardProps) {
  const formatTimeRemaining = (endDate: Date): string => {
    const now = new Date()
    const diff = endDate.getTime() - now.getTime()
    
    if (diff <= 0) return 'Ended'
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    
    if (days > 0) return `${days}d ${hours}h`
    return `${hours}h`
  }

  return (
    <div className={cn(
      'bg-surface rounded-lg p-6 shadow-card border border-primary/10',
      'hover:shadow-modal transition-all duration-200',
      className
    )}>
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-primary">{title}</h3>
        <Badge variant={status === 'active' ? 'default' : 'success'}>
          {status === 'active' ? 'Active' : 'Resolved'}
        </Badge>
      </div>
      
      <p className="text-base leading-7 text-gray-600 mb-4">{description}</p>
      
      <div className="space-y-3 mb-6">
        <div>
          <span className="text-sm font-medium text-primary">Success Criteria:</span>
          <p className="text-sm text-gray-600">{successCriteria}</p>
        </div>
        
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">Time Remaining:</span>
          <span className="font-medium text-primary">{formatTimeRemaining(endDate)}</span>
        </div>
        
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">Total Bets:</span>
          <span className="font-medium text-accent">{totalBets}</span>
        </div>
      </div>
      
      {status === 'active' && (
        <Button 
          onClick={() => onBet(id)}
          className="w-full"
        >
          Place Bet
        </Button>
      )}
    </div>
  )
}
