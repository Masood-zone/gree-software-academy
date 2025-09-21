import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { token, otp } = await req.json();
  if (!token || !otp) {
    return NextResponse.json(
      { success: false, message: "Token and OTP are required." },
      { status: 400 }
    );
  }

  // Find verification token
  const verification = await prisma.verificationToken.findUnique({
    where: { token },
  });
  if (!verification) {
    return NextResponse.json(
      { success: false, message: "Invalid or expired token." },
      { status: 400 }
    );
  }

  // Check expiry
  if (verification.expires < new Date()) {
    return NextResponse.json(
      { success: false, message: "Token has expired." },
      { status: 400 }
    );
  }

  // Find user by email (identifier)
  const user = await prisma.user.findUnique({
    where: { email: verification.identifier },
  });
  if (!user) {
    return NextResponse.json(
      { success: false, message: "User not found." },
      { status: 404 }
    );
  }

  // For demo: Accept any OTP (in production, store OTP in VerificationToken)
  // Redirect to reset-password page
  return NextResponse.json({ success: true, redirect: "/auth/reset-password" });
}
