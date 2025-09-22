"use client";
import React from "react";
import { useCourseStore } from "@/store/course-store";

export default function CoursePreview({ onBack }: { onBack?: () => void }) {
  const info = useCourseStore((s) => s.info);
  const sections = useCourseStore((s) => s.sections);
  const settings = useCourseStore((s) => s.settings);
  const courseId = useCourseStore((s) => s.courseId);

  return (
    <div>
      <h3 className="text-xl font-bold mb-2">Preview</h3>
      <div className="mb-4">
        <div className="font-semibold">{info.title}</div>
        <div className="text-sm text-gray-500">{info.shortDescription}</div>
        <div className="mt-2">{info.description}</div>
        <div className="mt-2">Price: Ghc{(info.price || 0) / 100}</div>
      </div>
      <div className="mb-4">
        <h4 className="font-semibold">Sections</h4>
        <ul className="list-disc pl-6">
          {sections.map((s) => (
            <li key={s.id}>
              {s.title} - {s.lessons.length} lessons
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <h4 className="font-semibold">Settings</h4>
        <div>Deposit: {settings.depositPercent}%</div>
        <div>Installments: {settings.installmentDuration} months</div>
      </div>

      <div className="flex justify-between">
        <button onClick={onBack} className="px-4 py-2 rounded bg-gray-100">
          Back
        </button>
        <button className="px-4 py-2 rounded bg-green-600 text-white">
          Publish
        </button>
      </div>
    </div>
  );
}
