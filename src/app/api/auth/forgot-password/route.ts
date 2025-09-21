import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendMail } from "@/lib/services/email/email-service";

export async function POST(req: Request) {
  const { email } = await req.json();
  if (!email) {
    return NextResponse.json(
      { success: false, message: "Email is required." },
      { status: 400 }
    );
  }

  // Check if user exists
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json(
      { success: false, message: "User not found." },
      { status: 404 }
    );
  }

  // Generate OTP (6 digits) and secure token
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const token = crypto.randomUUID();
  const expires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

  // Store OTP and token in VerificationToken table
  await prisma.verificationToken.create({
    data: {
      identifier: email,
      token,
      expires,
    },
  });

  // Send email with verification link
  const verifyUrl = `http://localhost:3000/auth/verify-otp?token=${token}`;
  await sendMail({
    to: email,
    subject: "Password Reset Verification",
    html: `<p>Your OTP code is <b>${otp}</b>.<br>Click <a href="${verifyUrl}">here</a> to verify and reset your password.<br>This code expires in 10 minutes.</p>`,
  });

  return NextResponse.json({
    success: true,
    message: "Verification link sent to email.",
  });
}
