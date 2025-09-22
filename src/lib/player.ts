export const getFormColor = (form: string) => {
  switch (form) {
    case 'excellent':
      return 'bg-green-500';
    case 'good':
      return 'bg-emerald-400';
    case 'average':
      return 'bg-amber-400';
    case 'poor':
      return 'bg-red-400';
    default:
      return 'bg-gray-400';
  }
};
