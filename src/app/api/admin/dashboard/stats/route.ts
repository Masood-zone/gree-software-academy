import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  // Fetch analytics statistics
  const totalUsers = await prisma.user.count();
  const totalCourses = await prisma.course.count();
  const totalEnrollments = await prisma.enrollment.count();
  const totalRevenue = await prisma.transaction.aggregate({
    _sum: { amount: true },
    where: { status: "COMPLETED" },
  });

  return NextResponse.json({
    totalUsers,
    totalCourses,
    totalEnrollments,
    totalRevenue: totalRevenue._sum.amount || 0,
  });
}
