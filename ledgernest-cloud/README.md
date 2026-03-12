# LedgerNest Cloud

LedgerNest Cloud is a premium multi-tenant accounting SaaS MVP prototype built with **Next.js + TypeScript + Tailwind + Prisma + PostgreSQL**.

## Included in this build

- Original LedgerNest branding with custom LN fintech logo (navy + emerald)
- Marketing landing page with hero, features, pricing placeholder, FAQ, footer
- Auth screens (login/register/forgot password) + onboarding wizard page
- SaaS app shell (sidebar, topbar, responsive layout)
- Dashboard KPI cards + Recharts chart + shortcuts
- Main modules scaffolded: Sales, Expenses, Customers, Vendors, Banking, Accounting, Reports, Documents, Settings, Admin Console
- Posting engine service with invoice posting rules and journal balancing validation
- Full Prisma schema covering users/companies/memberships/transactions/audit/attachments/settings
- Seed script with demo company, users, chart of accounts, customers, vendors, products, bank accounts, tax

## Tech stack

- Next.js 14 App Router
- TypeScript
- Tailwind CSS
- Prisma ORM
- PostgreSQL (set in `DATABASE_URL`)
- Recharts for analytics

## Run locally

1. Install dependencies:
   ```bash
   cd ledgernest-cloud
   npm install
   ```
2. Configure database:
   ```bash
   cp .env.example .env
   # then set DATABASE_URL to your PostgreSQL database
   ```
3. Generate prisma client + migrate:
   ```bash
   npm run prisma:generate
   npm run prisma:migrate
   ```
4. Seed demo data:
   ```bash
   npm run prisma:seed
   ```
5. Start app:
   ```bash
   npm run dev
   ```
6. Open `http://localhost:3000`

## Demo credentials

- **Email:** `admin@ledgernest.cloud`
- **Password:** `demo-admin-123`

## Where to edit key accounting areas

- Company settings and module settings UI: `app/app/[module]/page.tsx` (settings cards)
- Chart of accounts setup/template seeding: `prisma/seed.ts`
- Report and module placeholders to extend: `app/app/[module]/page.tsx`
- Accounting posting logic: `lib/accounting-engine.ts`
- Dashboard widgets/charts: `components/dashboard.tsx`
- Tenant/data model: `prisma/schema.prisma`

## Notes

- Payroll, projects, budgeting, fixed assets, and advanced integrations are wired as placeholders for phase two.
- PDF and CSV exports are represented architecturally and UI-wise and can be connected to a rendering/export service next.
