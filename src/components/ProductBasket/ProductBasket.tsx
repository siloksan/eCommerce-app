import { LineItem } from '@commercetools/platform-sdk';
import SvgComponent from 'shared/SvgComponent/SvgComponent';

import placeholderImg from 'assets/imgs/placeholder-card.webp';
import trash from 'assets/icons/trash.svg';
import Button from 'shared/Button/Button';
import Price from 'components/Price/Price';

import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useCartContext } from 'context/cart-context';
import useApiContext from 'context/context';
import styles from './ProductBasket.module.scss';

interface Props {
  product: LineItem;
}

function ProductBasket({ product }: Props) {
  const { variant, name, quantity: productQuantity, price, productKey, productId } = product;
  const { discounted, value: basePrice } = price;
  const { currencyCode, centAmount } = basePrice;
  const baseCentAmountTotal = (centAmount * productQuantity) / 100;
  const discountedPrice = discounted && discounted.value.centAmount / 100;
  const discountedPriceTotal = discounted && (discounted.value.centAmount * productQuantity) / 100;
  const productName = name['en-GB'];
  const productPath = productKey || '#';
  const trashBtn = <SvgComponent svgPath={trash} alt="trash" style={{ maxHeight: '30px' }} />;
  let image = placeholderImg;
  if (variant.images && variant.images[0]) {
    image = variant.images[0].url;
  }

  const { setCart } = useCartContext();
  const { cartService } = useApiContext();

  const [quantity, setQuantity] = useState(productQuantity);
  const [prevQuantity, setPrevQuantity] = useState(productQuantity);

  function increaseQuantity() {
    setQuantity(quantity + 1);
  }

  function decreaseQuantity() {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }

  function update() {
    const deltaQuantity = quantity - prevQuantity;
    if (deltaQuantity > 0) {
      cartService.addToCart(productId, deltaQuantity).then(() =>
        cartService.getCart().then((newCart) => {
          if (newCart) setCart(newCart);
        })
      );
    } else {
      cartService.removeFromCart(productId, deltaQuantity * -1).then(() =>
        cartService.getCart().then((newCart) => {
          if (newCart) setCart(newCart);
        })
      );
    }
    setPrevQuantity(quantity);
  }

  return (
    <li className={styles.container}>
      <Link to={`../product/${productPath}`} className={styles.image}>
        <img src={image} alt={productName} />
      </Link>
      <div className={styles.info}>
        <h3 className={styles.label}>{productName}</h3>
        <Price currency={currencyCode} price={centAmount / 100} discountedPrice={discountedPrice} />
      </div>
      <div className={styles.totalPrice}>
        <Price currency={currencyCode} price={baseCentAmountTotal} discountedPrice={discountedPriceTotal} />
      </div>
      <div className={styles.controller}>
        <div className={styles.quantity_container}>
          <div>
            <Button
              label="-"
              accent={false}
              additionalClass={`${styles.quantity_sign} ${quantity < 2 && styles.disable}`}
              handleClick={() => decreaseQuantity()}
            />
          </div>
          <div className={styles.quantity}>{quantity}</div>
          <div>
            <Button
              label="+"
              accent={false}
              additionalClass={styles.quantity_sign}
              handleClick={() => increaseQuantity()}
            />
          </div>
        </div>
        <Button
          label="update"
          additionalClass={`${styles.update}  ${quantity === prevQuantity && styles.disable}`}
          handleClick={() => update()}
        />
        <div>
          <Button label={trashBtn} />
        </div>
      </div>
    </li>
  );
}

export default ProductBasket;
