/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { SoundOffIcon, SoundOnIcon } from "../../../icons";
import { Button } from "@mui/material";

export default function VideoScrollAudioPlayer({ src }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const VOLUME = 0.2;
  const audioRef = useRef(null); // Ref to manage the audio instance
  // Init
  useEffect(() => {
    if (!src) return;

    const audio = new Audio(src);
    audio.volume = VOLUME;
    audio.loop = true;
    audioRef.current = audio;

    if (isPlaying) audio.play();

    return () => {
      audio.pause();
      audioRef.current = null;
      audio.load();
    };
  }, [src, isPlaying]);
  // Play/pause
  const handlePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };
  // Volumen
  // const handleVolumeChange = (event, newValue) => {
  //   setVolume(newValue);
  //   if (audioRef.current) {
  //     audioRef.current.volume = newValue;
  //   }
  // };
  // Render Audio Controls
  //   const renderAudioControls = (
  //     <MuteButton isOn={isPlaying} onClick={handlePlayPause} />
  //   );
  return <MuteButton isOn={isPlaying} onClick={handlePlayPause} />;
}

const MuteButton = ({ isOn, onClick }) => {
  const [icon, setIcon] = useState(isOn ? <SoundOnIcon /> : <SoundOffIcon />);
  // const [isHover, setIsHover] = useState(false);
  const handleOnClick = () => {
    onClick();
    setIcon(isOn ? <SoundOffIcon /> : <SoundOnIcon />);
  };

  return (
    <Button
      onClick={handleOnClick}
      // onMouseEnter={() => setIsHover(true)}
      // onMouseLeave={() => setIsHover(false)}
      sx={{
        width: 60,
        height: 60,
        borderRadius: "50%",
        border: "8px solid black",
        bgcolor: "gray",
        fontSize: "2.5rem",
        // border: isHover ? "8px solid gray" : "8px solid black",
      }}
    >
      {icon}
    </Button>
  );
};
