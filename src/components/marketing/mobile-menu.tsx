"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn, scrollToSection } from "@/functions";
import { useClickOutside } from "@/hooks";
import { motion } from "framer-motion";
import { Box, CalendarClock, Captions, CircleHelp, CopyCheck, FileText, Gem, Home, Layers3, LineChart, Newspaper, UserCog, Waypoints, CalendarIcon, BarChart2 } from "lucide-react";
import Link from "next/link";
import React from 'react';
import { Button } from "../ui/button";

interface Props {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileMenu = ({ isOpen, setIsOpen }: Props) => {

    const ref = useClickOutside(() => setIsOpen(false));

    const variants = {
        open: { opacity: 1, y: 20 },
        closed: { opacity: 0, y: 0 },
    };

    const handleBookAppointment = () => {
        scrollToSection('book-appointment');
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
                            scrollToSection('perks');
                            setIsOpen(false);
                        }}
                        className="w-full px-4 py-2 text-lg hover:text-muted-foreground font-normal transition transform rounded-md cursor-pointer text-foreground text-start active:scale-95 hover:bg-muted/20 active:opacity-80"
                    >
                        <div className="flex items-center w-full text-start">
                            <Gem className="w-4 h-4 mr-2" />
                            Perks
                        </div>
                    </li>
                    <div className="w-full pt-2 mt-2 border-t border-border/30">
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
