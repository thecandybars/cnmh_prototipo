import { useEffect, useState } from "react";
import axios from "axios";
import getEnv from "../../../utils/getEnv";

export default function useSelectMediaSource(sources) {
  const [source, setSource] = useState("");
  useEffect(() => {
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
      setSource(source);
    };
    check();
  }, [sources]);

  return source;
}
