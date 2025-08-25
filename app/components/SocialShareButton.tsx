"use client"

import { useState } from "react"
import { Button } from "./ui/Button"
import { Share2, MessageCircle, Twitter, Copy, Check, Globe } from "lucide-react"
import { type MVPIdea, type PredictionMarket } from "../lib/types"

export interface SocialShareButtonProps {
  idea: MVPIdea
  market?: PredictionMarket
  variant?: 'farcaster' | 'twitter' | 'generic'
  text?: string
  size?: 'sm' | 'md' | 'lg'
  showIcon?: boolean
  showLabel?: boolean
  fullWidth?: boolean
  className?: string
}

export function SocialShareButton({ 
  idea, 
  market, 
  variant = 'farcaster',
  text,
  size = 'md',
  showIcon = true,
  showLabel = true,
  fullWidth = false,
  className
}: SocialShareButtonProps) {
  const [copied, setCopied] = useState(false)
  const [isSharing, setIsSharing] = useState(false)

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

  const handleShare = async () => {
    setIsSharing(true)
    try {
      const shareText = generateShareText()
      const url = `${window.location.origin}${market ? `/market/${market.marketId}` : `/idea/${idea.ideaId}`}`
      
      if (variant === 'farcaster') {
        // For Farcaster, we would integrate with the Farcaster SDK
        // For now, we'll copy to clipboard
        await navigator.clipboard.writeText(`${shareText}\n\n${url}`)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } else if (variant === 'twitter') {
        // Open Twitter share dialog
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}`
        window.open(twitterUrl, '_blank')
      } else {
        // Generic sharing
        if (navigator.share) {
          await navigator.share({
            title: idea.title,
            text: shareText,
            url: url,
          })
        } else {
          await navigator.clipboard.writeText(`${shareText}\n\n${url}`)
          setCopied(true)
          setTimeout(() => setCopied(false), 2000)
        }
      }
    } catch (error) {
      console.error('Error sharing:', error)
    } finally {
      setIsSharing(false)
    }
  }

  const getIcon = () => {
    if (copied) return Check
    
    switch (variant) {
      case 'farcaster': return MessageCircle
      case 'twitter': return Twitter
      default: return Share2
    }
  }
  
  const getLabel = () => {
    if (copied) return 'Copied!'
    
    switch (variant) {
      case 'farcaster': return 'Share on Farcaster'
      case 'twitter': return 'Share on Twitter'
      default: return 'Share'
    }
  }
  
  const getVariant = () => {
    switch (variant) {
      case 'farcaster': return 'primary'
      case 'twitter': return 'accent'
      default: return 'secondary'
    }
  }

  const Icon = getIcon()
  const label = getLabel()
  const buttonVariant = getVariant()

  return (
    <Button
      variant={buttonVariant}
      size={size}
      onClick={handleShare}
      className={className}
      isLoading={isSharing}
      fullWidth={fullWidth}
      leftIcon={showIcon ? <Icon size={size === 'sm' ? 14 : 16} /> : undefined}
      aria-label={label}
    >
      {showLabel && label}
    </Button>
  )
}
