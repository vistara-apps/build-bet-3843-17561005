
"use client"

import {
  useMiniKit,
  useAddFrame,
  useOpenUrl,
  usePrimaryButton,
} from "@coinbase/onchainkit/minikit"
import {
  Name,
  Identity,
  Address,
  Avatar,
  EthBalance,
} from "@coinbase/onchainkit/identity"
import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownDisconnect,
} from "@coinbase/onchainkit/wallet"
import { useEffect, useState, useCallback } from "react"
import { Button } from "./components/ui/Button"
import { PredictionCard } from "./components/PredictionCard"
import { BettingModal } from "./components/BettingModal"
import { LeaderboardEntry } from "./components/LeaderboardEntry"
import { CreateIdeaModal } from "./components/CreateIdeaModal"
import { SocialShareButton } from "./components/SocialShareButton"
import { Badge } from "./components/ui/Badge"
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/Card"
import { 
  mockMVPIdeas, 
  mockPredictionMarkets, 
  mockLeaderboard, 
  mockUsers,
  mockBadges 
} from "./lib/mock-data"
import { formatCurrency } from "./lib/utils"
import { 
  TrendingUp, 
  Users, 
  Trophy, 
  Plus, 
  Target, 
  Lightbulb,
  Coins,
  Medal
} from "lucide-react"

export default function App() {
  const { setFrameReady, isFrameReady, context } = useMiniKit()
  const [frameAdded, setFrameAdded] = useState(false)
  const [activeTab, setActiveTab] = useState("markets")
  const [bettingModal, setBettingModal] = useState<{
    marketId: string
    outcome: 'success' | 'failure'
  } | null>(null)
  const [createIdeaModal, setCreateIdeaModal] = useState(false)

  const addFrame = useAddFrame()
  const openUrl = useOpenUrl()

  // Primary button for quick actions
  usePrimaryButton(
    { text: activeTab === "markets" ? "CREATE MVP IDEA" : "VIEW MARKETS" },
    () => {
      if (activeTab === "markets") {
        setCreateIdeaModal(true)
      } else {
        setActiveTab("markets")
      }
    }
  )

  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady()
    }
  }, [setFrameReady, isFrameReady])

  const handleAddFrame = useCallback(async () => {
    const frameAdded = await addFrame()
    setFrameAdded(Boolean(frameAdded))
  }, [addFrame])

  const handleBet = (marketId: string, outcome: 'success' | 'failure') => {
    setBettingModal({ marketId, outcome })
  }

  const handleConfirmBet = async (amount: number, currency: 'USDC' | 'ETH') => {
    // Here you would integrate with onchain transactions
    console.log('Placing bet:', { 
      marketId: bettingModal?.marketId, 
      outcome: bettingModal?.outcome,
      amount, 
      currency 
    })
    
    // Simulate transaction
    await new Promise(resolve => setTimeout(resolve, 2000))
    setBettingModal(null)
    alert(`Bet placed successfully! ${amount} ${currency} on ${bettingModal?.outcome}`)
  }

  const handleCreateIdea = async (ideaData: any) => {
    console.log('Creating MVP idea:', ideaData)
    // Here you would integrate with backend API
    await new Promise(resolve => setTimeout(resolve, 2000))
    alert('MVP idea created! Prediction market is now live.')
  }

  const saveFrameButton = context && !context.client.added ? (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleAddFrame}
      className="text-primary"
    >
      <Plus className="w-4 h-4 mr-1" />
      Save App
    </Button>
  ) : frameAdded ? (
    <div className="flex items-center gap-1 text-sm font-medium text-success animate-fade-out">
      <Medal className="w-4 h-4" />
      <span>Saved</span>
    </div>
  ) : null

  const currentUser = mockUsers[0] // Simulate current user
  const activePredictions = mockPredictionMarkets.filter(m => m.status === 'active')
  const resolvedPredictions = mockPredictionMarkets.filter(m => m.status === 'resolved')

  return (
    <div className="frame-container">
      {/* Header */}
      <header className="flex justify-between items-center py-4 mb-6">
        <div className="flex items-center gap-3">
          <Wallet className="z-10">
            <ConnectWallet>
              <Name className="text-inherit font-medium" />
            </ConnectWallet>
            <WalletDropdown>
              <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
                <Avatar />
                <Name />
                <Address />
                <EthBalance />
              </Identity>
              <WalletDropdownDisconnect />
            </WalletDropdown>
          </Wallet>
        </div>
        <div>{saveFrameButton}</div>
      </header>

      {/* Hero Section */}
      <div className="text-center mb-8">
        <h1 className="text-display mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Build & Bet
        </h1>
        <p className="text-body text-muted mb-4">
          Predict, Build, Win: Your ideas brought to life onchain
        </p>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="card text-center py-4">
            <TrendingUp className="w-6 h-6 text-primary mx-auto mb-2" />
            <p className="text-lg font-bold">{activePredictions.length}</p>
            <p className="text-sm text-muted">Active Markets</p>
          </div>
          <div className="card text-center py-4">
            <Coins className="w-6 h-6 text-accent mx-auto mb-2" />
            <p className="text-lg font-bold">
              {formatCurrency(mockPredictionMarkets.reduce((sum, m) => sum + m.totalPool, 0))}
            </p>
            <p className="text-sm text-muted">Total Pool</p>
          </div>
          <div className="card text-center py-4">
            <Users className="w-6 h-6 text-success mx-auto mb-2" />
            <p className="text-lg font-bold">{mockLeaderboard.length}</p>
            <p className="text-sm text-muted">Predictors</p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-2 mb-6 bg-surface p-1 rounded-lg border border-border">
        <Button
          variant={activeTab === "markets" ? "primary" : "ghost"}
          size="sm"
          onClick={() => setActiveTab("markets")}
          className="flex-1"
        >
          <Target className="w-4 h-4 mr-2" />
          Markets
        </Button>
        <Button
          variant={activeTab === "leaderboard" ? "primary" : "ghost"}
          size="sm"
          onClick={() => setActiveTab("leaderboard")}
          className="flex-1"
        >
          <Trophy className="w-4 h-4 mr-2" />
          Leaderboard
        </Button>
        <Button
          variant={activeTab === "profile" ? "primary" : "ghost"}
          size="sm"
          onClick={() => setActiveTab("profile")}
          className="flex-1"
        >
          <Medal className="w-4 h-4 mr-2" />
          Profile
        </Button>
      </div>

      {/* Tab Content */}
      <main className="space-y-6 mb-20">
        {activeTab === "markets" && (
          <div className="space-y-6">
            {/* Create Idea Button */}
            <Button 
              variant="accent" 
              onClick={() => setCreateIdeaModal(true)}
              className="w-full"
            >
              <Lightbulb className="w-4 h-4 mr-2" />
              Propose New MVP Idea
            </Button>

            {/* Active Markets */}
            <div>
              <h2 className="text-heading mb-4">Active Prediction Markets</h2>
              <div className="space-y-4">
                {activePredictions.map((market) => {
                  const idea = mockMVPIdeas.find(i => i.ideaId === market.ideaId)!
                  return (
                    <PredictionCard
                      key={market.marketId}
                      idea={idea}
                      market={market}
                      onBet={handleBet}
                    />
                  )
                })}
              </div>
            </div>

            {/* Resolved Markets */}
            {resolvedPredictions.length > 0 && (
              <div>
                <h2 className="text-heading mb-4">Recently Resolved</h2>
                <div className="space-y-4">
                  {resolvedPredictions.map((market) => {
                    const idea = mockMVPIdeas.find(i => i.ideaId === market.ideaId)!
                    return (
                      <PredictionCard
                        key={market.marketId}
                        idea={idea}
                        market={market}
                        onBet={handleBet}
                        userCanBet={false}
                      />
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "leaderboard" && (
          <div className="space-y-4">
            <h2 className="text-heading mb-4">Top Predictors</h2>
            {mockLeaderboard.map((entry, index) => (
              <LeaderboardEntry
                key={entry.user.userId}
                entry={entry}
                isCurrentUser={entry.user.userId === currentUser.userId}
              />
            ))}
          </div>
        )}

        {activeTab === "profile" && (
          <div className="space-y-6">
            {/* User Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Your Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">{formatCurrency(currentUser.totalWinnings)}</p>
                    <p className="text-sm text-muted">Total Winnings</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-success">{currentUser.successRate}%</p>
                    <p className="text-sm text-muted">Success Rate</p>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted">Leaderboard Rank: #{currentUser.leaderboardRank}</p>
                </div>
              </CardContent>
            </Card>

            {/* Badges */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Medal className="w-5 h-5" />
                  Your Badges
                </CardTitle>
              </CardHeader>
              <CardContent>
                {currentUser.badges.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {currentUser.badges.map((badge) => (
                      <Badge key={badge.badgeId} badge={badge} variant="large" />
                    ))}
                  </div>
                ) : (
                  <p className="text-muted text-center py-4">
                    No badges yet. Start making predictions to earn your first badge!
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Share Profile */}
            <div className="text-center">
              <SocialShareButton
                idea={mockMVPIdeas[0]}
                variant="farcaster"
                text={`🏆 Just achieved ${currentUser.successRate}% prediction accuracy on Build & Bet!

${currentUser.totalWinnings > 0 ? `💰 Total winnings: ${formatCurrency(currentUser.totalWinnings)}` : '🎯 Ready to start predicting!'}

Join me in predicting the next big MVP ideas! 🚀

#BuildAndBet #PredictionMarkets #Web3`}
              />
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-surface border-t border-border p-4">
        <div className="max-w-lg mx-auto text-center">
          <Button
            variant="ghost"
            size="sm"
            className="text-muted text-xs"
            onClick={() => openUrl("https://base.org/builders/minikit")}
          >
            Built on Base with MiniKit
          </Button>
        </div>
      </footer>

      {/* Modals */}
      {bettingModal && (
        <BettingModal
          idea={mockMVPIdeas.find(i => i.ideaId === mockPredictionMarkets.find(m => m.marketId === bettingModal.marketId)?.ideaId)!}
          market={mockPredictionMarkets.find(m => m.marketId === bettingModal.marketId)!}
          outcome={bettingModal.outcome}
          onClose={() => setBettingModal(null)}
          onConfirm={handleConfirmBet}
        />
      )}

      {createIdeaModal && (
        <CreateIdeaModal
          onClose={() => setCreateIdeaModal(false)}
          onSubmit={handleCreateIdea}
        />
      )}
    </div>
  )
}
