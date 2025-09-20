import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet, Clock, BookOpen } from "lucide-react";

export function SaveToLearn() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Pay Tuition in Bits
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our innovative Save-to-Learn wallet lets you save small amounts over
            time, making quality education accessible to everyone.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="text-center">
            <CardHeader>
              <Wallet className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>Save Gradually</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Deposit small amounts into your Save-to-Learn wallet whenever
                you can afford it.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Clock className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>Flexible Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Take your time to save up for your course. No pressure, no
                deadlines.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <BookOpen className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>Start Learning</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Once you&apos;ve saved enough, enroll in your chosen course and
                begin your journey.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
