import prisma from "@/lib/prisma";
import { validateNoticePayload } from "@/lib/validators";

export default async function handler(req, res) {
  const id = Number(req.query.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ message: "Invalid notice id." });
  }

  switch (req.method) {
    case "GET":
      return getNotice(req, res, id);
    case "PUT":
      return updateNotice(req, res, id);
    case "DELETE":
      return deleteNotice(req, res, id);
    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      return res.status(405).json({ message: `Method ${req.method} not allowed.` });
  }
}

async function getNotice(req, res, id) {
  try {
    const notice = await prisma.notice.findUnique({ where: { id } });
    if (!notice) {
      return res.status(404).json({ message: "Notice not found." });
    }
    return res.status(200).json({ notice });
  } catch (error) {
    console.error(`GET /api/notices/${id} failed:`, error);
    return res.status(500).json({ message: "Failed to load notice." });
  }
}

async function updateNotice(req, res, id) {
  const { valid, errors, data } = validateNoticePayload(req.body || {});

  if (!valid) {
    return res.status(400).json({ message: "Validation failed.", errors });
  }

  try {
    const existing = await prisma.notice.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ message: "Notice not found." });
    }

    const notice = await prisma.notice.update({ where: { id }, data });
    return res.status(200).json({ notice });
  } catch (error) {
    console.error(`PUT /api/notices/${id} failed:`, error);
    return res.status(500).json({ message: "Failed to update notice." });
  }
}

async function deleteNotice(req, res, id) {
  try {
    const existing = await prisma.notice.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ message: "Notice not found." });
    }

    await prisma.notice.delete({ where: { id } });
    return res.status(200).json({ message: "Notice deleted." });
  } catch (error) {
    console.error(`DELETE /api/notices/${id} failed:`, error);
    return res.status(500).json({ message: "Failed to delete notice." });
  }
}
