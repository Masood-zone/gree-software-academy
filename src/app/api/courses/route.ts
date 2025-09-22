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

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      title,
      slug,
      shortDescription,
      description,
      price,
      image,
      isActive,
      curriculum,
    } = body;

    const created = await prisma.course.create({
      data: {
        title,
        slug,
        shortDescription,
        description,
        price: price ?? 0,
        image,
        isActive: isActive ?? true,
        curriculum: curriculum ?? null,
      },
    });

    // Optionally create settings or related models here

    return NextResponse.json(
      { id: created.id, course: created },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create course" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, updates } = body;
    if (!id) {
      return NextResponse.json({ error: "Missing course id" }, { status: 400 });
    }

    // Prevent updating relation fields directly (sections/enrollments).
    // Persist nested UI data (sections, assignments, settings) inside the
    // `curriculum` JSON column so the wizard can save progress without
    // requiring complex nested writes.
    const { sections, assignments, curriculum, settings, ...rest } =
      updates || {};

    const curriculumPayload = curriculum ?? {
      ...(sections ? { sections } : {}),
      ...(assignments ? { assignments } : {}),
      ...(settings ? { settings } : {}),
    };

    const dataToUpdate: Record<string, unknown> = { ...rest };
    if (Object.keys(curriculumPayload).length > 0) {
      dataToUpdate.curriculum = curriculumPayload;
    }

    const updated = await prisma.course.update({
      where: { id },
      data: dataToUpdate,
    });

    return NextResponse.json({ course: updated });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update course" },
      { status: 500 }
    );
  }
}
