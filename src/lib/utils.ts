import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function stringToColor(str: string): string {
  // Create a hash from string
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Convert the hash to a 6-digit hexadecimal number
  let color = '#';
  for (let i = 0; i < 3; i++) {
    // Extract the next byte from the hash
    const value = (hash >> (i * 8)) & 0xff;
    // Convert to hex, ensure 2 digits with padding, and append to the color string
    color += ('00' + value.toString(16)).substr(-2);
  }

  return color;
}

function hexToRGB(hex: string): { r: number; g: number; b: number } {
  // Remove the "#" character
  hex = hex.replace('#', '');

  // Parse the hex string into RGB
  if (hex.length === 3) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    hex = hex
      .split('')
      .map((char) => char + char)
      .join('');
  }

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return { r, g, b };
}

export function getContrastColor(hexColor: string): string {
  const { r, g, b } = hexToRGB(hexColor);

  // Calculate the luminance
  const luminance = 0.299 * r + 0.587 * g + 0.114 * b;

  // Standard threshold for luminance to switch between dark and light
  const threshold = 128; // This value can be adjusted depending on your needs

  // If luminance is lower than threshold, it's a dark color, so return white; otherwise, return black
  return luminance < threshold ? 'white' : 'black';
}

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);