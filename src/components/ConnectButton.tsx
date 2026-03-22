'use client'
import { useAppKit, useAppKitAccount } from '@reown/appkit/react'
import { Wallet } from 'lucide-react'
import { useEffect, useState } from 'react'

export function ConnectButton() {
  const { open } = useAppKit()
  const { address, isConnected } = useAppKitAccount()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <div className="h-10 w-32 bg-[#222] animate-pulse rounded-md"></div>

  return (
    <button 
      onClick={() => open()}
      className="bg-[#00ff88] text-black px-4 py-2 rounded-md font-mono font-bold flex items-center gap-2 hover:bg-[#00cc6a] transition-colors"
    >
      <Wallet size={18} />
      {isConnected && address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Connect Wallet'}
    </button>
  )
}