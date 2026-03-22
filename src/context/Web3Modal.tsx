'use client'

import { createAppKit } from '@reown/appkit/react'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { mainnet } from '@reown/appkit/networks'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import React, { type ReactNode } from 'react'

const queryClient = new QueryClient()
const projectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID || ''

const wagmiAdapter = new WagmiAdapter({
  ssr: true,
  networks: [mainnet],
  projectId
})

createAppKit({
  adapters: [wagmiAdapter],
  networks: [mainnet],
  projectId,
  metadata: {
    name: 'SoleVault',
    description: 'Crypto Sneaker Store',
    url: 'https://solevault.demo',
    icons: ['https://avatars.githubusercontent.com/u/37784886']
  },
  themeVariables: {
    '--w3m-accent': '#3396FF',
  },
  features: {
    analytics: false,
    networkView: false,
  }
})

export function Web3ModalProvider({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  )
}
