import Client, { client } from 'api/client/client';

class ProductService {
  client: Client = client;
}

const productService = new ProductService();

export { productService };

export default ProductService;
