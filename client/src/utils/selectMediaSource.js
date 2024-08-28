import getEnv from "./getEnv";
import axios from "axios";

export default async function selectMediaSource(sources) {
  console.log("🚀 ~ selectMediaSource ~ sources:", sources);
  //   if (!source) return false;
  const mediaUrl = getEnv("media");
  const ipfsGateway = getEnv("pinataGateway");

  try {
    const response = await axios.head(`${mediaUrl}/${sources.primary}`, {
      validateStatus: () => true,
    });
    console.log("🚀 ~ selectMediaSource ~ response:", response);
    if (response.status >= 200 && response.status < 300)
      return `${mediaUrl}/${sources.primary}`;
    else return `${ipfsGateway}/${sources.secondary}`;
  } catch {
    return `${ipfsGateway}/${sources.secondary}`;
  }
}
