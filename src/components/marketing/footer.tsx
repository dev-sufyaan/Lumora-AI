import { FOOTER_LINKS } from "@/constants";
import Link from "next/link";
import Container from "../global/container";
import Icons from "../global/icons";
import Wrapper from "../global/wrapper";
import { Button } from "../ui/button";
import { Particles } from "../ui/particles";
import { satoshi2 } from "@/constants/fonts";
import { cn } from "@/functions";

const Footer = () => {
    return (
        <footer className="w-full py-10 relative">
            <Container>
                <Wrapper className="relative flex flex-col items-center justify-center pb-20 overflow-hidden footer">
                    <Particles
                        className="absolute inset-0 w-full -z-10"
                        quantity={40}
                        ease={10}
                        color="#d4d4d8"
                        refresh
                    />
                    <div className="flex flex-col items-center text-center max-w-md">
                        <div className={cn("flex items-center", satoshi2.className)}>
                            <span className="text-2xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-foreground to-foreground/70">Lumora</span>
                            <span className="text-2xl font-medium tracking-wide ml-0.5 text-primary">AI</span>
                        </div>
                        <p className="text-base max-w-md mt-4 text-center">
                            Turn passive video watching into active learning.
                        </p>
                    </div>
                </Wrapper>
            </Container>
            <Container>
                <Wrapper className="pt-10 flex flex-col md:flex-row items-center justify-between gap-4 relative">
                    <p className="text-sm text-secondary-foreground text-center md:text-left">
                        &copy; {new Date().getFullYear()} Lumora AI. All rights reserved.
                    </p>
                    <p className="text-xs text-muted-foreground text-center md:text-left">
                        <span className="font-medium">2,845+</span> students • <span className="font-medium">1,586</span> active users • <span className="font-medium">73%</span> completion rate
                    </p>
                    <div className="flex items-center gap-4">
                        <div className="p-1">
                            <Icons.instagram className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <div className="p-1">
                            <Icons.twitter className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <div className="p-1">
                            <Icons.discord className="w-5 h-5 text-muted-foreground" />
                        </div>
                    </div>
                </Wrapper>
            </Container>
        </footer>
    )
};

export default Footer
