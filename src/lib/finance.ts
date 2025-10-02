export const formatNumber = (value: number, afterDot = 0): string => {
  const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: afterDot,
    maximumFractionDigits: afterDot,
  });

  return formatter.format(value);
};

export const formatCurrency = (value: number, prefix = "£") => {
  if (value >= 1000000) {
    return `${prefix}${(value / 1000000).toFixed(1)}M`;
  } else {
    return `${prefix}${value.toLocaleString()}`;
  }
};
