# SoleVault E-Commerce Demo

## Purpose and Capabilities
SoleVault is a professional, dark-themed e-commerce prototype designed to showcase a seamless Web3 payment flow using WalletConnect Pay (via `@reown/appkit`). It features a modern neon green (`#00ff88`) accent color and utilizes Space Grotesk and Space Mono fonts for a sleek, futuristic aesthetic.

## Current State and Features
- **Project Structure:** Next.js App Router.
- **Styling:** Tailwind CSS v4, completely dark themed.
- **State Management:** Zustand for global cart state.
- **Web3 Integration:** Configured with Reown AppKit, Wagmi, and Viem for wallet connections and transactions.

## Development Plan
1. **Dependencies:** Install `@reown/appkit`, `wagmi`, `viem`, `@tanstack/react-query`, `lucide-react`, `framer-motion`, `zustand`, etc.
2. **Theming:** Update `globals.css` with custom neon green Tailwind variables and apply Next.js optimized fonts (`next/font/google`).
3. **State:** Build a lightweight cart store to manage adding/removing sneaker items and sizes.
4. **AppKit Context:** Wrap the application in a Wagmi/React Query/AppKit provider.
5. **UI Components:**
   - **Navbar:** Sticky header with branding, wallet connect button, and cart badge.
   - **Product Grid:** Responsive grid displaying 6 premium sneaker images from Unsplash.
   - **Checkout/Pay Modal:** Custom UI flow strictly following: Connect Wallet -> Select USDC/ETH -> Approve Transaction -> Success Animation (via Framer Motion).
6. **Validation:** Ensure clean Next.js build and strict linting.
