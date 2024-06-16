const currencyReference = {
  USD: '$',
  EUR: '€',
};

function currencyCodeToSymbol(code: string): string {
  const keyTyped = code as keyof typeof currencyReference;
  return currencyReference[keyTyped] ?? code;
}

export default currencyCodeToSymbol;
