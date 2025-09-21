import { generateSEO } from "@/lib/seo";
import AboutHero from "@/components/about/about-hero";
import Team from "@/components/about/team";
import Vision from "@/components/about/vision";
import Values from "@/components/about/values";
import { Navigation } from "@/components/home/Navigation";
import { Footer } from "@/components/home/Footer";

export const metadata = generateSEO({
  title: "About Gree Software Academy",
  description:
    "Learn about Gree Software Academy's mission, vision, and the dedicated team helping students master web development, programming, and tech careers. Discover our values and commitment to student success.",
  keywords: [
    "gree software academy",
    "web development",
    "student success",
    "tech education",
    "career growth",
    "coding bootcamp",
  ],
  canonical: "/about",
});

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <div className="pt-16 pb-16 space-y-16">
        <AboutHero />
        <Vision />
        <Team />
        <Values />
      </div>
      <Footer />
    </>
  );
}
