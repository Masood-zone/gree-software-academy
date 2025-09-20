"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Wallet } from "lucide-react";

export function Hero() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background to-muted">
      <div className="container mx-auto text-center">
        <div>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
            Master Web Development with{" "}
            <span className="text-primary">Flexible Learning</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto text-pretty">
            Learn to code at your own pace with our comprehensive curriculum and
            innovative &quot;Pay Tuition in Bits&quot; system. Start your
            journey to becoming a professional developer today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/courses">
              <Button size="lg" className="text-lg px-8">
                Explore Courses <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/save-to-learn">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 bg-transparent"
              >
                <Wallet className="mr-2 h-5 w-5" />
                Start Saving to Learn
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
