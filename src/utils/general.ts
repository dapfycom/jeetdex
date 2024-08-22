// orderBy function should be able to order data of an array, should handle if the data indicated to order by is a number or string, also receive if order is asc or desc

import { ZodTypeAny, z } from 'zod';

export const orderBy = (
  data: any[],
  order: 'asc' | 'desc',
  orderBy: string
) => {
  const sortedData = data.sort((a, b) => {
    if (order === 'asc') {
      if (typeof a[orderBy] === 'number') {
        return a[orderBy] - b[orderBy];
      } else {
        return a[orderBy].localeCompare(b[orderBy]);
      }
    } else {
      if (typeof a[orderBy] === 'number') {
        return b[orderBy] - a[orderBy];
      } else {
        return b[orderBy].localeCompare(a[orderBy]);
      }
    }
  });
  return sortedData;
};

export const copyTextToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    throw new Error('Not able to copy');
  }
};

// Función para generar un color claro aleatorio
export const generateLightColor = () => {
  const r = Math.floor(Math.random() * 156) + 100; // Valores entre 100 y 255 para asegurar colores claros
  const g = Math.floor(Math.random() * 156) + 100;
  const b = Math.floor(Math.random() * 156) + 100;
  return `rgb(${r}, ${g}, ${b})`;
};

export function textToLightColor(text: string): string {
  // Generate a hash of the text using a simple hash function
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = text.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Convert the hash to an RGB color
  let r = (hash >> 16) & 0xff;
  let g = (hash >> 8) & 0xff;
  let b = hash & 0xff;

  // Ensure the colors are light by increasing the brightness
  r = Math.floor(r * 0.5 + 127.5);
  g = Math.floor(g * 0.5 + 127.5);
  b = Math.floor(b * 0.5 + 127.5);

  // Convert to hexadecimal color code
  const lightColor = `#${r.toString(16).padStart(2, '0')}${g
    .toString(16)
    .padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;

  return lightColor;
}

export const numericString = (schema: ZodTypeAny) =>
  z.preprocess((a) => {
    if (typeof a === 'string') {
      return parseFloat(a);
    } else if (typeof a === 'number') {
      return a;
    } else {
      return undefined;
    }
  }, schema);

export const arrayToCsv = ({
  data = null,
  columnDelimiter = ',',
  lineDelimiter = '\n',
  fileName = 'demo.csv'
}: {
  data: any[] | null;
  columnDelimiter?: string;
  lineDelimiter?: string;
  fileName?: string;
}) => {
  let result: any, ctr: any;

  if (data === null || !data.length) {
    return null;
  }

  const keys = Object.keys(data[0]);

  result = '';
  result += keys.join(columnDelimiter);
  result += lineDelimiter;

  data.forEach((item) => {
    ctr = 0;
    keys.forEach((key: string) => {
      if (ctr > 0) {
        result += columnDelimiter;
      }

      result +=
        typeof item[key] === 'string' && item[key].includes(columnDelimiter)
          ? `"${item[key]}"`
          : item[key];
      ctr++;
    });
    result += lineDelimiter;
  });

  // (B) CREATE BLOB OBJECT
  const blob = new Blob([result], { type: 'text/csv' });

  // (C) CREATE DOWNLOAD LINK
  const url = window.URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = fileName;

  // (D) "FORCE DOWNLOAD"
  // NOTE: MAY NOT ALWAYS WORK DUE TO BROWSER SECURITY
  // BETTER TO LET USERS CLICK ON THEIR OWN
  anchor.click();
  window.URL.revokeObjectURL(url);
  anchor.remove();
};
