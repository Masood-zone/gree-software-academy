import { Shield, Users, Lightbulb, Award, Clock, Heart } from "lucide-react";

export default function Values() {
  const values = [
    {
      icon: Shield,
      title: "Integrity",
      description:
        "We maintain the highest standards of honesty and transparency, helping students build trust and confidence in their learning journey.",
    },
    {
      icon: Users,
      title: "Collaboration",
      description:
        "We foster a collaborative environment where students learn from each other, work on real projects, and grow together.",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description:
        "We encourage creative thinking and embrace new technologies to help students solve real-world problems.",
    },
    {
      icon: Award,
      title: "Excellence",
      description:
        "We are committed to helping students achieve excellence in their skills, projects, and career goals.",
    },
    {
      icon: Clock,
      title: "Reliability",
      description:
        "We support students with consistent guidance, resources, and mentorship throughout their learning journey.",
    },
    {
      icon: Heart,
      title: "Passion",
      description:
        "We love teaching and bring enthusiasm to every class, project, and student relationship.",
    },
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Our Core Values
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            These principles guide our work and define our commitment to
            excellence, innovation, and partnership.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <div
                key={index}
                className="p-6 bg-secondary rounded-xl hover:bg-secondary/80 transition-colors animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <Icon size={24} className="text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-3">{value.title}</h3>
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
