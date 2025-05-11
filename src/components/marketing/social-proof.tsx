"use client";

import { StarIcon } from "lucide-react";
import { SectionBadge } from "../ui/section-bade";
import Container from "../global/container";
import Image from "next/image";
import { motion } from "framer-motion";

// Real testimonials data from LinkedIn
const TESTIMONIALS = [
  {
    name: "Sumit Chatterjee",
    role: "Strategic Leader | Growth Driver | Product Innovator",
    company: "UNIVO Education",
    content: "Very impressive and innovative platform. I need to demo and try the platform for myself.",
    rating: 5,
    result: "Strategic Leadership"
  },
  {
    name: "Mohammed Shahrukh Siddiqui",
    role: "KMIT CSE'27 || MERN Stack || DSA & ML Enthusiast",
    company: "Exploring Gen AI & RAG",
    content: "This is an outstanding product its UI and UX design are intuitive and impressive. It clearly delivers high value! Keep up the good work!!",
    rating: 5,
    result: "Intuitive UI/UX"
  },
  {
    name: "Abuzar Akhtar",
    role: "Building houseofwisdom",
    company: "",
    content: "Hats off, brother! From the idea to the design, everything is truly praiseworthy. Excellent work — really impressed!",
    rating: 5,
    result: "Excellent design"
  },
];



const SocialProof = () => {
  return (
    <div id="social-proof" className="w-full py-16 md:py-24 lg:py-32 relative">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.015]"></div>
      
      <Container>
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <SectionBadge title="Trusted by innovators" />
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-heading font-medium !leading-snug mt-6">
            See what our clients are saying
          </h2>
          <div className="flex items-center justify-center gap-1 mt-4">
            <StarIcon className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            <StarIcon className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            <StarIcon className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            <StarIcon className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            <StarIcon className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            <span className="ml-2 text-lg font-medium">4.9/5</span>
            <span className="ml-1 text-sm text-muted-foreground">(42 reviews)</span>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {TESTIMONIALS.map((testimonial, index) => (
            <div 
              key={index} 
              className="flex flex-col p-6 rounded-2xl border border-border/60 bg-gradient-to-b from-background/50 to-background hover:shadow-md transition-all duration-300"
            >
              <div className="mb-4">
                <h3 className="text-base font-medium">{testimonial.name}</h3>
                <p className="text-sm text-muted-foreground">{testimonial.role}{testimonial.company ? `, ${testimonial.company}` : ''}</p>
              </div>
              
              <div className="flex mb-2">
                {Array(testimonial.rating).fill(0).map((_, i) => (
                  <StarIcon key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              
              <p className="text-accent-foreground/80 text-sm mb-4">
                &quot;{testimonial.content}&quot;
              </p>
              
              <div className="mt-auto pt-4 border-t border-border/40">
                <div className="flex items-center">
                  <span className="text-xs text-muted-foreground">RESULTS:</span>
                  <span className="ml-2 text-sm font-medium text-primary">{testimonial.result}</span>
                </div>
              </div>
            </div>
          ))}
        </div>


      </Container>
    </div>
  );
};

export default SocialProof; 