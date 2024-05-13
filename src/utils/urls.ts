export const getWebUrl = (path: string = ''): string => {
  return `${window.location.origin + path}`;
};

export function isPathOrSubpath(currentPath: string, paths: string[]): boolean {
  return paths.some((path) => currentPath.startsWith(path));
}

export function getBasePath(url: string): string {
  const parts = url.split('/');

  const result = parts.slice(2, parts.length).join('/');
  return `/${result}`;
}
