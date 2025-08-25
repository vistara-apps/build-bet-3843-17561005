'use client'

import { useState } from 'react'
import { Button } from './ui/Button'
import { cn } from '../lib/utils'

interface BettingModalProps {
  isOpen: boolean
  onClose: () => void
  mvpTitle: string
  onPlaceBet: (amount: number, currency: 'USDC' | 'ETH', prediction: 'success' | 'failure') => void
}

export function BettingModal({
  isOpen,
  onClose,
  mvpTitle,
  onPlaceBet
}: BettingModalProps) {
  const [amount, setAmount] = useState('')
  const [currency, setCurrency] = useState<'USDC' | 'ETH'>('USDC')
  const [prediction, setPrediction] = useState<'success' | 'failure'>('success')

  const handleSubmit = () => {
    const betAmount = parseFloat(amount)
    if (betAmount > 0) {
      onPlaceBet(betAmount, currency, prediction)
      setAmount('')
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-surface rounded-lg p-6 w-full max-w-md shadow-modal">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-primary">Place Your Bet</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            ×
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="font-medium text-primary mb-2">MVP: {mvpTitle}</h3>
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Your Prediction
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setPrediction('success')}
                className={cn(
                  'p-3 rounded-md border text-center transition-colors',
                  prediction === 'success'
                    ? 'bg-green-100 border-green-300 text-green-800'
                    : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                )}
              >
                Success
              </button>
              <button
                onClick={() => setPrediction('failure')}
                className={cn(
                  'p-3 rounded-md border text-center transition-colors',
                  prediction === 'failure'
                    ? 'bg-red-100 border-red-300 text-red-800'
                    : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                )}
              >
                Failure
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Currency
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setCurrency('USDC')}
                className={cn(
                  'p-3 rounded-md border text-center transition-colors',
                  currency === 'USDC'
                    ? 'bg-primary/10 border-primary text-primary'
                    : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                )}
              >
                USDC
              </button>
              <button
                onClick={() => setCurrency('ETH')}
                className={cn(
                  'p-3 rounded-md border text-center transition-colors',
                  currency === 'ETH'
                    ? 'bg-primary/10 border-primary text-primary'
                    : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                )}
              >
                ETH
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Bet Amount
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder={`Enter amount in ${currency}`}
              className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              step="0.01"
              min="0"
            />
          </div>

          <div className="flex space-x-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit} 
              className="flex-1"
              disabled={!amount || parseFloat(amount) <= 0}
            >
              Place Bet
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
