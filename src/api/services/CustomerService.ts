import Client, { client } from 'api/client/client';
import { FormData } from 'components/RegistrationForm/RegistrationForm';
import { toast } from 'react-toastify';
import { CustomerDraft, SerializedAddress, UserAuthData } from 'types/interfaces';
import UserStatus from 'types/types';

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

  public async signIn(userAuthData: UserAuthData) {
    const isAuthorized = this.client.storageController.getUserStatus();
    if (isAuthorized === UserStatus.registered) {
      toast.error("You've already authorized!");
      return;
    }
    this.client.apiRoot = this.client.getApiRoot(userAuthData);
    const response = await client.apiRoot
      .me()
      .get()
      .execute()
      .then((res) => {
        if (res.statusCode === 200) {
          const firstName = JSON.stringify(res.body.firstName);
          toast(`Welcome to the Coffee Lovers ${firstName}`);
          client.storageController.setUserStatus(UserStatus.registered);
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
    const isAuthorized = this.client.storageController.getUserStatus();
    if (isAuthorized === UserStatus.registered) {
      toast.error("You've already registered!");
      return;
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
}

const customerService = new CustomerService();

export { customerService };

export default CustomerService;
