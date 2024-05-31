import { type Client, client } from 'api/client/client';
import { toast } from 'react-toastify';
import FormatProductData from 'utils/helpers/formatProductData';

class ProductService {
  client: Client = client;

  private formatProductData: FormatProductData = new FormatProductData();

  public async getProduct(key: string) {
    const product = await client.apiRoot
      .products()
      .withKey({ key })
      .get()
      .execute()
      .then((res) => {
        if (res.statusCode === 200) {
          return this.formatProductData.serializeProductData(res.body);
        }
        throw new Error("Sorry, we don't offer this product at the moment");
      })
      .catch((err) => {
        toast.error(err);
      });
    return product;
  }
}

const productService = new ProductService();

export { productService };

export type { ProductService };
