export const formatUSD = (number) => {
  const money = number / 100;
  return money.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};
