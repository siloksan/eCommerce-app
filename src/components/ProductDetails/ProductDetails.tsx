import Button from 'shared/Button/Button';
import Price from 'components/Price/Price';
import { ProductPrice } from 'types/product-interfaces';
import styles from './ProductDetails.module.scss';

interface Props {
  name?: string;
  prices: ProductPrice[];
  description?: string;
}

function ProductDetails({ name = '', prices, description = '' }: Props) {
  const { price, currencyCode } = prices[0];
  let discountedPrice: string | undefined;
  if (prices[1]) {
    discountedPrice = prices[1].price;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{name}</h1>
      <div className={styles.price}>
        <Price currency={currencyCode} price={Number(price)} discountedPrice={Number(discountedPrice)} />
        {/* Price: <span>{price}&euro;</span> */}
      </div>
      <div>
        <h2>Description:</h2>
        <p className={styles.description}>{description}</p>
      </div>
      <Button label="Add to cart" />
    </div>
  );
}

export default ProductDetails;
