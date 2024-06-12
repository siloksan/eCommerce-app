import { MyCartUpdate, MyCartUpdateAction } from '@commercetools/platform-sdk';
import { type Client, client } from 'api/client/client';
import { toast } from 'react-toastify';

enum Cart {
  cartId = 'cartId',
  cartVersion = 'cartVersion',
}

class CartService {
  client: Client = client;

  cartId: null | string = null;

  cartVersion: null | string = null;

  constructor() {
    this.checkIfCartExist().then((res) => {
      if (!res) this.createCart();
    });
  }

  public async getCart() {
    const cart = await client.apiRoot
      .me()
      .carts()
      .get()
      .execute()
      .then((res) => {
        if (res.statusCode === 200 && res.body.count > 0) {
          const { id, version } = res.body.results[0];
          this.setCartData(id, Cart.cartId);
          this.setCartData(version.toString(), Cart.cartVersion);
          return res.body.results[0];
        }
        return this.createCart();
      })
      .catch((err) => {
        toast.error(err);
      });
    return cart;
  }

  public createCart() {
    client.apiRoot
      .me()
      .carts()
      .post({ body: { currency: 'EUR' } })
      .execute()
      .then((res) => {
        if (res.statusCode !== 200) {
          throw new Error("I'm sorry, but something went wrong and we were unable to create a cart for you.");
        }
        const { id, version } = res.body;
        this.setCartData(id, Cart.cartId);
        this.setCartData(version.toString(), Cart.cartVersion);
        return res.body;
      })
      .catch((err) => toast.error(err));
  }

  public async checkIfCartExist() {
    const isExist = await client.apiRoot
      .me()
      .carts()
      .get()
      .execute()
      .then((res) => {
        return res.body.count > 0;
      })
      .catch((err) => {
        toast.error(err);
        return false;
      });
    return isExist;
  }

  private setCartData(data: string, key: Cart) {
    this[key] = data;
    this.client.storageController.setItem(key, data);
  }

  public async addToCart(id: string, quantity: number = 1) {
    if (!this.cartId || !this.cartVersion) {
      toast.error("I'm sorry, but the cart ID or cart version does not exist.");
      return false;
    }
    const myCartUpdate: MyCartUpdate = {
      version: Number(this.cartVersion),
      actions: [
        {
          action: 'addLineItem',
          productId: id,
          variantId: 1,
          quantity,
        },
      ],
    };

    const result = await client.apiRoot
      .me()
      .carts()
      .withId({
        ID: this.cartId,
      })
      .post({ body: myCartUpdate })
      .execute()
      .then((res) => {
        if (res.statusCode === 200) {
          const { version } = res.body;
          this.setCartData(version.toString(), Cart.cartVersion);
          return true;
        }
        return false;
      })
      .catch((err) => toast.error(err));
    return result;
  }

  public async removeFromCart(id: string, quantity?: number) {
    if (!this.cartId || !this.cartVersion) {
      toast.error("I'm sorry, but the cart ID or cart version does not exist.");
      return false;
    }

    const lineItems = await this.getCart().then((cart) => {
      if (cart) {
        return cart.lineItems;
      }
      throw new Error("I'm sorry, but something went wrong and we were unable to get a shopping cart for you.");
    });

    const itemWithProduct = lineItems.filter((item) => item.productId === id);
    const myCartUpdate: MyCartUpdate = {
      version: Number(this.cartVersion),
      actions: [],
    };

    const actionRemoveAll: MyCartUpdateAction = {
      action: 'removeLineItem',
      lineItemId: itemWithProduct[0].id,
    };

    const action: MyCartUpdateAction = {
      action: 'removeLineItem',
      lineItemId: itemWithProduct[0].id,
      quantity,
    };

    if (quantity) {
      myCartUpdate.actions.push(action);
    } else {
      myCartUpdate.actions.push(actionRemoveAll);
    }

    const result = await client.apiRoot
      .me()
      .carts()
      .withId({
        ID: this.cartId,
      })
      .post({ body: myCartUpdate })
      .execute()
      .then((res) => {
        if (res.statusCode === 200) {
          const { version } = res.body;
          this.setCartData(version.toString(), Cart.cartVersion);
          return true;
        }
        return false;
      })
      .catch((err) => toast.error(err));
    return result;
  }
}

const cartService = new CartService();

export { cartService };

export type { CartService };
