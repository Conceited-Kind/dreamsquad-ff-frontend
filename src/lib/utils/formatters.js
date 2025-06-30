// src/lib/utils/formatters.js
export const formatCurrency = (value) => {
  if (value == null || isNaN(value)) return "$0M";
  const formattedValue = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value);
  return `${formattedValue.replace('$', '$').replace('.00', '')}M`; 
};

export const formatDate = (date) => {
  if (!date) return "Invalid Date";
  try {
    return new Intl.DateTimeFormat('en-US').format(new Date(date));
  } catch (error) {
    return "Invalid Date";
  }
};