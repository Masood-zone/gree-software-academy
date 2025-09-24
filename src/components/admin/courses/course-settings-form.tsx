"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Library, CreditCard, BadgeCent } from "lucide-react";
import { useCourseStore } from "@/store/course-store";

const courseSettingsSchema = z.object({
  depositPercent: z
    .number()
    .min(10, "Deposit must be at least 10%")
    .max(100, "Deposit cannot exceed 100%")
    .default(50),
  installmentDuration: z
    .number()
    .min(1, "Duration must be at least 1 month")
    .max(24, "Duration cannot exceed 24 months")
    .default(3),
  showInLibrary: z.boolean().default(true),
});

type CourseSettingsFormData = z.infer<typeof courseSettingsSchema>;

interface CourseSettingsFormProps {
  onSave: (data: CourseSettingsFormData) => Promise<void>;
}

export function CourseSettingsForm({ onSave }: CourseSettingsFormProps) {
  const { course, updateSettings } = useCourseStore();

  const form = useForm<CourseSettingsFormData>({
    resolver: zodResolver(courseSettingsSchema),
    defaultValues: {
      depositPercent: course.settings.depositPercent,
      installmentDuration: course.settings.installmentDuration,
      showInLibrary: course.settings.showInLibrary,
    },
  });

  const watchDepositPercent = form.watch("depositPercent");
  const watchInstallmentDuration = form.watch("installmentDuration");

  // Calculate payment breakdown
  const coursePrice = course.price || 0;
  const depositAmount = (coursePrice * watchDepositPercent) / 100;
  const remainingAmount = coursePrice - depositAmount;
  const monthlyPayment = remainingAmount / watchInstallmentDuration;

  const onSubmit = async (data: CourseSettingsFormData) => {
    updateSettings(data);
    await onSave(data);
  };

  return (
    <div className="space-y-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Course Settings</CardTitle>
          <CardDescription>
            Configure payment options and course visibility
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Payment Settings */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <CreditCard className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold">Payment Settings</h3>
                </div>

                <FormField
                  control={form.control}
                  name="depositPercent"
                  render={({ field }) => (
                    <FormItem className="space-y-4">
                      <FormLabel className="text-base">
                        Deposit Percentage
                      </FormLabel>
                      <FormControl>
                        <div className="space-y-4">
                          <Slider
                            min={10}
                            max={100}
                            step={5}
                            value={[field.value]}
                            onValueChange={(value) => field.onChange(value[0])}
                            className="w-full"
                          />
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <span>10%</span>
                            <Badge variant="outline" className="px-3 py-1">
                              {field.value}%
                            </Badge>
                            <span>100%</span>
                          </div>
                        </div>
                      </FormControl>
                      <FormDescription>
                        Percentage of course price required as initial deposit
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="installmentDuration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">
                        Installment Duration
                      </FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-4">
                          <Input
                            type="number"
                            min="1"
                            max="24"
                            className="w-24"
                            {...field}
                            onChange={(e) =>
                              field.onChange(
                                Number.parseInt(e.target.value) || 1
                              )
                            }
                          />
                          <span className="text-sm text-muted-foreground">
                            months
                          </span>
                        </div>
                      </FormControl>
                      <FormDescription>
                        Number of months to spread remaining payments
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Payment Breakdown */}
                {coursePrice > 0 && (
                  <Card className="bg-muted/50 border-primary/20">
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-3 flex items-center gap-2">
                        <BadgeCent className="w-4 h-4" />
                        Payment Breakdown
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="space-y-1">
                          <p className="text-muted-foreground">
                            Initial Deposit
                          </p>
                          <p className="font-semibold text-lg">
                            Ghc{depositAmount.toFixed(2)}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {watchDepositPercent}% of Ghc{coursePrice}
                          </p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-muted-foreground">
                            Monthly Payment
                          </p>
                          <p className="font-semibold text-lg">
                            Ghc{monthlyPayment.toFixed(2)}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            for {watchInstallmentDuration} months
                          </p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-muted-foreground">
                            Total Course Price
                          </p>
                          <p className="font-semibold text-lg">
                            Ghc{coursePrice.toFixed(2)}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Full course value
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Visibility Settings */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <Library className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold">Visibility Settings</h3>
                </div>

                <FormField
                  control={form.control}
                  name="showInLibrary"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Show in Course Library
                        </FormLabel>
                        <FormDescription>
                          Make this course visible in the public course library
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end pt-6 border-t">
                <Button type="submit" className="gap-2">
                  Save Settings
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
