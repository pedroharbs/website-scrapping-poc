/**
 * Extracts the domain, path, query and url from a given url
 * @param url URL to extract the domain, path, query and url from
 * @returns Object containing the domain, path, query and url
 */
export function getPathToFileFromUrl(url: string) {
  const domainRegex = /^(https?:\/\/[^/]+)/;
  const domainMatch = url.match(domainRegex);
  const domain = domainMatch ? domainMatch[1] : '';
  const pathRegex = /^https?:\/\/[^/]+(\/[^?]+)/;
  const pathMatch = url.match(pathRegex);
  const path = pathMatch ? pathMatch[1] : '';
  const queryRegex = /\?(.*)$/;
  const queryMatch = url.match(queryRegex);
  const query = queryMatch ? queryMatch[1] : '';
  return { domain, path, query, url: () => `${domain}${path}${!query ? '' : `?${query}`}` };
}