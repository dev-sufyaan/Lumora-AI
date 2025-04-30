"use client";

import React, { useState } from 'react'
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Container from "../global/container";
import Link from "next/link";
import { ArrowLeftIcon, MailIcon } from "lucide-react";
import Icons from "../global/icons";
import { FADE_IN_VARIANTS } from "@/constants";
import { toast } from "sonner";
import LoadingIcon from "../ui/loading-icon";

const SignUpForm = () => {
    const router = useRouter();
    const params = useSearchParams();
    const from = params.get("from");

    const [email, setEmail] = useState<string>("");
    const [isEmailOpen, setIsEmailOpen] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleOAuth = async (provider: string) => {
        setIsLoading(true);
        toast.success(`Signed up with ${provider}`);
        
        // Simulate authentication delay
        setTimeout(() => {
            router.push("/app");
        }, 1000);
    };

    const handleEmail = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!email) {
            toast.error("Please enter your email address");
            return;
        }

        setIsLoading(true);
        toast.success("Account created successfully!");
        
        // Simulate authentication delay
        setTimeout(() => {
            router.push("/app");
        }, 1000);
    };

    return (
        <div className="flex flex-col text-center w-full">
            <motion.div
                variants={FADE_IN_VARIANTS}
                animate="visible"
                initial="hidden"
            >
                <div className="flex justify-center">
                    <Link href="/">
                        <Icons.icon className="w-8 h-8" />
                    </Link>
                </div>
                <h1 className="text-2xl text-center mt-4">
                    {isEmailOpen
                        ? "Create an account"
                        : "Welcome to Lumora"}
                </h1>
                <p className="text-sm text-muted-foreground mt-2">
                    {isEmailOpen
                        ? "Choose a method to sign up"
                        : "Enter your email address to get started"}
                </p>
            </motion.div>
            {isEmailOpen ? (
                <div>
                    <motion.div
                        variants={FADE_IN_VARIANTS}
                        animate="visible"
                        initial="hidden"
                        className="flex flex-col gap-4 py-8"
                    >
                        <div className="w-full">
                            <Button
                                size="lg"
                                type="button"
                                disabled={isLoading}
                                onClick={() => handleOAuth("Google")}
                                variant="tertiary"
                                className="w-full"
                            >
                                {isLoading ? (
                                    <LoadingIcon size="sm" className="w-4 h-4 absolute left-4" />
                                ) : (
                                    <Icons.google className="w-4 h-4 absolute left-4" />
                                )}
                                Continue with Google
                            </Button>
                        </div>
                        <div className="w-full">
                            <Button
                                size="lg"
                                type="button"
                                disabled={isLoading}
                                onClick={() => handleOAuth("Apple")}
                                variant="tertiary"
                                className="w-full"
                            >
                                {isLoading ? <LoadingIcon size="sm" className="w-4 h-4 absolute left-4" /> : <Icons.apple className="w-4 h-4 absolute left-4" />}
                                Continue with Apple
                            </Button>
                        </div>
                        <div className="w-full">
                            <Button
                                size="lg"
                                type="button"
                                variant="tertiary"
                                disabled={isLoading}
                                onClick={() => setIsEmailOpen(false)}
                                className="w-full"
                            >
                                <MailIcon className="w-4 h-4 absolute left-4" />
                                Continue with email
                            </Button>
                        </div>
                    </motion.div>
                </div>
            ) : (
                <div>
                    <motion.form
                        variants={FADE_IN_VARIANTS}
                        animate="visible"
                        initial="hidden"
                        onSubmit={handleEmail}
                        className="py-8 w-full flex flex-col gap-4"
                    >
                        <div className="w-full">
                            <Input
                                autoFocus={true}
                                name="email"
                                type="email"
                                value={email}
                                disabled={isLoading}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email address"
                                className="w-full"
                            />
                        </div>
                        <div className="w-full">
                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full"
                            >
                                {isLoading ? <LoadingIcon size="sm" className="mr-2" /> : "Continue"}
                            </Button>
                        </div>
                        <div className="w-full">
                            <Button
                                type="button"
                                variant="ghost"
                                disabled={isLoading}
                                onClick={() => setIsEmailOpen(true)}
                                className="w-full"
                            >
                                <ArrowLeftIcon className="w-3.5 h-3.5 mr-2" />
                                Back
                            </Button>
                        </div>
                    </motion.form>
                </div>
            )}
        </div>
    )
};

export default SignUpForm
