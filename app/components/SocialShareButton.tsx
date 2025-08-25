
"use client"

import { Button } from "./ui/Button"
import { Share2, MessageCircle } from "lucide-react"
import { type MVPIdea, type PredictionMarket } from "@/lib/types"

interface SocialShareButtonProps {
  idea: MVPIdea
  market?: PredictionMarket
  variant?: 'farcaster' | 'generic'
  text?: string
}

export function SocialShareButton({ 
  idea, 
  market, 
  variant = 'farcaster',
  text 
}: SocialShareButtonProps) {
  const generateShareText = () => {
    if (text) return text

    if (market) {
      return `🎯 Just placed a prediction on "${idea.title}" - ${idea.description.slice(0, 100)}... 

Will it reach ${market.successCriteria}? 

Join the prediction market on Build & Bet! 🚀

#BuildAndBet #PredictionMarkets #MVPIdeas`
    }

    return `💡 Check out this MVP idea: "${idea.title}" - ${idea.description.slice(0, 120)}...

What do you think? Will it succeed? 🤔

#BuildAndBet #MVPIdeas #Predictions`
  }

  const handleShare = () => {
    const shareText = generateShareText()
    const url = `${window.location.origin}${market ? `/market/${market.marketId}` : `/idea/${idea.ideaId}`}`
    
    if (variant === 'farcaster') {
      // For Farcaster, we would integrate with the Farcaster SDK
      // For now, we'll copy to clipboard
      navigator.clipboard.writeText(`${shareText}\n\n${url}`)
      alert('Share text copied to clipboard!')
    } else {
      // Generic sharing
      if (navigator.share) {
        navigator.share({
          title: idea.title,
          text: shareText,
          url: url,
        })
      } else {
        navigator.clipboard.writeText(`${shareText}\n\n${url}`)
        alert('Share text copied to clipboard!')
      }
    }
  }

  const icon = variant === 'farcaster' ? MessageCircle : Share2
  const label = variant === 'farcaster' ? 'Share on Farcaster' : 'Share'

  return (
    <Button
      variant="secondary"
      size="sm"
      onClick={handleShare}
      className="flex items-center gap-2"
    >
      {icon && <icon className="w-4 h-4" />}
      {label}
    </Button>
  )
}
