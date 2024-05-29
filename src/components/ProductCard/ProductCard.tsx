import productImgPlaceholder from 'assets/imgs/placeholder-card.webp';
import classes from './ProductCard.module.scss';

function ProductCard() {
  const MAX_CHAR_NAME = 40;

  let neme = 'Product';

  if (neme.length > MAX_CHAR_NAME) {
    neme = neme.slice(0, MAX_CHAR_NAME - 1).concat('...');
  }
  return (
    <a className={classes.card} href="main">
      <div className={classes.card__imageContainer}>
        <img src={productImgPlaceholder} alt="Product" />
      </div>
      <h3 className={classes.card__title}>{neme}</h3>
      <div className={classes.card__price}>
        <span>1000$</span>
        <span className={classes.card__price_old}>1100$</span>
      </div>
    </a>
  );
}

export default ProductCard;
