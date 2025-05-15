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
    question: "How exactly does the monetization process work for my YouTube content?",
    answer: "We create a white-labeled platform featuring your content from YouTube, enhanced with our AI assistant, interactive quizzes, and smart note-taking features. You promote this premium experience to your audience. Students pay a monthly subscription fee ($3-$5) to access this enhanced learning environment. We only charge $1 per student per month after you reach 100 paying students, making this a truly risk-free partnership where we succeed only when you do."
  },
  {
    question: "What makes students willing to pay for content they can get for free on YouTube?",
    answer: "While your content remains available on YouTube, our platform offers significant value-added features that transform passive watching into active learning: 1) An ad-free, distraction-free environment, 2) 24/7 AI assistant that answers questions about your content with direct video timestamps, 3) Interactive quizzes that ensure complete understanding before progressing, and 4) Integrated note-taking that ties directly to video moments. This comprehensive learning experience is what students gladly pay for—especially when they're serious about mastering the material."
  },
  {
    question: "How much work do I need to put in to set this up and maintain it?",
    answer: "Almost none. We handle the entire technical setup, platform maintenance, and customer support. You simply continue creating your content as usual on YouTube. We'll import your videos to your white-labeled platform automatically. Your only responsibility is to promote your premium platform to your audience through your existing channels. We've designed this to be zero additional work for content creators while creating a new revenue stream."
  },
  {
    question: "What kind of YouTube channels work best with this model?",
    answer: "This model works exceptionally well for educational content creators teaching specific skills or knowledge: programming/coding tutorials, academic subjects (math, science, languages), professional skills (design, marketing, finance), creative skills (art, music, writing), and technical training. The more structured and in-depth your content, the more students benefit from our interactive features. If your content helps people learn valuable skills, our platform can help you monetize it effectively."
  },
  {
    question: "How quickly can I expect to see results and revenue?",
    answer: "After we set up your white-labeled platform (typically within 1-2 weeks), you can start promoting it to your audience. With consistent promotion to your existing YouTube subscribers, most creators see their first 100 paying students within 30-60 days. Reaching the 100-student threshold (where our fee begins) typically happens within 3-6 months for channels with 50,000+ subscribers. Remember, you'll be earning $3-$5 per student per month from day one, while our fee only begins after you reach 100 students."
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
            Everything creators need to know about monetizing their YouTube content with our risk-free platform.
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
          <h3 className="text-xl font-medium mb-4">Ready to monetize your content?</h3>
          <p className="text-muted-foreground mb-6">
            Let&apos;s discuss how we can help you generate $3,000-$5,000/month from your YouTube audience with zero effort.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button onClick={handleContactSupport} variant="outline">
              Contact Support
            </Button>
            <Button onClick={handleTryRiskFree}>
              Schedule a Call
              <ArrowRightIcon className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default FAQ; 