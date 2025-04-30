type PLAN = {
    id: string;
    title: string;
    desc: string;
    monthlyPrice: number;
    yearlyPrice: number;
    badge?: string;
    buttonText: string;
    features: string[];
    link: string;
};

export const PLANS: PLAN[] = [
    {
        id: "free",
        title: "Free Trial",
        desc: "Try Lumora AI with limited access to interactive learning tools",
        monthlyPrice: 0,
        yearlyPrice: 0,
        buttonText: "Start Free Trial",
        features: [
            "Limited AI assistance",
            "Basic practice questions",
            "Sample course content",
            "Community support",
            "Progress tracking",
            "7-day access"
        ],
        link: "https://stripe.com/free-plan-link"
    },
    {
        id: "pro",
        title: "Monthly",
        desc: "Ideal for beginners starting their learning journey",
        monthlyPrice: 5,
        yearlyPrice: 60,
        badge: "Most Popular",
        buttonText: "Join Now",
        features: [
            "Full AI assistance",
            "Unlimited practice questions",
            "Complete course library",
            "Notes section",
            "Progress tracking",
            "Quiz completion reports",
            "14-day money-back guarantee",
            "Priority support"
        ],
        link: "https://stripe.com/pro-plan-link"
    },
    {
        id: "enterprise",
        title: "Yearly",
        desc: "Best value for committed learners with full access",
        monthlyPrice: 4.17,
        yearlyPrice: 50,
        badge: "Best Value",
        buttonText: "Save 17%",
        features: [
            "Everything in Monthly plan",
            "Early access to new courses",
            "Downloadable resources",
            "Advanced analytics",
            "Personalized learning path",
            "14-day money-back guarantee",
            "Priority email support"
        ],
        link: "https://stripe.com/enterprise-plan-link"
    }
];
