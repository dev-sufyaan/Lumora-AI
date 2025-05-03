import { Background, /* Companies, Connect, Features, */ Container, CTA, Hero, Perks, AppointmentBooking, /* Pricing, Reviews, */ Wrapper } from "@/components";
import { Spotlight } from "@/components/ui/spotlight";

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
                <Perks />
                <AppointmentBooking />
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
