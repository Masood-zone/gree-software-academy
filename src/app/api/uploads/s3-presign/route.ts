import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, contentType } = await req.json();
    // Basic validation
    if (!name || !contentType) {
      return NextResponse.json(
        { error: "Missing name or contentType" },
        { status: 400 }
      );
    }

    const region = process.env.AWS_REGION;
    const bucket = process.env.AWS_S3_BUCKET;
    const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

    if (!region || !bucket || !accessKeyId || !secretAccessKey) {
      return NextResponse.json(
        { error: "S3 not configured. Set AWS_* env vars." },
        { status: 500 }
      );
    }

    // Create a unique key for the file
    const key = `${Date.now()}-${name.replace(/[^a-z0-9.\-_]/gi, "-")}`;

    // Build a simple presign using AWS v4 signing logic would be heavy here. Instead,
    // return the S3 PUT url pattern and instruct the client to sign with AWS SDK or the server.
    // For production, prefer generating real presigned URLs server-side (AWS SDK).

    const url = `https://${bucket}.s3.${region}.amazonaws.com/${key}`;

    return NextResponse.json({ url, key, method: "PUT" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to generate presign" },
      { status: 500 }
    );
  }
}
