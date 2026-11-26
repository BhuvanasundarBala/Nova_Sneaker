/**
 * useAssetUrl.js
 * Returns a function that resolves public-folder asset paths correctly
 * for both local dev (base = '/') and GitHub Pages (base = '/Nova_Sneaker/')
 */

const BASE = import.meta.env.BASE_URL || '/';

/**
 * Resolves a public-folder path like './brand/foo.jpg'
 * into the correct absolute URL for the current deployment.
 */
export function assetUrl(src) {
  if (!src) return src;
  if (src.startsWith('http') || src.startsWith('//')) return src; // already absolute
  const clean = src.replace(/^\.\//, ''); // strip leading './'
  return BASE.replace(/\/$/, '') + '/' + clean;
}

export default assetUrl;
