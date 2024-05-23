import client, { Client } from 'api/client/client';
import { FormData } from 'components/RegistrationForm/RegistrationForm';
import { toast } from 'react-toastify';
import { CustomerDraft, SerializedAddress } from 'types/interfaces';

interface SelectedAddress {
  shipping: boolean;
  billing: boolean;
}

interface Address {
  street: string;
  city: string;
  postalCode: string;
  country: string;
  defaultShippingAddress?: string;
  defaultBillingAddress?: string;
}

class CustomerService {
  client: Client = client;

  public async signIn(data: FormData, selectedAddress: SelectedAddress) {
    const { email } = data;
    const unregistered = await this.emailCheck(email);
    if (unregistered) {
      const customerDraft = this.getCustomerDraft(data, selectedAddress);
      client.apiRoot
        .me()
        .signup()
        .post({
          body: customerDraft,
        })
        .execute()
        .then(() => {
          toast.success('You are registered!');
        })
        .catch((err) => {
          toast.error(err.message);
        });
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

export default CustomerService;
