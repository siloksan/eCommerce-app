import productImgPlaceholder from 'assets/imgs/placeholder-card.webp';
import Price from 'components/Price/Price';
import textTailoring from 'utils/helpers/textTailoring';

import classes from './ProductCard.module.scss';

interface ProductCardProps {
  key: string;
  productName: string;
  currency: string;
  price: number;
  discountedPrice?: number;
  imgLink?: string;
  description?: string;
}

function ProductCard({ productName, currency, price, discountedPrice, imgLink, description }: ProductCardProps) {
  const MAX_CHAR_NAME = 40; // max characters for name on the card
  const MAX_CHAR_DESCRIPTION = 100; // max characters for description

  const img = imgLink ?? productImgPlaceholder;

  const priceInfo = { currency, price };

  if (discountedPrice) Object.assign(priceInfo, { discountedPrice });

  const cardDescription = description ? textTailoring(description, MAX_CHAR_DESCRIPTION) : '';

  return (
    <a className={classes.card} href="main">
      <div className={classes.card__imageContainer}>
        <img src={img} alt="Product" />
      </div>
      <h3 className={classes.card__title}>{textTailoring(productName, MAX_CHAR_NAME)}</h3>
      <p>{cardDescription}</p>
      <Price {...priceInfo} />
    </a>
  );
}

export default ProductCard;
