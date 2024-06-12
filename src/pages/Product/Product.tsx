import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ImageSlider from 'components/ImageSlider/ImageSlider';
import ProductDetails from 'components/ProductDetails/ProductDetails';
import useApiContext from 'context/context';
import { Product } from 'types/product-interfaces';

import styles from './Product.module.scss';

function ProductPage() {
  const { productKey } = useParams();

  const [product, setProduct] = useState<Product | null>(null);

  const { productService } = useApiContext();

  useEffect(() => {
    async function fetchProduct(key: string) {
      const result = await productService.getProduct(key);
      if (result) {
        setProduct(result);
      }
    }
    fetchProduct(productKey ?? '');
  }, [productKey, productService]);

  if (!product) {
    return <div className={styles.container}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <ImageSlider images={product.images} alt={product.title} />
      <ProductDetails name={product.title} prices={product.prices} description={product.description} id={product.id} />
    </div>
  );
}

export default ProductPage;
