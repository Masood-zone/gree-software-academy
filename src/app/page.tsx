import React from "react";
import { Navigation } from "@/components/home/Navigation";
import { Hero } from "@/components/home/Hero";
import { SaveToLearn } from "@/components/home/SaveToLearn";
import { FeaturedCourses } from "@/components/home/FeaturedCourses";
import { Testimonials } from "@/components/home/Testimonials";
import { CTA } from "@/components/home/CTA";
import { Footer } from "@/components/home/Footer";
import StudyWithUs from "@/components/home/StudyWithUs";

export const metadata = {
  title: "Home | Gree Software Academy",
  description:
    "Learn software engineering, web development, and programming fundamentals with hands-on courses and expert guidance.",
  keywords: [
    "software engineering",
    "web development",
    "programming",
    "frontend",
    "backend",
    "typescript",
    "react",
    "career",
    "education",
    "coding bootcamp",
  ],
};

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <StudyWithUs />
      <SaveToLearn />
      <FeaturedCourses />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}
