"use client";

import { ArrowRightIcon, BadgeCheck, Clock, Shield } from "lucide-react";
import { SectionBadge } from "../ui/section-bade";
import Container from "../global/container";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import { scrollToSection } from "@/functions";

const NoCureNoPay = () => {
    const handleGetStarted = () => {
        scrollToSection('book-appointment');
    };
    
    return (
        <div id="no-cure-no-pay" className="w-full py-16 md:py-24 lg:py-32 relative overflow-hidden will-change-transform">
            <div className="absolute -z-10 w-full h-full bg-gradient-to-b from-transparent to-background/80 pointer-events-none"></div>
            <Container>
                <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
                    <SectionBadge title="Our Guarantee" />
                    <h2 className="text-2xl md:text-4xl lg:text-5xl font-heading font-medium !leading-snug mt-6">
                        <span className="bg-gradient-to-r from-primary to-violet-500 bg-clip-text text-transparent">No-Cure No-Pay</span> Risk-Free Demo
                    </h2>
                    <p className="text-base md:text-lg text-center text-accent-foreground/80 mt-6">
                        We&apos;re so confident in our platform&apos;s ability to transform your university&apos;s LMS or educational content creator courses that we&apos;ve adopted a revolutionary risk-free model. Pay only when you&apos;re satisfied with our product demo.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
                    <div className="flex flex-col items-center p-6 rounded-2xl border border-border/60 bg-gradient-to-b from-background/50 to-background hover:shadow-md transition-all duration-300">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                            <Shield className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="text-xl font-medium mb-2">Zero Risk</h3>
                        <p className="text-accent-foreground/70 text-center">
                            No upfront costs or commitment. We take all the risk so your institution can focus on education delivery.
                        </p>
                    </div>

                    <div className="flex flex-col items-center p-6 rounded-2xl border border-primary/30 bg-gradient-to-b from-primary/5 to-background hover:shadow-md transition-all duration-300">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                            <BadgeCheck className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="text-xl font-medium mb-2">Satisfaction Guaranteed</h3>
                        <p className="text-accent-foreground/70 text-center">
                            Only pay after experiencing how our AI-powered tools enhance and elevate your existing platform&apos;s capabilities.
                        </p>
                    </div>

                    <div className="flex flex-col items-center p-6 rounded-2xl border border-border/60 bg-gradient-to-b from-background/50 to-background hover:shadow-md transition-all duration-300">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                            <Clock className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="text-xl font-medium mb-2">Customizable Solutions</h3>
                        <p className="text-accent-foreground/70 text-center">
                            Tailor our AI tools to fit your institution&apos;s unique requirements, ensuring seamless integration and maximum impact.
                        </p>
                    </div>
                </div>

                <div className="relative mt-16 p-8 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-violet-500/5">
                    <div className="absolute top-0 right-0 -z-10 w-full h-full bg-[radial-gradient(ellipse_at_top_right,rgba(167,139,250,0.1),transparent_50%)]"></div>
                    
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="flex-1">
                            <h3 className="text-xl md:text-2xl font-medium mb-3">How Our No-Cure No-Pay Model Works</h3>
                            <p className="text-accent-foreground/70">
                                1. Test our platform with a free demo<br />
                                2. Integrate it with your university LMS or video content<br />
                                3. Only pay when you&apos;re satisfied with the Demo and ready for production
                            </p>
                        </div>
                        
                        <Button onClick={handleGetStarted} size="lg" className="relative group">
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
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default NoCureNoPay; 