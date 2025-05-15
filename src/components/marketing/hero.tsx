"use client";

import { ArrowRightIcon, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { BlurText } from "../ui/blur-text";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import Image from "next/image";
import Container from "../global/container";
import { useState, useEffect } from "react";
import { scrollToSection } from "@/functions";
import PlyrVideo from "../ui/plyr-video";
import PlyrStyles from "../ui/plyr-styles";
import { useMediaQuery, useTouchDevice } from "@/hooks/useMediaQuery";

const Hero = () => {
    const [isMuted, setIsMuted] = useState(true);
    const [isClient, setIsClient] = useState(false);
    const isMobile = !useMediaQuery('(min-width: 768px)');
    const isTouch = useTouchDevice();
    
    // Handle client-side rendering
    useEffect(() => {
        setIsClient(true);
    }, []);
    
    const handleTryRiskFree = () => {
        scrollToSection('book-appointment');
    };
    
    return (
        <div id="hero" className="flex flex-col items-center text-center w-full max-w-5xl my-24 mx-auto z-40 relative">
            {/* Load Plyr styles on client-side */}
            {isClient && <PlyrStyles />}
            
            <Container delay={0.0}>
                <div className="pl-2 pr-1 py-1 rounded-full border border-foreground/10 hover:border-foreground/15 backdrop-blur-lg cursor-pointer flex items-center gap-2.5 select-none w-max mx-auto">
                    <div className="w-3.5 h-3.5 rounded-full bg-primary/40 flex items-center justify-center relative">
                        <div className="w-2.5 h-2.5 rounded-full bg-primary/60 flex items-center justify-center animate-ping">
                            <div className="w-2.5 h-2.5 rounded-full bg-primary/60 flex items-center justify-center animate-ping"></div>
                        </div>
                        <div className="w-1.5 h-1.5 rounded-full bg-primary flex items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        </div>
                    </div>
                    <span className="inline-flex items-center justify-center gap-2 animate-text-gradient animate-background-shine bg-gradient-to-r from-[#b2a8fd] via-[#8678f9] to-[#c7d2fe] bg-[200%_auto] bg-clip-text text-sm text-transparent">
                        No-Cure? No-Pay!
                        <span className="text-xs text-secondary-foreground px-1.5 py-0.5 rounded-full bg-gradient-to-b from-foreground/20 to-foreground/10 flex items-center justify-center">
                            Risk-Free
                            <ArrowRightIcon className="w-3.5 h-3.5 ml-1 text-foreground/50" />
                        </span>
                    </span>
                </div>
            </Container>
            <BlurText
                word={"Transform Your YouTube Content Into a Premium Learning Platform"}
                className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent py-2 md:py-0 lg:!leading-snug font-medium tracking-[-0.0125em] mt-6 font-heading"
            />
            <Container delay={0.1}>
                <p className="text-sm sm:text-base lg:text-lg mt-4 text-accent-foreground/60 max-w-2xl mx-auto">
                    Your own white-labeled platform with AI assistant, interactive quizzes, and smart notes—we handle everything while you keep creating content just like before
                </p>
            </Container>

            <Container delay={0.2}>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
                    <Button onClick={handleTryRiskFree} size="lg" className="relative group w-full sm:w-auto">
                        Start for free
                        <ArrowRightIcon className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                        <motion.div
                            className="absolute -inset-0.5 rounded-lg blur-sm bg-gradient-to-r from-primary to-violet-500 opacity-75 group-hover:opacity-100 transition duration-300"
                            animate={{
                                opacity: [0.5, 0.75, 0.5],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                            }}
                            style={{ zIndex: -1 }}
                        />
                    </Button>
                    <div className="flex items-center gap-2 text-sm text-accent-foreground/60">
                        <ShieldCheck className="w-4 h-4 text-primary" />
                        No upfront fees. We only earn when you do.
                    </div>
                </div>
            </Container>

            <Container delay={0.3}>
                <div className="relative mx-auto max-w-7xl rounded-xl lg:rounded-[32px] border border-neutral-200/50 p-2 backdrop-blur-lg border-neutral-700 bg-neutral-800/50 md:p-4 mt-12">
                    <div className="absolute top-1/4 left-1/2 -z-10 gradient w-3/4 -translate-x-1/2 h-1/4 -translate-y-1/2 inset-0 blur-[10rem]"></div>

                    <div className="rounded-lg lg:rounded-[24px] border p-2 border-neutral-700 bg-black relative group">
                        {isClient ? (
                            <PlyrVideo 
                                src="/images/Creators & Students Unite： Revolutionize Learning with Lumora AI.mp4"
                                className="rounded-lg lg:rounded-[20px]"
                                options={{
                                    muted: isMuted,
                                    autoplay: false,
                                    loop: { active: true },
                                    hideControls: false,
                                    controls: [
                                        'play-large',
                                        'play', 
                                        'progress', 
                                        'current-time',
                                        'mute',
                                        'volume',
                                        'fullscreen'
                                    ],
                                    clickToPlay: true,
                                    preload: 'auto',
                                    loadSprite: true,
                                    iconUrl: '/icons/plyr.svg',
                                    blankVideo: '/blank.mp4',
                                    storage: { enabled: false },
                                }}
                                onReady={(player) => {
                                    // Don't auto-play video
                                }}
                            />
                        ) : (
                            // Fallback for server-side rendering
                            <video
                                src="/images/Creators & Students Unite： Revolutionize Learning with Lumora AI.mp4"
                                className="rounded-lg lg:rounded-[20px]"
                                muted
                                playsInline
                                width={1920}
                                height={1080}
                            />
                        )}
                    </div>
                </div>
            </Container>
        </div>
    )
};

export default Hero
