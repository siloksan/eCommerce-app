const addressFields = [
  {
    name: 'street',
    type: 'text',
    label: 'Street',
    validateOptions: {
      required: 'Street is required',
      minLength: {
        value: 1,
        message: 'The street must at least 1 characters long!',
      },
    },
  },
  {
    name: 'city',
    type: 'text',
    label: 'City',
    validateOptions: {
      required: 'City is required',
      minLength: {
        value: 1,
        message: 'The street must at least 1 characters long!',
      },
      pattern: {
        value: /^[a-zA-Z]{1,30}$/,
        message: 'The city name must contain at least one letter and no special characters or numbers.',
      },
    },
  },
  {
    name: 'postalCode',
    type: 'text',
    label: 'Postal code',
    validateOptions: {
      required: 'Postal code is required!',
      pattern: {
        value: /^(?:[0-8]\d|9[0-8])\d{3}$/,
        message: 'Incorrect postal code!',
      },
    },
  },
  {
    name: 'country',
    type: 'select',
    label: 'Country',
    options: [
      { children: 'France', value: 'FR' },
      { children: 'Germany', value: 'DE' },
    ],
    validateOptions: {
      required: 'Select a country!',
    },
  },
];

export default addressFields;
