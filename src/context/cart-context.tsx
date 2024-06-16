import { Cart } from '@commercetools/platform-sdk';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import useApiContext from './context';

interface ContextType {
  cart: Cart | null;
  setCartState: (newCart: Cart | null) => void;
  quantity: number;
}
interface Props {
  children: JSX.Element;
}
const CartContext = createContext<ContextType | null>(null);

export function CartProvider({ children }: Props) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [quantity, setQuantity] = useState(0);
  const { cartService } = useApiContext();

  function setCartState(newCart: Cart | null) {
    if (!newCart) {
      setCart(null);
      setQuantity(0);
      return;
    }
    setCart(newCart);
    const count = newCart.lineItems.reduce((acc, item) => acc + item.quantity, 0);
    setQuantity(count);
  }

  useEffect(() => {
    if (cartService.cartId) {
      cartService.getCart().then((newCart) => {
        if (newCart) setCartState(newCart);
      });
    }
  }, [cartService]);

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
