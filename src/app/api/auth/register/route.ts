import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prismaNode as prisma } from "@/lib/prisma-node";

export async function POST(req: Request) {
  try {
    const { fullName, email, phone, birthday, password } = await req.json();

    if (!fullName || !email || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { error: "Email is already registered" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        fullName,
        email,
        phone: phone || null,
        birthday: birthday ? new Date(birthday) : null,
        password: hashedPassword,
        role: "STUDENT",
      },
      select: { id: true },
    });

    await prisma.wallet.create({
      data: {
        userId: user.id,
        balance: 0,
      },
    });

    return NextResponse.json(
      { success: true, userId: user.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}
