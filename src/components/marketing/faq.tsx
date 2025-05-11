"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionBadge } from "../ui/section-bade";
import Container from "../global/container";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { Button } from "../ui/button";
import { scrollToSection } from "@/functions";

const FAQ_ITEMS = [
  {
    question: "How does Lumora AI's 24/7 Learning Assistant transform the student experience?",
    answer: "Lumora AI's intelligent assistant provides content-aware support with deep knowledge of lecture materials, unlike generic chatbots. Students receive contextually relevant answers with timestamp navigation that links directly to relevant moments in video lectures. The system delivers personalized explanations tailored to different learning styles and backgrounds, and is always available to eliminate waiting for instructor responses, maintaining learning momentum throughout the educational journey."
  },
  {
    question: "What makes Lumora AI's Integrated Note-Taking System unique?",
    answer: "Our note-taking system enhances knowledge retention through contextual notes that students can take directly within the lecture interface. All notes are automatically indexed into a searchable repository organized by lecture and topic. The AI suggestion engine identifies key points to note based on content importance, and these notes become a powerful revision tool fully integrated within the learning environment, significantly improving study efficiency."
  },
  {
    question: "How does the Adaptive Assessment Engine improve learning outcomes?",
    answer: "Lumora AI transforms assessment from simple evaluation to a powerful learning tool. Our smart progress gating requires sufficient content engagement (95%) before assessments to ensure proper preparation. The system generates personalized questions based on lecture content and provides reinforcement questions when students answer incorrectly, approaching the same concept from different angles. Topic mastery features identify knowledge gaps and recommend specific content sections for review with direct timestamps, while comprehensive analytics provide detailed performance metrics for self-assessment."
  },
  {
    question: "What content integration capabilities does Lumora AI offer?",
    answer: "Lumora AI expands content capabilities while maintaining simplicity through seamless integrations. Our YouTube integration allows instructors to import entire playlists or individual videos with one click, automatically organizing content into course modules with AI-enhanced navigation and searchable transcripts. For Google Drive integration, we support not just documents and presentations, but also direct video imports from Drive storage, preserving all metadata and permissions while adding our AI enhancement layer. Our direct video upload system accepts multiple formats (MP4, MOV, AVI, etc.) with automatic transcoding, thumbnail generation, and chapter creation based on content analysis. All integrated content receives the full suite of Lumora AI enhancements including timestamp navigation, contextual Q&A, engagement analytics, and personalized learning paths—regardless of the content source, ensuring a consistent, high-quality learning experience across all materials."
  },
  {
    question: "What analytics and instructor tools does Lumora AI provide?",
    answer: "Lumora AI empowers instructors with comprehensive analytics dashboards that transform data into actionable insights. These include detailed student engagement metrics, AI-powered early warning systems to identify at-risk students, content effectiveness analysis, and revenue tracking for paid courses. Instructors also benefit from automated content enhancement features like quiz generation, content recommendations, transcript generation, and course structure optimization based on learning patterns. Our targeted student support tools enable personalized interventions, custom learning paths, and effective communication tools with engagement tracking."
  }
];

const FAQ = () => {
  const handleTryRiskFree = () => {
    scrollToSection('book-appointment');
  };
  
  const handleContactSupport = () => {
    window.open('https://wa.me/919318441197', '_blank');
  };
  
  return (
    <div id="faq" className="w-full py-16 md:py-24 lg:py-32 relative overflow-hidden will-change-transform">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.05)_100%)] pointer-events-none"></div>
      
      <Container>
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <SectionBadge title="Common Questions" />
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-heading font-medium !leading-snug mt-6">
            Frequently Asked Questions
          </h2>
          <p className="text-base md:text-lg text-center text-accent-foreground/80 mt-6">
            Everything institutions and content creators need to know about our Lumora AI platform and integration process.
          </p>
        </div>

        <div className="mt-12 max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {FAQ_ITEMS.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-medium">{item.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mt-16 max-w-3xl mx-auto text-center">
          <h3 className="text-xl font-medium mb-4">Still have questions?</h3>
          <p className="text-muted-foreground mb-6">
            Our team is ready to help you understand how Lumora AI can transform your institution&apos;s online learning experience.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button onClick={handleContactSupport} variant="outline">
              Contact Support
            </Button>
            <Button onClick={handleTryRiskFree}>
              Book a Demo
              <ArrowRightIcon className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default FAQ; 