'use client'
import { useState, useEffect } from 'react'
import { X, CheckCircle2, Loader2, Check } from 'lucide-react'
import { useCartStore } from '@/store/useCartStore'

type Step = 'select_token' | 'approving' | 'success'

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  total: number
}

export function PaymentModal({ isOpen, onClose, total }: PaymentModalProps) {
  const [step, setStep] = useState<Step>('select_token')
  const [selectedToken, setSelectedToken] = useState<'USDC' | 'ETH' | null>(null)
  const clearCart = useCartStore(state => state.clearCart)

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => { setStep('select_token'); setSelectedToken(null) }, 500)
    }
  }, [isOpen])

  const handleApprove = () => {
    if (!selectedToken) return
    setStep('approving')
    setTimeout(() => { setStep('success'); clearCart() }, 2500)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="bg-[#111] border border-[#333] w-full max-w-md rounded-2xl overflow-hidden shadow-2xl relative p-6">
        {step !== 'success' && (
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
            <X size={20} />
          </button>
        )}

        {step === 'select_token' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Select Token</h2>
            <div className="space-y-4 mb-8">
              {(['USDC', 'ETH'] as const).map(token => (
                <button key={token} onClick={() => setSelectedToken(token)}
                  className={`w-full p-4 rounded-xl border flex items-center justify-between transition-colors ${selectedToken === token ? 'border-[#00ff88] bg-[#00ff88]/10' : 'border-[#333] hover:border-[#555]'}`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${token === 'USDC' ? 'bg-blue-500' : 'bg-indigo-500'}`}>
                      {token === 'USDC' ? '$' : 'Ξ'}
                    </div>
                    <span className="font-bold">{token === 'USDC' ? 'USDC' : 'Ethereum'}</span>
                  </div>
                  {selectedToken === token && <Check size={18} className="text-[#00ff88]" />}
                </button>
              ))}
            </div>
            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-400">Total</span>
              <span className="text-white text-xl font-mono">${total.toFixed(2)}</span>
            </div>
            <button onClick={handleApprove} disabled={!selectedToken}
              className="w-full py-4 rounded-xl bg-[#3396FF] text-white font-bold disabled:opacity-50 hover:bg-blue-500 transition-colors">
              Approve Payment
            </button>
          </div>
        )}

        {step === 'approving' && (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 size={48} className="text-[#3396FF] animate-spin mb-6" />
            <h2 className="text-xl font-bold mb-2">Processing Payment</h2>
            <p className="text-gray-400 text-center text-sm">Please wait...</p>
          </div>
        )}

        {step === 'success' && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-24 h-24 rounded-full bg-[#00ff88]/20 flex items-center justify-center mb-6">
              <CheckCircle2 size={48} className="text-[#00ff88]" />
            </div>
            <h2 className="text-3xl font-bold mb-2 text-[#00ff88]">Payment Successful!</h2>
            <p className="text-gray-400 text-center mb-8">Your SoleVault order has been placed.</p>
            <button onClick={onClose} className="w-full py-3 rounded-lg border border-[#333] hover:border-[#00ff88] transition-colors font-bold">
              Return to Store
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
