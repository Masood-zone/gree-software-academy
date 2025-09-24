import { type NextRequest, NextResponse } from "next/server";
import { uploadBuffer } from "@/lib/cloudinary/cloudinary";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    // Accept either 'file' or 'image' fields
    const file = (formData.get("file") ?? formData.get("image")) as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // determine resource type by mime
    const mime = file.type || "";
    const resource_type = mime.startsWith("video/")
      ? "video"
      : mime.startsWith("image/")
      ? "image"
      : "auto";

    const result = await uploadBuffer(buffer, {
      folder: "uploads",
      resource_type: resource_type as "image" | "video" | "auto",
    });

    return NextResponse.json({ url: result.url, public_id: result.public_id });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to upload file",
      },
      { status: 500 }
    );
  }
}
