"use client"

import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { useCourseStore } from "@/store/course-store"

const steps = [
  { id: 0, title: "Course Info", description: "Basic course details" },
  { id: 1, title: "Curriculum", description: "Sections and lessons" },
  { id: 2, title: "Assignments", description: "Course assignments" },
  { id: 3, title: "Settings", description: "Course configuration" },
  { id: 4, title: "Preview", description: "Review and submit" },
]

export function CourseWizardHeader() {
  const { currentStep, setCurrentStep } = useCourseStore()

  return (
    <div className="w-full border-b bg-card">
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground">Create Course</h1>
          <p className="text-muted-foreground mt-2">Build your course step by step with our guided wizard</p>
        </div>

        {/* Desktop Stepper */}
        <div className="hidden md:flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className="flex flex-col items-center">
                <button
                  onClick={() => setCurrentStep(step.id)}
                  className={cn(
                    "w-10 h-10 rounded-full border-2 flex items-center justify-center text-sm font-medium transition-colors",
                    currentStep === step.id
                      ? "border-primary bg-primary text-primary-foreground"
                      : currentStep > step.id
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-muted-foreground text-muted-foreground hover:border-primary hover:text-primary",
                  )}
                >
                  {currentStep > step.id ? <Check className="w-5 h-5" /> : step.id + 1}
                </button>
                <div className="mt-2 text-center">
                  <div
                    className={cn(
                      "text-sm font-medium",
                      currentStep >= step.id ? "text-foreground" : "text-muted-foreground",
                    )}
                  >
                    {step.title}
                  </div>
                  <div className="text-xs text-muted-foreground">{step.description}</div>
                </div>
              </div>

              {index < steps.length - 1 && (
                <div className={cn("w-16 h-0.5 mx-4 mt-[-2rem]", currentStep > step.id ? "bg-primary" : "bg-muted")} />
              )}
            </div>
          ))}
        </div>

        {/* Mobile Stepper */}
        <div className="md:hidden">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-muted-foreground">
              Step {currentStep + 1} of {steps.length}
            </div>
            <div className="text-sm font-medium text-foreground">{steps[currentStep].title}</div>
          </div>

          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>

          <div className="mt-2 text-sm text-muted-foreground">{steps[currentStep].description}</div>
        </div>
      </div>
    </div>
  )
}
