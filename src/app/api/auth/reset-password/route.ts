import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendMail } from "@/lib/services/email/email-service";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const { token, newPassword } = await req.json();
  if (!token || !newPassword) {
    return NextResponse.json(
      { success: false, message: "Token and new password are required." },
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
  if (verification.expires < new Date()) {
    return NextResponse.json(
      { success: false, message: "Token has expired." },
      { status: 400 }
    );
  }

  // Find user
  const user = await prisma.user.findUnique({
    where: { email: verification.identifier },
  });
  if (!user) {
    return NextResponse.json(
      { success: false, message: "User not found." },
      { status: 404 }
    );
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // Update password
  await prisma.user.update({
    where: { email: verification.identifier },
    data: { password: hashedPassword },
  });

  // Delete verification token
  await prisma.verificationToken.delete({ where: { token } });

  // Send success email
  await sendMail({
    to: user.email,
    subject: "Password Reset Successful",
    html: `<p>Your password has been reset successfully. If you did not perform this action, please contact support immediately.</p>`,
  });

  return NextResponse.json({
    success: true,
    message: "Password reset successful.",
  });
}
