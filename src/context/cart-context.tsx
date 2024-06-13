import { Cart } from '@commercetools/platform-sdk';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

interface ContextType {
  cart: Cart | null;
  setCartState: (newCart: Cart) => void;
  quantity: number;
}
interface Props {
  children: JSX.Element;
}
const CartContext = createContext<ContextType | null>(null);

export function CartProvider({ children }: Props) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    if (cart) {
      const count = cart.lineItems.reduce((acc, item) => acc + item.quantity, 0);
      setQuantity(count);
    }
  }, [cart]);

  function setCartState(newCart: Cart) {
    setCart(newCart);
    const count = newCart.lineItems.reduce((acc, item) => acc + item.quantity, 0);
    setQuantity(count);
  }

  const value = useMemo(() => ({ cart, setCartState, quantity }), [cart, quantity]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCartContext must be used within a CartProvider');
  }
  return context;
};
