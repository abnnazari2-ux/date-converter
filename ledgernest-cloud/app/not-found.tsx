import Link from "next/link";

export default function NotFound() {
  return <main className="flex min-h-screen items-center justify-center"><div className="card p-8 text-center"><h1 className="text-3xl font-semibold">404</h1><p className="my-2 text-slate-600">Page not found.</p><Link className="text-emerald" href="/">Back home</Link></div></main>;
}
