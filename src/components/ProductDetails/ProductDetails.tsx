import Button from 'shared/Button/Button';
import styles from './ProductDetails.module.scss';

interface Props {
  name?: string;
  price?: string;
  description?: string;
}

function ProductDetails({ name = '', price = '', description = '' }: Props) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{name}</h1>
      <div className={styles.price}>
        Price: <span>{price}&euro;</span>
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
