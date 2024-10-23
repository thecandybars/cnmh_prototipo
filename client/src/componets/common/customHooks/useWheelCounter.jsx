import { useState, useEffect } from "react";

export default function useWheelCounter() {
  const [count, setCount] = useState(0);
  const [wheelDelta, setWheelDelta] = useState(0);

  // This value controls how many wheel units are needed to change the counter
  const SCROLL_RESOLUTION = 1; // Adjust this value to set the sensitivity

  useEffect(() => {
    const handleWheel = (event) => {
      event.preventDefault();
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
    if (wheelDelta >= SCROLL_RESOLUTION) {
      setCount((prevCount) => prevCount + 1);
      setWheelDelta(0); // Reset the accumulated delta
    } else if (wheelDelta <= -SCROLL_RESOLUTION) {
      setCount((prevCount) => prevCount - 1);
      setWheelDelta(0); // Reset the accumulated delta
    }
  }, [wheelDelta]);

  return count;
}
