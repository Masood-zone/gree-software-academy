import React from "react";
import { Navigation } from "@/components/home/Navigation";
import { Hero } from "@/components/home/Hero";
import { SaveToLearn } from "@/components/home/SaveToLearn";
import { FeaturedCourses } from "@/components/home/FeaturedCourses";
import { Testimonials } from "@/components/home/Testimonials";
import { CTA } from "@/components/home/CTA";
import { Footer } from "@/components/home/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <SaveToLearn />
      <FeaturedCourses />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}
