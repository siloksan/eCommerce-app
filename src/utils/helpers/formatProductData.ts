import { Price, Product as ProductResponse, Image } from '@commercetools/platform-sdk';
import Product from 'types/product-interfaces';

class FormatProductData {
  public serializeProductData(product: ProductResponse) {
    const { name, description, masterVariant, variants } = product.masterData.current;
    const { images } = masterVariant;
    const title = name['en-GB'];
    const prices: string[] = [];
    const result: Product = {
      prices,
    };
    result.prices = prices;
    if (title) {
      result.title = title;
    }
    if (images) {
      result.images = this.getImagesUrl(images);
    }
    if (description) {
      result.description = description['en-GB'];
    }
    if (masterVariant.prices) {
      prices.push(this.serializePrices(masterVariant.prices[0]));
    }
    variants.forEach((variant) => {
      if (variant.price) {
        prices.push(this.serializePrices(variant.price));
      }
    });
    return result;
  }

  private serializePrices(price: Price): string {
    return (price.value.centAmount / 100).toFixed(2);
  }

  private getImagesUrl(images: Image[]): string[] {
    return images.map((image) => image.url);
  }
}

export default FormatProductData;
