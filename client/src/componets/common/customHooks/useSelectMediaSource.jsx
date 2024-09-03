import { useEffect, useState } from "react";
import axios from "axios";
import getEnv from "../../../utils/getEnv";

/**
 * Checks if the primary media source is available by making a HEAD request.
 * If the request is successful (200-299), the primary source is used.
 * Otherwise, the secondary source is used.
 *
 * @param {object} sources - An object with primary and secondary media source paths
 * @returns {string} The chosen media source
 */
export default function useSelectMediaSource(sources) {
  const [source, setSource] = useState("");
  useEffect(() => {
    let isMounted = true;

    const check = async () => {
      const mediaUrl = getEnv("media");
      const ipfsGateway = getEnv("pinataGateway");
      const response = await axios.head(`${mediaUrl}/${sources.primary}`, {
        validateStatus: () => true,
      });
      const source =
        response.status >= 200 && response.status < 300
          ? `${mediaUrl}/${sources.primary}`
          : `${ipfsGateway}/${sources.secondary}`;
      isMounted && setSource(source);
    };
    check();
    return () => {
      isMounted = false; // Cleanup to prevent memory leak
    };
  }, [sources]);

  return source;
}
