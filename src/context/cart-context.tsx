import { Cart } from '@commercetools/platform-sdk';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import useApiContext from './context';

interface ContextType {
  cart: Cart | null;
  setCart: React.Dispatch<React.SetStateAction<Cart | null>>;
  quantity: number;
}
interface Props {
  children: JSX.Element;
}
const CartContext = createContext<ContextType | null>(null);

export function CartProvider({ children }: Props) {
  const { cartService } = useApiContext();

  const [cart, setCart] = useState<Cart | null>(null);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    if (cart) {
      const count = cart.lineItems.reduce((acc, item) => acc + item.quantity, 0);
      setQuantity(count);
    }
  }, [cart]);

  useEffect(() => {
    cartService.getCart().then((res) => {
      if (res) setCart(res);
    });
  }, [cartService]);

  const value = useMemo(() => ({ cart, setCart, quantity }), [cart, quantity]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCartContext must be used within a CartProvider');
  }
  return context;
};
