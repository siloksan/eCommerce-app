import productImgPlaceholder from 'assets/imgs/placeholder-card.webp';
import { ProductCardProps } from 'types/interfaces';
import Price from 'components/Price/Price';

import classes from './ProductCard.module.scss';

function ProductCard({ id, productName, currency, price, previousPrice, imgLink }: ProductCardProps) {
  const MAX_CHAR_NAME = 40; // max characters for name on the card

  // shortens the name of the product if necessary:
  let productCardName = productName;
  if (productCardName.length > MAX_CHAR_NAME) {
    productCardName = productCardName.slice(0, MAX_CHAR_NAME - 1).concat('...');
  }

  const img = imgLink ?? productImgPlaceholder;

  const priceInfo = { currency, price };

  if (previousPrice) Object.assign(priceInfo, { previousPrice });

  return (
    <a className={classes.card} href="main" data-id={id}>
      <div className={classes.card__imageContainer}>
        <img src={img} alt="Product" />
      </div>
      <h3 className={classes.card__title}>{productCardName}</h3>
      <Price {...priceInfo} />
    </a>
  );
}

export default ProductCard;
