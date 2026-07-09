import prisma from "@/lib/prisma";
import { validateNoticePayload } from "@/lib/validators";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return getNotices(req, res);
    case "POST":
      return createNotice(req, res);
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      return res.status(405).json({ message: `Method ${req.method} not allowed.` });
  }
}

async function getNotices(req, res) {
  try {
    // Ordering rule (must happen in the database, not in React):
    // 1. Urgent notices first (enum declared Normal < Urgent, so desc puts Urgent on top)
    // 2. Within each group, latest publishDate first
    const notices = await prisma.notice.findMany({
      orderBy: [{ priority: "desc" }, { publishDate: "desc" }],
    });
    return res.status(200).json({ notices });
  } catch (error) {
    console.error("GET /api/notices failed:", error);
    return res.status(500).json({ message: "Failed to load notices." });
  }
}

async function createNotice(req, res) {
  const { valid, errors, data } = validateNoticePayload(req.body || {});

  if (!valid) {
    return res.status(400).json({ message: "Validation failed.", errors });
  }

  try {
    const notice = await prisma.notice.create({ data });
    return res.status(201).json({ notice });
  } catch (error) {
    console.error("POST /api/notices failed:", error);
    return res.status(500).json({ message: "Failed to create notice." });
  }
}
