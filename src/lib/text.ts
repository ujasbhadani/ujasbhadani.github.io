export const URL_SPLIT = /(https?:\/\/[^\s]+)/g;
export const IS_URL = /^https?:\/\//;

export function readMinutes(paragraphs: string[]): number {
  const words = paragraphs.join(" ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}
