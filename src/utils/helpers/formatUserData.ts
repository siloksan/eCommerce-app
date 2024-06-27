import { Customer } from '@commercetools/platform-sdk';
import { UserData } from 'types/customer-interfaces';

function formatUserData(user: Customer) {
  const { firstName, lastName, dateOfBirth, defaultBillingAddressId, defaultShippingAddressId, addresses } = user;

  const result: UserData = {};

  if (firstName) {
    result.firstName = firstName;
  }

  if (lastName) {
    result.lastName = lastName;
  }
  if (dateOfBirth) {
    result.dateOfBirth = dateOfBirth;
  }
  if (defaultBillingAddressId) {
    result.defaultBillingAddressId = defaultBillingAddressId;
  }
  if (defaultShippingAddressId) {
    result.defaultShippingAddressId = defaultShippingAddressId;
  }
  if (addresses) {
    result.addresses = addresses;
  }
  return result;
}

export default formatUserData;
