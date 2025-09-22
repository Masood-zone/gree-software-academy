import AssignmentsForm from "@/components/admin/courses/assignments-form";
import CourseHeaderBar from "@/components/admin/courses/course-header-bar";
import CourseInfoForm from "@/components/admin/courses/course-info-form";
import CoursePreview from "@/components/admin/courses/course-preview";
import CourseSettings from "@/components/admin/courses/course-settings";
import CurriculumBuilder from "@/components/admin/courses/curriculum-builder";
import LessonForm from "@/components/admin/courses/lesson-form";
import SectionForm from "@/components/admin/courses/section-form";
import React from "react";

export default function CreateCourse() {
  return (
    <div className="w-full md:container mx-auto p-3 md:p-6">
      <CourseHeaderBar />
      <CourseInfoForm />
      <CurriculumBuilder>
        <SectionForm />
        <LessonForm />
      </CurriculumBuilder>
      <AssignmentsForm />
      <CourseSettings />
      <CoursePreview />
    </div>
  );
}
