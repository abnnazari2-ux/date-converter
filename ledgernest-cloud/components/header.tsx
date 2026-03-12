export function Header() {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-3">
      <input placeholder="Search invoices, bills, customers..." className="w-full max-w-md rounded-lg border border-slate-300 px-3 py-2 text-sm" />
      <div className="ml-4 flex items-center gap-3 text-sm text-slate-600">
        <span>Demo Company</span>
        <span>🔔</span>
        <span>Admin</span>
      </div>
    </header>
  );
}
