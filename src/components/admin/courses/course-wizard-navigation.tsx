"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Save } from "lucide-react";
import { useCourseStore } from "@/store/course-store";
import { toast } from "react-toastify";

interface CourseWizardNavigationProps {
  onSave?: () => Promise<void>;
  canProceed?: boolean;
}

export function CourseWizardNavigation({
  onSave,
  canProceed = true,
}: CourseWizardNavigationProps) {
  const { currentStep, nextStep, previousStep, saveCourse, isLoading } =
    useCourseStore();

  const handleSave = async () => {
    try {
      if (onSave) {
        await onSave();
      }
      await saveCourse();
      toast.success("Your course progress has been saved successfully.");
    } catch {
      toast.error("Failed to save course progress. Please try again.");
    }
  };

  const handleNext = async () => {
    if (onSave) {
      try {
        await onSave();
        nextStep();
      } catch {
        toast.error(
          "Failed to proceed to the next step. Please fix the errors before proceeding."
        );
        return;
      }
    } else {
      nextStep();
    }
  };

  const handleSubmit = async () => {
    try {
      if (onSave) {
        await onSave();
      }
      await saveCourse();
      toast.success("Your course has been created successfully.");
      // Redirect or handle success
    } catch {
      toast.error("Failed to create course. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-between p-6 border-t bg-card">
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          onClick={handleSave}
          disabled={isLoading}
          className="gap-2 bg-transparent"
        >
          <Save className="w-4 h-4" />
          Save Progress
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          onClick={previousStep}
          disabled={currentStep === 0 || isLoading}
          className="gap-2 bg-transparent"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </Button>

        {currentStep < 4 ? (
          <Button
            onClick={handleNext}
            disabled={!canProceed || isLoading}
            className="gap-2"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            disabled={!canProceed || isLoading}
            className="gap-2"
          >
            Create Course
          </Button>
        )}
      </div>
    </div>
  );
}
