'use client'

import { useState, useEffect } from 'react'
import { Button } from './ui/Button'
import { Input } from './ui/Input'
import { Card, CardHeader, CardContent, CardFooter } from './ui/Card'
import { Badge } from './ui/Badge'
import { cn } from '../lib/utils'
import { X, CheckCircle, AlertCircle, Coins, Wallet, TrendingUp } from 'lucide-react'

export interface BettingModalProps {
  isOpen: boolean
  onClose: () => void
  mvpTitle: string
  description?: string
  successOdds?: number
  failureOdds?: number
  totalPool?: number
  outcome?: 'success' | 'failure'
  onPlaceBet: (amount: number, currency: 'USDC' | 'ETH', prediction: 'success' | 'failure') => void
  isLoading?: boolean
}

export function BettingModal({
  isOpen,
  onClose,
  mvpTitle,
  description,
  successOdds = 50,
  failureOdds = 50,
  totalPool = 0,
  outcome: initialOutcome,
  onPlaceBet,
  isLoading = false
}: BettingModalProps) {
  const [amount, setAmount] = useState('')
  const [currency, setCurrency] = useState<'USDC' | 'ETH'>('USDC')
  const [prediction, setPrediction] = useState<'success' | 'failure'>(initialOutcome || 'success')
  const [error, setError] = useState('')
  const [quickAmounts] = useState([5, 10, 25, 50, 100])

  // Reset prediction when initialOutcome changes
  useEffect(() => {
    if (initialOutcome) {
      setPrediction(initialOutcome)
    }
  }, [initialOutcome])

  const handleSubmit = () => {
    const betAmount = parseFloat(amount)
    if (!betAmount || betAmount <= 0) {
      setError('Please enter a valid amount')
      return
    }
    
    setError('')
    onPlaceBet(betAmount, currency, prediction)
  }

  const handleQuickAmount = (quickAmount: number) => {
    setAmount(quickAmount.toString())
    setError('')
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setAmount(value)
      setError('')
    }
  }

  if (!isOpen) return null

  // Calculate potential winnings based on odds
  const calculatePotentialWinnings = () => {
    const betAmount = parseFloat(amount) || 0
    if (betAmount <= 0) return 0
    
    const odds = prediction === 'success' ? successOdds : failureOdds
    // Simple calculation: if odds are 25%, then multiplier is 4x (100/25)
    const multiplier = odds > 0 ? 100 / odds : 0
    return betAmount * multiplier
  }

  const potentialWinnings = calculatePotentialWinnings()

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div 
        className="w-full max-w-md animate-scale-in"
        role="dialog"
        aria-modal="true"
        aria-labelledby="betting-modal-title"
      >
        <Card elevated>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <h2 id="betting-modal-title" className="text-2xl font-semibold text-primary">Place Your Bet</h2>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onClose}
                aria-label="Close"
              >
                <X size={20} />
              </Button>
            </div>
            <div className="mt-1">
              <h3 className="font-medium text-primary">{mvpTitle}</h3>
              {description && <p className="text-sm text-muted mt-1">{description}</p>}
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-primary">
                  Your Prediction
                </label>
                {totalPool > 0 && (
                  <div className="flex items-center text-xs text-muted">
                    <Coins size={12} className="mr-1" />
                    <span>Pool: ${totalPool.toLocaleString()}</span>
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPrediction('success')}
                  className={cn(
                    'p-3 rounded-md border text-center transition-all duration-200',
                    'flex items-center justify-center',
                    prediction === 'success'
                      ? 'bg-success/10 border-success text-success shadow-sm'
                      : 'bg-bg border-border text-text hover:bg-bg/80'
                  )}
                  aria-pressed={prediction === 'success'}
                >
                  <CheckCircle size={16} className="mr-2" />
                  <div>
                    <div>Success</div>
                    <div className="text-xs">{successOdds}% odds</div>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setPrediction('failure')}
                  className={cn(
                    'p-3 rounded-md border text-center transition-all duration-200',
                    'flex items-center justify-center',
                    prediction === 'failure'
                      ? 'bg-error/10 border-error text-error shadow-sm'
                      : 'bg-bg border-border text-text hover:bg-bg/80'
                  )}
                  aria-pressed={prediction === 'failure'}
                >
                  <AlertCircle size={16} className="mr-2" />
                  <div>
                    <div>Failure</div>
                    <div className="text-xs">{failureOdds}% odds</div>
                  </div>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                Currency
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setCurrency('USDC')}
                  className={cn(
                    'p-3 rounded-md border text-center transition-all duration-200',
                    'flex items-center justify-center',
                    currency === 'USDC'
                      ? 'bg-primary/10 border-primary text-primary shadow-sm'
                      : 'bg-bg border-border text-text hover:bg-bg/80'
                  )}
                  aria-pressed={currency === 'USDC'}
                >
                  <div className="w-5 h-5 bg-blue-500 rounded-full text-white flex items-center justify-center mr-2 text-xs font-bold">$</div>
                  USDC
                </button>
                <button
                  type="button"
                  onClick={() => setCurrency('ETH')}
                  className={cn(
                    'p-3 rounded-md border text-center transition-all duration-200',
                    'flex items-center justify-center',
                    currency === 'ETH'
                      ? 'bg-primary/10 border-primary text-primary shadow-sm'
                      : 'bg-bg border-border text-text hover:bg-bg/80'
                  )}
                  aria-pressed={currency === 'ETH'}
                >
                  <div className="w-5 h-5 bg-purple-600 rounded-full text-white flex items-center justify-center mr-2 text-xs font-bold">Ξ</div>
                  ETH
                </button>
              </div>
            </div>

            <div>
              <Input
                label="Bet Amount"
                type="text"
                value={amount}
                onChange={handleAmountChange}
                placeholder={`Enter amount in ${currency}`}
                leftIcon={currency === 'USDC' ? <span className="text-blue-500">$</span> : <span className="text-purple-600">Ξ</span>}
                error={error}
                required
                aria-describedby="amount-error"
              />
              
              <div className="flex flex-wrap gap-2 mt-2">
                {quickAmounts.map((quickAmount) => (
                  <button
                    key={quickAmount}
                    type="button"
                    onClick={() => handleQuickAmount(quickAmount)}
                    className="px-2 py-1 text-xs bg-bg border border-border rounded-md hover:bg-bg/80 transition-colors"
                  >
                    {currency === 'USDC' ? '$' : 'Ξ'}{quickAmount}
                  </button>
                ))}
              </div>
            </div>

            {amount && parseFloat(amount) > 0 && (
              <div className="bg-bg/50 p-3 rounded-md border border-border">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted">Potential Winnings:</span>
                  <span className="text-lg font-bold text-success">
                    {currency === 'USDC' ? '$' : 'Ξ'}{potentialWinnings.toFixed(2)}
                  </span>
                </div>
                <div className="text-xs text-muted mt-1">
                  Based on current odds and pool size
                </div>
              </div>
            )}
          </CardContent>

          <CardFooter className="flex gap-3">
            <Button 
              variant="secondary" 
              onClick={onClose} 
              className="flex-1"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button 
              variant={prediction === 'success' ? 'success' : 'error'}
              onClick={handleSubmit} 
              className="flex-1"
              disabled={!amount || parseFloat(amount) <= 0 || isLoading}
              isLoading={isLoading}
              leftIcon={<Wallet size={16} />}
            >
              Place Bet
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
