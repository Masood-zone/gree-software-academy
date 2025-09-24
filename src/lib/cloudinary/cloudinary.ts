import {
  v2 as cloudinary,
  UploadApiResponse,
  UploadApiErrorResponse,
} from "cloudinary";

// Configure Cloudinary from environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function uploadBuffer(
  buffer: Buffer,
  options?: { folder?: string; resource_type?: "image" | "video" | "auto" }
) {
  const opts: { resource_type: "image" | "video" | "auto"; folder?: string } = {
    resource_type:
      (options?.resource_type as "image" | "video" | "auto") ?? "auto",
  };
  if (options?.folder) opts.folder = options.folder;

  return new Promise<{
    url: string;
    public_id: string;
    width?: number;
    height?: number;
  }>((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        opts,
        (
          error: UploadApiErrorResponse | undefined,
          result: UploadApiResponse | undefined
        ) => {
          if (error) return reject(error);
          if (!result) return reject(new Error("Empty upload result"));
          resolve({
            url: result.secure_url as string,
            public_id: result.public_id as string,
            width: result.width,
            height: result.height,
          });
        }
      )
      .end(buffer);
  });
}

export default cloudinary;
