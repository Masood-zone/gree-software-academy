"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useCourseStore } from "@/store/course-store";

type Props = {
  onNext?: () => void;
};

export default function CourseInfoForm({ onNext }: Props) {
  const setInfo = useCourseStore((s) => s.setInfo);
  const setCourseId = useCourseStore((s) => s.setCourseId);
  const courseId = useCourseStore((s) => s.courseId);
  const info = useCourseStore((s) => s.info);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: info,
  });

  useEffect(() => {
    reset(info);
  }, [info, reset]);

  type FormData = {
    title?: string;
    slug?: string;
    shortDescription?: string;
    description?: string;
    price?: number;
    image?: string;
    isActive?: boolean;
  };

  async function onSubmit(data: FormData) {
    setInfo(data);

    try {
      if (!courseId) {
        const res = await fetch(`/api/courses`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        const json = await res.json();
        if (res.ok) {
          setCourseId(json.id);
        }
      } else {
        await fetch(`/api/courses`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: courseId, updates: data }),
        });
      }
      onNext?.();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Title</label>
        <input {...register("title")} className="mt-1 block w-full" />
      </div>
      <div>
        <label className="block text-sm font-medium">Slug</label>
        <input {...register("slug")} className="mt-1 block w-full" />
      </div>
      <div>
        <label className="block text-sm font-medium">Short Description</label>
        <input
          {...register("shortDescription")}
          className="mt-1 block w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Description</label>
        <textarea {...register("description")} className="mt-1 block w-full" />
      </div>
      <div>
        <label className="block text-sm font-medium">Price (cents)</label>
        <input
          type="number"
          {...register("price")}
          className="mt-1 block w-full"
        />
      </div>
      <div className="flex items-center gap-2">
        <input type="checkbox" {...register("isActive")} />
        <label className="text-sm">Active</label>
      </div>

      <div className="flex justify-end">
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
