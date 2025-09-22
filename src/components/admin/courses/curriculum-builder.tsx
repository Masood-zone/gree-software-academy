"use client";
import React from "react";
import { useCourseStore } from "@/store/course-store";

export default function CurriculumBuilder({
  onNext,
  onBack,
}: {
  onNext?: () => void;
  onBack?: () => void;
}) {
  const sections = useCourseStore((s) => s.sections);
  const setSections = useCourseStore((s) => s.setSections);
  const courseId = useCourseStore((s) => s.courseId);

  async function save() {
    if (!courseId) return;
    try {
      await fetch(`/api/courses`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: courseId, updates: { sections } }),
      });
      onNext?.();
    } catch (err) {
      console.error(err);
    }
  }

  function addSection() {
    const title = `Section ${sections.length + 1}`;
    setSections([
      ...sections,
      {
        id: Math.random().toString(36).slice(2),
        title,
        order: sections.length + 1,
        lessons: [],
      },
    ]);
  }

  return (
    <div>
      <div className="mb-4">
        <button
          onClick={addSection}
          className="px-3 py-2 bg-primary text-white rounded"
        >
          Add Section
        </button>
      </div>
      <div className="space-y-2">
        {sections.map((s) => (
          <div key={s.id} className="p-3 border rounded">
            <div className="font-semibold">{s.title}</div>
            <div className="text-sm text-gray-500">
              {s.lessons.length} lessons
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-4">
        <button onClick={onBack} className="px-4 py-2 rounded bg-gray-100">
          Back
        </button>
        <div className="flex gap-2">
          <button
            onClick={save}
            className="px-4 py-2 rounded bg-primary text-white"
          >
            Save & Next
          </button>
        </div>
      </div>
    </div>
  );
}
