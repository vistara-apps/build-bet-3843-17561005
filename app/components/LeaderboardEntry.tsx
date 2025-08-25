'use client'

import { Badge } from './ui/Badge'
import { Card } from './ui/Card'
import { cn } from '../lib/utils'
import { Trophy, Medal, Target, Award, TrendingUp, Star } from 'lucide-react'

export interface BadgeInfo {
  id: string
  name: string
  description?: string
  icon?: 'trophy' | 'medal' | 'target' | 'award' | 'trending' | 'star'
  color?: 'primary' | 'accent' | 'success' | 'warning' | 'error'
}

export interface LeaderboardEntryProps {
  rank: number
  userId: string
  address: string
  name?: string
  avatar?: string
  successfulPredictions: number
  totalBets: number
  totalWinnings?: number
  badges: BadgeInfo[]
  isCurrentUser?: boolean
  onClick?: () => void
  className?: string
}

export function LeaderboardEntry({
  rank,
  userId,
  address,
  name,
  avatar,
  successfulPredictions,
  totalBets,
  totalWinnings = 0,
  badges,
  isCurrentUser = false,
  onClick,
  className
}: LeaderboardEntryProps) {
  const formatAddress = (address: string): string => {
    if (!address) return ''
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const winRate = totalBets > 0 ? ((successfulPredictions / totalBets) * 100).toFixed(1) : '0.0'
  
  // Determine rank color
  const getRankColor = (rank: number): string => {
    if (rank === 1) return 'bg-yellow-500' // Gold
    if (rank === 2) return 'bg-gray-400' // Silver
    if (rank === 3) return 'bg-amber-700' // Bronze
    return 'bg-primary'
  }
  
  // Get badge icon
  const getBadgeIcon = (iconName?: string) => {
    switch(iconName) {
      case 'trophy': return <Trophy size={12} />;
      case 'medal': return <Medal size={12} />;
      case 'target': return <Target size={12} />;
      case 'award': return <Award size={12} />;
      case 'trending': return <TrendingUp size={12} />;
      case 'star': return <Star size={12} />;
      default: return null;
    }
  }

  return (
    <Card
      variant={isCurrentUser ? 'primary' : 'default'}
      className={cn(
        'p-0 overflow-hidden',
        isCurrentUser && 'border-primary/30',
        onClick && 'cursor-pointer hover:-translate-y-1',
        className
      )}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
      aria-label={`Leaderboard entry for ${name || formatAddress(address)}`}
    >
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <div className={cn(
            "flex items-center justify-center w-8 h-8 rounded-full text-white font-bold text-sm",
            getRankColor(rank)
          )}>
            {rank}
          </div>
          
          <div className="flex items-center gap-3">
            {avatar ? (
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img src={avatar} alt={name || 'User avatar'} className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="w-10 h-10 rounded-full bg-bg flex items-center justify-center text-primary font-bold">
                {(name || address).charAt(0).toUpperCase()}
              </div>
            )}
            
            <div>
              <div className="font-medium text-primary flex items-center">
                {name || formatAddress(address)}
                {isCurrentUser && (
                  <Badge variant="accent" size="xs" className="ml-2">You</Badge>
                )}
              </div>
              <div className="text-sm text-muted flex items-center gap-2">
                <span className="flex items-center">
                  <Target size={12} className="mr-1 text-primary" />
                  <span>{successfulPredictions}/{totalBets}</span>
                </span>
                <span className="w-1 h-1 rounded-full bg-border"></span>
                <span className="flex items-center">
                  <TrendingUp size={12} className="mr-1 text-success" />
                  <span>{winRate}%</span>
                </span>
                {totalWinnings > 0 && (
                  <>
                    <span className="w-1 h-1 rounded-full bg-border"></span>
                    <span className="flex items-center">
                      <Trophy size={12} className="mr-1 text-accent" />
                      <span>${totalWinnings.toLocaleString()}</span>
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-1">
          {badges.slice(0, 3).map((badge) => (
            <Badge 
              key={badge.id} 
              size="sm" 
              variant={badge.color || 'success'}
              icon={getBadgeIcon(badge.icon)}
              title={badge.description}
            >
              {badge.name}
            </Badge>
          ))}
          {badges.length > 3 && (
            <Badge size="sm" variant="secondary">
              +{badges.length - 3}
            </Badge>
          )}
        </div>
      </div>
      
      {isCurrentUser && (
        <div className="h-1 bg-gradient-to-r from-primary via-accent to-success"></div>
      )}
    </Card>
  )
}
