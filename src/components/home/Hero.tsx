"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Wallet } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type ButtonVariant =
  | "default"
  | "outline"
  | "link"
  | "destructive"
  | "secondary"
  | "ghost";

interface SlideAction {
  label: string;
  href: string;
  icon: React.ReactNode;
  variant: ButtonVariant;
}

interface Slide {
  title: string;
  description: string;
  image: string;
  actions: SlideAction[];
}

const slides: Slide[] = [
  {
    title: "Welcome to Gree Software Academy",
    description:
      "Unlock your potential with our expert-led courses, hands-on projects, and a supportive community. We offer flexible learning paths, real-world curriculum, and mentorship to help you become a professional developer.",
    image: "/images/academy-intro.jpg", // Replace with your actual image path
    actions: [
      {
        label: "Explore Courses",
        href: "/courses",
        icon: <ArrowRight className="ml-2 h-5 w-5" />,
        variant: "default",
      },
      {
        label: "Start Saving to Learn",
        href: "/save-to-learn",
        icon: <Wallet className="mr-2 h-5 w-5" />,
        variant: "outline",
      },
    ],
  },
  {
    title: "Master Web Development with Flexible Learning",
    description:
      "Learn to code at your own pace with our comprehensive curriculum and innovative 'Pay Tuition in Bits' system. Start your journey to becoming a professional developer today.",
    image: "/images/hero-main.jpg", // Replace with your actual image path
    actions: [
      {
        label: "Explore Courses",
        href: "/courses",
        icon: <ArrowRight className="ml-2 h-5 w-5" />,
        variant: "default",
      },
      {
        label: "Start Saving to Learn",
        href: "/save-to-learn",
        icon: <Wallet className="mr-2 h-5 w-5" />,
        variant: "outline",
      },
    ],
  },
];

export function Hero() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 5000); // 5 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background to-muted">
      <div className="container mx-auto">
        <div className="relative w-full h-full max-w-full mx-auto min-h-screen flex items-center justify-center md:min-h-[400px] md:block md:items-start md:justify-start">
          {slides.map((slide, idx) => (
            <div
              key={slide.title}
              className={`flex flex-col md:flex-row items-center transition-opacity duration-700 w-full h-full p-6 md:p-12 ${
                active === idx
                  ? "opacity-100 z-10 absolute inset-0"
                  : "opacity-0 z-0 pointer-events-none absolute inset-0"
              }`}
              aria-hidden={active !== idx}
            >
              <div className="w-full md:w-1/2 flex-shrink-0 mb-8 md:mb-0 md:mr-12">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  width={640}
                  height={400}
                  className="rounded-xl object-cover w-full h-64 md:h-80 shadow-lg"
                  priority={idx === 0}
                />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-balance">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto text-pretty">
                  {slide.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center md:justify-start">
                  {slide.actions.map((action, i) => (
                    <Link href={action.href} key={i}>
                      <Button
                        size="lg"
                        className="text-base px-10 py-6 shadow-md"
                        variant={action.variant}
                      >
                        {action.icon}
                        {action.label}
                      </Button>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
          {/* Carousel Controls */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                className={`w-3 h-3 rounded-full border-2 ${
                  active === idx
                    ? "bg-primary border-primary"
                    : "bg-muted border-border"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
                onClick={() => setActive(idx)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
