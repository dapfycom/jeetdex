import BigNumber from 'bignumber.js';

export function timeAgo(date: Date): string {
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) {
    return interval === 1 ? '1 year ago' : `${interval} years `;
  }

  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) {
    return interval === 1 ? '1 month ' : `${interval} months `;
  }

  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
    return interval === 1 ? '1 day ' : `${interval} days `;
  }

  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    return interval === 1 ? '1 hour ' : `${interval} hours `;
  }

  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    return interval === 1 ? '1 minute ' : `${interval} minutes `;
  }

  return seconds === 1 ? '1 second ' : `${seconds} seconds `;
}

export const timeStampToSeconds = (timestamp: number): number => {
  return Number(new BigNumber(timestamp).dividedBy(1000).toFixed(0));
};
