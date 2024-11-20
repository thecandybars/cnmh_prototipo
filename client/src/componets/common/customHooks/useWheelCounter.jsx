import { useState, useEffect } from "react";

export default function useWheelCounter(props) {
  const step = props?.step || 1;
  const resolution = props?.resolution || 1; // This value controls how many wheel units are needed to change the counter
  const scale = props?.scale || 1;
  const [count, setCount] = useState(0);
  const [wheelDelta, setWheelDelta] = useState(0);
  const [direction, setDirection] = useState(null);

  useEffect(() => {
    const handleWheel = (event) => {
      //   event.preventDefault();
      event.stopPropagation();
      // Accumulate wheel delta
      setWheelDelta((prevDelta) => prevDelta + event.deltaY);
    };

    window.addEventListener("wheel", handleWheel);

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  useEffect(() => {
    // When the accumulated delta reaches the threshold, adjust the count
    if (wheelDelta >= resolution) {
      setDirection("up");
      setCount((prevCount) => prevCount + step);
      setWheelDelta(0); // Reset the accumulated delta
    } else if (wheelDelta <= -resolution) {
      setDirection("down");
      setCount((prevCount) => prevCount - step);
      setWheelDelta(0); // Reset the accumulated delta
    }
  }, [resolution, scale, step, wheelDelta]);

  return { frame: count / scale, direction };
}
