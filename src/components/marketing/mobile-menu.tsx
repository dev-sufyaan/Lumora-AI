"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn, scrollToSection } from "@/functions";
import { useClickOutside } from "@/hooks";
import { motion } from "framer-motion";
import { Box, CalendarClock, Captions, CircleHelp, CopyCheck, FileText, Gem, Home, Layers3, LineChart, Newspaper, UserCog, Waypoints, CalendarIcon, BarChart2, PhoneIcon, ShieldCheck, Heart, Award, MessageSquareWarning, Users } from "lucide-react";
import Link from "next/link";
import React from 'react';
import { Button } from "../ui/button";

interface Props {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    handleClose?: (e: React.MouseEvent) => void;
}

const MobileMenu = ({ isOpen, setIsOpen, handleClose }: Props) => {

    // Only use click outside to close when the menu is actually open
    const ref = useClickOutside(() => {
        if (isOpen) {
            // Use the provided handleClose if available, otherwise just set isOpen to false
            if (handleClose) {
                // Create a synthetic event to pass to handleClose
                const syntheticEvent = { stopPropagation: () => {} } as React.MouseEvent;
                handleClose(syntheticEvent);
            } else {
                setIsOpen(false);
            }
        }
    });

    const variants = {
        open: { opacity: 1, y: 20 },
        closed: { opacity: 0, y: 0 },
    };

    const handleBookAppointment = () => {
        scrollToSection('book-appointment');
        setIsOpen(false);
    };
    
    const handleContactClick = () => {
        window.open('https://wa.me/919318441197', '_blank');
        setIsOpen(false);
    };

    return (
        <div
            ref={ref}
            className={cn(
                "absolute top-12 inset-x-0 size-full p-4 z-20 bg-inherit flex flex-1",
                isOpen ? "flex" : "hidden"
            )}
        >
            <motion.div
                initial="closed"
                animate={isOpen ? "open" : "closed"}
                variants={variants}
                transition={{
                    type: "spring",
                    bounce: 0.15,
                    duration: 0.5,
                }}
                className="size-full flex flex-col justify-start"
            >
                <ul className="flex flex-col items-start flex-1 w-full space-y-3">
                    <li
                        onClick={() => {
                            scrollToSection('hero');
                            setIsOpen(false);
                        }}
                        className="w-full px-4 py-2 text-lg hover:text-muted-foreground font-normal transition transform rounded-md cursor-pointer text-foreground text-start active:scale-95 hover:bg-muted/20 active:opacity-80"
                    >
                        <div className="flex items-center w-full text-start">
                            <Home className="w-4 h-4 mr-2" />
                            Home
                        </div>
                    </li>
                    <li
                        onClick={() => {
                            scrollToSection('no-cure-no-pay');
                            setIsOpen(false);
                        }}
                        className="w-full px-4 py-2 text-lg hover:text-muted-foreground font-normal transition transform rounded-md cursor-pointer text-foreground text-start active:scale-95 hover:bg-muted/20 active:opacity-80"
                    >
                        <div className="flex items-center w-full text-start">
                            <ShieldCheck className="w-4 h-4 mr-2" />
                            Risk-Free
                        </div>
                    </li>
                    <li
                        onClick={() => {
                            scrollToSection('value-proposition');
                            setIsOpen(false);
                        }}
                        className="w-full px-4 py-2 text-lg hover:text-muted-foreground font-normal transition transform rounded-md cursor-pointer text-foreground text-start active:scale-95 hover:bg-muted/20 active:opacity-80"
                    >
                        <div className="flex items-center w-full text-start">
                            <Heart className="w-4 h-4 mr-2" />
                            Transform Learning
                        </div>
                    </li>
                    <li
                        onClick={() => {
                            scrollToSection('perks');
                            setIsOpen(false);
                        }}
                        className="w-full px-4 py-2 text-lg hover:text-muted-foreground font-normal transition transform rounded-md cursor-pointer text-foreground text-start active:scale-95 hover:bg-muted/20 active:opacity-80"
                    >
                        <div className="flex items-center w-full text-start">
                            <Gem className="w-4 h-4 mr-2" />
                            Benefits
                        </div>
                    </li>
                    <li
                        onClick={() => {
                            scrollToSection('social-proof');
                            setIsOpen(false);
                        }}
                        className="w-full px-4 py-2 text-lg hover:text-muted-foreground font-normal transition transform rounded-md cursor-pointer text-foreground text-start active:scale-95 hover:bg-muted/20 active:opacity-80"
                    >
                        <div className="flex items-center w-full text-start">
                            <Users className="w-4 h-4 mr-2" />
                            Testimonials
                        </div>
                    </li>
                    <li
                        onClick={() => {
                            scrollToSection('book-appointment');
                            setIsOpen(false);
                        }}
                        className="w-full px-4 py-2 text-lg hover:text-muted-foreground font-normal transition transform rounded-md cursor-pointer text-foreground text-start active:scale-95 hover:bg-muted/20 active:opacity-80"
                    >
                        <div className="flex items-center w-full text-start">
                            <CalendarClock className="w-4 h-4 mr-2" />
                            Consultation
                        </div>
                    </li>
                    <li
                        onClick={() => {
                            scrollToSection('faq');
                            setIsOpen(false);
                        }}
                        className="w-full px-4 py-2 text-lg hover:text-muted-foreground font-normal transition transform rounded-md cursor-pointer text-foreground text-start active:scale-95 hover:bg-muted/20 active:opacity-80"
                    >
                        <div className="flex items-center w-full text-start">
                            <MessageSquareWarning className="w-4 h-4 mr-2" />
                            FAQ
                        </div>
                    </li>
                    <div className="w-full pt-2 mt-2 border-t border-border/30 flex flex-col gap-3">
                        <Button 
                            onClick={handleContactClick}
                            className="w-full justify-start"
                            variant="outline"
                            size="lg"
                        >
                            <PhoneIcon className="w-4 h-4 mr-2" />
                            Contact
                        </Button>
                        
                        <Button 
                            onClick={handleBookAppointment}
                            className="w-full justify-start"
                            variant="default"
                            size="lg"
                        >
                            <CalendarIcon className="w-4 h-4 mr-2" />
                            Book Appointment
                        </Button>
                    </div>
                </ul>
            </motion.div>
        </div>
    )
};

export default MobileMenu
