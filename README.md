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
│   ├── Navbar.js, Button.js, Input.js, Textarea.js, Select.js
│   ├── NoticeCard.js, NoticeGrid.js, NoticeForm.js, ImageUpload.js
│   ├── Badge.js, DeleteModal.js, Loader.js, SkeletonCard.js
│   └── EmptyState.js, Toast.js
├── hooks/
│   └── useNotices.js   # Client-side fetch + refresh hook
├── lib/                # Server-side helpers
│   ├── prisma.js       # Prisma client singleton
│   ├── cloudinary.js   # Optional image upload helper
│   └── validators.js   # Shared server-side validation rules
├── pages/
│   ├── api/notices/
│   │   ├── index.js    # GET (list) / POST (create)
│   │   └── [id].js     # GET / PUT / DELETE by id
│   ├── api/upload.js    # Cloudinary image upload endpoint
│   ├── notices/
│   │   ├── new.js       # Create notice page
│   │   └── [id]/edit.js # Edit notice page (getServerSideProps)
│   ├── index.js         # Home page (notice grid)
│   ├── 404.js / 500.js  # Custom error pages
│   └── _app.js / _document.js
├── prisma/
│   ├── schema.prisma    # Notice model + Category/Priority enums
│   └── seed.js          # 6 sample notices
├── public/
│   └── placeholder-notice.svg
├── styles/globals.css
├── utils/
│   ├── constants.js     # Categories, priorities, badge styles
│   └── formatDate.js
├── jsconfig.json        # Enables @/ import aliases (JS project, no TS needed)
├── tailwind.config.js
├── next.config.js
├── .env.example
└── package.json
```

## 1. Prerequisites

- Node.js 18.18+ or 20+
- A TiDB Cloud account (free Serverless tier is enough) — or any MySQL 8-compatible database
- (Optional) A Cloudinary account, if you want real image uploads
- A GitHub account + Vercel account, if deploying

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

## 4. Install, generate, and run locally

```bash
npm install
npx prisma generate
npx prisma db push     # creates the Notice table in your TiDB database
npm run seed           # optional: adds 6 sample notices
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

1. **Push to GitHub.** Make sure `package.json` sits at the repo root (i.e.
   run `git init` from inside the `notice-board` folder itself, not its
   parent) — this keeps Vercel's default **Root Directory** setting (`.`)
   correct with no changes needed.

   ```bash
   git init
   git add .
   git commit -m "Initial commit: Notice Board app"
   git remote add origin https://github.com/<your-username>/notice-board.git
   git branch -M main
   git push -u origin main
   ```

2. **Import the repo** at [vercel.com/new](https://vercel.com/new). Vercel
   auto-detects it as a Next.js project — no build command changes needed.

3. **Add environment variables** in Project Settings → Environment Variables
   (apply to Production, Preview, and Development):
   - `DATABASE_URL`
   - `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` (optional)

4. **Push the database schema** before or right after your first deploy, run
   this locally against the same `DATABASE_URL`:

   ```bash
   npx prisma db push
   ```

   Vercel does not run this for you — skipping it means the deployed API
   routes will fail since the `Notice` table won't exist yet.

5. **Deploy.** Vercel runs `npm install` → `prisma generate` (via the
   `postinstall` script) → `next build` automatically.

6. **Verify** the deployed URL: load the home page, create a notice, edit
   one, delete one.

### Common deploy issues

- **"Can't reach database server"** — double-check `DATABASE_URL` was pasted
  into Vercel's env vars (not just your local `.env`), and that it includes
  `?sslaccept=strict` for TiDB.
- **Prisma client errors on build** — make sure the `postinstall: prisma
  generate` script in `package.json` wasn't removed.
- **Image upload fails** — expected if Cloudinary env vars are blank; the app
  degrades gracefully to the placeholder image.

## Notes

- Images are optional; cards without one show a lightweight placeholder
  illustration instead of a broken image.
- The delete action always asks for confirmation via a modal before calling
  the API.
- Loading states use skeleton cards on the home page and inline spinners on
  form actions, with toast notifications for success/error feedback.
- `jsconfig.json` enables the `@/components/*`, `@/lib/*`, `@/utils/*`,
  `@/hooks/*` import aliases used throughout the codebase — this is the
  correct setup for a JavaScript (non-TypeScript) Next.js project and Next.js
  picks it up automatically during both `dev` and `build`.
