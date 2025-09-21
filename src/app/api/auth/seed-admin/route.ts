import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

async function seedAdmin() {
  // Change these values as needed
  const adminEmail = "admin@gree.com";
  const adminName = "Platform Admin";
  const adminPassword = "admin123"; // In production, use env

  // Check if admin already exists
  const existing = await prisma.user.findUnique({
    where: { email: adminEmail },
  });
  if (existing && existing.role === "ADMIN") {
    return { success: false, message: "Admin already exists." };
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  // Create admin user
  await prisma.user.create({
    data: {
      fullName: adminName,
      email: adminEmail,
      password: hashedPassword,
      role: "ADMIN",
    },
  });
  return { success: true, message: "Admin seeded successfully." };
}

export async function POST() {
  try {
    const result = await seedAdmin();
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    const errorMsg =
      typeof error === "object" && error && "message" in error
        ? (error as any).message
        : String(error);
    return NextResponse.json(
      { success: false, message: "Failed to seed admin.", error: errorMsg },
      { status: 500 }
    );
  }
}
