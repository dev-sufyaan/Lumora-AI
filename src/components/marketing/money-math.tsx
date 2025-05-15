"use client";

import React from 'react';
import { motion } from "framer-motion";
import { DollarSign, Calculator, ChevronRight } from "lucide-react";
import Container from "../global/container";
import { SectionBadge } from "../ui/section-bade";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const MoneyMath = () => {
  return (
    <div className="w-full py-16 md:py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.015] pointer-events-none"></div>
      <Container>
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <SectionBadge title="The Money Math" />
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-heading font-medium !leading-snug mt-6">
            Here's a quick <span className="bg-gradient-to-r from-primary to-violet-500 bg-clip-text text-transparent">money math</span> for you
          </h2>
          
          <div className="mt-12 w-full max-w-2xl mx-auto p-8 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-violet-500/5">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-violet-500 p-0.5">
                  <div className="w-full h-full rounded-[calc(0.75rem-1px)] bg-background flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div className="ml-4 text-left">
                  <h3 className="text-xl font-medium">YouTube Subscribers</h3>
                  <p className="text-muted-foreground">Your existing audience</p>
                </div>
              </div>
              <div className="text-4xl font-bold bg-gradient-to-r from-primary to-violet-500 bg-clip-text text-transparent">
                100,000
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-violet-500 p-0.5">
                  <div className="w-full h-full rounded-[calc(0.75rem-1px)] bg-background flex items-center justify-center">
                    <Calculator className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div className="ml-4 text-left">
                  <h3 className="text-xl font-medium">Conversion Rate</h3>
                  <p className="text-muted-foreground">Just 1% of your audience</p>
                </div>
              </div>
              <div className="text-4xl font-bold bg-gradient-to-r from-primary to-violet-500 bg-clip-text text-transparent">
                1%
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-violet-500 p-0.5">
                  <div className="w-full h-full rounded-[calc(0.75rem-1px)] bg-background flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div className="ml-4 text-left">
                  <h3 className="text-xl font-medium">Monthly Fee</h3>
                  <p className="text-muted-foreground">Per student</p>
                </div>
              </div>
              <div className="text-4xl font-bold bg-gradient-to-r from-primary to-violet-500 bg-clip-text text-transparent">
                $3-$5
              </div>
            </div>
            
            <div className="h-px w-full bg-border/50 my-8"></div>
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 p-0.5">
                  <div className="w-full h-full rounded-[calc(0.75rem-1px)] bg-background flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-emerald-500" />
                  </div>
                </div>
                <div className="ml-4 text-left">
                  <h3 className="text-xl font-medium">Monthly Revenue</h3>
                  <p className="text-muted-foreground">Minimum projection</p>
                </div>
              </div>
              <div className="text-4xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
                $3,000-$5,000
              </div>
            </div>
            
            <div className="mt-10 text-center">
              <p className="text-xl font-medium mb-4">And the best part?</p>
              <p className="text-lg text-muted-foreground">Zero effort from your end—we handle everything.</p>
            </div>
          </div>
          
          <div className="mt-12">
            <div className="p-6 rounded-xl border border-primary/20 bg-gradient-to-br from-primary/5 to-violet-500/5">
              <h3 className="text-xl font-medium mb-2">Our Risk-Free Guarantee</h3>
              <p className="text-muted-foreground mb-6">We only charge $1 per student per month—after you hit your first 100 students.</p>
              
              <a href="#book-appointment">
                <Button className="w-full md:w-auto" size="lg">
                  Schedule a Call <ChevronRight className="ml-2 w-4 h-4" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default MoneyMath; 