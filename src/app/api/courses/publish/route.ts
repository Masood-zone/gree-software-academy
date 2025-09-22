import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { id } = await req.json();
    if (!id) return NextResponse.json({ error: "Missing course id" }, { status: 400 });

    const course = await prisma.course.findUnique({ where: { id } });
    if (!course) return NextResponse.json({ error: "Course not found" }, { status: 404 });

    const curriculum = course.curriculum as any;
    if (!curriculum) return NextResponse.json({ error: "No curriculum to publish" }, { status: 400 });

    // Create sections and lessons based on curriculum JSON
    if (Array.isArray(curriculum.sections)) {
      for (const sec of curriculum.sections) {
        const created = await prisma.section.create({
          data: {
            title: sec.title || "Untitled Section",
            course: { connect: { id } },
          },
        });
        if (Array.isArray(sec.lessons)) {
          for (const lesson of sec.lessons) {
            await prisma.lesson.create({
              data: {
                title: lesson.title || "Untitled Lesson",
                content: lesson.content || "",
                section: { connect: { id: created.id } },
              },
            });
          }
        }
      }
    }

    // Mark course as published/active
    await prisma.course.update({ where: { id }, data: { isActive: true } });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
