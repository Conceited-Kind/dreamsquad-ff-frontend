export const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const isValidBudget = (budget, amount) => {
  return budget >= amount && amount > 0;
};