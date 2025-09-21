import { Target, Eye, Heart } from "lucide-react";

export default function Vision() {
  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description:
        "To help students master web development, programming, and launch successful tech careers through hands-on learning and mentorship.",
    },
    {
      icon: Eye,
      title: "Our Vision",
      description:
        "To be Africa's leading tech academy, recognized for empowering students to achieve their goals and make a real impact in the tech industry.",
    },
    {
      icon: Heart,
      title: "Our Values",
      description:
        "We believe in student success, community, and lifelong learning. Our values guide us to support, inspire, and celebrate every learner's journey.",
    },
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Our Mission, Vision & Values
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            At Gree Software Company, we are driven by a passion for technology
            and a commitment to making a positive impact in Africa and beyond.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <div
                key={index}
                className="text-center p-8 bg-secondary rounded-2xl animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Icon size={32} className="text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
