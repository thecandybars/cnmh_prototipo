export default function getEnv(val) {
  const viteKey =
    val === "mapboxToken"
      ? "VITE_MAPBOX_TOKEN"
      : val === "api"
      ? "VITE_API"
      : val === "pinataApi"
      ? "VITE_PINATA_API_KEY"
      : val === "client"
      ? "VITE_CLIENT"
      : "";
  const viteEnv = import.meta.env[viteKey];
  return viteEnv;
}
