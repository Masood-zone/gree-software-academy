import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const course = await prisma.course.findUnique({
      where: { id: params.id },
      include: { sections: true, enrollments: true },
    });

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    const formatted = {
      ...course,
      sections: Array.isArray(course.sections) ? course.sections.length : 0,
      enrollments: Array.isArray(course.enrollments)
        ? course.enrollments.length
        : 0,
      curriculum:
        typeof course.curriculum === "string"
          ? course.curriculum
          : JSON.stringify(course.curriculum ?? ""),
      createdAt: course.createdAt.toISOString(),
      updatedAt: course.updatedAt.toISOString(),
    };

    return NextResponse.json(formatted);
  } catch (error) {
    console.error("Error fetching course:", error);
    return NextResponse.json(
      { error: "Failed to fetch course" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const updates = await request.json();

    // Only allow updating a subset of fields
    const allowed: Array<keyof Prisma.CourseUpdateInput> = [
      "title",
      "slug",
      "description",
      "shortDescription",
      "image",
      "price",
      "isActive",
      "curriculum",
    ];

    const partialData: Record<string, unknown> = {};
    for (const key of allowed) {
      if (Object.prototype.hasOwnProperty.call(updates, key)) {
        partialData[key as string] = updates[key as string];
      }
    }
    const data = partialData as Prisma.CourseUpdateInput;

    const updated = await prisma.course.update({
      where: { id: params.id },
      data,
      include: { sections: true, enrollments: true },
    });

    const formatted = {
      ...updated,
      sections: Array.isArray(updated.sections) ? updated.sections.length : 0,
      enrollments: Array.isArray(updated.enrollments)
        ? updated.enrollments.length
        : 0,
      curriculum:
        typeof updated.curriculum === "string"
          ? updated.curriculum
          : JSON.stringify(updated.curriculum ?? ""),
      createdAt: updated.createdAt.toISOString(),
      updatedAt: updated.updatedAt.toISOString(),
    };

    return NextResponse.json(formatted);
  } catch (error) {
    console.error("Error updating course:", error);
    // Handle not found and prisma errors generically
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to update course",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.course.delete({ where: { id: params.id } });
    return NextResponse.json({ message: "Course deleted successfully" });
  } catch (error) {
    console.error("Error deleting course:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to delete course",
      },
      { status: 500 }
    );
  }
}
