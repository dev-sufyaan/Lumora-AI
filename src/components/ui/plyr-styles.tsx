"use client";

import { useEffect } from "react";
// Import Plyr CSS statically
import "plyr/dist/plyr.css";

export default function PlyrStyles() {
  useEffect(() => {
    
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
        --plyr-range-thumb-height: 16px;
        --plyr-range-thumb-width: 16px;
        --plyr-range-track-height: 6px;
      }
      
      /* Fix control positioning and size */
      .plyr__controls {
        padding: 12px !important;
      }
      
      /* Fix progress bar and volume slider for mobile */
      .plyr--full-ui input[type=range] {
        height: var(--plyr-range-track-height);
      }
      
      /* Make volume slider smaller on mobile */
      @media (max-width: 768px) {
        .plyr--full-ui input[type=range].plyr__tab-focus::-webkit-slider-runnable-track,
        .plyr--full-ui input[type=range].plyr__tab-focus::-moz-range-track,
        .plyr--full-ui input[type=range].plyr__tab-focus::-ms-track {
          box-shadow: none;
        }
        
        /* Make progress bar larger and more prominent */
        .plyr--full-ui input[type=range].plyr__tab-focus::-webkit-slider-runnable-track {
          height: 8px;
        }
        
        /* Make volume control smaller */
        .plyr__volume {
          max-width: 60px;
        }
        
        .plyr__volume input[type=range] {
          max-height: 4px;
        }
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
        
        /* Increase touch target size for better mobile experience */
        .plyr__control--overlaid {
          width: 60px;
          height: 60px;
        }
      }
      
      /* Ensure fullscreen works properly */
      .plyr--fullscreen-active {
        border-radius: 0;
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        right: 0 !important;
        bottom: 0 !important;
        height: 100% !important;
        width: 100% !important;
        z-index: 10000 !important;
      }
      
      /* Fix fullscreen exit on iOS */
      .plyr--fullscreen-active video {
        object-fit: contain !important;
        width: 100% !important;
        height: 100% !important;
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
      
      /* Ensure controls are always accessible */
      .plyr__controls button:focus,
      .plyr__controls button:hover {
        opacity: 1 !important;
      }
      
      /* Fix for fullscreen exit issue */
      .plyr__control--exit-fullscreen {
        display: block !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return null;
} 