/**
 * Fetch data from a URL
 * @param url requested URL
 * @param returnAs return type
 * @returns Data fetched from the URL
 */
export async function fetchData(url: string, returnAs: 'text' | 'arrayBuffer' = 'text') {  
  const response = await fetch(url);

  if (returnAs === 'arrayBuffer') {
    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer);
  }

  return response.text()
}