import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FeaturedCourses() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Featured Courses
          </h2>
          <p className="text-lg text-muted-foreground">
            Start your coding journey with our comprehensive, project-based
            courses
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              tag: "Beginner Friendly",
              price: "₦1,500",
              title: "Complete Web Development Bootcamp",
              desc: "Master full-stack development from HTML/CSS to React and Node.js",
              href: "/courses/web-development-bootcamp",
              hours: "40+ hours",
              students: "1,200+ students",
            },
            {
              tag: "Intermediate",
              price: "₦1,000",
              title: "Advanced React Development",
              desc: "Deep dive into React hooks, context, testing, and performance optimization",
              href: "/courses/advanced-react",
              hours: "25+ hours",
              students: "800+ students",
            },
            {
              tag: "Advanced",
              price: "₦1,200",
              title: "Backend Development with Node.js",
              desc: "Build scalable APIs and backend systems with Node.js and Express",
              href: "/courses/backend-nodejs",
              hours: "30+ hours",
              students: "600+ students",
            },
          ].map((c, idx) => (
            <Card key={idx} className="hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 rounded-t-lg flex items-center justify-center">
                <BookOpen className="h-16 w-16 text-primary" />
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <Badge variant="secondary">{c.tag}</Badge>
                  <span className="text-2xl font-bold text-primary">
                    {c.price}
                  </span>
                </div>
                <CardTitle>{c.title}</CardTitle>
                <CardDescription>{c.desc}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <span className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {c.hours}
                  </span>
                  <span className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {c.students}
                  </span>
                </div>
                <Link href={c.href}>
                  <Button className="w-full">
                    View Course <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/courses">
            <Button size="lg" variant="outline">
              View All Courses <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
