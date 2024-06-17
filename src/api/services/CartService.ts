import { MyCartUpdate, MyCartUpdateAction } from '@commercetools/platform-sdk';
import { type Client, client } from 'api/client/client';
import { toast } from 'react-toastify';
import { Cart } from 'types/types';

class CartService {
  client: Client = client;

  cartId: null | string = null;

  cartVersion: null | string = null;

  constructor() {
    this.cartId = this.getCartData(Cart.cartId);
    this.cartId = this.getCartData(Cart.cartVersion);
  }

  private getCartData(key: string): null | string {
    return this.client.storageController.getItem(key);
  }

  public async getCart() {
    if (!this.cartId) {
      return this.createCart();
    }
    const cart = await this.client.apiRoot
      .me()
      .activeCart()
      .get()
      .execute()
      .then((res) => {
        const { id, version } = res.body;
        this.setCartData(id, Cart.cartId);
        this.setCartData(version.toString(), Cart.cartVersion);
        return res.body;
      })
      .catch((err) => {
        toast.error(err);
      });
    return cart;
  }

  public async createCart() {
    const cart = await this.client.apiRoot
      .me()
      .carts()
      .post({ body: { currency: 'EUR' } })
      .execute()
      .then((res) => {
        const { id, version } = res.body;
        this.setCartData(id, Cart.cartId);
        this.setCartData(version.toString(), Cart.cartVersion);
        return res.body;
      })
      .catch((err) => toast.error(err));
    if (typeof cart !== 'string' && typeof cart !== 'number') return cart;
    return false;
  }

  public async checkIfCartExist() {
    const isExist = await this.client.apiRoot
      .me()
      .activeCart()
      .get()
      .execute()
      .then((res) => {
        return res.statusCode === 200;
      })
      .catch((err) => {
        toast.error(err);
        return false;
      });
    return isExist;
  }

  public setCartData(data: string, key: Cart) {
    this[key] = data;
    this.client.storageController.setItem(key, data);
  }

  public clearCartData() {
    this.cartId = null;
    this.cartVersion = null;
    this.client.storageController.removeItem(Cart.cartId);
    this.client.storageController.removeItem(Cart.cartVersion);
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

    const result = await this.client.apiRoot
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

    const actionRemoveLine: MyCartUpdateAction = {
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
      myCartUpdate.actions.push(actionRemoveLine);
    }

    const result = await this.client.apiRoot
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

  public async removeAllGoods() {
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

    const myCartUpdate: MyCartUpdate = {
      version: Number(this.cartVersion),
      actions: [],
    };

    const lineItemsId = lineItems.map((item) => item.id);
    lineItemsId.forEach((id) => {
      const actionRemoveLine: MyCartUpdateAction = {
        action: 'removeLineItem',
        lineItemId: id,
      };
      myCartUpdate.actions.push(actionRemoveLine);
    });

    const result = await this.client.apiRoot
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

  public async addDiscountCode(discountCode: string) {
    if (!this.cartId || !this.cartVersion) {
      toast.error("I'm sorry, but the cart ID or cart version does not exist.");
      return false;
    }

    const myCartUpdate: MyCartUpdate = {
      version: Number(this.cartVersion),
      actions: [
        {
          action: 'addDiscountCode',
          code: discountCode,
        },
      ],
    };
    const result = await this.client.apiRoot
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
