import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Curriculum = {
  sections?: Array<{
    title?: string;
    lessons?: Array<{ title?: string; content?: string }>;
  }>;
};

export async function POST(req: Request) {
  try {
    const { id } = await req.json();
    if (!id)
      return NextResponse.json({ error: "Missing course id" }, { status: 400 });

    const course = await prisma.course.findUnique({ where: { id } });
    if (!course)
      return NextResponse.json({ error: "Course not found" }, { status: 404 });

    const curriculum = course.curriculum as unknown as Curriculum;
    if (!curriculum)
      return NextResponse.json(
        { error: "No curriculum to publish" },
        { status: 400 }
      );

    // Create sections and lessons based on curriculum JSON
    if (Array.isArray(curriculum.sections)) {
      for (let sIndex = 0; sIndex < curriculum.sections.length; sIndex++) {
        const sec = curriculum.sections[sIndex];
        const created = await prisma.section.create({
          data: {
            title: sec.title || "Untitled Section",
            order: sIndex,
            course: { connect: { id } },
          },
        });
        if (Array.isArray(sec.lessons)) {
          for (let lIndex = 0; lIndex < sec.lessons.length; lIndex++) {
            const lesson = sec.lessons[lIndex];
            await prisma.lesson.create({
              data: {
                title: lesson.title || "Untitled Lesson",
                content: lesson.content || "",
                order: lIndex,
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
