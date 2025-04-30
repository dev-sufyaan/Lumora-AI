import { Icons } from "@/components";
import { ZapIcon, ChartSplineIcon, LifeBuoyIcon, PaletteIcon, ShieldCheckIcon, WaypointsIcon, BrainCircuitIcon, SparklesIcon } from "lucide-react";
import React from "react";

export const PERKS = [
    {
        icon: ZapIcon,
        title: "Student Portal",
        description: "Track your progress, view enrolled courses, and monitor completion percentages in one dashboard."
    },
    {
        icon: ChartSplineIcon,
        title: "Progress Analytics",
        description: "View quiz completion reports with 'understood' vs. 'needs review' tags to focus your learning."
    },
    {
        icon: BrainCircuitIcon,
        title: "AI-Powered Learning",
        description: "Get reinforcement questions for misunderstood concepts and personalized learning paths."
    },
    {
        icon: PaletteIcon,
        title: "Admin Dashboard",
        description: "Comprehensive analytics showing revenue trends, student enrollment, and engagement metrics."
    },
    {
        icon: ShieldCheckIcon,
        title: "Course Management",
        description: "Create and edit courses, set pricing, and track performance with detailed insights."
    },
    {
        icon: WaypointsIcon,
        title: "YouTube Integration",
        description: "Seamless integration with YouTube for enhanced video learning experiences."
    },
];