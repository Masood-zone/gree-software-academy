import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Basic validation: required fields according to prisma schema
    const { title, slug, description, price } = body;

    if (!title || !slug || !description || typeof price !== "number") {
      return NextResponse.json(
        {
          error:
            "Missing or invalid required fields: title, slug, description, price",
        },
        { status: 400 }
      );
    }

    // Prepare data for creation
    const createData: Prisma.CourseCreateInput = {
      title: String(title),
      slug: String(slug),
      description: String(description),
      shortDescription: body.shortDescription
        ? String(body.shortDescription)
        : null,
      image: body.image ? String(body.image) : null,
      price: Math.floor(Number(price)), // price expected in cents (int)
      isActive: typeof body.isActive === "boolean" ? body.isActive : true,
      curriculum: body.curriculum ?? null,
    };

    const created = await prisma.course.create({ data: createData });

    // Format response similar to GET: map sections/enrollments to counts and ISO dates
    const formatted = {
      ...created,
      // relations are not returned by default on create, so return counts as 0
      sections: 0,
      enrollments: 0,
      curriculum:
        typeof created.curriculum === "string"
          ? created.curriculum
          : JSON.stringify(created.curriculum ?? ""),
      createdAt: created.createdAt.toISOString(),
      updatedAt: created.updatedAt.toISOString(),
    };

    return NextResponse.json(formatted, { status: 201 });
  } catch (error) {
    console.error("Error creating course:", error);
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: message || "Failed to create course" },
      { status: 500 }
    );
  }
}
