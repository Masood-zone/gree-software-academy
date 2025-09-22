"use client";
import React from "react";
import CreateCourseWizard from "../../../../components/admin/courses/create-course-wizard";

export default function CreateCoursePageClient() {
  return (
    <div className="w-full md:container mx-auto p-3 md:p-6">
      <CreateCourseWizard />
    </div>
  );
}
