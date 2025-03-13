import LazyLoad from "react-lazyload";
import VideoScroll from "./VideoScroll";

export default function VideoScrollWrapper(props) {
  return (
    <LazyLoad once unmountIfInvisible={false}>
      <VideoScroll {...props} />
    </LazyLoad>
  );
}
