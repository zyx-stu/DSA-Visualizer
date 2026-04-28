/**
 * Truncate a string to a max length
 * @param {string} str
 * @param {number} max
 */
export const truncate = (str, max = 120) => {
  if (!str) return '';
  return str.length > max ? str.slice(0, max) + '…' : str;
};

/**
 * Format a number (1000 → 1K, 1000000 → 1M)
 * @param {number} num
 */
export const formatNumber = (num) => {
  if (!num) return '0';
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
  return num.toString();
};

/**
 * Capitalize first letter
 * @param {string} str
 */
export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Build a URL query string from a params object
 * @param {Record<string, any>} params
 */
export const buildQueryString = (params) => {
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') qs.set(k, String(v));
  });
  return qs.toString() ? `?${qs.toString()}` : '';
};

/**
 * Get difficulty label color class
 */
export const getDifficultyColor = (difficulty) => {
  const map = {
    easy:   'text-green-400',
    medium: 'text-yellow-400',
    hard:   'text-red-400',
  };
  return map[difficulty] || 'text-gray-400';
};
