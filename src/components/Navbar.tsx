'use client'
import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'
import { ConnectButton } from './ConnectButton'
import { useCartStore } from '@/store/useCartStore'
import { useEffect, useState } from 'react'

export function Navbar() {
  const items = useCartStore((state) => state.items)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const cartCount = mounted ? items.reduce((sum, item) => sum + item.quantity, 0) : 0

  return (
    <nav className="fixed top-0 left-0 right-0 h-20 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-[#222] z-50">
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold tracking-tighter">
          SOLE<span className="text-[#00ff88]">VAULT</span>
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/checkout" className="relative text-white hover:text-[#00ff88] transition-colors">
            <ShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#00ff88] text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          <ConnectButton />
        </div>
      </div>
    </nav>
  )
}