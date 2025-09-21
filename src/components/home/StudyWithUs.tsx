import React from "react";
import Image from "next/image";

export default function StudyWithUs() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="rounded-xl shadow-lg bg-background p-8 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
              Study and Grow With Us
            </h2>
            <p className="text-base md:text-lg text-muted-foreground mb-4">
              At{" "}
              <span className="font-semibold text-primary">
                Gree Software Academy
              </span>
              , learning is more than just acquiring skills&mdash;it&apos;s
              about growing your mindset and joining a community that believes
              in the power of &quot;all-in&quot; growth.
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-4">
              <li>Collaborate with passionate peers and mentors</li>
              <li>Embrace challenges and celebrate progress</li>
              <li>
                Develop a growth mentality that lasts beyond the classroom
              </li>
              <li>Access resources and support for your personal journey</li>
            </ul>
            <p className="text-base md:text-lg text-muted-foreground">
              When you learn with us, you grow with an &quot;all-in&quot;
              mentality&mdash;ready to take on the world, together.
            </p>
          </div>
          <div className="w-full md:w-1/3 flex-shrink-0 flex items-center justify-center">
            <Image
              src="/images/growth-mindset.jpg"
              alt="Growth Mindset"
              width={320}
              height={320}
              className="w-56 h-56 md:w-72 md:h-72 object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
