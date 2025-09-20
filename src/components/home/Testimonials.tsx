import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";

export function Testimonials() {
  const items = [
    {
      initials: "AO",
      name: "Adebayo Ogundimu",
      role: "Frontend Developer",
      text: "The Save-to-Learn feature was a game-changer for me. I could save gradually while working part-time and eventually enrolled in the full bootcamp. Now I'm working as a frontend developer!",
    },
    {
      initials: "FE",
      name: "Fatima Eze",
      role: "Full-Stack Developer",
      text: "The curriculum is well-structured and the projects are real-world relevant. The flexible payment system made it possible for me to pursue my dream of becoming a developer.",
    },
    {
      initials: "CU",
      name: "Chidi Uche",
      role: "Backend Developer",
      text: "Excellent teaching methodology and great support from instructors. The installment payment option made quality education accessible. Highly recommended!",
    },
  ];
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            What Our Students Say
          </h2>
          <p className="text-lg text-muted-foreground">
            Real stories from students who transformed their careers
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((t) => (
            <Card key={t.initials}>
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-semibold">
                      {t.initials}
                    </span>
                  </div>
                  <div>
                    <CardTitle className="text-lg">{t.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-primary text-primary"
                    />
                  ))}
                </div>
                <p className="text-muted-foreground">{t.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
