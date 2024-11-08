import PropTypes from "prop-types";
import { useState } from "react";
import ScrollyVideo from "scrolly-video/dist/ScrollyVideo.esm.jsx";

function useVideoScroll({ src, altura, content }) {
  const [scrollyPosition, setScrollyPosition] = useState(0);
  const renderContent = content.map((item) => (
    <div key={item.id}>{item.content}</div>
  ));
  const renderScrollVideo = (
    <div className={"scrolly-container"} style={{ height: `${altura}vh` }}>
      <ScrollyVideo
        src={src}
        // src="https://scrollyvideo.js.org/goldengate.mp4"
        onChange={(e) => setScrollyPosition(e)}
      />
      {renderContent}
    </div>
  );
  return [renderScrollVideo, scrollyPosition];
}

useVideoScroll.propTypes = {
  src: PropTypes.string,
  altura: PropTypes.number,
  content: PropTypes.array,
};

export default useVideoScroll;
