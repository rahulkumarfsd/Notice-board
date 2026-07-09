export const CATEGORIES = ["Exam", "Event", "General"];
export const PRIORITIES = ["Normal", "Urgent"];

/**
 * Validates a notice payload coming from the client.
 * Returns { valid: boolean, errors: { field: message }, data: cleanedPayload }
 */
export function validateNoticePayload(body) {
  const errors = {};

  const title = typeof body.title === "string" ? body.title.trim() : "";
  const noticeBody = typeof body.body === "string" ? body.body.trim() : "";
  const category = body.category;
  const priority = body.priority;
  const publishDateRaw = body.publishDate;
  const image = body.image ? String(body.image).trim() : null;

  if (!title) {
    errors.title = "Title is required.";
  } else if (title.length > 200) {
    errors.title = "Title must be 200 characters or fewer.";
  }

  if (!noticeBody) {
    errors.body = "Body is required.";
  }

  if (!category || !CATEGORIES.includes(category)) {
    errors.category = `Category must be one of: ${CATEGORIES.join(", ")}.`;
  }

  if (!priority || !PRIORITIES.includes(priority)) {
    errors.priority = `Priority must be one of: ${PRIORITIES.join(", ")}.`;
  }

  let publishDate = null;
  if (!publishDateRaw) {
    errors.publishDate = "Publish date is required.";
  } else {
    const parsed = new Date(publishDateRaw);
    if (Number.isNaN(parsed.getTime())) {
      errors.publishDate = "Publish date is invalid.";
    } else {
      publishDate = parsed;
    }
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
    data: {
      title,
      body: noticeBody,
      category,
      priority,
      publishDate,
      image,
    },
  };
}
