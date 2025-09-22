"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { useCourseStore } from "@/store/course-store";

export default function CourseSettings({
  onNext,
  onBack,
}: {
  onNext?: () => void;
  onBack?: () => void;
}) {
  const { register, handleSubmit } = useForm({
    defaultValues: useCourseStore.getState().settings,
  });
  const courseId = useCourseStore((s) => s.courseId);

  async function onSubmit(data: any) {
    try {
      if (!courseId) return;
      await fetch(`/api/courses`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: courseId, updates: { settings: data } }),
      });
      onNext?.();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Deposit Percent</label>
        <input
          type="number"
          {...register("depositPercent")}
          className="mt-1 block w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">
          Installment Duration (months)
        </label>
        <input
          type="number"
          {...register("installmentDuration")}
          className="mt-1 block w-full"
        />
      </div>
      <div className="flex items-center gap-2">
        <input type="checkbox" {...register("showInLibrary")} />
        <label className="text-sm">Show in library</label>
      </div>
      <div className="flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="px-4 py-2 rounded bg-gray-100"
        >
          Back
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded bg-primary text-white"
        >
          Save & Next
        </button>
      </div>
    </form>
  );
}
