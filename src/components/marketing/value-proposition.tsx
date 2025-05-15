"use client";

import { Brain, Clock, LineChart, Target, Youtube, HelpCircle, BookOpen, FileQuestion } from "lucide-react";
import { SectionBadge } from "../ui/section-bade";
import Container from "../global/container";
import { cn } from "@/functions";
import { motion } from "framer-motion";
import NumberTicker from "../ui/number-ticker";

const VALUE_POINTS = [
  {
    icon: Youtube,
    title: "Ad-Free Learning Experience",
    description: "YouTube is full of distractions—especially ads. With the same content, we offer your students a focused, personalized, ad-free learning platform—plus some outstanding perks.",
    color: "from-red-500 to-rose-500",
    metric: "100%",
    metricLabel: "distraction-free"
  },
  {
    icon: HelpCircle,
    title: "24/7 AI Learning Assistant",
    description: "Students often get stuck watching YouTube courses with no way to ask you directly. Our AI assistant has full knowledge of your content and provides instant clarifications, simpler explanations, and clickable timestamps.",
    color: "from-blue-500 to-violet-500",
    metric: "24/7",
    metricLabel: "instant support"
  },
  {
    icon: FileQuestion,
    title: "Personalized Practice Quizzes",
    description: "After each video, students receive AI-powered quizzes that test their understanding recursively until they've grasped the concept. They can't proceed until they truly understand the current lesson.",
    color: "from-emerald-500 to-teal-500",
    metric: "100%",
    metricLabel: "concept mastery"
  },
  {
    icon: BookOpen,
    title: "Smart Note-Taking",
    description: "Our platform includes a note-taking section under each video where students can create beautiful, organized notes tied directly to that specific lecture—no more switching apps or maintaining separate notebooks.",
    color: "from-amber-500 to-orange-500",
    metric: "All-in-one",
    metricLabel: "learning environment"
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
            Our interactive AI learning platform delivers concrete, measurable improvements to your educational outcomes. Don&apos;t just watch videos—engage, practice, and master.
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
      </Container>
    </div>
  );
};

export default ValueProposition; 