import { Background, /* Companies, Connect, Features, */ Container, CTA, Hero, Perks, AppointmentBooking, /* Pricing, Reviews, */ Wrapper } from "@/components";
import { Spotlight } from "@/components/ui/spotlight";
import { generateMetadata } from "@/functions";
import { Metadata } from "next";
import NoCureNoPay from "@/components/marketing/no-cure-no-pay";
import SocialProof from "@/components/marketing/social-proof";
import ValueProposition from "@/components/marketing/value-proposition";
import FAQ from "@/components/marketing/faq";
import FreeDemo from "@/components/marketing/free-demo-cta";

export const metadata: Metadata = generateMetadata({
  title: "Lumora AI - Risk-Free Interactive Video Learning Platform | No-Cure No-Pay",
  description: "Transform passive video watching into active learning with AI-powered tools. Our No-Cure No-Pay model ensures you only pay when satisfied with our interactive learning platform.",
  keywords: [
    "AI learning platform",
    "interactive video courses",
    "video learning assistant",
    "personalized learning",
    "educational AI technology",
    "online video courses",
    "active learning tools",
    "e-learning platform",
    "AI-powered education",
    "video search learning",
    "interactive educational platform",
    "no-cure no-pay",
    "risk-free learning"
  ],
  structuredData: {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Lumora AI",
    "url": process.env.NEXT_PUBLIC_APP_URL || "https://lumoraai.in",
    "logo": `${process.env.NEXT_PUBLIC_APP_URL || "https://lumoraai.in"}/logo.png`,
    "description": "Transform passive video watching into active learning with AI-powered tools. Our No-Cure No-Pay model ensures you only pay when satisfied with our interactive learning platform.",
    "sameAs": [
      "https://twitter.com/lumoraai",
      "https://www.linkedin.com/company/lumora-ai",
      "https://www.facebook.com/LumoraAI"
    ]
  }
});

const HomePage = () => {
    return (
        <Background>
            <Wrapper className="py-20 relative">
                <Container className="relative">
                    <Spotlight
                        className="-top-40 left-0 md:left-60 md:-top-20"
                        fill="rgba(255, 255, 255, 0.5)"
                    />
                    <Hero />
                </Container>
                <NoCureNoPay />
                <ValueProposition />
                <Perks />
                <SocialProof />
                <AppointmentBooking />
                <FreeDemo />
                <FAQ />
                {/* Companies component commented out
                <Container className="py-8 lg:py-20">
                    <Companies />
                </Container>
                */}
                {/* Connect component commented out
                <Connect />
                */}
                {/* Features component commented out
                <Features />
                */}
                {/* Pricing component commented out
                <Pricing />
                */}
                {/* Reviews component commented out
                <Reviews />
                */}
            </Wrapper>
        </Background>
    )
};

export default HomePage
