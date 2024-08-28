import getEnv from "./getEnv";
import axios from "axios";

export default async function isMediaAvailable(source) {
  if (!source) return false;
  const mediaUrl = getEnv("media");

  try {
    const response = await axios.head(`${mediaUrl}/${source}`, {
      validateStatus: () => true,
    });
    return response.status >= 200 && response.status < 300;
  } catch {
    return false;
  }
}
