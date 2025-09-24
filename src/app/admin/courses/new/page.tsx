"use client";

import { CourseWizardLayout } from "@/components/admin/courses/course-wizard-layout";
import { CourseInfoForm } from "@/components/admin/courses/course-info-form";
import { CurriculumBuilder } from "@/components/admin/courses/curriculum-builder";
import { AssignmentsForm } from "@/components/admin/courses/assignments-form";
import { CourseSettingsForm } from "@/components/admin/courses/course-settings-form";
import { CoursePreview } from "@/components/admin/courses/course-preview";
import { useCourseStore } from "@/store/course-store";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function CreateCoursePage() {
  const { currentStep, saveCourse } = useCourseStore();
  const router = useRouter();

  const handleStepSave = async () => {
    try {
      await saveCourse();
    } catch (error) {
      console.error("Error saving step:", error);
      throw error;
    }
  };

  const handleFinalSubmit = async () => {
    try {
      await saveCourse();
      toast.success("Course created successfully!");
      router.push("/admin/courses");
    } catch (error) {
      console.error("Error creating course:", error);
      toast.error(
        "Failed to create course. Please try again or contact support."
      );
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return <CourseInfoForm onSave={handleStepSave} />;
      case 1:
        return <CurriculumBuilder onSave={handleStepSave} />;
      case 2:
        return <AssignmentsForm onSave={handleStepSave} />;
      case 3:
        return <CourseSettingsForm onSave={handleStepSave} />;
      case 4:
        return <CoursePreview onSubmit={handleFinalSubmit} />;
      default:
        return <CourseInfoForm onSave={handleStepSave} />;
    }
  };

  return (
    <CourseWizardLayout onSave={currentStep < 4 ? handleStepSave : undefined}>
      {renderCurrentStep()}
    </CourseWizardLayout>
  );
}
