export default function objectToQueryParams(obj = null) {
  if (!obj) return "";
  const queryParams = Object.entries(obj)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join("&");

  return queryParams ? `?${queryParams}` : "";
}
