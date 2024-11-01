import { useState } from "react";
import PropTypes from "prop-types";
import ScrollyVideo from "scrolly-video/dist/ScrollyVideo.esm.jsx";

function useScrollyVideo({ src = "", length = 300 }) {
  const [scrollyPosition, setScrollyPosition] = useState(0);

  const Element = ({ children }) => (
    <div className="scrolly-container" style={{ height: `${length}vh` }}>
      <ScrollyVideo
        src={src}
        onChange={(position) => setScrollyPosition(position)}
      />
      {children}
    </div>
  );

  Element.propTypes = {
    children: PropTypes.node,
  };

  return [Element, calcHeight, scrollyPosition];
}

useScrollyVideo.propTypes = {
  src: PropTypes.string,
  length: PropTypes.number.isRequired,
};

/**
 * Given a height percentage, calculate the equivalent height in viewport units.
 * @param {number} heightPercent - A number from 0 to 1, representing the percentage of viewport height.
 * @returns {string} The equivalent height in viewport units.
 */
const calcHeight = (heightPercent) => {
  return `${(length * (1 - 10 / length) - 200) * -heightPercent}vh`;
};

export default useScrollyVideo;
