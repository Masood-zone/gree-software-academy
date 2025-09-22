"use client";
import React, { useState } from "react";
import CourseInfoForm from "./course-info-form";
import CurriculumBuilder from "./curriculum-builder";
import AssignmentsForm from "./assignments-form";
import CourseSettings from "./course-settings";
import CoursePreview from "./course-preview";
import { useCourseStore } from "@/store/course-store";

const steps = [
  { id: "info", label: "Course Info" },
  { id: "curriculum", label: "Curriculum" },
  { id: "assignments", label: "Assignments" },
  { id: "settings", label: "Settings" },
  { id: "preview", label: "Preview" },
];

export default function CreateCourseWizard() {
  const [active, setActive] = useState(0);
  const courseId = useCourseStore((s) => s.courseId);

  function go(step: number) {
    setActive(step);
  }

  function next() {
    setActive((p) => Math.min(p + 1, steps.length - 1));
  }
  function prev() {
    setActive((p) => Math.max(p - 1, 0));
  }

  return (
    <div className="bg-white rounded shadow p-4">
      {/* Step indicator */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
        <div className="flex items-center gap-2 overflow-auto">
          {steps.map((s, i) => (
            <button
              key={s.id}
              onClick={() => go(i)}
              className={`flex items-center gap-2 py-2 px-3 rounded-full text-sm ${
                i === active ? "bg-primary text-white" : "bg-gray-100"
              }`}
            >
              <span className="w-6 h-6 flex items-center justify-center rounded-full bg-white text-xs">
                {i + 1}
              </span>
              <span>{s.label}</span>
            </button>
          ))}
        </div>
        <div className="mt-2 md:mt-0">
          <span className="text-sm text-gray-500">
            {courseId ? `Course: ${courseId}` : "New course"}
          </span>
        </div>
      </div>

      <div className="min-h-[320px]">
        {active === 0 && <CourseInfoForm onNext={next} />}
        {active === 1 && <CurriculumBuilder onNext={next} onBack={prev} />}
        {active === 2 && <AssignmentsForm onNext={next} onBack={prev} />}
        {active === 3 && <CourseSettings onNext={next} onBack={prev} />}
        {active === 4 && <CoursePreview onBack={prev} />}
      </div>

      <div className="flex items-center justify-between mt-4">
        <button onClick={prev} className="px-4 py-2 rounded bg-gray-100">
          Previous
        </button>
        <div className="flex items-center gap-2">
          {active < steps.length - 1 && (
            <button
              onClick={next}
              className="px-4 py-2 rounded bg-primary text-white"
            >
              Next
            </button>
          )}
          {active === steps.length - 1 && (
            <button className="px-4 py-2 rounded bg-green-600 text-white">
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
