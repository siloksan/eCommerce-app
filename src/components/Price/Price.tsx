import currencyCodeToSymbol from 'utils/helpers/currencyCodeToSymbol';
import classes from './Price.module.scss';

interface PriceProps {
  currency: string;
  price: number;
  previousPrice?: number;
}

function Price({ currency, price, previousPrice }: PriceProps) {
  const currencySymbol = currencyCodeToSymbol(currency);

  return previousPrice ? (
    <div className={classes.card__price}>
      <span>
        {price}
        {currencySymbol}
      </span>
      <span className={classes.card__price_old}>
        {previousPrice}
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
