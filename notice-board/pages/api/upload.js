import formidable from "formidable";
import { uploadImage, cloudinaryIsConfigured } from "@/lib/cloudinary";

// Required so Next.js doesn't try to parse the multipart body itself -
// formidable needs the raw stream.
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ message: `Method ${req.method} not allowed.` });
  }

  if (!cloudinaryIsConfigured) {
    return res.status(503).json({
      message:
        "Image upload isn't configured on this server. Save the notice without an image, or add Cloudinary credentials.",
    });
  }

  try {
    const form = formidable({ maxFileSize: 5 * 1024 * 1024 });
    const [, files] = await form.parse(req);
    const file = files.file?.[0];

    if (!file) {
      return res.status(400).json({ message: "No file was uploaded." });
    }
    if (!file.mimetype?.startsWith("image/")) {
      return res.status(400).json({ message: "Only image files are allowed." });
    }

    const url = await uploadImage(file.filepath);
    return res.status(200).json({ url });
  } catch (error) {
    console.error("POST /api/upload failed:", error);
    return res.status(500).json({ message: "Image upload failed." });
  }
}
