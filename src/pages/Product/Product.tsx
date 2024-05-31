import ImageSlider from 'components/ImageSlider/ImageSlider';
import ProductDetails from 'components/ProductDetails/ProductDetails';

import styles from './Product.module.scss';

function ProductPage() {
  return (
    <div className={styles.container}>
      <ImageSlider />
      <ProductDetails />
    </div>
  );
}

export default ProductPage;
