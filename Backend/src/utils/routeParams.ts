/** Express 5 types allow `string | string[]` for `req.params.*`; normalize for services. */
export function routeParam(
  value: string | string[] | undefined,
  fallback = ""
): string {
  if (value === undefined) return fallback;
  return Array.isArray(value) ? value[0] ?? fallback : value;
}
