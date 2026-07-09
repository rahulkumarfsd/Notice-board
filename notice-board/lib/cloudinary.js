import { v2 as cloudinary } from "cloudinary";

const isConfigured =
  !!process.env.CLOUDINARY_CLOUD_NAME &&
  !!process.env.CLOUDINARY_API_KEY &&
  !!process.env.CLOUDINARY_API_SECRET;

if (isConfigured) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
}

export const cloudinaryIsConfigured = isConfigured;

/**
 * Uploads a local file path (from formidable) to Cloudinary and
 * returns the secure URL. Throws if Cloudinary isn't configured -
 * callers should check `cloudinaryIsConfigured` first.
 */
export async function uploadImage(filepath) {
  if (!isConfigured) {
    throw new Error("Cloudinary is not configured on this server.");
  }
  const result = await cloudinary.uploader.upload(filepath, {
    folder: "notice-board",
    resource_type: "image",
    transformation: [{ width: 1200, crop: "limit" }, { quality: "auto" }],
  });
  return result.secure_url;
}

export default cloudinary;
