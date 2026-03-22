'use client'
import { products } from '@/data/products'
import { ProductCard } from '@/components/ProductCard'

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-12">
        <h1 className="text-5xl font-bold mb-4 tracking-tight text-white">The Vault is Open.</h1>
        <p className="text-gray-400 text-lg max-w-2xl">
          Secure the most exclusive drops. Pay seamlessly with Web3 via WalletConnect Pay.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-24">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
