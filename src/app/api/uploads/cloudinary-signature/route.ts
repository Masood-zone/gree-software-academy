import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const { folder } = await req.json();

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
      return NextResponse.json(
        { error: "Cloudinary not configured. Set CLOUDINARY_* env vars." },
        { status: 500 }
      );
    }

    const timestamp = Math.floor(Date.now() / 1000);
    // Example unsigned params string; adjust per Cloudinary requirements
    const toSign =
      `timestamp=${timestamp}` + (folder ? `&folder=${folder}` : "");
    const signature = crypto
      .createHash("sha1")
      .update(toSign + apiSecret)
      .digest("hex");

    return NextResponse.json({ signature, apiKey, timestamp });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create signature" },
      { status: 500 }
    );
  }
}
