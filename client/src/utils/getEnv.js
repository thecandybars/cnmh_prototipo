export default function getEnv(val) {
  if (!val) throw new Error("Provide a string ENV");
  const viteKey =
    val === "mapboxToken"
      ? "VITE_MAPBOX_TOKEN"
      : val === "api"
      ? "VITE_API"
      : val === "pinataApi"
      ? "VITE_PINATA_API_KEY"
      : val === "pinataGateway"
      ? "VITE_PINATA_GATEWAY"
      : val === "client"
      ? "VITE_CLIENT"
      : val === "media"
      ? "VITE_MEDIA"
      : val === "ipfs"
      ? "VITE_IPFS"
      : null;
  if (viteKey === null) throw new Error("No ENV found");
  const viteEnv = import.meta.env[viteKey];
  return viteEnv;
}
