export const formatCurrency = (amount) => {
  amount = parseFloat(amount);
  const formattedAmount = amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return `${formattedAmount} HNL`;
};
