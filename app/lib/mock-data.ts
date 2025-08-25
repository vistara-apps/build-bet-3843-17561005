
import { MVPIdea, PredictionMarket, Badge, User, Bet, LeaderboardEntry } from './types'

export const mockBadges: Badge[] = [
  {
    badgeId: 'early-adopter',
    name: 'Early Adopter',
    description: 'Made your first prediction',
    imageUrl: '🎯',
    rarity: 'common',
    criteria: 'Place first bet'
  },
  {
    badgeId: 'oracle',
    name: 'Oracle',
    description: '90% prediction accuracy',
    imageUrl: '🔮',
    rarity: 'legendary',
    criteria: '90% success rate with 10+ predictions'
  },
  {
    badgeId: 'builder',
    name: 'Builder',
    description: 'Proposed a successful MVP',
    imageUrl: '🛠️',
    rarity: 'rare',
    criteria: 'MVP idea became successful'
  },
  {
    badgeId: 'whale',
    name: 'Whale',
    description: 'Bet over 10 USDC total',
    imageUrl: '🐋',
    rarity: 'epic',
    criteria: 'Total bets > 10 USDC'
  }
]

export const mockMVPIdeas: MVPIdea[] = [
  {
    ideaId: 'mvp-1',
    title: 'AI Recipe Generator',
    description: 'Generate personalized recipes based on dietary preferences and available ingredients using AI.',
    proposedBy: '0x1234...5678',
    tags: ['AI', 'Food', 'Lifestyle'],
    status: 'active',
    createdAt: new Date('2024-01-15'),
    generatedConcept: 'A web app that uses OpenAI to generate custom recipes. Features: ingredient input, dietary filters, nutritional info, shopping lists.'
  },
  {
    ideaId: 'mvp-2', 
    title: 'Social Fitness Tracker',
    description: 'Track workouts and compete with friends in fitness challenges with onchain rewards.',
    proposedBy: '0x9876...5432',
    tags: ['Fitness', 'Social', 'Web3'],
    status: 'active',
    createdAt: new Date('2024-01-16'),
    generatedConcept: 'Mobile-first app connecting fitness tracking with social challenges. Features: workout logging, friend challenges, NFT rewards, leaderboards.'
  },
  {
    ideaId: 'mvp-3',
    title: 'NFT Art Marketplace',
    description: 'Curated marketplace for emerging digital artists with creator tools and royalty management.',
    proposedBy: '0x5555...7777',
    tags: ['NFT', 'Art', 'Marketplace'],
    status: 'resolved',
    createdAt: new Date('2024-01-10'),
    generatedConcept: 'Decentralized platform for artists to mint, sell, and track NFT art with integrated creator tools and automated royalties.'
  }
]

export const mockPredictionMarkets: PredictionMarket[] = [
  {
    marketId: 'market-1',
    ideaId: 'mvp-1',
    predictionToken: 'RECIPE-PRED',
    successCriteria: '500+ active users in 30 days',
    startDate: new Date('2024-01-15'),
    endDate: new Date('2024-02-14'),
    totalBets: 12,
    successBets: 8,
    failureBets: 4,
    totalPool: 2.5,
    status: 'active'
  },
  {
    marketId: 'market-2',
    ideaId: 'mvp-2',
    predictionToken: 'FITNESS-PRED',
    successCriteria: '1000+ downloads in 21 days',
    startDate: new Date('2024-01-16'),
    endDate: new Date('2024-02-06'),
    totalBets: 18,
    successBets: 15,
    failureBets: 3,
    totalPool: 4.2,
    status: 'active'
  },
  {
    marketId: 'market-3',
    ideaId: 'mvp-3',
    predictionToken: 'NFT-PRED',
    successCriteria: '100+ NFTs minted in 14 days',
    startDate: new Date('2024-01-10'),
    endDate: new Date('2024-01-24'),
    resolutionOutcome: 'success',
    totalBets: 25,
    successBets: 20,
    failureBets: 5,
    totalPool: 6.8,
    winningPrediction: 'success',
    status: 'resolved'
  }
]

export const mockUsers: User[] = [
  {
    userId: 'user-1',
    farcasterId: 'alice.eth',
    ethAddress: '0x1234567890123456789012345678901234567890',
    predictionHistory: [],
    badges: [mockBadges[0], mockBadges[2]],
    leaderboardRank: 1,
    totalWinnings: 12.5,
    successRate: 85
  },
  {
    userId: 'user-2', 
    farcasterId: 'bob.base',
    ethAddress: '0x9876543210987654321098765432109876543210',
    predictionHistory: [],
    badges: [mockBadges[0], mockBadges[3]],
    leaderboardRank: 2,
    totalWinnings: 8.2,
    successRate: 72
  },
  {
    userId: 'user-3',
    farcasterId: 'charlie.fc',
    ethAddress: '0x5555555555555555555555555555555555555555',
    predictionHistory: [],
    badges: [mockBadges[0]],
    leaderboardRank: 3,
    totalWinnings: 5.1,
    successRate: 67
  }
]

export const mockLeaderboard: LeaderboardEntry[] = [
  {
    rank: 1,
    user: mockUsers[0],
    totalWinnings: 12.5,
    successRate: 85,
    totalPredictions: 15
  },
  {
    rank: 2,
    user: mockUsers[1], 
    totalWinnings: 8.2,
    successRate: 72,
    totalPredictions: 12
  },
  {
    rank: 3,
    user: mockUsers[2],
    totalWinnings: 5.1,
    successRate: 67,
    totalPredictions: 8
  }
]

export const mockUserBets: Bet[] = [
  {
    betId: 'bet-1',
    marketId: 'market-1',
    userId: 'user-1',
    predictedOutcome: 'success',
    amount: 0.5,
    currency: 'USDC',
    timestamp: new Date('2024-01-15T10:30:00'),
    status: 'pending'
  },
  {
    betId: 'bet-2',
    marketId: 'market-2', 
    userId: 'user-1',
    predictedOutcome: 'success',
    amount: 1.0,
    currency: 'USDC',
    timestamp: new Date('2024-01-16T14:15:00'),
    status: 'pending'
  },
  {
    betId: 'bet-3',
    marketId: 'market-3',
    userId: 'user-1',
    predictedOutcome: 'success',
    amount: 0.8,
    currency: 'USDC', 
    timestamp: new Date('2024-01-10T09:45:00'),
    payout: 1.2,
    status: 'won'
  }
]
