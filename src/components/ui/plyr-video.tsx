"use client";

import { useEffect, useRef, useState } from "react";
import { useMediaQuery, useTouchDevice } from "@/hooks/useMediaQuery";
import { initPlyr } from "@/hooks/usePlyr";

// We'll handle CSS import in a client-side effect

interface PlyrVideoProps {
  src: string;
  poster?: string;
  options?: any;
  className?: string;
  onReady?: (player: any) => void;
}

const PlyrVideo = ({ src, poster, options, className, onReady }: PlyrVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<any>(null);
  const [isMuted, setIsMuted] = useState(true);
  const isMobile = !useMediaQuery('(min-width: 768px)');
  const isTouch = useTouchDevice();
  const [isClient, setIsClient] = useState(false);

  // Only run on client-side
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    // Only initialize Plyr on client-side
    if (!isClient || !videoRef.current) return;

    // Adjust controls based on device type
    const controlsForDevice = isTouch 
      ? ['play-large', 'play', 'progress', 'mute', 'fullscreen']
      : ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen'];

    // Default options with good mobile support
    const defaultOptions = {
      controls: controlsForDevice,
      ratio: '16:9',
      fullscreen: { enabled: true, fallback: true, iosNative: true },
      autoplay: false,
      muted: isMuted,
      loop: { active: true },
      keyboard: { focused: true, global: false },
      tooltips: { controls: !isTouch, seek: !isTouch },
      captions: { active: false, language: 'auto', update: true },
      hideControls: false, // Always show controls
      resetOnEnd: false,
      clickToPlay: true,
      disableContextMenu: false,
      preload: 'auto',
      loadSprite: true,
      iconUrl: '/icons/plyr.svg', // Provide a local path to prevent network requests
      blankVideo: '/blank.mp4', // Provide a local blank video
      storage: { enabled: false }, // Disable storage to avoid issues
    };

    // Merge default options with provided options
    const mergedOptions = { ...defaultOptions, ...options };

    // Initialize Plyr safely
    initPlyr(videoRef.current, mergedOptions).then(player => {
      if (player) {
        playerRef.current = player;
        
        // Call onReady callback if provided
        if (onReady) {
          onReady(player);
        }
        
        // Set up volume change listener with error handling
        player.on('volumechange', () => {
          try {
            setIsMuted(player.muted);
          } catch (error) {
            console.error("Error handling volume change:", error);
          }
        });

        // Handle errors
        player.on('error', (error: any) => {
          console.error("Plyr error:", error);
        });

        // Ensure video plays
        setTimeout(() => {
          try {
            player.play().catch(() => {
              // Autoplay was prevented, mute and try again
              player.muted = true;
              player.play().catch(console.error);
            });
          } catch (error) {
            console.error("Plyr play error:", error);
          }
        }, 100);
      }
    });

    // Responsive handling
    const handleResize = () => {
      if (playerRef.current && playerRef.current.elements) {
        // Force player to recalculate its size
        setTimeout(() => {
          if (playerRef.current?.elements?.container) {
            playerRef.current.elements.container.style.setProperty('width', '100%');
            playerRef.current.elements.container.style.setProperty('height', 'auto');
          }
        }, 100);
      }
    };

    window.addEventListener('resize', handleResize);

    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
      if (playerRef.current?.destroy) {
        try {
          playerRef.current.destroy();
        } catch (error) {
          console.error("Error destroying player:", error);
        }
      }
    };
  }, [options, onReady, isTouch, isMobile, isClient]);

  // Fallback for server-side rendering
  if (!isClient) {
    return (
      <div className={`plyr-container ${className || ""}`}>
        <video
          className="plyr-video"
          poster={poster}
          playsInline
          muted
          loop
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }

  return (
    <div className={`plyr-container ${className || ""}`}>
      <video
        ref={videoRef}
        className="plyr-video"
        poster={poster}
        playsInline
        muted={isMuted}
        loop
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default PlyrVideo;