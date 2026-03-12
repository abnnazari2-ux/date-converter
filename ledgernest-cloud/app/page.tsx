import Link from "next/link";
import { LedgerNestLogo } from "@/components/logo";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white text-slate-800">
      <header className="mx-auto flex max-w-6xl items-center justify-between p-6">
        <div className="flex items-center gap-3"><LedgerNestLogo className="h-10 w-10"/><div><p className="font-bold text-navy">LedgerNest Cloud</p><p className="text-xs text-slate-500">Clarity in Every Entry</p></div></div>
        <div className="space-x-3"><Link href="/auth/login" className="rounded-lg border px-4 py-2">Login</Link><Link href="/auth/register" className="rounded-lg bg-navy px-4 py-2 text-white">Start Free Trial</Link></div>
      </header>
      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-2">
        <div><h1 className="text-5xl font-bold text-navy">Modern accounting for growing businesses.</h1><p className="mt-4 text-lg text-slate-600">Invoice, bills, tax, reports, approvals, and audit trails in one premium cloud workspace.</p><div className="mt-6 space-x-3"><Link href="/auth/register" className="rounded-lg bg-emerald px-5 py-3 font-medium text-white">Free Trial</Link><button className="rounded-lg border px-5 py-3">Book Demo</button></div></div>
        <div className="card flex h-72 items-center justify-center">Dashboard Screenshot Placeholder</div>
      </section>
      <section className="mx-auto max-w-6xl px-6 py-10"><h2 className="mb-4 text-2xl font-semibold">Features</h2><div className="grid gap-4 md:grid-cols-3">{["Sales & Receivables","Expenses & Payables","Banking & Reconciliation","General Ledger","Financial Reporting","Audit Trail"].map((f)=><div key={f} className="card p-4">{f}</div>)}</div></section>
      <section className="mx-auto max-w-6xl px-6 py-10"><h2 className="text-2xl font-semibold">Pricing</h2><div className="card mt-4 p-6">Pricing tiers placeholder.</div></section>
      <section className="mx-auto max-w-6xl px-6 py-10"><h2 className="text-2xl font-semibold">FAQ</h2><div className="mt-3 space-y-2"><div className="card p-3">Does LedgerNest support multi-company? Yes.</div><div className="card p-3">Can I export to PDF/CSV? Yes.</div></div></section>
      <footer className="border-t p-6 text-center text-sm text-slate-500">© {new Date().getFullYear()} LedgerNest Cloud</footer>
    </main>
  );
}
