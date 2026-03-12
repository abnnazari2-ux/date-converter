import Link from "next/link";
import { LedgerNestLogo } from "@/components/logo";

const sections = ["Dashboard","Sales","Expenses","Customers","Vendors","Banking","Accounting","Reports","Payroll","Projects","Documents","Settings","Admin Console"];

export function Sidebar() {
  return (
    <aside className="w-64 border-r border-slate-200 bg-white p-4 hidden lg:block">
      <div className="mb-8 flex items-center gap-3">
        <LedgerNestLogo className="h-9 w-9" />
        <div>
          <p className="font-semibold text-navy">LedgerNest Cloud</p>
          <p className="text-xs text-slate-500">Clarity in Every Entry</p>
        </div>
      </div>
      <nav className="space-y-1">
        {sections.map((s) => (
          <Link key={s} href={`/app/${s.toLowerCase().replace(/ /g, "-")}`} className="block rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-100">{s}</Link>
        ))}
      </nav>
    </aside>
  );
}
