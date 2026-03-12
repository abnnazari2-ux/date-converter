"use client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const kpis = [
  ["Total income", "$124,500"], ["Total expenses", "$68,200"], ["Gross profit", "$56,300"], ["Net profit", "$44,120"],
  ["A/R", "$21,500"], ["A/P", "$16,900"], ["Bank", "$39,700"], ["Cash", "$1,560"],
  ["VAT payable", "$4,320"], ["Overdue invoices", "7"], ["Overdue bills", "4"]
];
const data = [
  { month: "Jan", income: 32000, expense: 22000 }, { month: "Feb", income: 35000, expense: 25000 },
  { month: "Mar", income: 42000, expense: 27000 }, { month: "Apr", income: 39000, expense: 26500 }
];

export function DashboardView() {
  return (
    <div className="space-y-6 p-6">
      <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-4">
        {kpis.map(([label, val]) => <div key={label} className="card p-4"><p className="text-xs text-slate-500">{label}</p><p className="text-xl font-semibold text-navy">{val}</p></div>)}
      </div>
      <div className="grid gap-4 xl:grid-cols-3">
        <div className="card p-4 xl:col-span-2">
          <h3 className="mb-4 font-semibold">Income vs Expense</h3>
          <div className="h-64"><ResponsiveContainer><BarChart data={data}><XAxis dataKey="month"/><YAxis/><Tooltip/><Bar dataKey="income" fill="#102A43"/><Bar dataKey="expense" fill="#118C6A"/></BarChart></ResponsiveContainer></div>
        </div>
        <div className="card p-4"><h3 className="mb-4 font-semibold">Shortcuts</h3><ul className="space-y-2 text-sm">{["Create Invoice","Create Bill","Receive Payment","Create Journal Entry","Reconcile Account"].map((s)=><li key={s} className="rounded bg-slate-100 p-2">{s}</li>)}</ul></div>
      </div>
    </div>
  );
}
