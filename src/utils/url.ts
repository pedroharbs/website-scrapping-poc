/**
 * Check if the given string is a valid URL
 * @param url url to be checked
 * @returns 
 */
export function isValidURL(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
}