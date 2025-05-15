"use client";

import { ArrowRightIcon, LightbulbIcon } from "lucide-react";
import Container from "../global/container";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import { scrollToSection } from "@/functions";

const FreeDemo = () => {
  const handleTryRiskFree = () => {
    scrollToSection('book-appointment');
  };

  return (
    <div id="free-demo" className="w-full py-16 md:py-24 relative">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/0 via-primary/5 to-background/0"></div>
      
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-background to-background/80 p-8 md:p-12">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 -z-10 h-96 w-96 rounded-full bg-primary/10 blur-[100px]"></div>
          <div className="absolute bottom-0 left-0 -z-10 h-96 w-96 rounded-full bg-violet-500/10 blur-[100px]"></div>
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex-1 max-w-2xl">
              <div className="flex items-center mb-4">
                <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <LightbulbIcon className="h-5 w-5 text-primary" />
                </div>
                <p className="text-sm font-medium text-primary">Let's Talk Business</p>
              </div>
              
              <h2 className="text-2xl md:text-4xl font-heading font-medium !leading-snug mb-4">
                So, what would this be <span className="bg-gradient-to-r from-primary to-violet-500 bg-clip-text text-transparent">worth to you?</span>
              </h2>
              
              <p className="text-accent-foreground/80 mb-6 max-w-xl">
                As we promised a completely risk-free guarantee, we've priced our service based on your success. We only charge $1 per student per month—after you hit your first 100 students.
              </p>
              
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {[
                  "No upfront costs",
                  "White-labeled platform",
                  "Full AI features included",
                  "Integration with your content",
                  "Custom branding and domain",
                  "Payment only when you succeed"
                ].map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <div className="mr-2 h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">
                      <div className="h-2.5 w-2.5 rounded-full bg-primary"></div>
                    </div>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <Button onClick={handleTryRiskFree} size="lg" className="relative px-8 py-6 text-lg group">
                  Book a meeting
                  <ArrowRightIcon className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
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
                
                <div className="absolute -top-3 right-0 bg-primary/10 px-3 py-1 rounded-full border border-primary/20 transform rotate-3">
                  <span className="text-xs font-medium animate-pulse text-primary">Free call</span>
                </div>
              </div>
              
              <p className="text-xs text-center text-muted-foreground">
                Let's talk so we can both win. It's free.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default FreeDemo; 