import { create } from 'zustand';

export interface CartItem {
  id: string;
  title: string;
  price: number;
  image: string;
  size: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string, size: number) => void;
  clearCart: () => void;
  get total(): number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  addItem: (item) => set((state) => {
    const existing = state.items.find((i) => i.id === item.id && i.size === item.size);
    if (existing) {
      return {
        items: state.items.map((i) => 
          i.id === item.id && i.size === item.size ? { ...i, quantity: i.quantity + 1 } : i
        )
      };
    }
    return { items: [...state.items, { ...item, quantity: 1 }] };
  }),
  removeItem: (id, size) => set((state) => ({
    items: state.items.filter((i) => !(i.id === id && i.size === size))
  })),
  clearCart: () => set({ items: [] }),
  get total() {
    return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }
}));
