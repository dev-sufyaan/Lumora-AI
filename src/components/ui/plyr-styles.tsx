"use client";

import { useEffect } from "react";

export default function PlyrStyles() {
  useEffect(() => {
    // Import Plyr CSS
    import('plyr/dist/plyr.css');
    
    // Import custom Plyr styles
    const style = document.createElement('style');
    style.textContent = `
      /* Custom Plyr Styles */
      .plyr-container {
        width: 100%;
        height: 100%;
        position: relative;
        overflow: hidden;
        border-radius: inherit;
      }
      
      .plyr-video {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }
      
      /* Override some Plyr default styles for better integration with our design */
      .plyr {
        border-radius: inherit;
        --plyr-color-main: #8678f9;
        --plyr-video-control-color: #ffffff;
        --plyr-video-control-color-hover: #8678f9;
        --plyr-video-control-background-hover: rgba(0, 0, 0, 0.6);
        --plyr-audio-control-background-hover: rgba(0, 0, 0, 0.6);
        --plyr-audio-control-color-hover: #8678f9;
        --plyr-menu-background: rgba(0, 0, 0, 0.9);
        --plyr-menu-color: #ffffff;
        --plyr-menu-border-color: rgba(255, 255, 255, 0.15);
        --plyr-menu-radius: 8px;
      }
      
      /* Fix control positioning and size */
      .plyr__controls {
        padding: 12px !important;
      }
      
      /* Responsive adjustments */
      @media (max-width: 768px) {
        .plyr--video .plyr__controls {
          padding: 10px !important;
        }
        
        .plyr__control--overlaid {
          padding: 12px;
        }
      }
      
      /* Touch-friendly adjustments */
      @media (pointer: coarse) {
        .plyr__control--overlaid {
          padding: 16px;
        }
        
        .plyr--video .plyr__controls {
          padding: 12px 10px !important;
        }
        
        .plyr__control {
          padding: 10px;
        }
      }
      
      /* Ensure fullscreen works properly */
      .plyr--fullscreen-active {
        border-radius: 0;
      }
      
      /* Fix for video stuck issue */
      .plyr--paused .plyr__controls {
        opacity: 1 !important;
      }
      
      .plyr--hide-controls .plyr__controls {
        opacity: 0;
        pointer-events: none;
        transform: translateY(10px);
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return null;
} 