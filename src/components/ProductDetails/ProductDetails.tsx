import Button from 'shared/Button/Button';
import styles from './ProductDetails.module.scss';

const product = {
  name: 'Some Coffee',
  price: 123,
  description:
    'House Blend is available in both whole beans and ground coffee options. House Blend coffee from The Coffee Bean & Tea Leaf is one of our most popular coffees. To create our light roast House Blend we combine natural and washed Central and South American coffees. We choose our blends for brightness, flavor, and aromas that make for a smooth, satisfying cup of coffee that can be enjoyed all day long. House Blend is available in both whole beans and ground coffee options.',
};

function ProductDetails() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{product.name}</h1>
      <div className={styles.price}>
        Price: <span>{product.price}&euro;</span>
      </div>
      <div>
        <h2>Description:</h2>
        <p className={styles.description}>{product.description}</p>
      </div>
      <Button label="Add to cart" />
    </div>
  );
}

export default ProductDetails;
