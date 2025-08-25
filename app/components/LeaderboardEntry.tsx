'use client'

import { Badge } from './ui/Badge'
import { cn } from '../lib/utils'

interface LeaderboardEntryProps {
  rank: number
  userId: string
  address: string
  successfulPredictions: number
  totalBets: number
  badges: string[]
  isCurrentUser?: boolean
  className?: string
}

export function LeaderboardEntry({
  rank,
  userId,
  address,
  successfulPredictions,
  totalBets,
  badges,
  isCurrentUser = false,
  className
}: LeaderboardEntryProps) {
  const formatAddress = (address: string): string => {
    if (!address) return ''
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const winRate = totalBets > 0 ? ((successfulPredictions / totalBets) * 100).toFixed(1) : '0.0'

  return (
    <div className={cn(
      'flex items-center justify-between p-4 rounded-lg border',
      isCurrentUser 
        ? 'bg-primary/5 border-primary/20' 
        : 'bg-surface border-primary/10',
      'hover:shadow-card transition-all duration-200',
      className
    )}>
      <div className="flex items-center space-x-4">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold text-sm">
          {rank}
        </div>
        
        <div>
          <div className="font-medium text-primary">
            {formatAddress(address)}
            {isCurrentUser && <span className="ml-2 text-xs text-accent">(You)</span>}
          </div>
          <div className="text-sm text-gray-600">
            {successfulPredictions}/{totalBets} predictions • {winRate}% win rate
          </div>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        {badges.slice(0, 3).map((badge, index) => (
          <Badge key={index} size="sm" variant="success">
            {badge}
          </Badge>
        ))}
        {badges.length > 3 && (
          <Badge size="sm" variant="default">
            +{badges.length - 3}
          </Badge>
        )}
      </div>
    </div>
  )
}
