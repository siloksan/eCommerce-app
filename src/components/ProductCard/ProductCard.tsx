import { Link } from 'react-router-dom';
import productImgPlaceholder from 'assets/imgs/placeholder-card.webp';
import Price from 'components/Price/Price';
import textTailoring from 'utils/helpers/textTailoring';

import Button from 'shared/Button/Button';
import { useCartContext } from 'context/cart-context';
import { useEffect, useState } from 'react';
import useApiContext from 'context/context';
import classes from './ProductCard.module.scss';

interface ProductCardProps {
  productKey: string;
  productName: string;
  productId: string;
  currency: string;
  price: number;
  discountedPrice?: number;
  imgLink?: string;
  description?: string;
}

function ProductCard({
  productKey,
  productName,
  currency,
  price,
  discountedPrice,
  imgLink,
  description,
  productId,
}: ProductCardProps) {
  const MAX_CHAR_NAME = 40; // max characters for name on the card
  const MAX_CHAR_DESCRIPTION = 100; // max characters for description

  const { setCartState, cart } = useCartContext();
  const { cartService } = useApiContext();

  const img = imgLink ?? productImgPlaceholder;

  const priceInfo = { currency, price };

  if (discountedPrice) Object.assign(priceInfo, { discountedPrice });

  const cardDescription = description ? textTailoring(description, MAX_CHAR_DESCRIPTION) : '';

  const [inCart, setInCart] = useState(false);

  async function updateCart(id: string, action: 'remove' | 'add') {
    let res: string | number | boolean;
    if (action === 'add') {
      res = await cartService.addToCart(id);
    } else {
      res = await cartService.removeFromCart(id);
    }
    if (res) {
      const newCart = await cartService.getCart();
      if (newCart) {
        setCartState(newCart);
        setInCart(action === 'add');
      }
    }
  }

  async function addToShoppingCart() {
    if (!cart) {
      await cartService.createCart();
    }
    await updateCart(productId, 'add');
  }

  async function removeFromShoppingCart() {
    if (!cart) {
      await cartService.createCart();
    }
    await updateCart(productId, 'remove');
  }

  useEffect(() => {
    if (cart) {
      cart.lineItems.forEach((product) => {
        if (product.productId === productId) setInCart(true);
      });
    }
  }, [cart, productId]);

  return (
    <div className={classes.card}>
      <Link to={`../product/${productKey}`}>
        <div className={classes.card__imageContainer}>
          <img src={img} alt="Product" />
        </div>
        <h3 className={classes.card__title}>{textTailoring(productName, MAX_CHAR_NAME)}</h3>
        <p>{cardDescription}</p>
        <Price {...priceInfo} />
      </Link>
      {inCart ? (
        <Button label="Remove from cart" handleClick={() => removeFromShoppingCart()} />
      ) : (
        <Button label="Add to cart" handleClick={() => addToShoppingCart()} />
      )}
    </div>
  );
}

export default ProductCard;
