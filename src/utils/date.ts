/**
 * Formats a date to a string in the format "dd-mm-yyyy hh:mm:ss:ms"
 * @param date Date to be formatted
 * @returns Formatted date string
 */
export function formatDate(date: Date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  const milliseconds = String(date.getMilliseconds()).padStart(3, '0');

  return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}:${milliseconds}`;
}

/**
 * Formats a duration in milliseconds to a string in the format "X minutes Y seconds Z milliseconds"
 * @param milliseconds Duration in milliseconds
 * @returns Formatted duration string
 */
export function formatDuration(milliseconds: number) {
  const seconds = Math.floor((milliseconds / 1000) % 60);
  const minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
  const millis = milliseconds % 1000;

  let durationStr = '';
  if (minutes > 0) {
    durationStr += `${minutes} minute${minutes !== 1 ? 's' : ''} `;
  }
  if (seconds > 0 || minutes > 0) {
    durationStr += `${seconds} second${seconds !== 1 ? 's' : ''} `;
  }
  durationStr += `${millis} millisecond${millis !== 1 ? 's' : ''}`;

  return durationStr.trim();
}