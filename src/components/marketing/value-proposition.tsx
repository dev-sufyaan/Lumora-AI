"use client";

import { Brain, Clock, LineChart, Target } from "lucide-react";
import { SectionBadge } from "../ui/section-bade";
import Container from "../global/container";
import { cn } from "@/functions";
import { motion } from "framer-motion";
import NumberTicker from "../ui/number-ticker";

const VALUE_POINTS = [
  {
    icon: Brain,
    title: "10X Interactive Learning",
    description: "Our AI-powered platform transforms passive video watching into active learning experiences that are proven to increase knowledge retention by 10x.",
    color: "from-blue-500 to-violet-500",
    metric: "10x",
    metricLabel: "increase in retention"
  },
  {
    icon: LineChart,
    title: "Measurable Results",
    description: "Track learning progress with real-time analytics. Users demonstrate 87% better performance on assessments after using our interactive learning tools.",
    color: "from-emerald-500 to-teal-500",
    metric: "87%",
    metricLabel: "better performance"
  },
  {
    icon: Clock,
    title: "Time-Efficient Learning",
    description: "Our search-driven video learning reduces study time by 65% while increasing comprehension through focused, relevant content delivery.",
    color: "from-amber-500 to-orange-500",
    metric: "65%",
    metricLabel: "less study time"
  },
  {
    icon: Target,
    title: "Outcome-Focused",
    description: "Designed with clear learning objectives, our platform ensures every minute spent learning directly contributes to your educational goals.",
    color: "from-red-500 to-rose-500",
    metric: "100%",
    metricLabel: "goal alignment"
  }
];

const ValueProposition = () => {
  return (
    <div id="value-proposition" className="w-full py-16 md:py-24 lg:py-32 relative overflow-hidden will-change-transform scroll-container">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.015] pointer-events-none"></div>
      <div className="absolute -z-10 w-full h-full bg-gradient-to-b from-transparent to-background/80 pointer-events-none"></div>
      
      <Container>
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <SectionBadge title="Why Choose Lumora AI" />
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-heading font-medium !leading-snug mt-6">
            Transform your learning, <span className="bg-gradient-to-r from-primary to-violet-500 bg-clip-text text-transparent">risk-free</span>
          </h2>
          <p className="text-base md:text-lg text-center text-accent-foreground/80 mt-6">
            Our interactive AI learning platform delivers concrete, measurable improvements to your educational outcomes. Don't just watch videos—engage, practice, and master.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          {VALUE_POINTS.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0 }}
              className="flex flex-col p-6 rounded-2xl border border-border/60 bg-gradient-to-b from-background/50 to-background hover:shadow-md transition-all duration-300 framer-motion-div motion-safe"
            >
              <div className="mb-4">
                <div className={cn(
                  "w-12 h-12 rounded-xl bg-gradient-to-br p-0.5",
                  point.color
                )}>
                  <div className="w-full h-full rounded-[calc(0.75rem-1px)] bg-background flex items-center justify-center">
                    <point.icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </div>
              
              <h3 className="text-xl font-medium mb-2">{point.title}</h3>
              <p className="text-accent-foreground/70">{point.description}</p>
              
              <div className="mt-6 pt-4 border-t border-border/40 flex items-baseline">
                <span className="text-3xl font-bold bg-gradient-to-r from-primary to-violet-500 bg-clip-text text-transparent">
                  {typeof point.metric === 'number' ? <NumberTicker value={point.metric} /> : point.metric}
                </span>
                <span className="ml-2 text-sm text-muted-foreground">{point.metricLabel}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ROI Calculator Teaser */}
        <div className="mt-16 p-8 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-violet-500/5 relative z-0">
          <div className="text-center mb-6">
            <h3 className="text-xl md:text-2xl font-medium mb-2">Calculate Your Learning ROI</h3>
            <p className="text-accent-foreground/70 max-w-2xl mx-auto">
              See exactly how much time and money you can save by switching to Lumora AI's interactive learning platform. 
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="flex flex-col items-center p-4 rounded-xl bg-background/50 border border-border/40">
              <h4 className="text-lg font-medium mb-2">Time Savings</h4>
              <div className="text-3xl font-bold text-primary">
                <NumberTicker value={120} delay={0} />+
              </div>
              <p className="text-sm text-muted-foreground text-center">hours saved per course</p>
            </div>
            
            <div className="flex flex-col items-center p-4 rounded-xl bg-background/50 border border-border/40">
              <h4 className="text-lg font-medium mb-2">Knowledge Retention</h4>
              <div className="text-3xl font-bold text-primary">
                <NumberTicker value={85} delay={0} />%
              </div>
              <p className="text-sm text-muted-foreground text-center">higher retention rate</p>
            </div>
            
            <div className="flex flex-col items-center p-4 rounded-xl bg-background/50 border border-border/40">
              <h4 className="text-lg font-medium mb-2">Cost Efficiency</h4>
              <div className="text-3xl font-bold text-primary">
                <NumberTicker value={40} delay={0} />%
              </div>
              <p className="text-sm text-muted-foreground text-center">reduced training costs</p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ValueProposition; 