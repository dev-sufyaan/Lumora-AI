"use client";

import { useEffect, useRef } from "react";
import Plyr from "plyr";

interface VideoPlayerProps {
  src: string;
  poster?: string;
  options?: Plyr.Options;
  className?: string;
}

export default function VideoPlayer({
  src,
  poster,
  options = {},
  className = "",
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<Plyr | null>(null);

  useEffect(() => {
    if (!videoRef.current) return;

    // Initialize Plyr
    const defaultOptions: Plyr.Options = {
      controls: [
        "play-large",
        "play",
        "progress",
        "current-time",
        "mute",
        "volume",
        "captions",
        "settings",
        "pip",
        "fullscreen",
      ],
      resetOnEnd: false,
      hideControls: true,
      autoplay: false,
    };

    // Merge default options with provided options
    playerRef.current = new Plyr(videoRef.current, {
      ...defaultOptions,
      ...options,
    });

    // Clean up
    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, [options]);

  return (
    <div className={`plyr-container ${className}`}>
      <video
        ref={videoRef}
        className="plyr-video"
        poster={poster}
        playsInline
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
