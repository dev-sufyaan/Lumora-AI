"use client";

import { cn, scrollToSection } from "@/functions";
import { ArrowRightIcon, CalendarIcon, PhoneIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from 'react';
import Icons from "../global/icons";
import Wrapper from "../global/wrapper";
import { Button } from "../ui/button";
import Menu from "./menu";
import MobileMenu from "./mobile-menu";
import { satoshi2 } from "@/constants/fonts";

const Navbar = () => {
    // Simulate user state without Clerk
    const isLoggedIn = false;

    const [isOpen, setIsOpen] = useState<boolean>(false);
    
    // Specific handler to close the menu
    const handleCloseMenu = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsOpen(false);
    };

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    const handleBookAppointment = () => {
        scrollToSection('book-appointment');
    };
    
    const handleContactClick = () => {
        window.open('https://wa.me/919318441197', '_blank');
    };

    const handleLogoClick = () => {
        scrollToSection('hero');
    };

    return (
        <div className="relative w-full h-full">
            <div className="z-[99] fixed pointer-events-none inset-x-0 h-[88px] bg-[rgba(10,10,10,0.8)] backdrop-blur-sm [mask:linear-gradient(to_bottom,#000_20%,transparent_calc(100%-20%))]"></div>

            <header
                className={cn(
                    "fixed top-4 inset-x-0 mx-auto max-w-6xl px-2 md:px-12 z-[100] transform th",
                    isOpen ? "h-[calc(100%-24px)]" : "h-12"
                )}
            >
                <Wrapper className="backdrop-blur-lg rounded-xl lg:rounded-2xl border border-[rgba(124,124,124,0.2)] px-2 md:px-4 flex items-center justify-start">
                    <div className="flex items-center justify-between w-full sticky mt-[7px] lg:mt-auto mb-auto inset-x-0">
                        <div className="flex items-center flex-1 pl-1">
                            <div 
                                onClick={handleLogoClick}
                                className="text-lg font-semibold text-foreground flex items-center cursor-pointer"
                            >
                                <div className={cn("flex items-center", satoshi2.className)}>
                                    <span className="font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-foreground to-foreground/70">Lumora</span>
                                    <span className="font-medium tracking-wide ml-0.5 text-primary">AI</span>
                                </div>
                            </div>
                            <div className="items-center hidden ml-6 lg:flex">
                                <Menu />
                            </div>
                        </div>
                        <div className="items-center flex gap-2 lg:gap-4">
                            <Button
                                onClick={handleContactClick}
                                size="sm"
                                className="hidden sm:flex items-center"
                                variant="outline"
                            >
                                <PhoneIcon className="w-4 h-4 mr-1.5" />
                                WhatsApp
                            </Button>
                            
                            <Button
                                onClick={handleContactClick}
                                size="sm"
                                className="sm:hidden flex items-center"
                                variant="outline"
                            >
                                <PhoneIcon className="w-4 h-4" />
                            </Button>
                            
                            <Button
                                onClick={handleBookAppointment}
                                size="sm"
                                className="hidden sm:flex items-center"
                                variant="default"
                            >
                                <CalendarIcon className="w-4 h-4 mr-1.5" />
                                Schedule a Call
                            </Button>
                            
                            <Button
                                onClick={handleBookAppointment}
                                size="sm"
                                className="sm:hidden flex items-center"
                                variant="default"
                            >
                                <CalendarIcon className="w-4 h-4" />
                            </Button>
                            
                            <Button
                                size="icon"
                                variant="ghost"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (isOpen) {
                                        handleCloseMenu(e);
                                    } else {
                                        setIsOpen(true);
                                    }
                                }}
                                className="lg:hidden p-2 w-8 h-8"
                            >
                                {isOpen ? <XIcon className="w-4 h-4 duration-300" /> : <Icons.menu className="w-3.5 h-3.5 duration-300" />}
                            </Button>
                        </div>
                    </div>
                    <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} handleClose={handleCloseMenu} />
                </Wrapper>
            </header>

        </div>
    )
};

export default Navbar
