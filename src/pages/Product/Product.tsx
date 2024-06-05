import { useEffect, useState } from 'react';
import ImageSlider from 'components/ImageSlider/ImageSlider';
import ProductDetails from 'components/ProductDetails/ProductDetails';
import useApiContext from 'context/context';
import Product from 'types/product-interfaces';

import styles from './Product.module.scss';

interface Props {
  productKey: string;
}

function ProductPage({ productKey }: Props) {
  const [product, setProduct] = useState<Product | null>(null);

  const { productService } = useApiContext();

  useEffect(() => {
    async function fetchProduct(key: string) {
      const result = await productService.getProduct(key);
      if (result) {
        setProduct(result);
      }
    }
    fetchProduct(productKey);
  }, [productKey, productService]);

  if (!product) {
    return <div className={styles.container}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <ImageSlider images={product.images} alt={product.title} />
      <ProductDetails name={product.title} price={product.prices[0]} description={product.description} />
    </div>
  );
}

export default ProductPage;
