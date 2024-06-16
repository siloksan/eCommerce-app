import { type Client, client } from 'api/client/client';
import { FormData } from 'components/RegistrationForm/RegistrationForm';
import { toast } from 'react-toastify';
import { CustomerDraft, SerializedAddress, UserAuthData } from 'types/customer-interfaces';
import UserStatus from 'types/types';
// import { type CartService, cartService } from './CartService';

interface SelectedAddress {
  shipping: boolean;
  billing: boolean;
}

interface Address {
  street: string;
  city: string;
  postalCode: string;
  country: string;
  defaultShippingAddress?: boolean;
  defaultBillingAddress?: boolean;
}

class CustomerService {
  client: Client = client;

  public userAuthorized: boolean = false;

  // private cartService: CartService = cartService;

  constructor() {
    if (UserStatus.registered === this.client.storageController.getUserStatus()) this.userAuthorized = true;
  }

  public async signIn(userAuthData: UserAuthData) {
    if (this.userAuthorized) {
      toast.error("You've already authorized!");
      return false;
    }
    this.client.setApiRoot(userAuthData);
    // if (cartService.cartId) {
    //   client.apiRoot.me().carts().
    // }
    const response = await client.apiRoot
      .me()
      .get()
      .execute()
      .then((res) => {
        if (res.statusCode === 200) {
          const firstName = JSON.stringify(res.body.firstName);
          toast(`Welcome to the Coffee Lovers ${firstName}`);
          client.storageController.setUserStatus(UserStatus.registered);
          this.userAuthorized = true;
          return true;
        }
        return false;
      })
      .catch((err) => {
        toast.error(err.message);
      });
    return response;
  }

  public async signUp(data: FormData, selectedAddress: SelectedAddress) {
    if (this.userAuthorized) {
      toast.error("You've already registered!");
      return false;
    }
    const { email, password } = data;
    const unregistered = await this.emailCheck(email);
    let response;
    if (unregistered) {
      const customerDraft = this.getCustomerDraft(data, selectedAddress);
      response = await this.client.apiRoot
        .me()
        .signup()
        .post({
          body: customerDraft,
        })
        .execute()
        .then((res) => {
          if (res.statusCode === 201) {
            toast.success('You have successfully registered!');
            this.signIn({ username: email, password });
            return true;
          }
          return false;
        })
        .catch((err) => {
          toast.error(err.message);
        });
    }
    return response;
  }

  public logOut() {
    if (this.userAuthorized) {
      this.client.storageController.removeUserStatus();
      this.client.tokenCache.clearToken();
      this.client.setApiRoot();
      toast.success('Goodbye!');
      this.userAuthorized = false;
    }
  }

  private async emailCheck(email: string): Promise<boolean | void> {
    const unregistered = await this.client.apiRoot
      .customers()
      .get({ queryArgs: { where: `email="${email}"` } })
      .execute()
      .then((res) => {
        if (res.body.count > 0) {
          toast.error('Such a user already exists!');
          return false;
        }
        return true;
      })
      .catch((err: Error) => {
        toast(err.message);
      });
    return unregistered;
  }

  private serializeAddress(address: Address) {
    return {
      streetName: address.street,
      city: address.city,
      postalCode: address.postalCode,
      country: address.country,
    };
  }

  private getCustomerDraft(data: FormData, selectedAddress: SelectedAddress) {
    const addresses: SerializedAddress[] = [];

    const customerDraft: CustomerDraft = {
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      dateOfBirth: data.dateOfBirth,
      addresses,
    };

    if (selectedAddress.shipping) {
      addresses.push(this.serializeAddress(data.addresses.shipping));
      if (data.addresses.shipping.defaultShippingAddress) {
        customerDraft.defaultShippingAddress = addresses.length - 1;
      }
    }

    if (selectedAddress.billing) {
      addresses.push(this.serializeAddress(data.addresses.billing));
      if (data.addresses.billing.defaultBillingAddress) {
        customerDraft.defaultBillingAddress = addresses.length - 1;
      }
    }

    return customerDraft;
  }

  async getUserData() {
    const response = await this.client.apiRoot
      .me()
      .get()
      .execute()
      .then((res) => {
        return res.body;
      })
      .catch((error) => {
        toast.error(error);
      });
    return response;
  }
}

const customerService = new CustomerService();

export { customerService };

export type { CustomerService };
