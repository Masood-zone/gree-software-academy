import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const userId = session.user.id;

  // Get enrolled courses
  const totalCourses = await prisma.enrollment.count({
    where: { userId },
  });

  // Get wallet balance
  const wallet = await prisma.wallet.findUnique({
    where: { userId },
    select: { balance: true },
  });

  // Get total spent (sum of completed PAYMENT transactions)
  const totalSpentResult = await prisma.transaction.aggregate({
    _sum: { amount: true },
    where: {
      userId,
      type: "PAYMENT",
      status: "COMPLETED",
    },
  });
  const totalSpent = totalSpentResult._sum.amount || 0;

  return NextResponse.json({
    totalCourses,
    saveToLearnWallet: wallet?.balance || 0,
    totalSpent,
  });
}
