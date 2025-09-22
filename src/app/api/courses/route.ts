import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const courses = await prisma.course.findMany({
      select: {
        id: true,
        title: true,
        shortDescription: true,
        description: true,
        isActive: true,
        price: true,
        image: true,
        slug: true,
        curriculum: true,
        sections: true,
        enrollments: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { createdAt: "desc" },
    });

    // Map sections and enrollments to counts for each course
    const formattedCourses = courses.map((course) => ({
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
    }));

    return NextResponse.json(formattedCourses);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch courses" },
      { status: 500 }
    );
  }
}
