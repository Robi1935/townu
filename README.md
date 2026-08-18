# TownU

**Your college town. All in one place.**

TownU is a multi-market college-town platform connecting students, parents, local businesses, and service providers.

The first launch market is **Tuscaloosa, Alabama**, serving:
- The University of Alabama
- Stillman College
- Shelton State Community College

## V1 focus

- Student Marketplace
- Move-Out Mode / Buy My Room
- Student Hustles
- Local Services
- Deals
- Housing
- TownU Care
- Campus hubs
- Messaging shell
- Business dashboard
- Admin dashboard

## Stack

- Next.js App Router + TypeScript
- Tailwind CSS
- Supabase Auth/Postgres/Storage
- Vercel-ready deployment

## 1. Install

```bash
npm install
```

## 2. Environment

Copy `.env.example` to `.env.local` and add your Supabase values:

```bash
cp .env.example .env.local
```

You will need:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

## 3. Supabase database

Create a Supabase project, open the SQL Editor, and run:

`supabase/migrations/0001_initial_schema.sql`

Then run:

`supabase/seed.sql`

The seed file creates:
- Tuscaloosa market
- University of Alabama
- Stillman College
- Shelton State Community College
- sample categories

## 4. Run locally

```bash
npm run dev
```

Open `http://localhost:3000`.

## 5. Deploy

Import the GitHub repository into Vercel and add the same environment variables.

## Important

The starter UI uses sample/demo content. Real businesses should not be represented as verified partners until they opt in.

TownU is intended to be independent and should not imply endorsement by any college or university.

## Next build milestones

1. Run starter locally
2. Connect Supabase
3. Implement sign-up/sign-in
4. Wire Marketplace CRUD
5. Wire Student Hustles
6. Wire Businesses + Deals
7. Wire Housing
8. Wire Care providers
9. Add messaging
10. Add business/admin dashboards
