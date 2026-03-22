'use client'
import Image from 'next/image'
import { useState } from 'react'
import { useCartStore } from '@/store/useCartStore'
import { CheckCircle2 } from 'lucide-react'
import { PaymentModal } from './PaymentModal'

interface ProductProps {
  product: { id: string; title: string; price: number; image: string; }
}

const SIZES = [8, 9, 10, 11, 12]

export function ProductCard({ product }: ProductProps) {
  const [selectedSize, setSelectedSize] = useState<number | null>(null)
  const [showModal, setShowModal] = useState(false)
  const addItem = useCartStore((state) => state.addItem)

  const handlePay = () => {
    if (!selectedSize) return alert('Please select a size!')
    addItem({ ...product, size: selectedSize })
    setShowModal(true)
  }

  return (
    <div className="bg-[#111] border border-[#222] rounded-xl overflow-hidden group hover:border-[#333] transition-colors">
      {/* Product Image */}
      <div className="relative h-64 w-full overflow-hidden">
        <Image src={product.image} alt={product.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
      </div>

      <div className="p-6">
        {/* Title + Price */}
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-bold text-white">{product.title}</h3>
          <span className="text-[#00ff88] font-mono font-bold">{product.price} USDC</span>
        </div>

        {/* Size Selector */}
        <div className="mb-5">
          <div className="text-sm text-gray-400 mb-2">Select Size (US)</div>
          <div className="flex gap-2">
            {SIZES.map((size) => (
              <button key={size} onClick={() => setSelectedSize(size)}
                className={`w-10 h-10 rounded-md font-mono text-sm border transition-colors ${selectedSize === size ? 'border-[#00ff88] bg-[#00ff88]/10 text-[#00ff88]' : 'border-[#333] hover:border-[#666] text-white'}`}>
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* WalletConnect Checkout Card */}
        <div className="bg-white rounded-2xl p-4 text-black">
          {/* Added to Bag Header */}
          <div className="flex items-center gap-2 text-green-600 font-bold text-sm mb-3">
            <CheckCircle2 size={16} className="fill-green-100" />
            <span>Added to Bag</span>
          </div>

          {/* Product Row */}
          <div className="flex gap-3 mb-4">
            <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
              <Image src={product.image} alt={product.title} fill className="object-cover" />
            </div>
            <div className="flex-1 min-w-0 flex flex-col justify-center">
              <div className="font-bold text-sm text-gray-900 truncate">{product.title}</div>
              <div className="font-bold text-sm text-gray-900 mt-1">${product.price}.00</div>
            </div>
          </div>

          {/* View Bag Button */}
          <button className="w-full py-3 rounded-full border-2 border-gray-200 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors mb-2">
            View Bag
          </button>

          {/* WalletConnect Pay Button */}
          <button
            onClick={handlePay}
            className="w-full py-4 rounded-2xl bg-[#3396FF] text-white font-bold flex items-center justify-center gap-2 hover:bg-[#2580e8] transition-colors text-lg">
            <svg width="22" height="14" viewBox="0 0 40 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.19 4.936C14.674-1.547 25.326-1.547 31.81 4.936l.764.764a.789.789 0 010 1.115l-2.614 2.614a.415.415 0 01-.588 0l-1.052-1.052c-4.455-4.455-11.675-4.455-16.13 0L10.977 9.59a.415.415 0 01-.588 0L7.774 6.975a.789.789 0 010-1.115l.416-.924zm29.11 5.426l2.327 2.327a.789.789 0 010 1.115L28.147 24.776a.83.83 0 01-1.175 0l-7.647-7.647a.207.207 0 00-.294 0l-7.647 7.647a.83.83 0 01-1.175 0L.73 13.805a.789.789 0 010-1.115l2.327-2.327a.83.83 0 011.175 0l7.647 7.647c.081.081.213.081.294 0l7.647-7.647a.83.83 0 011.175 0l7.647 7.647c.081.081.213.081.294 0l7.647-7.647a.83.83 0 011.175 0l.346-.001z" fill="white"/></svg>
            Pay
          </button>
        </div>
      </div>

      <PaymentModal isOpen={showModal} onClose={() => setShowModal(false)} total={product.price} />
    </div>
  )
}
