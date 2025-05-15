"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/functions";
import Container from "../global/container";
import { SectionBadge } from "../ui/section-bade";
import PlyrVideo from "../ui/plyr-video";
import { motion } from "framer-motion";
import { useMediaQuery } from "@/hooks/useMediaQuery";

// Feature data
const features = [
  {
    id: "assistant",
    title: "AI Assistant",
    description: "Students often face doubts while watching a course on YouTube, but they can't ask the instructor directly. Our AI assistant has full knowledge of your content and is available 24/7. It provides clarifications, simpler explanations, and shares clickable timestamps, taking them directly to the part of the video where the answer lies.",
    videoSrc: "/Videos/Assistant.mp4",
  },
  {
    id: "quiz",
    title: "Recursive Quizzes",
    description: "After each video, your platform offers a personalized AI-powered quiz that tests their understanding recursively—until they've really grasped the concept. Students can't jump to the next lecture until they truly understand the current one, ensuring complete mastery of your material.",
    videoSrc: "/Videos/Quiz.mp4",
  },
  {
    id: "notes",
    title: "Smart Notes",
    description: "There's a note-taking section under each video where students can create beautiful, organized notes—tied directly to that specific lecture. No more switching apps or maintaining a separate notebook, everything is integrated right where they need it.",
    videoSrc: "/Videos/Notes.mp4",
  }
];

interface FeatureCardProps {
  feature: {
    id: string;
    title: string;
    description: string;
    videoSrc: string;
  };
  isReversed?: boolean;
}

const FeatureCard = ({ feature, isReversed = false }: FeatureCardProps) => {
  const isMobile = !useMediaQuery('(min-width: 768px)');
  
  return (
    <div 
      className={cn(
        "w-full flex flex-col md:flex-row gap-6 md:gap-10 py-8 md:py-16",
        isReversed && "md:flex-row-reverse"
      )}
    >
      {/* Video Section */}
      <motion.div 
        className="w-full md:w-1/2 rounded-2xl overflow-hidden shadow-lg bg-primary/[0.05] border border-primary/20"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: false, margin: "-100px" }}
      >
        <div className="aspect-video w-full h-full rounded-2xl overflow-hidden">
          <PlyrVideo
            src={feature.videoSrc} 
            options={{
              autoplay: false,
              muted: true,
              loop: { active: true },
              controls: ['play-large', 'play', 'progress', 'mute'],
            }}
            className="w-full h-full object-cover"
          />
        </div>
      </motion.div>
      
      {/* Text Section */}
      <motion.div 
        className="w-full md:w-1/2 flex flex-col justify-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        viewport={{ once: false, margin: "-100px" }}
      >
        <h3 className="text-2xl md:text-3xl font-heading font-medium">{feature.title}</h3>
        <div className="w-20 h-1 bg-primary/70 my-4"></div>
        <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
          {feature.description}
        </p>
      </motion.div>
    </div>
  );
};

const VideoFeatures = () => {
  const [isMounted, setIsMounted] = useState(false);
  
  // Handle SSR
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  if (!isMounted) {
    return null;
  }
  
  return (
    <div className="w-full py-12 md:py-16 lg:py-24">
      <Container>
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-12">
          <SectionBadge title="Interactive Features" />
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-heading font-medium !leading-snug mt-6">
            Powerful Learning Tools
          </h2>
          <p className="text-base md:text-lg text-center text-accent-foreground/80 mt-6">
            Experience our interactive features designed to enhance your learning experience and maximize knowledge retention.
          </p>
        </div>
        
        <div className="w-full flex flex-col gap-10 md:gap-16">
          {features.map((feature, index) => (
            <FeatureCard 
              key={feature.id} 
              feature={feature} 
              isReversed={index % 2 !== 0}
            />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default VideoFeatures; 