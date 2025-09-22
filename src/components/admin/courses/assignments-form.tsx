"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { assignmentSchema } from "@/lib/schemas/assignments";
import { useCourseStore } from "@/store/course-store";

const schema = assignmentSchema;
type FormData = z.infer<typeof schema>;

export default function AssignmentsForm({
  onNext,
  onBack,
}: {
  onNext?: () => void;
  onBack?: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });
  const courseId = useCourseStore((s) => s.courseId);

  function readFileAsBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        const comma = result.indexOf(",");
        const base64 = comma >= 0 ? result.slice(comma + 1) : result;
        resolve(base64);
      };
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsDataURL(file);
    });
  }

  async function uploadFile(file: File) {
    // Try S3 presign flow first
    try {
      const res = await fetch(`/api/uploads/s3-presign`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: file.name, contentType: file.type }),
      });
      const json = await res.json();
      if (res.ok && json?.url) {
        // Upload via PUT to the presigned URL
        await fetch(json.url, {
          method: json.method || "PUT",
          headers: { "Content-Type": file.type },
          body: file,
        });
        return json.url as string;
      }
    } catch (e) {
      console.warn("S3 presign failed, falling back to base64 upload", e);
    }

    // Fallback to legacy base64 upload endpoint
    const base64 = await readFileAsBase64(file);
    const fallback = await fetch(`/api/uploads`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: file.name, data: base64 }),
    });
    const fallbackJson = await fallback.json();
    return fallbackJson.url as string;
  }

  async function onSubmit(values: FormData) {
    try {
      if (!courseId) return;
      const fileInput = (
        document.getElementById("assignment-file") as HTMLInputElement | null
      )?.files?.[0];
      let fileUrl: string | undefined;
      if (fileInput) {
        fileUrl = await uploadFile(fileInput);
      }

      const payload = { ...values, fileUrl };
      await fetch(`/api/courses`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: courseId,
          updates: { assignments: payload },
        }),
      });
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
        {errors.title && (
          <p className="text-sm text-red-500">{errors.title.message}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium">Instructions</label>
        <textarea {...register("instructions")} className="mt-1 block w-full" />
      </div>
      <div>
        <label className="block text-sm font-medium">Link</label>
        <input {...register("link")} className="mt-1 block w-full" />
        {errors.link && (
          <p className="text-sm text-red-500">{errors.link.message}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium">File</label>
        <input id="assignment-file" type="file" className="mt-1 block w-full" />
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
