import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground dark:text-foreground">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Start Your Coding Journey?
        </h2>
        <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
          Join thousands of students who have transformed their careers with our
          comprehensive courses and flexible payment options.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/auth/register">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              Get Started Today
            </Button>
          </Link>
          <Link href="/courses">
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 border-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
            >
              Browse Courses
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
