import Image from "next/image";

export default function AboutHero() {
  return (
    <section className="py-20 bg-gradient-to-br from-background via-secondary/20 to-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 animate-fade-in-left">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                About{" "}
                <span className="gradient-text">Gree Software Academy</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Gree Software Academy is dedicated to helping students master
                web development, programming, and launch successful tech
                careers. Our mission is to empower learners with hands-on
                courses, mentorship, and a supportive community.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div className="text-center p-6 bg-secondary rounded-xl">
                <div className="text-3xl font-bold mb-2">2025</div>
                <div className="text-muted-foreground">Founded</div>
              </div>
              <div className="text-center p-6 bg-secondary rounded-xl">
                <div className="text-3xl font-bold mb-2">1000+</div>
                <div className="text-muted-foreground">Students Impacted</div>
              </div>
            </div>
          </div>

          <div className="flex justify-center animate-fade-in-right">
            <div className="relative w-96 h-96">
              <Image
                src="/images/gree-logo-white.jpg"
                alt="Gree Software Academy"
                fill
                className="object-contain dark:hidden"
              />
              <Image
                src="/images/gree-logo-black.jpg"
                alt="Gree Software Academy"
                fill
                className="object-contain hidden dark:block"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
