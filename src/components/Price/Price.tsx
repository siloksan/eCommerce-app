import currencyCodeToSymbol from 'utils/helpers/currencyCodeToSymbol';
import classes from './Price.module.scss';

interface PriceProps {
  currency: string;
  price: number;
  discountedPrice?: number;
}

function Price({ currency, price, discountedPrice }: PriceProps) {
  const currencySymbol = currencyCodeToSymbol(currency);

  return discountedPrice ? (
    <div className={classes.card__price}>
      <span>
        {price}
        {currencySymbol}
      </span>
      <span className={classes.card__price_old}>
        {discountedPrice}
        {currencySymbol}
      </span>
    </div>
  ) : (
    <div className={classes.card__price}>
      <span>
        {price}
        {currencySymbol}
      </span>
    </div>
  );
}

export default Price;
