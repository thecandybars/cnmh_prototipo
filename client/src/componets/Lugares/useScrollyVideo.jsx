import { useState } from "react";
import PropTypes from "prop-types";
import ScrollyVideo from "scrolly-video/dist/ScrollyVideo.esm.jsx";

function useScrollyVideo({ src, length }) {
  const [scrollyPosition, setScrollyPosition] = useState(0);
  const calcHeight = (heightPercent) => {
    return (length * (1 - 10 / length) - 200) * -heightPercent + "vh";
  };
  const Element = ({ children }) => (
    <div className={"scrolly-container"} style={{ height: `${length}vh` }}>
      <ScrollyVideo src={src} onChange={(e) => setScrollyPosition(e)} />
      {children}
    </div>
  );

  return [Element, calcHeight, scrollyPosition];
}

useScrollyVideo.propTypes = {
  src: PropTypes.string,
  length: PropTypes.number,
};

export default useScrollyVideo;
