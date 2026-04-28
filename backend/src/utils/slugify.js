/**
 * Utility: generate a URL-safe slug from a string
 * @param {string} text
 * @returns {string}
 */
const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')       // spaces → hyphens
    .replace(/[^\w-]+/g, '')    // remove non-word chars
    .replace(/--+/g, '-')       // collapse double hyphens
    .replace(/^-+/, '')         // leading hyphens
    .replace(/-+$/, '');        // trailing hyphens
};

module.exports = { slugify };
