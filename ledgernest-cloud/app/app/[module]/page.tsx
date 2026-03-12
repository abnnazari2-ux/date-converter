import Link from "next/link";

const configured: Record<string, { title: string; items: string[] }> = {
  sales: { title: "Sales", items: ["Invoices", "Estimates", "Sales receipts", "Credit notes", "Customer payments", "Recurring invoices"] },
  expenses: { title: "Expenses", items: ["Bills", "Expenses", "Supplier credits", "Bill payments", "Recurring expenses"] },
  customers: { title: "Customers", items: ["Customer list", "Profiles", "Aging", "Statements", "Activity logs"] },
  vendors: { title: "Vendors", items: ["Vendor list", "Profiles", "Aging", "Statements", "Activity logs"] },
  banking: { title: "Banking", items: ["Bank accounts", "Registers", "Transfers", "Reconciliation center", "Imported feed placeholder"] },
  accounting: { title: "Accounting", items: ["Chart of accounts", "Journal entries", "General ledger", "Trial balance", "Fiscal periods", "Recurring journals"] },
  reports: { title: "Reports", items: ["P&L", "Statement of financial position", "GL", "A/R Aging", "A/P Aging", "Tax summary", "Audit trail"] },
  documents: { title: "Documents", items: ["Attachment center", "Filters", "File preview placeholders"] },
  settings: { title: "Settings", items: ["Company profile", "Taxes", "Currencies", "Numbering", "Roles & permissions", "Branch settings"] },
  "admin-console": { title: "Admin Console", items: ["Tenants", "Users", "System logs", "Feature flags", "Plan limits"] }
};

export default function ModulePage({ params }: { params: { module: string } }) {
  const module = configured[params.module] ?? { title: params.module, items: ["Module placeholder"] };
  return (
    <main className="space-y-4 p-6">
      <h1 className="text-2xl font-semibold text-navy">{module.title}</h1>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{module.items.map((it) => <div key={it} className="card p-4">{it}</div>)}</div>
      <Link href="/app/dashboard" className="text-sm text-emerald">Back to dashboard</Link>
    </main>
  );
}
