"use client";

import { PERKS } from "@/constants";
import { cn } from "@/functions";
import { LucideIcon } from "lucide-react";
import Container from "../global/container";
import { SectionBadge } from "../ui/section-bade";
import { motion } from "framer-motion";

const Perks = () => {
    return (
        <div id="perks" className="flex flex-col items-center justify-center py-12 md:py-16 lg:py-24 w-full">
            <Container>
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col items-center text-center max-w-2xl mx-auto"
                >
                    <SectionBadge title="Why It Works" />
                    <h2 className="text-2xl md:text-4xl lg:text-5xl font-heading font-medium !leading-snug mt-6">
                        How This Benefits You
                    </h2>
                    <p className="text-base md:text-lg text-center text-accent-foreground/80 mt-6">
                        Our platform helps you monetize your YouTube audience by providing a premium experience your students will gladly pay for, with zero additional work for you
                    </p>
                </motion.div>
            </Container>
            <Container>
                <div className="mt-16 w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full relative">
                        {PERKS.map((perk, index) => (
                            <Perk key={index} index={index} {...perk} />
                        ))}
                    </div>
                </div>
            </Container>
        </div>
    )
};

const Perk = ({
    title,
    description,
    icon: Icon,
    index,
}: {
    title: string;
    description: string;
    icon: LucideIcon;
    index: number;
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ 
                duration: 0.5,
                delay: index * 0.1
            }}
            className={cn(
                "flex flex-col lg:border-r transform-gpu py-10 relative group/feature border-neutral-800",
                (index === 0 || index === 3) && "lg:border-l",
                index < 3 && "lg:border-b"
            )}
        >
            {index < 3 && (
                <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-80 from-violet-950/25 to-transparent pointer-events-none" />
            )}
            {index >= 3 && (
                <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-80 from-violet-950/25 to-transparent pointer-events-none" />
            )}
            <motion.div 
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group-hover/feature:-translate-y-1 transform-gpu transition-all duration-300 flex flex-col w-full"
            >
                <div className="mb-4 relative z-10 px-10">
                    <Icon strokeWidth={1.3} className="w-10 h-10 origin-left transform-gpu text-neutral-500 transition-all duration-300 ease-in-out group-hover/feature:scale-75 group-hover/feature:text-foreground" />
                </div>
                <div className="text-lg font-medium font-heading mb-2 relative z-10 px-10">
                    <motion.div 
                        className="absolute left-0 -inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-700 group-hover/feature:bg-violet-600 transition-all duration-500 origin-center" 
                        whileHover={{ width: 4 }}
                    />
                    <span className="group-hover/feature:-translate-y- group-hover/feature:text- transition duration-500 inline-block heading">
                        {title}
                    </span>
                </div>
                <p className="text-sm text-neutral-300 max-w-xs relative z-10 px-10">
                    {description}
                </p>
            </motion.div>
        </motion.div>
    );
};

export default Perks
