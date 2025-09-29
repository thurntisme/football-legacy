export const formatNumber = (value: number, afterDot = 0): string => {
  const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: afterDot,
    maximumFractionDigits: afterDot,
  });

  return formatter.format(value);
};
