# Notice Board

A production-style Notice Board built with the Next.js Pages Router, Prisma,
and a hosted MySQL database (TiDB Cloud). Supports full CRUD on notices with
category/priority classification, urgent-first server-side ordering, optional
Cloudinary image uploads, and a polished, responsive dashboard UI.

## Tech stack

| Layer      | Choice                                   |
| ---------- | ----------------------------------------- |
| Framework  | Next.js 14 (Pages Router — `pages/`)      |
| Database   | MySQL via TiDB Cloud                      |
| ORM        | Prisma                                    |
| Styling    | Tailwind CSS                              |
| Icons      | lucide-react                              |
| Images     | Cloudinary (optional)                     |
| Toasts     | react-hot-toast                           |
| Language   | JavaScript                                |
| Hosting    | Vercel                                    |

## Project structure

```
notice-board/
├── components/        # Reusable UI building blocks
├── hooks/              # Client-side data hooks (useNotices)
├── lib/                # Server-side helpers (prisma client, cloudinary, validation)
├── pages/
│   ├── api/notices/    # REST API: index.js (GET/POST), [id].js (GET/PUT/DELETE)
│   ├── api/upload.js   # Cloudinary image upload endpoint
│   ├── notices/        # /notices/new, /notices/[id]/edit
│   ├── index.js        # Home page (notice grid)
│   ├── 404.js / 500.js # Custom error pages
│   ├── _app.js / _document.js
├── prisma/
│   ├── schema.prisma   # Notice model + enums
│   └── seed.js         # Sample data
├── public/             # Static assets (placeholder image)
├── styles/globals.css
├── utils/              # Constants, date formatting
└── ...config files
```

## 1. Prerequisites

- Node.js 18.18+ or 20+
- A TiDB Cloud account (free Serverless tier is enough) — or any MySQL 8-compatible database
- (Optional) A Cloudinary account, if you want real image uploads

## 2. Set up TiDB Cloud

1. Create a free cluster at [tidbcloud.com](https://tidbcloud.com).
2. Once the cluster is ready, open **Connect** and choose the **Prisma** tab.
3. Copy the generated connection string. It looks like:

   ```
   mysql://<user>.root:<password>@gateway01.<region>.prod.aws.tidbcloud.com:4000/notice_board?sslaccept=strict
   ```

4. Create a database named `notice_board` (or use the default and change the
   name in the URL) from the TiDB Cloud SQL console:

   ```sql
   CREATE DATABASE notice_board;
   ```

## 3. Configure environment variables

Copy the example file and fill in your values:

```bash
cp .env.example .env
```

```env
DATABASE_URL="mysql://<user>.root:<password>@<host>:4000/notice_board?sslaccept=strict"

# Optional — leave blank to disable image upload gracefully
CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""
```

If Cloudinary variables are left blank, the "Upload image" control will show a
friendly error and notices simply fall back to the placeholder illustration —
the rest of the app works normally.

## 4. Install and run

```bash
npm install
npx prisma generate
npx prisma db push
npm run seed      # optional: adds 6 sample notices
npm run dev
```

Visit `http://localhost:3000`.

## 5. API reference

| Method | Route                | Description                          |
| ------ | --------------------- | ------------------------------------ |
| GET    | `/api/notices`         | List notices (urgent first, then latest publish date) |
| GET    | `/api/notices/[id]`    | Get a single notice                  |
| POST   | `/api/notices`         | Create a notice — `400` on invalid payload |
| PUT    | `/api/notices/[id]`    | Update a notice — `400` on invalid payload |
| DELETE | `/api/notices/[id]`    | Delete a notice                      |
| POST   | `/api/upload`          | Upload an image, returns `{ url }`   |

All create/update requests are validated server-side (in `lib/validators.js`)
for empty title/body and invalid category, priority, or date — invalid
payloads return `400` with a field-level `errors` object.

### Ordering rule

Sorting happens entirely inside Prisma's `orderBy`, never in React:

```js
prisma.notice.findMany({
  orderBy: [{ priority: "desc" }, { publishDate: "desc" }],
});
```

The `Priority` enum is declared as `Normal` then `Urgent` in `schema.prisma`,
so MySQL's enum ordinal ordering combined with `desc` reliably places
`Urgent` notices first, with the remaining notices ordered by the most
recent `publishDate`.

## 6. Deploying to Vercel

1. Push this repository to GitHub/GitLab/Bitbucket.
2. Import the repo in [Vercel](https://vercel.com/new).
3. Add the environment variables from `.env` in **Project Settings → Environment
   Variables** (`DATABASE_URL`, and the Cloudinary keys if used).
4. Vercel will run `npm install` → `postinstall` (`prisma generate`) → `npm run build`
   automatically. No extra build command changes are needed.
5. After the first deploy, run `npx prisma db push` locally (pointed at the
   same `DATABASE_URL`) if you haven't already created the schema in your
   TiDB database.

## Notes

- Images are optional; cards without one show a lightweight placeholder
  illustration instead of a broken image.
- The delete action always asks for confirmation via a modal before calling
  the API.
- Loading states use skeleton cards on the home page and inline spinners on
  form actions, with toast notifications for success/error feedback.
