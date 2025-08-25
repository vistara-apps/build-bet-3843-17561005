
export interface User {
  userId: string
  farcasterId?: string
  ethAddress: string
  predictionHistory: Prediction[]
  badges: Badge[]
  leaderboardRank: number
  totalWinnings: number
  successRate: number
}

export interface MVPIdea {
  ideaId: string
  title: string
  description: string
  proposedBy: string
  tags: string[]
  status: 'draft' | 'active' | 'resolved'
  createdAt: Date
  generatedConcept?: string
}

export interface PredictionMarket {
  marketId: string
  ideaId: string
  predictionToken: string
  successCriteria: string
  startDate: Date
  endDate: Date
  resolutionOutcome?: 'success' | 'failure'
  totalBets: number
  successBets: number
  failureBets: number
  totalPool: number
  winningPrediction?: 'success' | 'failure'
  status: 'active' | 'resolved' | 'expired'
}

export interface Bet {
  betId: string
  marketId: string
  userId: string
  predictedOutcome: 'success' | 'failure'
  amount: number
  currency: 'USDC' | 'ETH'
  timestamp: Date
  payout?: number
  status: 'pending' | 'won' | 'lost'
}

export interface Badge {
  badgeId: string
  name: string
  description: string
  imageUrl: string
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  criteria: string
}

export interface Prediction {
  betId: string
  marketId: string
  outcome: 'success' | 'failure'
  correct: boolean
  payout: number
}

export interface LeaderboardEntry {
  rank: number
  user: User
  totalWinnings: number
  successRate: number
  totalPredictions: number
}
