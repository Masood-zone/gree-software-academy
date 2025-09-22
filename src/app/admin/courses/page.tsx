import React from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { BASEURL } from "@/lib/services/api";
import Link from "next/link";
import { Button } from "@/components/ui/button";

async function getCourses(): Promise<Course[]> {
  const res = await fetch(`${BASEURL}/api/courses`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch courses");
  }
  return res.json();
}

export default async function CoursesPage() {
  const courses = await getCourses();

  return (
    <div className="w-full md:container mx-auto p-3 md:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="mb-6 text-2xl font-bold">Courses</h1>
        <Button>
          <Link href="/admin/courses/new">Add New Course</Link>
        </Button>
      </div>
      <DataTable columns={columns} data={courses} />
    </div>
  );
}
