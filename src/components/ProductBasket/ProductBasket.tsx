import { LineItem } from '@commercetools/platform-sdk';
import SvgComponent from 'shared/SvgComponent/SvgComponent';

import placeholderImg from 'assets/imgs/placeholder-card.webp';
import trash from 'assets/icons/trash.svg';
import Button from 'shared/Button/Button';
import Price from 'components/Price/Price';

import { Link } from 'react-router-dom';
import styles from './ProductBasket.module.scss';

interface Props {
  product: LineItem;
}

function ProductBasket({ product }: Props) {
  const { variant, name, quantity, price, productKey } = product;
  const { discounted, value: basePrice } = price;
  const { currencyCode, centAmount } = basePrice;
  const baseCentAmount = centAmount * quantity;
  const discountedPrice = discounted && discounted.value.centAmount * quantity;
  const productName = name['en-GB'];
  const productPath = productKey || '#';
  const trashBtn = <SvgComponent svgPath={trash} alt="trash" style={{ maxHeight: '30px' }} />;
  let image = placeholderImg;
  if (variant.images && variant.images[0]) {
    image = variant.images[0].url;
  }

  return (
    <li className={styles.container}>
      <Link to={`../product/${productPath}`} className={styles.image}>
        <img src={image} alt={productName} />
      </Link>
      <div className={styles.info}>
        <h3 className={styles.label}>{productName}</h3>
        <Price
          currency={currencyCode}
          price={baseCentAmount / 100}
          discountedPrice={discountedPrice && discountedPrice / 100}
        />
        <div>
          <Button label={trashBtn} />
        </div>
      </div>
      <div className={styles.quantity_container}>
        <div>
          <Button label="-" accent={false} additionalClass={styles.quantity_sign} />
        </div>
        <div className={styles.quantity}>{quantity}</div>
        <div>
          <Button label="+" accent={false} additionalClass={styles.quantity_sign} />
        </div>
      </div>
    </li>
  );
}

export default ProductBasket;
