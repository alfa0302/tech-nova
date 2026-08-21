export const centsToAED = (cents) => {
  return `AED ${(cents / 100).toFixed(2)}`;
};
