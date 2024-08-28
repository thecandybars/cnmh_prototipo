import { useEffect, useState } from "react";
import selectMediaSource from "../../../utils/selectMediaSource";

export default function useSelectMediaSource(sources) {
  const [source, setSource] = useState("");
  useEffect(() => {
    const check = async () => {
      const source = await selectMediaSource({
        primary: sources.primary,
        secondary: sources.secondary,
      });
      setSource(source);
    };
    check();
  }, [sources]);

  return source;
}
