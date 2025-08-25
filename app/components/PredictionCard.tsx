'use client'

import { Badge } from './ui/Badge'
import { Button } from './ui/Button'
import { Card, CardContent, CardHeader, CardFooter } from './ui/Card'
import { cn } from '../lib/utils'
import { Clock, Users, CheckCircle, AlertCircle, TrendingUp } from 'lucide-react'

export interface PredictionCardProps {
  id: string
  title: string
  description: string
  successCriteria: string
  endDate: Date
  totalBets: number
  totalPool?: number
  successOdds?: number
  failureOdds?: number
  status: 'active' | 'resolved'
  result?: 'success' | 'failure'
  onBet: (id: string, outcome?: 'success' | 'failure') => void
  userCanBet?: boolean
  className?: string
}

export function PredictionCard({
  id,
  title,
  description,
  successCriteria,
  endDate,
  totalBets,
  totalPool = 0,
  successOdds = 50,
  failureOdds = 50,
  status,
  result,
  onBet,
  userCanBet = true,
  className
}: PredictionCardProps) {
  const formatTimeRemaining = (endDate: Date): string => {
    const now = new Date()
    const diff = endDate.getTime() - now.getTime()
    
    if (diff <= 0) return 'Ended'
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    
    if (days > 0) return `${days}d ${hours}h`
    if (hours > 0) return `${hours}h ${minutes}m`
    return `${minutes}m`
  }

  // Calculate time urgency for visual indicators
  const getTimeUrgency = (): 'high' | 'medium' | 'low' => {
    const now = new Date()
    const diff = endDate.getTime() - now.getTime()
    const totalDuration = 7 * 24 * 60 * 60 * 1000 // Assuming 7 days is the typical duration
    const remainingPercentage = (diff / totalDuration) * 100
    
    if (remainingPercentage < 15) return 'high'
    if (remainingPercentage < 40) return 'medium'
    return 'low'
  }
  
  const timeUrgency = getTimeUrgency()
  const timeUrgencyColor = {
    high: 'text-error',
    medium: 'text-warning',
    low: 'text-success'
  }

  return (
    <Card 
      variant={status === 'active' ? 'primary' : 'success'}
      hover
      className={className}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-semibold text-primary">{title}</h3>
          <Badge 
            variant={status === 'active' ? 'primary' : 'success'}
            icon={status === 'active' ? <TrendingUp size={14} /> : <CheckCircle size={14} />}
          >
            {status === 'active' ? 'Active' : 'Resolved'}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-base leading-7 text-text">{description}</p>
        
        <div className="bg-bg/50 rounded-md p-3 border border-border">
          <h4 className="text-sm font-medium text-primary mb-1">Success Criteria:</h4>
          <p className="text-sm text-text">{successCriteria}</p>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-bg/50 rounded-md p-3 border border-border">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center">
                <Clock size={14} className={cn("mr-1", timeUrgencyColor[timeUrgency])} />
                <span className="text-xs font-medium text-muted">Time Left:</span>
              </div>
              <span className={cn("text-sm font-bold", timeUrgencyColor[timeUrgency])}>
                {formatTimeRemaining(endDate)}
              </span>
            </div>
            <div className="w-full bg-border rounded-full h-1.5 mt-1">
              <div 
                className={cn(
                  "h-full rounded-full",
                  timeUrgency === 'high' ? 'bg-error' : 
                  timeUrgency === 'medium' ? 'bg-warning' : 'bg-success'
                )}
                style={{ width: `${Math.min(100, Math.max(5, timeUrgency === 'high' ? 15 : timeUrgency === 'medium' ? 40 : 75))}%` }}
              ></div>
            </div>
          </div>
          
          <div className="bg-bg/50 rounded-md p-3 border border-border">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center">
                <Users size={14} className="mr-1 text-accent" />
                <span className="text-xs font-medium text-muted">Participants:</span>
              </div>
              <span className="text-sm font-bold text-accent">{totalBets}</span>
            </div>
            <div className="text-xs text-muted text-right">
              {totalPool > 0 && `Pool: $${totalPool.toLocaleString()}`}
            </div>
          </div>
        </div>
        
        {status === 'active' && (
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center">
              <div className="text-sm font-medium mb-1">Success</div>
              <div className="text-lg font-bold text-success">{successOdds}%</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-medium mb-1">Failure</div>
              <div className="text-lg font-bold text-error">{failureOdds}%</div>
            </div>
          </div>
        )}
        
        {status === 'resolved' && result && (
          <div className="flex items-center justify-center p-2 rounded-md bg-bg border border-border">
            <div className="flex items-center">
              {result === 'success' ? (
                <>
                  <CheckCircle size={18} className="mr-2 text-success" />
                  <span className="font-medium text-success">Succeeded</span>
                </>
              ) : (
                <>
                  <AlertCircle size={18} className="mr-2 text-error" />
                  <span className="font-medium text-error">Failed</span>
                </>
              )}
            </div>
          </div>
        )}
      </CardContent>
      
      {status === 'active' && userCanBet && (
        <CardFooter className="pt-2 flex gap-2">
          <Button 
            variant="success"
            onClick={() => onBet(id, 'success')}
            className="flex-1"
            leftIcon={<CheckCircle size={16} />}
          >
            Success
          </Button>
          <Button 
            variant="error"
            onClick={() => onBet(id, 'failure')}
            className="flex-1"
            leftIcon={<AlertCircle size={16} />}
          >
            Failure
          </Button>
        </CardFooter>
      )}
      
      {status === 'active' && !userCanBet && (
        <CardFooter className="pt-2">
          <Button 
            variant="primary"
            onClick={() => onBet(id)}
            fullWidth
          >
            View Details
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
