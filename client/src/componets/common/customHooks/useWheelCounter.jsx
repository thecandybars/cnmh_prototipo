import { useState, useEffect } from "react";

export default function useWheelCounter(props) {
  const step = props?.step || 1;
  const resolution = props?.resolution || 1; // This value controls how many wheel units are needed to change the counter
  const scale = props?.scale || 1;
  console.log("🚀 ~ useWheelCounter ~ scale:", scale);
  const [count, setCount] = useState(0);
  console.log("🚀 ~ useWheelCounter ~ count:", count);
  const [wheelDelta, setWheelDelta] = useState(0);

  useEffect(() => {
    const handleWheel = (event) => {
      //   event.preventDefault();
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
      setCount((prevCount) => prevCount + step);
      setWheelDelta(0); // Reset the accumulated delta
    } else if (wheelDelta <= -resolution) {
      setCount((prevCount) => prevCount - step);
      setWheelDelta(0); // Reset the accumulated delta
    }
  }, [resolution, scale, step, wheelDelta]);

  return count / scale;
}