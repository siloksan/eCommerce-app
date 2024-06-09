import { Product as ProductResponse, Image, Price, DiscountedPrice } from '@commercetools/platform-sdk';
import { Product, ProductPrice } from 'types/product-interfaces';

class FormatProductData {
  public serializeProductData(product: ProductResponse) {
    const { name, description, masterVariant, variants } = product.masterData.current;
    const { images } = masterVariant;
    const title = name['en-GB'];
    const prices: ProductPrice[] = [];
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
      this.addPrice(masterVariant.prices[0], prices);
      if (masterVariant.prices[0].discounted) {
        this.addPrice(masterVariant.prices[0].discounted, prices);
      }
    }
    variants.forEach((variant) => {
      if (variant.price) {
        this.addPrice(variant.price, prices);
      }
    });
    return result;
  }

  private serializePrices(price: number): string {
    return (price / 100).toFixed(2);
  }

  private addPrice(price: Price | DiscountedPrice, prices: ProductPrice[]) {
    const centAmount = this.serializePrices(price.value.centAmount);
    const { currencyCode } = price.value;
    prices.push({ price: centAmount, currencyCode });
  }

  private getImagesUrl(images: Image[]): string[] {
    return images.map((image) => image.url);
  }
}

export default FormatProductData;
