'use client'
import { useState } from 'react'
import { useCartStore } from '@/store/useCartStore'
import Image from 'next/image'
import { Trash2, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { PaymentModal } from '@/components/PaymentModal'

export default function CheckoutPage() {
  const { items, removeItem, total } = useCartStore()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handlePayClick = () => {
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-24 text-center">
        <h1 className="text-3xl font-bold mb-4 text-white">Your Vault is Empty.</h1>
        <Link href="/" className="inline-flex items-center gap-2 text-[#00ff88] hover:underline font-grotesk">
          <ArrowLeft size={16} /> Return to Shop
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 font-grotesk">
      <h1 className="text-4xl font-bold mb-8 text-white">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          {items.map((item) => (
            <div key={`${item.id}-${item.size}`} className="flex gap-6 p-4 bg-[#111] rounded-xl border border-[#222]">
              <div className="relative w-32 h-32 rounded-lg overflow-hidden">
                <Image src={item.image} alt={item.title} fill className="object-cover" />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white">{item.title}</h3>
                  <div className="text-gray-400 mt-1 font-mono text-sm">Size: {item.size}</div>
                  <div className="text-gray-400 font-mono text-sm">Qty: {item.quantity}</div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-[#00ff88] font-mono font-bold">{(item.price * item.quantity).toFixed(2)} USDC</div>
                  <button onClick={() => removeItem(item.id, item.size)} className="text-red-500 hover:text-red-400 p-2">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div>
          <div className="bg-[#111] p-6 rounded-xl border border-[#222] sticky top-24">
            <h2 className="text-2xl font-bold mb-6 text-white">Order Summary</h2>
            <div className="space-y-4 mb-6 text-sm font-mono text-gray-400">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-white">{(total).toFixed(2)} USDC</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-white">Free</span>
              </div>
              <div className="border-t border-[#333] pt-4 flex justify-between font-bold text-lg">
                <span className="text-white">Total</span>
                <span className="text-[#00ff88]">{(total).toFixed(2)} USDC</span>
              </div>
            </div>
            <button 
              onClick={handlePayClick}
              className="w-full py-4 rounded-xl bg-[#3396FF] text-white font-bold hover:bg-[#2580e8] transition-colors flex items-center justify-center gap-2"
            >
              <svg width="24" height="24" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.284 14.5492C16.5413 10.4578 23.4587 10.4578 27.716 14.5492L28.3243 15.1338C28.8475 15.6366 29.696 15.6366 30.2192 15.1338L32.8808 12.5758C33.404 12.073 33.404 11.2577 32.8808 10.7549C25.7661 3.91741 14.2339 3.91741 7.1192 10.7549C6.59596 11.2577 6.59596 12.073 7.1192 12.5758L9.78082 15.1338C10.304 15.6366 11.1525 15.6366 11.6757 15.1338L12.284 14.5492Z" fill="white"/>
                <path d="M5.21918 19.3496C5.74241 18.8468 6.59092 18.8468 7.11415 19.3496L12.284 24.3181C12.8072 24.8209 12.8072 25.6362 12.284 26.139L9.62241 28.697C9.09918 29.1998 8.25067 29.1998 7.72744 28.697L2.5576 23.7285C2.03437 23.2257 2.03437 22.4104 2.5576 21.9076L5.21918 19.3496Z" fill="white"/>
                <path d="M34.7808 19.3496C34.2576 18.8468 33.4091 18.8468 32.8859 19.3496L27.716 24.3181C27.1928 24.8209 27.1928 25.6362 27.716 26.139L30.3776 28.697C30.9008 29.1998 31.7493 29.1998 32.2726 28.697L37.4424 23.7285C37.9656 23.2257 37.9656 22.4104 37.4424 21.9076L34.7808 19.3496Z" fill="white"/>
                <path d="M15.4208 27.2789C15.944 26.7761 16.7925 26.7761 17.3158 27.2789L20 29.8587L22.6842 27.2789C23.2075 26.7761 24.056 26.7761 24.5792 27.2789L27.2408 29.8369C27.764 30.3397 27.764 31.155 27.2408 31.6578L20.9475 37.706C20.4243 38.2088 19.5758 38.2088 19.0525 37.706L12.7592 31.6578C12.236 31.155 12.236 30.3397 12.7592 29.8369L15.4208 27.2789Z" fill="white"/>
              </svg>
              Pay
            </button>
          </div>
        </div>
      </div>
      
      <PaymentModal 
        isOpen={isModalOpen} 
        onClose={handleModalClose} 
        total={total} 
      />
    </div>
  )
}